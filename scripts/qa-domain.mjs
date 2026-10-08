import fs from "node:fs";
import http from "node:http";

const OFFICIAL_ORIGIN = "https://www.moatv4k.net";
const PRIMARY_HOST = "www.moatv4k.net";
const SECONDARY_HOST = "moatv4k.net";
const baseUrl = (process.env.QA_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const sourceRoots = ["src", "scripts", "public", "next.config.ts", "package.json"];
const staleFirstPartyPattern = /\b(?:https?:\/\/)?(?:www\.)?(?:moatv\.us|moatv4k\.net|localhost(?::\d+)?|[a-z0-9-]+\.vercel\.app)\b/gi;
const allowedHosts = new Set([PRIMARY_HOST]);

const blogData = JSON.parse(fs.readFileSync("src/content/blogData.json", "utf8"));
const staticRoutes = ["/", "/pricing", "/channels", "/faq", "/blog", "/reseller", "/privacy", "/terms", "/refund", "/disclaimer"];
const blogRoutes = blogData.articles.map((article) => `/blog/${article.slug}`);
const indexableRoutes = [...staticRoutes, ...blogRoutes];
let failures = 0;

function fail(message) {
  failures += 1;
  console.error(`FAIL ${message}`);
}

function pass(message) {
  console.log(`PASS ${message}`);
}

function routeUrl(path) {
  return `${baseUrl}${path}`;
}

function canonicalUrl(path) {
  return `${OFFICIAL_ORIGIN}${path === "/" ? "/" : path}`;
}

function equivalentCanonical(actual, expected) {
  if (actual === expected) return true;
  return expected === `${OFFICIAL_ORIGIN}/` && actual === OFFICIAL_ORIGIN;
}

function extractAll(html, regex) {
  return [...html.matchAll(regex)].map((match) => match[1]);
}

function assertFirstPartyUrls(label, text, allowLocalFetchBase = false) {
  const matches = text.match(staleFirstPartyPattern) || [];
  for (const match of matches) {
    const value = match.toLowerCase();
    if (value.includes("schema.org") || value.includes("wa.me")) continue;
    if (allowLocalFetchBase && value.includes(new URL(baseUrl).host.toLowerCase())) continue;
    if (value === PRIMARY_HOST || value === `https://${PRIMARY_HOST}`) continue;
    if (value.includes(PRIMARY_HOST)) continue;
    fail(`${label} contains stale first-party URL: ${match}`);
  }
}

async function fetchText(path, init) {
  const response = await fetch(routeUrl(path), init);
  const text = await response.text();
  return { response, text };
}

async function checkPage(path) {
  const expected = canonicalUrl(path);
  const { response, text } = await fetchText(path);
  if (!response.ok) {
    fail(`${path} returned HTTP ${response.status}`);
    return;
  }

  const canonicals = extractAll(text, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/gi);
  if (canonicals.length !== 1) fail(`${path} has ${canonicals.length} canonical links`);
  else if (!equivalentCanonical(canonicals[0], expected)) fail(`${path} canonical ${canonicals[0]} !== ${expected}`);

  const ogUrls = extractAll(text, /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["'][^>]*>/gi);
  if (ogUrls.length !== 1) fail(`${path} has ${ogUrls.length} og:url tags`);
  else if (!equivalentCanonical(ogUrls[0], expected)) fail(`${path} og:url ${ogUrls[0]} !== ${expected}`);

  const robotsMeta = extractAll(text, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["'][^>]*>/gi);
  for (const robots of robotsMeta) {
    if (/noindex/i.test(robots)) fail(`${path} is noindex`);
  }

  const jsonLdBlocks = extractAll(text, /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  for (const [index, block] of jsonLdBlocks.entries()) {
    assertFirstPartyUrls(`${path} JSON-LD #${index + 1}`, block);
  }

  assertFirstPartyUrls(`${path} HTML`, text, true);
  pass(`${path} canonical, og:url, indexability, and JSON-LD URLs`);
}

async function checkSitemap() {
  const { response, text } = await fetchText("/sitemap.xml");
  if (!response.ok) fail(`/sitemap.xml returned HTTP ${response.status}`);
  const urls = extractAll(text, /<loc>([^<]+)<\/loc>/g);
  const duplicates = urls.filter((url, index) => urls.indexOf(url) !== index);
  if (duplicates.length) fail(`sitemap has duplicate URLs: ${[...new Set(duplicates)].join(", ")}`);
  if (urls.length !== indexableRoutes.length) fail(`sitemap URL count ${urls.length} !== expected ${indexableRoutes.length}`);
  for (const path of indexableRoutes) {
    const expected = canonicalUrl(path);
    if (!urls.includes(expected)) fail(`sitemap missing ${expected}`);
  }
  for (const url of urls) {
    try {
      const parsed = new URL(url);
      if (!allowedHosts.has(parsed.host) || parsed.protocol !== "https:") fail(`sitemap wrong-domain URL: ${url}`);
    } catch {
      fail(`sitemap malformed URL: ${url}`);
    }
  }
  assertFirstPartyUrls("sitemap", text);
  pass(`sitemap contains ${urls.length} canonical URLs`);
  return urls;
}

async function checkRobots() {
  const { response, text } = await fetchText("/robots.txt");
  if (!response.ok) fail(`/robots.txt returned HTTP ${response.status}`);
  if (!text.includes(`Sitemap: ${OFFICIAL_ORIGIN}/sitemap.xml`)) fail("robots.txt does not reference the canonical sitemap");
  if (/Disallow:\s*\/\s*$/im.test(text)) fail("robots.txt blocks the public site root");
  assertFirstPartyUrls("robots.txt", text);
  pass("robots.txt sitemap directive and allow rules");
}

function scanFile(file) {
  if (file === "scripts/qa-domain.mjs") return [];
  const text = fs.readFileSync(file, "utf8");
  const issues = [];
  for (const match of text.matchAll(staleFirstPartyPattern)) {
    const value = match[0];
    if (value.includes(PRIMARY_HOST)) continue;
    if (file === "next.config.ts" && value.includes(SECONDARY_HOST)) continue;
    issues.push(`${file}:${value}`);
  }
  return issues;
}

function walk(target) {
  if (!fs.existsSync(target)) return [];
  const stat = fs.statSync(target);
  if (stat.isFile()) return [target];
  return fs.readdirSync(target, { withFileTypes: true }).flatMap((entry) => {
    if (["node_modules", ".next", ".git", ".qa-screens"].includes(entry.name)) return [];
    return walk(`${target}/${entry.name}`);
  });
}

function checkSourceScan() {
  const files = sourceRoots.flatMap(walk).filter((file) => /\.(tsx?|mjs|js|json|html|txt|xml|webmanifest)$/.test(file));
  const issues = files.flatMap(scanFile);
  if (issues.length) fail(`source scan found stale first-party domains:\n${issues.join("\n")}`);
  else pass("source scan has no stale first-party SEO domains");
}

async function checkRedirect() {
  const parsedBase = new URL(baseUrl);
  const result = await new Promise((resolve, reject) => {
    const request = http.request({
      hostname: parsedBase.hostname,
      port: parsedBase.port || 80,
      path: "/pricing?qa=domain",
      method: "HEAD",
      headers: { Host: SECONDARY_HOST },
    }, (response) => {
      response.resume();
      response.on("end", () => resolve({
        status: response.statusCode,
        location: response.headers.location,
      }));
    });
    request.on("error", reject);
    request.end();
  });
  if (result.status !== 308 && result.status !== 301) fail(`apex redirect status ${result.status} is not permanent`);
  if (result.location !== `${OFFICIAL_ORIGIN}/pricing?qa=domain`) fail(`apex redirect location ${result.location} is wrong`);
  else pass("apex host redirects permanently to www and preserves path/query");
}

console.log(`QA_BASE_URL=${baseUrl}`);
if (OFFICIAL_ORIGIN !== "https://www.moatv4k.net") fail("official origin constant is wrong");
else pass(`official origin is ${OFFICIAL_ORIGIN}`);

checkSourceScan();
await checkRobots();
const sitemapUrls = await checkSitemap();
for (const path of indexableRoutes) await checkPage(path);
for (const path of indexableRoutes) {
  const expected = canonicalUrl(path);
  if (!sitemapUrls.includes(expected)) fail(`${path} canonical is not represented in sitemap`);
}
await checkRedirect();

if (failures) {
  console.error(`DOMAIN QA: FAIL (${failures} issue${failures === 1 ? "" : "s"})`);
  process.exit(1);
}

console.log("DOMAIN QA: PASS");

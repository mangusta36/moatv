# MOATV WWW Production Domain Report

## 1. Original Domain Configuration and Issues Found

- The central production origin in `src/config/site.ts` was `https://moatv.us`.
- Root metadata used `metadataBase: new URL(siteConfig.productionDomain)`, so the old origin propagated into metadata helpers.
- `robots.ts`, `sitemap.ts`, Open Graph, Twitter images, canonical URLs, breadcrumbs, WebSite JSON-LD, Organization JSON-LD, and BlogPosting JSON-LD already reused `getSiteUrl()`, so changing the central origin corrected those first-party SEO URLs.
- `sitemap.ts` assigned a blanket static `lastModified` value of `2026-10-04` to all static routes. That was removed because there was no route-specific modification source.
- No `vercel.json`, middleware, manifest, RSS, Atom feed, or static robots file was present.

## 2. Official Production Origin

- Official canonical origin: `https://www.moatv4k.net`
- Primary hostname: `www.moatv4k.net`
- Secondary hostname: `moatv4k.net`
- Origin format: HTTPS, www hostname, no trailing slash in the central constant.

## 3. Centralized Origin Implementation

- `src/config/site.ts` now sets `siteConfig.productionDomain` to `https://www.moatv4k.net`.
- `getSiteUrl()` remains the single URL builder and normalizes paths to avoid double slashes.
- No environment-variable override controls production SEO origin in this codebase.

## 4. Files Changed and Reasons

- `src/config/site.ts`: changed the canonical production origin from `https://moatv.us` to `https://www.moatv4k.net`.
- `src/app/sitemap.ts`: removed unsupported static-route `lastModified` values; preserved blog article `updatedAt` dates.
- `next.config.ts`: added a permanent host redirect from `moatv4k.net/*` to `https://www.moatv4k.net/*`.
- `package.json`: added `npm run qa:domain`.
- `scripts/qa-domain.mjs`: added rendered-response domain QA for canonicals, Open Graph URLs, robots, sitemap, JSON-LD first-party URLs, stale-domain scans, duplicates, and apex redirect behavior.

## 5. Route-by-Route Canonical Verification

Rendered QA verified exactly one canonical and one `og:url` for each indexable route:

| Route | Canonical |
|---|---|
| `/` | `https://www.moatv4k.net` rendered by Next; equivalent to root `/` |
| `/pricing` | `https://www.moatv4k.net/pricing` |
| `/channels` | `https://www.moatv4k.net/channels` |
| `/faq` | `https://www.moatv4k.net/faq` |
| `/blog` | `https://www.moatv4k.net/blog` |
| `/reseller` | `https://www.moatv4k.net/reseller` |
| `/privacy` | `https://www.moatv4k.net/privacy` |
| `/terms` | `https://www.moatv4k.net/terms` |
| `/refund` | `https://www.moatv4k.net/refund` |
| `/disclaimer` | `https://www.moatv4k.net/disclaimer` |
| `/blog/how-to-watch-2026-mlb-playoffs` | `https://www.moatv4k.net/blog/how-to-watch-2026-mlb-playoffs` |
| `/blog/2026-world-series-viewing-guide` | `https://www.moatv4k.net/blog/2026-world-series-viewing-guide` |
| `/blog/nfl-october-2026-tv-guide` | `https://www.moatv4k.net/blog/nfl-october-2026-tv-guide` |
| `/blog/nfl-week-5-viewing-guide-2026` | `https://www.moatv4k.net/blog/nfl-week-5-viewing-guide-2026` |
| `/blog/nba-opening-night-2026-watch-guide` | `https://www.moatv4k.net/blog/nba-opening-night-2026-watch-guide` |
| `/blog/nba-2026-27-viewing-guide` | `https://www.moatv4k.net/blog/nba-2026-27-viewing-guide` |
| `/blog/2026-nba-cup-guide` | `https://www.moatv4k.net/blog/2026-nba-cup-guide` |
| `/blog/college-football-october-2026-tv-guide` | `https://www.moatv4k.net/blog/college-football-october-2026-tv-guide` |
| `/blog/how-to-watch-2026-wnba-playoffs-finals` | `https://www.moatv4k.net/blog/how-to-watch-2026-wnba-playoffs-finals` |
| `/blog/october-2026-sports-calendar` | `https://www.moatv4k.net/blog/october-2026-sports-calendar` |

## 6. Sitemap URL Count and Validation

- Rendered sitemap: `/sitemap.xml`
- URL count: 20
- All sitemap URLs use `https://www.moatv4k.net`.
- No duplicates, malformed URLs, localhost URLs, Vercel preview URLs, or old-domain URLs were found.
- Blog routes preserve their real `updatedAt` values as `lastModified`.
- Static routes omit `lastModified` because no reliable route-specific dates exist.

## 7. Robots Verification

Rendered `/robots.txt`:

```txt
User-Agent: *
Allow: /

Sitemap: https://www.moatv4k.net/sitemap.xml
```

No public production route is blocked.

## 8. Open Graph and Twitter Verification

- `og:url` matches each route canonical.
- Open Graph image URLs are produced through `getSiteUrl()` and now use `https://www.moatv4k.net`.
- Twitter image URLs are produced through `getSiteUrl()` and now use `https://www.moatv4k.net`.
- Blog article metadata uses each actual slug and the article hero image where present.

## 9. Structured-Data URL Verification

Rendered JSON-LD was checked on all indexable pages.

- WebSite URL uses `https://www.moatv4k.net/`.
- Organization URL uses `https://www.moatv4k.net/`.
- BreadcrumbList item URLs use `https://www.moatv4k.net`.
- BlogPosting `image` and `mainEntityOfPage` use `https://www.moatv4k.net`.
- FAQPage content has no stale first-party URL fields.

## 10. Old-Domain and Placeholder Scan

- Source scan scope: `src`, `scripts`, `public`, `next.config.ts`, `package.json`.
- Result: no stale first-party SEO domains found.
- Legitimate third-party URLs remain in blog citations, image credits, Schema.org context URLs, and WhatsApp links.

## 11. Redirect Behavior and Status

- Local production test:
  - Request: `Host: moatv4k.net` with `/pricing?qa=domain`
  - Status: `308 Permanent Redirect`
  - Location: `https://www.moatv4k.net/pricing?qa=domain`
- Next.js uses 308 for `permanent: true`; this is a permanent redirect and preserves path/query.
- Live Vercel domain behavior was not tested.

## 12. Environment-Variable Requirements

- No production SEO origin environment variable exists in the current codebase.
- Vercel should still have both domains configured:
  - `www.moatv4k.net` as the primary production domain.
  - `moatv4k.net` attached as the secondary/apex domain.
- Existing `NEXT_PUBLIC_MOATV_WHATSAPP`, if configured, is unrelated to canonical domain SEO and was not changed.

## 13. Actual Test Commands and Results

| Command | Result |
|---|---|
| `npm run lint` | PASS, exit 0 |
| `npm run typecheck` | PASS, exit 0 |
| `node scripts/verify-blog-links.mjs` | PASS, exit 0 |
| `node scripts/verify-blog-duplicates.mjs` | PASS, exit 0 |
| `node scripts/verify-blog-word-counts.mjs` | PASS, exit 0 |
| `npm run build` | PASS, exit 0 |
| `npm run start -- --hostname 127.0.0.1 --port 3000` | PASS, production server started |
| `QA_BASE_URL=http://127.0.0.1:3000 npm run qa:domain` | PASS, exit 0 |
| `curl -I -H 'Host: moatv4k.net' 'http://127.0.0.1:3000/pricing?qa=domain'` | PASS, 308 to `https://www.moatv4k.net/pricing?qa=domain` |

## 14. Outstanding Vercel/DNS Tasks

- Confirm DNS for `www.moatv4k.net` points to Vercel as required by the Vercel project.
- Confirm DNS for `moatv4k.net` points to Vercel as required by the Vercel project.
- In Vercel Domains, set `www.moatv4k.net` as the production/primary domain.
- Ensure SSL certificates are issued and active for both hostnames.
- After deployment, verify live:
  - `https://www.moatv4k.net/`
  - `https://www.moatv4k.net/robots.txt`
  - `https://www.moatv4k.net/sitemap.xml`
  - `https://moatv4k.net/*` redirects permanently to `https://www.moatv4k.net/*`.

## 15. Final PASS/FAIL Compliance Matrix

| Check | Expected | Local Result |
|---|---|---|
| Official origin | `https://www.moatv4k.net` | PASS |
| Primary hostname | `www.moatv4k.net` | PASS |
| Secondary hostname | `moatv4k.net` | PASS |
| Redirect | Permanent redirect to www | PASS locally, 308 |
| Sitemap | `https://www.moatv4k.net/sitemap.xml` | PASS |
| Robots sitemap | `https://www.moatv4k.net/sitemap.xml` | PASS |
| Wrong-domain canonical URLs | 0 | PASS |
| Duplicate canonicals | 0 | PASS |
| Wrong-domain sitemap URLs | 0 | PASS |
| Duplicate sitemap URLs | 0 | PASS |
| Broken internal links | 0 | PASS |
| Existing blog slugs | Unchanged | PASS |
| Design and pricing | Unchanged | PASS |
| TypeScript / Lint / Build | PASS | PASS |

LOCAL DOMAIN SEO IMPLEMENTATION: PASS

LIVE VERCEL DOMAIN CONFIGURATION: NOT VERIFIED

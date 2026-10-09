import fs from 'node:fs';
const data = JSON.parse(fs.readFileSync('src/content/blogData.json', 'utf8'));
const routes = new Set(['/', '/pricing', '/channels', '/faq', '/blog', '/reseller', '/privacy', '/terms', '/refund', '/disclaimer']);
for (const article of data.articles) routes.add(`/blog/${article.slug}`);
const missing = [];
for (const article of data.articles) {
  const contextual = article.sections.flatMap((section) => section.body.filter((block) => block.type === 'links').flatMap((block) => block.items));
  for (const link of [...(article.relatedLinks || []), ...contextual]) {
    if (link.href.startsWith('/') && !routes.has(link.href)) missing.push(`${article.slug} -> ${link.href}`);
  }
}
if (missing.length) {
  console.log('INTERNAL LINKS: FAIL');
  console.log(missing.join('\n'));
  process.exit(1);
}
console.log('INTERNAL LINKS: PASS');

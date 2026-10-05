import fs from 'node:fs';
const data = JSON.parse(fs.readFileSync('src/content/blogData.json', 'utf8'));
const sports = data.articles.filter((article) => article.category === 'Sports');
function paragraphs(article) {
  const chunks = [article.description, ...(article.intro || [])];
  for (const section of article.sections || []) {
    for (const block of section.body || []) {
      if (block.type === 'p') chunks.push(block.text);
      if (block.type === 'ul') chunks.push(...block.items);
    }
  }
  return chunks.map((text) => String(text).toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()).filter((text) => text.length > 180);
}
const seen = new Map();
const duplicates = [];
for (const article of sports) {
  for (const para of paragraphs(article)) {
    const prev = seen.get(para);
    if (prev && prev !== article.slug) duplicates.push({ first: prev, second: article.slug, passage: para.slice(0, 220) });
    else seen.set(para, article.slug);
  }
}
if (duplicates.length) {
  console.log('DUPLICATE CONTENT: FAIL');
  console.log(duplicates.slice(0, 20));
  process.exit(1);
}
console.log('DUPLICATE CONTENT: PASS');

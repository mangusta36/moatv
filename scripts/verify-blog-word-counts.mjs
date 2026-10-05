import fs from 'node:fs';
const data = JSON.parse(fs.readFileSync('src/content/blogData.json', 'utf8'));
function words(text) { return String(text || '').trim().split(/\s+/).filter(Boolean).length; }
function articleText(article) {
  const chunks = [article.title, article.description, ...(article.intro || [])];
  for (const section of article.sections || []) {
    chunks.push(section.heading);
    for (const block of section.body || []) {
      if (block.type === 'p' || block.type === 'h3') chunks.push(block.text);
      if (block.type === 'ul') chunks.push(...block.items);
      if (block.type === 'table') chunks.push(...block.headers, ...block.rows.flat());
      if (block.type === 'image') chunks.push(block.image.caption || '');
    }
  }
  for (const item of article.faq || []) chunks.push(item.question, item.answer);
  return chunks.join(' ');
}
const sports = data.articles.filter((article) => article.category === 'Sports');
let pass = true;
for (const article of sports) {
  const count = words(articleText(article));
  const ok = count >= 2500;
  if (!ok) pass = false;
  console.log(`${article.slug}\t${count}\t${ok ? 'PASS' : 'FAIL'}`);
}
console.log(`WORD COUNT: ${sports.filter((article) => words(articleText(article)) >= 2500).length}/${sports.length} PASS`);
if (!pass) process.exit(1);

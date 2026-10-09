import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

// Punctuation alone is not a word. Hyphens, dates and times stay one token.
export function countWords(text) {
  return String(text ?? '').split(/\s+/u).filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
}

export function articleChunks(article) {
  const chunks = [...(article.intro ?? [])];
  for (const section of article.sections ?? []) {
    if (section.heading.trim().toLowerCase() === 'faq') continue;
    chunks.push(section.heading);
    for (const block of section.body || []) {
      if (block.type === 'p' || block.type === 'h3') chunks.push(block.text);
      if (block.type === 'ul') chunks.push(...block.items);
      if (block.type === 'table') chunks.push(...block.headers, ...block.rows.flat());
    }
  }
  for (const item of article.faq || []) chunks.push(item.question, item.answer);
  return chunks;
}

export function countArticle(article) {
  return countWords(articleChunks(article).join(' '));
}

export function articleCounts(articles) {
  return articles.map((article) => ({ slug: article.slug, words: countArticle(article), pass: countArticle(article) >= 2500 }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const data = JSON.parse(fs.readFileSync('src/content/blogData.json', 'utf8'));
  const results = articleCounts(data.articles);
  if (process.argv.includes('--json')) console.log(JSON.stringify(results, null, 2));
  else {
    for (const result of results) console.log(`${result.slug}\t${result.words}\t${result.pass ? 'PASS' : 'FAIL'}`);
    console.log(`WORD COUNT: ${results.filter((result) => result.pass).length}/${results.length} PASS`);
  }
  if (results.some((result) => !result.pass)) process.exitCode = 1;
}

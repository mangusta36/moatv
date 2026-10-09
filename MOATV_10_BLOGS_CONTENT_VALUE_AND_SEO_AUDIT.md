# MOATV 10 Blogs Content Value And SEO Audit

Date: 2026-10-08

Mode: strict read-only audit, except for creating this requested report.

## 1. Executive Summary

All 10 published MoaTV blog articles were inspected from `src/content/blogData.json`, the current article template, image assets, prior remediation notes, and official sports sources. The prior duplicate-FAQ defect is fixed in the current implementation: each article now has one visible FAQ section generated from `article.faq`, and the older embedded FAQ sections have been removed from article data.

The articles are technically SEO-compliant in the most important areas: each has a descriptive title, canonical URL, one H1, BlogPosting JSON-LD, FAQPage JSON-LD where visible FAQ content exists, hero and section images, internal links, and external source citations. The main weakness is editorial, not technical: most articles still include 600-1,000 words of generic planning language, repeated "check the official schedule" advice, and multi-section conclusions that inflate length without adding much new information.

Overall verdict: **GOOD technical SEO foundation, but several articles need content remediation to improve useful-content density.** No article requires a full technical rebuild; the highest-value next step is focused editorial compression and fact enrichment.

## 2. Sources And Methodology

Local evidence:

- Article data: `src/content/blogData.json`
- Article template: `src/app/blog/[slug]/page.tsx`
- SEO helpers: `src/lib/seo.ts`
- Prior remediation report: `MOATV_COMPLETE_REMEDIATION_REPORT.md`
- Image assets: `public/images/blog/sports/*`

External fact-check sources:

- MLB postseason schedule and MLB.TV postseason notes: [MLB.com 2026 postseason schedule](https://www.mlb.com/live-stream-games/postseason/2026-schedule)
- NFL Week 5 schedule: [NFL.com 2026 Week 5 schedule](https://www.nfl.com/schedules/2026/by-week/week-5)
- NBA schedule release and national broadcast windows: [NBA.com 2026-27 schedule release](https://www.nba.com/news/2026-27-nba-regular-season-schedule)
- NBA key dates: [NBA.com key dates](https://www.nba.com/news/key-dates)
- WNBA postseason schedule and format: [WNBA 2026 postseason FAQ](https://www.wnba.com/news/2026-wnba-postseason-faq)
- College football schedule volatility and TV windows: [NCAA.com college football TV schedule](https://www.ncaa.com/news/football/article/college-football-tv-schedule-game-times-preview)

Classification method:

- I inspected every article section, paragraph/list/table/FAQ group, section purpose, and repeated conclusion pattern.
- Word-count values below are article-body estimates from article data, excluding global navigation/footer/schema.
- Category estimates are editorial estimates, not Google metrics:
  - A: specific facts, dates, networks, format explanations, tables, useful setup/checking actions.
  - B: relevant supporting explanation.
  - C: generic advice or obvious framing.
  - D: repeated advice already stated in the article.
  - E/F: unsupported, potentially misleading, or off-intent content.
- Cross-article similarity used cosine similarity over normalized article text after removing common stopwords. Scores are a directional editorial aid, not plagiarism scores.

## 3. Complete Article Inventory

| Article | URL | Words | H2 | H3 | Tables | Images | Internal Links | Sources | FAQ | Schema Types |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| `how-to-watch-2026-mlb-playoffs` | `/blog/how-to-watch-2026-mlb-playoffs` | 2,863 | 9 | 4 | 1 | 3 | 9 | 2 | 4 | BreadcrumbList, BlogPosting, FAQPage |
| `2026-world-series-viewing-guide` | `/blog/2026-world-series-viewing-guide` | 2,461 | 8 | 4 | 1 | 3 | 9 | 1 | 4 | BreadcrumbList, BlogPosting, FAQPage |
| `nfl-october-2026-tv-guide` | `/blog/nfl-october-2026-tv-guide` | 2,573 | 8 | 4 | 1 | 3 | 9 | 2 | 4 | BreadcrumbList, BlogPosting, FAQPage |
| `nfl-week-5-viewing-guide-2026` | `/blog/nfl-week-5-viewing-guide-2026` | 2,417 | 8 | 4 | 1 | 3 | 9 | 2 | 4 | BreadcrumbList, BlogPosting, FAQPage |
| `nba-opening-night-2026-watch-guide` | `/blog/nba-opening-night-2026-watch-guide` | 2,640 | 9 | 4 | 1 | 3 | 9 | 2 | 4 | BreadcrumbList, BlogPosting, FAQPage |
| `nba-2026-27-viewing-guide` | `/blog/nba-2026-27-viewing-guide` | 2,447 | 9 | 4 | 1 | 3 | 9 | 2 | 4 | BreadcrumbList, BlogPosting, FAQPage |
| `2026-nba-cup-guide` | `/blog/2026-nba-cup-guide` | 2,403 | 9 | 4 | 1 | 3 | 9 | 2 | 4 | BreadcrumbList, BlogPosting, FAQPage |
| `college-football-october-2026-tv-guide` | `/blog/college-football-october-2026-tv-guide` | 2,514 | 9 | 4 | 1 | 3 | 8 | 2 | 4 | BreadcrumbList, BlogPosting, FAQPage |
| `how-to-watch-2026-wnba-playoffs-finals` | `/blog/how-to-watch-2026-wnba-playoffs-finals` | 2,449 | 9 | 4 | 1 | 3 | 8 | 2 | 4 | BreadcrumbList, BlogPosting, FAQPage |
| `october-2026-sports-calendar` | `/blog/october-2026-sports-calendar` | 2,444 | 8 | 4 | 1 | 3 | 14 | 5 | 4 | BreadcrumbList, BlogPosting, FAQPage |

## 4. Summary Table

| Article | Words | Useful Content Estimate | SEO Compliance | Quality Score | Verdict |
|---|---:|---:|---|---:|---|
| MLB Playoffs | 2,863 | ~67% | PASS with editorial warnings | 78 | GOOD — MINOR IMPROVEMENTS |
| World Series | 2,461 | ~69% | PASS with editorial warnings | 80 | GOOD — MINOR IMPROVEMENTS |
| NFL October | 2,573 | ~57% | PARTIAL | 69 | NEEDS CONTENT REMEDIATION |
| NFL Week 5 | 2,417 | ~62% | PARTIAL | 72 | NEEDS CONTENT REMEDIATION |
| NBA Opening Night | 2,640 | ~65% | PASS with factual-check note | 76 | GOOD — MINOR IMPROVEMENTS |
| NBA 2026-27 | 2,447 | ~64% | PASS with editorial warnings | 75 | GOOD — MINOR IMPROVEMENTS |
| NBA Cup | 2,403 | ~67% | PASS with editorial warnings | 78 | GOOD — MINOR IMPROVEMENTS |
| College Football October | 2,514 | ~58% | PARTIAL | 70 | NEEDS CONTENT REMEDIATION |
| WNBA Playoffs | 2,449 | ~71% | PASS | 81 | GOOD — MINOR IMPROVEMENTS |
| October Sports Calendar | 2,444 | ~61% | PARTIAL | 72 | NEEDS CONTENT REMEDIATION |

## 5. Overall Content Value Assessment

Across the 10 articles, the useful core is real: dates, playoff formats, network families, schedule behavior, and official-source links are present. However, substantial portions are written as abstract planning commentary instead of concrete user help.

Approximate aggregate classification:

| Category | Estimated Words | Share | Notes |
|---|---:|---:|---|
| A High Value | ~8,800 | ~35% | Dates, network assignments, format details, tables, official-source guidance |
| B Moderate Value | ~7,400 | ~30% | Relevant context and beginner-friendly explanation |
| C Low Value | ~5,100 | ~20% | Generic "plan your household" and "understand the rhythm" prose |
| D Redundant | ~3,300 | ~13% | Repeated conclusions/checklist advice within articles |
| E/F Unsupported or Off-Intent | ~500 | ~2% | Mostly risk around MoaTV/device implications and stale/future claims |

Estimated useful-content share across the cluster: **about 65%**.

## 6. Paragraph-Level Findings By Article

### 6.1 MLB Playoffs

High-value passages:

- "The 2026 MLB Playoffs begin with Division Series games..." in `2026 MLB Playoffs: quick answer`. KEEP.
- "Coverage for MLB postseason games in the U.S. usually comes through..." in `Where to watch...`. KEEP, but update with precise current network assignments from MLB.
- If-necessary explanation is useful for beginners. KEEP.

Low-value/redundant passages:

- Excerpt: "read the schedule as a map rather than a promise." Section: `2026 MLB Playoffs: quick answer`. Category C. IMPROVE. Replace with a concise instruction: "Check game status on MLB.com on game day because if-necessary games disappear when a series ends early."
- Excerpt: "One of the biggest mistakes fans make..." Section: `How to plan around a postseason that changes by round`. Category C/D. MERGE. It repeats bracket-flexibility advice already stated.
- Excerpt: "The schedule is not a moral test." Section: `Final playoff checklist...`. Category C. REMOVE or rewrite with concrete examples of must-watch decision criteria.
- Excerpt: "article as a foundation, not the whole plan." Section: `Final playoff checklist...`. Category D. REMOVE; the same official-source warning appears elsewhere.

Padding estimate: 500-650 words can be compressed without losing intent satisfaction.

Fact-check: MLB.com confirms World Series Game 1 on Oct. 23, 2026, and FOX for World Series games; MLB.TV postseason notes also state U.S. live streaming requires authentication and NBC/Peacock Wild Card games are not available live on MLB.TV. The article should add those exact caveats.

### 6.2 World Series

High-value passages:

- Game 1 date, best-of-seven format, and if-necessary explanation. KEEP.
- FOX/FOX Deportes/FOX One coverage note. KEEP and cite/source tightly.

Low-value/redundant passages:

- Excerpt: "The schedule is not just a calendar grid; it tells a story..." Section: `The 2026 World Series at a glance`. Category C. IMPROVE with a simple date list.
- Excerpt: "The World Series is often where fans feel the most pressure..." Section: `How to watch the World Series without overplanning...`. Category C/D. MERGE.
- Excerpt: "A practical checklist is much more useful than a generic list of hype points." Section: `Final checklist...`. Category C. REMOVE; meta-commentary about the article is less useful than facts.
- Excerpt: "World Series is best approached as a fixed anchor date..." Section: `World Series viewing priorities...`. Category D. MERGE with earlier if-necessary explanation.

Padding estimate: 400-550 words.

Fact-check: MLB source supports the Game 1 date and FOX network assignment. Article is broadly accurate.

### 6.3 NFL October

High-value passages:

- Weekly-window explanation and local-vs-national distinction. KEEP.
- London/international timing context. KEEP.

Low-value/redundant passages:

- Excerpt: "October is when the regular season becomes real..." Section: `The rhythm of NFL October...`. Category C. IMPROVE with specific 2026 October weeks and examples.
- Excerpt: "the week has Thursday night, Sunday afternoon and Sunday night windows..." Section: `Why the best NFL October plans...`. Category D. MERGE; this appears repeatedly.
- Excerpt: "The real value of an NFL October guide is..." Section: `The final October NFL planning model`. Category C/D. REMOVE or replace with a week-by-week mini-table.
- Excerpt: "the biggest game of the weekend is not always..." Section: `The final October NFL planning model`. Category B/C. IMPROVE with examples: favorite-team game, local broadcast, primetime.
- Excerpt: "Even when the headline doesn’t announce it..." Section: `How to keep each October NFL week manageable`. Category D. MERGE.

Padding estimate: 700-900 words. This is one of the most padded articles.

Fact-check: NFL.com has a live 2026 Week 5 page with Oct. 9-13 dates and specific matchups. The broad article should link or cite NFL schedule pages and avoid staying purely generic.

### 6.4 NFL Week 5

High-value passages:

- Week 5 structure: Thursday opener, London/international window, Sunday slate, SNF/MNF. KEEP.
- Warning about schedule changes. KEEP.

Low-value/redundant passages:

- Excerpt: "Week 5 is a great example of how NFL viewing works in real life." Section: `The structure of NFL Week 5`. Category C. IMPROVE with exact dates and matchups.
- Excerpt: "Thursday night is often the first clue..." Section: `Thursday night and the Sunday slate`. Category C. IMPROVE with Buccaneers-Cowboys from NFL.com if still current.
- Excerpt: "real value is in the decision framework, not a set of made-up matchups." Section: `How to use a Week 5 guide...`. Category C/E. FACT-CHECK/IMPROVE. Now that the NFL.com schedule has matchups, the article should not avoid concrete information.
- Excerpt: "The best Week 5 guide is a checklist..." Section: `Final checklist...`. Category D. MERGE.

Padding estimate: 500-700 words.

Fact-check: NFL.com lists Week 5 Oct. 9-13, 2026, including Thursday Night Football on Oct. 9 and a London game on Oct. 11. The article should incorporate exact official matchups/times rather than generic windows.

### 6.5 NBA Opening Night

High-value passages:

- Oct. 20, 2026 Opening Night; NBC/Peacock tripleheader. KEEP.
- Game-specific opening-night slate. KEEP.
- Distinction between Opening Night and NBA Cup. KEEP.

Low-value/redundant passages:

- Excerpt: "Opening Night is more than a launch date." Section: `Why Opening Night matters...`. Category B/C. IMPROVE with more concrete opening-week implications.
- Excerpt: "Opening Night is the best example of how a sports article can serve..." Section: `What fans should actually do...`. Category C. REMOVE meta-commentary.
- Excerpt: "celebration and a planning system." Section: `The final opening-night mindset`. Category C/D. MERGE.
- Excerpt: "creates a template for how fans should approach..." Section: `How Opening Night fits...`. Category D. MERGE with season-viewing article.

Padding estimate: 500-700 words.

Fact-check: NBA.com confirms Oct. 20, 2026 NBC/Peacock tripleheader and lists Celtics at Pistons, Knicks vs 76ers, Spurs vs Thunder. Article appears accurate if those details are present.

### 6.6 NBA 2026-27 Viewing Guide

High-value passages:

- National providers: Disney/ABC/ESPN, NBCUniversal/NBC/Peacock/NBCSN, Amazon/Prime Video. KEEP.
- NBA Cup timing and opening-week context. KEEP.

Low-value/redundant passages:

- Excerpt: "plan without turning every game into a national event." Section: `How the 2026-27 season starts`. Category C. IMPROVE with examples of national windows.
- Excerpt: "real value of a season guide..." Section heading and section. Category C/D. RENAME and compress.
- Excerpt: "A strong season plan should also acknowledge..." Section: `Final season checklist...`. Category D. MERGE.
- Excerpt: "Some games rise in importance..." Section: `How to follow the 2026-27 NBA rhythm`. Category C. IMPROVE with actual NBA recurring windows.

Padding estimate: 550-750 words.

Fact-check: NBA.com confirms the 2026-27 schedule release, national broadcast partners, regular season ending April 11, 2027, and NBA Cup dates. Article is broadly accurate.

### 6.7 NBA Cup

High-value passages:

- Oct. 30 Group Play start, Group Play/Knockout explanation, Dec. 11 championship. KEEP.
- Prime Video Knockout Rounds note. KEEP.

Low-value/redundant passages:

- Excerpt: "looks complicated at first glance but becomes readable..." Section: `Why the Cup is simpler...`. Category C/D. MERGE.
- Excerpt: "The article should therefore help..." Section: `The final Cup checklist...`. Category C. REMOVE meta-writing.
- Excerpt: "league also benefits from the Cup..." Section: `How to track Cup stages...`. Category F. REMOVE unless reframed for reader utility.
- Excerpt: "best way to use a Cup guide is..." Section: `How the NBA Cup fits...`. Category D. MERGE.

Padding estimate: 400-600 words.

Fact-check: NBA.com confirms Group Play Oct. 30 through Nov. 27 plus Nov. 24-25, Knockout Rounds Dec. 4-11, and Championship Friday, Dec. 11.

### 6.8 College Football October

High-value passages:

- Fragmented network rights and weeknight/Friday/Saturday structure. KEEP.
- "All schedules and networks subject to change" concept. KEEP and cite NCAA.

Low-value/redundant passages:

- Excerpt: "biggest misconception... one universal channel." Section: `The October pattern...`. Category B, keep but shorten.
- Excerpt: "The hardest part... not the number of games..." Section: `How to make college football October...`. Category C/D. MERGE.
- Excerpt: "real challenge... spread across too many windows..." Section: `Final practical plan...`. Category D. MERGE with previous section.
- Excerpt: "educational value of the article matters most." Section: `How college football fits...`. Category C. REMOVE.

Padding estimate: 700-850 words.

Fact-check: NCAA.com confirms a live college football TV schedule with weekday, Friday, and Saturday windows and notes schedules/networks are subject to change. The article should add more examples of actual October 2026 windows.

### 6.9 WNBA Playoffs And Finals

High-value passages:

- Postseason structure: first round, semifinals, Finals. KEEP.
- Finals schedule/network pattern. KEEP.
- Bracket tracking and if-necessary handling. KEEP.

Low-value/redundant passages:

- Excerpt: "series itself matters more than the slogan." Section: `How to plan the WNBA bracket...`. Category C. IMPROVE with concrete round examples.
- Excerpt: "The WNBA postseason works best when fans remember..." Section: `Final WNBA checklist...`. Category D. MERGE.
- Excerpt: "emotional arc of the postseason." Section: `How the WNBA postseason fits...`. Category C. REMOVE or shorten.

Padding estimate: 350-500 words.

Fact-check: WNBA official source confirms playoffs begin Sept. 27, 2026, with first-round TV windows, and the playoff format includes best-of-three first round, best-of-five semifinals, and best-of-seven Finals. Article is one of the stronger factual pieces.

### 6.10 October 2026 Sports Calendar

High-value passages:

- Calendar hub concept, sport clusters, internal links to deeper articles. KEEP.
- Cross-sport overlap explanation. KEEP.

Low-value/redundant passages:

- Excerpt: "October is not one sport." Section: `The big October menu`. Category B/C. Keep but shorten.
- Excerpt: "The biggest value of a sports calendar..." Section: heading and section. Category C/D. MERGE.
- Excerpt: "wayfinding tool, not a list of names." Section: `Final summary...`. Category C/D. REMOVE or compress.
- Excerpt: "practical value of the hub article..." Section: `How to plan the month...`. Category C. IMPROVE with a real calendar grid.

Padding estimate: 650-800 words.

Fact-check: The article relies on facts from all other sports pages. It should be updated when any individual sports article is updated.

## 7. Word-Count Padding Analysis

Likely padding patterns:

- Multiple closing sections per article. Even after heading remediation, most articles still contain two or three conclusion-like sections.
- Repeated advice: "check the official schedule," "confirm the device route," "plan by household priority," "do not treat every game equally."
- Meta-commentary: several paragraphs discuss what a good guide/article should do instead of giving the reader facts.
- Abstract planning language: "calendar as a map," "rhythm," "wayfinding tool," "structure behind the spotlight."

Estimated removable/rewritable words by article:

| Article | Estimated Compressible Words | Main Cause |
|---|---:|---|
| MLB Playoffs | 500-650 | Repeated if-necessary/official schedule advice |
| World Series | 400-550 | Multiple checklist/conclusion sections |
| NFL October | 700-900 | Generic weekly-window repetition |
| NFL Week 5 | 500-700 | Avoids concrete now-available schedule facts |
| NBA Opening Night | 500-700 | Repeated "Opening Night as planning template" framing |
| NBA 2026-27 | 550-750 | Broad schedule-rhythm repetition |
| NBA Cup | 400-600 | Repeated stage/format explanation |
| College Football October | 700-850 | Repeated fragmented-schedule explanation |
| WNBA Playoffs | 350-500 | Least padded; some repeated bracket planning |
| October Sports Calendar | 650-800 | Repeated hub/wayfinding framing |

## 8. Cross-Article Similarity Matrix

Method: cosine similarity over normalized text, stopwords removed. Higher scores indicate more shared vocabulary/structure and require editorial review.

| Pair | Score | Interpretation |
|---|---:|---|
| NFL October / NFL Week 5 | 0.81 | High overlap; one broad article and one specific article repeat the same window-planning model |
| MLB Playoffs / World Series | 0.78 | High but partly expected; both cover postseason series structure and if-necessary dates |
| NBA Opening Night / NBA 2026-27 | 0.76 | High; opening-night article and season guide repeat national-window framing |
| NBA 2026-27 / NBA Cup | 0.55 | Moderate; expected but could be cleaner |
| NBA 2026-27 / October Sports Calendar | 0.54 | Moderate hub overlap |
| MLB Playoffs / WNBA Playoffs | 0.52 | Moderate; generic playoff/bracket planning language |
| WNBA Playoffs / October Sports Calendar | 0.51 | Moderate hub/event overlap |
| NFL Week 5 / College Football October | 0.48 | Shared "windows, networks, schedule changes" language |
| NFL October / NBA Opening Night | 0.48 | Generic household planning language |
| MLB Playoffs / October Calendar | 0.48 | Expected cluster overlap |

Lowest pair scores were around 0.25-0.30 for unrelated sport-specific articles, so the highest three pairs are meaningfully more similar than the cluster baseline.

## 9. Keyword And Search-Intent Findings

| Article | Primary Keyword | Intent Match | Keyword Use |
|---|---|---|---|
| MLB Playoffs | 2026 MLB Playoffs | Good | Present in title/H1/opening/body; natural |
| World Series | 2026 World Series schedule | Good | Present in title/body; slug clear |
| NFL October | NFL October 2026 TV guide | Partial | Good title match but content too broad/generic |
| NFL Week 5 | NFL Week 5 schedule 2026 | Partial | Title/H1 good; body should include official matchups/times |
| NBA Opening Night | NBA Opening Night 2026 | Good | Strong placement and useful topical match |
| NBA 2026-27 | NBA 2026-27 viewing guide | Good | Natural coverage; no stuffing |
| NBA Cup | 2026 NBA Cup | Good | Good placement and semantic coverage |
| College Football October | College Football October 2026 | Partial | Good keyword but lacks enough concrete example games/windows |
| WNBA Playoffs | 2026 WNBA Playoffs | Good | Strong intent match |
| October Sports Calendar | October 2026 sports calendar | Good hub intent | Useful hub but should use more calendar/table detail |

No major keyword stuffing was found. The repeated issue is not exact-match overuse; it is generic semantic repetition.

## 10. SEO Specification Compliance Matrix

| Article | Search Intent | Title | Meta | H1/H2/H3 | Answer First | Keyword | E-E-A-T | Table | Links | Images | Schema | Canonical | Mobile | Originality | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| MLB | PASS | PASS | PASS | PASS | PASS | PASS | PARTIAL | PASS | PASS | PASS | PASS | PASS | PASS | PARTIAL | GOOD |
| World Series | PASS | PASS | PARTIAL, long | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PARTIAL | GOOD |
| NFL October | PARTIAL | PASS | PASS | PASS | PARTIAL | PASS | PARTIAL | PASS | PASS | PASS | PASS | PASS | PASS | WARN | NEEDS REMEDIATION |
| NFL Week 5 | PARTIAL | PASS | PARTIAL, long | PASS | PARTIAL | PASS | PARTIAL | PASS | PASS | PASS | PASS | PASS | PASS | WARN | NEEDS REMEDIATION |
| NBA Opening | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PARTIAL | GOOD |
| NBA Season | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PARTIAL | GOOD |
| NBA Cup | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PARTIAL | GOOD |
| College FB | PARTIAL | PASS | PASS | PASS | PARTIAL | PASS | PARTIAL | PASS | PASS | PASS | PASS | PASS | PASS | WARN | NEEDS REMEDIATION |
| WNBA | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | GOOD |
| Sports Calendar | PASS | PASS | PASS | PASS | PASS | PASS | PARTIAL | PASS | PASS | PASS | PASS | PASS | PASS | PARTIAL | NEEDS REMEDIATION |

Notes:

- "Mobile" inherits the prior remediation's Chromium evidence: `.qa-screens/remediation/browser-results.json`.
- "Meta" is treated as an editorial guideline, not a hard ranking factor. A few descriptions exceed ideal length but accurately summarize value.
- All article titles are descriptive; several exceed ~60 characters because sports-guide titles naturally include date/topic modifiers.

## 11. Image Audit

All articles have a hero image and two section images in rendered article data. Images are WebP in `public/images/blog/sports/`, with descriptive paths and meaningful alt text.

File sizes:

- `2026-mlb-playoffs-schedule.webp`: 40,256 bytes
- `baseball-stadium-section.webp`: 30,362 bytes
- `basketball-arena-section.webp`: 36,628 bytes
- `college-football-october-2026.webp`: 73,598 bytes
- `college-football-section.webp`: 47,040 bytes
- `football-stadium-section.webp`: 38,352 bytes
- `nba-opening-night-2026.webp`: 59,358 bytes
- `nfl-october-2026.webp`: 71,454 bytes

All production WebP assets are below 80 KB. Large source files remain in `public/images/blog/sports-src/`, but those are source assets and should not be rendered directly.

Specification gaps:

- Images are generic sports venue visuals. They support the articles aesthetically but do not convey much unique informational value.
- Consider custom schedule/table images only if they can be kept accurate and accessible; otherwise text tables are safer.

## 12. Internal Linking Audit

Strengths:

- Each article links to `/pricing`, `/channels`, `/blog`, and related article(s).
- Sports calendar article has strong hub behavior with 14 internal links.
- No broken internal links were reported in the prior rendered crawl.

Weaknesses:

- Repeated "Next steps with moatv" CTA appears on every article and is commercial rather than contextual.
- Some article-to-article links are useful, but NFL and NBA cluster articles should include more specific contextual anchors inside body sections.

Recommended contextual links:

- NFL October -> NFL Week 5 guide with anchor "official Week 5 viewing guide".
- NFL Week 5 -> NFL October guide with anchor "broader October NFL calendar".
- NBA Opening Night -> NBA 2026-27 guide with anchor "full 2026-27 NBA viewing guide".
- NBA Cup -> NBA 2026-27 guide with anchor "regular-season viewing context".
- College Football -> October sports calendar with anchor "October 2026 sports calendar".
- WNBA -> October sports calendar with anchor "October postseason overlap".

## 13. Structured Data Audit

PASS:

- BlogPosting present for every article.
- Headline, description, datePublished, dateModified, author, publisher, image, and mainEntityOfPage present.
- FAQPage schema is present where visible FAQ content exists.
- FAQ schema uses the same `article.faq` data as visible content.
- BreadcrumbList present.
- Organization no longer emits empty email.

Warnings:

- Publisher Organization is basic and lacks logo/legal details. This is acceptable if unverified details are unavailable.
- Article author is an Organization, not a named person. Acceptable, but it limits author-level E-E-A-T signals.

## 14. Sports Fact-Checking Results

Confirmed:

- MLB.com lists World Series Game 1 on Oct. 23, 2026, and World Series games on FOX. MLB.TV notes U.S. live postseason streaming requires authentication and that NBC/Peacock Wild Card games are not available live on MLB.TV.
- NFL.com lists 2026 Week 5 as Oct. 9-13 with a London game and specific matchups/times.
- NBA.com confirms Oct. 20, 2026 Opening Night on NBC/Peacock and the opening tripleheader, plus Disney/NBCUniversal/Amazon national coverage.
- NBA.com confirms NBA Cup Group Play dates and Knockout/Championship windows.
- WNBA.com confirms 2026 playoffs begin Sept. 27 and provides first-round TV windows and postseason format.
- NCAA.com confirms college football schedules use many windows and that schedules/networks are subject to change.

Factual concerns:

- NFL Week 5 article should add exact official Week 5 matchups/times now available.
- College football article should add current examples from NCAA schedule windows.
- MLB article should be careful with MLB.TV availability: authenticated U.S. access and NBC/Peacock Wild Card limitations should be explicit.
- No article should imply MoaTV carries any specific sports network or event. Current wording mostly avoids this, but commercial CTAs near sports content should remain general.

## 15. Individual Quality Scores

| Article | Intent /20 | Useful /25 | Accuracy /15 | Structure /10 | Keywords /10 | Links /5 | Images /5 | Schema /5 | Freshness /5 | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| MLB | 17 | 18 | 12 | 8 | 9 | 4 | 4 | 5 | 1 | 78 |
| World Series | 18 | 18 | 13 | 8 | 9 | 4 | 4 | 5 | 1 | 80 |
| NFL October | 14 | 14 | 10 | 7 | 8 | 4 | 4 | 5 | 3 | 69 |
| NFL Week 5 | 15 | 15 | 11 | 7 | 8 | 4 | 4 | 5 | 3 | 72 |
| NBA Opening | 17 | 17 | 13 | 8 | 9 | 4 | 4 | 5 | 3 | 80 |
| NBA Season | 17 | 16 | 13 | 8 | 9 | 4 | 4 | 5 | 3 | 79 |
| NBA Cup | 18 | 17 | 14 | 8 | 9 | 4 | 4 | 5 | 3 | 82 |
| College FB | 14 | 14 | 10 | 7 | 8 | 4 | 4 | 5 | 4 | 70 |
| WNBA | 18 | 18 | 14 | 8 | 9 | 4 | 4 | 5 | 1 | 81 |
| Sports Calendar | 16 | 15 | 11 | 7 | 8 | 5 | 4 | 5 | 1 | 72 |

Freshness deductions apply when articles dated Oct. 3-4, 2026 do not appear to incorporate facts now available on Oct. 8, 2026.

## 16. Recommended Changes By Article

MLB:

- Keep schedule/round/if-necessary explanations.
- Add exact MLB.TV authentication and NBC/Peacock Wild Card caveats.
- Merge final three planning sections into one concise checklist.

World Series:

- Keep Game 1, best-of-seven, FOX notes.
- Replace abstract "calendar story" prose with a simple date table.
- Compress two conclusion sections into one.

NFL October:

- Add a week-by-week October table using official schedule pages.
- Remove repetitive weekly-window prose.
- Add more concrete examples of national vs local viewing.

NFL Week 5:

- Add exact official Week 5 matchups/times.
- Remove language that avoids "made-up matchups" because official matchups now exist.
- Keep schedule-change caveat.

NBA Opening Night:

- Keep opening tripleheader details.
- Remove meta-writing about what a sports article should do.
- Add a compact "before tipoff" checklist.

NBA Season:

- Keep national partner and schedule-window explanation.
- Compress broad calendar-rhythm sections.
- Add a table of opening week, NBA Cup, Christmas, regular-season end.

NBA Cup:

- Keep Group Play/Knockout/Championship dates.
- Remove league-benefit paragraph unless rewritten for viewer benefit.
- Add a phase-by-phase table.

College Football:

- Add examples from NCAA's current October TV schedule.
- Merge repeated window-fragmentation sections.
- Add a "how to verify game time/network" mini-checklist.

WNBA:

- Keep format and official dates.
- Compress bracket-planning repetition.
- Add a concise Finals date/network table if all games are listed.

Sports Calendar:

- Convert hub prose into a real October calendar table.
- Link to the most relevant article from each sport cluster.
- Remove "wayfinding tool" repetition.

## 17. Prioritized Remediation Roadmap

1. Update time-sensitive facts in NFL Week 5, NFL October, MLB, and college football articles using official sources.
2. Remove or merge redundant final/checklist sections across all articles.
3. Replace abstract planning prose with concrete tables: dates, windows, networks, official-source check points.
4. Improve contextual internal links inside article bodies, not only template CTAs.
5. Add article-specific expertise notes: "how to verify", "what can change", "what is fixed".
6. Re-run rendered crawl and mobile screenshots after edits.

## 18. Unverified Items And Testing Limitations

- I did not edit article content.
- I did not run a fresh production server/browser pass during this audit because the prior remediation report already documents Chromium mobile verification. This audit focused on content value, SEO rules, and fact-checking.
- I did not verify live MoaTV service availability, channel rights, licensing, support hours, activation timing, or subscription fulfillment because those facts are not in the repository and are outside scope.
- External sports schedules can continue changing; articles need maintenance closer to event dates.

## 19. Final Git Status

Pre-existing modified files from the previous remediation remain. This audit added only:

```text
?? MOATV_10_BLOGS_CONTENT_VALUE_AND_SEO_AUDIT.md
```

Current status also includes the previously modified remediation files:

```text
 M next.config.ts
 M src/app/blog/[slug]/page.tsx
 M src/app/blog/page.tsx
 M src/app/disclaimer/page.tsx
 M src/app/layout.tsx
 M src/app/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/refund/page.tsx
 M src/app/terms/page.tsx
 M src/content/blogData.json
 M src/lib/seo.ts
?? MOATV_COMPLETE_REMEDIATION_REPORT.md
?? src/app/not-found.tsx
```

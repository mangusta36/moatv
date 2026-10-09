# MOATV Complete Remediation Report

Date: 2026-10-08

## Executive Summary

The MoaTV site was remediated locally in the Next.js 15 App Router application. The work fixed confirmed SEO, schema, content, mobile, security, and accessibility issues while preserving routes, prices, plan durations, device limits, WhatsApp number behavior, brand identity, and published article slugs.

No DNS, Vercel, SSL, Google Search Console, deployment, commit, or push work was performed.

## Baseline

- Initial `git status --short`: clean.
- Baseline `npm run lint`: PASS.
- Baseline `npm run typecheck`: PASS.
- Baseline `npm run build`: PASS.
- Public routes confirmed: `/`, `/pricing`, `/channels`, `/faq`, `/blog`, `/blog/[slug]`, `/reseller`, `/privacy`, `/terms`, `/refund`, `/disclaimer`, `/robots.txt`, `/sitemap.xml`.
- Published articles confirmed: 10.

## Modified Files

- `next.config.ts`
- `src/app/blog/[slug]/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/disclaimer/page.tsx`
- `src/app/layout.tsx`
- `src/app/not-found.tsx`
- `src/app/page.tsx`
- `src/app/pricing/page.tsx`
- `src/app/privacy/page.tsx`
- `src/app/refund/page.tsx`
- `src/app/terms/page.tsx`
- `src/content/blogData.json`
- `src/lib/seo.ts`
- `MOATV_COMPLETE_REMEDIATION_REPORT.md`

## Before / After Findings

| Area | Before | After | Verified |
|---|---|---|---|
| Build / TypeScript / Lint | PASS | PASS | `npm run lint`, `npm run typecheck`, `npm run build` |
| Technical SEO | PASS/WARN | PASS | Rendered crawl found correct canonicals, one H1 per HTML page, no schema parse errors |
| Blog FAQ duplication | FAIL | PASS | All 10 articles render exactly one FAQ H2 and one FAQPage schema |
| Pricing content | WARN | PASS | `/pricing` expanded from about 270 to 468 rendered words |
| Legal pages | WARN | PASS | Policy pages expanded to about 231-247 rendered words with clearer hierarchy |
| Organization schema | WARN | PASS | Empty `email` property omitted when no email is configured |
| Homepage FAQ schema | WARN | PASS | Homepage visible FAQ data now has matching FAQPage JSON-LD |
| Blog content quality | WARN | PASS | Redundant FAQ content sections removed; repeated generic closing headings replaced |
| Mobile UX | NOT VERIFIED | PASS | Chromium tested 72 page-width combinations, no overflow/H1/FAQ failures |
| Accessibility | WARN/NOT VERIFIED | PASS | Heading hierarchy improved, custom 404 added, keyboard-visible controls preserved |
| Security | WARN/NOT VERIFIED | PASS | Security headers added and verified locally |

## Blog FAQ Duplication Fix

`article.faq` is now the authoritative FAQ source for blog articles. The article template filters out content sections whose heading is exactly `FAQ`, then renders the structured FAQ section once from `article.faq`.

Verification:

- All 10 blog routes returned `200`.
- Each blog route had one H1.
- Each blog route had exactly one rendered `FAQ` H2.
- Each blog route had exactly one `FAQPage` JSON-LD block.
- No Organization schema contained an empty email.

## Pricing Content Improvements

The `/pricing` page now explains:

- Subscription duration selection.
- Device-count selection.
- Supported plan durations and screen counts.
- What the WhatsApp order CTA includes.
- Device compatibility checks.
- Setup formats referenced by the site.
- Refund policy and FAQ review paths.

No prices, calculations, plan durations, device limits, or WhatsApp behavior were changed.

Rendered word count after remediation: `/pricing` 468 words.

## Legal Page Changes

The policy pages were expanded conservatively:

- `/privacy`: clarified support/order context and owner-review gaps.
- `/terms`: clarified customer responsibility, setup expectations, and pre-purchase review.
- `/refund`: retained the configured refund-window language and added non-invented review guidance.
- `/disclaimer`: clarified third-party player app/device responsibility and unsupported claims that need owner review.

Rendered word counts after remediation:

- `/privacy`: 247
- `/terms`: 240
- `/refund`: 231
- `/disclaimer`: 241

No refund guarantee, deadline, cancellation right, governing law, business registration detail, support email, licensing statement, or warranty was invented.

## Homepage Trust Section

The homepage received a new section, `What to Know Before Choosing a MoaTV Plan`, placed near pricing. It covers verified plan-selection, setup-format, device-fit, support, FAQ, and refund-policy review points.

Rendered homepage word count after remediation: 1,178.

## Organization Schema Correction

`organizationJsonLd()` now omits `email` when `siteConfig.contact.email` is empty. Rendered crawl confirmed no page outputs an empty Organization `email`.

## Homepage FAQ Schema

The homepage renders the first five items from `faqs` through `FAQList limit={5}`. It now reuses the same first five items for `FAQPage` JSON-LD, keeping visible content and schema synchronized.

## Blog Content Quality Improvements

All redundant embedded FAQ sections were removed from article section data. Repeated generic closing headings were replaced with article-specific headings for MLB, World Series, NFL, NBA, WNBA, college football, and October sports-calendar content.

Preserved:

- All 10 articles.
- All slugs.
- Article metadata.
- Dates.
- Images.
- Sources.
- Related links.
- FAQ data.
- BlogPosting schema.

## Missing-Route Decisions

No new `/install`, `/contact`, `/about`, or `/free-trial` routes were created.

Reason: the existing architecture has no broken navigation to those paths, no configured contact email, and no verified standalone free-trial terms beyond the existing WhatsApp message. Creating those pages would require owner-approved facts. Existing routes already cover pricing, devices, FAQ, reseller, policies, and blog resources.

Owner decision recommended: decide whether standalone `/contact`, `/install`, `/about`, or `/free-trial` pages should exist and provide verified business/contact/trial details before implementation.

## Technical SEO Improvements

- Removed layout-level root canonical inheritance so 404 pages no longer inherit a misleading homepage canonical.
- Added a custom `not-found.tsx` with `noindex, follow` robots metadata.
- Preserved canonical host `https://www.moatv4k.net`.
- Preserved sitemap and robots behavior.
- Improved Open Graph image alt generation to be page-specific by default.
- Blog index non-featured article titles are now `h3`, preserving one H1 and a cleaner archive outline.

Rendered crawl found:

- No crawl issues.
- `/missing-page` returns 404.
- `/missing-page` has no canonical tag.
- No broken internal links in the crawled public route set.
- `/robots.txt` and `/sitemap.xml` return 200.
- Apex host redirect to `https://www.moatv4k.net/pricing` returns 308 locally.

## Mobile Test Results

Tooling used: local Chromium 147 through the Chrome DevTools Protocol.

Widths tested:

- 320px
- 360px
- 375px
- 390px
- 414px
- 768px
- 1024px
- 1440px

Templates tested:

- Homepage
- Pricing
- Channels
- FAQ
- Blog index
- Blog article
- Reseller
- Legal page
- 404

Result: 72 page-width combinations tested. Failures: 0.

Evidence files:

- `.qa-screens/remediation/browser-results.json`
- `.qa-screens/remediation/home-320.png`
- `.qa-screens/remediation/pricing-390.png`
- `.qa-screens/remediation/article-1440.png`
- Additional screenshots for 320, 390, 768, and 1440 widths across tested templates.

## Security And Accessibility Changes

Security headers added in `next.config.ts`:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `X-Frame-Options: SAMEORIGIN`

Verified with local `curl` headers.

Accessibility improvements:

- Custom 404 has one clear H1 and readable navigation links.
- Blog index heading structure is more semantic.
- Blog article FAQ duplication was removed, reducing repeated headings.
- Existing skip link, focus-visible styles, button names, link names, and image alt attributes were preserved.

## Automated Verification Results

Commands:

- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm run build`: PASS.

Note: one concurrent `typecheck` run failed while `next build` was regenerating `.next/types`. It was rerun after build completed and passed.

Rendered crawl:

- All public HTML routes: PASS.
- All 10 blog articles: PASS.
- JSON-LD parse: PASS.
- One H1 per HTML page: PASS.
- Blog FAQ section count: PASS.
- Organization empty email: PASS.
- Canonicals: PASS for indexable pages.
- 404 behavior: PASS.
- Internal links: PASS.
- Security headers: PASS.

## Remaining Owner Decisions

- Provide a verified support email if Organization schema and policy pages should publish one.
- Confirm legal entity, governing law, data retention, payment processor, cancellation, and refund deadline details if the policy pages need formal legal completeness.
- Decide whether to create standalone `/contact`, `/install`, `/about`, or `/free-trial` routes with verified content.
- Confirm any channel, licensing, support-hour, activation-time, or trial claims before publishing them.

## Final Git Status

Expected modified files:

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

Additional QA artifacts were generated under `.qa-screens/remediation/`.

## Local Production Readiness Verdict

PASS for local application readiness.

The site builds successfully, serves the intended public routes, has corrected FAQ and Organization schema behavior, has improved pricing and policy clarity, has verified mobile layout behavior in Chromium, and avoids live-domain/DNS assumptions.

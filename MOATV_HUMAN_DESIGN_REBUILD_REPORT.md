# MOA TV Human Design Rebuild Report

## 1. Problems Found in the Old Design

- The site used a dark cyber-style palette with indigo/cyan glow effects, glass panels, gradient headings, and oversized rounded surfaces.
- Many sections followed the same generated-looking pattern: badge, large heading, paragraph, and repeated cards.
- The previous homepage used fake-feeling UI overlays, floating badges, animated dots, and decorative glow treatments instead of a natural commercial flow.
- Pricing felt like a configurator/dashboard rather than normal subscription pricing.
- Internal pages were visually consistent, but too card-heavy and too similar from page to page.

## 2. New Visual Direction

The rebuilt site uses a strict MOA TV yellow, white, and black identity: white-dominant pages, black typography, neutral separators, yellow CTAs, and a black footer. The design is intended to feel bright, commercial, energetic, trustworthy, and easy to buy from.

## 3. Color Palette

- Page background: `#ffffff`
- Alternate section: `#f7f7f7`
- Neutral section: `#efefef`
- Primary text / black: `#111111`
- Secondary text: `#666666`
- Border: `#e5e5e5`
- Primary yellow: `#f4c400`
- Yellow hover: `#d9ad00`

## 4. Typography

The rebuild keeps a clean sans-serif stack through the app, but changes the hierarchy: less extreme display sizing, semibold headings instead of overly heavy text everywhere, readable body line-height, and constrained paragraph widths.

## 5. Hero Implementation

The homepage now uses a full-width realistic living-room/TV hero image at `public/images/moatv-living-room-hero.webp`. It is loaded with `next/image`, `priority`, `fill`, and responsive sizing. A neutral white overlay and left-to-right readability gradient keep the image visible while allowing the yellow CTA to provide the primary brand impact.

## 6. Homepage Structure

The homepage was rebuilt around a natural customer journey:

1. Full-width image hero
2. Short service introduction
3. Reasons to choose MOA TV
4. Supported devices
5. Normal pricing cards
6. How getting started works
7. Platform setup notes
8. FAQ
9. Simple final CTA

## 7. Pricing Implementation

Pricing now uses normal subscription cards with white backgrounds, subtle neutral borders, black text, compact copy, clear prices, and yellow CTAs/selected states. The real pricing from `src/config/pricing.ts` remains unchanged.

## 8. Device Selector Behavior

The pricing device selector remains interactive and updates prices using the existing `calculatePlanPrice` logic. It is now a compact segmented control above the cards, wrapping cleanly on mobile.

## 9. Navigation

The header was redesigned as a normal compact professional header, not a floating pill. Final navigation:

- Pricing: `/pricing`
- Devices: `/channels`
- FAQ: `/faq`
- Blog: `/blog`
- Reseller: `/reseller`

Mobile navigation includes the same links plus Configure Plan.

## 10. Blog Redesign

The blog index was redesigned as an editorial index with a featured article treatment and quieter article rows. Existing blog content, slugs, metadata, and article URLs were preserved:

- `/blog/choose-iptv-device`
- `/blog/iptv-setup-methods`

## 11. Reseller Redesign

The reseller page now reads like a professional business inquiry page. It explains the reseller concept, benefits, inquiry workflow, getting started, and reseller FAQ without inventing earnings, margins, customer counts, fake pricing, or guarantees.

## 12. Internal Page Redesign

The new visual system was applied across key public pages:

- `/pricing`
- `/channels`
- `/faq`
- `/blog`
- `/blog/[slug]`
- `/reseller`
- Legal/policy pages

## 13. Mobile Strategy

Mobile layouts use simpler stacking, readable heading sizes, stronger hero image overlay, compact buttons, wrapped pricing controls, and no horizontal overflow. The hero keeps the full-width image background while improving text contrast on narrow screens.

## 14. Accessibility

- One H1 per inspected page.
- Mobile menu uses `aria-expanded` and `aria-controls`.
- Pricing device selector uses `aria-pressed`.
- FAQ accordion buttons use `aria-expanded`.
- Focus styles remain visible on interactive elements.
- Body text contrast is improved by moving away from tiny gray text on dark backgrounds.

## 15. Performance

- No new JavaScript dependencies were added.
- The hero image was optimized to WebP at about 187KB.
- No video backgrounds, animation libraries, carousels, or third-party scripts were added.
- Client components remain limited to interactive pieces such as header, pricing selector, and FAQ.

## 16. SEO Preserved

Preserved:

- Existing routes
- Metadata helpers
- Canonical URL generation
- Sitemap and robots routes
- Blog slugs
- BlogPosting JSON-LD
- FAQPage JSON-LD
- Breadcrumb JSON-LD
- Website and Organization JSON-LD
- Pricing data and business configuration

## 17. Components Removed

No component files were removed from the project permanently, but the old implementations of the homepage, sections, blog pages, and reseller page were replaced.

## 18. Components Created/Refactored

Refactored:

- `src/app/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/reseller/page.tsx`
- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/components/ButtonLink.tsx`
- `src/components/PageHero.tsx`
- `src/components/PricingSelector.tsx`
- `src/components/Sections.tsx`
- `src/app/globals.css`
- `tailwind.config.ts`

Created:

- `public/images/moatv-living-room-hero.webp`

## 19. Visual QA

Three visual passes were performed:

- Pass 1: checked structure, proportions, hero, major spacing, page rhythm, pricing layout.
- Pass 2: refined the mobile pricing selector after screenshot review.
- Pass 3: strengthened mobile hero overlay for better headline readability over the image.

Screenshots were captured using the production build in Chromium headless.

## 20. Exact Viewport Sizes Tested

Required checks:

- Home: 390px, 768px, 1440px
- Pricing: 390px, 768px, 1440px
- Blog: 390px, 1440px
- Blog article: 390px, 1440px
- Reseller: 390px, 1440px
- Install: 390px, 1440px
- FAQ: 390px, 1440px

Additional mobile/tablet/desktop checks:

- Home: 360px, 430px, 1024px, 1280px

## 21. Lint Result

`npm run lint` passed.

## 22. TypeScript Result

`npx tsc --noEmit` passed.

## 23. Build Result

`npm run build` passed. Next.js generated 21 static pages successfully.

## 24. Remaining Issues

- `siteConfig.productionDomain` is set to `https://moatv.us` so canonical and Open Graph URLs are production-correct.
- Contact, checkout, WhatsApp, free trial, and reseller destinations remain empty where the project has no real configured destination. The redesign did not invent contact information.

# MOATV CTA + WhatsApp Audit

## Official WhatsApp Number

- Source inspected: `src/config/site.ts` -> `siteConfig.contact.whatsapp`.
- Current value found in project: empty string, now sourced from `NEXT_PUBLIC_MOATV_WHATSAPP` when provided.
- Status: UNVERIFIED. No official WhatsApp number exists in the current repository/config, and no number was invented.

## Centralized Helper

- Helper added: `src/lib/whatsapp.ts`.
- Uses one number source: `siteConfig.contact.whatsapp`.
- Generates `https://wa.me/{number}?text={message}` only when a number is configured.
- Falls back to `/faq` when no number exists to avoid dead or fake WhatsApp links.

## Homepage Hero

- Before: `View moatv Pricing` + `View Devices`.
- After: `View moatv Pricing` + `Free Trial`.
- Free Trial message: `Hi moatv, I'd like to request a free trial.`
- Rendered status: CTA present and usable. WhatsApp activation is blocked until the official number is configured.

## Free Trial CTA Locations

- Homepage hero: `Free Trial`.
- Footer support column: `Free Trial`.

## Pricing CTA Behavior

- Pricing cards now use `createOrderWhatsAppMessage(plan, devices, price)` with the centralized pricing result.
- Each order CTA carries `data-price-display`, `data-price-cents`, and `data-whatsapp-message` matching the selected card.
- Because no WhatsApp number is configured, rendered hrefs currently fall back to `/faq` instead of `wa.me`.

| Devices | Rendered Prices | Sample Order Message | Destination | Status |
|---|---|---|---|---|
| 1 | $27, $37, $47, $67 | Hi moatv, I'd like the 3 Month plan for 1 device ($37). | Fallback /faq | PASS |
| 2 | $49, $67, $85, $121 | Hi moatv, I'd like the 3 Month plan for 2 devices ($67). | Fallback /faq | PASS |
| 3 | $73, $100, $127, $181 | Hi moatv, I'd like the 3 Month plan for 3 devices ($100). | Fallback /faq | PASS |
| 4 | $97, $133, $169, $241 | Hi moatv, I'd like the 3 Month plan for 4 devices ($133). | Fallback /faq | PASS |
| 5 | $122, $167, $212, $302 | Hi moatv, I'd like the 3 Month plan for 5 devices ($167). | Fallback /faq | PASS |

## Reseller CTA Behavior

- Reseller hero CTA changed to `Become a Reseller`.
- Reseller lower CTA changed to `Become a Reseller`.
- Message: `Hi moatv, I'm interested in becoming a reseller.`
- Obsolete copy claiming no WhatsApp destination was removed.
- WhatsApp activation is blocked until the official number is configured.

## Support CTA Behavior

- FAQ page now includes a final `Contact Support` CTA.
- Footer now includes `Contact Support`.
- Message: `Hi moatv, I need some help.`
- WhatsApp activation is blocked until the official number is configured.

## Footer CTA Behavior

- Primary navigation remains: Home, Pricing, Devices, FAQ, Blog, Reseller.
- Legal links remain: Privacy Policy, Terms of Service, Refund Policy, Service Disclaimer.
- Support column added for `Contact Support` and `Free Trial` through the centralized WhatsApp helper/fallback.

## Dead Links / Obsolete Routes

- Source search inspected: `href="#"`, `localhost`, `127.0.0.1`, `example.com`, `/contact`, `/install`, stale formula copy, old order labels.
- Dead rendered links found: 0.
- Placeholder CTA links found: 0.
- Obsolete contact/install CTA links found: 0.
- Empty business URL config keys remain in `siteConfig.business`, but no CTA uses them.

## WhatsApp Messages Used

- Free trial: `Hi moatv, I'd like to request a free trial.`
- Support: `Hi moatv, I need some help.`
- Pricing question: `Hi moatv, I have a question about your plans.`
- Reseller: `Hi moatv, I'm interested in becoming a reseller.`
- Order: `Hi moatv, I'd like the {duration} plan for {device count} {device/devices} ({price}).`

## Responsive QA

| Viewport | Route | Scroll Width | Overflow | Tiny Tap Targets | Status |
|---|---|---|---|---|---|
| 390px | / | scrollWidth 390 | overflow no | tiny targets 0 | PASS |
| 390px | /pricing | scrollWidth 390 | overflow no | tiny targets 0 | PASS |
| 390px | /faq | scrollWidth 390 | overflow no | tiny targets 0 | PASS |
| 390px | /reseller | scrollWidth 390 | overflow no | tiny targets 0 | PASS |
| 768px | / | scrollWidth 768 | overflow no | tiny targets 0 | PASS |
| 768px | /pricing | scrollWidth 768 | overflow no | tiny targets 0 | PASS |
| 768px | /faq | scrollWidth 768 | overflow no | tiny targets 0 | PASS |
| 768px | /reseller | scrollWidth 768 | overflow no | tiny targets 0 | PASS |
| 1440px | / | scrollWidth 1440 | overflow no | tiny targets 0 | PASS |
| 1440px | /pricing | scrollWidth 1425 | overflow no | tiny targets 0 | PASS |
| 1440px | /faq | scrollWidth 1425 | overflow no | tiny targets 0 | PASS |
| 1440px | /reseller | scrollWidth 1425 | overflow no | tiny targets 0 | PASS |

## Full CTA Crawl Table

| Page | Button / Link Label | Type | Destination | Expected Intent | Status |
|---|---|---|---|---|---|
| / | Skip to content | Internal | #main | In-page navigation | PASS |
| / | MOA MoaTV IPTV SERVICE | Internal | / | Navigation/action | PASS |
| / | Home | Internal | / | Navigation/action | PASS |
| / | Pricing | Internal | /pricing | Pricing | PASS |
| / | Devices | Internal | /channels | Devices | PASS |
| / | FAQ | Internal | /faq | FAQ/support information | PASS |
| / | Blog | Internal | /blog | Blog/article | PASS |
| / | Reseller | Internal | /reseller | Reseller | PASS |
| / | Configure Plan | Internal | /pricing | Pricing | PASS |
| / | View moatv Pricing | Internal | /pricing | Pricing | PASS |
| / | Free Trial | Internal | /faq | FAQ/support information | PASS |
| / | moatv devices | Internal | /channels | Devices | PASS |
| / | moatv pricing | Internal | /pricing | Pricing | PASS |
| / | 1 Device | Button | client interaction | Devices | PASS |
| / | 2 Devices | Button | client interaction | Devices | PASS |
| / | 3 Devices | Button | client interaction | Devices | PASS |
| / | 4 Devices | Button | client interaction | Devices | PASS |
| / | 5 Devices | Button | client interaction | Devices | PASS |
| / | Order Now | Internal | /faq | FAQ/support information | PASS |
| / | Order Now | Internal | /faq | FAQ/support information | PASS |
| / | Order Now | Internal | /faq | FAQ/support information | PASS |
| / | Order Now | Internal | /faq | FAQ/support information | PASS |
| / | View All FAQs | Internal | /faq | FAQ/support information | PASS |
| / | What is moatv IPTV? - | Button | client interaction | Navigation/action | PASS |
| / | Which devices work with moatv? + | Button | client interaction | Devices | PASS |
| / | How are moatv multi-device prices calculated? + | Button | client interaction | Devices | PASS |
| / | Do you provide login credentials on this website? + | Button | client interaction | Navigation/action | PASS |
| / | Can I try moatv first? + | Button | client interaction | Navigation/action | PASS |
| / | Explore moatv Plans | Internal | /pricing | Pricing | PASS |
| / | Browse FAQ | Internal | /faq | FAQ/support information | PASS |
| / | MOA MoaTV IPTV SERVICE | Internal | / | Navigation/action | PASS |
| / | Home | Internal | / | Navigation/action | PASS |
| / | Pricing | Internal | /pricing | Pricing | PASS |
| / | Devices | Internal | /channels | Devices | PASS |
| / | FAQ | Internal | /faq | FAQ/support information | PASS |
| / | Blog | Internal | /blog | Blog/article | PASS |
| / | Reseller | Internal | /reseller | Reseller | PASS |
| / | Privacy Policy | Internal | /privacy | Legal | PASS |
| / | Terms of Service | Internal | /terms | Legal | PASS |
| / | Refund Policy | Internal | /refund | Legal | PASS |
| / | Service Disclaimer | Internal | /disclaimer | Legal | PASS |
| / | Contact Support | Internal | /faq | FAQ/support information | PASS |
| / | Free Trial | Internal | /faq | FAQ/support information | PASS |
| /pricing | Skip to content | Internal | #main | In-page navigation | PASS |
| /pricing | MOA MoaTV IPTV SERVICE | Internal | / | Navigation/action | PASS |
| /pricing | Home | Internal | / | Navigation/action | PASS |
| /pricing | Pricing | Internal | /pricing | Pricing | PASS |
| /pricing | Devices | Internal | /channels | Devices | PASS |
| /pricing | FAQ | Internal | /faq | FAQ/support information | PASS |
| /pricing | Blog | Internal | /blog | Blog/article | PASS |
| /pricing | Reseller | Internal | /reseller | Reseller | PASS |
| /pricing | Configure Plan | Internal | /pricing | Pricing | PASS |
| /pricing | Home | Internal | / | Navigation/action | PASS |
| /pricing | Pricing | Internal | /pricing | Pricing | PASS |
| /pricing | 1 Device | Button | client interaction | Devices | PASS |
| /pricing | 2 Devices | Button | client interaction | Devices | PASS |
| /pricing | 3 Devices | Button | client interaction | Devices | PASS |
| /pricing | 4 Devices | Button | client interaction | Devices | PASS |
| /pricing | 5 Devices | Button | client interaction | Devices | PASS |
| /pricing | Order Now | Internal | /faq | FAQ/support information | PASS |
| /pricing | Order Now | Internal | /faq | FAQ/support information | PASS |
| /pricing | Order Now | Internal | /faq | FAQ/support information | PASS |
| /pricing | Order Now | Internal | /faq | FAQ/support information | PASS |
| /pricing | MOA MoaTV IPTV SERVICE | Internal | / | Navigation/action | PASS |
| /pricing | Home | Internal | / | Navigation/action | PASS |
| /pricing | Pricing | Internal | /pricing | Pricing | PASS |
| /pricing | Devices | Internal | /channels | Devices | PASS |
| /pricing | FAQ | Internal | /faq | FAQ/support information | PASS |
| /pricing | Blog | Internal | /blog | Blog/article | PASS |
| /pricing | Reseller | Internal | /reseller | Reseller | PASS |
| /pricing | Privacy Policy | Internal | /privacy | Legal | PASS |
| /pricing | Terms of Service | Internal | /terms | Legal | PASS |
| /pricing | Refund Policy | Internal | /refund | Legal | PASS |
| /pricing | Service Disclaimer | Internal | /disclaimer | Legal | PASS |
| /pricing | Contact Support | Internal | /faq | FAQ/support information | PASS |
| /pricing | Free Trial | Internal | /faq | FAQ/support information | PASS |
| /channels | Skip to content | Internal | #main | In-page navigation | PASS |
| /channels | MOA MoaTV IPTV SERVICE | Internal | / | Navigation/action | PASS |
| /channels | Home | Internal | / | Navigation/action | PASS |
| /channels | Pricing | Internal | /pricing | Pricing | PASS |
| /channels | Devices | Internal | /channels | Devices | PASS |
| /channels | FAQ | Internal | /faq | FAQ/support information | PASS |
| /channels | Blog | Internal | /blog | Blog/article | PASS |
| /channels | Reseller | Internal | /reseller | Reseller | PASS |
| /channels | Configure Plan | Internal | /pricing | Pricing | PASS |
| /channels | moatv pricing | Internal | /pricing | Pricing | PASS |
| /channels | moatv devices | Internal | /channels | Devices | PASS |
| /channels | moatv FAQ | Internal | /faq | FAQ/support information | PASS |
| /channels | moatv devices | Internal | /channels | Devices | PASS |
| /channels | moatv pricing | Internal | /pricing | Pricing | PASS |
| /channels | MOA MoaTV IPTV SERVICE | Internal | / | Navigation/action | PASS |
| /channels | Home | Internal | / | Navigation/action | PASS |
| /channels | Pricing | Internal | /pricing | Pricing | PASS |
| /channels | Devices | Internal | /channels | Devices | PASS |
| /channels | FAQ | Internal | /faq | FAQ/support information | PASS |
| /channels | Blog | Internal | /blog | Blog/article | PASS |
| /channels | Reseller | Internal | /reseller | Reseller | PASS |
| /channels | Privacy Policy | Internal | /privacy | Legal | PASS |
| /channels | Terms of Service | Internal | /terms | Legal | PASS |
| /channels | Refund Policy | Internal | /refund | Legal | PASS |
| /channels | Service Disclaimer | Internal | /disclaimer | Legal | PASS |
| /channels | Contact Support | Internal | /faq | FAQ/support information | PASS |
| /channels | Free Trial | Internal | /faq | FAQ/support information | PASS |
| /faq | Skip to content | Internal | #main | In-page navigation | PASS |
| /faq | MOA MoaTV IPTV SERVICE | Internal | / | Navigation/action | PASS |
| /faq | Home | Internal | / | Navigation/action | PASS |
| /faq | Pricing | Internal | /pricing | Pricing | PASS |
| /faq | Devices | Internal | /channels | Devices | PASS |
| /faq | FAQ | Internal | /faq | FAQ/support information | PASS |
| /faq | Blog | Internal | /blog | Blog/article | PASS |
| /faq | Reseller | Internal | /reseller | Reseller | PASS |
| /faq | Configure Plan | Internal | /pricing | Pricing | PASS |
| /faq | What is moatv IPTV? - | Button | client interaction | Navigation/action | PASS |
| /faq | Which devices work with moatv? + | Button | client interaction | Devices | PASS |
| /faq | How are moatv multi-device prices calculated? + | Button | client interaction | Devices | PASS |
| /faq | Do you provide login credentials on this website? + | Button | client interaction | Navigation/action | PASS |
| /faq | Can I try moatv first? + | Button | client interaction | Navigation/action | PASS |
| /faq | Contact Support | Internal | /faq | FAQ/support information | PASS |
| /faq | MOA MoaTV IPTV SERVICE | Internal | / | Navigation/action | PASS |
| /faq | Home | Internal | / | Navigation/action | PASS |
| /faq | Pricing | Internal | /pricing | Pricing | PASS |
| /faq | Devices | Internal | /channels | Devices | PASS |
| /faq | FAQ | Internal | /faq | FAQ/support information | PASS |
| /faq | Blog | Internal | /blog | Blog/article | PASS |
| /faq | Reseller | Internal | /reseller | Reseller | PASS |
| /faq | Privacy Policy | Internal | /privacy | Legal | PASS |
| /faq | Terms of Service | Internal | /terms | Legal | PASS |
| /faq | Refund Policy | Internal | /refund | Legal | PASS |
| /faq | Service Disclaimer | Internal | /disclaimer | Legal | PASS |
| /faq | Contact Support | Internal | /faq | FAQ/support information | PASS |
| /faq | Free Trial | Internal | /faq | FAQ/support information | PASS |
| /blog | Skip to content | Internal | #main | In-page navigation | PASS |
| /blog | MOA MoaTV IPTV SERVICE | Internal | / | Navigation/action | PASS |
| /blog | Home | Internal | / | Navigation/action | PASS |
| /blog | Pricing | Internal | /pricing | Pricing | PASS |
| /blog | Devices | Internal | /channels | Devices | PASS |
| /blog | FAQ | Internal | /faq | FAQ/support information | PASS |
| /blog | Blog | Internal | /blog | Blog/article | PASS |
| /blog | Reseller | Internal | /reseller | Reseller | PASS |
| /blog | Configure Plan | Internal | /pricing | Pricing | PASS |
| /blog | How to Watch the 2026 MLB Playoffs: October Schedule, TV Channels & Streaming Guide | Internal | /blog/how-to-watch-2026-mlb-playoffs | Blog/article | PASS |
| /blog | Read moatv guide | Internal | /blog/how-to-watch-2026-mlb-playoffs | Blog/article | PASS |
| /blog | 2026 World Series Viewing Guide: Dates, TV Schedule and What Fans Should Know | Internal | /blog/2026-world-series-viewing-guide | Blog/article | PASS |
| /blog | Read | Internal | /blog/2026-world-series-viewing-guide | Blog/article | PASS |
| /blog | NFL October 2026 TV Guide: How to Follow Every Week Without Missing the Big Games | Internal | /blog/nfl-october-2026-tv-guide | Blog/article | PASS |
| /blog | Read | Internal | /blog/nfl-october-2026-tv-guide | Blog/article | PASS |
| /blog | NFL Week 5 Viewing Guide 2026: Sunday Games, Primetime and TV Options | Internal | /blog/nfl-week-5-viewing-guide-2026 | Blog/article | PASS |
| /blog | Read | Internal | /blog/nfl-week-5-viewing-guide-2026 | Blog/article | PASS |
| /blog | NBA Opening Night 2026: How to Watch the Start of the 2026–27 Season | Internal | /blog/nba-opening-night-2026-watch-guide | Blog/article | PASS |
| /blog | Read | Internal | /blog/nba-opening-night-2026-watch-guide | Blog/article | PASS |
| /blog | NBA 2026–27 Viewing Guide: TV Schedule, Opening Week and Key Dates for U.S. Fans | Internal | /blog/nba-2026-27-viewing-guide | Blog/article | PASS |
| /blog | Read | Internal | /blog/nba-2026-27-viewing-guide | Blog/article | PASS |
| /blog | 2026 NBA Cup Guide: Schedule, Format and How to Follow the Tournament | Internal | /blog/2026-nba-cup-guide | Blog/article | PASS |
| /blog | Read | Internal | /blog/2026-nba-cup-guide | Blog/article | PASS |
| /blog | College Football October 2026: A U.S. Fan’s Guide to the Biggest Weekends and TV Coverage | Internal | /blog/college-football-october-2026-tv-guide | Blog/article | PASS |
| /blog | Read | Internal | /blog/college-football-october-2026-tv-guide | Blog/article | PASS |
| /blog | How to Watch the 2026 WNBA Playoffs and Finals: Schedule and U.S. TV Guide | Internal | /blog/how-to-watch-2026-wnba-playoffs-finals | Blog/article | PASS |
| /blog | Read | Internal | /blog/how-to-watch-2026-wnba-playoffs-finals | Blog/article | PASS |
| /blog | October 2026 Sports Calendar: MLB Playoffs, NFL, NBA and the Biggest Events to Watch | Internal | /blog/october-2026-sports-calendar | Blog/article | PASS |
| /blog | Read | Internal | /blog/october-2026-sports-calendar | Blog/article | PASS |
| /blog | MOA MoaTV IPTV SERVICE | Internal | / | Navigation/action | PASS |
| /blog | Home | Internal | / | Navigation/action | PASS |
| /blog | Pricing | Internal | /pricing | Pricing | PASS |
| /blog | Devices | Internal | /channels | Devices | PASS |
| /blog | FAQ | Internal | /faq | FAQ/support information | PASS |
| /blog | Blog | Internal | /blog | Blog/article | PASS |
| /blog | Reseller | Internal | /reseller | Reseller | PASS |
| /blog | Privacy Policy | Internal | /privacy | Legal | PASS |
| /blog | Terms of Service | Internal | /terms | Legal | PASS |
| /blog | Refund Policy | Internal | /refund | Legal | PASS |
| /blog | Service Disclaimer | Internal | /disclaimer | Legal | PASS |
| /blog | Contact Support | Internal | /faq | FAQ/support information | PASS |
| /blog | Free Trial | Internal | /faq | FAQ/support information | PASS |
| /reseller | Skip to content | Internal | #main | In-page navigation | PASS |
| /reseller | MOA MoaTV IPTV SERVICE | Internal | / | Navigation/action | PASS |
| /reseller | Home | Internal | / | Navigation/action | PASS |
| /reseller | Pricing | Internal | /pricing | Pricing | PASS |
| /reseller | Devices | Internal | /channels | Devices | PASS |
| /reseller | FAQ | Internal | /faq | FAQ/support information | PASS |
| /reseller | Blog | Internal | /blog | Blog/article | PASS |
| /reseller | Reseller | Internal | /reseller | Reseller | PASS |
| /reseller | Configure Plan | Internal | /pricing | Pricing | PASS |
| /reseller | Become a Reseller | Internal | /faq | FAQ/support information | PASS |
| /reseller | Review Plans | Internal | /pricing | Pricing | PASS |
| /reseller | Become a Reseller | Internal | /faq | FAQ/support information | PASS |
| /reseller | View Devices | Internal | /channels | Devices | PASS |
| /reseller | moatv FAQ | Internal | /faq | FAQ/support information | PASS |
| /reseller | MOA MoaTV IPTV SERVICE | Internal | / | Navigation/action | PASS |
| /reseller | Home | Internal | / | Navigation/action | PASS |
| /reseller | Pricing | Internal | /pricing | Pricing | PASS |
| /reseller | Devices | Internal | /channels | Devices | PASS |
| /reseller | FAQ | Internal | /faq | FAQ/support information | PASS |
| /reseller | Blog | Internal | /blog | Blog/article | PASS |
| /reseller | Reseller | Internal | /reseller | Reseller | PASS |
| /reseller | Privacy Policy | Internal | /privacy | Legal | PASS |
| /reseller | Terms of Service | Internal | /terms | Legal | PASS |
| /reseller | Refund Policy | Internal | /refund | Legal | PASS |
| /reseller | Service Disclaimer | Internal | /disclaimer | Legal | PASS |
| /reseller | Contact Support | Internal | /faq | FAQ/support information | PASS |
| /reseller | Free Trial | Internal | /faq | FAQ/support information | PASS |
| /privacy | Skip to content | Internal | #main | In-page navigation | PASS |
| /privacy | MOA MoaTV IPTV SERVICE | Internal | / | Navigation/action | PASS |
| /privacy | Home | Internal | / | Navigation/action | PASS |
| /privacy | Pricing | Internal | /pricing | Pricing | PASS |
| /privacy | Devices | Internal | /channels | Devices | PASS |
| /privacy | FAQ | Internal | /faq | FAQ/support information | PASS |
| /privacy | Blog | Internal | /blog | Blog/article | PASS |
| /privacy | Reseller | Internal | /reseller | Reseller | PASS |
| /privacy | Configure Plan | Internal | /pricing | Pricing | PASS |
| /privacy | MOA MoaTV IPTV SERVICE | Internal | / | Navigation/action | PASS |
| /privacy | Home | Internal | / | Navigation/action | PASS |
| /privacy | Pricing | Internal | /pricing | Pricing | PASS |
| /privacy | Devices | Internal | /channels | Devices | PASS |
| /privacy | FAQ | Internal | /faq | FAQ/support information | PASS |
| /privacy | Blog | Internal | /blog | Blog/article | PASS |
| /privacy | Reseller | Internal | /reseller | Reseller | PASS |
| /privacy | Privacy Policy | Internal | /privacy | Legal | PASS |
| /privacy | Terms of Service | Internal | /terms | Legal | PASS |
| /privacy | Refund Policy | Internal | /refund | Legal | PASS |
| /privacy | Service Disclaimer | Internal | /disclaimer | Legal | PASS |
| /privacy | Contact Support | Internal | /faq | FAQ/support information | PASS |
| /privacy | Free Trial | Internal | /faq | FAQ/support information | PASS |
| /terms | Skip to content | Internal | #main | In-page navigation | PASS |
| /terms | MOA MoaTV IPTV SERVICE | Internal | / | Navigation/action | PASS |
| /terms | Home | Internal | / | Navigation/action | PASS |
| /terms | Pricing | Internal | /pricing | Pricing | PASS |
| /terms | Devices | Internal | /channels | Devices | PASS |
| /terms | FAQ | Internal | /faq | FAQ/support information | PASS |
| /terms | Blog | Internal | /blog | Blog/article | PASS |
| /terms | Reseller | Internal | /reseller | Reseller | PASS |
| /terms | Configure Plan | Internal | /pricing | Pricing | PASS |
| /terms | MOA MoaTV IPTV SERVICE | Internal | / | Navigation/action | PASS |
| /terms | Home | Internal | / | Navigation/action | PASS |
| /terms | Pricing | Internal | /pricing | Pricing | PASS |
| /terms | Devices | Internal | /channels | Devices | PASS |
| /terms | FAQ | Internal | /faq | FAQ/support information | PASS |
| /terms | Blog | Internal | /blog | Blog/article | PASS |
| /terms | Reseller | Internal | /reseller | Reseller | PASS |
| /terms | Privacy Policy | Internal | /privacy | Legal | PASS |
| /terms | Terms of Service | Internal | /terms | Legal | PASS |
| /terms | Refund Policy | Internal | /refund | Legal | PASS |
| /terms | Service Disclaimer | Internal | /disclaimer | Legal | PASS |
| /terms | Contact Support | Internal | /faq | FAQ/support information | PASS |
| /terms | Free Trial | Internal | /faq | FAQ/support information | PASS |
| /refund | Skip to content | Internal | #main | In-page navigation | PASS |
| /refund | MOA MoaTV IPTV SERVICE | Internal | / | Navigation/action | PASS |
| /refund | Home | Internal | / | Navigation/action | PASS |
| /refund | Pricing | Internal | /pricing | Pricing | PASS |
| /refund | Devices | Internal | /channels | Devices | PASS |
| /refund | FAQ | Internal | /faq | FAQ/support information | PASS |
| /refund | Blog | Internal | /blog | Blog/article | PASS |
| /refund | Reseller | Internal | /reseller | Reseller | PASS |
| /refund | Configure Plan | Internal | /pricing | Pricing | PASS |
| /refund | MOA MoaTV IPTV SERVICE | Internal | / | Navigation/action | PASS |
| /refund | Home | Internal | / | Navigation/action | PASS |
| /refund | Pricing | Internal | /pricing | Pricing | PASS |
| /refund | Devices | Internal | /channels | Devices | PASS |
| /refund | FAQ | Internal | /faq | FAQ/support information | PASS |
| /refund | Blog | Internal | /blog | Blog/article | PASS |
| /refund | Reseller | Internal | /reseller | Reseller | PASS |
| /refund | Privacy Policy | Internal | /privacy | Legal | PASS |
| /refund | Terms of Service | Internal | /terms | Legal | PASS |
| /refund | Refund Policy | Internal | /refund | Legal | PASS |
| /refund | Service Disclaimer | Internal | /disclaimer | Legal | PASS |
| /refund | Contact Support | Internal | /faq | FAQ/support information | PASS |
| /refund | Free Trial | Internal | /faq | FAQ/support information | PASS |
| /disclaimer | Skip to content | Internal | #main | In-page navigation | PASS |
| /disclaimer | MOA MoaTV IPTV SERVICE | Internal | / | Navigation/action | PASS |
| /disclaimer | Home | Internal | / | Navigation/action | PASS |
| /disclaimer | Pricing | Internal | /pricing | Pricing | PASS |
| /disclaimer | Devices | Internal | /channels | Devices | PASS |
| /disclaimer | FAQ | Internal | /faq | FAQ/support information | PASS |
| /disclaimer | Blog | Internal | /blog | Blog/article | PASS |
| /disclaimer | Reseller | Internal | /reseller | Reseller | PASS |
| /disclaimer | Configure Plan | Internal | /pricing | Pricing | PASS |
| /disclaimer | MOA MoaTV IPTV SERVICE | Internal | / | Navigation/action | PASS |
| /disclaimer | Home | Internal | / | Navigation/action | PASS |
| /disclaimer | Pricing | Internal | /pricing | Pricing | PASS |
| /disclaimer | Devices | Internal | /channels | Devices | PASS |
| /disclaimer | FAQ | Internal | /faq | FAQ/support information | PASS |
| /disclaimer | Blog | Internal | /blog | Blog/article | PASS |
| /disclaimer | Reseller | Internal | /reseller | Reseller | PASS |
| /disclaimer | Privacy Policy | Internal | /privacy | Legal | PASS |
| /disclaimer | Terms of Service | Internal | /terms | Legal | PASS |
| /disclaimer | Refund Policy | Internal | /refund | Legal | PASS |
| /disclaimer | Service Disclaimer | Internal | /disclaimer | Legal | PASS |
| /disclaimer | Contact Support | Internal | /faq | FAQ/support information | PASS |
| /disclaimer | Free Trial | Internal | /faq | FAQ/support information | PASS |

## Final Result

- HERO FREE TRIAL: PASS
- WHATSAPP NUMBER: UNVERIFIED
- WHATSAPP CENTRALIZATION: PASS
- PRICING ORDER CTA: FAIL, blocked by missing official WhatsApp number; dynamic messages/prices verified PASS
- 1-5 DEVICE PRICE MESSAGES: PASS
- RESELLER CTA: FAIL, blocked by missing official WhatsApp number; CTA/fallback verified usable
- FAQ SUPPORT CTA: FAIL, blocked by missing official WhatsApp number; CTA/fallback verified usable
- FOOTER CTA: FAIL, blocked by missing official WhatsApp number; CTA/fallback verified usable
- DEAD BUTTONS: 0
- PLACEHOLDER CTA LINKS: 0
- OBSOLETE CONTACT LINKS: 0
- 390px QA: PASS
- 768px QA: PASS
- 1440px QA: PASS
- LINT: PASS
- TYPESCRIPT: PASS
- BUILD: PASS

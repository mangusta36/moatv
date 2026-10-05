import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { DeviceGrid, FAQList, FinalCTA, InstallOverview } from "@/components/Sections";
import { PricingSelector } from "@/components/PricingSelector";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { createWhatsAppUrl, getWhatsAppHref, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = pageMetadata({
  title: "moatv IPTV Plans, Devices, and Setup",
  description:
    "Compare moatv IPTV plan options, choose a device count, review compatible devices, and follow practical setup guidance before ordering.",
  path: "/",
});

const reasons = [
  {
    title: "Compare moatv plans without the guesswork",
    text: "Choose a moatv term, select the number of device connections, and see the price update without a complicated checkout-style flow.",
  },
  {
    title: "See how moatv setup works before you order",
    text: "Review common moatv setup formats such as Xtream Codes API, M3U playlists, and portal login so you know what your player app needs.",
  },
  {
    title: "Find the right devices for moatv",
    text: "The moatv site focuses on common TVs, streaming devices, phones, tablets, and computers without unsupported compatibility claims.",
  },
];

const homeSteps = [
  ["01", "Choose a moatv plan", "Pick the subscription term and device count that fits your household."],
  ["02", "Order your moatv plan with confidence", "Use the current moatv purchase path available in the site, or review FAQs before choosing."],
  ["03", "Receive your moatv setup details", "Use the login format supplied for your account and keep credentials private."],
  ["04", "Start watching with moatv", "Load the details into a supported player app and confirm playback on your main device first."],
];

export default function HomePage() {
  const freeTrialHref = getWhatsAppHref(whatsappMessages.freeTrial);
  const freeTrialTarget = createWhatsAppUrl(whatsappMessages.freeTrial) ? "_blank" : undefined;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }])} />

      <section className="relative min-h-[560px] overflow-hidden border-b border-line bg-cream sm:min-h-[640px] lg:min-h-[700px]">
        <Image
          src="/images/moatv-living-room-hero.webp"
          alt="Modern living room set up for moatv IPTV streaming"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute inset-0 bg-paper/34 sm:hidden" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-paper via-paper/82 to-paper/20 sm:from-paper/92 sm:via-paper/58 sm:to-paper/10" />

        <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-4 py-16 sm:min-h-[640px] sm:px-6 lg:min-h-[700px] lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl lg:leading-tight">
              moatv IPTV plans for the screens you actually use.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-ink-secondary sm:text-lg sm:leading-8">
              Compare moatv plan terms, confirm device compatibility, and follow clear setup guidance before getting started.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/pricing" variant="primary">
                View moatv Pricing
              </ButtonLink>
              <ButtonLink href={freeTrialHref} target={freeTrialTarget} rel={freeTrialTarget ? "noopener noreferrer" : undefined} variant="secondary">
                Free Trial
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Why choosing a moatv IPTV plan is simple.</h2>
            <p className="mt-4 text-base leading-7 text-muted">
              moatv keeps the buying decision focused on what matters: price, screen count, compatible devices, and the setup format your player app supports.
            </p>
          </div>
          <div className="grid gap-7 sm:grid-cols-3">
            {reasons.map((item) => (
              <div key={item.title}>
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Watch moatv on your favorite devices.</h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Start with the device you use most, confirm the moatv player app, then add other screens when your setup is working.
            </p>
          </div>
          <DeviceGrid />
        </div>
      </section>

      <section id="pricing" className="bg-paper py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PricingSelector />
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">How to get started with moatv.</h2>
              <p className="mt-4 text-base leading-7 text-muted">
                The workflow depends on the real moatv purchase path available to you, but the setup sequence stays straightforward.
              </p>
            </div>
            <ol className="grid gap-6 sm:grid-cols-2">
              {homeSteps.map(([num, title, text]) => (
                <li key={title} className="border-t border-line pt-5">
                  <p className="text-sm font-semibold text-brand-700">{num}</p>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-paper py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">moatv setup guidance by device.</h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Use trusted player apps where available and enter moatv account details exactly as supplied.
            </p>
          </div>
          <InstallOverview />
        </div>
      </section>

      <section className="bg-paper py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Questions before you choose moatv?</h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Review common moatv answers about device counts, setup formats, credentials, and trials.
            </p>
            <div className="mt-6">
              <ButtonLink href="/faq" variant="secondary">
                View All FAQs
              </ButtonLink>
            </div>
          </div>
          <FAQList limit={5} />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

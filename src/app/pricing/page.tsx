import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { PricingSelector } from "@/components/PricingSelector";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "moatv IPTV Pricing",
  description: "Compare moatv IPTV plans by duration and device count with a clean pricing selector and clear setup guidance.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])} />
      <PageHero
        eyebrow="Pricing"
        title="Compare moatv IPTV Plans"
        description="Select your preferred moatv subscription term and choose how many screens you want to stream on simultaneously."
      />
      <section className="bg-paper py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Pricing", href: "/pricing" }]} />
          <PricingSelector />
        </div>
      </section>
      <section className="bg-cream py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">How moatv subscription pricing works</h2>
            <p className="mt-4 text-base leading-7 text-muted">
              The selector above lets you compare four subscription durations and one to five device connections without changing the underlying plan prices.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              ["Choose a duration", "Review the 1 month, 3 month, 6 month, and 12 month options, then compare the displayed price for the screen count you need."],
              ["Select your devices", "Use the screen selector to match the number of simultaneous device connections you want before sending an order request."],
              ["Confirm compatibility", "Check the device guide if you plan to use Fire TV, Android TV, Google TV, smart TVs, Apple TV, phones, tablets, or computers."],
              ["Review setup formats", "moatv setup content references Xtream Codes API, M3U playlist, and portal-style login details, depending on the player app."],
            ].map(([title, text]) => (
              <div key={title} className="border-t border-line pt-5">
                <h3 className="font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-paper py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">What to confirm before ordering</h2>
          <div className="mt-7 grid gap-6 md:grid-cols-3">
            <div className="border-t border-line pt-5">
              <h3 className="font-semibold text-ink">Main device</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Start with the device you will use most often and confirm that a suitable player app is available for that model and region.
              </p>
            </div>
            <div className="border-t border-line pt-5">
              <h3 className="font-semibold text-ink">Support path</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Pricing CTAs open a WhatsApp order message with the selected duration, device count, and price already included.
              </p>
            </div>
            <div className="border-t border-line pt-5">
              <h3 className="font-semibold text-ink">Policy review</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Read the refund policy and FAQ before purchasing so expectations around setup, credentials, and device checks are clear.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link href="/channels" className="font-semibold text-brand-700 hover:underline">Review compatible devices</Link>
            <Link href="/faq" className="font-semibold text-brand-700 hover:underline">Read pricing FAQ</Link>
            <Link href="/refund" className="font-semibold text-brand-700 hover:underline">Review refund policy</Link>
          </div>
        </div>
      </section>
    </>
  );
}

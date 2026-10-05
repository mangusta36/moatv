import type { Metadata } from "next";
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
    </>
  );
}

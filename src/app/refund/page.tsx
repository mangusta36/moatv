import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "moatv Refund Policy",
  description: "moatv refund policy information for reviewing eligibility, request timing, and support channels.",
  path: "/refund",
});

export default function RefundPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal & Policy"
        title="moatv Refund Policy"
        description="Review moatv refund eligibility and request timing guidelines before purchase, especially when setting up a new device or player app."
      />
      <section className="bg-paper py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="border-l border-line pl-6">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">moatv refund guidelines</h2>
            <p className="mt-4 text-base leading-7 text-muted">{siteConfig.business.refundWindow}</p>
          </div>
        </div>
      </section>
    </>
  );
}

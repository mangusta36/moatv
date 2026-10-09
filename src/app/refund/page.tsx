import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "moatv Refund Policy",
  description: "Review moatv refund policy guidance, setup checks, support contact paths, and where to confirm order-specific refund eligibility.",
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
            <p className="mt-4 text-base leading-7 text-muted">
              Because the repository does not define a guaranteed refund window, automatic approval rule, or cancellation period, this page keeps the policy conservative. Customers should review the terms supplied with their order and ask support any setup or device questions before purchasing.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="border-t border-line pt-5">
              <h3 className="font-semibold text-ink">Before you request help</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Confirm the selected plan duration, device count, player app, and setup format. Keep private playlist URLs, portal details, and account credentials secure.
              </p>
            </div>
            <div className="border-t border-line pt-5">
              <h3 className="font-semibold text-ink">Where to go next</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Use the FAQ and device pages to review compatibility and common setup questions before choosing a plan or contacting support.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link href="/terms" className="font-semibold text-brand-700 hover:underline">Terms of Service</Link>
            <Link href="/faq" className="font-semibold text-brand-700 hover:underline">FAQ</Link>
            <Link href="/channels" className="font-semibold text-brand-700 hover:underline">Device guidance</Link>
          </div>
        </div>
      </section>
    </>
  );
}

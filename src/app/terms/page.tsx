import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "moatv Terms of Service",
  description: "Review moatv terms topics for plan selection, device use, private credentials, setup limitations, support, and policy review.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal & Policy"
        title="moatv Terms of Service"
        description="Review terms topics customers should understand before choosing a plan or configuring moatv account credentials."
      />
      <section className="bg-paper py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="border-l border-line pl-6">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">moatv terms topics covered</h2>
            <p className="mt-4 text-base leading-7 text-muted">
              These terms summarize how the website presents plans, setup guidance, device compatibility, and customer responsibilities. They do not add unverified payment terms, governing law, warranties, or business registration details.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {[
                "Service publisher identity and support contact guidelines",
                "Simultaneous screen connection sharing rules",
                "Payment processor integration and order validation terms",
                "Technical platform limitations and network requirements",
                "Service termination and account cancellation procedures",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 size-1.5 rounded-full bg-brand-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="border-t border-line pt-5">
              <h3 className="font-semibold text-ink">Account and setup responsibility</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Customers should keep moatv account details private, enter setup information exactly as supplied, and verify that the selected player app supports the required login format.
              </p>
            </div>
            <div className="border-t border-line pt-5">
              <h3 className="font-semibold text-ink">Before purchasing</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Review pricing, device guidance, refund information, and FAQs before choosing a plan. The repository does not document a separate checkout agreement or payment processor policy.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link href="/pricing" className="font-semibold text-brand-700 hover:underline">Pricing</Link>
            <Link href="/refund" className="font-semibold text-brand-700 hover:underline">Refund Policy</Link>
            <Link href="/privacy" className="font-semibold text-brand-700 hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </section>
    </>
  );
}

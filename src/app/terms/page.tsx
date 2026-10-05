import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "moatv Terms of Service",
  description: "moatv terms of service information covering accounts, payment, acceptable use, limitations, and termination topics.",
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
        </div>
      </section>
    </>
  );
}

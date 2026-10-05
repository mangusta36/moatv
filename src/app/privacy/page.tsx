import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "moatv Privacy Policy",
  description: "moatv privacy policy information covering account, support, checkout, analytics, and retention topics.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal & Policy"
        title="moatv Privacy Policy"
        description="Review how moatv customer data is handled across account support, plan configuration, analytics, and service communications."
      />
      <section className="bg-paper py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 border-l border-line pl-6">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">moatv privacy topics covered</h2>
            <ul className="space-y-3 text-sm text-muted">
              {[
                "Account and support contact information",
                "Data collected through support inquiry or checkout flows",
                "Analytics and operational performance tracking",
                "Data retention policies and account deletion requests",
                "Regional privacy standards and confidentiality commitments",
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

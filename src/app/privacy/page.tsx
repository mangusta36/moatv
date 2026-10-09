import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "moatv Privacy Policy",
  description: "Review moatv privacy policy topics for support inquiries, plan configuration, analytics, service communications, and owner-review items.",
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
            <p className="text-base leading-7 text-muted">
              This page summarizes the privacy topics currently documented in the project. It does not add unverified retention periods, legal rights, or contact addresses that are not configured in the repository.
            </p>
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

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="border-t border-line pt-5">
              <h3 className="font-semibold text-ink">Support and order context</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                The site links users to WhatsApp for plan, free trial, and support messages. Those conversations may include device, setup, and order-context details supplied by the customer.
              </p>
            </div>
            <div className="border-t border-line pt-5">
              <h3 className="font-semibold text-ink">Owner review needed</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                The repository does not include a configured support email, formal retention schedule, or business legal entity details. Those items should be reviewed by the site owner before publication.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link href="/terms" className="font-semibold text-brand-700 hover:underline">Terms of Service</Link>
            <Link href="/refund" className="font-semibold text-brand-700 hover:underline">Refund Policy</Link>
            <Link href="/disclaimer" className="font-semibold text-brand-700 hover:underline">Service Disclaimer</Link>
          </div>
        </div>
      </section>
    </>
  );
}

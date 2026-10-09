import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "moatv Disclaimer",
  description: "Review moatv disclaimer information for third-party player apps, device compatibility, private credentials, and customer setup responsibilities.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal & Policy"
        title="moatv Disclaimer Information"
        description="Understand moatv customer responsibilities regarding third-party IPTV player apps, private account credentials, device compatibility, and network access."
      />
      <section className="bg-paper py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="border-l border-line pl-6">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">moatv customer responsibilities</h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Use reputable player applications from trusted app stores, keep moatv playlist URLs, portal credentials, and logins private, and verify that your device supports the configuration provided.
            </p>
            <p className="mt-4 text-base leading-7 text-muted">
              Device support can depend on the model, region, app store availability, and the setup format supplied for the account. This website provides practical setup guidance, but it does not control third-party player apps, app-store availability, internet connection quality, or device firmware behavior.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="border-t border-line pt-5">
              <h3 className="font-semibold text-ink">Third-party tools</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                References to player apps, smart TVs, streaming devices, and login formats are compatibility guidance, not ownership claims over those third-party products.
              </p>
            </div>
            <div className="border-t border-line pt-5">
              <h3 className="font-semibold text-ink">Content and availability</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                The repository does not document channel-count guarantees, licensing statements, or uptime guarantees. Any unsupported claim should be reviewed by the site owner before publication.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link href="/channels" className="font-semibold text-brand-700 hover:underline">Device guidance</Link>
            <Link href="/terms" className="font-semibold text-brand-700 hover:underline">Terms of Service</Link>
            <Link href="/faq" className="font-semibold text-brand-700 hover:underline">FAQ</Link>
          </div>
        </div>
      </section>
    </>
  );
}

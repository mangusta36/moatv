import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "moatv Disclaimer",
  description: "moatv disclaimer information covering service access, player apps, third-party tools, and customer responsibilities.",
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
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { DeviceGrid, InlineLinks } from "@/components/Sections";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "moatv IPTV Devices and Streaming Experience",
  description: "Review how moatv IPTV works across supported devices without unsupported channel-count claims.",
  path: "/channels",
});

export default function ChannelsPage() {
  return (
    <>
      <PageHero
        eyebrow="Devices"
        title="Devices that work with moatv"
        description="Review moatv playback categories, player app recommendations, and setup considerations for every screen in your home."
      />
      <section className="bg-paper py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">moatv device setup starts with how you watch</h2>
            <p className="mt-3 text-base leading-7 text-muted">
              Start with the primary television device you use most, verify the moatv player app and login method, then expand to extra smartphones, tablets, or laptops.
            </p>
            <div className="mt-5">
              <InlineLinks />
            </div>
          </div>

          <DeviceGrid />

          <p className="mt-10 text-sm text-muted">
            Need setup assistance? Review the device guidance above, then check the moatv FAQ for common setup questions.
          </p>
        </div>
      </section>
    </>
  );
}

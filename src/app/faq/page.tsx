import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FAQList } from "@/components/Sections";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink } from "@/components/ButtonLink";
import { faqs } from "@/content/shared";
import { pageMetadata } from "@/lib/seo";
import { createWhatsAppUrl, getWhatsAppHref, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = pageMetadata({
  title: "moatv IPTV FAQ",
  description: "Answers to common moatv IPTV pricing, device, setup, credential, and trial questions.",
  path: "/faq",
});

export default function FAQPage() {
  const supportHref = getWhatsAppHref(whatsappMessages.support);
  const supportTarget = createWhatsAppUrl(whatsappMessages.support) ? "_blank" : undefined;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHero
        eyebrow="FAQ"
        title="Questions about moatv"
        description="Clear answers regarding moatv plans, connection device counts, setup methods, player apps, and trial expectations."
      />
      <section className="bg-paper py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FAQList />
          <div className="mt-10 border-t border-line pt-8">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Still need help?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              Ask moatv support for help with plans, devices, or setup details.
            </p>
            <div className="mt-5">
              <ButtonLink href={supportHref} target={supportTarget} rel={supportTarget ? "noopener noreferrer" : undefined}>
                Contact Support
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

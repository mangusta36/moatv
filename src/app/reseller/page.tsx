import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { pricingConfig } from "@/config/pricing";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { createWhatsAppUrl, getWhatsAppHref, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = pageMetadata({
  title: "Become a moatv Reseller",
  description:
    "Learn about moatv reseller inquiries, supported devices, plan configuration, setup formats, and customer support responsibilities.",
  path: "/reseller",
});

const benefits = [
  ["moatv device guidance", "Use moatv setup resources for common TVs, streaming devices, phones, tablets, and computers."],
  ["moatv plan clarity", "Discuss plan duration and screen-count configuration using the same pricing model shown on the site."],
  ["moatv setup formats", "Prepare customers around Xtream Codes API, M3U, or portal-style setup where applicable."],
  ["moatv support expectations", "Confirm responsibilities, escalation paths, and account constraints before submitting reseller orders."],
];

const steps = [
  ["Review the moatv offer", "Check current plans, supported device categories, and setup guidance."],
  ["Prepare your moatv inquiry", "Gather your market, device mix, and support questions before discussing reseller terms."],
  ["Confirm moatv terms", "Discuss reseller pricing, eligibility, customer support scope, and setup expectations directly."],
  ["Start carefully with moatv", "Use only account and login details supplied for moatv, then test the intended player app first."],
];

const faqs = [
  ["Is moatv reseller pricing published on the website?", "No. Reseller pricing and requirements are not published in this project. Confirm current details before onboarding customers."],
  ["Which moatv devices can reseller customers use?", "The site lists Fire TV, Android TV, Google TV, Samsung and LG Smart TVs, Apple TV, phones, tablets, and computers when a suitable IPTV player is available."],
  ["What moatv setup formats should resellers understand?", "moatv setup content references Xtream Codes API, M3U playlists, and portal login details. The exact format should be confirmed for each account."],
  ["How should moatv reseller support responsibilities be handled?", "Support responsibilities and escalation paths should be confirmed before submitting reseller orders or onboarding customers."],
];

export default function ResellerPage() {
  const resellerHref = getWhatsAppHref(whatsappMessages.reseller);
  const resellerTarget = createWhatsAppUrl(whatsappMessages.reseller) ? "_blank" : undefined;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Reseller", path: "/reseller" }])} />
      <PageHero
        eyebrow="Reseller"
        title="Become a moatv Reseller"
        description="Review moatv reseller opportunities, customer setup expectations, supported devices, and the account details needed before you begin."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={resellerHref} target={resellerTarget} rel={resellerTarget ? "noopener noreferrer" : undefined}>
            Become a Reseller
          </ButtonLink>
          <ButtonLink href="/pricing" variant="secondary">
            Review Plans
          </ButtonLink>
        </div>
      </PageHero>

      <section id="reseller-inquiry" className="scroll-mt-24 bg-paper py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink">A moatv reseller conversation should be specific.</h2>
            <p className="mt-4 text-base leading-7 text-muted">
              moatv does not publish reseller rates or income claims on this website. The page is designed to help you prepare practical questions before discussing reseller terms.
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {benefits.map(([title, text]) => (
              <div key={title} className="border-b border-line pb-5">
                <h3 className="font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">How moatv reseller inquiries work.</h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Use this as a preparation checklist. Final moatv reseller terms and requirements must be confirmed directly.
            </p>
          </div>
          <ol className="mt-9 grid gap-6 md:grid-cols-4">
            {steps.map(([title, text], index) => (
              <li key={title} className="border-t border-line pt-5">
                <p className="text-sm font-semibold text-brand-700">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">Getting started as a moatv reseller</h2>
          <p className="mt-4 text-base leading-7 text-muted">
            The project does not include a separate reseller checkout or published reseller rate sheet. Review the details here so current requirements can be confirmed before you proceed.
          </p>
          <p className="mt-4 text-sm leading-6 text-muted">
            Public moatv plan configuration currently supports up to {pricingConfig.maxDevices} simultaneous device connections. Reseller-specific pricing, volume terms, and eligibility must be confirmed directly.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={resellerHref} target={resellerTarget} rel={resellerTarget ? "noopener noreferrer" : undefined}>
              Become a Reseller
            </ButtonLink>
            <ButtonLink href="/channels" variant="secondary">
              View Devices
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-paper pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">moatv Reseller FAQ</h2>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {faqs.map(([question, answer]) => (
              <div key={question} className="py-5">
                <h3 className="font-semibold text-ink">{question}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm leading-6 text-muted">
            For general questions, visit the{" "}
            <Link href="/faq" className="font-semibold text-brand-700 hover:underline">
              moatv FAQ
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}

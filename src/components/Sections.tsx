"use client";

import Link from "next/link";
import { useState } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { deviceCategories, faqs, installSteps } from "@/content/shared";

export function DeviceGrid() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <div className="max-w-xl">
        <h3 className="text-2xl font-semibold tracking-tight text-ink">Use moatv on the devices you already own.</h3>
        <p className="mt-4 text-base leading-7 text-muted">
          moatv setup information is organized around common living-room and mobile devices. App availability still depends on device model, region, and player support.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link className="font-semibold text-brand-700 hover:underline" href="/channels">
            moatv devices
          </Link>
          <Link className="font-semibold text-brand-700 hover:underline" href="/pricing">
            moatv pricing
          </Link>
        </div>
      </div>

      <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {deviceCategories.map((device) => (
          <li key={device.name} className="border-b border-line pb-5">
            <h4 className="text-base font-semibold text-ink">{device.name}</h4>
            <p className="mt-2 text-sm leading-6 text-muted">{device.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FAQList({ limit }: { limit?: number }) {
  const items = limit ? faqs.slice(0, limit) : faqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-5 py-5 text-left text-base font-semibold text-ink transition-colors hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              <span>{item.question}</span>
              <span className="mt-0.5 text-xl leading-none text-brand-700" aria-hidden="true">
                {isOpen ? "-" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="pb-6 text-sm leading-7 text-muted sm:text-base">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function InstallOverview() {
  return (
    <div className="space-y-8">
      {installSteps.map((group, groupIndex) => (
        <article key={group.platform} className="grid gap-5 border-b border-line pb-8 last:border-b-0 md:grid-cols-[14rem_1fr]">
          <div>
            <p className="text-sm font-semibold text-brand-700">0{groupIndex + 1}</p>
            <h3 className="mt-2 text-lg font-semibold text-ink">{group.platform}</h3>
          </div>

          <ol className="grid gap-3 text-sm text-muted sm:grid-cols-2">
            {group.steps.map((step, stepIndex) => (
              <li key={step} className="flex gap-3 leading-6">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-line bg-white text-xs font-semibold text-ink">
                  {stepIndex + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </article>
      ))}
    </div>
  );
}

export function FinalCTA() {
  return (
    <section className="bg-cream px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Ready to choose a moatv plan?
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Review current moatv terms, choose your screen count, and check the FAQ if you need help matching a device or setup format.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/pricing" variant="primary">
            Explore moatv Plans
          </ButtonLink>
          <ButtonLink href="/faq" variant="secondary">
            Browse FAQ
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function InlineLinks() {
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <Link className="font-semibold text-brand-700 hover:underline" href="/pricing">
        moatv pricing
      </Link>
      <Link className="font-semibold text-brand-700 hover:underline" href="/channels">
        moatv devices
      </Link>
      <Link className="font-semibold text-brand-700 hover:underline" href="/faq">
        moatv FAQ
      </Link>
    </div>
  );
}

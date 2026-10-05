"use client";

import { useState } from "react";
import { pricingConfig, type DeviceCount } from "@/config/pricing";
import { calculatePlanPrice } from "@/lib/pricing";
import { createOrderWhatsAppMessage, createWhatsAppUrl, getWhatsAppHref } from "@/lib/whatsapp";

const cardFeatures = [
  "moatv app setup guidance",
  "moatv Xtream API, M3U, or Portal setup",
  "Private moatv account details",
];

export function PricingSelector() {
  const [selectedDevices, setSelectedDevices] = useState<DeviceCount>(1);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-7 max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Choose Your moatv Plan
        </h2>
        <p className="mt-3 text-base leading-7 text-muted">
          Pick a moatv subscription term, then adjust the number of simultaneous device connections.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-ink">Screens</p>
        <div className="grid w-full grid-cols-2 gap-1 rounded-lg border border-line bg-white p-1 min-[420px]:grid-cols-3 sm:inline-flex sm:w-auto sm:flex-wrap sm:items-center">
          {pricingConfig.deviceCounts.map((count) => {
            const isActive = selectedDevices === count;
            return (
              <button
                key={count}
                type="button"
                onClick={() => setSelectedDevices(count)}
                aria-pressed={isActive}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 ${
                  isActive
                    ? "bg-brand-500 text-ink"
                    : "text-muted hover:bg-cream hover:text-ink"
                }`}
              >
                {count} {count === 1 ? "Device" : "Devices"}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pricingConfig.plans.map((plan) => {
          const priceInfo = calculatePlanPrice(plan, selectedDevices);
          const isBestValue = plan.id === "12-month";
          const orderMessage = createOrderWhatsAppMessage(plan, selectedDevices, priceInfo);
          const orderWhatsAppUrl = createWhatsAppUrl(orderMessage);
          const orderHref = getWhatsAppHref(orderMessage);

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-xl bg-white p-5 transition-colors duration-150 ${
                isBestValue
                  ? "border-2 border-brand-600"
                  : "border border-line hover:border-line-bright"
              }`}
            >
              {isBestValue && (
                <div className="mb-4 w-fit rounded-md bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                  Best Value
                </div>
              )}

              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-muted">
                  {plan.label}
                </p>

                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight text-ink">
                    {priceInfo.display}
                  </span>
                </div>

                <p className="mt-2 border-b border-line pb-4 text-sm text-muted">
                  {selectedDevices} {selectedDevices === 1 ? "Device Connection" : "Simultaneous Devices"}
                </p>

                <p className="mt-4 text-sm leading-6 text-muted">
                  {plan.description}
                </p>

                <ul className="mt-5 space-y-2.5 text-sm text-muted">
                  {cardFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="shrink-0 text-ink">✓</span>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 border-t border-line pt-4">
                <a
                  href={orderHref}
                  target={orderWhatsAppUrl ? "_blank" : undefined}
                  rel={orderWhatsAppUrl ? "noopener noreferrer" : undefined}
                  data-plan-id={plan.id}
                  data-devices={selectedDevices}
                  data-price-cents={priceInfo.cents}
                  data-price-display={priceInfo.display}
                  data-whatsapp-message={orderMessage}
                  className={`flex min-h-11 w-full items-center justify-center rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
                    isBestValue
                      ? "bg-brand-500 text-ink hover:bg-brand-600"
                      : "border border-line bg-white text-ink hover:border-ink"
                  }`}
                >
                  Order Now
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

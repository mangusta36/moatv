import { pricingConfig, type BasePlan, type DeviceCount } from "@/config/pricing";

export type PriceResult = {
  cents: number;
  display: string;
};

export function isDeviceCount(devices: number): devices is DeviceCount {
  return pricingConfig.deviceCounts.includes(devices as DeviceCount);
}

export function calculatePlanPrice(plan: BasePlan, devices: number): PriceResult {
  if (!isDeviceCount(devices)) {
    throw new Error(`Device count must be one of: ${pricingConfig.deviceCounts.join(", ")}.`);
  }

  const cents = plan.pricesByDevice[devices] * 100;

  return {
    cents,
    display: formatCurrency(cents),
  };
}

export function formatCurrency(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: pricingConfig.currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function getPlanById(planId: string): BasePlan {
  const plan = pricingConfig.plans.find((item) => item.id === planId);

  if (!plan) {
    throw new Error(`Unknown plan: ${planId}`);
  }

  return plan;
}

export function createOrderIntent(planId: string, devices: number) {
  const plan = getPlanById(planId);
  const price = calculatePlanPrice(plan, devices);

  return {
    planId: plan.id,
    duration: plan.label,
    devices,
    priceCents: price.cents,
    priceDisplay: price.display,
  };
}

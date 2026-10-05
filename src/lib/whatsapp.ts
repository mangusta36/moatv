import { siteConfig } from "@/config/site";
import type { BasePlan } from "@/config/pricing";
import type { PriceResult } from "@/lib/pricing";

export const whatsappMessages = {
  freeTrial: "Hi moatv, I'd like to request a free trial.",
  support: "Hi moatv, I need some help.",
  pricing: "Hi moatv, I have a question about your plans.",
  reseller: "Hi moatv, I'm interested in becoming a reseller.",
} as const;

export function getWhatsAppNumber() {
  return siteConfig.contact.whatsapp.replace(/[^\d]/g, "");
}

export function hasWhatsAppNumber() {
  return getWhatsAppNumber().length > 0;
}

export function createWhatsAppUrl(message: string) {
  const number = getWhatsAppNumber();

  if (!number) {
    throw new Error("MOATV WhatsApp number is not configured.");
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppHref(message: string) {
  return createWhatsAppUrl(message);
}

export function createOrderWhatsAppMessage(plan: BasePlan, devices: number, price: PriceResult) {
  const deviceLabel = devices === 1 ? "device" : "devices";
  const duration = `${plan.months} Month`;
  return `Hi moatv, I'd like the ${duration} plan for ${devices} ${deviceLabel} (${price.display}).`;
}

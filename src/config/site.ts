export const siteConfig = {
  name: "MoaTV",
  seoName: "moatv IPTV",
  description:
    "moatv IPTV helps customers compare plans, confirm compatible devices, follow setup guidance, and review support details before ordering.",
  productionDomain: "https://moatv.us",
  defaultLocale: "en_US",
  contact: {
    email: "",
    phone: "",
    whatsapp: process.env.NEXT_PUBLIC_MOATV_WHATSAPP ?? "212753936672",
  },
  social: {
    x: "",
    facebook: "",
    instagram: "",
  },
  publisher: {
    name: "MoaTV",
    legalName: "",
  },
  business: {
    checkoutUrl: "",
    freeTrialUrl: "",
    resellerInquiryUrl: "",
    supportResponseTime: "Support response time varies by request type",
    refundWindow: "Review the order terms supplied at purchase for refund eligibility and request timing.",
    paymentMethods: [] as string[],
  },
} as const;

export const getSiteUrl = (path = "/") => {
  const origin = siteConfig.productionDomain.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalizedPath}`;
};

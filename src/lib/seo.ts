import type { Metadata } from "next";
import { getSiteUrl, siteConfig } from "@/config/site";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
};

export function pageMetadata({
  title,
  description,
  path,
  image = "/images/moatv-hero.webp",
  imageAlt,
  type = "website",
}: MetaInput): Metadata {
  const url = getSiteUrl(path);
  const fullTitle = title.toLowerCase().includes(siteConfig.name.toLowerCase()) ? title : `${title} | ${siteConfig.name}`;
  const alt = imageAlt ?? `${fullTitle} preview image`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.defaultLocale,
      type,
      images: [{ url: getSiteUrl(image), width: 1200, height: 630, alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [getSiteUrl(image)],
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getSiteUrl(item.path),
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: getSiteUrl("/"),
    description: siteConfig.description,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.publisher.name,
    url: getSiteUrl("/"),
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
  };
}

export function faqPageJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

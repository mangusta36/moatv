import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/site";
import { blogArticles } from "@/content/blog";

const staticRoutes = [
  "/",
  "/pricing",
  "/channels",
  "/faq",
  "/blog",
  "/reseller",
  "/privacy",
  "/terms",
  "/refund",
  "/disclaimer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoutes = blogArticles.map((article) => ({
    route: `/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt),
  }));

  return [
    ...staticRoutes.map((route) => ({ route })),
    ...blogRoutes,
  ].map(({ route, lastModified }: { route: string; lastModified?: Date }) => ({
    url: getSiteUrl(route),
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}

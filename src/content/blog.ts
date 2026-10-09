import blogData from "@/content/blogData.json";

export type BlogImage = {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  sourceUrl?: string;
  license?: string;
};

export type BlogSource = {
  label: string;
  url: string;
};

export type BlogRelatedLink = {
  label: string;
  href: string;
};

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "links"; items: BlogRelatedLink[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "image"; image: BlogImage };

export type BlogSection = {
  id: string;
  heading: string;
  body: BlogBlock[];
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  author: string;
  primaryKeyword?: string;
  searchIntent?: string;
  heroImage?: BlogImage;
  sectionImages?: BlogImage[];
  intro?: string[];
  sections: BlogSection[];
  faq?: BlogFaq[];
  sources?: BlogSource[];
  relatedLinks?: BlogRelatedLink[];
  imageSources?: BlogImage[];
};

export const blogArticles = blogData.articles as BlogArticle[];
export const sportsArticles = blogArticles.filter((article) => article.category === "Sports");

export function getArticle(slug: string) {
  return blogArticles.find((article) => article.slug === slug);
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { blogArticles } from "@/content/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "moatv IPTV Blog",
  description: "Useful moatv IPTV setup, device and U.S. sports viewing articles with metadata and structured article pages.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const [featured, ...articles] = blogArticles;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="moatv Guides & Resources"
        description="Practical reading for choosing devices, understanding moatv setup formats, and following U.S. sports viewing calendars."
      />
      <section className="bg-paper py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {featured && (
            <article className="grid gap-8 border-b border-line pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                {featured.heroImage && (
                  <Image src={featured.heroImage.src} alt={featured.heroImage.alt} width={800} height={500} className="mb-5 rounded-lg border border-line object-cover" />
                )}
                <p className="text-sm font-semibold text-brand-700">{featured.category}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  <Link href={`/blog/${featured.slug}`} className="hover:text-brand-700">{featured.title}</Link>
                </h2>
              </div>
              <div>
                <p className="text-base leading-7 text-muted">{featured.description}</p>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
                  <span>Published {featured.publishedAt}</span>
                  <span>Updated {featured.updatedAt}</span>
                  <span>{featured.author}</span>
                </div>
                <Link href={`/blog/${featured.slug}`} className="mt-6 inline-flex font-semibold text-brand-700 hover:underline">Read moatv guide</Link>
              </div>
            </article>
          )}

          <div className="mt-10 divide-y divide-line">
            {articles.map((article) => (
              <article key={article.slug} className="grid gap-4 py-7 md:grid-cols-[11rem_1fr_auto] md:items-start">
                <div className="text-sm text-muted">
                  {article.heroImage && <Image src={article.heroImage.src} alt={article.heroImage.alt} width={176} height={110} className="mb-3 rounded-md border border-line object-cover" />}
                  <p className="font-semibold text-brand-700">{article.category}</p>
                  <p className="mt-1">{article.updatedAt}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-ink">
                    <Link href={`/blog/${article.slug}`} className="hover:text-brand-700">{article.title}</Link>
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{article.description}</p>
                </div>
                <Link href={`/blog/${article.slug}`} className="text-sm font-semibold text-brand-700 hover:underline md:pt-1">Read</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/ButtonLink";
import { JsonLd } from "@/components/JsonLd";
import { blogArticles, getArticle, type BlogBlock, type BlogImage } from "@/content/blog";
import { getSiteUrl, siteConfig } from "@/config/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    image: article.heroImage?.src,
    type: "article",
  });
}

function ImageCredit({ image }: { image: BlogImage }) {
  if (!image.caption && !image.credit) return null;
  return (
    <figcaption className="mt-2 text-xs leading-5 text-muted">
      {image.caption}
      {image.credit && (
        <span>
          {image.caption ? " " : ""}
          Source: {image.sourceUrl ? <a href={image.sourceUrl} className="font-semibold text-brand-700 hover:underline">{image.credit}</a> : image.credit}
          {image.license ? ` (${image.license})` : ""}.
        </span>
      )}
    </figcaption>
  );
}

function ArticleImage({ image }: { image: BlogImage }) {
  return (
    <figure className="my-7 overflow-hidden rounded-lg border border-line bg-white">
      <Image src={image.src} alt={image.alt} width={800} height={500} className="h-auto w-full object-cover" />
      <div className="px-4 pb-4">
        <ImageCredit image={image} />
      </div>
    </figure>
  );
}

function renderBlock(block: BlogBlock, index: number) {
  if (block.type === "p") {
    return <p key={index} className="mt-4 text-base leading-8 text-ink-secondary">{block.text}</p>;
  }

  if (block.type === "h3") {
    return <h3 key={index} className="mt-7 text-xl font-semibold tracking-tight text-ink">{block.text}</h3>;
  }

  if (block.type === "ul") {
    return (
      <ul key={index} className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-ink-secondary">
        {block.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    );
  }

  if (block.type === "image") {
    return <ArticleImage key={index} image={block.image} />;
  }

  return (
    <div key={index} className="mt-6 overflow-x-auto rounded-lg border border-line bg-white">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-cream text-ink">
          <tr>
            {block.headers.map((header) => <th key={header} className="border-b border-line px-4 py-3 font-semibold">{header}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-line text-muted">
          {block.rows.map((row, rowIndex) => (
            <tr key={row.join("-") || rowIndex}>
              {row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`} className="px-4 py-3 align-top leading-6">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const relatedLinks = article.relatedLinks ?? [];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: siteConfig.publisher.name },
    image: article.heroImage ? getSiteUrl(article.heroImage.src) : undefined,
    mainEntityOfPage: getSiteUrl(`/blog/${article.slug}`),
  };

  const faqJsonLd = article.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: article.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: article.title, path: `/blog/${article.slug}` },
      ])} />
      <JsonLd data={articleJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}

      <article className="bg-paper py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }, { name: article.title, href: `/blog/${article.slug}` }]} />

          <header className="max-w-3xl border-b border-line pb-8">
            <p className="text-sm font-semibold text-brand-700">{article.category}</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-5xl sm:leading-tight">{article.title}</h1>
            <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">{article.description}</p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
              <span>Published {article.publishedAt}</span>
              <span>Updated {article.updatedAt}</span>
              <span>{article.author}</span>
            </div>
          </header>

          {article.heroImage && (
            <figure className="mt-8 max-w-5xl overflow-hidden rounded-lg border border-line bg-white">
              <Image src={article.heroImage.src} alt={article.heroImage.alt} width={1200} height={630} priority className="h-auto w-full object-cover" />
              <div className="px-4 pb-4">
                <ImageCredit image={article.heroImage} />
              </div>
            </figure>
          )}

          <div className="mt-10 grid gap-10 lg:grid-cols-[15rem_1fr]">
            <nav aria-label="Table of contents" className="h-fit border-l border-line pl-4 text-sm lg:sticky lg:top-24">
              <h2 className="font-semibold text-ink">Contents</h2>
              <ol className="mt-3 space-y-2">
                {article.sections.map((sec) => (
                  <li key={sec.id}><a className="text-muted transition hover:text-brand-700" href={`#${sec.id}`}>{sec.heading}</a></li>
                ))}
                {Boolean(article.faq?.length) && <li><a className="text-muted transition hover:text-brand-700" href="#faq">FAQ</a></li>}
                {Boolean(article.sources?.length) && <li><a className="text-muted transition hover:text-brand-700" href="#sources">Sources</a></li>}
              </ol>
            </nav>

            <div className="max-w-3xl space-y-10">
              {article.intro?.map((para) => <p key={para} className="text-base leading-8 text-ink-secondary">{para}</p>)}

              {article.sections.map((sec) => (
                <section key={sec.id} id={sec.id} className="scroll-mt-28">
                  <h2 className="text-2xl font-semibold tracking-tight text-ink">{sec.heading}</h2>
                  {sec.body.map(renderBlock)}
                </section>
              ))}

              {Boolean(article.faq?.length) && (
                <section id="faq" className="scroll-mt-28 border-t border-line pt-8">
                  <h2 className="text-2xl font-semibold tracking-tight text-ink">FAQ</h2>
                  <div className="mt-5 divide-y divide-line border-y border-line">
                    {article.faq?.map((item) => (
                      <div key={item.question} className="py-5">
                        <h3 className="font-semibold text-ink">{item.question}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {Boolean(relatedLinks.length) && (
                <section className="border-t border-line pt-8">
                  <h2 className="text-2xl font-semibold tracking-tight text-ink">Related moatv guides</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    For site context, visit <Link href="/" className="font-semibold text-brand-700 hover:underline">moatv</Link>, then use these related links when they match what you are planning to watch.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {relatedLinks.map((link) => (
                      <Link key={`${link.href}-${link.label}`} href={link.href} className="rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-ink transition hover:border-ink">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {Boolean(article.sources?.length) && (
                <section id="sources" className="border-t border-line pt-8">
                  <h2 className="text-2xl font-semibold tracking-tight text-ink">Sources</h2>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                    {article.sources?.map((source) => <li key={source.url}><a href={source.url} className="font-semibold text-brand-700 hover:underline">{source.label}</a></li>)}
                  </ul>
                </section>
              )}

              <div className="border-t border-line pt-8">
                <h3 className="text-xl font-semibold text-ink">Next steps with moatv</h3>
                <p className="mt-2 text-sm leading-6 text-muted">Compare current moatv plans or review setup details before choosing your main device.</p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/pricing">View moatv Pricing</ButtonLink>
                  <ButtonLink href="/channels" variant="secondary">See moatv Devices</ButtonLink>
                </div>
                <Link href="/blog" className="mt-6 inline-flex text-sm font-semibold text-brand-700 hover:underline">Back to Blog</Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

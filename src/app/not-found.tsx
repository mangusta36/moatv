import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "Page Not Found | MoaTV",
  },
  description: "The requested moatv page could not be found.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-brand-700">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-base leading-7 text-muted">
          This moatv page is not available. Use the main navigation or return to a current plan, device, FAQ, or blog page.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/" className="font-semibold text-brand-700 hover:underline">Home</Link>
          <Link href="/pricing" className="font-semibold text-brand-700 hover:underline">Pricing</Link>
          <Link href="/faq" className="font-semibold text-brand-700 hover:underline">FAQ</Link>
          <Link href="/blog" className="font-semibold text-brand-700 hover:underline">Blog</Link>
        </div>
      </div>
    </section>
  );
}

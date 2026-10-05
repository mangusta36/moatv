import Link from "next/link";

export function Breadcrumbs({ items }: { items: Array<{ name: string; href: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true" className="text-line-bright">/</span>}
            <Link href={item.href} className="inline-flex min-h-10 items-center transition hover:text-brand-400 font-medium">
              {item.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

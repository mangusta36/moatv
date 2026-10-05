import Link from "next/link";
import { siteConfig } from "@/config/site";
import { createWhatsAppUrl, getWhatsAppHref, whatsappMessages } from "@/lib/whatsapp";

const columns = [
  {
    title: "Website",
    links: [
      { href: "/", label: "Home" },
      { href: "/pricing", label: "Pricing" },
      { href: "/channels", label: "Devices" },
      { href: "/faq", label: "FAQ" },
      { href: "/blog", label: "Blog" },
      { href: "/reseller", label: "Reseller" },
    ],
  },
  {
    title: "Legal & Policy",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/refund", label: "Refund Policy" },
      { href: "/disclaimer", label: "Service Disclaimer" },
    ],
  },
];

export function Footer() {
  const supportHref = getWhatsAppHref(whatsappMessages.support);
  const supportTarget = createWhatsAppUrl(whatsappMessages.support) ? "_blank" : undefined;
  const freeTrialHref = getWhatsAppHref(whatsappMessages.freeTrial);
  const freeTrialTarget = createWhatsAppUrl(whatsappMessages.freeTrial) ? "_blank" : undefined;

  return (
    <footer className="border-t border-black bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          {/* Left Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 font-bold text-ink">
              <div className="grid size-11 place-items-center rounded-lg bg-brand-500 text-base font-black tracking-tighter text-ink">
                <span>MOA</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight leading-none text-white">{siteConfig.name}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">IPTV Service</span>
              </div>
            </Link>

            <p className="max-w-md text-sm leading-relaxed text-white/70">
              {siteConfig.seoName} provides plan selection, setup guidance, device support, and policy transparency across all smart screens and devices.
            </p>

            <p className="text-xs text-white/65">moatv plan selection, setup information, device guidance, and support resources in one place.</p>
          </div>

          {/* Right Links Navigation Columns */}
          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white">{column.title}</h3>
                <ul className="mt-4 space-y-3 text-sm text-white/70">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="transition duration-150 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white">Support</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li>
                  <Link
                    href={supportHref}
                    target={supportTarget}
                    rel={supportTarget ? "noopener noreferrer" : undefined}
                    className="transition duration-150 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                  >
                    Contact Support
                  </Link>
                </li>
                <li>
                  <Link
                    href={freeTrialHref}
                    target={freeTrialTarget}
                    rel={freeTrialTarget ? "noopener noreferrer" : undefined}
                    className="transition duration-150 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                  >
                    Free Trial
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/15 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-white/60">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Premium entertainment experience for TV, Mobile & Desktop.</p>
        </div>
      </div>
    </footer>
  );
}

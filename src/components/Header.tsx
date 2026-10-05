"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/config/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/channels", label: "Devices" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/reseller", label: "Reseller" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 text-ink backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Identity */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 font-bold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
        >
          <div className="grid size-9 place-items-center rounded-lg bg-ink text-xs font-black tracking-tighter text-white transition-colors group-hover:bg-black sm:size-10 sm:text-sm">
            <span>MOA</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold leading-none tracking-tight text-ink sm:text-lg">{siteConfig.name}</span>
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted sm:text-[0.68rem]">IPTV Service</span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex lg:gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative rounded-md px-2.5 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 lg:px-3 ${
                  isActive
                    ? "text-ink"
                    : "text-muted hover:bg-cream hover:text-ink"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-brand-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA & Support */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link
            href="/pricing"
            className="inline-flex min-h-10 items-center justify-center rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            Configure Plan
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-sm font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            <span className="grid gap-1.5" aria-hidden="true">
              <span className={`block h-0.5 w-4 rounded-full bg-ink transition-all duration-200 ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-4 rounded-full bg-ink transition-all duration-200 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-4 rounded-full bg-ink transition-all duration-200 ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </span>
            <span>{isOpen ? "Close" : "Menu"}</span>
          </button>

          {/* Mobile Overlay Menu */}
          {isOpen && (
            <div
              id="mobile-navigation"
              className="fixed inset-x-4 top-20 z-50 rounded-xl border border-line bg-white p-4 shadow-premium"
            >
              <div className="mb-3 flex items-center justify-between border-b border-line pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink">Navigation</span>
                <span className="text-xs text-muted">MOA TV</span>
              </div>
              <nav aria-label="Mobile navigation" className="grid gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                        isActive
                          ? "bg-brand-50 text-ink font-semibold"
                          : "text-muted hover:bg-cream/60 hover:text-ink"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="size-2 rounded-full bg-brand-400" />}
                    </Link>
                  );
                })}
                <Link
                  href="/pricing"
                  onClick={() => setIsOpen(false)}
                  className="mt-3 flex min-h-11 items-center justify-center rounded-lg bg-brand-500 px-5 text-sm font-semibold text-ink"
                >
                  Configure Plan
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

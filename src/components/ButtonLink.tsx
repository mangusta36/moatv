import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  target?: string;
  rel?: string;
};

export function ButtonLink({ href, children, variant = "primary", className = "", target, rel }: ButtonLinkProps) {
  const styles = {
    primary:
      "bg-brand-500 text-ink hover:bg-brand-600",
    secondary:
      "border border-line bg-white text-ink hover:border-ink",
    ghost: "text-ink hover:bg-brand-50",
  };

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

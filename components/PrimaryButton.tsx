import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  "inline-flex min-h-12 items-center justify-center rounded-2xl px-6 py-3 text-lg font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-warm/40 disabled:cursor-not-allowed disabled:opacity-45";

const variants: Record<NonNullable<PrimaryButtonProps["variant"]>, string> = {
  primary: "bg-warm text-[#1d2d3e] hover:bg-[#ffd39d]",
  secondary: "border border-sand/40 bg-transparent text-sand hover:bg-white/10",
};

export default function PrimaryButton({ children, href, variant = "primary", className = "", ...props }: PrimaryButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

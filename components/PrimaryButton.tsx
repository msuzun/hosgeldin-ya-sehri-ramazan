import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "secondary";

type PrimaryButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  ariaLabel?: string;
};

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-6 py-3 text-lg font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900 disabled:cursor-not-allowed disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary: "bg-gold-500 text-night-900 hover:bg-gold-300 hover:shadow-gold",
  secondary: "border border-gold-300/45 bg-night-700/45 text-gold-300 hover:bg-night-700/70 hover:shadow-gold",
};

export default function PrimaryButton({
  children,
  href,
  onClick,
  variant = "primary",
  icon,
  className = "",
  disabled,
  type = "button",
  ariaLabel,
}: PrimaryButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  const content = (
    <>
      {icon ? <span aria-hidden="true" className="shrink-0">{icon}</span> : null}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${classes} ${disabled ? "pointer-events-none" : ""}`.trim()}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
        aria-disabled={disabled}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick as MouseEventHandler<HTMLButtonElement> | undefined}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}

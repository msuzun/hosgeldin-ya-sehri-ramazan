import type { CSSProperties } from "react";

type MoonProps = {
  className?: string;
  style?: CSSProperties;
  intensity?: number;
};

export default function Moon({ className, style, intensity = 1 }: MoonProps) {
  const glow = 0.35 + intensity * 0.35;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 760"
      preserveAspectRatio="none"
      className={className}
      style={style}
    >
      <defs>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff4cf" stopOpacity={glow} />
          <stop offset="100%" stopColor="#fff4cf" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="600" cy="170" r="132" fill="url(#moonGlow)" />
      <circle cx="600" cy="170" r="54" fill="#ffe6ac" />
      <circle cx="625" cy="166" r="52" fill="#12293f" />
    </svg>
  );
}

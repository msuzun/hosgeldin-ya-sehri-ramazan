import type { CSSProperties } from "react";

type MoonProps = {
  className?: string;
  style?: CSSProperties;
  intensity?: number;
};

export default function Moon({ className, style, intensity = 1 }: MoonProps) {
  const glowOpacity = Math.min(0.85, 0.3 + intensity * 0.4);

  return (
    <svg aria-hidden="true" viewBox="0 0 1200 760" preserveAspectRatio="none" className={className} style={style}>
      <defs>
        <radialGradient id="moon-soft-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffeec2" stopOpacity={glowOpacity} />
          <stop offset="100%" stopColor="#ffeec2" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="moon-fill" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fff3d1" />
          <stop offset="100%" stopColor="#f7cf82" />
        </radialGradient>
      </defs>

      <circle cx="710" cy="210" r="190" fill="url(#moon-soft-glow)" />
      <circle cx="710" cy="210" r="78" fill="url(#moon-fill)" />
      <circle cx="748" cy="202" r="70" fill="#143351" />
    </svg>
  );
}

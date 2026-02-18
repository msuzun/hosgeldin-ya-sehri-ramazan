import type { CSSProperties } from "react";

type WaterReflectionProps = {
  className?: string;
  style?: CSSProperties;
  intensity?: number;
};

export default function WaterReflection({ className, style, intensity = 1 }: WaterReflectionProps) {
  const glowOpacity = Math.min(0.95, 0.3 + intensity * 0.35);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 760"
      preserveAspectRatio="none"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id="waterFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d4869" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0c2238" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      <rect x="0" y="560" width="1200" height="200" fill="url(#waterFill)" />

      <g className="water-shimmer" opacity={glowOpacity}>
        <path d="M0 610 C110 586 190 628 300 606 C410 584 490 628 600 606 C710 584 790 628 900 606 C1010 584 1090 628 1200 606 V760 H0 Z" fill="#f1ca79" fillOpacity="0.17" />
        <path d="M0 644 C130 622 220 658 340 636 C460 614 540 658 660 636 C780 614 860 658 980 636 C1100 614 1145 642 1200 636 V760 H0 Z" fill="#fff2cf" fillOpacity="0.08" />
      </g>
    </svg>
  );
}

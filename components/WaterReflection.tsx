import type { CSSProperties } from "react";

type WaterReflectionProps = {
  className?: string;
  style?: CSSProperties;
  intensity?: number;
};

export default function WaterReflection({ className, style, intensity = 1 }: WaterReflectionProps) {
  const reflectOpacity = Math.min(0.9, 0.3 + intensity * 0.4);

  return (
    <svg aria-hidden="true" viewBox="0 0 1200 760" preserveAspectRatio="none" className={className} style={style}>
      <defs>
        <linearGradient id="water-deep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#184161" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0a1f35" stopOpacity="0.96" />
        </linearGradient>
        <linearGradient id="reflection-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0c678" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#f0c678" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="0" y="548" width="1200" height="212" fill="url(#water-deep)" />

      <g opacity={reflectOpacity}>
        <g transform="translate(0 1094) scale(1 -1)">
          <path d="M270 446 C270 370 350 334 430 334 C510 334 590 370 590 446 Z" fill="url(#reflection-fade)" />
          <path d="M540 446 C540 356 640 312 740 312 C840 312 940 356 940 446 Z" fill="url(#reflection-fade)" />
          <rect x="210" y="446" width="780" height="70" fill="url(#reflection-fade)" opacity="0.65" />
        </g>
      </g>

      <g className="water-shimmer-band" opacity="0.24">
        <path d="M-180 620 C30 590 190 650 380 618 C560 586 760 648 940 616 C1080 592 1260 630 1380 620 V760 H-180 Z" fill="#ffe5ad" />
      </g>

      <g className="water-ripples" opacity="0.14">
        <path d="M0 606 C120 586 220 626 340 608 C460 590 560 628 680 610 C800 592 900 630 1020 612 C1100 600 1140 604 1200 610" stroke="#ffd990" strokeWidth="1.4" fill="none" />
        <path d="M0 646 C140 626 250 666 390 646 C530 626 640 666 780 646 C920 626 1030 666 1200 648" stroke="#ffe8ba" strokeWidth="1.2" fill="none" />
      </g>
    </svg>
  );
}

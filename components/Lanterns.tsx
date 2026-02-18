import type { CSSProperties } from "react";

type LanternsProps = {
  className?: string;
  style?: CSSProperties;
  intensity?: number;
};

const lanterns = [
  { x: 910, y: 148, delay: "0s", duration: "5.4s", scale: 1 },
  { x: 1018, y: 186, delay: "0.8s", duration: "5.9s", scale: 0.9 },
  { x: 1110, y: 130, delay: "1.2s", duration: "4.8s", scale: 0.76 },
];

export default function Lanterns({ className, style, intensity = 1 }: LanternsProps) {
  const lampOpacity = Math.min(1, 0.5 + intensity * 0.45);

  return (
    <svg aria-hidden="true" viewBox="0 0 1200 760" preserveAspectRatio="none" className={className} style={style}>
      <defs>
        <radialGradient id="lantern-light" cx="50%" cy="45%" r="62%">
          <stop offset="0%" stopColor="#ffe8bb" stopOpacity={lampOpacity} />
          <stop offset="100%" stopColor="#ffb95f" stopOpacity={Math.max(0.3, lampOpacity - 0.35)} />
        </radialGradient>
      </defs>

      {lanterns.map((lantern, index) => (
        <g key={index} transform={`translate(${lantern.x} ${lantern.y}) scale(${lantern.scale})`}>
          <path d="M0 -76 V-54" stroke="#f9e4b3" strokeOpacity="0.45" strokeWidth="2" />

          <g
            className="lantern-sway"
            style={{
              transformOrigin: `${lantern.x}px ${lantern.y - 76}px`,
              animationDelay: lantern.delay,
              animationDuration: lantern.duration,
            }}
          >
            <rect x="-24" y="-54" width="48" height="72" rx="14" fill="#14324d" stroke="#f8d594" strokeOpacity="0.7" strokeWidth="1.8" />
            <rect x="-13" y="-39" width="26" height="42" rx="10" fill="url(#lantern-light)" className="window-glow" />
            <path d="M-12 18 H12 L8 30 H-8 Z" fill="#f9e4b3" fillOpacity="0.72" />
          </g>
        </g>
      ))}
    </svg>
  );
}

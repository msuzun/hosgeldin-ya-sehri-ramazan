import type { CSSProperties } from "react";

type LanternsProps = {
  className?: string;
  style?: CSSProperties;
  intensity?: number;
};

const lanterns = [
  { x: 205, y: 160, delay: "0s", duration: "4.8s", scale: 1 },
  { x: 995, y: 176, delay: "0.7s", duration: "5.3s", scale: 0.94 },
  { x: 860, y: 118, delay: "1.1s", duration: "4.5s", scale: 0.78 },
];

export default function Lanterns({ className, style, intensity = 1 }: LanternsProps) {
  const lampOpacity = Math.min(1, 0.5 + intensity * 0.45);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 760"
      preserveAspectRatio="none"
      className={className}
      style={style}
    >
      {lanterns.map((lantern, index) => (
        <g
          key={index}
          className="lantern-sway"
          style={{
            transformOrigin: `${lantern.x}px ${lantern.y - 66}px`,
            animationDelay: lantern.delay,
            animationDuration: lantern.duration,
          }}
          transform={`translate(${lantern.x} ${lantern.y}) scale(${lantern.scale})`}
        >
          <path d="M0 -70 V-52" stroke="#f9e5b3" strokeOpacity="0.45" strokeWidth="2" />
          <rect x="-22" y="-52" width="44" height="68" rx="12" fill="#0e2b46" stroke="#f9d48d" strokeOpacity="0.68" strokeWidth="2" />
          <rect x="-12" y="-38" width="24" height="38" rx="10" className="window-glow fill-lamp-amber" style={{ opacity: lampOpacity }} />
          <path d="M-10 16 H10 L7 28 H-7 Z" fill="#f9e5b3" fillOpacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

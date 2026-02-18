import type { CSSProperties } from "react";

type MosqueProps = {
  className?: string;
  style?: CSSProperties;
  intensity?: number;
};

export default function Mosque({ className, style, intensity = 1 }: MosqueProps) {
  const windowOpacity = Math.min(1, 0.45 + intensity * 0.5);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 760"
      preserveAspectRatio="none"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id="mosqueFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#162f49" />
          <stop offset="100%" stopColor="#0a1728" />
        </linearGradient>
      </defs>

      <g>
        <rect x="0" y="520" width="1200" height="240" fill="url(#mosqueFade)" />

        <rect x="120" y="470" width="960" height="180" fill="#0c1d31" />

        <rect x="180" y="412" width="48" height="150" fill="#0b1a2d" />
        <path d="M204 360 L173 412 H235 Z" fill="#0b1a2d" />

        <rect x="972" y="420" width="40" height="142" fill="#0b1a2d" />
        <path d="M992 372 L966 420 H1018 Z" fill="#0b1a2d" />

        <rect x="260" y="430" width="680" height="132" fill="#10253d" />

        <path d="M320 430 C320 366 390 332 460 332 C530 332 600 366 600 430 Z" fill="#0d2137" />
        <path d="M600 430 C600 360 672 322 750 322 C828 322 900 360 900 430 Z" fill="#0d2137" />

        <rect x="548" y="352" width="44" height="210" fill="#0b1a2d" />
        <path d="M570 305 L544 352 H596 Z" fill="#0b1a2d" />

        <rect x="430" y="476" width="62" height="86" rx="30" fill="#091423" />
        <rect x="708" y="476" width="62" height="86" rx="30" fill="#091423" />

        <g opacity={windowOpacity}>
          <rect x="300" y="486" width="16" height="26" rx="8" className="window-glow fill-lamp-amber" />
          <rect x="346" y="486" width="16" height="26" rx="8" className="window-glow fill-lamp-amber" style={{ animationDelay: "0.8s" }} />
          <rect x="648" y="486" width="16" height="26" rx="8" className="window-glow fill-lamp-amber" style={{ animationDelay: "1.2s" }} />
          <rect x="694" y="486" width="16" height="26" rx="8" className="window-glow fill-lamp-amber" style={{ animationDelay: "0.4s" }} />
          <rect x="840" y="486" width="16" height="26" rx="8" className="window-glow fill-lamp-amber" style={{ animationDelay: "1s" }} />
        </g>
      </g>
    </svg>
  );
}

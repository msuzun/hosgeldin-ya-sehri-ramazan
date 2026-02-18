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
      shapeRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id="mosque-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#152f49" />
          <stop offset="100%" stopColor="#081624" />
        </linearGradient>
        <linearGradient id="window-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffde9e" />
          <stop offset="100%" stopColor="#ffb95f" />
        </linearGradient>
      </defs>

      <g>
        <rect x="0" y="520" width="1200" height="240" fill="url(#mosque-base)" />

        <g fill="#0d2136">
          <rect x="210" y="446" width="780" height="132" />
          <rect x="164" y="388" width="54" height="190" />
          <path d="M191 342 L157 388 H225 Z" />
          <rect x="982" y="404" width="46" height="174" />
          <path d="M1005 358 L975 404 H1035 Z" />
          <rect x="566" y="350" width="44" height="228" />
          <path d="M588 304 L560 350 H616 Z" />
        </g>

        <path d="M270 446 C270 370 350 334 430 334 C510 334 590 370 590 446 Z" fill="#0f263d" />
        <path d="M540 446 C540 356 640 312 740 312 C840 312 940 356 940 446 Z" fill="#112b45" />

        <rect x="438" y="488" width="70" height="90" rx="34" fill="#081322" />
        <rect x="692" y="488" width="70" height="90" rx="34" fill="#081322" />

        <g opacity={windowOpacity}>
          {[
            [292, 490, "0s"],
            [338, 490, "0.7s"],
            [384, 490, "1.2s"],
            [646, 490, "0.4s"],
            [692, 490, "1.1s"],
            [738, 490, "0.9s"],
            [836, 490, "0.5s"],
          ].map(([x, y, delay], idx) => (
            <rect
              key={idx}
              x={Number(x)}
              y={Number(y)}
              width="16"
              height="26"
              rx="8"
              fill="url(#window-gold)"
              className="window-glow"
              style={{ animationDelay: String(delay) }}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

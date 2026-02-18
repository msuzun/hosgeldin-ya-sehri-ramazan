import type { CSSProperties } from "react";

type StarsProps = {
  className?: string;
  style?: CSSProperties;
  intensity?: number;
  count?: number;
};

export default function Stars({ className, style, intensity = 1, count = 44 }: StarsProps) {
  const stars = Array.from({ length: count }, (_, index) => {
    const seed = index + 1;
    const x = (seed * 83 + 57) % 1200;
    const y = (seed * 137 + 31) % 460;
    const r = 0.9 + ((seed * 17) % 3) * 0.45;
    const delay = `${((seed * 23) % 17) * 0.22}s`;
    const duration = `${2.4 + ((seed * 11) % 7) * 0.5}s`;
    const sparkle = seed % 5 === 0;

    return { x, y, r, delay, duration, sparkle };
  });

  return (
    <svg aria-hidden="true" viewBox="0 0 1200 760" preserveAspectRatio="none" className={className} style={style}>
      <g opacity={Math.min(1.15, Math.max(0.35, intensity * 0.9))}>
        {stars.map((star, index) =>
          star.sparkle ? (
            <g key={index} className="star-twinkle" style={{ animationDelay: star.delay, animationDuration: star.duration }}>
              <line x1={star.x - 3.2} y1={star.y} x2={star.x + 3.2} y2={star.y} stroke="#ffe6ac" strokeWidth="1" strokeLinecap="round" />
              <line x1={star.x} y1={star.y - 3.2} x2={star.x} y2={star.y + 3.2} stroke="#ffe6ac" strokeWidth="1" strokeLinecap="round" />
            </g>
          ) : (
            <circle
              key={index}
              cx={star.x}
              cy={star.y}
              r={star.r}
              className="star-twinkle"
              style={{ fill: "#ffe6ac", animationDelay: star.delay, animationDuration: star.duration }}
            />
          ),
        )}
      </g>
    </svg>
  );
}

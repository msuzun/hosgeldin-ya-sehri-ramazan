import type { CSSProperties } from "react";

type StarsProps = {
  className?: string;
  style?: CSSProperties;
  intensity?: number;
  count?: number;
};

export default function Stars({ className, style, intensity = 1, count = 42 }: StarsProps) {
  const stars = Array.from({ length: count }, (_, index) => {
    const x = (index * 37 + 13) % 100;
    const y = (index * 29 + 11) % 72;
    const size = 0.8 + ((index * 19) % 3) * 0.6;
    const delay = `${(index % 11) * 0.3}s`;
    const duration = `${2.8 + (index % 6) * 0.55}s`;

    return { x, y, size, delay, duration };
  });

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 760"
      preserveAspectRatio="none"
      className={className}
      style={style}
    >
      <g opacity={Math.min(1.15, Math.max(0.3, intensity * 0.9))}>
        {stars.map((star, index) => (
          <circle
            key={index}
            cx={(star.x / 100) * 1200}
            cy={(star.y / 100) * 760}
            r={star.size}
            className="star-twinkle fill-gold-300"
            style={{ animationDelay: star.delay, animationDuration: star.duration }}
          />
        ))}
      </g>
    </svg>
  );
}

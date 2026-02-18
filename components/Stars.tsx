type StarsProps = {
  count?: number;
};

export default function Stars({ count = 30 }: StarsProps) {
  const stars = Array.from({ length: count }, (_, index) => {
    const x = (index * 37) % 100;
    const y = (index * 53) % 65;
    const size = 1 + ((index * 17) % 3);
    const delay = `${(index % 9) * 0.4}s`;
    const duration = `${2.8 + (index % 5) * 0.7}s`;

    return { x, y, size, delay, duration };
  });

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {stars.map((star, index) => (
        <span
          key={index}
          className="star-twinkle absolute rounded-full bg-sand/90"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
}

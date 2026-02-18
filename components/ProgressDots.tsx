type ProgressDotsProps = {
  current: number;
  total?: number;
};

export default function ProgressDots({ current, total = 3 }: ProgressDotsProps) {
  const dotCount = total > 0 ? total : 3;
  const activeIndex = Math.min(Math.max(0, current), dotCount - 1);

  return (
    <div
      className="flex items-center gap-2"
      role="status"
      aria-live="polite"
      aria-label={`Adım ${activeIndex + 1} / ${dotCount}`}
    >
      {Array.from({ length: dotCount }).map((_, index) => {
        const active = index === activeIndex;
        return (
          <span
            key={index}
            className={`h-2.5 w-7 rounded-full transition-all duration-300 ${active ? "bg-gold-300 shadow-gold" : "bg-white/25"}`}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}

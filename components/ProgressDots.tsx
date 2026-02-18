type ProgressDotsProps = {
  total: number;
  current: number;
};

export default function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-2" aria-label="Flow progress" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={Math.min(current + 1, total)}>
      {Array.from({ length: total }).map((_, index) => {
        const active = index <= current;
        return (
          <span
            key={index}
            className={`h-2.5 w-7 rounded-full ${active ? "bg-gold-500" : "bg-white/20"}`}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}


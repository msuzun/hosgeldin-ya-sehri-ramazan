type ChoiceCardProps = {
  title: string;
  selected?: boolean;
  onSelect: () => void;
};

export default function ChoiceCard({ title, selected = false, onSelect }: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-2xl border px-5 py-4 text-left text-lg font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-500/40 ${
        selected
          ? "border-gold-500 bg-gold-500/15 text-gold-300"
          : "border-white/20 bg-night-700/70 text-gold-300/90 hover:border-gold-500/70 hover:bg-night-700"
      }`}
      aria-pressed={selected}
    >
      {title}
    </button>
  );
}


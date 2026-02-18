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
      className={`rounded-2xl border px-5 py-4 text-left text-lg font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-warm/40 ${
        selected
          ? "border-warm bg-warm/15 text-sand"
          : "border-white/20 bg-night/70 text-sand/90 hover:border-warm/70 hover:bg-night"
      }`}
      aria-pressed={selected}
    >
      {title}
    </button>
  );
}

import type { KeyboardEvent, ReactNode } from "react";

type ChoiceIcon = "family" | "friend" | "self" | "anon" | "peace" | "relief" | "ease" | "courage" | "default";

type ChoiceCardProps = {
  title: string;
  selected?: boolean;
  onSelect: () => void;
  icon?: ChoiceIcon;
};

function iconFromTitle(title: string): ChoiceIcon {
  const t = title.toLowerCase();
  if (t.includes("ailem")) return "family";
  if (t.includes("dost")) return "friend";
  if (t.includes("kendim")) return "self";
  if (t.includes("ismini")) return "anon";
  if (t.includes("huzur")) return "peace";
  if (t.includes("ferah")) return "relief";
  if (t.includes("kolay")) return "ease";
  if (t.includes("cesaret")) return "courage";
  return "default";
}

function ChoiceGlyph({ kind }: { kind: ChoiceIcon }): ReactNode {
  const common = "h-5 w-5";
  switch (kind) {
    case "family":
      return <svg viewBox="0 0 24 24" className={common} fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.8"/><circle cx="16" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.8"/><path d="M3.5 19c.8-3 3-4.5 5-4.5S13 16 13.8 19M12.5 19c.4-1.9 1.9-3.1 3.6-3.1 1.8 0 3.2 1.2 3.7 3.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
    case "friend":
      return <svg viewBox="0 0 24 24" className={common} fill="none"><circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.8"/><path d="M4.5 19c.8-3 2.8-4.5 4.5-4.5 1.8 0 3.8 1.5 4.6 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M15 7.2l.9 1.9 2.1.2-1.6 1.4.5 2.1L15 11.7l-1.9 1.1.5-2.1-1.6-1.4 2.1-.2L15 7.2z" fill="currentColor"/></svg>;
    case "self":
      return <svg viewBox="0 0 24 24" className={common} fill="none"><circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8"/><path d="M6 19c1-3.3 3.4-5 6-5s5 1.7 6 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
    case "anon":
      return <svg viewBox="0 0 24 24" className={common} fill="none"><circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.8"/><path d="M6 19c1.1-3.2 3.5-4.8 6-4.8 2.6 0 5 1.6 6 4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="18.5" cy="5.5" r="1.5" fill="currentColor"/></svg>;
    case "peace":
      return <svg viewBox="0 0 24 24" className={common} fill="none"><path d="M12 4v16M12 12l5-5M12 12l-5-5M12 20c4.4 0 8-3.6 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case "relief":
      return <svg viewBox="0 0 24 24" className={common} fill="none"><path d="M12 4c3 3.3 5.2 6.1 5.2 8.7a5.2 5.2 0 1 1-10.4 0C6.8 10.1 9 7.3 12 4z" stroke="currentColor" strokeWidth="1.8"/><path d="M10.2 13.3c.4 1.1 1.2 1.8 2.4 2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
    case "ease":
      return <svg viewBox="0 0 24 24" className={common} fill="none"><path d="M3 12h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M15 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case "courage":
      return <svg viewBox="0 0 24 24" className={common} fill="none"><path d="M12 3l2.6 5.2 5.7.8-4.1 4 1 5.7-5.2-2.8-5.2 2.8 1-5.7-4.1-4 5.7-.8L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>;
    default:
      return <svg viewBox="0 0 24 24" className={common} fill="none"><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/></svg>;
  }
}

export default function ChoiceCard({ title, selected = false, onSelect, icon }: ChoiceCardProps) {
  const resolvedIcon = icon ?? iconFromTitle(title);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <button
      type="button"
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className={`w-full rounded-2xl border px-5 py-4 text-left text-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900 ${
        selected
          ? "border-gold-500 bg-gold-500/15 text-gold-300 shadow-gold"
          : "border-white/20 bg-night-700/70 text-gold-300/90 hover:border-gold-500/75 hover:bg-night-700 hover:shadow-gold"
      }`}
      aria-pressed={selected}
    >
      <span className="flex items-center gap-3">
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${selected ? "bg-gold-500/18" : "bg-night-900/45"}`} aria-hidden="true">
          <ChoiceGlyph kind={resolvedIcon} />
        </span>
        <span>{title}</span>
      </span>
    </button>
  );
}

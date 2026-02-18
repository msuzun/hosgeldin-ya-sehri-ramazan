export default function Moon() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 sm:top-10">
      <div className="moon-glow relative h-24 w-24 rounded-full bg-sand/95 sm:h-28 sm:w-28">
        <div className="absolute left-6 top-1 h-24 w-24 rounded-full bg-night sm:h-28 sm:w-28" />
      </div>
    </div>
  );
}

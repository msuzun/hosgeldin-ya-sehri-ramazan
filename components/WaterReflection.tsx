export default function WaterReflection() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
      <div className="water-shimmer absolute inset-0 bg-gradient-to-t from-[#0d2945]/95 via-[#123b5f]/65 to-transparent" />
      <svg viewBox="0 0 1200 120" className="absolute bottom-0 h-full w-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 36C80 54 140 20 220 38C300 56 360 24 440 42C520 60 580 26 660 44C740 62 800 30 880 46C960 62 1040 30 1120 46C1160 54 1180 56 1200 54V120H0V36Z" fill="rgba(255,231,178,0.15)" />
        <path d="M0 58C90 74 170 48 250 64C330 80 410 52 490 68C570 84 650 54 730 70C810 86 890 56 970 72C1050 88 1120 64 1200 76V120H0V58Z" fill="rgba(255,231,178,0.1)" />
      </svg>
    </div>
  );
}

import Lanterns from "@/components/Lanterns";
import Moon from "@/components/Moon";
import Mosque from "@/components/Mosque";
import Stars from "@/components/Stars";
import WaterReflection from "@/components/WaterReflection";

export default function IllustrationHero() {
  return (
    <section
      aria-label="Ramadan night illustration"
      className="relative isolate mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-night-900 shadow-soft"
    >
      <div className="relative aspect-[16/10] min-h-[22rem] w-full sm:min-h-[28rem]">
        <svg aria-hidden="true" viewBox="0 0 1200 760" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="nightSky" cx="50%" cy="22%" r="72%">
              <stop offset="0%" stopColor="#264f72" />
              <stop offset="48%" stopColor="#153756" />
              <stop offset="100%" stopColor="#081625" />
            </radialGradient>
          </defs>
          <rect width="1200" height="760" fill="url(#nightSky)" />
        </svg>

        <Stars className="absolute inset-0 h-full w-full" intensity={1} />
        <Moon className="absolute inset-0 h-full w-full" intensity={1} />
        <Mosque className="absolute inset-0 h-full w-full" intensity={0.9} />
        <Lanterns className="absolute inset-0 h-full w-full" intensity={1} />
        <WaterReflection className="absolute inset-0 h-full w-full" intensity={0.95} />

        <svg aria-hidden="true" viewBox="0 0 1200 760" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="mistGlow" cx="50%" cy="80%" r="48%">
              <stop offset="0%" stopColor="#dce8ef" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#dce8ef" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="600" cy="666" rx="470" ry="96" fill="url(#mistGlow)" />
        </svg>
      </div>
    </section>
  );
}

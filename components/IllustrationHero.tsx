import Lanterns from "@/components/Lanterns";
import Moon from "@/components/Moon";
import Mosque from "@/components/Mosque";
import Stars from "@/components/Stars";
import WaterReflection from "@/components/WaterReflection";

export default function IllustrationHero() {
  return (
    <section aria-label="Ramadan night illustration" className="relative isolate h-[24rem] overflow-hidden rounded-[2rem] border border-white/10 bg-sky-glow shadow-soft sm:h-[29rem]">
      <Stars count={36} />
      <Moon />
      <Lanterns />
      <Mosque />
      <WaterReflection />
    </section>
  );
}

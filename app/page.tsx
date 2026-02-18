import IllustrationHero from "@/components/IllustrationHero";
import PrimaryButton from "@/components/PrimaryButton";
import { copy } from "@/lib/copy";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-12 pt-8 sm:px-6 lg:px-10">
      <header className="mb-8 text-center sm:mb-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-sand/70">{copy.home.kicker}</p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">{copy.home.title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-sand/90">{copy.home.subtitle}</p>
      </header>

      <IllustrationHero />

      <nav aria-label="Primary" className="mt-10 flex flex-wrap justify-center gap-4">
        <PrimaryButton href="/dua">{copy.home.ctaDua}</PrimaryButton>
        <PrimaryButton href="/about" variant="secondary">
          {copy.home.ctaAbout}
        </PrimaryButton>
      </nav>
    </main>
  );
}

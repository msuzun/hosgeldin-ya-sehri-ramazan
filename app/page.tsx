import IllustrationHero from "@/components/IllustrationHero";
import PrimaryButton from "@/components/PrimaryButton";
import { copy } from "@/lib/copy";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-14 pt-6 sm:px-6 lg:px-10">
      <div className="h-[320px] w-full md:h-[520px]">
        <IllustrationHero className="h-full w-full" />
      </div>

      <section className="mx-auto mt-8 w-full max-w-3xl text-center sm:mt-10">
        <h1 className="text-4xl font-extrabold leading-[1.3] text-gold-300 sm:text-5xl">{copy.home.title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-xl leading-[1.9] text-gold-300/90 sm:text-2xl">{copy.home.subtitleLine1}</p>
        <p className="mx-auto mt-2 max-w-2xl text-xl leading-[1.9] text-gold-300/85 sm:text-2xl">{copy.home.subtitleLine2}</p>

        <nav aria-label="Primary actions" className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
          <PrimaryButton href="/dua" className="w-full rounded-3xl py-4 text-xl shadow-soft hover:brightness-105 focus-visible:brightness-105">
            {copy.home.ctaDua}
          </PrimaryButton>
          <PrimaryButton
            href="/about"
            variant="secondary"
            className="w-full rounded-3xl border-gold-500/45 bg-night-700/55 py-4 text-xl shadow-soft hover:bg-night-700/75"
          >
            {copy.home.ctaAbout}
          </PrimaryButton>
        </nav>

        <p className="mt-8 text-base leading-[1.9] text-gold-300/70 sm:mt-10">{copy.home.footer}</p>
      </section>
    </main>
  );
}

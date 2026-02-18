import PrimaryButton from "@/components/PrimaryButton";
import { aboutCopy } from "@/lib/copy";

export default function AboutPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pb-16 pt-10 sm:px-6">
      <header className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-300/70">{aboutCopy.kicker}</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{aboutCopy.title}</h1>
      </header>

      <section className="mt-8 rounded-3xl border border-white/15 bg-night-700/60 p-6 shadow-soft sm:p-8">
        <p className="text-xl leading-relaxed">{aboutCopy.line1}</p>
        <p className="mt-4 text-xl leading-relaxed text-gold-300/90">{aboutCopy.line2}</p>
        <p className="mt-4 text-xl leading-relaxed text-gold-300/90">{aboutCopy.line3}</p>

        <div className="mt-8">
          <PrimaryButton href="/">{aboutCopy.backHome}</PrimaryButton>
        </div>
      </section>
    </main>
  );
}

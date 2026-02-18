"use client";

import { useMemo } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import { aboutCopy, getRandomDortluk } from "@/lib/copy";

export default function AboutPage() {
  const dortluk = useMemo(() => getRandomDortluk(), []);

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
        <p className="mt-4 text-xl leading-relaxed text-gold-300/85">{aboutCopy.line4}</p>

        <article className="relative mt-8 overflow-hidden rounded-2xl border border-gold-500/25 bg-night-900/55 p-5 sm:p-6">
          <span className="text-sm font-bold uppercase tracking-[0.16em] text-gold-300/75">{aboutCopy.poemLabel}</span>

          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="star-twinkle absolute right-4 top-4 h-5 w-5 text-gold-300/80"
            fill="none"
          >
            <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>

          <p className="mt-4 whitespace-pre-line text-lg leading-[1.9] text-gold-300/92 sm:text-xl">{dortluk}</p>
        </article>

        <div className="mt-8">
          <PrimaryButton href="/">{aboutCopy.backHome}</PrimaryButton>
        </div>
      </section>
    </main>
  );
}

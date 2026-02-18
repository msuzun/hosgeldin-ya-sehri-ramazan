"use client";

import { useMemo, useState } from "react";
import ChoiceCard from "@/components/ChoiceCard";
import PrimaryButton from "@/components/PrimaryButton";
import ProgressDots from "@/components/ProgressDots";
import { copy } from "@/lib/copy";

const TOTAL_STEPS = 3;

export default function DuaPage() {
  const { dua } = copy;
  const [stepIndex, setStepIndex] = useState(0);
  const [forWho, setForWho] = useState<string | null>(null);
  const [intention, setIntention] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const finalStep = stepIndex >= TOTAL_STEPS;

  const generatedLine = useMemo(() => {
    if (!forWho || !intention) return "";

    const whoIndex = dua.step1.options.indexOf(forWho);
    const niyetIndex = dua.step2.options.indexOf(intention);
    const safeWho = whoIndex < 0 ? 0 : whoIndex;
    const safeNiyet = niyetIndex < 0 ? 0 : niyetIndex;

    const templateIndex = (safeWho * 3 + safeNiyet) % dua.templates.length;
    return dua.templates[templateIndex];
  }, [dua.step1.options, dua.step2.options, dua.templates, forWho, intention]);

  const canContinue =
    (stepIndex === 0 && Boolean(forWho)) ||
    (stepIndex === 1 && Boolean(intention)) ||
    (stepIndex === 2 && Boolean(generatedLine));

  const onShare = async () => {
    if (!generatedLine) return;

    const message = `${generatedLine}\n\n${dua.finalNote}`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text: message });
        return;
      } catch {
        // User may cancel share dialog.
      }
    }

    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      alert(dua.shareError);
    }
  };

  const restart = () => {
    setForWho(null);
    setIntention(null);
    setCopied(false);
    setStepIndex(0);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pb-16 pt-10 sm:px-6">
      <header className="text-center">
        <p className="text-base font-bold uppercase tracking-[0.14em] text-gold-300/75">{dua.kicker}</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{dua.title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-xl leading-[1.8] text-gold-300/90">{dua.subtitle}</p>
      </header>

      <section className="mt-8 rounded-3xl border border-white/20 bg-night-700/65 p-6 shadow-soft sm:p-8" aria-live="polite">
        {!finalStep ? (
          <>
            <ProgressDots total={TOTAL_STEPS} current={stepIndex} />

            {stepIndex === 0 ? (
              <>
                <h2 className="mt-5 text-3xl font-bold">{dua.step1.prompt}</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {dua.step1.options.map((option) => (
                    <ChoiceCard key={option} title={option} selected={forWho === option} onSelect={() => setForWho(option)} />
                  ))}
                </div>
              </>
            ) : null}

            {stepIndex === 1 ? (
              <>
                <h2 className="mt-5 text-3xl font-bold">{dua.step2.prompt}</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {dua.step2.options.map((option) => (
                    <ChoiceCard key={option} title={option} selected={intention === option} onSelect={() => setIntention(option)} />
                  ))}
                </div>
              </>
            ) : null}

            {stepIndex === 2 ? (
              <>
                <h2 className="mt-5 text-3xl font-bold">{dua.step3.prompt}</h2>
                <div className="mt-6 rounded-2xl border border-gold-500/30 bg-night-900/60 p-5 text-center">
                  <p className="text-3xl font-bold leading-[1.8] text-gold-300 sm:text-4xl">{generatedLine}</p>
                </div>
              </>
            ) : null}

            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryButton
                onClick={() => setStepIndex((value) => value + 1)}
                disabled={!canContinue}
                className="min-w-40 rounded-3xl px-7 py-4 text-xl"
              >
                {stepIndex === 2 ? dua.finish : dua.next}
              </PrimaryButton>
              {stepIndex > 0 ? (
                <PrimaryButton
                  variant="secondary"
                  onClick={() => setStepIndex((value) => value - 1)}
                  className="min-w-32 rounded-3xl px-6 py-4 text-xl"
                >
                  {dua.back}
                </PrimaryButton>
              ) : null}
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="mx-auto max-w-2xl text-3xl font-extrabold leading-[1.8] text-gold-300 sm:text-4xl">{generatedLine}</p>
            <p className="mx-auto mt-6 max-w-2xl whitespace-pre-line text-2xl leading-[1.9] text-gold-300/90">{dua.finalNote}</p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <PrimaryButton onClick={restart} className="rounded-3xl px-7 py-4 text-xl">
                {dua.restart}
              </PrimaryButton>
              <PrimaryButton onClick={onShare} variant="secondary" className="rounded-3xl px-7 py-4 text-xl">
                {copied ? dua.copied : dua.share}
              </PrimaryButton>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

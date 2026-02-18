"use client";

import { useMemo, useState } from "react";
import ChoiceCard from "@/components/ChoiceCard";
import PrimaryButton from "@/components/PrimaryButton";
import ProgressDots from "@/components/ProgressDots";
import { copy } from "@/lib/copy";

export default function DuaPage() {
  const steps = copy.dua.steps;
  const [stepIndex, setStepIndex] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);

  const isDone = stepIndex >= steps.length;
  const currentStep = steps[stepIndex];

  const canContinue = useMemo(() => {
    if (isDone) return false;
    return Boolean(choices[stepIndex]);
  }, [choices, isDone, stepIndex]);

  const choose = (value: string) => {
    const next = [...choices];
    next[stepIndex] = value;
    setChoices(next);
  };

  const nextStep = () => {
    if (!canContinue) return;
    setStepIndex((value) => value + 1);
  };

  const restart = () => {
    setChoices([]);
    setStepIndex(0);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pb-16 pt-10 sm:px-6">
      <header className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-300/70">{copy.dua.kicker}</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{copy.dua.title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-gold-300/90">{copy.dua.subtitle}</p>
      </header>

      <section className="mt-8 rounded-3xl border border-white/15 bg-night-700/60 p-6 shadow-soft sm:p-8" aria-live="polite">
        {!isDone && currentStep ? (
          <>
            <ProgressDots total={steps.length} current={stepIndex} />
            <h2 className="mt-5 text-2xl font-bold">{currentStep.prompt}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {currentStep.options.map((option) => (
                <ChoiceCard
                  key={option}
                  title={option}
                  selected={choices[stepIndex] === option}
                  onSelect={() => choose(option)}
                />
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryButton onClick={nextStep} disabled={!canContinue}>
                {copy.dua.next}
              </PrimaryButton>
              {stepIndex > 0 ? (
                <PrimaryButton variant="secondary" onClick={() => setStepIndex((value) => value - 1)}>
                  {copy.dua.back}
                </PrimaryButton>
              ) : null}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-extrabold">{copy.dua.doneTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-gold-300/90">{copy.dua.doneText}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <PrimaryButton onClick={restart}>{copy.dua.restart}</PrimaryButton>
              <PrimaryButton href="/" variant="secondary">
                {copy.dua.home}
              </PrimaryButton>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}


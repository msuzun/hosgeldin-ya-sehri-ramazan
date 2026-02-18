"use client";

import { useMemo, useState } from "react";
import ChoiceCard from "@/components/ChoiceCard";
import PrimaryButton from "@/components/PrimaryButton";
import ProgressDots from "@/components/ProgressDots";
import { closingNotes, duaFlowCopy } from "@/lib/copy";
import { generateDua, normalizeIntention, normalizeTarget } from "@/lib/dua";

const TOTAL_STEPS = 3;

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const trial = current ? `${current} ${word}` : word;
    if (ctx.measureText(trial).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = trial;
    }
  }

  if (current) lines.push(current);
  return lines;
}

async function createSharePng(text: string, finalNote: string): Promise<Blob> {
  const width = 1200;
  const height = 1600;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable");

  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, "#173a5a");
  bg.addColorStop(0.45, "#0d243a");
  bg.addColorStop(1, "#071320");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  const moon = ctx.createRadialGradient(860, 250, 18, 860, 250, 170);
  moon.addColorStop(0, "rgba(255, 229, 171, 0.92)");
  moon.addColorStop(1, "rgba(255, 229, 171, 0)");
  ctx.fillStyle = moon;
  ctx.beginPath();
  ctx.arc(860, 250, 170, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#f6d58d";
  ctx.beginPath();
  ctx.arc(860, 250, 62, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#173a5a";
  ctx.beginPath();
  ctx.arc(888, 246, 58, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.8)";
  for (let i = 0; i < 34; i += 1) {
    const x = (i * 71 + 41) % width;
    const y = (i * 53 + 27) % 520;
    ctx.beginPath();
    ctx.arc(x, y, (i % 3) + 1.2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "#0b1f33";
  ctx.fillRect(120, 1080, 960, 280);
  ctx.fillRect(220, 1030, 760, 90);

  ctx.fillStyle = "#f8e2b0";
  ctx.font = "700 44px Nunito, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Duan hazır.", width / 2, 640);

  ctx.font = "700 58px Nunito, Arial, sans-serif";
  const duaLines = text.split("\n").flatMap((line) => wrapText(ctx, line, 900));
  let y = 760;
  for (const line of duaLines.slice(0, 4)) {
    ctx.fillText(line, width / 2, y);
    y += 84;
  }

  ctx.font = "600 36px Nunito, Arial, sans-serif";
  ctx.fillStyle = "rgba(248, 226, 176, 0.88)";
  const noteLines = finalNote.split("\n");
  let noteY = 1240;
  for (const line of noteLines) {
    ctx.fillText(line, width / 2, noteY);
    noteY += 56;
  }

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("PNG üretilemedi"));
        return;
      }
      resolve(blob);
    }, "image/png", 1);
  });
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function DuaPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [forWho, setForWho] = useState<string | null>(null);
  const [intention, setIntention] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const finalStep = stepIndex >= TOTAL_STEPS;

  const generatedDua = useMemo(() => {
    if (!forWho || !intention) return null;
    return generateDua(normalizeTarget(forWho), normalizeIntention(intention));
  }, [forWho, intention]);

  const fullDuaText = useMemo(() => {
    if (!generatedDua) return "";
    return generatedDua.line2 ? `${generatedDua.line1}\n${generatedDua.line2}` : generatedDua.line1;
  }, [generatedDua]);

  const closingNote = useMemo(() => {
    if (!fullDuaText) return "";
    return closingNotes[fullDuaText.length % closingNotes.length];
  }, [fullDuaText]);

  const canContinue =
    (stepIndex === 0 && Boolean(forWho)) ||
    (stepIndex === 1 && Boolean(intention)) ||
    (stepIndex === 2 && Boolean(generatedDua));

  const onShare = async () => {
    if (!fullDuaText) return;

    try {
      const blob = await createSharePng(fullDuaText, duaFlowCopy.finalNote);
      const file = new File([blob], "ramazan-dua.png", { type: "image/png" });

      if (
        typeof navigator !== "undefined" &&
        "share" in navigator &&
        "canShare" in navigator &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({ files: [file], title: "Dua" });
      } else {
        downloadBlob(blob, "ramazan-dua.png");
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      alert(duaFlowCopy.shareError);
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
        <p className="text-base font-bold uppercase tracking-[0.14em] text-gold-300/75">{duaFlowCopy.kicker}</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{duaFlowCopy.title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-xl leading-[1.8] text-gold-300/90">{duaFlowCopy.subtitle}</p>
      </header>

      <section className="mt-8 rounded-3xl border border-white/20 bg-night-700/65 p-6 shadow-soft sm:p-8" aria-live="polite">
        {!finalStep ? (
          <>
            <ProgressDots total={TOTAL_STEPS} current={stepIndex} />

            {stepIndex === 0 ? (
              <>
                <h2 className="mt-5 text-3xl font-bold">{duaFlowCopy.step1.title}</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {duaFlowCopy.step1.options.map((option) => (
                    <ChoiceCard key={option} title={option} selected={forWho === option} onSelect={() => setForWho(option)} />
                  ))}
                </div>
              </>
            ) : null}

            {stepIndex === 1 ? (
              <>
                <h2 className="mt-5 text-3xl font-bold">{duaFlowCopy.step2.title}</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {duaFlowCopy.step2.options.map((option) => (
                    <ChoiceCard key={option} title={option} selected={intention === option} onSelect={() => setIntention(option)} />
                  ))}
                </div>
              </>
            ) : null}

            {stepIndex === 2 ? (
              <>
                <h2 className="mt-5 text-3xl font-bold">{duaFlowCopy.step3.title}</h2>
                <div className="mt-6 rounded-2xl border border-gold-500/30 bg-night-900/60 p-5 text-center">
                  <p className="whitespace-pre-line text-3xl font-bold leading-[1.8] text-gold-300 sm:text-4xl">{fullDuaText}</p>
                </div>
              </>
            ) : null}

            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryButton
                onClick={() => setStepIndex((value) => value + 1)}
                disabled={!canContinue}
                className="min-w-40 rounded-3xl px-7 py-4 text-xl"
              >
                {stepIndex === 2 ? duaFlowCopy.finish : duaFlowCopy.next}
              </PrimaryButton>
              {stepIndex > 0 ? (
                <PrimaryButton variant="secondary" onClick={restart} className="min-w-32 rounded-3xl px-6 py-4 text-xl">
                  {duaFlowCopy.reset}
                </PrimaryButton>
              ) : null}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">{duaFlowCopy.resultTitle}</h2>
            <p className="mx-auto mt-2 text-base leading-[1.8] text-gold-300/75">{duaFlowCopy.resultCaption}</p>
            <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-3xl font-extrabold leading-[1.8] text-gold-300 sm:text-4xl">{fullDuaText}</p>
            <p className="mx-auto mt-3 text-base leading-[1.8] text-gold-300/70">{closingNote}</p>
            <p className="mx-auto mt-6 max-w-2xl whitespace-pre-line text-2xl leading-[1.9] text-gold-300/90">{duaFlowCopy.finalNote}</p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <PrimaryButton onClick={restart} className="rounded-3xl px-7 py-4 text-xl">
                {duaFlowCopy.restart}
              </PrimaryButton>
              <PrimaryButton onClick={onShare} variant="secondary" className="rounded-3xl px-7 py-4 text-xl">
                {copied ? duaFlowCopy.copied : duaFlowCopy.share}
              </PrimaryButton>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

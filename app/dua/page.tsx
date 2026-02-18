"use client";

import { useMemo, useRef, useState } from "react";
import ChoiceCard from "@/components/ChoiceCard";
import PrimaryButton from "@/components/PrimaryButton";
import ProgressDots from "@/components/ProgressDots";
import { closingNotes, duaFlowCopy } from "@/lib/copy";
import { generateDua, normalizeIntention, normalizeTarget } from "@/lib/dua";

const TOTAL_STEPS = 3;

function inlineStyles(source: Element, target: Element) {
  const sourceStyle = window.getComputedStyle(source);
  const styleText = Array.from(sourceStyle).map((prop) => `${prop}:${sourceStyle.getPropertyValue(prop)};`).join("");
  target.setAttribute("style", styleText);

  const sourceChildren = Array.from(source.children);
  const targetChildren = Array.from(target.children);

  for (let i = 0; i < sourceChildren.length; i += 1) {
    const sourceChild = sourceChildren[i];
    const targetChild = targetChildren[i];
    if (sourceChild && targetChild) {
      inlineStyles(sourceChild, targetChild);
    }
  }
}

async function elementToPngBlob(element: HTMLElement): Promise<Blob> {
  const rect = element.getBoundingClientRect();
  const width = Math.max(1, Math.ceil(rect.width));
  const height = Math.max(1, Math.ceil(rect.height));

  const clone = element.cloneNode(true) as HTMLElement;
  clone.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
  inlineStyles(element, clone);

  const serialized = new XMLSerializer().serializeToString(clone);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <foreignObject width="100%" height="100%">${serialized}</foreignObject>
    </svg>
  `;

  const encoded = encodeURIComponent(svg);
  const dataUrl = `data:image/svg+xml;charset=utf-8,${encoded}`;

  const image = new Image();
  image.decoding = "async";
  image.src = dataUrl;
  await image.decode();

  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(width * dpr);
  canvas.height = Math.ceil(height * dpr);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context is not available.");
  }

  ctx.scale(dpr, dpr);
  ctx.drawImage(image, 0, 0, width, height);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("PNG blob üretilemedi."));
        return;
      }
      resolve(blob);
    }, "image/png");
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
  const pageRef = useRef<HTMLElement | null>(null);

  const finalStep = stepIndex >= TOTAL_STEPS;

  const generatedDua = useMemo(() => {
    if (!forWho || !intention) return null;

    const targetKey = normalizeTarget(forWho);
    const intentionKey = normalizeIntention(intention);
    return generateDua(targetKey, intentionKey);
  }, [forWho, intention]);

  const fullDuaText = useMemo(() => {
    if (!generatedDua) return "";
    return generatedDua.line2 ? `${generatedDua.line1}\n${generatedDua.line2}` : generatedDua.line1;
  }, [generatedDua]);

  const closingNote = useMemo(() => {
    if (!fullDuaText) return "";
    const index = fullDuaText.length % closingNotes.length;
    return closingNotes[index];
  }, [fullDuaText]);

  const canContinue =
    (stepIndex === 0 && Boolean(forWho)) ||
    (stepIndex === 1 && Boolean(intention)) ||
    (stepIndex === 2 && Boolean(generatedDua));

  const onShare = async () => {
    if (!pageRef.current) return;

    try {
      const blob = await elementToPngBlob(pageRef.current);
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
    <main ref={pageRef} className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pb-16 pt-10 sm:px-6">
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


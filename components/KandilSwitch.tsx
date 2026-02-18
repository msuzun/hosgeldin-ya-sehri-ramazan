"use client";

import { useEffect, useState } from "react";

export default function KandilSwitch() {
  const [isOn, setIsOn] = useState(false);
  const [pulling, setPulling] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("kandil-on", isOn);
    return () => {
      document.body.classList.remove("kandil-on");
    };
  }, [isOn]);

  const toggle = () => {
    setPulling(true);
    setIsOn((v) => !v);
    window.setTimeout(() => setPulling(false), 440);
  };

  return (
    <div className="kandil-widget" aria-hidden="false">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={isOn}
        aria-label={isOn ? "Kandil ışığını kıs" : "Kandil ışığını aç"}
        className="kandil-button focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-500/45"
      >
        <span className={`kandil-cord ${pulling ? "is-pulling" : ""}`} />
        <svg viewBox="0 0 64 98" className="kandil-svg" fill="none">
          <rect x="14" y="18" width="36" height="56" rx="10" fill="rgba(20,50,77,0.85)" stroke="rgba(249,212,141,0.72)" strokeWidth="2" />
          <rect x="23" y="28" width="18" height="34" rx="7" fill={isOn ? "#ffd08a" : "#9f7c45"} />
          <path d="M24 74H40L36 86H28L24 74Z" fill="rgba(249,228,179,0.75)" />
        </svg>
      </button>
    </div>
  );
}

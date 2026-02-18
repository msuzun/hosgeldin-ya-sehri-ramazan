const lanterns = [
  { left: "14%", top: "18%", delay: "0s", duration: "4.2s" },
  { left: "78%", top: "20%", delay: "0.6s", duration: "4.8s" },
];

export default function Lanterns() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {lanterns.map((lantern, index) => (
        <div
          key={index}
          className="lantern-sway absolute"
          style={{ left: lantern.left, top: lantern.top, animationDelay: lantern.delay, animationDuration: lantern.duration }}
        >
          <svg width="64" height="96" viewBox="0 0 64 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 0V16" stroke="rgba(255,231,178,0.55)" strokeWidth="2" />
            <rect x="14" y="16" width="36" height="58" rx="10" fill="rgba(10,33,54,0.7)" stroke="rgba(255,231,178,0.75)" strokeWidth="2" />
            <rect x="22" y="27" width="20" height="36" rx="8" fill="rgba(255,184,96,0.86)" />
            <path d="M24 74H40L36 86H28L24 74Z" fill="rgba(255,231,178,0.8)" />
          </svg>
        </div>
      ))}
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { announcement } from "../data/content";

export function AnnouncementBanner() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: -48, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  if (dismissed) return null;

  return (
    <a
      ref={ref}
      href={announcement.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative z-[60] flex items-center justify-center gap-2 overflow-hidden bg-gradient-to-r from-teal-600 via-teal-500 to-aqua-500 px-4 py-2.5 text-center text-[13px] font-medium text-ink-950 sm:text-sm"
    >
      <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">
        {announcement.text}{" "}
        <span className="font-bold underline decoration-2 underline-offset-2">
          Apply now →
        </span>
      </span>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDismissed(true);
        }}
        className="relative ml-3 hidden shrink-0 rounded-full p-1 text-ink-950/60 hover:bg-black/10 hover:text-ink-950 sm:block"
      >
        ✕
      </button>
    </a>
  );
}

import { useMemo, type CSSProperties } from "react";

interface Star {
  left: number;
  top: number;
  size: number;
  minOpacity: number;
  maxOpacity: number;
  teal: boolean;
  twinkleDuration: number;
  twinkleDelay: number;
  driftDuration: number;
  driftDelay: number;
  driftX: number;
  driftY: number;
}

// Deterministic pseudo-random generator so the scatter is stable across
// re-renders of the same mount, instead of reshuffling every time.
function makeStars(count: number, seed: number): Star[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, () => ({
    left: rand() * 100,
    top: rand() * 100,
    size: rand() * 1.8 + 0.8,
    minOpacity: rand() * 0.15 + 0.2,
    maxOpacity: rand() * 0.3 + 0.6,
    teal: rand() > 0.85,
    // Slow and narrow-banded on purpose: every star should read as a
    // gentle, unhurried breathe rather than a quick blink, and none should
    // cycle fast enough to look like it's popping in/out.
    twinkleDuration: rand() * 3 + 6,
    twinkleDelay: rand() * 6,
    driftDuration: rand() * 5 + 8,
    driftDelay: rand() * 6,
    driftX: (rand() - 0.5) * 26,
    driftY: (rand() - 0.5) * 26,
  }));
}

/**
 * A slowly living scatter of stars for section backgrounds — the same
 * night-sky texture Be A PROgrammer uses behind its page headers. Every
 * star gently drifts and breathes between dim and bright rather than
 * sitting static or hard-blinking. Pure CSS, cheap enough to mount on
 * every non-homepage header.
 */
export function Starfield({ count = 90 }: { count?: number }) {
  const stars = useMemo(() => makeStars(count, 42), [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {stars.map((star, i) => {
        const driftStyle: CSSProperties = {
          left: `${star.left}%`,
          top: `${star.top}%`,
          ["--drift-duration" as string]: `${star.driftDuration}s`,
          ["--drift-x" as string]: `${star.driftX}px`,
          ["--drift-y" as string]: `${star.driftY}px`,
          animationDelay: `${star.driftDelay}s`,
        };
        const twinkleStyle: CSSProperties = {
          width: `${star.size}px`,
          height: `${star.size}px`,
          backgroundColor: star.teal ? "#7fe9db" : "#f5faf9",
          // Matches the animation's 0% keyframe so there's no flash of full
          // opacity before the (fill-mode: both) animation takes over.
          opacity: star.minOpacity,
          ["--twinkle-duration" as string]: `${star.twinkleDuration}s`,
          ["--star-min" as string]: star.minOpacity,
          ["--star-max" as string]: star.maxOpacity,
          animationDelay: `${star.twinkleDelay}s`,
        };
        return (
          <span key={i} className="absolute animate-drift" style={driftStyle}>
            <span className="block animate-twinkle rounded-full" style={twinkleStyle} />
          </span>
        );
      })}
    </div>
  );
}

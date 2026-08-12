import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  kicker?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  body,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll("[data-reveal]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={`${align === "center" ? "text-center items-center" : "text-left items-start"} flex flex-col gap-5 ${className}`}
    >
      {kicker && (
        <span
          data-reveal
          className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-teal-300"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 shadow-glow-sm" />
          {kicker}
        </span>
      )}
      <h2
        data-reveal
        className="max-w-3xl text-4xl font-bold leading-[1.1] text-mist-50 sm:text-5xl md:text-6xl"
      >
        {title}
      </h2>
      {body && (
        <p data-reveal className="max-w-2xl text-balance text-lg leading-relaxed text-mist-300">
          {body}
        </p>
      )}
    </div>
  );
}

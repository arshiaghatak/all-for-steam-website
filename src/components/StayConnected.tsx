import { useEffect, useRef, type MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stayConnected } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

function MagneticSocialCard({ label, handle, href }: { label: string; handle: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, { x: x * 0.15, y: y * 0.25, duration: 0.4, ease: "power3.out" });
    gsap.to(el.querySelector("[data-glow]"), {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    gsap.to(el.querySelector("[data-glow]"), { x: 0, y: 0, duration: 0.6 });
  };

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative flex w-full max-w-md items-center justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-8 transition-colors duration-300 hover:border-teal-400/40 sm:px-10 sm:py-10"
    >
      <div
        data-glow
        className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-teal-400/25 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-300">{label}</p>
        <p className="mt-2 font-display text-2xl font-bold text-mist-50 sm:text-3xl">{handle}</p>
      </div>
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-mist-50 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-teal-400/50 group-hover:text-teal-300">
        ↗
      </span>
    </a>
  );
}

export function StayConnected() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />
      <div ref={rootRef} className="mx-auto max-w-4xl px-6 text-center sm:px-8">
        <h2 data-reveal className="font-display text-4xl font-bold text-mist-50 sm:text-5xl">
          {stayConnected.heading}
        </h2>
        <p data-reveal className="mx-auto mt-4 max-w-lg text-balance text-base leading-relaxed text-mist-300">
          {stayConnected.body}
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:flex-wrap">
          {stayConnected.socials.map((s) => (
            <div data-reveal key={s.href}>
              <MagneticSocialCard {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

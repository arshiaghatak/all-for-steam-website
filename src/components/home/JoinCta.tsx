import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { joinCta } from "../../data/content";
import { MagneticButton } from "../MagneticButton";
import { AuroraBackground } from "../AuroraBackground";

gsap.registerPlugin(ScrollTrigger);

export function JoinCta() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <div
          ref={rootRef}
          className="relative overflow-hidden rounded-[2.5rem] border border-teal-400/20 bg-gradient-to-b from-ink-800 to-ink-900"
        >
          <AuroraBackground variant="subtle" />
          <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-0 lg:p-0">
            <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:h-full lg:rounded-l-[2.5rem]">
              <img
                src={joinCta.image}
                alt="A student excited about learning with All For STEAM"
                className="h-full w-full rounded-3xl object-cover lg:rounded-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent lg:bg-gradient-to-r" />
            </div>

            <div className="relative px-0 py-4 text-center lg:px-14 lg:py-20 lg:text-left">
              <h2 className="font-display text-4xl font-semibold text-mist-50 sm:text-5xl">
                {joinCta.heading}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-mist-300 lg:mx-0">
                {joinCta.body}
              </p>
              <div className="mt-9 flex justify-center lg:justify-start">
                <MagneticButton href={joinCta.cta.href} variant="solid">
                  {joinCta.cta.label} <span aria-hidden="true">→</span>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

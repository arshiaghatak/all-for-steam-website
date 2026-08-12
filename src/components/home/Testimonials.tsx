import { testimonials, testimonialsSection, type Testimonial } from "../../data/content";
import { SectionHeading } from "../SectionHeading";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative flex w-[19rem] shrink-0 flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:w-[24rem]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-3 font-display text-6xl leading-none text-teal-400/30"
      >
        &ldquo;
      </span>
      <div className="flex flex-1 items-center pt-8">
        <p className="text-balance text-sm leading-relaxed text-mist-200">
          {testimonial.quote}
        </p>
      </div>
      <div className="mt-6 border-t border-white/10 pt-4 text-right">
        <p className="font-display text-base font-semibold text-mist-50">
          — {testimonial.name}
        </p>
      </div>
    </div>
  );
}

export function Testimonials() {
  // Duplicated so the CSS marquee can translate exactly one copy's width
  // and loop back to 0 with no visible seam — a genuinely endless carousel.
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          kicker={testimonialsSection.kicker}
          title={testimonialsSection.title}
          body={testimonialsSection.body}
        />
      </div>

      <div className="relative mt-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink-900 to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink-900 to-transparent sm:w-40" />
        <div className="flex w-max gap-6 animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
          {loop.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

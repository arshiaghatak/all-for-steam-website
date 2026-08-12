import type { CSSProperties } from "react";
import type { TeamMember } from "../data/content";

export function TeamCard({ member }: { member: TeamMember }) {
  const grayscaleStyle = {
    ["--photo-grayscale" as string]: `${member.photoGrayscale ?? 35}%`,
  } as CSSProperties;

  return (
    <div
      data-card
      className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-800"
    >
      <img
        src={member.photo}
        alt={member.name}
        loading="lazy"
        style={grayscaleStyle}
        className="absolute inset-0 h-full w-full object-cover grayscale-[var(--photo-grayscale)] transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent transition-opacity duration-500 group-hover:from-ink-950/95" />
      <div className="pointer-events-none absolute inset-0 border border-teal-400/0 transition-colors duration-500 group-hover:border-teal-400/40" />

      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 transition-transform duration-500 ease-out group-hover:translate-y-0">
        <p className="font-display text-lg font-bold leading-tight text-mist-50">
          {member.name}
        </p>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-teal-300 opacity-0 transition-opacity delay-75 duration-500 group-hover:opacity-100">
          {member.role}
        </p>
        <p className="text-[11px] text-mist-400 opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100">
          {member.location}
        </p>
      </div>
    </div>
  );
}

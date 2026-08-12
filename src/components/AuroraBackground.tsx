interface AuroraBackgroundProps {
  className?: string;
  variant?: "default" | "subtle";
}

/**
 * Layered, softly animated gradient glow used behind sections to give the
 * dark UI depth without resorting to photography. Pure CSS — cheap enough
 * to use liberally, including on mobile.
 */
export function AuroraBackground({ className = "", variant = "default" }: AuroraBackgroundProps) {
  const opacity = variant === "subtle" ? "opacity-40" : "opacity-80";
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className={`absolute -left-1/4 top-[-10%] h-[60vw] w-[60vw] max-w-[720px] rounded-full bg-teal-500/20 blur-[120px] animate-float ${opacity}`}
      />
      <div
        className={`absolute right-[-15%] top-[10%] h-[50vw] w-[50vw] max-w-[600px] rounded-full bg-azure-500/15 blur-[130px] animate-float ${opacity}`}
        style={{ animationDelay: "-3s" }}
      />
      <div
        className={`absolute bottom-[-15%] left-[20%] h-[45vw] w-[45vw] max-w-[560px] rounded-full bg-aqua-500/15 blur-[130px] animate-float ${opacity}`}
        style={{ animationDelay: "-1.5s" }}
      />
    </div>
  );
}

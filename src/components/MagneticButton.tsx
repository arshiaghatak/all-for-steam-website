import { useRef, type ReactNode, type MouseEvent } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  strength?: number;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
}

/**
 * A button/link that gently pulls toward the cursor on hover (desktop only —
 * touch devices get the plain, still-fully-functional element).
 */
export function MagneticButton({
  href,
  onClick,
  children,
  variant = "solid",
  className = "",
  strength = 0.35,
  target,
  rel,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 will-change-transform";

  const variants: Record<string, string> = {
    solid:
      "bg-gradient-to-r from-teal-400 to-aqua-500 text-ink-950 shadow-glow hover:shadow-[0_0_55px_rgba(45,212,191,0.5)]",
    outline:
      "border border-teal-400/40 text-mist-50 hover:border-teal-300 hover:bg-teal-400/10",
    ghost: "text-mist-50 hover:text-teal-300",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  const props = {
    ref: ref as never,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: classes,
  };

  if (href) {
    const isExternal = /^https?:\/\//.test(href) || href.startsWith("mailto:");
    return (
      <a
        href={href}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

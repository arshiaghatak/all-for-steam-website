import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { nav, links, site } from "../data/content";
import { MagneticButton } from "./MagneticButton";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(el, { display: "flex" });
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(
        el.querySelectorAll("[data-menu-item]"),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, delay: 0.1, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(el, {
        opacity: 0,
        duration: 0.25,
        onComplete: () => gsap.set(el, { display: "none" }),
      });
    }
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href.startsWith("/#")) return false;
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/[0.06] bg-ink-900/80 py-3 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="group flex items-center gap-2.5">
            <img
              src="/brand/logo.png"
              alt={site.name}
              className="h-9 w-auto drop-shadow-[0_0_14px_rgba(45,212,191,0.35)] transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive(item.href)
                      ? "text-teal-300"
                      : "text-mist-300 hover:text-mist-50"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <MagneticButton href={links.joinForm} className="!px-5 !py-2.5 !text-xs">
              Join Us
              <span aria-hidden="true">→</span>
            </MagneticButton>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 lg:hidden"
          >
            <span
              className={`h-px w-4 bg-mist-50 transition-transform duration-300 ${
                menuOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-4 bg-mist-50 transition-transform duration-300 ${
                menuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      <div
        ref={menuRef}
        className="fixed inset-0 z-[60] hidden flex-col justify-center gap-2 bg-ink-950/98 px-8 backdrop-blur-2xl lg:hidden"
      >
        {nav.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            data-menu-item
            className={`border-b border-white/5 py-4 text-3xl font-display font-semibold ${
              isActive(item.href) ? "text-teal-300" : "text-mist-50"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <div data-menu-item className="pt-8">
          <MagneticButton href={links.joinForm} className="w-full">
            Join Us →
          </MagneticButton>
        </div>
      </div>
    </>
  );
}

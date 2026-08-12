import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "../hooks/useLenis";

/**
 * On every route change: jump to top for a plain navigation, or smoothly
 * scroll to the target section when the URL carries a hash (e.g. the nav's
 * "What We Do" link, which points at /#what-we-do).
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Give the target page a tick to render before measuring its position.
      const id = hash.replace("#", "");
      const timeout = setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return () => clearTimeout(timeout);
    }
    // Lenis tracks its own scroll target independently of the native
    // scrollTop, so resetting only window.scrollTo gets overridden on the
    // next raf tick — it snaps right back down. Reset Lenis itself first.
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [pathname, hash]);

  return null;
}

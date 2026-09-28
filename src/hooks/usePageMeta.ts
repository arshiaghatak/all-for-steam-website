import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://allforsteam.org";

/**
 * The SPA ships one static <title>/description in index.html, so every
 * route shared the same search-result snippet. This sets a page-specific
 * title, meta description, and canonical URL on each navigation instead.
 */
export function usePageMeta(title: string, description: string) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;

    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute("content", description);

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", `${SITE_URL}${pathname === "/" ? "" : pathname}`);
  }, [title, description, pathname]);
}

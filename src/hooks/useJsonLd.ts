import { useEffect } from "react";

/**
 * Injects a schema.org JSON-LD <script> tag into <head> so Google can parse
 * the page's content as structured data (organization identity, team
 * members, named offerings) instead of just plain text. Invisible to
 * visitors — this never touches rendered UI.
 */
export function useJsonLd(id: string, data: object) {
  const json = JSON.stringify(data);

  useEffect(() => {
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = json;
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [id, json]);
}

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { DEFAULT_CONTENT, SiteContent, Card } from "./defaults";
import { useLang } from "./LanguageContext";

export const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

/** Resolve an image path (/uploads/…) to an absolute URL on the API origin. */
export function imageUrl(path?: string): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//.test(path)) return path;
  return `${API}${path.startsWith("/") ? "" : "/"}${path}`;
}

const ContentContext = createContext<SiteContent>(DEFAULT_CONTENT);

export function ContentProvider({ children }: { children: ReactNode }) {
  const { lang } = useLang();
  // Start from defaults (instant first paint), then hydrate from the API.
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);

  useEffect(() => {
    let alive = true;
    // lang is passed through so PT content flows automatically once it exists;
    // the API returns EN today, so switching is wired but content stays EN.
    fetch(`${API}/content?lang=${lang}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: Partial<SiteContent>) => {
        if (!alive) return;
        // Merge over defaults so a partial/empty API response never blanks the site.
        setContent({
          cards: {
            work: data.cards?.work?.length ? data.cards.work : DEFAULT_CONTENT.cards.work,
            services: data.cards?.services?.length ? data.cards.services : DEFAULT_CONTENT.cards.services,
          },
          text: { ...DEFAULT_CONTENT.text, ...(data.text ?? {}) },
        });
      })
      .catch(() => { /* keep defaults on any failure */ });
    return () => { alive = false; };
  }, [lang]);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent(): SiteContent {
  return useContext(ContentContext);
}

/** Convenience: a single text value, falling back to the baked default. */
export function useText(key: string): string {
  const { text } = useContent();
  return text[key] ?? DEFAULT_CONTENT.text[key] ?? "";
}

export type { Card };

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "pt";
const KEY = "vertice-lang";

type LangCtx = { lang: Lang; setLang: (l: Lang) => void };
const LanguageContext = createContext<LangCtx>({ lang: "en", setLang: () => {} });

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "en" || saved === "pt") return saved;
  } catch { /* ignore */ }
  // Default: Portuguese browsers get PT, everyone else EN.
  return typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch { /* ignore */ }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLang(): LangCtx {
  return useContext(LanguageContext);
}

import { useLang, Lang } from "../content/LanguageContext";

/** Discreet PT / EN switch — two small labels with a hairline divider. */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  const item = (l: Lang, label: string) => (
    <button
      onClick={() => setLang(l)}
      aria-pressed={lang === l}
      className={`transition-colors duration-200 ${
        lang === l ? "text-brassLight" : "text-slate/60 hover:text-paper"
      }`}
    >
      {label}
    </button>
  );
  return (
    <div className={`flex items-center gap-1.5 font-mono text-[11px] tracking-wide ${className}`}>
      {item("pt", "PT")}
      <span className="text-slate/30">/</span>
      {item("en", "EN")}
    </div>
  );
}

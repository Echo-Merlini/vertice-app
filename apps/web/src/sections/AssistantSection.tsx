import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { VerticeMark } from "../components/VerticeMark";
import { BrassButton } from "../components/BrassButton";
import { API, useText } from "../content/ContentContext";
import { useLang } from "../content/LanguageContext";

type Msg = { role: "user" | "assistant"; content: string };

function ChatBox() {
  const { lang } = useLang();
  const intro = useText("assistant.intro");
  const placeholder = useText("assistant.placeholder");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages((m) => (m.length === 0 && intro ? [{ role: "assistant", content: intro }] : m));
  }, [intro]);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const send = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;
    const history = messages.slice(-10);
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setSending(true);
    try {
      const r = await fetch(`${API}/assistant/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history, lang }),
      });
      const d = await r.json();
      setMessages((m) => [...m, { role: "assistant", content: d.reply || "…" }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "I couldn't reach the assistant just now — please try the contact form below." }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 overflow-hidden" style={{ background: "#111319" }}>
      <div ref={scrollRef} className="h-[300px] md:h-[360px] overflow-y-auto p-5 md:p-6 flex flex-col gap-4">
        {messages.map((m, i) =>
          m.role === "assistant" ? (
            <div key={i} className="flex items-start gap-3 max-w-[85%]">
              <span className="mt-0.5 shrink-0"><VerticeMark size={26} /></span>
              <div className="rounded-2xl rounded-tl-sm border border-white/8 px-4 py-2.5 text-slate leading-relaxed" style={{ background: "#191B21" }}>
                {m.content}
              </div>
            </div>
          ) : (
            <div key={i} className="self-end max-w-[85%]">
              <div className="rounded-2xl rounded-tr-sm px-4 py-2.5 text-ink font-medium" style={{ background: "#E0A24C" }}>
                {m.content}
              </div>
            </div>
          )
        )}
        {sending && (
          <div className="flex items-center gap-3">
            <span className="shrink-0"><VerticeMark size={26} className="vertice-spin" /></span>
            <div className="rounded-2xl rounded-tl-sm border border-white/8 px-4 py-3" style={{ background: "#191B21" }}>
              <span className="inline-flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-slate/60 animate-pulse" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate/60 animate-pulse [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate/60 animate-pulse [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={send} className="flex items-center gap-2 border-t border-white/8 p-3" style={{ background: "#0C0D11" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent px-3 py-2.5 text-paper placeholder:text-slate/50 outline-none"
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          aria-label="Send"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brass text-ink transition-opacity disabled:opacity-40 hover:bg-brassLight"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}

export function AssistantSection() {
  const heading = useText("assistant.heading");
  const sub = useText("assistant.sub");
  const description = useText("assistant.description");
  const linkLabel = useText("assistant.linkLabel");
  const linkUrl = useText("assistant.linkUrl");
  const paragraphs = description.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const external = /^https?:\/\//.test(linkUrl);

  return (
    <section id="assistant" className="px-6 md:px-10 pt-24 md:pt-32 pb-4 max-w-6xl mx-auto scroll-mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
        {/* Left — chat box */}
        <FadeIn x={-24} y={0}>
          <ChatBox />
        </FadeIn>

        {/* Right — written AI-services description */}
        <FadeIn x={24} y={0} delay={0.1}>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brassLight/80">AI Services</p>
          <h2 className="mt-3 font-display font-medium tracking-tighter2 text-3xl sm:text-4xl md:text-5xl text-paper">
            {heading}
          </h2>
          {sub && <p className="mt-4 font-serif italic text-slate text-lg md:text-xl">{sub}</p>}
          {paragraphs.map((p, i) => (
            <p key={i} className="mt-4 text-slate leading-relaxed">{p}</p>
          ))}
          {linkLabel && linkUrl && (
            <div className="mt-8">
              <BrassButton href={linkUrl} variant="ghost" external={external}>{linkLabel}</BrassButton>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

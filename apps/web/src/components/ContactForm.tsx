import { FormEvent, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const r = await fetch(`${API}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, source: "website" }),
      });
      if (!r.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-brassLight/30 bg-emerald-400/5 p-8 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
          <Check className="h-5 w-5" />
        </div>
        <p className="font-display font-medium text-paper">Thanks, {name.split(" ")[0] || "there"}.</p>
        <p className="mt-1 text-sm text-slate">We&apos;ll be in touch shortly.</p>
      </div>
    );
  }

  const input =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-paper placeholder-slate/50 outline-none transition-colors focus:border-brassLight/50";

  return (
    <form onSubmit={submit} className="mx-auto max-w-md space-y-3 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          required value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Your name" className={input}
        />
        <input
          required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Email" className={input}
        />
      </div>
      <textarea
        value={message} onChange={(e) => setMessage(e.target.value)}
        placeholder="What are you building?" rows={4} className={`${input} resize-none`}
      />
      {status === "error" && (
        <p className="text-sm text-red-400">Couldn&apos;t send — try again, or email us directly below.</p>
      )}
      <button
        type="submit" disabled={status === "sending"}
        className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-brass py-3 text-sm font-medium tracking-tight text-paper transition-colors duration-200 hover:bg-brassLight hover:text-deepink disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Start a project"}
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-paper/15 transition-transform duration-200 group-hover:rotate-45">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </button>
    </form>
  );
}

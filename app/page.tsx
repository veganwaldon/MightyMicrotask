"use client";

import { useMemo, useState } from "react";
import { MessageInput } from "@/components/MessageInput";
import { OutputBox } from "@/components/OutputBox";
import { ToneSelector, type Tone } from "@/components/ToneSelector";

const MAX_CHARS = 500;

const exampleMessages = [
  "Can you send me the document by tonight?",
  "I need an update on the project timeline.",
  "Sorry I missed your call, what did I miss?",
  "Let us schedule a quick meeting to align."
];

function rewriteMessage(input: string, tone: Tone): string {
  const cleaned = input.trim();

  switch (tone) {
    case "friendly":
      return `Hey! ${cleaned} Thanks so much! 😊`;
    case "professional":
      return `Hello,\n\n${cleaned}\n\nPlease let me know if you need any additional information.\n\nBest regards,`;
    case "polite":
      return `Hi, if possible, could you please review this?\n\n${cleaned}\n\nThank you for your time.`;
    case "confident":
      return `${cleaned}\n\nLet us move forward with this today.`;
    case "flirty":
      return `Hey you 😌 ${cleaned} ...just saying, you always make this more fun.`;
    default:
      return cleaned;
  }
}

export default function HomePage() {
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<Tone>("friendly");
  const [rewritten, setRewritten] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const canRewrite = useMemo(() => !isLoading, [isLoading]);

  const onRewrite = async () => {
    const trimmed = message.trim();
    setHasCopied(false);

    if (!trimmed) {
      setError("Please enter a message first.");
      setRewritten("");
      return;
    }

    setError("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setRewritten(rewriteMessage(trimmed, tone));
    setIsLoading(false);
  };

  const onCopy = async () => {
    if (!rewritten) {
      return;
    }
    await navigator.clipboard.writeText(rewritten);
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 1000);
  };

  const onUseExample = () => {
    const random = exampleMessages[Math.floor(Math.random() * exampleMessages.length)];
    setMessage(random);
    setError("");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_50%_32%,_rgba(99,102,241,0.28)_0%,_rgba(99,102,241,0)_40%),radial-gradient(circle_at_80%_16%,_rgba(168,85,247,0.22)_0%,_rgba(168,85,247,0)_36%),linear-gradient(145deg,_#0a0e18_0%,_#0f172a_44%,_#09090b_100%)] p-4 sm:p-6">
      <section className="relative isolate w-full max-w-[600px] space-y-7 rounded-2xl border border-white/15 bg-black/45 p-7 shadow-2xl shadow-indigo-950/40 backdrop-blur-xl before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.14),_transparent_52%)] sm:p-9">
        <header className="space-y-2.5 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Rewrite My Message ✨</h1>
          <p className="text-sm text-slate-200">Make your message sound better instantly</p>
          <p className="text-xs text-slate-400/90">Polished tone in one click, with clarity and confidence.</p>
        </header>

        <MessageInput value={message} onChange={setMessage} maxLength={MAX_CHARS} />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <ToneSelector selectedTone={tone} onSelectTone={setTone} />
          <button
            type="button"
            onClick={onUseExample}
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-100 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:border-indigo-300/40 hover:bg-white/10 hover:shadow-md hover:shadow-indigo-500/25 active:translate-y-0"
          >
            Random example 💡
          </button>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            disabled={!canRewrite}
            onClick={onRewrite}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/60 ring-1 ring-white/10 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/40 active:scale-[0.99] active:translate-y-0 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 disabled:hover:shadow-lg disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Rewriting your message...
              </>
            ) : (
              "Rewrite"
            )}
          </button>
          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
        </div>

        <OutputBox input={message.trim()} output={rewritten} hasCopied={hasCopied} onCopy={onCopy} />
      </section>
    </main>
  );
}

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

export function rewriteMessage(input: string, tone: Tone): string {
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
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#ede9fe_0%,_#eef2ff_35%,_#f8fafc_65%,_#ffffff_100%)] p-4 sm:p-6">
      <section className="w-full max-w-[600px] space-y-6 rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-lg shadow-indigo-100/60 backdrop-blur-sm sm:p-8">
        <header className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Rewrite My Message ✨</h1>
          <p className="text-sm text-slate-500">Make your message sound better instantly</p>
          <p className="text-xs text-slate-400">Polished tone in one click, with clarity and confidence.</p>
        </header>

        <MessageInput value={message} onChange={setMessage} maxLength={MAX_CHARS} />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <ToneSelector selectedTone={tone} onSelectTone={setTone} />
          <button
            type="button"
            onClick={onUseExample}
            className="rounded-lg border border-dashed border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 transition duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-100 active:translate-y-0"
          >
            Random example 💡
          </button>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            disabled={!canRewrite}
            onClick={onRewrite}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-300/50 active:translate-y-0 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:opacity-70"
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
          {error ? <p className="text-sm text-rose-500">{error}</p> : null}
        </div>

        <OutputBox input={message.trim()} output={rewritten} hasCopied={hasCopied} onCopy={onCopy} />
      </section>
    </main>
  );
}

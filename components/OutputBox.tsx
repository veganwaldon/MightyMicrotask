type OutputBoxProps = {
  input: string;
  output: string;
  hasCopied: boolean;
  onCopy: () => void;
};

export function OutputBox({ input, output, hasCopied, onCopy }: OutputBoxProps) {
  if (!output) {
    return null;
  }

  return (
    <section className="animate-fade-in-up space-y-4 rounded-2xl border border-white/15 bg-white/[0.06] p-4 shadow-lg shadow-black/35 backdrop-blur-md">
      <h2 className="text-sm font-semibold text-slate-100">Before → After</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <article className="rounded-xl border border-white/15 bg-black/30 p-3 shadow-sm">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">Your message</p>
          <p className="text-sm leading-relaxed text-slate-100">{input}</p>
        </article>
        <article className="rounded-xl border border-indigo-300/30 bg-indigo-500/12 p-3 shadow-sm shadow-indigo-500/10">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-indigo-200">Rewritten version</p>
          <p className="text-sm leading-relaxed text-slate-100">{output}</p>
        </article>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCopy}
          className="rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1.5 text-sm font-medium text-indigo-100 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:border-indigo-300/35 hover:bg-white/[0.10] hover:shadow-md hover:shadow-indigo-500/30 active:scale-[0.99] active:translate-y-0"
        >
          {hasCopied ? "Copied ✓" : "Copy"}
        </button>
      </div>
    </section>
  );
}

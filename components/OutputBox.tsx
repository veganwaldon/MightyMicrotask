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
    <section className="animate-fade-in-up space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
      <h2 className="text-sm font-semibold text-slate-800">Before → After</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">Your message</p>
          <p className="text-sm leading-relaxed text-slate-700">{input}</p>
        </article>
        <article className="rounded-xl border border-indigo-100 bg-indigo-50 p-3">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-indigo-600">Rewritten version</p>
          <p className="text-sm leading-relaxed text-slate-800">{output}</p>
        </article>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCopy}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 active:translate-y-0"
        >
          {hasCopied ? "Copied ✓" : "Copy"}
        </button>
      </div>
    </section>
  );
}

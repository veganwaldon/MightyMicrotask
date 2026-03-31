type MessageInputProps = {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
};

export function MessageInput({ value, onChange, maxLength }: MessageInputProps) {
  return (
    <div className="space-y-2.5">
      <label htmlFor="message" className="text-sm font-medium text-slate-200">
        Your message
      </label>
      <textarea
        id="message"
        value={value}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste your message here..."
        className="h-40 w-full resize-none rounded-xl border border-white/15 bg-white/[0.06] px-5 py-4 text-sm leading-relaxed text-slate-100 shadow-sm outline-none transition-all duration-300 ease-out placeholder:text-slate-500 hover:border-white/20 hover:bg-white/[0.09] hover:shadow-md focus:border-indigo-300 focus:ring-4 focus:ring-indigo-400/35 focus:shadow-[0_0_0_6px_rgba(99,102,241,0.24)]"
      />
      <div className="text-right text-xs text-slate-400/95">
        {value.length}/{maxLength}
      </div>
    </div>
  );
}

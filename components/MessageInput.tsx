type MessageInputProps = {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
};

export function MessageInput({ value, onChange, maxLength }: MessageInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="message" className="text-sm font-medium text-slate-700">
        Your message
      </label>
      <textarea
        id="message"
        value={value}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste your message here..."
        className="h-40 w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm leading-relaxed text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 focus:shadow-[0_0_0_6px_rgba(99,102,241,0.08)]"
      />
      <div className="text-right text-xs text-slate-500">
        {value.length}/{maxLength}
      </div>
    </div>
  );
}

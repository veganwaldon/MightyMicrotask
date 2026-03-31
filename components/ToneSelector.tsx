export type Tone = "friendly" | "professional" | "polite" | "confident" | "flirty";

type ToneSelectorProps = {
  selectedTone: Tone;
  onSelectTone: (tone: Tone) => void;
};

const toneOptions: Array<{ value: Tone; label: string }> = [
  { value: "friendly", label: "Friendly" },
  { value: "professional", label: "Professional" },
  { value: "polite", label: "Polite" },
  { value: "confident", label: "Confident" },
  { value: "flirty", label: "Flirty" }
];

export function ToneSelector({ selectedTone, onSelectTone }: ToneSelectorProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-slate-200">Choose a tone</p>
      <div className="flex flex-wrap gap-2">
        {toneOptions.map((tone) => {
          const isActive = selectedTone === tone.value;
          return (
            <button
              key={tone.value}
              type="button"
              onClick={() => onSelectTone(tone.value)}
              className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:shadow-md active:scale-[0.98] ${
                isActive
                  ? "border-transparent bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-violet-500/35 ring-1 ring-white/15"
                  : "border-white/15 bg-white/[0.06] text-slate-100 hover:border-white/25 hover:bg-white/[0.10]"
              }`}
            >
              {tone.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

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
      <p className="text-sm font-medium text-slate-700">Choose a tone</p>
      <div className="flex flex-wrap gap-2">
        {toneOptions.map((tone) => {
          const isActive = selectedTone === tone.value;
          return (
            <button
              key={tone.value}
              type="button"
              onClick={() => onSelectTone(tone.value)}
              className={`rounded-full border px-3.5 py-2 text-sm font-medium transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-sm active:scale-[0.98] ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-white shadow-md shadow-slate-300/50"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
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

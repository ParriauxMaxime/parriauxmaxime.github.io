import useLocalStorage from '@ds/hooks/use-local-storage';
import { useEffect } from 'react';

const ACCENT_HUE_KEY = 'accent-hue';
const DEFAULT_HUE = 263;

const presets = [
  { hue: 263, label: 'Violet' },
  { hue: 210, label: 'Blue' },
  { hue: 160, label: 'Teal' },
  { hue: 340, label: 'Rose' },
  { hue: 25, label: 'Orange' },
  { hue: 130, label: 'Green' },
];

export default function AccentPicker() {
  const [hue, setHue] = useLocalStorage(DEFAULT_HUE, ACCENT_HUE_KEY, (v) => Number(v));

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-hue', String(hue));
  }, [hue]);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
        Accent
      </span>
      <div className="flex items-center gap-2">
        {presets.map((p) => (
          <button
            key={p.hue}
            type="button"
            onClick={() => setHue(p.hue)}
            aria-label={p.label}
            className={`h-5 w-5 rounded-full transition-all ${hue === p.hue ? 'ring-2 ring-offset-2 ring-zinc-400 dark:ring-zinc-500 dark:ring-offset-zinc-800 scale-110' : 'hover:scale-110'}`}
            style={{ backgroundColor: `hsl(${p.hue} 80% 60%)` }}
          />
        ))}
      </div>
      <input
        type="range"
        min={0}
        max={360}
        value={hue}
        onChange={(e) => setHue(Number(e.target.value))}
        aria-label="Custom hue"
        className="w-full h-2 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-zinc-300 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-zinc-300"
        style={{
          background:
            'linear-gradient(to right, hsl(0 80% 60%), hsl(60 80% 60%), hsl(120 80% 60%), hsl(180 80% 60%), hsl(240 80% 60%), hsl(300 80% 60%), hsl(360 80% 60%))',
        }}
      />
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';

import AccentPicker from './accent-picker';
import DarkMode from './dark-mode';
import Language from './language';
import MoonToggle from './moon-toggle';

export default function FloatingControls() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div ref={panelRef} className="fixed top-4 right-4 z-50">
      {/* Controls pill */}
      <div className="flex items-center rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm pl-1 pr-1.5 py-1 gap-0.5">
        <DarkMode />
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle controls"
          className="flex items-center justify-center h-7 w-7 rounded-full hover:bg-zinc-200/60 dark:hover:bg-zinc-700/60 transition-colors"
        >
          <svg
            className={`h-4 w-4 text-zinc-500 dark:text-zinc-400 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>

      {/* Dropdown panel */}
      <div
        className={`absolute top-full right-0 mt-2 w-52 rounded-xl bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg p-3 transition-all duration-200 origin-top-right ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        <div className="flex flex-col gap-4">
          {/* Language */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Language
            </span>
            <Language />
          </div>

          {/* Accent color */}
          <AccentPicker />

          {/* To the moon */}
          <MoonToggle />
        </div>
      </div>
    </div>
  );
}

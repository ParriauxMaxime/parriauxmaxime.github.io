import { useEffect, useRef, useState } from 'react';
import { useMoon } from './to-the-moon';

export default function MoonToggle() {
  const { enabled, setEnabled } = useMoon();
  const [toast, setToast] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (enabled) {
      setToast(true);
      const id = setTimeout(() => setToast(false), 2000);
      return () => clearTimeout(id);
    }
  }, [enabled]);

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
          To the moon
        </span>
        <button
          type="button"
          onClick={() => setEnabled(!enabled)}
          aria-label="Toggle to the moon"
          className={`relative w-9 h-5 rounded-full transition-colors ${enabled ? 'bg-accent-500' : 'bg-zinc-300 dark:bg-zinc-600'}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${enabled ? 'translate-x-4' : ''}`}
          />
        </button>
      </div>

      {/* Toast notification */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-lg bg-zinc-800 dark:bg-zinc-700 text-white text-sm shadow-lg transition-all duration-300 ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        🚀 To the moon!
      </div>
    </>
  );
}

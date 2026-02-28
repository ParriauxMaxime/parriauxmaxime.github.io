import GitHub from '@ds/components/github';
import LinkedIn from '@ds/components/linkedin';
import Mail from '@ds/components/mail';
import { languages } from '@modules/floating-controls/language';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const resumeRef: Record<string, string> = {
  [languages.FR]:
    'https://docs.google.com/document/d/1-mhoFO2SZhHpbDyL2gWBBRI6eKOW9rBQO5HimNdyckQ/export?format=pdf',
  [languages.EN]:
    'https://docs.google.com/document/d/1UyeXTZGugACQbgeKuTCDBKv8iPlwkhpqCN-_OixZEj8/export?format=pdf',
};

export default function Hero() {
  const { t, i18n } = useTranslation();
  const language = i18n.language.slice(0, 2);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-screen px-6 md:px-12 py-24 bg-white dark:bg-zinc-900 overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent-200/40 dark:bg-accent-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] bg-accent-100/30 dark:bg-accent-800/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-zinc-200/30 dark:bg-zinc-700/10 rounded-full blur-3xl" />
      </div>

      <div className="relative flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16 max-w-5xl w-full">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-3">
            {t('hero.name')}
          </h1>
          <p className="text-lg md:text-xl text-accent-600 dark:text-accent-400 font-medium mb-6">
            {t('hero.title', { years: new Date().getFullYear() - 2018 })}
          </p>
          <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-3 max-w-xl">
            {t('hero.positioning')}
          </p>
          <p className="text-sm text-accent-600/80 dark:text-accent-400/80 font-medium mb-8 max-w-xl">
            {t('hero.looking_for')}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
            <a
              target="_blank"
              href={resumeRef[language]}
              className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-accent-600 hover:bg-accent-700 text-white font-medium text-sm transition-colors"
              rel="noreferrer"
            >
              {t('hero.resume')}
            </a>
            <div className="flex items-center gap-1">
              <a
                href="https://github.com/ParriauxMaxime"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <GitHub className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/maxime-parriaux/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <LinkedIn className="h-5 w-5" />
              </a>
              <a
                href="mailto:maxime.parriaux.pro@gmail.com"
                aria-label="Email"
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Photo with animated border */}
        <div className="shrink-0 relative h-44 w-44 md:h-60 md:w-60">
          {/* Spinning gradient ring */}
          <div
            className={`absolute inset-0 rounded-full animate-spin-slow transition-opacity duration-1000 ${revealed ? 'opacity-100' : 'opacity-0'}`}
            style={{
              background: `conic-gradient(from 0deg, hsl(var(--accent-hue) 90% 66%), hsl(var(--accent-hue) 70% 50%), hsl(var(--accent-hue) 90% 76%), hsl(var(--accent-hue) 90% 66%))`,
            }}
          />
          {/* Photo */}
          <img
            className="absolute inset-[3px] rounded-full object-cover"
            src="/photo-italy.webp"
            alt="Maxime Parriaux"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="h-6 w-6 text-zinc-400 dark:text-zinc-500"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
}

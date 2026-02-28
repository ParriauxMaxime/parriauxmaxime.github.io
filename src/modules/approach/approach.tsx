import Section from '@ds/components/section';
import { useTranslation } from 'react-i18next';

const pillars = ['ownership', 'velocity', 'ai', 'bridge'] as const;

const icons: Record<(typeof pillars)[number], string> = {
  ownership: 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  velocity: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z',
  ai: 'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z',
  bridge: 'M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5',
};

export default function Approach() {
  const { t } = useTranslation();

  return (
    <Section id="approach" heading={t('approach.title')} tone="muted">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {pillars.map((key) => (
          <div key={key} className="flex gap-4">
            <div className="shrink-0 mt-1">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent-100 dark:bg-accent-900/30">
                <svg
                  className="h-5 w-5 text-accent-600 dark:text-accent-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={icons[key]} />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
                {t(`approach.${key}.title`)}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {t(`approach.${key}.description`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

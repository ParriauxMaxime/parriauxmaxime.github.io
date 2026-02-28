import Section from '@ds/components/section';
import { useTranslation } from 'react-i18next';

const entries = ['epitech_paris', 'roskilde', 'epitech_strasbourg', 'jules_haag'] as const;

export default function Education() {
  const { t } = useTranslation();

  return (
    <Section id="education" heading={t('education.title')}>
      <div className="max-w-3xl space-y-4">
        {entries.map((key) => {
          const highlight = t(`education.${key}.highlight`);
          return (
            <div key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
              <span className="text-sm text-zinc-400 dark:text-zinc-500 shrink-0 w-28">
                {t(`education.${key}.dates`)}
              </span>
              <div className="flex-1">
                <span className="font-semibold text-neutral-900 dark:text-neutral-50">
                  {t(`education.${key}.institution`)}
                </span>
                <span className="text-zinc-400 dark:text-zinc-500 mx-2">—</span>
                <span className="text-sm text-zinc-600 dark:text-zinc-300">
                  {t(`education.${key}.degree`)}
                </span>
                {highlight && (
                  <span className="ml-2 text-xs font-medium text-accent-600 dark:text-accent-400">
                    {highlight}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

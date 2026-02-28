import Section from '@ds/components/section';
import TechTag from '@ds/components/tech-tag';
import { useTranslation } from 'react-i18next';

const categories = ['proficient', 'worked_with', 'methods', 'tools'] as const;

export default function Stack() {
  const { t } = useTranslation();

  return (
    <Section id="stack" heading={t('stack.title')} tone="muted">
      <dl className="max-w-3xl space-y-3">
        {categories.map((key) => (
          <div key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
            <dt className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider shrink-0 sm:w-24 sm:text-right">
              {t(`stack.${key}.label`)}
            </dt>
            <dd className="flex flex-wrap gap-1.5">
              {t(`stack.${key}.items`)
                .split(', ')
                .map((item) => (
                  <TechTag key={item} label={item} />
                ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

import CategoryCard from '@ds/components/category-card';
import Section from '@ds/components/section';
import { useTranslation } from 'react-i18next';

const categories = ['security', 'ai', 'integrations', 'architecture', 'dx', 'frontend'] as const;

export default function DotfileSpotlight() {
  const { t } = useTranslation();

  return (
    <Section id="dotfile" heading={t('dotfile.company')} tone="muted">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
          {t('dotfile.subtitle')} · {t('dotfile.dates')}
        </p>
        <p className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-50 mt-4 mb-2">
          {t('dotfile.headline')}
        </p>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {categories.map((cat) => (
          <CategoryCard
            key={cat}
            title={t(`dotfile.categories.${cat}.title`)}
            items={t(`dotfile.categories.${cat}.items`)}
          />
        ))}
      </div>

      {/* Domain callout */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800">
        <span className="text-sm font-medium text-accent-700 dark:text-accent-300">
          {t('dotfile.domain')}
        </span>
      </div>
    </Section>
  );
}

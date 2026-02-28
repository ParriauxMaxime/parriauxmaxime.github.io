import Section from '@ds/components/section';
import TimelineEntry from '@ds/components/timeline-entry';
import { useTranslation } from 'react-i18next';

const employers = [
  'dotfile',
  'smartrenting_lead',
  'smartrenting',
  'carrevolutis',
  '4js',
  'whitequest',
] as const;

export default function ExperienceTimeline() {
  const { t } = useTranslation();

  const scrollToDotfile = () => {
    const el = document.getElementById('dotfile');
    if (el) {
      window.scrollBy({ top: el.getBoundingClientRect().top - 80, behavior: 'smooth' });
    }
  };

  return (
    <Section id="experience" heading={t('experience.title')}>
      <div className="max-w-3xl mt-2">
        {employers.map((key) => (
          <TimelineEntry
            key={key}
            company={t(`experience.${key}.company`)}
            role={t(`experience.${key}.role`)}
            dates={t(`experience.${key}.dates`)}
            summary={t(`experience.${key}.summary`)}
            achievements={t(`experience.${key}.achievements`)}
            tags={t(`experience.${key}.tags`)}
            highlighted={key === 'dotfile'}
            onClick={key === 'dotfile' ? scrollToDotfile : undefined}
          />
        ))}
      </div>
    </Section>
  );
}

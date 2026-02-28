import GitHub from '@ds/components/github';
import Section from '@ds/components/section';
import TechTag from '@ds/components/tech-tag';
import { useTranslation } from 'react-i18next';

const projects = [
  'dotfile',
  'open-setlist',
  'lloyd',
  'bizzeo',
  'web-ascii-art',
  'skyquest',
] as const;

type ProjectKey = (typeof projects)[number];

const hrefs: Partial<Record<ProjectKey, string>> = {
  dotfile: 'https://www.dotfile.com/',
  'open-setlist': 'https://github.com/ParriauxMaxime/open-setlist',
  bizzeo: 'https://bizzeo.co/',
  skyquest: 'https://github.com/ParriauxMaxime/skyquest',
  'web-ascii-art': 'https://web-ascii-art.netlify.app/',
};

const isGitHub: Partial<Record<ProjectKey, boolean>> = {
  'open-setlist': true,
  'web-ascii-art': true,
  skyquest: true,
};

const cardClass =
  'group block rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 p-5 transition-all hover:border-accent-300 dark:hover:border-accent-500/50 hover:-translate-y-0.5 hover:shadow-md';

export default function Projects() {
  const { t } = useTranslation();

  return (
    <Section id="projects" heading={t('projects.title')} tone="muted">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((key) => {
          const href = hrefs[key];
          const inner = (
            <>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-50">
                  {t(`projects.${key}.title`)}
                </h3>
                {isGitHub[key] && <GitHub className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-3 leading-relaxed">
                {t(`projects.${key}.description`)}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {t(`projects.${key}.stack`)
                  .split(', ')
                  .map((tag) => (
                    <TechTag key={tag} label={tag} />
                  ))}
              </div>
              <p className="text-xs font-medium text-accent-600 dark:text-accent-400">
                {t(`projects.${key}.skills`)}
              </p>
            </>
          );

          return href ? (
            <a key={key} href={href} target="_blank" rel="noreferrer" className={cardClass}>
              {inner}
            </a>
          ) : (
            <div key={key} className={cardClass}>
              {inner}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

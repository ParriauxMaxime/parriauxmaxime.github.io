import Popover from '@ds/components/popover';
import Section from '@ds/components/section';
import { useTranslation } from 'react-i18next';

const DOG_KEYWORDS = ['dog', 'chien'];

export default function Trivia() {
  const { t } = useTranslation();

  const items = t('trivia.items').split(', ');

  return (
    <Section id="trivia" heading={t('trivia.title')}>
      <ul className="max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
        {items.map((item) => {
          const isDog = DOG_KEYWORDS.some((kw) => item.toLowerCase().includes(kw));
          const content = (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300"
            >
              <span className="text-accent-500 dark:text-accent-400 mt-0.5 shrink-0">-</span>
              <span
                className={
                  isDog ? 'underline decoration-dotted decoration-accent-400 cursor-pointer' : ''
                }
              >
                {item}
              </span>
            </li>
          );

          if (isDog) {
            return (
              <Popover
                key={item}
                popover={
                  <img
                    src="/doggo.webp"
                    alt="The dog in question"
                    className="w-40 h-40 rounded-lg object-cover"
                  />
                }
              >
                {content}
              </Popover>
            );
          }

          return content;
        })}
      </ul>
    </Section>
  );
}

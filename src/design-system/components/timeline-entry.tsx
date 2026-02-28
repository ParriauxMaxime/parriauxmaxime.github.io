import TechTag from './tech-tag';

interface TimelineEntryProps {
  company: string;
  role: string;
  dates: string;
  summary: string;
  achievements?: string;
  tags: string;
  highlighted?: boolean;
  onClick?: () => void;
}

export default function TimelineEntry({
  company,
  role,
  dates,
  summary,
  achievements,
  tags,
  highlighted,
  onClick,
}: TimelineEntryProps) {
  return (
    <div className="relative pl-8 pb-8 last:pb-0 group">
      {/* Timeline line */}
      <div className="absolute left-[7px] top-3 bottom-0 w-px bg-zinc-200 dark:bg-zinc-700 group-last:hidden" />
      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-[6px] h-[15px] w-[15px] rounded-full border-2 ${
          highlighted
            ? 'border-accent-500 bg-accent-500'
            : 'border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900'
        }`}
      />
      <div className={`${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
          <h3
            className={`text-lg font-semibold ${
              highlighted
                ? 'text-accent-600 dark:text-accent-400'
                : 'text-neutral-900 dark:text-neutral-50'
            }`}
          >
            {company}
          </h3>
          <span className="text-sm text-zinc-400 dark:text-zinc-500">{dates}</span>
        </div>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">{role}</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-2">{summary}</p>
        {achievements && (
          <ul className="mb-3 space-y-1">
            {achievements.split(', ').map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300"
              >
                <span className="text-accent-500 dark:text-accent-400 mt-1 shrink-0">-</span>
                {item}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-1.5">
          {tags.split(', ').map((tag) => (
            <TechTag key={tag} label={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}

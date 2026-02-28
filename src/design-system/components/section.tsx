import useFadeIn from '@ds/hooks/use-fade-in';
import useOnVisible from '@ds/hooks/use-on-visible';
import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  heading?: string;
  tone?: 'default' | 'muted';
  children: ReactNode;
}

export default function Section({ id, heading, tone = 'default', children }: SectionProps) {
  const ref = useFadeIn<HTMLElement>();
  const { ref: headingRef, visible } = useOnVisible<HTMLHeadingElement>();

  const bg = tone === 'muted' ? 'bg-zinc-50 dark:bg-zinc-900/50' : 'bg-white dark:bg-zinc-900';

  return (
    <section ref={ref} id={id} className={`px-6 md:px-12 py-16 md:py-24 ${bg}`}>
      <div className="max-w-5xl mx-auto">
        {heading && (
          <h2
            ref={headingRef}
            className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-8"
          >
            {heading}
            <div className="mt-2 h-1 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
              <div
                className={`h-full bg-accent-500 dark:bg-accent-400 rounded-full transition-all duration-700 ease-out ${visible ? 'w-full' : 'w-0'}`}
              />
            </div>
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}

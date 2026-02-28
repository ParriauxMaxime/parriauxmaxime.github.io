import GitHub from '@ds/components/github';
import LinkedIn from '@ds/components/linkedin';
import Mail from '@ds/components/mail';
import Approach from '@modules/approach/approach';
import DotfileSpotlight from '@modules/dotfile/dotfile-spotlight';
import Education from '@modules/education/education';
import ExperienceTimeline from '@modules/experience/experience-timeline';
import FloatingControls from '@modules/floating-controls/floating-controls';
import { MoonProvider } from '@modules/floating-controls/to-the-moon';
import Hero from '@modules/hero/hero';
import Projects from '@modules/projects/projects';
import Rocket from '@modules/rocket/rocket';
import Stack from '@modules/stack/stack';
import Trivia from '@modules/trivia/trivia';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  return (
    <MoonProvider>
      <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-900 text-neutral-900 dark:text-neutral-50 w-full max-w-screen duration-500">
        <FloatingControls />
        <Rocket />
        <main className="w-full">
          <Hero />
          <Approach />
          <DotfileSpotlight />
          <ExperienceTimeline />
          <Stack />
          <Projects />
          <Education />
          <Trivia />
        </main>
        <footer className="relative z-10 flex justify-between items-center bg-neutral-900 dark:bg-zinc-950 h-14 md:h-16 px-6">
          <span className="text-sm text-zinc-400">{t('footer.built_with')}</span>
          <div className="flex items-center gap-1">
            <a
              href="https://github.com/ParriauxMaxime"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              <GitHub className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/maxime-parriaux/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              <LinkedIn className="h-4 w-4" />
            </a>
            <a
              href="mailto:maxime.parriaux.pro@gmail.com"
              aria-label="Email"
              className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </footer>
      </div>
    </MoonProvider>
  );
}

export default App;

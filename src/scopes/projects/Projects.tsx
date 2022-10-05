import React from 'react';
import { useTranslation } from 'react-i18next';

import Article from '../../components/Article/Article';
import Card from '../../components/Card/Card';
import GitHub from '../../components/GitHub/GitHub';
import Underline from '../../components/Underline/Underline';

const projects = [
  'lloyd',
  'bizzeo',
  'web-ascii-art',
  'whatsapp-pixel-art',
] as const;

const links: Record<typeof projects[number], JSX.Element> = {
  lloyd: (
    <a
      target="_blank"
      className="z-10 object-contain w-[25%] px-2"
      href="https://smart-renting.com/"
      rel="noreferrer"
    >
      <img src="https://i.imgur.com/NpHXdb7.png" />
    </a>
  ),
  bizzeo: (
    <a
      target="_blank"
      className="z-10 object-contain w-[25%] px-2"
      href="https://bizzeo.co/"
      rel="noreferrer"
    >
      <img src="https://bizzeo.co/img/logo-blue.png" />
    </a>
  ),
  'web-ascii-art': (
    <div className="w-[25%] flex justify-center items-center">
      <GitHub href="https://github.com/ParriauxMaxime/web-ascii-art" />
    </div>
  ),
  'whatsapp-pixel-art': (
    <div className="w-[25%] flex justify-center items-center">
      <GitHub href="https://github.com/ParriauxMaxime/whatsapp-pixel-art" />
    </div>
  ),
};

const hrefs: Record<typeof projects[number], string> = {
  lloyd: 'https://smart-renting.com/',
  bizzeo: 'https://bizzeo.co/',
  'web-ascii-art': 'https://web-ascii-art.netlify.app/',
  'whatsapp-pixel-art': 'https://whatsapp-pixel-art.netlify.app/',
};
export default function Projects() {
  const { t } = useTranslation();

  return (
    <Article id="projects">
      <>
        <div className="prose dark:prose-invert mb-6">
          <h1 className="prose-h1">
            <Underline>
              <>{t('projects.title')} 👨‍💻</>
            </Underline>
          </h1>
        </div>
        <div className="flex flex-wrap justify-evenly">
          {projects.map((project) => (
            <Card
              key={project}
              title={`projects.${project}.title`}
              subtitle={`projects.${project}.stack`}
              description={`projects.${project}.description`}
              skills={`projects.${project}.skills`}
              link={links[project]}
              href={hrefs[project]}
            ></Card>
          ))}
        </div>
      </>
    </Article>
  );
}

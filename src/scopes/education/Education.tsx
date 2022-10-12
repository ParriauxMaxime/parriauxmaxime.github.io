import React from 'react';
import { useTranslation } from 'react-i18next';

import Article from '../../components/Article/Article';
import Card from '../../components/Card/Card';
import Underline from '../../components/Underline/Underline';

const educations = [
  'epitech_paris',
  'roskilde_university',
  'epitech_strasbourg',
  'jules_haag',
] as const;

const links: Record<typeof educations[number], JSX.Element> = {
  epitech_paris: (
    <img
      className="max-w-[20%] pl-2"
      src="https://file.diplomeo-static.com/file/00/00/01/62/16232.svg"
    />
  ),
  roskilde_university: (
    <img
      className="max-w-[20%] pl-2"
      src="https://www.timeshighereducation.com/sites/default/files/styles/medium/public/ruc_400_x_400_the.png"
    />
  ),
  epitech_strasbourg: (
    <img
      className="max-w-[20%] pl-2"
      src="https://file.diplomeo-static.com/file/00/00/01/62/16232.svg"
    />
  ),
  jules_haag: (
    <img
      className="max-w-[20%] pl-2 rounded"
      src="https://www.echosciences-bfc.fr/uploads/place/image/attachment/1005442678/lg_Jules_Haag.jpg"
    />
  ),
};

const hrefs: Record<typeof educations[number], string> = {
  epitech_paris: 'https://www.epitech.eu/fr/ecole-informatique-paris/',
  roskilde_university: 'https://ruc.dk/en',
  epitech_strasbourg:
    'https://www.epitech.eu/fr/ecole-informatique-strasbourg/',
  jules_haag: 'http://www.lycee-juleshaag.fr/',
};

export default function Education() {
  const { t } = useTranslation();

  return (
    <Article id="educations">
      <>
        <div className="prose dark:prose-invert mb-6">
          <h1 className="prose-h1">
            <Underline>
              <>{t('educations.title')} 🎓</>
            </Underline>
          </h1>
        </div>
        <div className="flex flex-wrap justify-evenly">
          {educations.map((project) => (
            <Card
              key={project}
              title={`educations.${project}.title`}
              subtitle={`educations.${project}.date`}
              description={`educations.${project}.description`}
              skills={`educations.${project}.skills`}
              link={links[project]}
              href={hrefs[project]}
            ></Card>
          ))}
        </div>
      </>
    </Article>
  );
}

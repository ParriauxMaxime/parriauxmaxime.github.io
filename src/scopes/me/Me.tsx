import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import Article from '../../components/Article/Article';
import GitHub from '../../components/GitHub/GitHub';
import LinkedIn from '../../components/LinkedIn/LinkedIn';
import Mail from '../../components/Links/Mail';
import Popover from '../../components/Popover/Popover';
import Underline from '../../components/Underline/Underline';
import useLocalStorage from '../../hooks/useLocalStorage/useLocalStorage';
import {
  languages,
  LANGUAGE_LOCAL_STORAGE_KEY,
} from '../header/language/Language';

const resumeRef = {
  [languages.FR]:
    'https://docs.google.com/document/d/1-mhoFO2SZhHpbDyL2gWBBRI6eKOW9rBQO5HimNdyckQ/export?format=pdf',
  [languages.EN]:
    'https://docs.google.com/document/d/1UyeXTZGugACQbgeKuTCDBKv8iPlwkhpqCN-_OixZEj8/export?format=pdf',
};

export default function Me() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const language = i18n.language.slice(0, 2);

  return (
    <Article id="me">
      <>
        <div className="flex flex-wrap justify-center">
          <div className="flex-col flex-1 prose dark:prose-invert min-w-[300px] mb-8">
            <div className="flex justify-between items-baseline">
              <h1>
                <Underline>
                  <>{t('greeting')} 🖖</>
                </Underline>
              </h1>
              <Popover popover={'Resume'}>
                <a
                  target="_blank"
                  href={resumeRef[language]}
                  className="flex items-center justify-center prose-2xl h-12 w-12 hover:translate-x-[0.25rem] hover:translate-y-[-0.25rem] shadow bg-accent dark:bg-accent-dark dark:hover:bg-accent rounded-full transition-all cursor-pointer no-underline"
                  rel="noreferrer"
                >
                  📄
                </a>
              </Popover>
            </div>
            <div className="ml-2 md:ml-4">
              <span className="prose-lg ">
                <Trans i18nKey={'presentation'} />
              </span>
              <ul className="text-justify ">
                {['smartrenting', 'carrevolutis', '4js', 'whitequest'].map(
                  (experience) => (
                    <li key={experience} className="mb-1">
                      <Trans i18nKey={`experiences.${experience}`} />
                    </li>
                  )
                )}
              </ul>
              <span className="Me__presentation__focus">
                <Trans i18nKey={'focus'} />
              </span>
            </div>
            <div className="Me__presentation__contact"></div>
          </div>
          <div className="flex justify-center lg:justify-end items-center w-[400px]">
            <img
              className="max-h-[200px] md:max-h-[300px] rounded-full"
              src="https://avatars.githubusercontent.com/u/21246251?s=400&u=5b76eef687cd2e307237c3bc51a235d398b3bb12&v=4"
              alt="me"
            />
          </div>
        </div>
        <div className="flex justify-center mt-8 md:mt-12 w-full]">
          <div className="h-12 mx-1 md:mx-1 md:h-16">
            <Mail className="p-2 h-12 w-12 md:h-16 md:w-16" />
          </div>
          <div className="h-12 mx-1 md:mx-1 md:h-16">
            <GitHub
              className="p-2 h-12 w-12 md:h-16 md:w-16"
              href="https://github.com/ParriauxMaxime"
            />
          </div>
          <div className="h-12 mx-1 md:mx-1 md:h-16">
            <LinkedIn className="block p-2 h-12 w-12 md:h-16 md:w-16" />
          </div>
        </div>
      </>
    </Article>
  );
}

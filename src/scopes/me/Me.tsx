import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import Article from '../../components/Article/Article';
import GitHub from '../../components/GitHub/GitHub';
import LinkedIn from '../../components/LinkedIn/LinkedIn';
import Mail from '../../components/Links/Mail';
import Underline from '../../components/Underline/Underline';

export default function Me() {
  const { t } = useTranslation();

  return (
    <Article id="me">
      <>
        <div className="flex flex-wrap justify-center">
          <div className="flex-col flex-1 prose dark:prose-invert min-w-[min(350px,80%)]">
            <h1>
              <Underline>
                <>{t('greeting')} 🖖</>
              </Underline>
            </h1>
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
              <span className="Me__presentation__focus">{t('focus')}</span>
            </div>
            <div className="Me__presentation__contact"></div>
          </div>
          <div className="flex justify-center items-center px-4 pt-8 sm:pt-0 sm:px-8 m-auto">
            <img
              className="max-h-[150px] md:max-h-[300px] rounded-full"
              src="https://avatars.githubusercontent.com/u/21246251?s=400&u=5b76eef687cd2e307237c3bc51a235d398b3bb12&v=4"
              alt="me"
            />
          </div>
        </div>
        <div className="flex justify-center mt-8 md:mt-12">
          <div className="h-12 mx-1 md:mx-1 md:h-16">
            <Mail />
          </div>
          <div className="h-12 mx-1 md:mx-1 md:h-16">
            <GitHub href="https://github.com/ParriauxMaxime" />
          </div>
          <div className="h-12 mx-1 md:mx-1 md:h-16">
            <LinkedIn />
          </div>
        </div>
      </>
    </Article>
  );
}

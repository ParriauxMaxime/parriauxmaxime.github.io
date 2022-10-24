import React from 'react';
import { Trans } from 'react-i18next';

export interface CardProps {
  title: JSX.Element | string;
  description?: JSX.Element | string;
  subtitle?: JSX.Element | string;
  link?: JSX.Element;
  skills?: string;
  href?: string;
}

export default function Card({
  title,
  description,
  subtitle,
  link,
  skills,
  href,
}: CardProps) {
  return (
    <div className="relative z-10 border-hidden flex w-[min(90vw,600px)] h-auto md:min-h-[230px] p-4 md:p-6 mt-4 m-4 rounded-lg cursor-pointer hover:translate-x-[0.25rem] hover:translate-y-[-0.25rem] bg-white dark:bg-secondary-dark dark:hover:bg-slate-600 transition-all duration-200 shadow">
      <div className="flex items-center justify-between w-full mb-8 md:mb-2">
        <div className="w-[75%] prose dark:prose-invert self-baseline text-left">
          <h2 className="mb-2 whitespace-nowrap">
            <Trans>{title}</Trans>
          </h2>
          <div className="dark:text-white font-bold mb-2">
            <Trans>{subtitle}</Trans>
          </div>
          <span className="prose-sm">
            <Trans
              components={[
                <a
                  key="skyrock"
                  target="_blank"
                  href="https://skyrock.com"
                  className="relative z-10"
                  rel="noreferrer"
                />,
              ]}
            >
              {description}
            </Trans>
          </span>
        </div>
        {link}
      </div>
      <div className="absolute bottom-0 right-0 rounded-tr-lg rounded-br-lg p-2 bg-accent dark:bg-accent-dark h-10">
        <div className="absolute bottom-0 left-[-3.5rem] w-0 h-0 border-r-0 border-l-[3.5rem] border-x-transparent border-b-[2.5rem] dark:border-b-accent-dark border-b-accent" />
        <div className="relative right-2">
          <Trans>{skills}</Trans>
        </div>
      </div>
      <a
        target="_blank"
        href={href}
        rel="noreferrer"
        className="absolute top-0 right-0 left-0 bottom-0"
      ></a>
    </div>
  );
}

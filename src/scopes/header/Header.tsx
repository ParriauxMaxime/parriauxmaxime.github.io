import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Underline from '../../components/Underline/Underline';

import DarkMode from './darkmode/DarkMode';
import Language from './language/Language';

export default function Header() {
  const { t } = useTranslation();
  const deltaScrollRef = useRef<number>(0);
  const fixed = useRef<boolean>(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handler = () => {
      const root = document.querySelector('html') as HTMLElement;
      if (root.scrollTop + 25 < deltaScrollRef.current) {
        setShow(true);
      }
      if (!fixed.current && root.scrollTop > deltaScrollRef.current + 35) {
        setShow(false);
      }
      deltaScrollRef.current = root.scrollTop;
    };
    document.addEventListener('scroll', handler);

    return () => {
      document.removeEventListener('scroll', handler);
    };
  }, []);

  const handleClick = (link: string) => (event: MouseEvent) => {
    event.preventDefault();
    const elem = document.getElementById(link);
    fixed.current = true;
    window.scrollBy({
      top: (elem?.getBoundingClientRect().top || 0) - 75,
      behavior: 'smooth',
    });
    setTimeout(() => {
      fixed.current = false;
    }, 1000);
  };

  return (
    <header
      style={{
        top: show ? 0 : -200,
      }}
      className="sticky top-0 z-50 px-4 bg-primary dark:bg-primary-dark h-20 md:h-24 w-full flex justify-end items-center max-w-screen transition-[top, background-color] linear prose md:prose-xl duration-300 max-w-none"
    >
      <a
        className="not-prose text-white px-1 md:px-2 py-1 mr-auto"
        onClick={handleClick('me')}
      >
        <img
          className="h-12 md:h-16 rounded-full"
          src="https://avatars.githubusercontent.com/u/21246251?s=400&u=5b76eef687cd2e307237c3bc51a235d398b3bb12&v=4"
          alt="me"
        />
      </a>
      <a
        className="text-white px-1 md:px-2 py-1 no-underline"
        onClick={handleClick('projects')}
      >
        <Underline>{t('header.projects')}</Underline>
      </a>
      <a
        className="text-white px-1 md:px-2 py-1 no-underline"
        onClick={handleClick('educations')}
      >
        <Underline>{t('header.educations')}</Underline>
      </a>
      <div className="mx-2">
        <Language />
      </div>
      <DarkMode />
    </header>
  );
}

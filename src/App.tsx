import React from 'react';
import { useTranslation } from 'react-i18next';

import GitHub from './components/GitHub/GitHub';
import LinkedIn from './components/LinkedIn/LinkedIn';
import Mail from './components/Links/Mail';
import Rocket from './components/Rocket/Rocket';
import Education from './scopes/education/Education';
import Header from './scopes/header/Header';
import Me from './scopes/me/Me';
import Projects from './scopes/projects/Projects';

function App() {
  const { t } = useTranslation();

  return (
    <div className="flex-col items-center dark:bg-slate-800 bg-gray-100 text-justify min-h-screen text-white w-full max-w-screen duration-500">
      <Header />
      <main className="w-full">
        <Rocket />
        <Me />
        <Projects />
        <Education />
      </main>
      <footer className="relative z-10 flex justify-between items-center bg-primary dark:bg-primary-dark h-16 md:h-20 px-4">
        <div className="text-white whitespace-nowrap mr-4 flex items-center">
          <span>Built with ❤️, &nbsp;</span>
          <img
            className="h-4"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png?20220125121207"
          />
          <span>&nbsp; & &nbsp;</span>
          <img
            className="h-6"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/600px-Tailwind_CSS_Logo.svg.png?20211001194333"
          />
          <span />
        </div>
        <div className="flex h-6">
          <Mail />
          <GitHub href="https://github.com/ParriauxMaxime" />
          <div className="">
            <LinkedIn />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

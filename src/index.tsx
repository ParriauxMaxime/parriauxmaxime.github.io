import en from './locales/en.json';
import fr from './locales/fr.json';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { initReactI18next } from 'react-i18next';

import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';

i18next
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    resources: {
      en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
    },
    fallbackLng: 'en',
    react: {
      transKeepBasicHtmlNodesFor: ['strong', 'a', 'i', 'br'],
    },
  });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

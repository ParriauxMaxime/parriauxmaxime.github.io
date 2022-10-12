import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useLocalStorage from '../../../hooks/useLocalStorage/useLocalStorage';

export const languages = {
  FR: 'fr',
  EN: 'en',
};

const flags = {
  [languages.FR]: '🇫🇷',
  [languages.EN]: '🇺🇸',
};

export const LANGUAGE_LOCAL_STORAGE_KEY = 'language';

export default function Language() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useLocalStorage(
    Object.values(languages).includes(i18n.language.slice(0, 2))
      ? i18n.language.slice(0, 2)
      : languages.EN,
    LANGUAGE_LOCAL_STORAGE_KEY,
    (value) => value.slice(0, 2)
  );

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const inverseValue = useMemo(
    () => (language === languages.FR ? languages.EN : languages.FR),
    [language]
  );

  const handleClick = useCallback(() => {
    setLanguage(inverseValue);
  }, [inverseValue]);

  return (
    <div onClick={handleClick} className="px-2 cursor-pointer select-none">
      {flags[inverseValue]}
    </div>
  );
}

import useLocalStorage from '@ds/hooks/use-local-storage';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const languages = {
  FR: 'fr',
  EN: 'en',
};

const options = [
  { code: languages.EN, flag: '🇺🇸', label: 'English' },
  { code: languages.FR, flag: '🇫🇷', label: 'Français' },
];

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
  }, [language, i18n.changeLanguage]);

  return (
    <div className="flex items-center gap-1">
      {options.map((opt) => (
        <button
          key={opt.code}
          type="button"
          onClick={() => setLanguage(opt.code)}
          aria-label={opt.label}
          className={`px-2 py-1 rounded-md text-sm cursor-pointer select-none transition-colors ${language === opt.code ? 'bg-zinc-200 dark:bg-zinc-700' : 'hover:bg-zinc-100 dark:hover:bg-zinc-700/50'}`}
        >
          {opt.flag}
        </button>
      ))}
    </div>
  );
}

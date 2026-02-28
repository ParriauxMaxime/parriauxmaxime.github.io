import useLocalStorage from '@ds/hooks/use-local-storage';
import { useEffect } from 'react';

const DARK_LOCAL_STORAGE_KEY = 'dark';

export default function DarkMode() {
  const [darkMode, setDarkMode] = useLocalStorage(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    DARK_LOCAL_STORAGE_KEY,
    (value) => value === 'true'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleClick = () => {
    const value = !darkMode;
    setDarkMode(value);
  };

  return (
    <div onClick={handleClick} className="px-2 cursor-pointer select-none">
      {darkMode ? '🌕' : '☀️'}
    </div>
  );
}

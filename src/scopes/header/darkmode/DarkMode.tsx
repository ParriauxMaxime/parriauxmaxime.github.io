import React, { useCallback, useEffect, useState } from 'react';

import useLocalStorage from '../../../hooks/useLocalStorage/useLocalStorage';

const DARK_LOCAL_STORAGE_KEY = 'dark';

export default function DarkMode() {
  const [darkMode, setDarkMode] = useLocalStorage(
    true,
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

import React, { useState } from 'react';

export default function useLocalStorage<T>(
  initialValue: T,
  key: string,
  convert: (value: string) => T
) {
  const [value, setValue] = useState<T>(
    localStorage.getItem(key) === null
      ? initialValue
      : convert(localStorage.getItem(key) as string)
  );

  return [
    value,
    (newValue: T) => {
      localStorage.setItem(key, String(newValue));
      setValue(newValue);
    },
  ] as [T, (newValue: T) => void];
}

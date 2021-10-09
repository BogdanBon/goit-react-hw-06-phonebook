import { useState, useEffect } from 'react';

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

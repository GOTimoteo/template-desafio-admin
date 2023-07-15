import { useState } from "react";

export const useLocalStorage = <T>(keyName: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    const value = window.localStorage.getItem(keyName);
    if (value) return JSON.parse(value);
    return null;
  });
  const setValue = (newValue: T) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};

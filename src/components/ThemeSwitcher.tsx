import React, {useEffect} from 'react';
import {useSettingsStore} from "../store";

const ThemeSwitcher = () => {
  const darkMode = useSettingsStore(state => state.darkMode);
  const toggleTheme = useSettingsStore(state => state.toggleDarkMode);
  useEffect(() => {
    if(darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode])
  return (
    <button onClick={toggleTheme}>Switch theme</button>
  );
};

export default ThemeSwitcher;
import React from 'react';

export const Themes = {
  Dark: 'dark',
  Light: 'light',
};

export const ThemeContext = React.createContext(Themes.Dark);

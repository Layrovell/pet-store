import React from 'react';

export type Mode = 'light' | 'dark';

interface ThemeContextProps {
  mode: Mode;
  toggleMode: () => void;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  mode: 'light',
  toggleMode: () => {},
});

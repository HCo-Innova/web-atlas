import { createContext } from 'react';
import { THEMES } from '../lib/constants';

type Theme = typeof THEMES[keyof typeof THEMES];

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

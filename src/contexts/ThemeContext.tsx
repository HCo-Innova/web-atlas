import { useEffect, useState, ReactNode } from 'react';
import { THEMES, STORAGE_KEYS } from '../lib/constants';
import { ThemeContext, type ThemeContextType } from './ThemeContextDefinition';

type Theme = typeof THEMES[keyof typeof THEMES];

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) as Theme;
    if (savedTheme) {
      return savedTheme;
    }
    
    // Modo oscuro como predeterminado
    return THEMES.dark;
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEYS.theme, newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === THEMES.light ? THEMES.dark : THEMES.light);
  };

  useEffect(() => {
    const root = document.documentElement;
    
    // Remover clases anteriores
    root.classList.remove('light', 'dark');
    
    // Añadir la clase del tema actual
    root.classList.add(theme);
    
    // Actualizar el meta theme-color para navegadores móviles
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        theme === THEMES.dark ? '#111827' : '#F9FAFB'
      );
    }
  }, [theme]);

  // Escuchar cambios en la preferencia del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (_e: MediaQueryListEvent) => {
      // Solo cambiar si no hay un tema guardado en localStorage
      // Mantener modo oscuro como predeterminado
      if (!localStorage.getItem(STORAGE_KEYS.theme)) {
        setThemeState(THEMES.dark);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hooks moved to separate file to avoid react-refresh warnings

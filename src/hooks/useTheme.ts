import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContextDefinition';
import { THEMES } from '../lib/constants';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Hook para obtener clases de tema - DEPRECATED
// Usar getThemeClasses() de design-system.ts en su lugar
export function useThemeClasses() {
  const { theme } = useTheme();
  
  return {
    // Clases de fondo
    bg: theme === THEMES.dark ? 'bg-background-dark' : 'bg-background',
    surface: theme === THEMES.dark ? 'bg-surface-dark' : 'bg-surface',
    
    // Clases de texto
    text: theme === THEMES.dark ? 'text-text-primary-dark' : 'text-text-primary',
    textSecondary: theme === THEMES.dark ? 'text-text-secondary-dark' : 'text-text-secondary',
    
    // Clases de borde
    border: theme === THEMES.dark ? 'border-border-dark' : 'border-border',
    
    // Clases de colores principales
    primary: theme === THEMES.dark ? 'text-primary-dark' : 'text-primary',
    accent: theme === THEMES.dark ? 'text-accent-dark' : 'text-accent',
  };
}

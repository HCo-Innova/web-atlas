import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Función utilitaria para combinar clases de Tailwind CSS
 * Combina clsx con tailwind-merge para evitar conflictos de clases
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Colores del sistema de diseño ATLAS Agro
 */
export const colors = {
  primary: {
    light: '#4A7729',
    dark: '#66BB6A',
  },
  accent: {
    light: '#002F6C',
    dark: '#42A5F5',
  },
  background: {
    light: '#F9FAFB',
    dark: '#111827',
  },
  surface: {
    light: '#FFFFFF',
    dark: '#1F2937',
  },
  text: {
    primary: {
      light: '#1A1A1A',
      dark: '#F9FAFB',
    },
    secondary: {
      light: '#4B5563',
      dark: '#9CA3AF',
    },
  },
  border: {
    light: '#E5E7EB',
    dark: '#374151',
  },
} as const;

/**
 * Breakpoints del sistema de diseño optimizados para mobile-first
 */
export const breakpoints = {
  xs: '375px',   // Móviles pequeños (iPhone SE, etc.)
  sm: '640px',   // Móviles grandes (iPhone 12, etc.)
  md: '768px',   // Tablets (iPad)
  lg: '1024px',  // Laptops pequeños
  xl: '1280px',  // Laptops grandes
  '2xl': '1536px', // Desktops
  '3xl': '1920px', // Pantallas grandes
} as const;

/**
 * Breakpoints para uso en JavaScript/TypeScript
 */
export const breakpointValues = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
} as const;

/**
 * Espaciado del sistema de diseño (múltiplos de 4px)
 */
export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
  40: '160px',
  48: '192px',
  56: '224px',
  64: '256px',
} as const;

/**
 * Tipografía del sistema de diseño
 */
export const typography = {
  fontFamily: {
    heading: ['Montserrat', 'sans-serif'],
    body: ['Inter', 'sans-serif'],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
    '7xl': ['4.5rem', { lineHeight: '1' }],
    '8xl': ['6rem', { lineHeight: '1' }],
    '9xl': ['8rem', { lineHeight: '1' }],
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

/**
 * Sombras del sistema de diseño
 */
export const shadows = {
  card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  elevated: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  glow: '0 0 20px rgba(76, 175, 80, 0.3)',
} as const;

/**
 * Animaciones del sistema de diseño
 */
export const animations = {
  fadeIn: 'fadeIn 0.5s ease-in-out',
  slideUp: 'slideUp 0.3s ease-out',
  scaleIn: 'scaleIn 0.2s ease-out',
  spin: 'spin 1s linear infinite',
  pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
} as const;

/**
 * Utilidades para generar clases de tema
 */
export function getThemeClasses(theme: 'light' | 'dark') {
  return {
    bg: theme === 'dark' ? 'bg-background-dark' : 'bg-background',
    surface: theme === 'dark' ? 'bg-surface-dark' : 'bg-surface',
    text: theme === 'dark' ? 'text-text-primary-dark' : 'text-text-primary',
    textSecondary: theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary',
    border: theme === 'dark' ? 'border-border-dark' : 'border-border',
    primary: theme === 'dark' ? 'text-primary-dark' : 'text-primary',
    accent: theme === 'dark' ? 'text-accent-dark' : 'text-accent',
  };
}

/**
 * Utilidades para generar gradientes
 */
export const gradients = {
  primary: 'bg-gradient-to-r from-primary to-accent',
  surface: 'bg-gradient-to-br from-surface to-surface/80',
  text: 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent',
} as const;

/**
 * Utilidades para generar patrones de fondo
 */
export const patterns = {
  dots: 'radial-gradient(circle, rgba(76, 175, 80, 0.1) 1px, transparent 1px)',
  grid: 'linear-gradient(rgba(76, 175, 80, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(76, 175, 80, 0.1) 1px, transparent 1px)',
  diagonal: 'linear-gradient(45deg, rgba(76, 175, 80, 0.05) 25%, transparent 25%), linear-gradient(-45deg, rgba(76, 175, 80, 0.05) 25%, transparent 25%)',
} as const;

/**
 * Utilidades específicas para mobile-first
 */
export const mobileFirst = {
  // Clases de visibilidad responsive
  visibility: {
    mobileOnly: 'block sm:hidden',
    tabletUp: 'hidden sm:block',
    desktopUp: 'hidden lg:block',
    mobileTablet: 'block lg:hidden',
  },
  
  // Clases de grid responsive
  grid: {
    responsive: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8',
    responsive2: 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8',
    responsive3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8',
  },
  
  // Clases de texto responsive
  text: {
    responsive: 'text-sm sm:text-base lg:text-lg',
    responsiveLg: 'text-base sm:text-lg lg:text-xl',
    responsiveXl: 'text-lg sm:text-xl lg:text-2xl',
  },
  
  // Clases de espaciado responsive
  spacing: {
    responsive: 'space-y-4 sm:space-y-6 lg:space-y-8',
    responsiveX: 'space-x-4 sm:space-x-6 lg:space-x-8',
    pResponsive: 'p-4 sm:p-6 lg:p-8',
    pxResponsive: 'px-4 sm:px-6 lg:px-8',
    pyResponsive: 'py-4 sm:py-6 lg:py-8',
  },
  
  // Clases de botones responsive
  button: {
    responsive: 'w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3',
  },
} as const;

/**
 * Hook para detectar breakpoints en JavaScript
 */
export function useBreakpoint() {
  if (typeof window === 'undefined') return 'lg';
  
  const width = window.innerWidth;
  
  if (width < breakpointValues.sm) return 'xs';
  if (width < breakpointValues.md) return 'sm';
  if (width < breakpointValues.lg) return 'md';
  if (width < breakpointValues.xl) return 'lg';
  if (width < breakpointValues['2xl']) return 'xl';
  if (width < breakpointValues['3xl']) return '2xl';
  return '3xl';
}

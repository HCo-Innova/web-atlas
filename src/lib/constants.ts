/**
 * Constantes centralizadas para eliminar duplicación
 * Aplica principio DRY al máximo
 */

// Configuración de idiomas
export const LANGUAGES = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
] as const;

export const DEFAULT_LANGUAGE = 'es';

// Configuración de iconos SVG
export const ICONS = {
  globe: {
    viewBox: '0 0 24 24',
    path: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
  },
  chevronDown: {
    viewBox: '0 0 24 24',
    path: 'M19 9l-7 7-7-7',
  },
  menu: {
    viewBox: '0 0 24 24',
    path: 'M4 6h16M4 12h16M4 18h16',
  },
  close: {
    viewBox: '0 0 24 24',
    path: 'M6 18L18 6M6 6l12 12',
  },
} as const;

// Configuración de accesibilidad
export const ARIA_LABELS = {
  languageSelector: 'Seleccionar idioma',
  mobileMenuOpen: 'Cerrar menú de navegación',
  mobileMenuClosed: 'Abrir menú de navegación',
  themeToggle: 'Cambiar tema',
} as const;

// Configuración de animaciones
export const ANIMATION_DURATION = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
} as const;

// Configuración de z-index
export const Z_INDEX = {
  dropdown: 50,
  modal: 100,
  tooltip: 200,
  toast: 300,
} as const;

// Configuración de tamaños
export const SIZES = {
  icon: {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  },
  button: {
    sm: 'px-2 py-2',
    md: 'px-3 py-2',
    lg: 'px-4 py-3',
  },
  spacing: {
    xs: 'space-x-1',
    sm: 'space-x-2',
    md: 'space-x-4',
    lg: 'space-x-6',
  },
} as const;

// Configuración de breakpoints para JavaScript
export const BREAKPOINTS = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Configuración de rutas
export const ROUTES = {
  home: '/',
  about: '#nosotros',
  products: '#productos',
  process: '#proceso',
  quality: '#calidad',
  contact: '#contacto',
} as const;

// Configuración de temas
export const THEMES = {
  light: 'light',
  dark: 'dark',
} as const;

// Configuración de variantes de componentes
export const VARIANTS = {
  button: ['primary', 'secondary', 'text', 'ghost'] as const,
  card: ['default', 'elevated', 'outlined'] as const,
  navigation: ['desktop', 'mobile'] as const,
} as const;

// Configuración de estados
export const STATES = {
  loading: 'loading',
  disabled: 'disabled',
  active: 'active',
  inactive: 'inactive',
} as const;

// Configuración de eventos
export const EVENTS = {
  click: 'click',
  hover: 'hover',
  focus: 'focus',
  blur: 'blur',
} as const;

// Configuración de validación
export const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-()]+$/,
  url: /^https?:\/\/.+/,
} as const;

// Configuración de localStorage
export const STORAGE_KEYS = {
  theme: 'atlas-theme',
  language: 'atlas-language',
  preferences: 'atlas-preferences',
} as const;

// Configuración de API
export const API_CONFIG = {
  timeout: 10000,
  retries: 3,
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
} as const;

// Configuración de performance
export const PERFORMANCE = {
  debounceDelay: 300,
  throttleDelay: 100,
  lazyLoadOffset: 100,
} as const;

// Configuración de accesibilidad
export const ACCESSIBILITY = {
  focusVisible: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20',
  screenReaderOnly: 'sr-only',
  skipLink: 'skip-to-main-content',
} as const;

// Utilidades de tipo para TypeScript
export type LanguageCode = typeof LANGUAGES[number]['code'];
export type Theme = typeof THEMES[keyof typeof THEMES];
export type ButtonVariant = typeof VARIANTS.button[number];
export type CardVariant = typeof VARIANTS.card[number];
export type NavigationVariant = typeof VARIANTS.navigation[number];
export type IconName = keyof typeof ICONS;
export type Size = 'sm' | 'md' | 'lg';
export type Spacing = 'xs' | 'sm' | 'md' | 'lg';

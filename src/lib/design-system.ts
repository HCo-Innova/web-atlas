/**
 * ATLAS Agro - Sistema de Diseño Optimizado v2.0
 * Sistema robusto, accesible y de alto rendimiento
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Función utilitaria para combinar clases de Tailwind CSS de forma segura
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Tokens de diseño semánticos
 * Optimizados para accesibilidad y consistencia
 */
export const designTokens = {
  colors: {
    // Colores principales
    primary: {
      50: '#f0f9f0',
      100: '#d9f2d9',
      500: '#4A7729', // Color principal
      600: '#3d6322',
      700: '#305019',
      900: '#1a2e0e',
    },
    accent: {
      50: '#e8f4fd',
      100: '#bee6fb',
      500: '#002F6C', // Color de acento
      600: '#002557',
      700: '#001b41',
      900: '#000f23',
    },
    // Escala de grises neutral mejorada para mejor contraste
    neutral: {
      0: '#FFFFFF',
      25: '#FDFDFD', // Blanco cálido sutil
      50: '#F9FAFB',
      75: '#F6F7F8', // Gris ultra claro
      100: '#F3F4F6', // Background principal mejorado
      150: '#EAECEF', // Intermedio para mejor gradación
      200: '#E5E7EB',
      250: '#DDE1E6', // Intermedio
      300: '#D1D5DB', // Border principal mejorado
      400: '#9CA3AF',
      500: '#6B7280',
      550: '#5A6570', // Intermedio
      600: '#4B5563',
      650: '#3F4651', // Intermedio
      700: '#374151',
      750: '#2D3441', // Intermedio
      800: '#1F2937',
      850: '#18212F', // Intermedio
      900: '#111827',
      950: '#030712',
    },
    // Estados semánticos
    semantic: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },
  },
  
  // Tipografía optimizada
  typography: {
    fontFamily: {
      display: ['Montserrat', 'system-ui', 'sans-serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['SF Mono', 'Monaco', 'Inconsolata', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  
  // Espaciado consistente (sistema de 4px)
  spacing: {
    0: '0',
    px: '1px',
    0.5: '0.125rem', // 2px
    1: '0.25rem',    // 4px
    1.5: '0.375rem', // 6px
    2: '0.5rem',     // 8px
    2.5: '0.625rem', // 10px
    3: '0.75rem',    // 12px
    3.5: '0.875rem', // 14px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    7: '1.75rem',    // 28px
    8: '2rem',       // 32px
    9: '2.25rem',    // 36px
    10: '2.5rem',    // 40px
    11: '2.75rem',   // 44px
    12: '3rem',      // 48px
    14: '3.5rem',    // 56px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
    28: '7rem',      // 112px
    32: '8rem',      // 128px
    36: '9rem',      // 144px
    40: '10rem',     // 160px
    44: '11rem',     // 176px
    48: '12rem',     // 192px
    52: '13rem',     // 208px
    56: '14rem',     // 224px
    60: '15rem',     // 240px
    64: '16rem',     // 256px
    72: '18rem',     // 288px
    80: '20rem',     // 320px
    96: '24rem',     // 384px
  },
  
  // Sombras para elevación
  shadows: {
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },
  
  // Radios de borde
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  
  // Breakpoints para responsive design
  breakpoints: {
    xs: '375px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Z-index hierarchy
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1020,
    banner: 1030,
    overlay: 1040,
    modal: 1050,
    popover: 1060,
    skipLink: 1070,
    toast: 1080,
    tooltip: 1090,
  },
  
  // Duraciones de animación
  animation: {
    duration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
} as const;

/**
 * Componentes del sistema de diseño
 */
export const componentStyles = {
  // Botones
  button: {
    base: 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
    variants: {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
      secondary: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500',
      outline: 'border border-neutral-300 text-neutral-700 hover:border-neutral-400 focus:ring-neutral-500',
      ghost: 'text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-500',
      link: 'text-primary-500 hover:text-primary-600 focus:ring-primary-500',
    },
    sizes: {
      xs: 'px-2.5 py-1.5 text-xs rounded',
      sm: 'px-3 py-2 text-sm rounded-md',
      md: 'px-4 py-2 text-base rounded-md',
      lg: 'px-6 py-3 text-lg rounded-lg',
      xl: 'px-8 py-4 text-xl rounded-lg',
    },
  },
  
  // Tarjetas
  card: {
    base: 'bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden',
    variants: {
      default: '',
      elevated: 'shadow-md',
      interactive: 'hover:shadow-md transition-shadow duration-200 cursor-pointer',
    },
    padding: {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  
  // Inputs
  input: {
    base: 'w-full border border-neutral-300 rounded-md px-3 py-2 text-base placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200',
    variants: {
      default: '',
      error: 'border-red-500 focus:ring-red-500 focus:border-red-500',
      success: 'border-green-500 focus:ring-green-500 focus:border-green-500',
    },
    sizes: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    },
  },
} as const;

/**
 * Utilidades para temas
 */
export const themeUtils = {
  // Clases para modo oscuro
  dark: {
    bg: 'dark:bg-neutral-900',
    surface: 'dark:bg-neutral-800',
    text: 'dark:text-neutral-50',
    textSecondary: 'dark:text-neutral-400',
    border: 'dark:border-neutral-700',
  },
  
  // Aplicar tema a un componente
  applyTheme: (baseClasses: string, darkClasses?: string) => {
    return cn(baseClasses, darkClasses);
  },
} as const;

/**
 * Utilidades responsive optimizadas para mobile-first
 */
export const responsiveUtils = {
  // Contenedores
  container: {
    base: 'w-full mx-auto px-4 sm:px-6 lg:px-8',
    maxWidth: 'max-w-7xl',
    section: 'py-16 sm:py-20 lg:py-24',
  },
  
  // Grids responsive
  grid: {
    auto: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
    two: 'grid grid-cols-1 sm:grid-cols-2 gap-6',
    three: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
    four: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
  },
  
  // Textos responsive
  text: {
    display: 'text-4xl sm:text-5xl lg:text-6xl',
    heading: 'text-2xl sm:text-3xl lg:text-4xl',
    subheading: 'text-lg sm:text-xl lg:text-2xl',
    body: 'text-base sm:text-lg',
    small: 'text-sm sm:text-base',
  },
  
  // Espaciado responsive
  spacing: {
    section: 'space-y-8 sm:space-y-12 lg:space-y-16',
    component: 'space-y-4 sm:space-y-6 lg:space-y-8',
  },
} as const;

/**
 * Utilidades para accesibilidad
 */
export const a11yUtils = {
  // Focus visible
  focusVisible: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
  
  // Screen reader only
  srOnly: 'sr-only',
  
  // Skip links
  skipLink: 'absolute left-[-10000px] top-auto width-[1px] height-[1px] overflow-hidden focus:left-6 focus:top-7 focus:width-auto focus:height-auto focus:overflow-visible focus:z-skipLink',
  
  // Reduced motion
  reduceMotion: 'motion-reduce:transition-none motion-reduce:transform-none',
  
  // High contrast mode
  highContrast: 'contrast-more:border-2 contrast-more:border-current',
} as const;

/**
 * Utilidades para performance
 */
export const performanceUtils = {
  // GPU acceleration
  gpu: 'will-change-transform transform-gpu',
  
  // Contain layout
  contain: 'contain-layout contain-style',
  
  // Smooth animations
  smooth: 'transition-all duration-200 ease-out',
  
  // Touch optimizations
  touch: 'touch-action-manipulation select-none',
} as const;

/**
 * Hook para detectar breakpoint actual
 */
export function useBreakpoint() {
  if (typeof window === 'undefined') return 'lg';
  
  const width = window.innerWidth;
  
  if (width < 640) return 'xs';
  if (width < 768) return 'sm';
  if (width < 1024) return 'md';
  if (width < 1280) return 'lg';
  if (width < 1536) return 'xl';
  return '2xl';
}

/**
 * Función para generar clases de componente
 */
export function createComponentClasses(
  component: keyof typeof componentStyles,
  variant: string = 'default',
  size: string = 'md',
  customClasses?: string
) {
  const styles = componentStyles[component];
  if (!styles) return '';
  
  const baseClasses = styles.base || '';
  
  // Type-safe access to variants
  const variantClasses = 'variants' in styles && styles.variants 
    ? (styles.variants as Record<string, string>)[variant] || ''
    : '';
    
  // Type-safe access to sizes
  const sizeClasses = 'sizes' in styles && styles.sizes
    ? (styles.sizes as Record<string, string>)[size] || ''
    : '';
  
  return cn(baseClasses, variantClasses, sizeClasses, customClasses);
}

/**
 * Exportar todo para facilitar el uso
 */
export {
  designTokens as tokens,
  componentStyles as components,
  themeUtils as theme,
  responsiveUtils as responsive,
  a11yUtils as a11y,
  performanceUtils as performance,
};

// Backwards compatibility
export const colors = designTokens.colors;
export const spacing = designTokens.spacing;
export const typography = designTokens.typography;
export const shadows = designTokens.shadows;
export const breakpoints = designTokens.breakpoints;

export default {
  tokens: designTokens,
  components: componentStyles,
  theme: themeUtils,
  responsive: responsiveUtils,
  a11y: a11yUtils,
  performance: performanceUtils,
  cn,
  useBreakpoint,
  createComponentClasses,
};
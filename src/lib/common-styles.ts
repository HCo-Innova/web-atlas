/**
 * ATLAS Agro - Sistema de estilos común
 * Centraliza todas las clases Tailwind reutilizables siguiendo DRY
 * Usando design-system unificado como fuente única de verdad
 */

import { cn, createComponentClasses } from './design-system';

/**
 * Re-exportar cn utility para conveniencia
 */
export { cn };

/**
 * Estilos para navegación - optimizados y consistentes
 */
export const navigationStyles = {
  base: cn(
    'relative px-2 py-1.5 text-sm font-medium transition-all duration-200',
    'text-neutral-700 dark:text-neutral-300',
    'hover:text-primary-500 dark:hover:text-primary-400',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-2',
    'focus:ring-offset-white dark:focus:ring-offset-neutral-900'
  ),
  
  desktop: cn(
    'rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/20'
  ),
  
  mobile: cn(
    'rounded-lg px-4 py-3 text-base hover:bg-neutral-50 dark:hover:bg-neutral-800'
  ),
  
  active: cn(
    'text-primary-500 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20'
  ),
} as const;

/**
 * Estilos para botones interactivos
 */
export const interactiveStyles = {
  button: cn(
    'rounded-lg transition-colors duration-200',
    'text-neutral-600 dark:text-neutral-400',
    'hover:text-primary-500 dark:hover:text-primary-400',
    'hover:bg-neutral-50 dark:hover:bg-neutral-800/50',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/20'
  ),
  
  icon: cn(
    'transition-transform duration-200 ease-out'
  ),
} as const;

/**
 * Estilos para contenedores - mobile-first
 */
export const containerStyles = {
  main: cn(
    'w-full max-w-7xl mx-auto',
    'px-4 sm:px-6 lg:px-8'
  ),
  
  section: cn(
    'py-16 sm:py-20 lg:py-24'
  ),
  
  content: cn(
    'space-y-8 sm:space-y-12 lg:space-y-16'
  ),
} as const;

/**
 * Estilos para dropdowns y menús
 */
export const dropdownStyles = {
  container: cn(
    'absolute right-0 mt-2 w-48',
    'bg-white dark:bg-neutral-800',
    'border border-neutral-200 dark:border-neutral-700',
    'rounded-lg shadow-lg z-50',
    'animate-in fade-in-0 zoom-in-95 duration-200'
  ),
  
  item: cn(
    'w-full flex items-center space-x-3 px-4 py-2 text-left text-sm',
    'text-neutral-700 dark:text-neutral-300',
    'hover:bg-neutral-50 dark:hover:bg-neutral-700',
    'transition-colors duration-150',
    'first:rounded-t-lg last:rounded-b-lg'
  ),
  
  separator: cn(
    'h-px bg-neutral-200 dark:bg-neutral-700 my-1'
  ),
} as const;

/**
 * Estilos para estados comunes
 */
export const stateStyles = {
  loading: cn('animate-pulse'),
  disabled: cn('opacity-50 cursor-not-allowed'),
  active: cn('ring-2 ring-primary-500 ring-offset-2'),
  focus: cn('focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'),
} as const;

/**
 * Estilos para grids responsive
 */
export const gridStyles = {
  auto: cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'),
  two: cn('grid grid-cols-1 sm:grid-cols-2 gap-6'),
  three: cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'),
  four: cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'),
} as const;

/**
 * Utilidades para crear clases de componentes usando el design system
 */
export const createButton = (variant = 'primary', size = 'md', customClasses?: string) => 
  createComponentClasses('button', variant, size, customClasses);

export const createCard = (variant = 'default', padding = 'md', customClasses?: string) => 
  createComponentClasses('card', variant, padding, customClasses);

export const createInput = (variant = 'default', size = 'md', customClasses?: string) => 
  createComponentClasses('input', variant, size, customClasses);

/**
 * Backward compatibility exports
 */
export const interactiveButtonStyles = interactiveStyles.button;
export const navigationLinkStyles = navigationStyles.base;
export const mobileLinkStyles = cn(navigationStyles.base, navigationStyles.mobile);
export const focusStyles = stateStyles.focus;
export const disabledStyles = stateStyles.disabled;

/**
 * Legacy function for state styles (mantenido para compatibilidad)
 */
export function getStateStyles(isActive: boolean, isDisabled: boolean = false) {
  if (isDisabled) return stateStyles.disabled;
  if (isActive) return navigationStyles.active;
  return navigationStyles.base;
}

/**
 * Legacy function for button variants (mantenido para compatibilidad)
 */
export function getButtonVariantStyles(variant: 'primary' | 'secondary' | 'outline' | 'ghost') {
  return createButton(variant);
}

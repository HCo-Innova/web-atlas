import { cn } from './design-system';

/**
 * Re-export cn utility for convenience
 */
export { cn };

/**
 * Estilos comunes reutilizables para aplicar DRY
 * Centraliza todas las clases repetitivas del sistema
 */

// Estilos base para botones interactivos
export const interactiveButtonStyles = cn(
  'rounded-lg transition-colors duration-200',
  'text-text-secondary dark:text-text-secondary-dark',
  'hover:text-primary dark:hover:text-primary-dark',
  'hover:bg-surface/50 dark:hover:bg-surface-dark/50'
);

// Estilos base para enlaces de navegación
export const navigationLinkStyles = cn(
  'text-text-secondary dark:text-text-secondary-dark',
  'hover:text-primary dark:hover:text-primary-dark',
  'transition-colors duration-200 font-medium'
);

// Estilos para enlaces móviles
export const mobileLinkStyles = cn(
  navigationLinkStyles,
  'block px-3 py-2 rounded-lg hover:bg-surface/50 dark:hover:bg-surface-dark/50'
);

// Estilos para dropdowns
export const dropdownStyles = cn(
  'absolute right-0 mt-2 w-48',
  'bg-surface dark:bg-surface-dark',
  'border border-border dark:border-border-dark',
  'rounded-lg shadow-lg z-50'
);

// Estilos para elementos de dropdown
export const dropdownItemStyles = cn(
  'w-full flex items-center space-x-3 px-4 py-2 text-left text-sm',
  'transition-colors duration-200'
);

// Estilos para elementos activos
export const activeItemStyles = cn(
  'bg-primary/10 text-primary dark:text-primary-dark'
);

// Estilos para elementos inactivos
export const inactiveItemStyles = cn(
  'text-text-secondary dark:text-text-secondary-dark',
  'hover:bg-surface/50 dark:hover:bg-surface-dark/50'
);

// Estilos para iconos SVG
export const iconStyles = {
  small: 'w-4 h-4',
  medium: 'w-5 h-5',
  large: 'w-6 h-6',
};

// Estilos para transiciones de iconos
export const iconTransitionStyles = 'transition-transform duration-200';

// Estilos para contenedores flex
export const flexContainerStyles = {
  center: 'flex items-center justify-center',
  between: 'flex items-center justify-between',
  start: 'flex items-center justify-start',
  end: 'flex items-center justify-end',
  column: 'flex flex-col items-center justify-center',
};

// Estilos para espaciado común
export const spacingStyles = {
  xs: 'space-x-1',
  sm: 'space-x-2',
  md: 'space-x-4',
  lg: 'space-x-6',
  xl: 'space-x-8',
};

// Estilos para padding común
export const paddingStyles = {
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-3',
  lg: 'p-4',
  xl: 'p-6',
};

// Estilos para bordes comunes
export const borderStyles = {
  default: 'border border-border dark:border-border-dark',
  top: 'border-t border-border dark:border-border-dark',
  bottom: 'border-b border-border dark:border-border-dark',
  left: 'border-l border-border dark:border-border-dark',
  right: 'border-r border-border dark:border-border-dark',
};

// Estilos para sombras comunes
export const shadowStyles = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
};

// Estilos para estados de focus
export const focusStyles = cn(
  'focus:outline-none focus:ring-2 focus:ring-primary/20',
  'focus:ring-offset-2 focus:ring-offset-surface dark:focus:ring-offset-surface-dark'
);

// Estilos para estados disabled
export const disabledStyles = cn(
  'opacity-50 cursor-not-allowed',
  'hover:opacity-50 hover:cursor-not-allowed'
);

// Utilidad para combinar estilos de estado
export function getStateStyles(isActive: boolean, isDisabled: boolean = false) {
  if (isDisabled) return disabledStyles;
  if (isActive) return activeItemStyles;
  return inactiveItemStyles;
}

// Utilidad para estilos de botón con variantes
export function getButtonVariantStyles(variant: 'primary' | 'secondary' | 'text' | 'ghost') {
  const baseStyles = 'px-3 py-2 rounded-lg font-medium transition-colors duration-200';
  
  switch (variant) {
    case 'primary':
      return cn(baseStyles, 'bg-primary text-white hover:bg-primary/90');
    case 'secondary':
      return cn(baseStyles, 'border border-primary text-primary hover:bg-primary/10');
    case 'text':
      return cn(baseStyles, 'text-primary hover:bg-primary/10');
    case 'ghost':
      return cn(baseStyles, 'hover:bg-surface/50 dark:hover:bg-surface-dark/50');
    default:
      return baseStyles;
  }
}

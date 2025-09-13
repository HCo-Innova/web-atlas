/**
 * Optimizaciones CSS para eliminar duplicación
 * Centraliza utilidades que estaban duplicadas entre index.css y common-styles.ts
 */

// Utilidades de botones que estaban duplicadas
export const buttonUtilities = {
  primary: 'bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200',
  secondary: 'border-2 border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary hover:text-white focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200',
  text: 'text-primary hover:text-primary/80 font-medium focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200',
} as const;

// Utilidades de tarjetas que estaban duplicadas
export const cardUtilities = {
  base: 'bg-surface border border-border rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300',
  elevated: 'bg-surface border border-border rounded-xl shadow-elevated',
} as const;

// Utilidades de contenedores que estaban duplicadas
export const containerUtilities = {
  main: 'max-w-7xl mx-auto px-mobile-padding sm:px-tablet-padding lg:px-desktop-padding',
  section: 'py-mobile-section sm:py-tablet-section lg:py-desktop-section',
  sectionContainer: 'px-mobile-padding sm:px-tablet-padding lg:px-desktop-padding',
} as const;

// Utilidades de grid que estaban duplicadas
export const gridUtilities = {
  grid12: 'grid grid-cols-12 gap-4 md:gap-6 lg:gap-8',
  responsive: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8',
  responsive2: 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8',
  responsive3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8',
} as const;

// Utilidades de espaciado que estaban duplicadas
export const spacingUtilities = {
  section: 'space-y-8 md:space-y-12 lg:space-y-16',
  textCenter: 'text-center max-w-3xl mx-auto',
} as const;

// Utilidades de animaciones que estaban duplicadas
export const animationUtilities = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  scaleIn: 'animate-scale-in',
  hoverLift: 'hover:-translate-y-1 transition-transform duration-200',
  hoverGlow: 'hover:shadow-lg hover:shadow-primary/25 transition-shadow duration-200',
} as const;

// Utilidades de visibilidad que estaban duplicadas
export const visibilityUtilities = {
  mobileOnly: 'block sm:hidden',
  tabletUp: 'hidden sm:block',
  desktopUp: 'hidden lg:block',
  mobileTablet: 'block lg:hidden',
} as const;

// Utilidades de texto que estaban duplicadas
export const textUtilities = {
  responsive: 'text-sm sm:text-base lg:text-lg',
  responsiveLg: 'text-base sm:text-lg lg:text-xl',
  responsiveXl: 'text-lg sm:text-xl lg:text-2xl',
  gradient: 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent',
} as const;

// Utilidades de botones responsive que estaban duplicadas
export const buttonResponsiveUtilities = {
  responsive: 'w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3',
} as const;

// Utilidades de padding/margin que estaban duplicadas
export const spacingResponsiveUtilities = {
  p: 'p-4 sm:p-6 lg:p-8',
  px: 'px-4 sm:px-6 lg:px-8',
  py: 'py-4 sm:py-6 lg:py-8',
  m: 'm-4 sm:m-6 lg:m-8',
  mx: 'mx-4 sm:mx-6 lg:mx-8',
  my: 'my-4 sm:my-6 lg:my-8',
  space: 'space-y-4 sm:space-y-6 lg:space-y-8',
  spaceX: 'space-x-4 sm:space-x-6 lg:space-x-8',
} as const;

// Utilidades de scrollbar que estaban duplicadas
export const scrollbarUtilities = {
  hide: 'scrollbar-hide',
  custom: 'scrollbar-thin scrollbar-thumb-border scrollbar-track-background',
} as const;

// Utilidades de focus que estaban duplicadas
export const focusUtilities = {
  visible: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  ring: 'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
} as const;

// Utilidades de estados que estaban duplicadas
export const stateUtilities = {
  loading: 'animate-pulse',
  disabled: 'opacity-50 cursor-not-allowed',
} as const;

// Exportar todas las utilidades para uso en componentes
export const cssOptimizations = {
  button: buttonUtilities,
  card: cardUtilities,
  container: containerUtilities,
  grid: gridUtilities,
  spacing: spacingUtilities,
  animation: animationUtilities,
  visibility: visibilityUtilities,
  text: textUtilities,
  buttonResponsive: buttonResponsiveUtilities,
  spacingResponsive: spacingResponsiveUtilities,
  scrollbar: scrollbarUtilities,
  focus: focusUtilities,
  state: stateUtilities,
} as const;

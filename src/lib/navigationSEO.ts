/**
 * ATLAS Agro - Configuración unificada de navegación
 * Sistema centralizado, type-safe y optimizado para SEO
 */

export interface NavItem {
  id: string;
  routeId: string;
  description?: string;
  external?: boolean;
  href?: string; // Para enlaces externos
}

/**
 * Configuración principal de navegación
 * Fuente única de verdad para todas las rutas de la aplicación
 */
export const navigationConfig = {
  main: [
    { id: 'inicio', routeId: 'home', description: 'Página principal' },
    { id: 'nosotros', routeId: 'about', description: 'Conoce nuestra empresa' },
    { id: 'proceso', routeId: 'process', description: 'Proceso y operaciones' },
    { id: 'productos', routeId: 'products', description: 'Chía y sésamo orgánico' },
    { id: 'calidad', routeId: 'quality', description: 'Calidad y certificaciones' },
    { id: 'faq', routeId: 'faq', description: 'Preguntas frecuentes' },
    { id: 'contacto', routeId: 'contact', description: 'Información de contacto' },
  ] as NavItem[],
  
  footer: [
    { id: 'inicio', routeId: 'home' },
    { id: 'nosotros', routeId: 'about' },
    { id: 'proceso', routeId: 'process' },
    { id: 'productos', routeId: 'products' },
    { id: 'calidad', routeId: 'quality' },
    { id: 'faq', routeId: 'faq' },
    { id: 'contacto', routeId: 'contact' },
  ] as NavItem[],
  
  social: [
    { 
      id: 'linkedin', 
      routeId: 'linkedin', 
      external: true, 
      href: 'https://linkedin.com/company/atlas-agro',
      description: 'Síguenos en LinkedIn'
    },
    { 
      id: 'facebook', 
      routeId: 'facebook', 
      external: true, 
      href: 'https://facebook.com/atlasagro',
      description: 'Síguenos en Facebook'
    },
    { 
      id: 'instagram', 
      routeId: 'instagram', 
      external: true, 
      href: 'https://instagram.com/atlasagro',
      description: 'Síguenos en Instagram'
    },
  ] as NavItem[],
  
  legal: [
    { id: 'privacidad', routeId: 'privacy', description: 'Política de privacidad' },
    { id: 'terminos', routeId: 'terms', description: 'Términos y condiciones' },
  ] as NavItem[],
} as const;

/**
 * Utilidades para navegación
 */
export const navigationUtils = {
  /**
   * Obtiene un item de navegación por ID
   */
  getNavItem: (id: string, section: keyof typeof navigationConfig = 'main'): NavItem | undefined => {
    return navigationConfig[section].find(item => item.id === id);
  },

  /**
   * Verifica si un item de navegación es externo
   */
  isExternal: (item: NavItem): boolean => {
    return !!item.external;
  },

  /**
   * Obtiene todos los items de navegación principal
   */
  getMainNavigation: (): NavItem[] => {
    return navigationConfig.main;
  },

  /**
   * Obtiene items de navegación del footer
   */
  getFooterNavigation: (): NavItem[] => {
    return navigationConfig.footer;
  },

  /**
   * Obtiene items de redes sociales
   */
  getSocialNavigation: (): NavItem[] => {
    return navigationConfig.social;
  },

  /**
   * Obtiene la URL completa para un item externo
   */
  getExternalUrl: (item: NavItem): string => {
    return item.href || '#';
  },
} as const;

/**
 * Export por compatibilidad
 */
export const navigationItems = navigationConfig.main;

export default navigationConfig;
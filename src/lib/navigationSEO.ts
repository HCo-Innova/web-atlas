/**
 * Configuración de navegación profesional con rutas SEO
 */

export interface NavItem {
  id: string;
  routeId: string; // ID de ruta SEO
  description?: string;
  external?: boolean;
}

// Configuración principal de navegación
export const navigationConfig = {
  main: [
    { id: 'inicio', routeId: 'home', description: 'Página principal' },
    { id: 'nosotros', routeId: 'about', description: 'Conoce nuestra empresa' },
    { id: 'proceso', routeId: 'process', description: 'Proceso y operaciones' },
    { id: 'productos', routeId: 'products', description: 'Chía y sésamo orgánico' },
    { id: 'calidad', routeId: 'quality', description: 'Calidad y certificaciones' },
    { id: 'contacto', routeId: 'contact', description: 'Información de contacto' },
  ] as NavItem[],
  
  footer: [
    { id: 'inicio', routeId: 'home' },
    { id: 'nosotros', routeId: 'about' },
    { id: 'proceso', routeId: 'process' },
    { id: 'productos', routeId: 'products' },
    { id: 'calidad', routeId: 'quality' },
    { id: 'contacto', routeId: 'contact' },
  ] as NavItem[],
  
  social: [
    { id: 'linkedin', routeId: '', external: true },
    { id: 'facebook', routeId: '', external: true },
    { id: 'instagram', routeId: '', external: true },
  ] as NavItem[],
};

// Utilidades para navegación
export const navigationUtils = {
  /**
   * Obtiene un item de navegación por ID
   */
  getNavItem: (id: string, section: keyof typeof navigationConfig = 'main'): NavItem | undefined => {
    return navigationConfig[section].find(item => item.id === id);
  },

  /**
   * Verifica si una ruta es externa
   */
  isExternal: (item: NavItem): boolean => {
    return !!item.external;
  },
};

export default navigationConfig;
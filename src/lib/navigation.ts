/**
 * Configuración centralizada de navegación
 * Centraliza todas las rutas y configuraciones de navegación de la aplicación
 */

export interface NavItem {
  id: string;
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
}

// Configuración principal de navegación
export const navigationConfig = {
  main: [
    { id: 'inicio', label: 'Inicio', href: '#inicio', description: 'Página principal' },
    { id: 'nosotros', label: 'Nosotros', href: '#nosotros', description: 'Conoce nuestra empresa' },
    { id: 'proceso', label: 'Proceso', href: '#proceso', description: 'Proceso y operaciones' },
    { id: 'productos', label: 'Productos', href: '#productos', description: 'Chía y sésamo orgánico' },
    { id: 'calidad', label: 'Calidad', href: '#calidad', description: 'Calidad y certificaciones' },
    { id: 'contacto', label: 'Contacto', href: '#contacto', description: 'Información de contacto' },
  ] as NavItem[],
  
  footer: [
    { id: 'inicio', label: 'Inicio', href: '#inicio' },
    { id: 'nosotros', label: 'Nosotros', href: '#nosotros' },
    { id: 'proceso', label: 'Proceso', href: '#proceso' },
    { id: 'productos', label: 'Productos', href: '#productos' },
    { id: 'calidad', label: 'Calidad', href: '#calidad' },
    { id: 'contacto', label: 'Contacto', href: '#contacto' },
    { id: 'privacidad', label: 'Política de Privacidad', href: '/privacidad' },
    { id: 'terminos', label: 'Términos de Uso', href: '/terminos' },
  ] as NavItem[],
  
  social: [
    { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/company/atlas-agro', external: true },
    { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/atlasagro', external: true },
    { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/atlasagro', external: true },
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
  isExternal: (href: string): boolean => {
    return href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  },

  /**
   * Obtiene la ruta activa basada en la URL actual
   */
  getActiveRoute: (pathname: string): string => {
    // Para rutas hash, extraer el ID
    if (pathname.includes('#')) {
      return pathname.split('#')[1] || 'inicio';
    }
    
    // Para rutas normales, mapear a IDs
    const routeMap: Record<string, string> = {
      '/': 'inicio',
      '/nosotros': 'nosotros',
      '/productos': 'productos',
      '/calidad': 'calidad',
      '/contacto': 'contacto',
    };
    
    return routeMap[pathname] || 'inicio';
  },
};

// Exportar configuración por defecto
export default navigationConfig;

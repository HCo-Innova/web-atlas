import { routeUtils } from '../lib/seoRoutes';

/**
 * URL Manager Profesional - Mejores prácticas SEO multiidioma
 * URLs completamente traducidas: /es/productos, /en/products
 */

export interface URLManagerReturn {
  getCurrentLanguage: () => 'es' | 'en';
  getCurrentRoute: () => string;
  navigateToRoute: (routeId: string, language?: 'es' | 'en') => void;
  changeLanguage: (newLanguage: 'es' | 'en') => void;
  buildRouteURL: (routeId: string, language: 'es' | 'en') => string;
  initializeURL: () => { language: 'es' | 'en'; route: string };
}

/**
 * Hook profesional para URLs SEO multiidioma
 */
export function useURLManager(): URLManagerReturn {
  const validLanguages: ('es' | 'en')[] = ['es', 'en'];
  const defaultLanguage: 'es' | 'en' = 'es';

  /**
   * Extrae idioma de la URL
   */
  const getCurrentLanguage = (): 'es' | 'en' => {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const lang = pathParts[0] as 'es' | 'en';
    
    return validLanguages.includes(lang) ? lang : defaultLanguage;
  };

  /**
   * Obtiene la ruta actual
   */
  const getCurrentRoute = (): string => {
    const path = window.location.pathname;
    return routeUtils.getRouteIdFromPath(path);
  };

  /**
   * Construye URL completa para una ruta
   */
  const buildRouteURL = (routeId: string, language: 'es' | 'en'): string => {
    return routeUtils.buildURL(routeId, language);
  };

  /**
   * Navega a una ruta específica
   */
  const navigateToRoute = (routeId: string, language?: 'es' | 'en'): void => {
    const targetLanguage = language || getCurrentLanguage();
    const url = buildRouteURL(routeId, targetLanguage);
    
    window.history.pushState(
      { routeId, language: targetLanguage },
      '',
      url
    );
  };

  /**
   * Cambia idioma manteniendo la ruta actual
   */
  const changeLanguage = (newLanguage: 'es' | 'en'): void => {
    const currentRoute = getCurrentRoute();
    const newURL = buildRouteURL(currentRoute, newLanguage);
    
    window.history.pushState(
      { routeId: currentRoute, language: newLanguage },
      '',
      newURL
    );
  };

  /**
   * Inicializa URL correcta
   */
  const initializeURL = (): { language: 'es' | 'en'; route: string } => {
    const currentPath = window.location.pathname;
    const language = getCurrentLanguage();
    const route = getCurrentRoute();
    
    // Corregir URL si no tiene formato correcto
    const expectedURL = buildRouteURL(route, language);
    if (currentPath !== expectedURL) {
      window.history.replaceState(
        { routeId: route, language, corrected: true },
        '',
        expectedURL
      );
    }
    
    return { language, route };
  };

  return {
    getCurrentLanguage,
    getCurrentRoute,
    navigateToRoute,
    changeLanguage,
    buildRouteURL,
    initializeURL
  };
}
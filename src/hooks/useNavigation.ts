import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useURLManager } from './useURLManager';
import { routeUtils } from '../lib/seoRoutes';

type NavClickEvent = {
  preventDefault: () => void;
};

export interface UseNavigationReturn {
  navigateToRoute: (routeId: string) => void;
  handleNavClick: (event: NavClickEvent, routeId: string) => void;
  scrollToSection: (sectionId: string) => void;
}

/**
 * Hook profesional para navegación SEO con URLs traducidas y scroll suave
 */
export function useNavigation(): UseNavigationReturn {
  const { i18n } = useTranslation();
  const { navigateToRoute: urlNavigateToRoute, initializeURL } = useURLManager();

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, []);

  const navigateToRoute = useCallback((routeId: string) => {
    const currentLanguage = (i18n.language as 'es' | 'en') || 'es';
    
    // Actualizar URL
    urlNavigateToRoute(routeId, currentLanguage);
    
    // Hacer scroll a la sección
    const sectionId = routeUtils.getSectionId(routeId);
    scrollToSection(sectionId);
  }, [i18n.language, urlNavigateToRoute, scrollToSection]);

  const handleNavClick = useCallback((event: NavClickEvent, routeId: string) => {
    event.preventDefault();
    navigateToRoute(routeId);
  }, [navigateToRoute]);

  // Inicializar URLs correctas al cargar
  useEffect(() => {
    const { language } = initializeURL();
    
    // Sincronizar idioma de i18n con URL
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [i18n, initializeURL]);

  return {
    navigateToRoute,
    handleNavClick,
    scrollToSection
  };
}
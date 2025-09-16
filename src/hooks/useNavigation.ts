import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useURLManager } from './useURLManager';
import { useScrollToSection } from './useScrollToSection';
import { routeUtils } from '../lib/seoRoutes';

type NavClickEvent = {
  preventDefault: () => void;
};

export interface UseNavigationReturn {
  navigateToRoute: (routeId: string) => void;
  handleNavClick: (event: NavClickEvent, routeId: string) => void;
  scrollToSection: (sectionId: string) => void;
}

// Navigation logger disabled for production

/**
 * ATLAS Agro - Hook de navegación con LOGGING EXTENSIVO
 */
export function useNavigation(): UseNavigationReturn {
  const { i18n } = useTranslation();
  const { initializeURL } = useURLManager();
  const { scrollToSection: scrollToSectionOptimized } = useScrollToSection();

  const scrollToSection = useCallback((sectionId: string) => {
    scrollToSectionOptimized(sectionId, { behavior: 'smooth' });
  }, [scrollToSectionOptimized]);

  const navigateToRoute = useCallback((routeId: string) => {
    const currentLanguage = (i18n.language as 'es' | 'en') || 'es';
    
    // Convertir route a section según idioma actual
    const sectionId = routeUtils.getSectionId(routeId, currentLanguage);
    
    // Hacer scroll directo a la sección
    scrollToSection(sectionId);
  }, [i18n.language, scrollToSection]);

  const handleNavClick = useCallback((event: NavClickEvent, routeId: string) => {
    event.preventDefault();
    navigateToRoute(routeId);
  }, [navigateToRoute]);

  // Inicializar URLs al cargar
  useEffect(() => {
    const { language } = initializeURL();
    
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
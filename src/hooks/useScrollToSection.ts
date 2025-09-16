import { useCallback } from 'react';

/**
 * ATLAS Agro - Hook de scroll robusto (header fijo compatible)
 * Estrategia: scrollIntoView con scroll-margin-top (CSS) + fallbacks nativos/polyfill
 */

interface ScrollOptions {
  behavior?: 'auto' | 'smooth';
  duration?: number;
  additionalOffset?: number;
}

// Scroll logger disabled for production

export function useScrollToSection() {
  const scrollToSection = useCallback((sectionId: string, options: ScrollOptions = {}) => {
    const { behavior = 'smooth', additionalOffset = 0 } = options;

    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }

    // Altura del header desde CSS var (fallback a medir header)
    const getHeaderHeight = (): number => {
      const cssVar = getComputedStyle(document.documentElement).getPropertyValue('--scroll-padding-top');
      const parsed = parseInt((cssVar || '').trim(), 10);
      if (!Number.isNaN(parsed) && parsed > 0) return parsed;
      const header = document.querySelector('header');
      return header ? header.getBoundingClientRect().height || 80 : 80;
    };

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Si ya estamos casi en el target, evita trabajo
    const rect = element.getBoundingClientRect();
    const currentY = window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = getHeaderHeight();
    const approxTarget = Math.max(0, rect.top + currentY - (headerHeight + additionalOffset));
    const distance = Math.abs(approxTarget - currentY);
    
    if (distance < 10) {
      const url = `${window.location.pathname}${window.location.search}#${sectionId}`;
      window.history.replaceState(null, '', url);
      return;
    }

    // Actualiza URL
    const targetUrl = `${window.location.pathname}${window.location.search}#${sectionId}`;
    window.history.replaceState(null, '', targetUrl);

    // Cálculo preciso de posición target
    const targetPosition = Math.max(0, (element.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop)) - (headerHeight + additionalOffset));

    // Estrategia diferenciada por dispositivo
    if (isTouchDevice) {
      // MÓVILES: Múltiples estrategias para asegurar que funcione
      window.scrollTo(0, targetPosition);
      
      // Fallback con setTimeout para dispositivos problemáticos
      setTimeout(() => {
        window.scrollTo(0, targetPosition);
      }, 50);
      
      // scrollIntoView como último recurso
      setTimeout(() => {
        if (Math.abs(window.scrollY - targetPosition) > 50) {
          element.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      }, 100);
    } else {
      // DESKTOP: Smooth scroll si está habilitado
      if (!prefersReducedMotion && behavior === 'smooth') {
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      } else {
        window.scrollTo(0, targetPosition);
      }
    }
  }, []);

  return { scrollToSection };
}

// Función removida - ya no se utiliza en el código actual

export default useScrollToSection;

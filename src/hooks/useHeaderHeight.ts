import { useEffect } from 'react';

/**
 * ATLAS Agro - Hook para monitoreo dinámico de altura del header
 * Actualiza CSS variables automáticamente cuando cambia el tamaño
 */
export function useHeaderHeight() {
  useEffect(() => {
    const measureHeader = () => {
      const header = document.querySelector('header');
      
      if (header) {
        const height = header.getBoundingClientRect().height;
        // Variables CSS unificadas para compensación de scroll
        document.documentElement.style.setProperty('--header-height', `${height}px`);
        // Añadimos un margen de seguridad de 12px para sombras/transiciones
        const safePadding = Math.round(height + 12);
        document.documentElement.style.setProperty('--scroll-padding-top', `${safePadding}px`);
        return height;
      }
      return 0;
    };

    measureHeader();

    const header = document.querySelector('header');
    let resizeObserver: ResizeObserver | null = null;

    if (header && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => measureHeader());
      resizeObserver.observe(header);
    }

    const handleResize = () => measureHeader();
    window.addEventListener('resize', handleResize);

    if ('fonts' in document) {
      document.fonts.ready.then(() => measureHeader());
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
}
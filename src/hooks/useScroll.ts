import { useState, useEffect, useRef } from 'react';

/**
 * Hook profesional para manejo de scroll con auto-hide header
 * Implementación optimizada y responsiva
 */
export function useScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [showHeader, setShowHeader] = useState(true);

  const lastScrollY = useRef(0);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Inicializar valores
    const initialScrollY = window.scrollY;
    lastScrollY.current = initialScrollY;
    setScrollY(initialScrollY);
    setIsScrolled(initialScrollY > 10);
    isInitialized.current = true;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const prevScrollY = lastScrollY.current;
      
      // Siempre actualizar posición actual
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 10);
      
      // Solo procesar si hay cambio real de posición
      if (currentScrollY === prevScrollY) return;
      
      // Determinar dirección del scroll
      const isScrollingDown = currentScrollY > prevScrollY;
      const isScrollingUp = currentScrollY < prevScrollY;
      
      // Actualizar dirección
      if (isScrollingDown) {
        setDirection('down');
      } else if (isScrollingUp) {
        setDirection('up');
      }
      
      // Auto-hide logic simplificada y directa
      if (currentScrollY <= 80) {
        // Zona superior: siempre mostrar
        setShowHeader(true);
      } else {
        // Después de 80px: controlar según dirección
        if (isScrollingDown) {
          setShowHeader(false);
        } else if (isScrollingUp) {
          setShowHeader(true);
        }
      }
      
      // Actualizar posición previa
      lastScrollY.current = currentScrollY;
    };

    // Escuchar eventos de scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {
    scrollY,
    isScrolled,
    direction,
    isScrollingDown: direction === 'down',
    isScrollingUp: direction === 'up',
    showHeader
  };
}

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook profesional para manejo de scroll con auto-hide header
 * Implementación optimizada y responsiva
 */
export function useScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [showHeader, setShowHeader] = useState(true);
  const [forceShowHeader, setForceShowHeader] = useState(false);

  const lastScrollY = useRef(0);
  const isInitialized = useRef(false);
  const forceShowTimer = useRef<number | null>(null);
  
  // 🔍 LOGGING SILENCIADO - comportamiento nativo correcto
  const logScrollInfo = useCallback((_message: string, _data?: Record<string, unknown>) => {
    // console.log(`📊 [SCROLL-DEBUG] ${_message}`, _data || '');
  }, []);

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
      
      // Solo procesar si hay cambio real de posición (EARLY RETURN)
      if (currentScrollY === prevScrollY) {
        return; // ⚡ SKIP IMMEDIATAMENTE - no hacer setState innecesarios
      }
      
      // BATCH de estados en una sola operación
      const wasScrolled = currentScrollY > 10;
      setScrollY(currentScrollY);
      setIsScrolled(wasScrolled);
      
      // Determinar dirección del scroll con minimal processing
      const isScrollingDown = currentScrollY > prevScrollY;
      
      // Comportamiento nativo del browser es correcto - no necesita logs
      
      // SOLO actualizar dirección si cambió (evitar setState innecesarios)
      if (isScrollingDown) {
        setDirection('down');
      } else {
        setDirection('up');
      }
      
      // Auto-hide logic OPTIMIZADO - minimal state changes
      if (currentScrollY <= 80) {
        // Zona superior: mostrar (solo si no está ya mostrado)
        if (!showHeader) setShowHeader(true);
        // Limpiar force show si estamos en la zona superior
        if (forceShowHeader) {
          setForceShowHeader(false);
          if (forceShowTimer.current) {
            clearTimeout(forceShowTimer.current);
            forceShowTimer.current = null;
          }
        }
      } else {
        // Después de 80px: controlar según dirección, PERO respetar forceShowHeader
        if (forceShowHeader) {
          // Si está forzado a mostrar, mantener visible
          if (!showHeader) setShowHeader(true);
        } else {
          // Comportamiento normal de auto-hide
          if (isScrollingDown && showHeader) {
            setShowHeader(false);
          } else if (!isScrollingDown && !showHeader) {
            setShowHeader(true);
          }
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
  }, [logScrollInfo, showHeader, forceShowHeader]);

  // Función para forzar mostrar header (útil después de navegación móvil)
  const forceShowHeaderFor = useCallback((duration: number = 3000) => {
    setForceShowHeader(true);
    setShowHeader(true);
    
    // Limpiar timer anterior si existe
    if (forceShowTimer.current) {
      clearTimeout(forceShowTimer.current);
    }
    
    // Configurar nuevo timer
    forceShowTimer.current = setTimeout(() => {
      setForceShowHeader(false);
      forceShowTimer.current = null;
    }, duration);
  }, []);

  return {
    scrollY,
    isScrolled,
    direction,
    isScrollingDown: direction === 'down',
    isScrollingUp: direction === 'up',
    showHeader,
    forceShowHeaderFor
  };
}

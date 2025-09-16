import { useEffect, useState } from 'react';
import { cn } from '../lib/design-system';

/**
 * ScrollIndicator: Icono fijo que sugiere navegación/scroll.
 * Visible en toda la página y se oculta cuando la sección #contacto o #footer
 * entran en el viewport (o si no existen las secciones, permanece visible siempre).
 */
export function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const contact = document.getElementById('contacto');
    const footer = document.getElementById('footer');
    
    // Si no existen las secciones, mantener visible
    if (!contact && !footer) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Ocultar si cualquiera de las secciones está visible (al menos 20% en pantalla)
        const anySectionVisible = entries.some(entry => entry.isIntersecting);
        setVisible(!anySectionVisible);
      },
      {
        threshold: 0.2,
      }
    );

    // Observar ambas secciones si existen
    if (contact) observer.observe(contact);
    if (footer) observer.observe(footer);
    
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        'fixed bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8',
        'animate-bounce pointer-events-none z-40'
      )}
      aria-hidden="true"
    >
      <div className="w-6 h-10 border-2 border-text-secondary dark:border-text-secondary-dark rounded-full flex justify-center">
        <div className="w-1 h-3 bg-text-secondary dark:bg-text-secondary-dark rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
  );
}

export default ScrollIndicator;

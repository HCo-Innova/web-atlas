import { useEffect, useState } from 'react';
import { cn } from '../lib/design-system';

/**
 * ScrollIndicator: Icono fijo que sugiere navegación/scroll.
 * Visible en toda la página y se oculta únicamente cuando la sección #contacto
 * entra en el viewport (o si no existe la sección, permanece visible siempre).
 */
export function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const contact = document.getElementById('contacto');
    if (!contact) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Ocultar cuando Contacto esté visible (al menos 20% en pantalla)
        setVisible(!entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(contact);
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

import { Navigation } from './Navigation';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../lib/design-system';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function MobileMenu({ isOpen, onClose, className }: MobileMenuProps) {
  
  useEffect(() => {
    if (isOpen) {
      const header = document.querySelector('header');
      if (header) {
        const rect = header.getBoundingClientRect();
        // Aplicar la altura usando CSS custom property en el documento
        document.documentElement.style.setProperty('--mobile-menu-top', `${rect.height}px`);
      }
    }
  }, [isOpen]);



  if (!isOpen) return null;

  // Renderizar usando Portal para salir completamente del flujo del header
  return createPortal(
    <div 
      className={cn(
        'md:hidden fixed z-50',
        'inset-x-0 w-full max-w-full',
        'min-h-[60px]',
        'bg-background dark:bg-background-dark',
        'border-t border-border dark:border-border-dark',
        'shadow-lg transition-all duration-200 ease-in-out overflow-hidden',
        '[top:var(--mobile-menu-top,64px)]',
        className
      )}
      data-mobile-menu
    >
      <div className="bg-background dark:bg-background-dark p-4 min-h-[50px] text-text-primary dark:text-text-primary-dark">
        <Navigation 
          variant="mobile" 
          onItemClick={onClose}
        />
      </div>
    </div>,
    document.body
  );
}

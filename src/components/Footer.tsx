import { cn } from '../lib/design-system';

interface FooterProps {
  className?: string;
}

/**
 * Footer con copyright siguiendo mejores prácticas web
 */
export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      className={cn(
        // Estructura básica del footer
        'w-full border-t border-border dark:border-border-dark',
        'bg-surface dark:bg-surface-dark',
        'py-1.5 px-4',
        // Asegurar que siempre esté al final
        'mt-auto',
        className
      )}
      role="contentinfo"
      aria-label="Información de copyright"
    >
      <div className="container-main">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Copyright text siguiendo mejores prácticas */}
          <p className={cn(
            // Tipografía pequeña y sutil
            'text-xs text-text-secondary dark:text-text-secondary-dark',
            // Espaciado mínimo
            'leading-tight',
            // Asegurar legibilidad en todas las pantallas
            'max-w-full'
          )}>
            <span className="inline-flex items-center">
              © {currentYear} Copyright{' '}
              <a
                href="https://hco-innova.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  // Estilos del enlace
                  'ml-1 font-medium',
                  'text-primary dark:text-primary-dark',
                  'hover:text-primary/80 dark:hover:text-primary-dark/80',
                  'transition-colors duration-200',
                  // Estados de focus para accesibilidad
                  'focus:outline-none focus:ring-2 focus:ring-primary/20',
                  'focus:ring-offset-1 rounded-sm'
                )}
                aria-label="Visitar sitio web de HCo-Innova"
              >
                HCo-Innova
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
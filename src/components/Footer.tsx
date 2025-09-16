import { cn } from '../lib/design-system';
import { useTheme } from '../hooks/useTheme';
import { THEMES } from '../lib/constants';
import { useTranslation } from 'react-i18next';
import AtlasLogo from '../assets/Atlas-Logo.png';

interface FooterProps {
  className?: string;
}

/**
 * Footer con logo prominente y copyright siguiendo mejores prácticas web
 */
export function Footer({ className }: FooterProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isLightMode = theme === THEMES.light;
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      id="footer"
      className={cn(
        // Estructura del footer
        'w-full border-t border-border dark:border-border-dark',
        'bg-surface dark:bg-surface-dark',
        'py-8 sm:py-12',
        // Asegurar que siempre esté al final
        'mt-auto',
        className
      )}
      role="contentinfo"
      aria-label="Footer con información de la empresa"
    >
      {/* Decorativos sutiles */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute -top-10 left-1/4 w-48 h-48 bg-[radial-gradient(circle,rgba(74,119,41,0.4),transparent_70%)] rounded-full"></div>
        <div className="absolute -top-10 right-1/4 w-48 h-48 bg-[radial-gradient(circle,rgba(0,47,108,0.4),transparent_70%)] rounded-full"></div>
      </div>

      <div className="container-main relative">
        <div className="text-center space-y-8">
          {/* Logo prominente */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={AtlasLogo}
                alt="ATLAS Agro Logo"
                className="h-48 sm:h-56 lg:h-64 w-auto transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Mensaje de la empresa */}
          <div className="max-w-2xl mx-auto">
            <h3 className={cn(
              "text-lg sm:text-xl font-semibold text-text-primary dark:text-text-primary-dark mb-3",
              isLightMode ? "light-title-shadow" : ""
            )}>
              {t('footer.title', { defaultValue: 'Líderes en Granos y Semillas de Calidad' })}
            </h3>
            <p className={cn(
              "text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark leading-relaxed",
              isLightMode ? "light-subtitle-shadow" : ""
            )}>
              {t('footer.subtitle', { defaultValue: 'Del campo al mundo, cultivando excelencia y sostenibilidad en cada grano que producimos.' })}
            </p>
          </div>

          {/* Línea divisoria */}
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-border dark:to-border-dark"></div>
            <div className="w-2 h-2 rounded-full bg-primary dark:bg-primary-dark"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-border dark:to-border-dark"></div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-center">
            <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
              © {currentYear} ATLAS Agro Industrial S.A. {t('footer.rights')}.
            </p>
            <div className="hidden sm:block w-px h-4 bg-border dark:bg-border-dark"></div>
            <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
              {t('footer.developed_by')}{' '}
              <a
                href="https://hco-innova.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'font-medium text-primary dark:text-primary-dark hover:text-accent dark:hover:text-accent-dark transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-1 rounded-sm'
                )}
                aria-label="Visitar sitio web de HCo-Innova"
              >
                HCo-Innova
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
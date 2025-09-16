import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { ThemeToggleIcon } from './ui';
import { Navigation } from './Navigation';
import { LanguageSelector } from './LanguageSelector';
import { MobileMenu } from './MobileMenu';
import { Icon } from './ui/Icon';
import { cn } from '../lib/design-system';
import { useScroll } from '../hooks/useScroll';
import { useHeaderHeight } from '../hooks/useHeaderHeight';
import { useToggle } from '../hooks/useToggle';
import { useScrollToSection } from '../hooks/useScrollToSection';

interface HeaderProps {
  className?: string;
}

// Header logger removed for production

export function Header({ className }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { isOpen: isMobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useToggle();
  const { isScrolled, showHeader, forceShowHeaderFor } = useScroll();
  const { scrollToSection } = useScrollToSection();
  // Medir dinámicamente la altura del header y exponerla vía CSS vars
  useHeaderHeight();

  // Optimizar bloqueo de scroll para móviles
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Guardar posición actual del scroll
      const scrollY = window.scrollY;
      
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'hidden';
    } else {
      // Restaurar scroll
      const scrollY = document.body.style.top;
      
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      
      if (scrollY) {
        const targetScrollY = parseInt(scrollY || '0') * -1;
        window.scrollTo(0, targetScrollY);
      }
    }

    return () => {
      // Cleanup al desmontar
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    };
  }, [isMobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    toggleMobileMenu();
  };

  const handleMenuClose = () => {
    closeMobileMenu();
    // Después de cerrar el menú móvil, forzar mostrar header por 3 segundos
    setTimeout(() => {
      forceShowHeaderFor(3000);
    }, 150); // Pequeño delay para que se complete el cierre del menú
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentLanguage = (i18n.language as 'es' | 'en') || 'es';
    const sectionId = currentLanguage === 'en' ? 'home' : 'inicio';
    scrollToSection(sectionId);
    handleMenuClose(); // Close mobile menu if open
  };

  return (
    <header className={cn(
      // Posicionamiento fijo
      'fixed top-0 left-0 right-0 z-50 w-full',
      // Optimizaciones críticas para animación en móviles
      'will-change-transform transform-gpu backface-hidden',
      // Transición optimizada para móviles
      'transition-transform duration-150 ease-out',
      // Estilos base
      'bg-surface dark:bg-surface-dark',
      'border-b border-border dark:border-border-dark',
      // Backdrop blur según scroll
      isScrolled 
        ? 'backdrop-blur-md bg-opacity-95 dark:bg-opacity-95 shadow-sm' 
        : 'backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90',
      // Auto-hide: optimizado para dispositivos táctiles
      showHeader || isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full',
      // Permitir gestos de scroll desde el header (no bloquear touch)
      className
    )}>
      <div className="container-main">
        <div className="flex items-center h-14 md:h-16">
          {/* Logo */}
          <div className="min-w-0">
            <button 
              onClick={handleLogoClick}
              className="flex items-center space-x-1.5 sm:space-x-2 hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-offset-background-dark rounded-md"
            >
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary dark:text-primary-dark drop-shadow-sm">
                ATLAS
              </h1>
              <span className="hidden sm:inline text-sm sm:text-lg lg:text-xl text-text-secondary dark:text-text-secondary-dark font-semibold truncate max-w-[52vw] sm:max-w-none drop-shadow-sm">
                Agro Industrial S.A.
              </span>
            </button>
          </div>

          {/* Navigation and Controls Group */}
          <div className="flex items-center ml-auto space-x-1 sm:space-x-2 shrink-0">
            {/* Desktop Navigation */}
            <Navigation variant="desktop" />

            {/* Right side controls */}
            <div className="flex items-center space-x-1">
              {/* Language Selector */}
              <LanguageSelector compact className="flex" />

              {/* Theme Toggle */}
              <ThemeToggleIcon className="p-1.5 sm:p-2" />

              {/* Mobile Menu Button */}
              <button
                onClick={handleMobileMenuToggle}
                className={cn(
                  'md:hidden flex items-center justify-center h-9 w-9 sm:h-11 sm:w-11',
                  'text-text-primary dark:text-text-primary-dark',
                  'hover:text-primary dark:hover:text-primary-dark',
                  'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2',
                  'focus:ring-offset-background dark:focus:ring-offset-background-dark',
                  'transition-colors duration-200',
                  'p-1 sm:px-2 sm:py-2'
                )}
                aria-label={isMobileMenuOpen ? t('header.closeMenu') : t('header.menu')}
                aria-expanded={isMobileMenuOpen}
              >
                <Icon 
                  name={isMobileMenuOpen ? 'close' : 'menu'} 
                  size="lg" 
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={handleMenuClose}
      />
    </header>
  );
}
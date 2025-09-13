import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { ThemeToggleIcon } from './ui';
import { Navigation } from './Navigation';
import { LanguageSelector } from './LanguageSelector';
import { MobileMenu } from './MobileMenu';
import { Icon } from './ui/Icon';
import { cn } from '../lib/design-system';
import { useScroll } from '../hooks/useScroll';
import { useToggle } from '../hooks/useToggle';
import { interactiveButtonStyles } from '../lib/common-styles';
import { SIZES } from '../lib/constants';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { t } = useTranslation();
  const { isOpen: isMobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useToggle();
  const { isScrolled, showHeader } = useScroll();

  // Bloquear el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={cn(
      // Posicionamiento fijo
      'fixed top-0 left-0 right-0 z-50 w-full',
      // Optimizaciones para animación ULTRA SUAVE
      'will-change-transform transform-gpu',
      // Transición más rápida y directa
      'transition-transform duration-200 ease-in-out',
      // Estilos base
      'bg-surface dark:bg-surface-dark',
      'border-b border-border dark:border-border-dark',
      // Backdrop blur según scroll
      isScrolled 
        ? 'backdrop-blur-md bg-opacity-95 dark:bg-opacity-95 shadow-sm' 
        : 'backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90',
      // Auto-hide: lógica simplificada y directa
      showHeader || isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full',
      className
    )}>
      <div className="container-main">
        <div className="flex items-center h-14 md:h-16">
          {/* Logo */}
          <div className="min-w-0">
            <Link 
              to="/" 
              className="flex items-center space-x-1.5 sm:space-x-2"
              onClick={closeMobileMenu}
            >
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary dark:text-primary-dark">
                ATLAS
              </h1>
              <span className="inline text-xs sm:text-lg lg:text-xl text-text-secondary dark:text-text-secondary-dark font-semibold truncate max-w-[52vw] sm:max-w-none">
                Agro Industrial S.A.
              </span>
            </Link>
          </div>

          {/* Navigation and Controls Group */}
          <div className="flex items-center ml-auto space-x-1 sm:space-x-2 shrink-0">
            {/* Desktop Navigation */}
            <Navigation variant="desktop" />

            {/* Right side controls */}
            <div className="flex items-center space-x-0.5 sm:space-x-1">
              {/* Language Selector */}
              <LanguageSelector compact className="flex" />

              {/* Theme Toggle */}
              <ThemeToggleIcon className="p-1.5 sm:p-2" />

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className={cn(
                  'md:hidden flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11',
                  interactiveButtonStyles,
                  'text-text-primary dark:text-text-primary-dark',
                  SIZES.button.sm,
                  'p-1.5 sm:px-2 sm:py-2'
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
        onClose={closeMobileMenu}
      />
    </header>
  );
}
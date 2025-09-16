import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/common-styles';
import { navigationConfig, navigationUtils, type NavItem } from '../lib/navigationSEO';
import { useNavigation } from '../hooks/useNavigation';

interface NavigationProps {
  className?: string;
  itemClassName?: string;
  onItemClick?: () => void;
  variant?: 'desktop' | 'mobile';
  items?: NavItem[];
}

export function Navigation({ 
  className, 
  onItemClick, 
  variant = 'desktop', 
  items = navigationConfig.main 
}: NavigationProps) {
  const { t } = useTranslation();
  const { handleNavClick } = useNavigation();

  const isDesktop = variant === 'desktop';
  
  // Tailwind-first approach: all styles defined with utility classes
  const navClasses = cn(
    // Base navigation styles con spacing mínimo
    isDesktop 
      ? 'hidden md:flex md:items-center md:space-x-1 lg:space-x-2' 
      : 'flex flex-col space-y-2'
  );

  const linkClasses = cn(
    // Base link styles with Tailwind utilities - padding reducido
    'relative px-2 py-1.5 text-sm font-medium transition-all duration-200 nav-text-nowrap',
    'text-text-primary dark:text-text-primary-dark',
    'hover:text-primary dark:hover:text-primary-dark',
    'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2',
    'focus:ring-offset-background dark:focus:ring-offset-background-dark',
    // Desktop vs Mobile specific styles
    isDesktop 
      ? 'rounded-md hover:bg-primary/5 dark:hover:bg-primary-dark/5'
      : 'rounded-lg px-4 py-2.5 text-base hover:bg-surface-dark/5 dark:hover:bg-surface/5 min-h-[44px] flex items-center'
  );

  const handleItemClick = (e: React.MouseEvent<HTMLElement>, item: NavItem) => {
    // Cerrar menú PRIMERO para liberar scroll en móviles
    onItemClick?.();
    
    // Pequeño delay para que se complete el cierre del menú
    setTimeout(() => {
      if (!navigationUtils.isExternal(item)) {
        handleNavClick(e, item.routeId);
      }
    }, 100);
  };

  return (
    <nav className={cn(navClasses, className)} role="navigation">
      {items.map((item) => {
        if (navigationUtils.isExternal(item)) {
          return (
            <a
              key={item.id}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}
              onClick={() => onItemClick?.()}
            >
              {item.id === 'faq' && isDesktop 
                ? t('navigation.faq_short')
                : t(`navigation.${item.id}`)
              }
            </a>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            className={cn(linkClasses, 'border-0 bg-transparent text-left w-full')}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              e.stopPropagation();
              handleItemClick(e, item);
            }}
          >
            {item.id === 'faq' && isDesktop 
              ? t('navigation.faq_short')
              : t(`navigation.${item.id}`)
            }
          </button>
        );
      })}
    </nav>
  );
}

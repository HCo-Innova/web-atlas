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
      : 'flex flex-col space-y-3'
  );

  const linkClasses = cn(
    // Base link styles with Tailwind utilities - padding reducido
    'relative px-2 py-1.5 text-sm font-medium transition-all duration-200',
    'text-text-primary dark:text-text-primary-dark',
    'hover:text-primary dark:hover:text-primary-dark',
    'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2',
    'focus:ring-offset-background dark:focus:ring-offset-background-dark',
    // Desktop vs Mobile specific styles
    isDesktop 
      ? 'rounded-md hover:bg-primary/5 dark:hover:bg-primary-dark/5'
      : 'rounded-lg px-4 py-3 text-base hover:bg-surface-dark/5 dark:hover:bg-surface/5'
  );

  return (
    <nav className={cn(navClasses, className)} role="navigation">
      {items.map((item) => {
        if (navigationUtils.isExternal(item)) {
          return (
            <a
              key={item.id}
              href="#" // Enlaces externos se manejarán por separado
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}
              onClick={onItemClick}
            >
              {t(`navigation.${item.id}`)}
            </a>
          );
        }

        return (
          <a
            key={item.id}
            href="#" // Prevenir navegación por defecto
            className={linkClasses}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              handleNavClick(e, item.routeId);
              onItemClick?.();
            }}
          >
            {t(`navigation.${item.id}`)}
          </a>
        );
      })}
    </nav>
  );
}

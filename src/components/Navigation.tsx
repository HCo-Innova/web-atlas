import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/design-system';
import { navigationUtils, type NavItem } from '../lib/navigation';
import { navigationLinkStyles, mobileLinkStyles } from '../lib/common-styles';
import { navigationItems } from '../lib/navigationItems';

interface NavigationProps {
  className?: string;
  onItemClick?: () => void;
  variant?: 'desktop' | 'mobile';
  items?: NavItem[];
}

// navigationItems imported from separate file

export function Navigation({ className, onItemClick, variant = 'desktop', items = navigationItems }: NavigationProps) {
  const { t } = useTranslation();
  const linkClasses = variant === 'desktop' ? navigationLinkStyles : mobileLinkStyles;

  const renderLink = (item: NavItem) => {
    if (navigationUtils.isExternal(item.href)) {
      return (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClasses}
          onClick={onItemClick}
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.href}
        className={linkClasses}
        onClick={onItemClick}
        >
          {t(`navigation.${item.id}`)}
        </Link>
    );
  };

  return (
    <nav className={cn(
      variant === 'desktop' 
        ? "hidden md:flex items-center space-x-3" 
        : "space-y-1",
      className
    )}>
      {items.map(renderLink)}
    </nav>
  );
}

// navigationItems exported from separate file

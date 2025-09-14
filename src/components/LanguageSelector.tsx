import { useTranslation } from 'react-i18next';
import { cn } from '../lib/design-system';
import { useLanguage, useToggle, useURLManager } from '../hooks';
import { Icon } from './ui/Icon';

interface LanguageSelectorProps {
  compact?: boolean;
  className?: string;
}

export function LanguageSelector({ compact = false, className }: LanguageSelectorProps) {
  const { t } = useTranslation();
  const { isOpen, toggle, close } = useToggle();
  const { selectedLanguage, changeLanguage, languages } = useLanguage();
  const { changeLanguage: changeURLLanguage, getCurrentLanguage } = useURLManager();

  const handleLanguageChange = (langCode: string) => {
    // Cambiar idioma en i18n
    changeLanguage(langCode);
    
    // Actualizar URL con nuevo idioma
    changeURLLanguage(langCode as 'es' | 'en');
    
    close();
  };

  // Obtener idioma actual de la URL (más confiable que i18n.language)
  const currentLang = getCurrentLanguage();

  // Tailwind-first button styles
  const buttonClasses = cn(
    // Base button styles
    'relative flex items-center justify-center gap-1 rounded-lg',
    'border border-border dark:border-border-dark',
    'bg-surface dark:bg-surface-dark',
    'text-text-primary dark:text-text-primary-dark',
    'transition-all duration-200 ease-in-out',
    // Interactive states
    'hover:bg-primary/5 dark:hover:bg-primary-dark/5',
    'hover:border-primary/20 dark:hover:border-primary-dark/20',
    'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2',
    'focus:ring-offset-background dark:focus:ring-offset-background-dark',
    // Size variants
    compact 
      ? 'px-1.5 py-1 text-xs' 
      : 'px-3 py-2 text-sm'
  );

  // Tailwind-first dropdown styles
  const dropdownClasses = cn(
    'absolute right-0 top-full mt-2 z-50',
    'min-w-[140px] rounded-lg shadow-lg',
    'bg-surface dark:bg-surface-dark',
    'border border-border dark:border-border-dark',
    'py-1'
  );

  const itemClasses = cn(
    'w-full flex items-center gap-3 px-3 py-2 text-sm',
    'text-text-primary dark:text-text-primary-dark',
    'hover:bg-primary/5 dark:hover:bg-primary-dark/5',
    'transition-colors duration-150'
  );

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={toggle}
        className={buttonClasses}
        aria-label={t('header.selectLanguage')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Icon name="globe" size={compact ? "sm" : "md"} className="shrink-0" />
        <span className="font-medium">{currentLang.toUpperCase()}</span>
        <Icon 
          name="chevronDown" 
          size="sm" 
          className={cn(
            'shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className={dropdownClasses}>
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={cn(
                itemClasses,
                selectedLanguage === language.code && 
                'bg-primary/10 dark:bg-primary-dark/10 text-primary dark:text-primary-dark'
              )}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium">{t(`languages.${language.code}`)}</span>
              <span className="ml-auto text-xs opacity-60">
                {language.code.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


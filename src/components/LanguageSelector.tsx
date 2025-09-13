import { useTranslation } from 'react-i18next';
import { cn } from '../lib/design-system';
import { useLanguage, useToggle } from '../hooks';
import { Icon } from './ui/Icon';
import { interactiveButtonStyles, dropdownStyles, dropdownItemStyles, getStateStyles, iconTransitionStyles } from '../lib/common-styles';

interface LanguageSelectorProps {
  compact?: boolean;
  className?: string;
}

export function LanguageSelector({ compact = false, className }: LanguageSelectorProps) {
  const { t } = useTranslation();
  const { isOpen, toggle, close } = useToggle();
  const { selectedLanguage, currentLanguage, changeLanguage, languages } = useLanguage();

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    close();
  };

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={toggle}
        className={cn(
          interactiveButtonStyles,
          'flex items-center',
          // Espaciado entre icono/texto más compacto en mobile
          'space-x-1 sm:space-x-2',
          // Padding mínimo en mobile, manteniendo el modo compacto más pequeño que el normal
          compact
            ? 'px-1.5 py-1.5 sm:px-2 sm:py-2'
            : 'px-2.5 py-2 sm:px-3 sm:py-2'
        )}
        aria-label={t('header.selectLanguage')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Icon name="globe" size="md" />
        <span className="text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
        <Icon 
          name="chevronDown" 
          size="sm" 
          className={cn(iconTransitionStyles, isOpen && 'rotate-180')} 
        />
      </button>

      {isOpen && (
        <div className={dropdownStyles}>
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={cn(
                  dropdownItemStyles,
                  getStateStyles(selectedLanguage === lang.code)
                )}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{t(`languages.${lang.code}`)}</span>
                <span className="text-xs text-text-secondary dark:text-text-secondary-dark ml-auto">
                  {lang.code.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


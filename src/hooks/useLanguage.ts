import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES, DEFAULT_LANGUAGE } from '../lib/constants';
import { changeLanguage as changeLang } from '../lib/i18n';

/**
 * Hook personalizado para manejo de idiomas
 * Centraliza la lógica de cambio de idioma con i18next
 */
export function useLanguage() {
  const { i18n } = useTranslation();
  
  const selectedLanguage = i18n.language || DEFAULT_LANGUAGE;
  const currentLanguage = LANGUAGES.find(lang => lang.code === selectedLanguage) || LANGUAGES[0];

  const changeLanguage = useCallback((languageCode: string) => {
    changeLang(languageCode);
  }, []);

  return {
    selectedLanguage,
    currentLanguage,
    changeLanguage,
    languages: LANGUAGES,
  };
}

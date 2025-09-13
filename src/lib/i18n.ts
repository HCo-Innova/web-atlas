import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE, STORAGE_KEYS } from './constants';

// Importar archivos de traducción
import esTranslation from '../locales/es.json';
import enTranslation from '../locales/en.json';

const resources = {
  es: {
    translation: esTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem(STORAGE_KEYS.language) || DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    debug: false, // Deshabilitar logs de debug
    
    interpolation: {
      escapeValue: false, // React ya escapa los valores
    },
    
    // Configuración de namespaces
    defaultNS: 'translation',
    ns: ['translation'],
    
    // Configuración de detección de idioma
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

// Función para cambiar idioma
export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
  localStorage.setItem(STORAGE_KEYS.language, language);
};

// Función para obtener el idioma actual
export const getCurrentLanguage = () => {
  return i18n.language;
};

// Función para obtener idiomas disponibles
export const getAvailableLanguages = () => {
  return Object.keys(resources);
};

export default i18n;

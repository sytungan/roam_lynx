import i18next from 'i18next';

// Import translations
import { DEFAULT_LANGUAGE } from '../constants/defaults.js';
import enTranslation from './locales/en.js';
import viTranslation from './locales/vi.js';


// Initialize i18next
i18next.init({
  lng: DEFAULT_LANGUAGE,
  resources: {
    en: {
      translation: enTranslation
    },
    vi: {
      translation: viTranslation
    }
  },
  interpolation: {
    escapeValue: false
  },
  // Disable features that depend on Intl API
  compatibilityJSON: 'v3'
});

// Suppress warnings in console
i18next.on('initialized', () => {
  console.log('i18next initialized successfully with compatibility mode');
});

// Helper function to translate text
export const t = (key: string): string => {
  return i18next.t(key);
};

// Function to change language
export const changeLanguage = (lng: string): void => {
  console.log(`i18next changing language to: ${lng}`);
  try {
    i18next.changeLanguage(lng, (err) => {
      if (err) {
        console.error('Error in i18next.changeLanguage:', err);
      } else {
        console.log(`i18next language successfully changed to: ${lng}`);
      }
    });
  } catch (error) {
    console.error('Exception in changeLanguage:', error);
  }
};

// Get current language
export const getCurrentLanguage = (): string => {
  return i18next.language;
};

export default i18next; 
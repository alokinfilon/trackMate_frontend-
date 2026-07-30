import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations } from '../translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');

  // Load persisted locale on app mount
  useEffect(() => {
    const loadLocale = async () => {
      try {
        const savedLocale = await AsyncStorage.getItem('app_locale');
        if (savedLocale) {
          setLocale(savedLocale);
        }
      } catch (err) {
        console.warn('Failed to load locale from storage:', err);
      }
    };
    loadLocale();
  }, []);

  const changeLanguage = async (code) => {
    if (!['en', 'hi', 'gu'].includes(code)) return;
    try {
      setLocale(code);
      await AsyncStorage.setItem('app_locale', code);
    } catch (err) {
      console.warn('Failed to save locale to storage:', err);
    }
  };

  // Translate key helper (supports dot-notation, e.g. 'profile.personalInfo')
  const t = (key) => {
    const keys = key.split('.');
    let translationObj = translations[locale] || translations['en'];
    let result = translationObj;

    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        // Fallback to English dictionary if key is missing in chosen locale
        let fallbackObj = translations['en'];
        let fallbackResult = fallbackObj;
        for (const fk of keys) {
          if (fallbackResult && fallbackResult[fk] !== undefined) {
            fallbackResult = fallbackResult[fk];
          } else {
            fallbackResult = null;
            break;
          }
        }
        return fallbackResult !== null ? fallbackResult : key;
      }
    }

    return typeof result === 'string' ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

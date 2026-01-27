import React, { createContext, useState, useContext } from 'react';
import { translations } from '../translations/translations';

const LanguageContext = createContext();

export { LanguageContext };

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key, fallback) => {
    if (typeof key === 'string' && key.includes('.')) {
      const keys = key.split('.');
      let value = translations[language];
      for (const k of keys) {
        value = value?.[k];
      }
      return value || fallback || key;
    }
    
    if (typeof key === 'string' && translations[language]?.[key]) {
      return translations[language][key];
    }
    
    // Support for inline translations (old format)
    if (typeof key === 'string' && typeof fallback === 'string') {
      return language === 'en' ? key : fallback;
    }
    
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
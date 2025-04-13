
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { en, de, nl } from '../data/translations';

type Language = 'en' | 'de' | 'nl';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  // Use imported language objects
  const translations: Record<Language, any> = {
    en,
    de,
    nl,
  };
  
  // Translation function
  const t = (key: string): string => {
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    
    // Get the current language translation
    let translation: any = translations[language];
    
    // Navigate through the nested keys
    for (const k of keys) {
      if (translation && translation[k] !== undefined) {
        translation = translation[k];
      } else {
        // Key not found in current language
        translation = undefined;
        break;
      }
    }
    
    // If translation is found and is a string, return it
    if (typeof translation === 'string') {
      return translation;
    }
    
    // Try to find in English if not in current language
    if (language !== 'en') {
      let enTranslation: any = translations.en;
      
      // Navigate through the nested keys in English translations
      for (const k of keys) {
        if (enTranslation && enTranslation[k] !== undefined) {
          enTranslation = enTranslation[k];
        } else {
          // Key not found in English
          enTranslation = undefined;
          break;
        }
      }
      
      // If English translation is found and is a string, return it
      if (typeof enTranslation === 'string') {
        return enTranslation;
      }
    }
    
    // Return the key if no translation is found
    return key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

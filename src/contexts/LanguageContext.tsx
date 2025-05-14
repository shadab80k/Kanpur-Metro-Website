import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    appName: "Kanpur Metro App",
    tagline: "Fastest Way to Navigate Kanpur Metro",
    downloadAPK: "Download APK",
    appFeatures: "App Features",
    routePlanner: "Route Planner",
    routePlannerDesc: "Easily plan your journey from start to destination.",
    stationInfo: "Station Info",
    stationInfoDesc: "Get detailed information about all metro stations.",
    fareCalculator: "Fare Calculator",
    fareCalculatorDesc: "Quickly calculate fares between any two stations.",
    metroMap: "Metro Map",
    metroMapDesc: "View the interactive Kanpur Metro map.",
    screenshots: "App Screenshots",
    screenshotsPlaceholder: "Screenshot Slider / Gallery Placeholder",
    contactEmail: "Contact: contact@kanpurmetroapp.com",
    facebook: "Facebook",
    twitter: "Twitter",
    instagram: "Instagram",
    copyright: "Kanpur Metro App. All rights reserved.",
    switchToHindi: "हिन्दी",
    switchToEnglish: "English",
    languageToggle: "English / हिन्दी"
  },
  hi: {
    appName: "कानपुर मेट्रो ऐप",
    tagline: "कानपुर मेट्रो में नेविगेट करने का सबसे तेज़ तरीका",
    downloadAPK: "एपीके डाउनलोड करें",
    appFeatures: "ऐप की विशेषताएं",
    routePlanner: "मार्ग योजनाकार",
    routePlannerDesc: "आसानी से अपनी यात्रा की योजना बनाएं।",
    stationInfo: "स्टेशन की जानकारी",
    stationInfoDesc: "सभी मेट्रो स्टेशनों के बारे में विस्तृत जानकारी प्राप्त करें।",
    fareCalculator: "किराया कैलकुलेटर",
    fareCalculatorDesc: "किन्हीं दो स्टेशनों के बीच किराए की तुरंत गणना करें।",
    metroMap: "मेट्रो मानचित्र",
    metroMapDesc: "इंटरैक्टिव कानपुर मेट्रो मानचित्र देखें।",
    screenshots: "ऐप स्क्रीनशॉट",
    screenshotsPlaceholder: "स्क्रीनशॉट स्लाइडर / गैलरी प्लेसहोल्डर",
    contactEmail: "संपर्क: contact@kanpurmetroapp.com",
    facebook: "फेसबुक",
    twitter: "ट्विटर",
    instagram: "इंस्टाग्राम",
    copyright: "कानपुर मेट्रो ऐप। सर्वाधिकार सुरक्षित।",
    switchToHindi: "हिन्दी",
    switchToEnglish: "English",
    languageToggle: "अंग्रेजी / हिन्दी"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};


import React, { createContext, useState, useContext, useEffect } from 'react';
import { Station, Route, Language } from '@/types/metro';
import { orangeLineStations as stationsData, getRoute, calculateDistanceBetween } from '@/data/metroData';

interface MetroContextProps {
  stations: Station[];
  recentRoutes: Route[];
  saveRoute: (route: Route) => void;
  clearRecentRoutes: () => void;
  getLocalizedText: (key: string) => string;
  language: Language;
  setLanguage: (language: Language) => void;
  switchLanguage: () => void;
  selectedSource: Station | null;
  selectedDestination: Station | null;
  setSelectedSource: (station: Station | null) => void;
  setSelectedDestination: (station: Station | null) => void;
  planJourney: () => void;
  getNearestStation: (lat: number, lng: number) => Station | null;
}

const MetroContext = createContext<MetroContextProps | undefined>(undefined);

interface MetroProviderProps {
  children: React.ReactNode;
}

export const MetroProvider: React.FC<MetroProviderProps> = ({ children }) => {
  const [stations, setStations] = useState<Station[]>(stationsData);
  const [recentRoutes, setRecentRoutes] = useState<Route[]>(() => {
    const storedRoutes = localStorage.getItem('recentRoutes');
    return storedRoutes ? JSON.parse(storedRoutes) : [];
  });
  const [language, setLanguage] = useState<Language>("English");
  const [selectedSource, setSelectedSource] = useState<Station | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Station | null>(null);

  useEffect(() => {
    localStorage.setItem('recentRoutes', JSON.stringify(recentRoutes));
  }, [recentRoutes]);

  const saveRoute = (route: Route) => {
    setRecentRoutes(prevRoutes => {
      const isExisting = prevRoutes.some(r => r.source.id === route.source.id && r.destination.id === route.destination.id);
      if (isExisting) {
        return prevRoutes;
      }
      return [route, ...prevRoutes].slice(0, 5);
    });
  };

  const clearRecentRoutes = () => {
    setRecentRoutes([]);
  };

  const switchLanguage = () => {
    setLanguage(prev => prev === "English" ? "Hindi" : "English");
  };

  const planJourney = () => {
    if (selectedSource && selectedDestination) {
      const route = getRoute(selectedSource.id, selectedDestination.id);
      saveRoute(route);
      return route;
    }
    return null;
  };

  const getNearestStation = (lat: number, lng: number): Station | null => {
    // Simple implementation - in a real app, this would use actual geolocation calculations
    // For demo purposes, just return the first station
    return stations.length > 0 ? stations[0] : null;
  };

  const getLocalizedText = (key: string): string => {
    const translations: { [key: string]: { English: string; Hindi: string } } = {
      // Navigation and common items
      "Home": { English: "Home", Hindi: "होम" },
      "Plan Journey": { English: "Plan Journey", Hindi: "यात्रा योजना" },
      "Station Info": { English: "Station Info", Hindi: "स्टेशन की जानकारी" },
      "Info": { English: "Info", Hindi: "जानकारी" },
      
      // Station related translations
      "Station Information": { English: "Station Information", Hindi: "स्टेशन की जानकारी" },
      "Search stations...": { English: "Search stations...", Hindi: "स्टेशन खोजें..." },
      "stations found": { English: "stations found", Hindi: "स्टेशन मिले" },
      "Underground": { English: "Underground", Hindi: "भूमिगत" },
      "Elevated": { English: "Elevated", Hindi: "ऊंचा" },
      "No stations found": { English: "No stations found", Hindi: "कोई स्टेशन नहीं मिला" },
      
      // Journey planner translations
      "Set as Source": { English: "Set as Source", Hindi: "स्रोत के रूप में सेट करें" },
      "Set as Destination": { English: "Set as Destination", Hindi: "गंतव्य के रूप में सेट करें" },
      "Source": { English: "Source", Hindi: "स्रोत स्टेशन" },
      "Destination": { English: "Destination", Hindi: "गंतव्य स्टेशन" },
      "Select Source": { English: "Select Source", Hindi: "स्रोत स्टेशन चुनें" },
      "Select Destination": { English: "Select Destination", Hindi: "गंतव्य स्टेशन चुनें" },
      "Plan Your Journey": { English: "Plan Your Journey", Hindi: "अपनी यात्रा की योजना बनाएं" },
      "Find Route": { English: "Find Route", Hindi: "मार्ग खोजें" },
      
      // Route details translations
      "Route Details": { English: "Route Details", Hindi: "मार्ग विवरण" },
      "Board from Platform": { English: "Board from Platform", Hindi: "प्लेटफॉर्म से चढ़ें" },
      "Travel Time": { English: "Travel Time", Hindi: "यात्रा समय" },
      "Distance": { English: "Distance", Hindi: "दूरी" },
      "Stops": { English: "Stops", Hindi: "स्टॉप" },
      "Regular Fare": { English: "Regular Fare", Hindi: "नियमित किराया" },
      "Smart Card (10% off)": { English: "Smart Card (10% off)", Hindi: "स्मार्ट कार्ड (10% छूट)" },
      "Stations": { English: "Stations", Hindi: "स्टेशन" },
      "Start": { English: "Start", Hindi: "शुरू" },
      "End": { English: "End", Hindi: "अंत" },
      
      // Station details translations
      "Upcoming Trains": { English: "Upcoming Trains", Hindi: "आने वाली ट्रेनें" },
      "Destination Train": { English: "Destination", Hindi: "गंतव्य" },
      "Time": { English: "Time", Hindi: "समय" },
      "Platform": { English: "Platform", Hindi: "प्लेटफॉर्म" },
      "Timings": { English: "Timings", Hindi: "समय-सारणी" },
      "First Train": { English: "First Train", Hindi: "पहली ट्रेन" },
      "Last Train": { English: "Last Train", Hindi: "अंतिम ट्रेन" },
      "Frequency": { English: "Frequency", Hindi: "आवृत्ति" },
      "Nearby": { English: "Nearby", Hindi: "आस-पास" },
      "Gates": { English: "Gates", Hindi: "द्वार" },
      "Lifts & Escalators": { English: "Lifts & Escalators", Hindi: "लिफ्ट और एस्केलेटर" },
      "Platforms": { English: "Platforms", Hindi: "प्लेटफॉर्म" },
      "Facilities": { English: "Facilities", Hindi: "सुविधाएँ" },
      "Parking": { English: "Parking", Hindi: "पार्किंग" },
      "Normal Service": { English: "Normal Service", Hindi: "सामान्य सेवा" },
      
      // Navigation and general UI
      "Back": { English: "Back", Hindi: "वापस" },
      "Popular Routes": { English: "Popular Routes", Hindi: "लोकप्रिय मार्ग" },
      "Search routes...": { English: "Search routes...", Hindi: "मार्ग खोजें..." },
      "routes found": { English: "routes found", Hindi: "मार्ग मिले" },
      "No routes found": { English: "No routes found", Hindi: "कोई मार्ग नहीं मिला" },
      "Recent Journeys": { English: "Recent Journeys", Hindi: "हाल की यात्राएं" },
      "Clear": { English: "Clear", Hindi: "साफ़ करें" },
      "journeys found": { English: "journeys found", Hindi: "यात्राएं मिलीं" },
      "No recent journeys found": { English: "No recent journeys found", Hindi: "कोई हाल की यात्रा नहीं मिली" },
      "Plan a Journey": { English: "Plan a Journey", Hindi: "यात्रा की योजना बनाएं" },
      "View All": { English: "View All", Hindi: "सभी देखें" },
      
      // Dialogs and notifications
      "Clear Journey History?": { English: "Clear Journey History?", Hindi: "यात्रा इतिहास साफ़ करें?" },
      "This will remove all your recent journey records. This action cannot be undone.": { English: "This will remove all your recent journey records. This action cannot be undone.", Hindi: "यह आपकी सभी हाल की यात्रा रिकॉर्ड हटा देगा। इस क्रिया को उलटा नहीं किया जा सकता।" },
      "Cancel": { English: "Cancel", Hindi: "रद्द करें" },
      "Clear History": { English: "Clear History", Hindi: "इतिहास साफ़ करें" },
      "Journey history cleared": { English: "Journey history cleared", Hindi: "यात्रा इतिहास साफ़ कर दिया गया" },
      
      // Map related translations
      "Orange Line": { English: "Orange Line", Hindi: "ऑरेंज लाइन" },
      
      // Welcome message
      "Welcome to Kanpur Metro": { English: "Welcome to Kanpur Metro", Hindi: "कानपुर मेट्रो में आपका स्वागत है" },
      
      // Direction info
      "Towards Naubasta": { English: "Towards Naubasta", Hindi: "नौबस्ता की ओर" },
      "Towards IIT Kanpur": { English: "Towards IIT Kanpur", Hindi: "आईआईटी कानपुर की ओर" },
      
      // Fare calculator
      "Fare Calculator": { English: "Fare Calculator", Hindi: "किराया कैलकुलेटर" },
      "Fare Chart": { English: "Fare Chart", Hindi: "किराया चार्ट" },
      
      // Additional station info
      "Direction": { English: "Direction", Hindi: "दिशा" },
      "Towards": { English: "Towards", Hindi: "की ओर" },
      "Location": { English: "Location", Hindi: "स्थान" },
      "Gate": { English: "Gate", Hindi: "द्वार" },
      "Open": { English: "Open", Hindi: "खुला" },
      "Closed": { English: "Closed", Hindi: "बंद" },
      "Type": { English: "Type", Hindi: "प्रकार" },
      "Available": { English: "Available", Hindi: "उपलब्ध" },
      "Total": { English: "Total", Hindi: "कुल" },
      "Water": { English: "Water", Hindi: "पानी" },
      "Toilet": { English: "Toilet", Hindi: "शौचालय" },
      "Loading station information...": { English: "Loading station information...", Hindi: "स्टेशन की जानकारी लोड हो रही है..." },
      "View Full Station Information": { English: "View Full Station Information", Hindi: "पूरी स्टेशन जानकारी देखें" },
      "Kanpur Metro Map": { English: "Kanpur Metro Map", Hindi: "कानपुर मेट्रो मानचित्र" }
    };

    const translation = translations[key];
    if (translation) {
      return translation[language] || translation["English"] || key;
    }
    return key;
  };

  return (
    <MetroContext.Provider value={{ 
      stations, 
      recentRoutes, 
      saveRoute, 
      clearRecentRoutes, 
      getLocalizedText, 
      language, 
      setLanguage,
      switchLanguage,
      selectedSource, 
      selectedDestination, 
      setSelectedSource, 
      setSelectedDestination,
      planJourney,
      getNearestStation
    }}>
      {children}
    </MetroContext.Provider>
  );
};

export const useMetro = () => {
  const context = useContext(MetroContext);
  if (!context) {
    throw new Error("useMetro must be used within a MetroProvider");
  }
  return context;
};


import { useState } from "react";
import { Link } from "react-router-dom";
import { Route, Compass, Home, Info } from "lucide-react";
import { useMetro } from "@/contexts/MetroContext";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AppNavbar() {
  const { language, switchLanguage, getLocalizedText } = useMetro();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col">
      {/* Top navbar */}
      <div className="flex items-center justify-between p-4 bg-metro-orange text-white">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-2">
            <rect x="4" y="3" width="16" height="16" rx="2" />
            <path d="M4 11h16" />
            <path d="M12 3v8" />
            <path d="M8 19h8" />
          </svg>
          <h1 className="text-lg font-bold">{getLocalizedText("Welcome to Kanpur Metro")}</h1>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="text-sm font-medium px-3 py-1 rounded-full bg-white/20"
          >
            {language === "English" ? "EN" : "हि"}
          </button>
        </div>
      </div>
      
      {/* Language menu */}
      {isLangMenuOpen && (
        <div className="absolute top-14 right-4 bg-white rounded-lg shadow-lg z-20">
          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              switchLanguage();
              setIsLangMenuOpen(false);
            }}
          >
            {language === "English" ? "हिंदी" : "English"}
          </button>
        </div>
      )}
      
      {/* Bottom navbar - simplified and more mobile responsive */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center z-10 py-2">
        <Link to="/" className="flex flex-col items-center py-1 px-3">
          <Home className="h-6 w-6 text-metro-orange" />
          <span className="text-xs mt-1">{getLocalizedText("Home")}</span>
        </Link>
        
        <Link to="/journey" className="flex flex-col items-center py-1 px-3">
          <Route className="h-6 w-6 text-metro-orange" />
          <span className="text-xs mt-1">{getLocalizedText("Plan Journey")}</span>
        </Link>
        
        <Link to="/stations" className="flex flex-col items-center py-1 px-3">
          <Compass className="h-6 w-6 text-metro-orange" />
          <span className="text-xs mt-1">{getLocalizedText("Station Info")}</span>
        </Link>
        
        <Link to="/info" className="flex flex-col items-center py-1 px-3">
          <Info className="h-6 w-6 text-metro-orange" />
          <span className="text-xs mt-1">{getLocalizedText("Info")}</span>
        </Link>
      </div>
    </div>
  );
}

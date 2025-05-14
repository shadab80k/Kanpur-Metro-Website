import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StationSelector } from "@/components/StationSelector";
import { useMetro } from "@/contexts/MetroContext";
import AppNavbar from "@/components/AppNavbar";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const JourneyPlanner = () => {
  const { 
    selectedSource, 
    selectedDestination, 
    setSelectedSource, 
    setSelectedDestination,
    planJourney,
  } = useMetro();
  
  const navigate = useNavigate();
  const location = useLocation();
  const showFareCalculator = new URLSearchParams(location.search).get("fare") === "true";
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const swapStations = () => {
    const temp = selectedSource;
    setSelectedSource(selectedDestination);
    setSelectedDestination(temp);
  };
  
  const handleSubmit = () => {
    if (!selectedSource || !selectedDestination) {
      // Show error
      return;
    }
    
    setIsSubmitting(true);
    planJourney();
    
    // Navigate to result page
    setTimeout(() => {
      setIsSubmitting(false);
      if (showFareCalculator) {
        navigate(`/fare-calculator`);
      } else {
        navigate(`/journey/result?source=${selectedSource.id}&destination=${selectedDestination.id}`);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      <AppNavbar />
      
      <div className="p-4 flex-1">
        <h1 className="text-lg font-semibold mb-4">
          {showFareCalculator ? "Fare Calculator" : "Plan Your Journey"}
        </h1>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <StationSelector 
            label="From"
            value={selectedSource}
            onChange={setSelectedSource}
            dropdownId="source"
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
          
          <div className="flex justify-center my-1">
            <button 
              onClick={swapStations}
              className="p-2 bg-gray-50 rounded-full hover:bg-gray-100"
            >
              <RefreshCw className="h-4 w-4 text-gray-500" />
            </button>
          </div>
          
          <StationSelector 
            label="To"
            value={selectedDestination}
            onChange={setSelectedDestination}
            dropdownId="destination"
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
          
          <Button
            onClick={handleSubmit}
            disabled={!selectedSource || !selectedDestination || isSubmitting}
            className="w-full metro-button mt-4"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                Calculating...
              </span>
            ) : (
              showFareCalculator ? "Calculate Fare" : "Plan Journey"
            )}
          </Button>
        </div>
        
        {/* Journey tips */}
        <div className="mt-6">
          <h2 className="text-sm font-medium text-gray-700 mb-2">Tips</h2>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <ul className="list-disc list-inside text-sm space-y-2 text-gray-600">
              <li>Smart card users get 10% discount on fares</li>
              <li>Orange Line operates from 6:00 AM to 10:00 PM</li>
              <li>Trains arrive every 5 minutes during peak hours</li>
              <li>Check platform numbers to board the correct train</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyPlanner;

import { useState, useEffect } from "react";
import { useMetro } from "@/contexts/MetroContext";
import AppNavbar from "@/components/AppNavbar";
import { StationSelector } from "@/components/StationSelector";
import { Button } from "@/components/ui/button";
import { calculateFare } from "@/data/metroData";
import { Station } from "@/types/metro";
import { ArrowRight, Calculator, Ticket } from "lucide-react";

const FareCalculator = () => {
  const { 
    stations, 
    getLocalizedText,
    selectedSource, 
    selectedDestination, 
    setSelectedSource, 
    setSelectedDestination 
  } = useMetro();
  
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [fareResult, setFareResult] = useState<{
    fare: number;
    smartCardFare: number;
    distance: number;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Calculate the distance between stations
  const calculateDistanceBetween = (source: Station, destination: Station) => {
    // For simplicity, we'll assume each station is about 1.1 km apart on average
    const stationDistance = 1.1;
    return Math.abs(source.id - destination.id) * stationDistance;
  };
  
  // Effect to calculate fare when both source and destination are selected and coming from JourneyPlanner
  useEffect(() => {
    // Only auto-calculate if both stations are selected and no calculation has been done yet
    if (selectedSource && selectedDestination && !fareResult && !isCalculating) {
      handleCalculateFare();
    }
  }, [selectedSource, selectedDestination]);
  
  const handleCalculateFare = () => {
    if (!selectedSource || !selectedDestination) return;
    
    // Prevent multiple calculations while one is in progress
    if (isCalculating) return;
    
    setIsCalculating(true);
    
    // Calculate the distance between the two stations
    const distance = calculateDistanceBetween(selectedSource, selectedDestination);
    
    // Get the fare based on the distance
    const { fare, smartCardFare } = calculateFare(distance);
    
    // Set the fare result after a short delay to prevent double calculation
    // This helps ensure we only show one calculation
    setTimeout(() => {
      setFareResult({
        fare,
        smartCardFare,
        distance
      });
      setIsCalculating(false);
    }, 100);
  };

  const resetCalculation = () => {
    setFareResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      <AppNavbar />
      
      <div className="p-4 flex-1">
        <h1 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-metro-orange" />
          {getLocalizedText("Fare Calculator")}
        </h1>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          {!fareResult ? (
            <>
              <StationSelector 
                label="From"
                value={selectedSource}
                onChange={setSelectedSource}
                dropdownId="source"
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
              />
              
              <div className="flex justify-center my-1">
                <div className="p-2 bg-gray-50 rounded-full">
                  <ArrowRight className="h-4 w-4 text-gray-500" />
                </div>
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
                onClick={handleCalculateFare}
                disabled={!selectedSource || !selectedDestination || isCalculating}
                className="w-full metro-button mt-4"
              >
                {isCalculating ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">⏳</span> {getLocalizedText("Calculating...")}
                  </span>
                ) : (
                  getLocalizedText("Calculate Fare")
                )}
              </Button>
            </>
          ) : (
            <div className="animate-fadeInScale">
              <div className="text-center mb-6">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-500">{getLocalizedText("From")}</span>
                    <span className="font-semibold">{selectedSource?.name}</span>
                  </div>
                  
                  <ArrowRight className="h-5 w-5 text-metro-orange mx-3" />
                  
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-gray-500">{getLocalizedText("To")}</span>
                    <span className="font-semibold">{selectedDestination?.name}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border-t border-b border-gray-100 py-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <Ticket className="h-5 w-5 text-gray-500" />
                      </div>
                      <span>{getLocalizedText("Regular Ticket")}</span>
                    </div>
                    <span className="text-lg font-bold">₹{fareResult.fare}</span>
                  </div>
                </div>
                
                <div className="border-b border-gray-100 py-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-metro-orange/10 rounded-full flex items-center justify-center mr-3">
                        <Ticket className="h-5 w-5 text-metro-orange" />
                      </div>
                      <span>{getLocalizedText("Smart Card")}</span>
                    </div>
                    <span className="text-lg font-bold">₹{fareResult.smartCardFare}</span>
                  </div>
                </div>
                
                <div className="mt-3 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <span>{getLocalizedText("Distance")}:</span>
                    <span>{fareResult.distance.toFixed(1)} km</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>{getLocalizedText("You save")}:</span>
                    <span className="text-metro-orange">₹{fareResult.fare - fareResult.smartCardFare}</span>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={resetCalculation}
                className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 mt-6"
              >
                {getLocalizedText("Calculate Another Fare")}
              </Button>
            </div>
          )}
        </div>
        
        {/* Fare information */}
        <div className="mt-6">
          <h2 className="text-sm font-medium text-gray-700 mb-2">{getLocalizedText("Fare Information")}</h2>
          <div className="bg-white rounded-lg p-4 shadow-sm text-sm">
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>{getLocalizedText("Smart card users get 10% discount on fares")}</li>
              <li>{getLocalizedText("Children below 90cm height travel free")}</li>
              <li>{getLocalizedText("Senior citizens (60+ years) get 10% discount with ID")}</li>
              <li>{getLocalizedText("Group tickets available for 5 or more passengers")}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FareCalculator;

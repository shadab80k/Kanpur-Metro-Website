
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMetro } from "@/contexts/MetroContext";
import AppNavbar from "@/components/AppNavbar";
import { Compass, MapPin, Train, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Station } from "@/types/metro";

const NearestStation = () => {
  const navigate = useNavigate();
  const { stations, getNearestStation, setSelectedSource } = useMetro();
  
  const [isLoading, setIsLoading] = useState(false);
  const [nearestStation, setNearestStation] = useState<Station | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  
  // Function to find the nearest station
  const findNearestStation = () => {
    setIsLoading(true);
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          // In a real app, this would calculate actual distances
          // For demo purposes, we're using the dummy implementation
          const nearest = getNearestStation(latitude, longitude);
          
          setTimeout(() => {
            setNearestStation(nearest);
            setIsLoading(false);
          }, 1000);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            variant: "destructive",
            title: "Location Error",
            description: "Unable to access your location. Please enable location services.",
          });
          setIsLoading(false);
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Not Supported",
        description: "Geolocation is not supported by your browser.",
      });
      setIsLoading(false);
    }
  };
  
  const handleUseAsSource = () => {
    if (nearestStation) {
      setSelectedSource(nearestStation);
      navigate("/journey");
    }
  };
  
  const handleViewStationInfo = () => {
    if (nearestStation) {
      navigate(`/stations/${nearestStation.name.toLowerCase().replace(/\s+/g, '-')}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      <AppNavbar />
      
      <div className="p-4 flex-1">
        <h1 className="text-lg font-semibold mb-4">Find Nearest Station</h1>
        
        <div className="bg-white rounded-lg p-5 shadow-sm flex flex-col items-center justify-center">
          {!nearestStation && !isLoading && (
            <>
              <div className="w-20 h-20 rounded-full bg-metro-orangeLight flex items-center justify-center mb-4">
                <Compass className="h-10 w-10 text-metro-orange" />
              </div>
              
              <p className="text-center text-gray-600 mb-6">
                Locate the nearest metro station based on your current location
              </p>
              
              <Button
                onClick={findNearestStation}
                className="metro-button flex items-center"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Find Nearest Station
              </Button>
            </>
          )}
          
          {isLoading && (
            <div className="py-8 flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-metro-orange border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Finding nearest station...</p>
            </div>
          )}
          
          {nearestStation && !isLoading && (
            <div className="w-full">
              <div className="flex items-center justify-center mb-4">
                <div className="metro-station mr-3"></div>
                <h2 className="text-xl font-semibold">{nearestStation.name}</h2>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg mb-6">
                <div className="flex items-center justify-center mb-2">
                  <Train className="h-4 w-4 text-metro-orange mr-2" />
                  <p className="text-sm">{nearestStation.isUnderground ? "Underground" : "Elevated"} Station</p>
                </div>
                
                <div className="flex justify-between">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Distance</p>
                    <p className="font-medium">1.2 km</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Walking Time</p>
                    <p className="font-medium">15 min</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Platforms</p>
                    <p className="font-medium">{nearestStation.platformCount}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleUseAsSource}
                  className="metro-button"
                >
                  Use as Starting Point
                </Button>
                
                <Button
                  onClick={handleViewStationInfo}
                  className="metro-button-secondary"
                >
                  View Station Info
                </Button>
              </div>
              
              <Button
                onClick={findNearestStation}
                variant="link"
                className="w-full mt-4 text-metro-orange"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh Location
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NearestStation;

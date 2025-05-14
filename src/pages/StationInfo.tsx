
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMetro } from "@/contexts/MetroContext";
import AppNavbar from "@/components/AppNavbar";
import StationDetails from "@/components/StationDetails";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Station } from "@/types/metro";

const StationInfo = () => {
  const { stationName } = useParams();
  const navigate = useNavigate();
  const { stations, setSelectedSource, setSelectedDestination, getLocalizedText } = useMetro();
  
  const [station, setStation] = useState<Station | null>(null);
  
  useEffect(() => {
    if (stationName) {
      // Try to match by formatted name in URL
      const formattedName = stationName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      const found = stations.find(s => 
        s.name.toLowerCase() === formattedName.toLowerCase()
      );
      
      if (found) {
        setStation(found);
      } else {
        // If not found, try a more flexible match
        const flexMatch = stations.find(s => 
          s.name.toLowerCase().includes(formattedName.toLowerCase()) ||
          formattedName.toLowerCase().includes(s.name.toLowerCase())
        );
        
        if (flexMatch) {
          setStation(flexMatch);
        } else {
          navigate("/info");
        }
      }
    }
  }, [stationName, stations, navigate]);
  
  const handleSelectAsSource = () => {
    if (station) {
      setSelectedSource(station);
      navigate("/journey");
    }
  };
  
  const handleSelectAsDestination = () => {
    if (station) {
      setSelectedDestination(station);
      navigate("/journey");
    }
  };
  
  if (!station) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="animate-pulse flex space-x-2">
          <div className="h-2 w-2 bg-metro-orange rounded-full"></div>
          <div className="h-2 w-2 bg-metro-orange rounded-full"></div>
          <div className="h-2 w-2 bg-metro-orange rounded-full"></div>
        </div>
        <p className="text-gray-500 mt-3">{getLocalizedText("Loading station information...")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      <AppNavbar />
      
      <div className="container mx-auto px-4 sm:px-6 py-4 flex-1 max-w-4xl">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost"
            onClick={() => navigate(-1)}
            className="p-2 h-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>{getLocalizedText("Back")}</span>
          </Button>
        </div>
        
        <StationDetails 
          station={station}
          onSelectAsSource={handleSelectAsSource}
          onSelectAsDestination={handleSelectAsDestination}
        />
      </div>
    </div>
  );
};

export default StationInfo;


import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMetro } from "@/contexts/MetroContext";
import AppNavbar from "@/components/AppNavbar";
import RouteViewer from "@/components/RouteViewer";
import { getRoute } from "@/data/metroData";
import { Route } from "@/types/metro";
import { ArrowLeft, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const JourneyResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { stations, saveRoute } = useMetro();
  
  const [route, setRoute] = useState<Route | null>(null);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sourceId = Number(params.get("source"));
    const destinationId = Number(params.get("destination"));
    
    if (sourceId && destinationId) {
      const calculatedRoute = getRoute(sourceId, destinationId);
      setRoute(calculatedRoute);
      saveRoute(calculatedRoute);
    } else {
      navigate("/journey");
    }
  }, [location.search, navigate, saveRoute]);
  
  const handleShare = () => {
    if (route) {
      const text = `Traveling from ${route.source.name} to ${route.destination.name} via Kanpur Metro Orange Line
      
Board from Platform ${route.platformNumber} at ${route.source.name}
Direction: ${route.direction}

Distance: ${route.distance.toFixed(1)} km
Duration: ${route.duration} mins
Fare: ₹${route.fare}`;
      
      if (navigator.share) {
        navigator.share({
          title: "My Kanpur Metro Journey",
          text: text,
        }).catch(() => {
          // Fallback if share API fails
          navigator.clipboard.writeText(text).then(() => {
            toast({
              description: "Journey details copied to clipboard!",
            });
          });
        });
      } else {
        // Fallback for browsers that don't support share API
        navigator.clipboard.writeText(text).then(() => {
          toast({
            description: "Journey details copied to clipboard!",
          });
        });
      }
    }
  };
  
  // Add a function to plan return journey
  const planReturnJourney = () => {
    if (route) {
      navigate(`/journey/result?source=${route.destination.id}&destination=${route.source.id}`);
    }
  };
  
  if (!route) {
    return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <p>Loading journey details...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      <AppNavbar />
      
      <div className="p-4 flex-1">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost"
            onClick={() => navigate("/journey")}
            className="p-0 h-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back</span>
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleShare}
            className="p-2 h-auto"
          >
            <Share className="h-4 w-4 mr-1" />
            <span>Share</span>
          </Button>
        </div>
        
        <RouteViewer route={route} />
        
        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button onClick={() => navigate("/map")} variant="outline">
            View on Map
          </Button>
          <Button onClick={planReturnJourney} variant="outline">
            Return Journey
          </Button>
          <Button 
            onClick={() => navigate("/info")} 
            variant="outline" 
            className="col-span-2"
          >
            Station Info
          </Button>
        </div>
      </div>
    </div>
  );
}

export default JourneyResult;

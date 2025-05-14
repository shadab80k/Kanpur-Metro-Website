import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMetro } from "@/contexts/MetroContext";
import AppNavbar from "@/components/AppNavbar";
import MetroMap from "@/components/MetroMap";
import StationDetails from "@/components/StationDetails";
import { Station } from "@/types/metro";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const MetroMapPage = () => {
  const navigate = useNavigate();
  const { setSelectedSource, setSelectedDestination, getLocalizedText } = useMetro();
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  
  const handleStationSelect = (station: Station) => {
    setSelectedStation(station);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    // Keep the selected station for a moment in case user reopens the modal
    setTimeout(() => {
      if (!showModal) setSelectedStation(null);
    }, 300);
  };
  
  const handleSetAsSource = () => {
    if (selectedStation) {
      setSelectedSource(selectedStation);
      setShowModal(false);
      navigate("/journey");
    }
  };
  
  const handleSetAsDestination = () => {
    if (selectedStation) {
      setSelectedDestination(selectedStation);
      setShowModal(false);
      navigate("/journey");
    }
  };
  
  const handleViewStationDetails = () => {
    if (selectedStation) {
      const stationNameUrl = selectedStation.name.toLowerCase().replace(/\s+/g, '-');
      navigate(`/stations/${stationNameUrl}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      <AppNavbar />
      
      <div className="p-4 flex-1 relative">
        <h1 className="text-xl font-semibold mb-4 flex items-center">
          <span className="bg-metro-orange text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
            M
          </span>
          {getLocalizedText("Kanpur Metro Map")}
        </h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <MetroMap 
            onStationSelect={handleStationSelect}
            highlightStations={selectedStation ? [selectedStation] : []}
          />
        </div>
        
        {/* Station selection dialog */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <div className="bg-metro-orange text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  S
                </div>
                {selectedStation?.name}
              </DialogTitle>
            </DialogHeader>
            
            {selectedStation && (
              <div className="py-2">
                <StationDetails
                  station={selectedStation}
                  onSelectAsSource={handleSetAsSource}
                  onSelectAsDestination={handleSetAsDestination}
                />
                
                <div className="mt-4 flex justify-center">
                  <Button 
                    variant="outline"
                    onClick={handleViewStationDetails}
                    className="text-metro-orange border-metro-orange hover:bg-metro-orangeLight w-full"
                  >
                    {getLocalizedText("View Full Station Information")}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MetroMapPage;

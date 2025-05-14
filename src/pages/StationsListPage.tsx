
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMetro } from "@/contexts/MetroContext";
import AppNavbar from "@/components/AppNavbar";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

const StationsListPage = () => {
  const { stations, getLocalizedText } = useMetro();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter stations based on search term
  const filteredStations = stations.filter(station => 
    station.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const goToStationDetails = (stationName: string) => {
    // Format station name for URL
    const formattedName = stationName.replace(/ /g, "-").toLowerCase();
    navigate(`/stations/${formattedName}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      <AppNavbar />
      
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{getLocalizedText("Station Information")}</h1>
        
        {/* Search box */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder={getLocalizedText("Search stations...")}
            className="pl-10 bg-white border border-gray-300 rounded-lg w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Stations count */}
        <div className="text-sm text-gray-500 mb-3">
          {filteredStations.length} {getLocalizedText("stations found")}
        </div>
        
        {/* Stations list with vertical line design */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {filteredStations.length > 0 ? (
            <div className="relative pb-2">
              {/* Vertical connecting line - fixed to be stable */}
              <div className="absolute left-7 top-8 bottom-8 w-1.5 bg-metro-orange z-0"></div>
              
              {filteredStations.map((station, index) => (
                <div 
                  key={station.id} 
                  onClick={() => goToStationDetails(station.name)}
                  className="relative pl-14 pr-4 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  {/* Station marker - fixed z-index to stay above line */}
                  <div className={`absolute left-7 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${station.isUnderground ? 'bg-blue-500' : 'bg-metro-orange'} border-2 border-white z-10`}></div>
                  
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{station.name}</h3>
                      {/* Removed platform count from here */}
                    </div>
                    <div className="flex items-center mt-1">
                      <div className={`px-2 py-0.5 text-xs rounded-full ${
                        station.isUnderground 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'bg-metro-orangeLight text-metro-orangeDark'
                      }`}>
                        {getLocalizedText(station.isUnderground ? "Underground" : "Elevated")}
                      </div>
                      
                      {station.landmarks && station.landmarks.length > 0 && (
                        <div className="flex items-center ml-2 text-xs text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {station.landmarks[0]}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">{getLocalizedText("No stations found")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StationsListPage;

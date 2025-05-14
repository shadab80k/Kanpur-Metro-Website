
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "@/components/AppNavbar";
import { useMetro } from "@/contexts/MetroContext";
import { Search, Phone, Info, Clock, CreditCard } from "lucide-react";

const InfoPage = () => {
  const navigate = useNavigate();
  const { stations } = useMetro();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredStations = searchQuery.length > 0
    ? stations.filter(station => 
        station.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      <AppNavbar />
      
      <div className="p-4 flex-1">
        <h1 className="text-lg font-semibold mb-4">Information</h1>
        
        {/* Station search */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <p className="text-sm font-medium mb-2">Find Station Information</p>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for stations..."
              className="w-full pl-9 p-3 border border-gray-200 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {searchQuery.length > 0 && (
            <div className="mt-2 border rounded-lg divide-y max-h-60 overflow-y-auto">
              {filteredStations.length > 0 ? (
                filteredStations.map(station => (
                  <div 
                    key={station.id}
                    className="p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/stations/${station.name.toLowerCase().replace(/\s+/g, '-')}`)}
                  >
                    <p className="font-medium">{station.name}</p>
                    <p className="text-xs text-gray-500">
                      {station.isUnderground ? "Underground" : "Elevated"} • Platform {station.platformCount}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-3 text-center text-gray-500">No stations found</div>
              )}
            </div>
          )}
        </div>
        
        {/* Metro information */}
        <div className="space-y-4">
          {/* Fare Chart */}
          <div 
            onClick={() => navigate("/fare-chart")}
            className="bg-white p-4 rounded-lg shadow-sm flex items-center cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-metro-orangeLight flex items-center justify-center mr-3">
              <CreditCard className="h-5 w-5 text-metro-orange" />
            </div>
            <div>
              <p className="font-medium">Fare Chart</p>
              <p className="text-xs text-gray-500">View ticket prices for all routes</p>
            </div>
          </div>
          
          {/* Timings */}
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
            <div className="w-10 h-10 rounded-full bg-metro-orangeLight flex items-center justify-center mr-3">
              <Clock className="h-5 w-5 text-metro-orange" />
            </div>
            <div>
              <p className="font-medium">Metro Timings</p>
              <p className="text-xs text-gray-500">First Train: 6:00 AM • Last Train: 10:00 PM</p>
              <p className="text-xs text-gray-500">Peak Hour Frequency: Every 5 minutes</p>
            </div>
          </div>
          
          {/* Emergency Contact */}
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
            <div className="w-10 h-10 rounded-full bg-metro-orangeLight flex items-center justify-center mr-3">
              <Phone className="h-5 w-5 text-metro-orange" />
            </div>
            <div>
              <p className="font-medium">Emergency Contact</p>
              <p className="text-xs text-gray-500">Helpline: 1800-XXX-XXXX (24x7)</p>
              <p className="text-xs text-gray-500">Customer Care: 0512-XXX-XXXX</p>
            </div>
          </div>
          
          {/* About */}
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
            <div className="w-10 h-10 rounded-full bg-metro-orangeLight flex items-center justify-center mr-3">
              <Info className="h-5 w-5 text-metro-orange" />
            </div>
            <div>
              <p className="font-medium">About Kanpur Metro</p>
              <p className="text-xs text-gray-500">Orange Line: 23.8 km • 22 Stations</p>
              <p className="text-xs text-gray-500">14 Elevated and 8 Underground Stations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;

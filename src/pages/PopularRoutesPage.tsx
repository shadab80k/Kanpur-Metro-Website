
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMetro } from "@/contexts/MetroContext";
import AppNavbar from "@/components/AppNavbar";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const PopularRoutesPage = () => {
  const { getLocalizedText } = useMetro();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Define all popular routes
  const popularRoutes = [
    {
      source: { id: 1, name: "IIT Kanpur" },
      destination: { id: 14, name: "Kanpur Central" },
      distance: 15.1,
      duration: 37
    },
    {
      source: { id: 8, name: "LLR Hospital" },
      destination: { id: 21, name: "Naubasta" },
      distance: 14.3,
      duration: 32
    },
    {
      source: { id: 3, name: "SPM Hospital" },
      destination: { id: 18, name: "Moti Jheel" },
      distance: 12.5,
      duration: 28
    },
    {
      source: { id: 5, name: "Kalyanpur" },
      destination: { id: 16, name: "Rawatpur" },
      distance: 8.2,
      duration: 19
    },
    {
      source: { id: 2, name: "IIT Gate" },
      destination: { id: 12, name: "Gurudev Chauraha" },
      distance: 9.7,
      duration: 22
    },
    {
      source: { id: 6, name: "Kanpur University" },
      destination: { id: 20, name: "Transport Nagar" },
      distance: 13.8,
      duration: 30
    },
    {
      source: { id: 4, name: "Kakadev" },
      destination: { id: 19, name: "Chunniganj" },
      distance: 10.4,
      duration: 25
    }
  ];

  // Filter routes based on search term
  const filteredRoutes = popularRoutes.filter(
    route => 
      route.source.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      route.destination.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      <AppNavbar />
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost"
            onClick={() => navigate("/")}
            className="p-0 h-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>{getLocalizedText("Back")}</span>
          </Button>
          
          <h1 className="text-xl font-bold">{getLocalizedText("Popular Routes")}</h1>
        </div>

        {/* Search box */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder={getLocalizedText("Search routes...")}
            className="pl-10 bg-white border border-gray-300 rounded-lg w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Routes count */}
        <div className="text-sm text-gray-500 mb-3">
          {filteredRoutes.length} {getLocalizedText("routes found")}
        </div>
        
        {/* Routes list */}
        <Card>
          <CardContent className="p-3">
            <div className="space-y-3">
              {filteredRoutes.length > 0 ? (
                filteredRoutes.map((route, index) => (
                  <div 
                    key={index} 
                    onClick={() => navigate(`/journey?source=${route.source.id}&destination=${route.destination.id}`)}
                    className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{route.source.name}</span>
                      <div className="flex items-center my-1">
                        <div className="h-4 w-4 flex items-center justify-center">
                          <div className="h-2 w-2 bg-metro-orange rounded-full"></div>
                        </div>
                        <div className="h-0.5 w-16 bg-metro-orange"></div>
                        <div className="h-4 w-4 flex items-center justify-center">
                          <div className="h-2 w-2 bg-metro-orange rounded-full"></div>
                        </div>
                      </div>
                      <span className="font-medium">{route.destination.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{route.distance.toFixed(1)} km</p>
                      <p className="text-xs text-metro-orange">{route.duration} min</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">{getLocalizedText("No routes found")}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PopularRoutesPage;

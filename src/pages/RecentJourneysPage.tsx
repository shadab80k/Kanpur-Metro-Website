
import { useNavigate } from "react-router-dom";
import { useMetro } from "@/contexts/MetroContext";
import AppNavbar from "@/components/AppNavbar";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const RecentJourneysPage = () => {
  const { recentRoutes, clearRecentRoutes, getLocalizedText } = useMetro();
  const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  
  const handleClearHistory = () => {
    clearRecentRoutes();
    toast({
      description: getLocalizedText("Journey history cleared"),
    });
  };

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
          
          <div className="flex items-center">
            <h1 className="text-xl font-bold mr-4">{getLocalizedText("Recent Journeys")}</h1>
            {recentRoutes.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAlertOpen(true)}
                className="text-red-500 border-red-200"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                <span>{getLocalizedText("Clear")}</span>
              </Button>
            )}
          </div>
        </div>
        
        {/* Clear history confirmation */}
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{getLocalizedText("Clear Journey History?")}</AlertDialogTitle>
              <AlertDialogDescription>
                {getLocalizedText("This will remove all your recent journey records. This action cannot be undone.")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{getLocalizedText("Cancel")}</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearHistory} className="bg-red-500 hover:bg-red-600">
                {getLocalizedText("Clear History")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Journeys count */}
        <div className="text-sm text-gray-500 mb-3">
          {recentRoutes.length} {getLocalizedText("journeys found")}
        </div>
        
        {/* Journeys list */}
        {recentRoutes.length > 0 ? (
          <Card>
            <CardContent className="p-3">
              <div className="space-y-3">
                {recentRoutes.map((route, index) => (
                  <div 
                    key={index} 
                    onClick={() => navigate(`/journey/result?source=${route.source.id}&destination=${route.destination.id}`)}
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
                      <p className="text-sm font-medium">₹{route.fare}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 mb-4">{getLocalizedText("No recent journeys found")}</p>
            <Button 
              onClick={() => navigate("/journey")} 
              variant="outline"
            >
              {getLocalizedText("Plan a Journey")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentJourneysPage;

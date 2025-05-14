import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "@/components/AppNavbar";
import { useMetro } from "@/contexts/MetroContext";
import { Search, Clock, Route as RouteIcon, Map, Compass, AlertTriangle, RefreshCw, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const { recentRoutes, stations, getLocalizedText } = useMetro();
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [metroStatus, setMetroStatus] = useState<"normal" | "delayed" | "disrupted">("normal");
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if onboarding has been shown before
  useEffect(() => {
    const onboardingShown = localStorage.getItem("onboardingShown");
    if (!onboardingShown) {
      setShowOnboarding(true);
    }
  }, []);
  
  // Mock function to refresh metro status
  const refreshMetroStatus = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Simulating API call for metro status
      const statuses = ["normal", "delayed", "normal", "normal"];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)] as "normal" | "delayed" | "disrupted";
      setMetroStatus(randomStatus);
      setIsLoading(false);
      
      toast({
        title: "Status Updated",
        description: `Latest metro service status: ${randomStatus.charAt(0).toUpperCase() + randomStatus.slice(1)}`,
      });
    }, 1000);
  };

  // Onboarding slides
  const slides = [
    {
      title: "How to Plan a Journey",
      description: "Select source and destination stations to get route details, platform information, and fare.",
      icon: RouteIcon,
    },
    {
      title: "How to Check Fare & Platform Info",
      description: "View detailed fare information for both regular tickets and smart cards.",
      icon: Clock,
    },
    {
      title: "How to Use Map & Find Nearest Station",
      description: "Explore the interactive metro map and find the nearest station to your location.",
      icon: Map,
    }
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowOnboarding(false);
      localStorage.setItem("onboardingShown", "true");
    }
  };
  
  // Only show onboarding on first visit
  if (showOnboarding) {
    // Extract the current icon component
    const CurrentIcon = slides[currentSlide].icon;
    
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex items-center justify-between p-4 bg-metro-orange text-white">
          <h1 className="text-lg font-bold">Welcome to Kanpur Metro</h1>
          <button 
            onClick={() => {
              setShowOnboarding(false);
              localStorage.setItem("onboardingShown", "true");
            }}
            className="text-sm"
          >
            Skip
          </button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="p-12 flex flex-col items-center">
              {slides[currentSlide].icon && (
                <div className="h-20 w-20 rounded-full bg-metro-orangeLight flex items-center justify-center mb-6 animate-pulse-orange">
                  <CurrentIcon className="h-10 w-10 text-metro-orange" />
                </div>
              )}
              
              <h2 className="text-xl font-bold text-center mb-3">{slides[currentSlide].title}</h2>
              <p className="text-center text-gray-600 mb-8">{slides[currentSlide].description}</p>
              
              {/* Dots indicator */}
              <div className="flex space-x-2 mb-8">
                {slides.map((_, index) => (
                  <div 
                    key={index} 
                    className={`h-2 w-2 rounded-full ${
                      index === currentSlide ? 'bg-metro-orange' : 'bg-gray-300'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
            
            <Button 
              className="w-full" 
              onClick={nextSlide}
            >
              {currentSlide < slides.length - 1 ? "Next" : "Get Started"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      <AppNavbar />
      
      {/* Hero section */}
      <div className="bg-metro-orange text-white p-6">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-2">Kanpur Metro</h1>
          <p className="text-sm mb-4">Your smart travel companion</p>
          
          {/* Search bar */}
          <div 
            onClick={() => navigate("/journey")}
            className="bg-white rounded-lg w-full max-w-md flex items-center p-2 shadow-lg cursor-pointer"
          >
            <Search className="h-5 w-5 text-metro-orange mx-2" />
            <p className="text-gray-500 text-sm">Where would you like to go?</p>
          </div>
        </div>
      </div>
      
      {/* Metro Status */}
      <div className="p-3">
        <Card className="overflow-hidden">
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-medium">Metro Status</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={refreshMetroStatus}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="sr-only">Refresh</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full mr-2 ${
                metroStatus === 'normal' ? 'bg-green-500' : 
                metroStatus === 'delayed' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <span>
                {metroStatus === 'normal' ? 'All services running normally' : 
                 metroStatus === 'delayed' ? 'Minor delays on some routes' : 'Service disrupted'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick access cards */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-3">Plan Your Journey</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card 
            onClick={() => navigate("/journey")} 
            className="cursor-pointer hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-metro-orangeLight flex items-center justify-center mb-2">
                <Search className="h-6 w-6 text-metro-orange" />
              </div>
              <p className="font-medium text-center">Plan Journey</p>
            </CardContent>
          </Card>
          
          <Card 
            onClick={() => navigate("/map")} 
            className="cursor-pointer hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-metro-orangeLight flex items-center justify-center mb-2">
                <Map className="h-6 w-6 text-metro-orange" />
              </div>
              <p className="font-medium text-center">Metro Map</p>
            </CardContent>
          </Card>
          
          <Card 
            onClick={() => navigate("/stations")} 
            className="cursor-pointer hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-metro-orangeLight flex items-center justify-center mb-2">
                <Compass className="h-6 w-6 text-metro-orange" />
              </div>
              <p className="font-medium text-center">{getLocalizedText("Station Info")}</p>
            </CardContent>
          </Card>
          
          <Card 
            onClick={() => navigate("/journey?fare=true")} 
            className="cursor-pointer hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-metro-orangeLight flex items-center justify-center mb-2">
                <Clock className="h-6 w-6 text-metro-orange" />
              </div>
              <p className="font-medium text-center">Fare Calculator</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Popular Routes */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Popular Routes</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/popular-routes")}
              className="text-metro-orange"
            >
              View All
            </Button>
          </div>
          <Card>
            <CardContent className="p-3">
              <div className="space-y-3">
                <div 
                  onClick={() => navigate(`/journey?source=1&destination=14`)}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">IIT Kanpur</span>
                    <div className="flex items-center">
                      <div className="h-4 w-4 flex items-center justify-center">
                        <div className="h-2 w-2 bg-metro-orange rounded-full"></div>
                      </div>
                      <div className="h-0.5 w-10 bg-metro-orange"></div>
                      <div className="h-4 w-4 flex items-center justify-center">
                        <div className="h-2 w-2 bg-metro-orange rounded-full"></div>
                      </div>
                    </div>
                    <span className="font-medium">Kanpur Central</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">15.1 km</p>
                    <p className="text-xs text-metro-orange">37 min</p>
                  </div>
                </div>
                
                <div 
                  onClick={() => navigate(`/journey?source=8&destination=21`)}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">LLR Hospital</span>
                    <div className="flex items-center">
                      <div className="h-4 w-4 flex items-center justify-center">
                        <div className="h-2 w-2 bg-metro-orange rounded-full"></div>
                      </div>
                      <div className="h-0.5 w-10 bg-metro-orange"></div>
                      <div className="h-4 w-4 flex items-center justify-center">
                        <div className="h-2 w-2 bg-metro-orange rounded-full"></div>
                      </div>
                    </div>
                    <span className="font-medium">Naubasta</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">14.3 km</p>
                    <p className="text-xs text-metro-orange">32 min</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent journeys */}
        {recentRoutes.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Recent Journeys</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/recent-journeys")}
                className="text-metro-orange"
              >
                View All
              </Button>
            </div>
            <Card>
              <CardContent className="p-3">
                <div className="space-y-3">
                  {recentRoutes.slice(0, 3).map((route, index) => (
                    <div 
                      key={index} 
                      onClick={() => navigate(`/journey/result?source=${route.source.id}&destination=${route.destination.id}`)}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{route.source.name}</span>
                        <div className="flex items-center">
                          <div className="h-4 w-4 flex items-center justify-center">
                            <div className="h-2 w-2 bg-metro-orange rounded-full"></div>
                          </div>
                          <div className="h-0.5 w-10 bg-metro-orange"></div>
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
          </div>
        )}
        
        {/* Metro System Facts */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Kanpur Metro Facts</h2>
          <Card>
            <CardContent className="grid grid-cols-3 gap-2 p-4">
              <div className="text-center">
                <p className="text-xs text-gray-500">Total Length</p>
                <p className="text-lg font-medium">23.8 km</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Stations</p>
                <p className="text-lg font-medium">{stations.length}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Daily Riders</p>
                <p className="text-lg font-medium">120K+</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Service information */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Service Information</h2>
          <Card>
            <CardContent className="p-4">
              <div className="bg-gray-50 p-3 rounded mb-3">
                <div className="flex justify-between mb-2">
                  <p className="text-sm">First Train</p>
                  <p className="text-sm font-medium">6:00 AM</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">Last Train</p>
                  <p className="text-sm font-medium">10:00 PM</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Peak Hour Frequency</p>
                  <p className="text-sm font-medium">5 mins</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-2 bg-metro-orangeLight rounded-md">
                <AlertTriangle className="h-5 w-5 text-metro-orange" />
                <p className="flex-1 mx-2 text-sm">Emergency Helpline</p>
                <p className="font-medium text-metro-orange">1800-XXX-XXXX</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Did you know section */}
        <Card className="mb-6 border-t-4 border-t-metro-orange">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Did you know?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              The Kanpur Metro uses energy-efficient regenerative braking systems that recover up to 35% of the energy used during operation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;

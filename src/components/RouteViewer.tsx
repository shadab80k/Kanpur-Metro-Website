
import { Route } from "@/types/metro";
import { ArrowRight, Clock, Route as RouteIcon, Train } from "lucide-react";

interface RouteViewerProps {
  route: Route;
}

export default function RouteViewer({ route }: RouteViewerProps) {
  return (
    <div className="metro-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Route Details</h2>
        <div className="station-badge station-badge-orange">
          {route.direction}
        </div>
      </div>
      
      {/* Platform and Direction Information */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-3 mb-6">
        <div className="flex items-center">
          <Train className="h-5 w-5 text-metro-orange mr-2" />
          <p className="font-medium">Board from Platform {route.platformNumber} at {route.source.name}</p>
        </div>
        <p className="text-sm mt-1 text-gray-600 dark:text-gray-300 ml-7">{route.direction}</p>
      </div>
      
      {/* Journey Stats */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg text-center">
          <Clock className="h-5 w-5 text-metro-orange mx-auto mb-1" />
          <p className="text-xs text-gray-500 dark:text-gray-400">Travel Time</p>
          <p className="font-semibold">{route.duration} min</p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg text-center">
          <RouteIcon className="h-5 w-5 text-metro-orange mx-auto mb-1" />
          <p className="text-xs text-gray-500 dark:text-gray-400">Distance</p>
          <p className="font-semibold">{route.distance.toFixed(1)} km</p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg text-center">
          <Train className="h-5 w-5 text-metro-orange mx-auto mb-1" />
          <p className="text-xs text-gray-500 dark:text-gray-400">Stops</p>
          <p className="font-semibold">{route.stations.length}</p>
        </div>
      </div>
      
      {/* Fare Information */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg mb-6">
        <div className="flex justify-between">
          <p className="text-sm">Regular Fare</p>
          <p className="font-semibold">₹{route.fare}</p>
        </div>
        <div className="flex justify-between mt-1">
          <p className="text-sm text-metro-orange">Smart Card (10% off)</p>
          <p className="font-semibold text-metro-orange">₹{route.smartCardFare}</p>
        </div>
      </div>
      
      {/* Stations List - Vertical Journey Map */}
      <div className="mt-6">
        <p className="text-sm font-medium mb-4">Stations ({route.stations.length})</p>
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-3 top-3 bottom-3 w-1 bg-metro-orange"></div>
          
          {/* Stations */}
          <div className="space-y-0">
            {route.stations.map((station, index) => {
              const isFirst = index === 0;
              const isLast = index === route.stations.length - 1;
              const isTerminal = isFirst || isLast;
              
              return (
                <div key={station.id} className="relative pl-10 py-3">
                  {/* Station Circle */}
                  <div 
                    className={`absolute left-1.5 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white 
                      ${isTerminal ? 'bg-metro-orange scale-125' : 'bg-metro-orange'}`}
                  ></div>
                  
                  {/* Station Info */}
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className={`font-medium ${isTerminal ? 'text-base' : 'text-sm'}`}>
                        {station.name}
                      </span>
                      {isFirst && (
                        <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                          Start
                        </span>
                      )}
                      {isLast && (
                        <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                          End
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5 flex items-center">
                      <span className={`inline-block w-2 h-2 rounded-full mr-1.5 
                        ${station.isUnderground ? 'bg-blue-500' : 'bg-metro-orange'}`}></span>
                      <span>{station.isUnderground ? "Underground" : "Elevated"}</span>
                      <span className="mx-1.5">•</span>
                      <span>Platform {route.platformNumber}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

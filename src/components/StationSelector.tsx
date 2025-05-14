
import { useState, useEffect } from "react";
import { Station } from "@/types/metro";
import { useMetro } from "@/contexts/MetroContext";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StationSelectorProps {
  label: string;
  value: Station | null;
  onChange: (station: Station | null) => void;
  dropdownId: string;
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
}

export function StationSelector({ 
  label, 
  value, 
  onChange, 
  dropdownId, 
  activeDropdown, 
  setActiveDropdown 
}: StationSelectorProps) {
  const { stations, getLocalizedText } = useMetro();
  const [searchQuery, setSearchQuery] = useState("");
  const isOpen = activeDropdown === dropdownId;

  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectStation = (station: Station) => {
    onChange(station);
    setActiveDropdown(null);
    setSearchQuery("");
  };

  const toggleDropdown = () => {
    if (isOpen) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownId);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest(`#dropdown-${dropdownId}`)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, dropdownId, setActiveDropdown]);

  return (
    <div id={`dropdown-${dropdownId}`} className="relative w-full mb-4">
      <div className="flex flex-col mb-1">
        <label className="text-sm font-medium text-gray-700">{getLocalizedText(label)}</label>
        <Button
          variant="outline"
          className="flex justify-between items-center p-3 h-auto text-left"
          onClick={toggleDropdown}
        >
          {value ? value.name : getLocalizedText(`Select ${label}`)}
          <Search className="h-4 w-4 text-gray-500" />
        </Button>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder={getLocalizedText("Search stations...")}
              className="w-full p-2 border border-gray-200 rounded"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {filteredStations.map(station => (
              <div
                key={station.id}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectStation(station)}
              >
                <div className="flex items-center">
                  <div className="metro-station mr-3"></div>
                  <div>
                    <p className="font-medium">{station.name}</p>
                    <p className="text-xs text-gray-500">
                      {getLocalizedText(station.isUnderground ? "Underground" : "Elevated")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

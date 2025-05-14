
import { StationFacility } from "@/types/metro";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

interface FacilitiesInfoProps {
  facilities?: StationFacility[];
}

const FacilityIcon = ({ type }: { type: string }) => {
  // Use ArrowUp for all facility types as a generic icon
  return <ArrowUp className="h-4 w-4" />;
};

const FacilitiesInfo = ({ facilities }: FacilitiesInfoProps) => {
  const [open, setOpen] = useState(false);
  
  if (!facilities || facilities.length === 0) {
    return null;
  }

  // Group facilities by type
  const groupedFacilities: Record<string, StationFacility[]> = {};
  facilities.forEach((facility) => {
    if (!groupedFacilities[facility.type]) {
      groupedFacilities[facility.type] = [];
    }
    groupedFacilities[facility.type].push(facility);
  });

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Station Facilities</CardTitle>
      </CardHeader>
      <CardContent>
        <Collapsible open={open} onOpenChange={setOpen} className="space-y-2">
          {Object.entries(groupedFacilities).slice(0, 2).map(([type, items]) => (
            <div key={type} className="rounded-md border p-4">
              <div className="flex items-center">
                <FacilityIcon type={type} />
                <h4 className="ml-2 text-sm font-medium">{type}</h4>
              </div>
              <div className="mt-2">
                {items.map((facility, idx) => (
                  <div key={idx} className="ml-6 text-sm">
                    <p className="font-medium">{facility.name}</p>
                    <p className="text-xs text-gray-500">{facility.location}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <CollapsibleContent className="space-y-2">
            {Object.entries(groupedFacilities).slice(2).map(([type, items]) => (
              <div key={type} className="rounded-md border p-4">
                <div className="flex items-center">
                  <FacilityIcon type={type} />
                  <h4 className="ml-2 text-sm font-medium">{type}</h4>
                </div>
                <div className="mt-2">
                  {items.map((facility, idx) => (
                    <div key={idx} className="ml-6 text-sm">
                      <p className="font-medium">{facility.name}</p>
                      <p className="text-xs text-gray-500">{facility.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CollapsibleContent>
          
          {Object.keys(groupedFacilities).length > 2 && (
            <CollapsibleTrigger asChild>
              <button className="w-full text-center text-sm text-metro-orange hover:underline">
                {open ? "Show less" : "Show more"}
              </button>
            </CollapsibleTrigger>
          )}
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default FacilitiesInfo;

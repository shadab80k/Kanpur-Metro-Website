
import { Station } from "@/types/metro";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useMetro } from "@/contexts/MetroContext";

interface StationInfoHeaderProps {
  station: Station;
}

const StationInfoHeader = ({ station }: StationInfoHeaderProps) => {
  const { getLocalizedText } = useMetro();
  const detailedInfo = station.detailedInfo;
  
  if (!detailedInfo) {
    return (
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{station.name}</h1>
        <div className="text-gray-500 mt-1">
          <Badge variant="outline" className="mr-2">
            {getLocalizedText(station.isUnderground ? "Underground" : "Elevated")}
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{station.name}</h1>
        <Badge 
          className={`
            ${detailedInfo.serviceStatus === "Normal Service" ? 
              "bg-green-100 text-green-800" : 
              "bg-amber-100 text-amber-800"}
          `}
        >
          {getLocalizedText(detailedInfo.serviceStatus)}
        </Badge>
      </div>
      
      <div className="flex flex-wrap gap-2 items-center mt-2">
        <Badge variant="outline" className="text-xs">
          {detailedInfo.line}
        </Badge>
        <Badge variant="outline" className="text-xs bg-gray-50">
          {getLocalizedText(station.isUnderground ? "Underground" : "Elevated")}
        </Badge>
        <span className="text-xs text-gray-500 ml-auto">
          {format(new Date(), "EEEE, d MMMM")}
        </span>
      </div>
    </div>
  );
};

export default StationInfoHeader;

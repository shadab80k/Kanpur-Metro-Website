
import { Station } from "@/types/metro";
import { useMetro } from "@/contexts/MetroContext";
import { generateDummyNextTrains } from "@/data/metroData";
import { Clock, MapPin, Train } from "lucide-react";
import StationInfoHeader from "./station/StationInfoHeader";
import GatesInfo from "./station/GatesInfo";
import LiftsInfo from "./station/LiftsInfo";
import PlatformsInfo from "./station/PlatformsInfo";
import FacilitiesInfo from "./station/FacilitiesInfo";
import ParkingInfo from "./station/ParkingInfo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";

interface StationDetailsProps {
  station: Station;
  onSelectAsSource?: () => void;
  onSelectAsDestination?: () => void;
}

export default function StationDetails({ 
  station, 
  onSelectAsSource, 
  onSelectAsDestination 
}: StationDetailsProps) {
  const { getLocalizedText } = useMetro();
  const isMobile = useIsMobile();
  
  // Generate dummy train data for this station
  const nextTrains = generateDummyNextTrains(station.id);
  
  return (
    <div className="space-y-4">
      <StationInfoHeader station={station} />
      
      {/* Upcoming Trains */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center">
            <Train className="h-4 w-4 text-metro-orange mr-2" />
            {getLocalizedText("Upcoming Trains")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-full max-h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">{getLocalizedText("Destination Train")}</TableHead>
                  <TableHead className="text-left">{getLocalizedText("Time")}</TableHead>
                  <TableHead className="text-left">{getLocalizedText("Platform")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nextTrains.map((train, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="py-2">{train.destination}</TableCell>
                    <TableCell className="py-2">{train.time}</TableCell>
                    <TableCell className="py-2">{train.platform}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
      
      {/* Display detailed station information if available */}
      {station.detailedInfo && (
        <>
          <LiftsInfo lifts={station.detailedInfo.lifts} />
          <PlatformsInfo platforms={station.detailedInfo.platforms} />
          <GatesInfo gates={station.detailedInfo.gates} />
          <FacilitiesInfo facilities={station.detailedInfo.facilities} />
          <ParkingInfo parking={station.detailedInfo.parking} />
        </>
      )}
      
      {/* Timings */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center">
            <Clock className="h-4 w-4 text-metro-orange mr-2" />
            {getLocalizedText("Timings")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500">{getLocalizedText("First Train")}</p>
              <p className="font-medium">6:00 AM</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">{getLocalizedText("Last Train")}</p>
              <p className="font-medium">10:00 PM</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">{getLocalizedText("Frequency")}</p>
              <p className="font-medium">5 mins</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Landmarks */}
      {station.landmarks && station.landmarks.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <MapPin className="h-4 w-4 text-metro-orange mr-2" />
              {getLocalizedText("Nearby")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {station.landmarks.map((landmark, idx) => (
                <div key={idx} className="text-sm p-2 bg-gray-50 rounded border border-gray-100">
                  {landmark}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Action buttons */}
      {(onSelectAsSource || onSelectAsDestination) && (
        <div className="mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          {onSelectAsSource && (
            <button 
              onClick={onSelectAsSource}
              className="flex-1 metro-button"
            >
              {getLocalizedText("Set as Source")}
            </button>
          )}
          {onSelectAsDestination && (
            <button 
              onClick={onSelectAsDestination}
              className="flex-1 metro-button-secondary"
            >
              {getLocalizedText("Set as Destination")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

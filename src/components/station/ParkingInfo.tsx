
import { ParkingCapacity } from "@/types/metro";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown } from "lucide-react";

interface ParkingInfoProps {
  parking?: ParkingCapacity;
}

const ParkingInfo = ({ parking }: ParkingInfoProps) => {
  if (!parking) {
    return null;
  }

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-base font-medium">
          <ArrowDown className="w-4 h-4 mr-2" />
          Parking Availability
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-gray-500 dark:text-gray-400 text-xs">Bicycle Parking</p>
            <div className="flex items-center justify-between mt-1">
              <p className="font-semibold text-lg">{parking.bicycle.available}</p>
              <Badge variant="outline">Available</Badge>
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-gray-500 dark:text-gray-400 text-xs">Car Parking</p>
            <div className="flex items-center justify-between mt-1">
              <p className="font-semibold text-lg">{parking.car.available}</p>
              <Badge variant="outline" className={parking.car.available > 0 ? "" : "bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100"}>
                {parking.car.available > 0 ? "Available" : "Full"}
              </Badge>
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-gray-500 dark:text-gray-400 text-xs">Bike Parking</p>
            <div className="flex items-center justify-between mt-1">
              <p className="font-semibold text-lg">{parking.bike.available}</p>
              <Badge variant="outline">Available</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParkingInfo;

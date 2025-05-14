
import { Lift } from "@/types/metro";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMetro } from "@/contexts/MetroContext";

interface LiftsInfoProps {
  lifts?: Lift[];
}

const LiftsInfo = ({ lifts }: LiftsInfoProps) => {
  const { getLocalizedText } = useMetro();
  
  if (!lifts || lifts.length === 0) {
    return null;
  }

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{getLocalizedText("Lifts & Escalators")}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-full max-h-[300px]">
          <div className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">{getLocalizedText("Name")}</TableHead>
                  <TableHead>{getLocalizedText("Location")}</TableHead>
                  <TableHead>{getLocalizedText("Position")}</TableHead>
                  <TableHead className="text-right">{getLocalizedText("Accessibility")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lifts.map((lift, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <ArrowUp className="w-4 h-4 mr-2 text-metro-orange" />
                        {lift.name}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate">{lift.location}</TableCell>
                    <TableCell>{lift.isInside ? getLocalizedText("Inside") : getLocalizedText("Outside")}</TableCell>
                    <TableCell className="text-right">
                      {lift.isDivyangFriendly ? (
                        <div className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800">
                          <ArrowUp className="w-3 h-3 mr-1" />
                          <span>{getLocalizedText("Accessible")}</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-800">
                          <span>{getLocalizedText("Not accessible")}</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LiftsInfo;

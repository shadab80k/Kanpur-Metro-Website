
import { Platform } from "@/types/metro";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Train } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMetro } from "@/contexts/MetroContext";

interface PlatformsInfoProps {
  platforms?: Platform[];
}

const PlatformsInfo = ({ platforms }: PlatformsInfoProps) => {
  const { getLocalizedText } = useMetro();
  
  if (!platforms || platforms.length === 0) {
    return null;
  }

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{getLocalizedText("Platforms")}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-full max-h-[300px]">
          <div className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">{getLocalizedText("Platform")}</TableHead>
                  <TableHead>{getLocalizedText("Direction")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {platforms.map((platform, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Train className="w-4 h-4 mr-2 text-metro-orange" />
                        {platform.number}
                      </div>
                    </TableCell>
                    <TableCell className="break-words">{platform.towards}</TableCell>
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

export default PlatformsInfo;

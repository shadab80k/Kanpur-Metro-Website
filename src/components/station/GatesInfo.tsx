
import { Gate } from "@/types/metro";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/contexts/ThemeContext";

interface GatesInfoProps {
  gates?: Gate[];
}

const GatesInfo = ({ gates }: GatesInfoProps) => {
  const { theme } = useTheme();

  if (!gates || gates.length === 0) {
    return null;
  }

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Gates</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Nearby</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gates.map((gate, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{gate.number}</TableCell>
                <TableCell>
                  {gate.isOpen ? (
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Open
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                      Closed
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-sm">
                  {gate.nearby.map((nearby, idx) => (
                    <div key={idx}>{nearby}</div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default GatesInfo;

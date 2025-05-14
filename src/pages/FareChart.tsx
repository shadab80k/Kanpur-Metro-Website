
import { useNavigate } from "react-router-dom";
import AppNavbar from "@/components/AppNavbar";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const FareChart = () => {
  const navigate = useNavigate();
  
  const fareData = [
    { distance: "Up to 1 km", fare: 10 },
    { distance: "1 – 2 km", fare: 15 },
    { distance: "3 – 6 km", fare: 20 },
    { distance: "7 – 9 km", fare: 30 },
    { distance: "10 – 13 km", fare: 40 },
    { distance: "14 – 17 km", fare: 50 },
    { distance: "18 km and above", fare: 60 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      <AppNavbar />
      
      <div className="p-4 flex-1">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost"
            onClick={() => navigate(-1)}
            className="p-0 h-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back</span>
          </Button>
        </div>
        
        <h1 className="text-lg font-semibold mb-4">Fare Chart</h1>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-4">
            The fare depends on the distance between stations. Smart card users get a 10% discount.
          </p>
          
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Distance
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fare (₹)
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-metro-orange uppercase tracking-wider">
                    Smart Card (₹)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fareData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {item.distance}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                      ₹{item.fare}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-metro-orange">
                      ₹{Math.floor(item.fare * 0.9)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6">
            <p className="text-xs text-gray-500">
              Note: Fares are based on the number of stations traveled and may vary slightly depending on the exact route.
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <Button
            onClick={() => navigate("/journey?fare=true")}
            className="w-full metro-button"
          >
            Calculate Your Fare
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FareChart;

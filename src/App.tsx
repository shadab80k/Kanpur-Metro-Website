
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MetroProvider } from "@/contexts/MetroContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Import our pages
import Index from "@/pages/Index";
import JourneyPlanner from "@/pages/JourneyPlanner";
import JourneyResult from "@/pages/JourneyResult";
import MetroMapPage from "@/pages/MetroMapPage";
import StationsListPage from "@/pages/StationsListPage";
import StationInfo from "@/pages/StationInfo";
import FareChart from "@/pages/FareChart";
import FareCalculator from "@/pages/FareCalculator";
import InfoPage from "@/pages/InfoPage";
import NotFound from "@/pages/NotFound";
import PopularRoutesPage from "@/pages/PopularRoutesPage";
import RecentJourneysPage from "@/pages/RecentJourneysPage";

// Create a client for React Query
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <MetroProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/journey" element={<JourneyPlanner />} />
              <Route path="/journey/result" element={<JourneyResult />} />
              <Route path="/map" element={<MetroMapPage />} />
              <Route path="/stations" element={<StationsListPage />} />
              <Route path="/stations/:stationName" element={<StationInfo />} />
              <Route path="/info" element={<InfoPage />} />
              <Route path="/fare-chart" element={<FareChart />} />
              <Route path="/fare-calculator" element={<FareCalculator />} />
              <Route path="/popular-routes" element={<PopularRoutesPage />} />
              <Route path="/recent-journeys" element={<RecentJourneysPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </MetroProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;


export interface Station {
  id: number;
  name: string;
  isOperational: boolean;
  isUnderground: boolean;
  landmarks?: string[];
  platformCount: number;
  nextTrains?: TrainSchedule[];
  location?: {
    lat: number;
    lng: number;
  };
  detailedInfo?: StationDetailedInfo;
}

export interface StationDetailedInfo {
  line: string;
  serviceStatus: string;
  city: string;
  gates: Gate[];
  lifts: Lift[];
  platforms: Platform[];
  facilities: StationFacility[];
  parking: ParkingCapacity;
}

export interface Gate {
  number: string;
  isOpen: boolean;
  nearby: string[];
  code: string;
}

export interface Lift {
  name: string;
  location: string;
  isInside: boolean;
  isDivyangFriendly: boolean;
  type: "LIFT" | "ESC"; // Escalator or Lift
}

export interface Platform {
  number: string;
  towards: string;
  code: string;
}

export interface StationFacility {
  type: "Water" | "Toilet" | "Ice-cream Parlor" | "Food / Restaurant";
  name: string;
  location: string;
}

export interface ParkingCapacity {
  bicycle: { available: number; total?: number };
  car: { available: number; total?: number };
  bike: { available: number; total?: number };
}

export interface TrainSchedule {
  destination: string;
  time: string;
  platform: number;
}

export interface Route {
  source: Station;
  destination: Station;
  stations: Station[];
  direction: "Towards Naubasta" | "Towards IIT Kanpur";
  distance: number; // in km
  duration: number; // in minutes
  fare: number; // in ₹
  smartCardFare: number; // in ₹
  platformNumber: number;
}

export type Language = "English" | "Hindi";

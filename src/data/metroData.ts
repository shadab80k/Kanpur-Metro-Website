
import { Station, Route, TrainSchedule, StationDetailedInfo, Gate, Lift, Platform, StationFacility, ParkingCapacity } from "../types/metro";

// Detailed station information
const stationDetailedInfoMap: Record<string, StationDetailedInfo> = {
  "IIT Kanpur": {
    line: "Line 1",
    serviceStatus: "Normal Service",
    city: "Kanpur",
    gates: [
      {
        number: "Gate No. 1",
        isOpen: true,
        nearby: ["NATIONAL SUGAR INSTITUTE"],
        code: "01"
      },
      {
        number: "Gate No. 2",
        isOpen: true,
        nearby: ["IIT KANPUR CAMPUS", "GOOBA GARDEN"],
        code: "02"
      }
    ],
    lifts: [
      {
        name: "ESC No.1",
        location: "Ground to Concourse",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "ESC No.2",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "ESC No.3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "LIFT No. 1",
        location: "Ground to Concourse",
        isInside: false,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 2",
        location: "Ground to Concourse",
        isInside: false,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 4",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      }
    ],
    platforms: [
      {
        number: "Platform No. 1",
        towards: "Towards KALYANPUR METRO",
        code: "01"
      },
      {
        number: "Platform No. 2",
        towards: "Towards KALYANPUR METRO",
        code: "02"
      }
    ],
    facilities: [
      {
        type: "Water",
        name: "WATER COOLER",
        location: "Concourse Paid area"
      },
      {
        type: "Toilet",
        name: "Toilet",
        location: "Concourse Paid area"
      },
      {
        type: "Food / Restaurant",
        name: "DOMINOS",
        location: "GROUND NEAR GATE-1"
      },
      {
        type: "Food / Restaurant",
        name: "BIKANERVALA",
        location: "GROUND NEAR GATE-2"
      },
      {
        type: "Food / Restaurant",
        name: "SAMOCHA",
        location: "CONCOURSE NEAR GATE-2 UNPAID"
      }
    ],
    parking: {
      bicycle: { available: 50 },
      car: { available: 15 },
      bike: { available: 30 }
    }
  },
  "Kalyanpur": {
    line: "Line 1",
    serviceStatus: "Normal Service",
    city: "Kanpur",
    gates: [
      {
        number: "Gate No. 1",
        isOpen: true,
        nearby: ["NEW AZAD NAGAR", "INDIRA NAGAR"],
        code: "01"
      },
      {
        number: "Gate No. 2",
        isOpen: true,
        nearby: ["KALYANPUR MARKET", "PARVATI NAGAR"],
        code: "02"
      }
    ],
    lifts: [
      {
        name: "ESC No.2",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "ESC No.3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "LIFT No. 1",
        location: "Ground to Concourse",
        isInside: false,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 2",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      }
    ],
    platforms: [
      {
        number: "Platform No. 1",
        towards: "Towards SPM HOSPITAL",
        code: "01"
      },
      {
        number: "Platform No. 2",
        towards: "Towards IIT KANPUR",
        code: "02"
      }
    ],
    facilities: [
      {
        type: "Water",
        name: "WATER COOLER",
        location: "Concourse Paid area"
      },
      {
        type: "Toilet",
        name: "Toilet",
        location: "Concourse Paid area"
      },
      {
        type: "Food / Restaurant",
        name: "WOW MOMO",
        location: "GROUND NEAR GATE-2"
      }
    ],
    parking: {
      bicycle: { available: 25 },
      car: { available: 0 },
      bike: { available: 15 }
    }
  },
  "SPM Hospital": {
    line: "Line 1",
    serviceStatus: "Normal Service",
    city: "Kanpur",
    gates: [
      {
        number: "Gate No. 1",
        isOpen: true,
        nearby: ["GULMOHAR EXOTICA APARTMENTS"],
        code: "01"
      },
      {
        number: "Gate No. 2",
        isOpen: true,
        nearby: ["BAGIA CROSSING"],
        code: "02"
      }
    ],
    lifts: [
      {
        name: "ESC No.1",
        location: "Ground to Concourse",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "ESC No.2",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "ESC No.3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "LIFT No. 1",
        location: "Ground to Concourse",
        isInside: false,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 2",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      }
    ],
    platforms: [
      {
        number: "Platform No. 1",
        towards: "Towards VISHWAVIDYALAYA METRO",
        code: "01"
      },
      {
        number: "Platform No. 2",
        towards: "Towards KALYANPUR METRO",
        code: "02"
      }
    ],
    facilities: [
      {
        type: "Water",
        name: "WATER COOLER",
        location: "Concourse Paid area"
      },
      {
        type: "Toilet",
        name: "Toilet",
        location: "Concourse Paid area"
      },
      {
        type: "Food / Restaurant",
        name: "CHINESE WOW",
        location: "GROUND NEAR GATE-2"
      }
    ],
    parking: {
      bicycle: { available: 30 },
      car: { available: 8 },
      bike: { available: 20 }
    }
  },
  "Vishwavidyalaya": {
    line: "Line 1",
    serviceStatus: "Normal Service",
    city: "Kanpur",
    gates: [
      {
        number: "Gate No. 1",
        isOpen: true,
        nearby: ["CSJM UNIVERSITY CAMPUS"],
        code: "01"
      },
      {
        number: "Gate No. 2",
        isOpen: true,
        nearby: ["IIPR CAMPUS"],
        code: "02"
      }
    ],
    lifts: [
      {
        name: "ESC No.1",
        location: "Ground to Concourse",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "ESC No.2",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "ESC No.3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "LIFT No. 1",
        location: "Ground to Concourse",
        isInside: false,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 2",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      }
    ],
    platforms: [
      {
        number: "Platform No. 1",
        towards: "Towards GURUDEV CHAURAHA",
        code: "01"
      },
      {
        number: "Platform No. 2",
        towards: "Towards SPM HOSPITAL",
        code: "02"
      }
    ],
    facilities: [
      {
        type: "Water",
        name: "WATER COOLER",
        location: "Concourse Paid area"
      },
      {
        type: "Toilet",
        name: "Toilet",
        location: "Concourse Paid area"
      },
      {
        type: "Food / Restaurant",
        name: "DOMINOS",
        location: "GROUND NEAR GATE-1"
      }
    ],
    parking: {
      bicycle: { available: 80 },
      car: { available: 20 },
      bike: { available: 60 }
    }
  },
  "Geeta Nagar": {
    line: "Line 1",
    serviceStatus: "Normal Service",
    city: "Kanpur",
    gates: [
      {
        number: "Gate No. 1",
        isOpen: true,
        nearby: ["NAWABGANJ"],
        code: "01"
      },
      {
        number: "Gate No. 2",
        isOpen: true,
        nearby: ["GEETA NAGAR", "SHARDA NAGAR", "CHAPEDA PULIA"],
        code: "02"
      }
    ],
    lifts: [
      {
        name: "ESC No.1",
        location: "Ground to Concourse",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "ESC No.2",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "LIFT No. 1",
        location: "Ground to Concourse",
        isInside: false,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 2",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      }
    ],
    platforms: [
      {
        number: "Platform No. 1",
        towards: "Towards RAWATPUR METRO",
        code: "01"
      },
      {
        number: "Platform No. 2",
        towards: "Towards GURUDEV CHAURAHA",
        code: "02"
      }
    ],
    facilities: [
      {
        type: "Water",
        name: "WATER COOLER",
        location: "Concourse Paid area"
      },
      {
        type: "Toilet",
        name: "Toilet",
        location: "Concourse Paid area"
      },
      {
        type: "Food / Restaurant",
        name: "DOMINOS",
        location: "GROUND NEAR GATE-1"
      }
    ],
    parking: {
      bicycle: { available: 30 },
      car: { available: 4 },
      bike: { available: 24 }
    }
  },
  "Rawatpur": {
    line: "Line 1",
    serviceStatus: "Normal Service",
    city: "Kanpur",
    gates: [
      {
        number: "Gate No. 1",
        isOpen: true,
        nearby: ["BUTLER PLACE", "AZAD UNIVERSITY", "LPS CARDIOLOGY"],
        code: "01"
      },
      {
        number: "Gate No. 2",
        isOpen: true,
        nearby: ["MOTI VIHAR SOCIETY", "RAVE MOTI MALL", "SARVODAY NAGAR"],
        code: "02"
      }
    ],
    lifts: [
      {
        name: "ESC No.1",
        location: "Ground to Concourse",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "ESC No.2",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "ESC No.3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "LIFT No. 1",
        location: "Ground to Concourse",
        isInside: false,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 2",
        location: "Ground to Concourse",
        isInside: false,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 4",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      }
    ],
    platforms: [
      {
        number: "Platform No. 1",
        towards: "Towards LLR HOSPITAL",
        code: "01"
      },
      {
        number: "Platform No. 2",
        towards: "Towards GEETA NAGAR",
        code: "02"
      }
    ],
    facilities: [
      {
        type: "Water",
        name: "WATER COOLER",
        location: "Concourse Paid area"
      },
      {
        type: "Toilet",
        name: "Toilet",
        location: "Concourse Paid area"
      },
      {
        type: "Food / Restaurant",
        name: "FOOD FORUM",
        location: "GROUND NEAR GATE-1"
      }
    ],
    parking: {
      bicycle: { available: 180 },
      car: { available: 30 },
      bike: { available: 150 }
    }
  }
};

// All stations on the Orange Line
export const orangeLineStations: Station[] = [
  {
    id: 1,
    name: "IIT Kanpur",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["IIT Kanpur Campus", "Kalyanpur Market"],
    detailedInfo: stationDetailedInfoMap["IIT Kanpur"]
  },
  {
    id: 2,
    name: "Kalyanpur",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["Kalyanpur Residential Area", "Shopping Complex"],
    detailedInfo: stationDetailedInfoMap["Kalyanpur"]
  },
  {
    id: 3,
    name: "SPM Hospital",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["SPM Hospital", "Medical College"],
    detailedInfo: stationDetailedInfoMap["SPM Hospital"]
  },
  {
    id: 4,
    name: "Vishwavidyalaya",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["Kanpur University", "Library"],
    detailedInfo: stationDetailedInfoMap["Vishwavidyalaya"]
  },
  {
    id: 5,
    name: "Gurudev Chauraha",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["Gurudev Market", "Bus Stop"],
  },
  {
    id: 6,
    name: "Geeta Nagar",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["Geeta Nagar Colony", "Park"],
    detailedInfo: stationDetailedInfoMap["Geeta Nagar"]
  },
  {
    id: 7,
    name: "Rawatpur",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["Rawatpur Railway Station", "Commercial Complex"],
    detailedInfo: stationDetailedInfoMap["Rawatpur"]
  },
  {
    id: 8,
    name: "LLR Hospital",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["LLR Hospital", "Medical College"],
  },
  {
    id: 9,
    name: "Motijheel",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["Motijheel Park", "Government Offices"],
  },
  {
    id: 10,
    name: "Chunniganj",
    isOperational: true,
    isUnderground: true,
    platformCount: 2,
    landmarks: ["Chunniganj Market", "Bus Terminal"],
  },
  {
    id: 11,
    name: "Naveen Market",
    isOperational: true,
    isUnderground: true,
    platformCount: 2,
    landmarks: ["Naveen Market", "Shopping District"],
  },
  {
    id: 12,
    name: "Bada Chauraha",
    isOperational: true,
    isUnderground: true,
    platformCount: 2,
    landmarks: ["Bada Chauraha Intersection", "Commercial Area"],
  },
  {
    id: 13,
    name: "Nayaganj",
    isOperational: true,
    isUnderground: true,
    platformCount: 2,
    landmarks: ["Nayaganj Market", "Residential Area"],
  },
  {
    id: 14,
    name: "Kanpur Central",
    isOperational: true,
    isUnderground: true,
    platformCount: 2,
    landmarks: ["Kanpur Central Railway Station", "Tourist Information Center"],
  },
  {
    id: 15,
    name: "Jhakarkati Bus Terminal",
    isOperational: true,
    isUnderground: true,
    platformCount: 2,
    landmarks: ["Jhakarkati Bus Terminal", "Food Court"],
  },
  {
    id: 16,
    name: "Transport Nagar",
    isOperational: true,
    isUnderground: true,
    platformCount: 2,
    landmarks: ["Transport Nagar", "Truck Terminal"],
  },
  {
    id: 17,
    name: "Baradevi",
    isOperational: true,
    isUnderground: true,
    platformCount: 2,
    landmarks: ["Baradevi Temple", "Market"],
  },
  {
    id: 18,
    name: "Kidwai Nagar",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["Kidwai Nagar Market", "Residential Colony"],
  },
  {
    id: 19,
    name: "Vasant Vihar",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["Vasant Vihar Colony", "Park"],
  },
  {
    id: 20,
    name: "Baudh Nagar",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["Baudh Nagar Market", "Community Center"],
  },
  {
    id: 21,
    name: "Naubasta",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["Naubasta Market", "Bus Depot"],
  },
];

// Helper function to generate dummy next train data
export function generateDummyNextTrains(stationId: number): TrainSchedule[] {
  const currentTime = new Date();
  const direction = stationId < 11 ? "Naubasta" : "IIT Kanpur";
  
  return [
    {
      destination: direction,
      time: new Date(currentTime.getTime() + 2 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      platform: 1,
    },
    {
      destination: direction,
      time: new Date(currentTime.getTime() + 7 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      platform: 1,
    },
    {
      destination: direction === "Naubasta" ? "IIT Kanpur" : "Naubasta",
      time: new Date(currentTime.getTime() + 4 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      platform: 2,
    },
  ];
}

// Calculate fare based on distance
export function calculateFare(distanceInKm: number): { fare: number; smartCardFare: number } {
  let fare = 0;
  
  if (distanceInKm <= 1) {
    fare = 10;
  } else if (distanceInKm <= 2) {
    fare = 15;
  } else if (distanceInKm <= 6) {
    fare = 20;
  } else if (distanceInKm <= 9) {
    fare = 30;
  } else if (distanceInKm <= 13) {
    fare = 40;
  } else if (distanceInKm <= 17) {
    fare = 50;
  } else {
    fare = 60;
  }
  
  // Smart card gives 10% discount
  const smartCardFare = Math.floor(fare * 0.9);
  
  return { fare, smartCardFare };
}

// Calculate distance between stations
export function calculateDistanceBetweenStations(sourceId: number, destinationId: number): number {
  // For simplicity, we'll assume each station is about 1.1 km apart on average
  // This gives us about 23.8 km total for 22 stations
  const stationDistance = 1.1;
  return Math.abs(sourceId - destinationId) * stationDistance;
}

// Get stations between source and destination
export function getStationsBetween(sourceId: number, destinationId: number): Station[] {
  const start = Math.min(sourceId, destinationId);
  const end = Math.max(sourceId, destinationId);
  
  // Sort stations based on the direction of travel
  const stationsBetween = orangeLineStations.filter(station => 
    station.id >= start && station.id <= end
  );
  
  // If traveling in reverse direction (from higher ID to lower ID)
  // we need to reverse the array of stations
  return sourceId > destinationId ? [...stationsBetween].reverse() : stationsBetween;
}

// Calculate travel time
export function calculateTravelTime(distanceInKm: number): number {
  // Assuming average speed of 35 km/h and 30 seconds per station stop
  const avgSpeedInKmPerMin = 35 / 60;
  const timeInMinutes = distanceInKm / avgSpeedInKmPerMin;
  const numberOfStops = Math.floor(distanceInKm / 1.1);
  const stationStopTimeInMinutes = numberOfStops * 0.5;
  
  return Math.ceil(timeInMinutes + stationStopTimeInMinutes);
}

// Get a complete route
export function getRoute(sourceId: number, destinationId: number): Route {
  const source = orangeLineStations.find(station => station.id === sourceId)!;
  const destination = orangeLineStations.find(station => station.id === destinationId)!;
  const distance = calculateDistanceBetween(sourceId, destinationId);
  const { fare, smartCardFare } = calculateFare(distance);
  const duration = calculateTravelTime(distance);
  
  // Get stations and determine direction based on IDs
  // Lower ID stations are towards IIT Kanpur (west)
  // Higher ID stations are towards Naubasta (east)
  const travelingEast = sourceId < destinationId;
  
  // Get stations in proper order based on direction
  const stationsBetween = getStationsBetween(sourceId, destinationId);
  
  // Determine direction text based on end points
  const direction = travelingEast 
    ? "Towards Naubasta"  // Going east (higher station ID)
    : "Towards IIT Kanpur";  // Going west (lower station ID)
  
  // Determine platform based on direction
  // Platform 1 is for eastbound trains (towards Naubasta)
  // Platform 2 is for westbound trains (towards IIT Kanpur)
  const platformNumber = travelingEast ? 1 : 2;
  
  return {
    source,
    destination,
    stations: stationsBetween,
    direction,
    distance,
    duration,
    fare,
    smartCardFare,
    platformNumber,
  };
}

// Helper function for calculating distance
export function calculateDistanceBetween(sourceId: number, destinationId: number): number {
  return calculateDistanceBetweenStations(sourceId, destinationId);
}

// Add alias export for backward compatibility
export const stations = orangeLineStations;

export type AppView = 
  | 'trip-planner' 
  | 'visa-checker' 
  | 'packing-weather' 
  | 'destination-events' 
  | 'saved-trips';

export type Season = 'summer' | 'autumn' | 'winter' | 'spring';

export type PlannerSubTab = 
  | 'comprehensive' 
  | 'visa' 
  | 'packing' 
  | 'events';

export type Currency = 'USD' | 'EUR' | 'JPY' | 'GBP' | 'AUD' | 'CNY' | 'HKD' | 'MYR';
export type TempUnit = 'C' | 'F';

export interface WeatherDay {
  day: string;
  date: string;
  tempC: number;
  minTempC: number;
  maxTempC: number;
  condition: string;
  icon: string;
  rainChance: number;
  windKmh: number;
  uvIndex: number;
}

export interface PackingItem {
  id: string;
  name: string;
  category: 'outerwear' | 'essentials' | 'tech-gear' | 'custom';
  tag?: string;
  badge?: string;
  packed: boolean;
  essential: boolean;
}

export interface TravelEvent {
  id: string;
  title: string;
  category: 'matsuri' | 'food' | 'arts' | 'foliage' | 'music';
  categoryLabel: string;
  dateStr: string;
  timeStr: string;
  location: string;
  transitTimeMin: number;
  crowdLevel: 'High' | 'Extreme' | 'Moderate' | 'Low';
  image: string;
  description: string;
  highlightBadge?: string;
  isBookmarked?: boolean;
  inItinerary?: boolean;
  itineraryDay?: number;
}

export interface VisaDetails {
  status: 'Visa-Free' | 'ETA / e-Visa' | 'Visa Required' | 'Visa on Arrival';
  durationDays: number;
  entryType: 'Single Entry' | 'Double Entry' | 'Multiple Entry' | string;
  summaryTitle: string;
  summarySubtitle: string;
  validityRequirement: string;
  biometricRequirement: string;
  processingTimeStdHours: number;
  processingTimeExpHours: number;
  standardFeeUsd: number;
  shoulderFeeUsd?: number;
  longTermFeeUsd?: number;
  officialPortalUrl: string;
  portalHost: string;
  applicationDeadlines: {
    label: string;
    dateStr: string;
    status: 'passed' | 'recommended' | 'limit' | 'exit';
  }[];
  dossierItems: {
    id: string;
    title: string;
    requirement: string;
    checked: boolean;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  embassies: {
    name: string;
    address: string;
    phone: string;
    hours: string;
  }[];
}

export interface DestinationData {
  id: string;
  city: string;
  country: string;
  countryFlag: string;
  airportCode: string;
  originCity: string;
  originAirport: string;
  travelDates: string;
  durationDays: number;
  passportNationality: string;
  season?: Season;
  heroImage: string;
  regionalMapImage?: string;
  transitPassName: string;
  transitPassDesc: string;
  
  // Metric Bar
  entryStatusSummary: string;
  entryStatusSubtext: string;
  typicalClimateTempC: number;
  typicalClimateDesc: string;
  seasonalPeakTitle: string;
  seasonalPeakSubtext: string;
  culturalEventsCount: number;
  culturalEventsSubtext: string;

  // Weather & Atmosphere
  weatherOverview: {
    headline: string;
    subheadline: string;
    tempC: number;
    feelsLikeC: number;
    precipMm: number;
    solarHours: string;
    sunriseTime: string;
    sunsetTime: string;
    auroraKp?: number;
    uvIndex: number;
    checklistTips: string[];
  };
  forecast7Days: WeatherDay[];
  windGustsHourly?: { hour: string; gustKmh: number }[];

  // Visa
  visa: VisaDetails;

  // Packing
  packingList: PackingItem[];
  packingWeightKg: number;
  packingMaxKg: number;

  // Events
  featuredEvent?: TravelEvent;
  eventsList: TravelEvent[];
}

export interface TripSummary {
  id: string;
  destinationId: string;
  title: string;
  dates: string;
  duration: string;
  daysRemaining: number;
  countryFlag: string;
  heroImage: string;
  visaStatus: string;
  packedCount: number;
  totalPackCount: number;
  weatherSummary: string;
}

export interface AppNotification {
  id: string;
  type: 'visa' | 'weather' | 'event' | 'consular';
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
  actionView?: AppView;
}

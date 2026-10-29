import { Place } from './place';
import { RouteResult, TravelMode } from './route';
export type { TravelMode };

export type TripDurationHours = 2 | 3 | 4 | 6 | 8;
export type TripInterest = 'heritage' | 'nature' | 'culture' | 'mix';
export type TripPace = 'relaxed' | 'packed';

export interface TripPreferences {
  durationHours: TripDurationHours;
  startTime: string; // e.g. "09:00"
  startingPoint: {
    useCurrentLocation: boolean;
    latitude: number;
    longitude: number;
    label: string;
  };
  interest: TripInterest;
  mode: TravelMode;
  pace: TripPace;
}

export interface ItineraryStop {
  stopNumber: number;
  place: Place;
  arrivalTime: string;
  departureTime: string;
  allocatedVisitMinutes: number;
  transitToNextStop?: {
    durationMinutes: number;
    distanceKm: number;
    mode: TravelMode;
    routeResult?: RouteResult;
  };
}

export interface GeneratedItinerary {
  id: string;
  createdAt: string;
  preferences: TripPreferences;
  stops: ItineraryStop[];
  totalVisitMinutes: number;
  totalTransitMinutes: number;
  totalDurationMinutes: number;
  totalDistanceKm: number;
  warnings: string[];
}

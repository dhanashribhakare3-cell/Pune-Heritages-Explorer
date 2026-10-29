export type TravelMode = 'driving' | 'walking' | 'transit';

export interface RouteLeg {
  instruction: string;
  distanceKm: number;
  durationMinutes: number;
}

export interface RouteResult {
  origin: { latitude: number; longitude: number; label?: string };
  destination: { latitude: number; longitude: number; label?: string };
  mode: TravelMode;
  distanceKm: number;
  durationMinutes: number;
  geometry?: [number, number][]; // Array of [lat, lng] for polyline mapping
  steps: RouteLeg[];
  isStraightLineEstimate: boolean;
  notice?: string;
}

export interface RouteProvider {
  getRoute(
    origin: { latitude: number; longitude: number; label?: string },
    destination: { latitude: number; longitude: number; label?: string },
    mode: TravelMode
  ): Promise<RouteResult>;
}

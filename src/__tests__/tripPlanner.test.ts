import { describe, it, expect } from 'vitest';
import { generateItinerary } from '../utils/tripPlanner';
import { DEMO_PLACES } from '../data/demoPlaces';
import { TripPreferences } from '../types/trip';
import { ApiPlacesProvider } from '../services/placesService';
import { calculateHaversineDistance } from '../utils/distance';

describe('Deterministic Trip Planner Engine', () => {
  const basePreferences: TripPreferences = {
    durationHours: 4,
    startTime: '09:30',
    startingPoint: {
      useCurrentLocation: false,
      latitude: 18.5195,
      longitude: 73.8553,
      label: 'Shaniwar Wada',
    },
    interest: 'heritage',
    mode: 'driving',
    pace: 'relaxed',
  };

  it('never exceeds the configured total duration threshold', () => {
    const itinerary = generateItinerary(DEMO_PLACES, basePreferences);
    const maxMinutes = basePreferences.durationHours * 60;
    expect(itinerary.totalDurationMinutes).toBeLessThanOrEqual(maxMinutes);
    expect(itinerary.stops.length).toBeGreaterThan(0);
  });

  it('orders stops deterministically from identical inputs', () => {
    const itin1 = generateItinerary(DEMO_PLACES, basePreferences);
    const itin2 = generateItinerary(DEMO_PLACES, basePreferences);
    expect(itin1.stops.map((s) => s.place.id)).toEqual(itin2.stops.map((s) => s.place.id));
  });

  it('safely handles empty datasets without throwing an exception', () => {
    const itinerary = generateItinerary([], basePreferences);
    expect(itinerary.stops).toHaveLength(0);
    expect(itinerary.warnings.length).toBeGreaterThan(0);
  });

  it('correctly sorts nearby places by distance', () => {
    const userLat = 18.5195;
    const userLng = 73.8553;

    const sorted = [...DEMO_PLACES].sort((a, b) => {
      const distA = calculateHaversineDistance(userLat, userLng, a.coordinates.latitude, a.coordinates.longitude);
      const distB = calculateHaversineDistance(userLat, userLng, b.coordinates.latitude, b.coordinates.longitude);
      return distA - distB;
    });

    expect(sorted[0].id).toBe('shaniwar-wada'); // 0 km away
  });
});

describe('API Provider Data Normalization & Error Handling', () => {
  const apiProvider = new ApiPlacesProvider('https://api.test-heritage.edu');

  it('normalizes arbitrary backend payloads into standard Place structure', () => {
    const rawPayload = {
      _id: 'sample-123',
      title: 'Kasba Ganpati Temple',
      type: 'religious heritage',
      summary: 'Historic Gramadaivat temple of Pune.',
      lat: 18.5198,
      lon: 73.8562,
      recommended_duration: 30,
    };

    const normalized = apiProvider.normalizeApiResponse(rawPayload);
    expect(normalized.id).toBe('sample-123');
    expect(normalized.name).toBe('Kasba Ganpati Temple');
    expect(normalized.category).toBe('Religious Heritage');
    expect(normalized.coordinates.latitude).toBe(18.5198);
    expect(normalized.coordinates.longitude).toBe(73.8562);
    expect(normalized.visitingDurationMinutes).toBe(30);
    expect(normalized.dataSource).toBe('official_api');
  });
});

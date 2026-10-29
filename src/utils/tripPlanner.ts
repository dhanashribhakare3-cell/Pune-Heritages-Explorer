import { Place } from '../types/place';
import { TripPreferences, GeneratedItinerary, ItineraryStop } from '../types/trip';
import { calculateHaversineDistance } from './distance';

/**
 * Deterministic itinerary generator:
 * 1. Filters places based on selected user interest.
 * 2. Orders stops using nearest-neighbor heuristic from the starting point.
 * 3. Incorporates visit duration, road transit time, and pace padding.
 * 4. Ensures total duration strictly respects the requested budget.
 */
export function generateItinerary(
  allPlaces: Place[],
  preferences: TripPreferences
): GeneratedItinerary {
  const warnings: string[] = [];
  const maxAllowedMinutes = preferences.durationHours * 60;

  if (allPlaces.length === 0) {
    return createEmptyItinerary(preferences, ['No destinations found in the active catalog to construct an itinerary.']);
  }

  // Step 1: Filter destinations by interest
  let eligiblePlaces = allPlaces.filter((place) => {
    switch (preferences.interest) {
      case 'heritage':
        return place.category === 'Historical Monuments' || place.category === 'Forts and Palaces';
      case 'nature':
        return place.category === 'Gardens and Parks' || place.category === 'Lakes and Nature Spots' || place.isGreenEscape;
      case 'culture':
        return place.category === 'Museums and Cultural Places' || place.category === 'Religious Heritage';
      case 'mix':
      default:
        return true;
    }
  });

  if (eligiblePlaces.length === 0) {
    warnings.push(`No exact matches for '${preferences.interest}'. Broadened selection to all heritage & green locations.`);
    eligiblePlaces = [...allPlaces];
  }

  // Pace multiplier on visit duration
  const paceVisitMultiplier = preferences.pace === 'relaxed' ? 1.2 : 0.85;

  // Step 2: Route optimization from starting coordinates
  let currentLat = preferences.startingPoint.latitude;
  let currentLng = preferences.startingPoint.longitude;
  let remainingPlaces = [...eligiblePlaces];

  const stops: ItineraryStop[] = [];
  let accumulatedMinutes = 0;
  let accumulatedDistanceKm = 0;

  // Parse start time (e.g. "09:30")
  const [startH, startM] = preferences.startTime.split(':').map(Number);
  let currentTimeMinutes = (isNaN(startH) ? 9 : startH) * 60 + (isNaN(startM) ? 0 : startM);

  let stopCounter = 1;

  while (remainingPlaces.length > 0 && accumulatedMinutes < maxAllowedMinutes) {
    // Find nearest neighbor to current location
    let nearestIndex = -1;
    let shortestDistance = Infinity;

    for (let i = 0; i < remainingPlaces.length; i++) {
      const candidate = remainingPlaces[i];
      const dist = calculateHaversineDistance(
        currentLat,
        currentLng,
        candidate.coordinates.latitude,
        candidate.coordinates.longitude
      );
      if (dist < shortestDistance) {
        shortestDistance = dist;
        nearestIndex = i;
      }
    }

    if (nearestIndex === -1) break;

    const nextPlace = remainingPlaces[nearestIndex];

    // Estimate transit time
    const roadDist = Math.max(0.5, Math.round(shortestDistance * 1.35 * 10) / 10);
    const speed = preferences.mode === 'walking' ? 4.5 : preferences.mode === 'transit' ? 16 : 24;
    const transitMinutes = Math.max(5, Math.round((roadDist / speed) * 60));

    // Scaled visit duration
    const allocatedVisit = Math.max(25, Math.round(nextPlace.visitingDurationMinutes * paceVisitMultiplier));

    // Buffer for lunch/rest if total trip exceeds 3.5 hours and already has 2 stops
    const breakBuffer = accumulatedMinutes > 210 && stops.length === 2 ? 30 : 0;

    const projectedTotal = accumulatedMinutes + transitMinutes + allocatedVisit + breakBuffer;

    if (projectedTotal > maxAllowedMinutes && stops.length >= 1) {
      // Reached budget limit
      break;
    }

    // Apply stop
    accumulatedMinutes += transitMinutes + allocatedVisit + breakBuffer;
    accumulatedDistanceKm += roadDist;

    const arrivalTimeMinutes = currentTimeMinutes + transitMinutes + breakBuffer;
    const departureTimeMinutes = arrivalTimeMinutes + allocatedVisit;

    const arrivalStr = formatClockTime(arrivalTimeMinutes);
    const departureStr = formatClockTime(departureTimeMinutes);

    stops.push({
      stopNumber: stopCounter++,
      place: nextPlace,
      arrivalTime: arrivalStr,
      departureTime: departureStr,
      allocatedVisitMinutes: allocatedVisit,
      transitToNextStop: {
        durationMinutes: transitMinutes,
        distanceKm: roadDist,
        mode: preferences.mode,
      },
    });

    currentTimeMinutes = departureTimeMinutes;
    currentLat = nextPlace.coordinates.latitude;
    currentLng = nextPlace.coordinates.longitude;
    remainingPlaces.splice(nearestIndex, 1);
  }

  if (stops.length === 0) {
    return createEmptyItinerary(preferences, [
      'The selected duration was too short to visit the nearest destinations. Try increasing your available duration to 3 or 4 hours.'
    ]);
  }

  // Clear transit notice on the final stop
  if (stops.length > 0) {
    stops[stops.length - 1].transitToNextStop = undefined;
  }

  return {
    id: `itin-${Date.now()}`,
    createdAt: new Date().toISOString(),
    preferences,
    stops,
    totalVisitMinutes: stops.reduce((sum, s) => sum + s.allocatedVisitMinutes, 0),
    totalTransitMinutes: accumulatedMinutes - stops.reduce((sum, s) => sum + s.allocatedVisitMinutes, 0),
    totalDurationMinutes: accumulatedMinutes,
    totalDistanceKm: Math.round(accumulatedDistanceKm * 10) / 10,
    warnings,
  };
}

function formatClockTime(totalMinutes: number): string {
  const normalized = totalMinutes % (24 * 60);
  const hours = Math.floor(normalized / 60);
  const mins = normalized % 60;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMins = mins < 10 ? `0${mins}` : mins;
  return `${displayHours}:${displayMins} ${ampm}`;
}

function createEmptyItinerary(preferences: TripPreferences, warnings: string[]): GeneratedItinerary {
  return {
    id: `itin-empty-${Date.now()}`,
    createdAt: new Date().toISOString(),
    preferences,
    stops: [],
    totalVisitMinutes: 0,
    totalTransitMinutes: 0,
    totalDurationMinutes: 0,
    totalDistanceKm: 0,
    warnings,
  };
}

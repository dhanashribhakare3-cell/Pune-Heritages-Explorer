import React, { useState, useEffect } from 'react';
import { placesService } from '../services/placesService';
import { Place } from '../types/place';
import { TripPreferences, TripDurationHours, TripInterest, TravelMode, TripPace, GeneratedItinerary } from '../types/trip';
import { generateItinerary } from '../utils/tripPlanner';
import { useUserLocation } from '../hooks/useUserLocation';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { routeService } from '../services/routeService';
import { InteractiveMap } from '../components/map/InteractiveMap';
import {
  Clock, MapPin, Navigation,
  RotateCcw, Bookmark, AlertTriangle, ArrowRight, Check, Trash2, RefreshCw
} from 'lucide-react';

export const PlanMyDayPage: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  const { coordinates, requestLocation } = useUserLocation();
  const [savedItineraries, setSavedItineraries] = useLocalStorage<GeneratedItinerary[]>('saved_itineraries', []);
  const [itinerarySavedToast, setItinerarySavedToast] = useState(false);

  // Preference Form States
  const [durationHours, setDurationHours] = useState<TripDurationHours>(4);
  const [startTime, setStartTime] = useState('09:30');
  const [interest, setInterest] = useState<TripInterest>('mix');
  const [mode, setMode] = useState<TravelMode>('driving');
  const [pace, setPace] = useState<TripPace>('relaxed');
  const [startLandmarkId, setStartLandmarkId] = useState<string>('shaniwar-wada');

  // Generated Plan
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);

  useEffect(() => {
    placesService.getPlaces().then((data) => {
      setPlaces(data);
      setLoading(false);

      // Auto-generate initial itinerary suggestion once catalog loads
      const starterPrefs: TripPreferences = {
        durationHours: 4,
        startTime: '09:30',
        startingPoint: {
          useCurrentLocation: false,
          latitude: 18.5195,
          longitude: 73.8553,
          label: 'Shaniwar Wada (Central Heritage Hub)',
        },
        interest: 'mix',
        mode: 'driving',
        pace: 'relaxed',
      };
      setItinerary(generateItinerary(data, starterPrefs));
    });
  }, []);

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (places.length === 0) return;

    let startCoord = { latitude: 18.5195, longitude: 73.8553, label: 'Shaniwar Wada' };
    if (coordinates) {
      startCoord = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        label: 'My Current Location (GPS)',
      };
    } else {
      const landmark = places.find((p) => p.id === startLandmarkId);
      if (landmark) {
        startCoord = {
          latitude: landmark.coordinates.latitude,
          longitude: landmark.coordinates.longitude,
          label: landmark.name,
        };
      }
    }

    const prefs: TripPreferences = {
      durationHours,
      startTime,
      startingPoint: {
        useCurrentLocation: Boolean(coordinates),
        ...startCoord,
      },
      interest,
      mode,
      pace,
    };

    const result = generateItinerary(places, prefs);
    setItinerary(result);
  };

  const handleRemoveStop = (stopIndex: number) => {
    if (!itinerary) return;
    const remainingStops = itinerary.stops.filter((_, idx) => idx !== stopIndex);
    // Re-index stop numbers
    const updatedStops = remainingStops.map((stop, idx) => ({
      ...stop,
      stopNumber: idx + 1,
    }));
    setItinerary({
      ...itinerary,
      stops: updatedStops,
      totalVisitMinutes: updatedStops.reduce((sum, s) => sum + s.allocatedVisitMinutes, 0),
    });
  };

  const handleReplaceStop = (stopIndex: number) => {
    if (!itinerary || places.length === 0) return;
    const currentStop = itinerary.stops[stopIndex];
    // Find candidate of same category not currently in itinerary
    const usedIds = new Set(itinerary.stops.map((s) => s.place.id));
    const candidate = places.find((p) => !usedIds.has(p.id) && (p.category === currentStop.place.category || p.isGreenEscape === currentStop.place.isGreenEscape));
    if (candidate) {
      const updatedStops = [...itinerary.stops];
      updatedStops[stopIndex] = {
        ...currentStop,
        place: candidate,
      };
      setItinerary({
        ...itinerary,
        stops: updatedStops,
      });
    }
  };

  const handleSaveItinerary = () => {
    if (!itinerary) return;
    setSavedItineraries((prev) => [itinerary, ...prev]);
    setItinerarySavedToast(true);
    setTimeout(() => setItinerarySavedToast(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#9A3412] block">
          Intelligent Trip Assembly
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#12281E]">
          Plan My Day: Automatic Itinerary
        </h1>
        <p className="text-stone-700 text-sm sm:text-base max-w-2xl leading-relaxed">
          Specify your available hours, start time, and interests. Our deterministic itinerary engine generates an optimized schedule with visit durations and transit estimates.
        </p>
      </div>

      {/* Preferences Form Card */}
      <form
        onSubmit={handleGenerate}
        className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2D8C3] shadow-[0_4px_20px_rgba(27,56,43,0.06)] space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Duration */}
          <div>
            <label className="block text-xs font-bold text-[#12281E] uppercase tracking-wider mb-2">
              Time Available
            </label>
            <select
              value={durationHours}
              onChange={(e) => setDurationHours(Number(e.target.value) as TripDurationHours)}
              className="w-full px-3 py-2.5 text-xs bg-[#FDFBF7] border border-[#E2D8C3] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1B382B]"
            >
              <option value={2}>2 Hours (Express Visit)</option>
              <option value={3}>3 Hours (Short Half-Day)</option>
              <option value={4}>4 Hours (Standard Half-Day)</option>
              <option value={6}>6 Hours (Extended Journey)</option>
              <option value={8}>8 Hours (Full Day Exploration)</option>
            </select>
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-xs font-bold text-[#12281E] uppercase tracking-wider mb-2">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-[#FDFBF7] border border-[#E2D8C3] rounded-xl focus:outline-none"
            />
          </div>

          {/* Starting Point */}
          <div>
            <label className="block text-xs font-bold text-[#12281E] uppercase tracking-wider mb-2">
              Starting Location
            </label>
            {coordinates ? (
              <div className="px-3 py-2.5 text-xs bg-[#F2F7F4] border border-[#DFEDE4] rounded-xl text-[#1B382B] flex items-center justify-between">
                <span className="font-semibold">My Current GPS Location</span>
                <span className="text-[10px] text-emerald-700 font-bold">Active</span>
              </div>
            ) : (
              <select
                value={startLandmarkId}
                onChange={(e) => setStartLandmarkId(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-[#FDFBF7] border border-[#E2D8C3] rounded-xl focus:outline-none"
              >
                {places.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Interest */}
          <div>
            <label className="block text-xs font-bold text-[#12281E] uppercase tracking-wider mb-2">
              Primary Interest
            </label>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value as TripInterest)}
              className="w-full px-3 py-2.5 text-xs bg-[#FDFBF7] border border-[#E2D8C3] rounded-xl focus:outline-none"
            >
              <option value="mix">Balanced Mix (Heritage & Nature)</option>
              <option value="heritage">Heritage Forts & Monuments</option>
              <option value="nature">Gardens, Parks & Lakes</option>
              <option value="culture">Museums & Religious Shrines</option>
            </select>
          </div>

          {/* Travel Mode */}
          <div>
            <label className="block text-xs font-bold text-[#12281E] uppercase tracking-wider mb-2">
              Travel Preference
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as TravelMode)}
              className="w-full px-3 py-2.5 text-xs bg-[#FDFBF7] border border-[#E2D8C3] rounded-xl focus:outline-none"
            >
              <option value="driving">Car / Taxi (~24 km/h)</option>
              <option value="transit">Public Bus / PMPML Transit (~16 km/h)</option>
              <option value="walking">Pedestrian Walking (~4.5 km/h)</option>
            </select>
          </div>

          {/* Pace */}
          <div>
            <label className="block text-xs font-bold text-[#12281E] uppercase tracking-wider mb-2">
              Trip Pacing
            </label>
            <select
              value={pace}
              onChange={(e) => setPace(e.target.value as TripPace)}
              className="w-full px-3 py-2.5 text-xs bg-[#FDFBF7] border border-[#E2D8C3] rounded-xl focus:outline-none"
            >
              <option value="relaxed">Relaxed (Longer Visits & Leisure)</option>
              <option value="packed">Packed (Maximum Sights)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#EFE9DC]">
          {!coordinates ? (
            <button
              type="button"
              onClick={requestLocation}
              className="text-xs text-[#C85A32] hover:underline flex items-center gap-1 font-semibold"
            >
              <MapPin className="w-3.5 h-3.5" /> Use current GPS as starting point
            </button>
          ) : (
            <span className="text-xs text-stone-500">Route begins from your verified device coordinates</span>
          )}

          <button
            type="submit"
            className="ml-auto px-6 py-3 rounded-xl bg-[#1B382B] hover:bg-[#12281E] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Generate Itinerary</span>
          </button>
        </div>
      </form>

      {/* Generated Itinerary Display */}
      {itinerary && itinerary.stops.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F8F5EE] p-6 rounded-2xl border border-[#E2D8C3]">
            <div>
              <span className="text-xs font-bold text-[#9A3412] uppercase tracking-wider block">
                Optimized Journey Sequence
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#12281E] mt-0.5">
                Suggested Day Plan ({itinerary.stops.length} Stops)
              </h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-stone-600 mt-1">
                <span>Total Budget: ~{itinerary.totalDurationMinutes} mins</span>
                <span>·</span>
                <span>Visits: {itinerary.totalVisitMinutes} mins</span>
                <span>·</span>
                <span>Transit: {itinerary.totalTransitMinutes} mins</span>
                <span>·</span>
                <span>Distance: ~{itinerary.totalDistanceKm} km</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveItinerary}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#E2D8C3] text-stone-800 hover:bg-[#FDFBF7] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                {itinerarySavedToast ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-[#B89324]" />
                    <span>Save Itinerary</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {itinerary.warnings.length > 0 && (
            <div className="p-4 bg-[#FBF8EF] border border-[#EFE9DC] rounded-xl space-y-1">
              {itinerary.warnings.map((warn, i) => (
                <div key={i} className="text-xs text-stone-700 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#B89324] flex-shrink-0" />
                  <span>{warn}</span>
                </div>
              ))}
            </div>
          )}

          {/* Visual Timeline Cards */}
          <div className="space-y-4">
            {itinerary.stops.map((stop, idx) => (
              <div
                key={stop.place.id}
                className="bg-white rounded-2xl border border-[#E2D8C3] overflow-hidden shadow-[0_2px_10px_rgba(27,56,43,0.04)] p-6 flex flex-col md:flex-row gap-6 items-start"
              >
                {/* Stop Marker Number */}
                <div className="w-12 h-12 rounded-xl bg-[#1B382B] text-white flex items-center justify-center font-serif text-xl font-bold flex-shrink-0">
                  {stop.stopNumber}
                </div>

                {/* Stop Thumbnail */}
                <img
                  src={stop.place.coverImage}
                  alt={stop.place.name}
                  referrerPolicy="no-referrer"
                  className="w-full md:w-44 h-32 object-cover rounded-xl bg-[#F8F5EE]"
                />

                {/* Stop Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-serif text-xl font-bold text-[#12281E]">
                      {stop.place.name}
                    </h3>
                    <div className="text-xs font-semibold text-stone-700 bg-[#F8F5EE] px-3 py-1 rounded-md border border-[#E2D8C3]">
                      Arrival {stop.arrivalTime} – Depart {stop.departureTime}
                    </div>
                  </div>

                  <p className="text-stone-600 text-xs line-clamp-2 leading-relaxed">
                    {stop.place.shortDescription}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-stone-600 font-medium">
                    <span className="flex items-center gap-1 text-[#1B382B]">
                      <Clock className="w-3.5 h-3.5 text-[#1B382B]" />
                      Visit: ~{stop.allocatedVisitMinutes} mins
                    </span>
                    {stop.transitToNextStop && (
                      <span className="text-[#9A3412]">
                        &rarr; Transit to Next Stop: ~{stop.transitToNextStop.durationMinutes} mins ({stop.transitToNextStop.distanceKm} km via {itinerary.preferences.mode})
                      </span>
                    )}
                  </div>
                </div>

                {/* Stop Actions */}
                <div className="flex md:flex-col gap-2 w-full md:w-auto">
                  <a
                    href={routeService.getExternalDirectionsUrl(
                      stop.place.coordinates.latitude,
                      stop.place.coordinates.longitude,
                      stop.place.name,
                      itinerary.preferences.mode
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-3 py-2 bg-[#F8F5EE] hover:bg-[#EFE9DC] text-[#12281E] text-xs font-semibold rounded-lg text-center flex items-center justify-center gap-1.5 transition-colors border border-[#E2D8C3]"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Directions</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleReplaceStop(idx)}
                    className="px-3 py-2 text-xs font-medium text-stone-600 hover:text-[#1B382B] rounded-lg text-center transition-colors flex items-center justify-center gap-1"
                    title="Replace with similar destination"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Replace</span>
                  </button>

                  {itinerary.stops.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveStop(idx)}
                      className="px-3 py-2 text-xs text-stone-400 hover:text-red-700 rounded-lg text-center transition-colors flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Route Map Preview */}
          <div className="bg-white p-4 rounded-2xl border border-[#E2D8C3] shadow-[0_4px_20px_rgba(27,56,43,0.06)] space-y-2">
            <h3 className="font-serif font-bold text-[#12281E] text-base px-2">Itinerary Stops on Map</h3>
            <InteractiveMap
              places={itinerary.stops.map((s) => s.place)}
              className="h-80 w-full rounded-xl overflow-hidden"
            />
          </div>
        </div>
      )}
    </div>
  );
};

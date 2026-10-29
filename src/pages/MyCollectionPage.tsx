import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { placesService } from '../services/placesService';
import { Place } from '../types/place';
import { GeneratedItinerary } from '../types/trip';
import { PlaceCard } from '../components/common/PlaceCard';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Bookmark, CheckCircle2, Calendar, Trash2, ArrowRight, Info } from 'lucide-react';

export const MyCollectionPage: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [activeTab, setActiveTab] = useState<'saved' | 'visited' | 'itineraries'>('saved');

  const [savedPlaceIds, setSavedPlaceIds] = useLocalStorage<string[]>('saved_places', []);
  const [visitedPlaceIds, setVisitedPlaceIds] = useLocalStorage<string[]>('visited_places', []);
  const [savedItineraries, setSavedItineraries] = useLocalStorage<GeneratedItinerary[]>('saved_itineraries', []);

  const navigate = useNavigate();

  useEffect(() => {
    placesService.getPlaces().then((data) => setPlaces(data));
  }, []);

  const savedPlaces = places.filter((p) => savedPlaceIds.includes(p.id));
  const visitedPlaces = places.filter((p) => visitedPlaceIds.includes(p.id));

  const handleRemoveSaved = (id: string) => {
    setSavedPlaceIds((prev) => prev.filter((p) => p !== id));
  };

  const handleRemoveVisited = (id: string) => {
    setVisitedPlaceIds((prev) => prev.filter((p) => p !== id));
  };

  const handleRemoveItinerary = (itinId: string) => {
    setSavedItineraries((prev) => prev.filter((it) => it.id !== itinId));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Editorial Header */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#9A3412] block">
          Personal Travel Ledger
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#12281E]">
          My Heritage Collection
        </h1>
        <p className="text-stone-700 text-sm sm:text-base max-w-2xl leading-relaxed">
          Manage your saved monuments, marked visits, and generated multi-stop day trips.
        </p>
      </div>

      {/* Local Storage Privacy / Device Explanation Notice */}
      <div className="p-4 bg-[#F8F5EE] border border-[#E2D8C3] rounded-2xl flex items-start gap-3 text-xs text-stone-600">
        <Info className="w-4 h-4 text-[#1B382B] flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Browser-Local Persistence:</strong> Your saved destinations and itineraries are stored directly within your browser's local memory (<code className="font-mono text-[11px] bg-white px-1 py-0.5 rounded border border-[#E2D8C3]">localStorage</code>). No cloud account or external sign-in is required. Data is preserved across sessions on this device.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2D8C3] pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'saved'
              ? 'bg-[#1B382B] text-white shadow-sm'
              : 'bg-white border border-[#E2D8C3] text-stone-700 hover:bg-[#F8F5EE]'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Places ({savedPlaces.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('visited')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'visited'
              ? 'bg-[#1B382B] text-white shadow-sm'
              : 'bg-white border border-[#E2D8C3] text-stone-700 hover:bg-[#F8F5EE]'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Visited Places ({visitedPlaces.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('itineraries')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'itineraries'
              ? 'bg-[#1B382B] text-white shadow-sm'
              : 'bg-white border border-[#E2D8C3] text-stone-700 hover:bg-[#F8F5EE]'
          }`}
        >
          <Calendar className="w-4 h-4 text-[#E5C07B]" />
          <span>Saved Itineraries ({savedItineraries.length})</span>
        </button>
      </div>

      {/* Tab 1: Saved Places */}
      {activeTab === 'saved' && (
        <div>
          {savedPlaces.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#E2D8C3] space-y-3">
              <p className="font-serif text-xl font-bold text-[#12281E]">No saved places yet</p>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Bookmark monuments and green escapes across the catalog to build your travel list.
              </p>
              <button
                type="button"
                onClick={() => navigate('/map')}
                className="px-5 py-2.5 bg-[#1B382B] text-white rounded-xl text-xs font-semibold hover:bg-[#12281E]"
              >
                Browse Pune Map
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  isSaved={true}
                  onToggleSave={handleRemoveSaved}
                  onSelect={(p) => navigate(`/place/${p.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Visited Places */}
      {activeTab === 'visited' && (
        <div>
          {visitedPlaces.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#E2D8C3] space-y-3">
              <p className="font-serif text-xl font-bold text-[#12281E]">No visited places recorded</p>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Check off destinations you have physically explored to maintain a personal Pune travel journal.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visitedPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  isVisited={true}
                  onToggleVisited={handleRemoveVisited}
                  onSelect={(p) => navigate(`/place/${p.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Saved Itineraries */}
      {activeTab === 'itineraries' && (
        <div className="space-y-4">
          {savedItineraries.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#E2D8C3] space-y-3">
              <p className="font-serif text-xl font-bold text-[#12281E]">No saved itineraries</p>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Use "Plan My Day" to generate customized 2, 4, or 8-hour trips and save them here.
              </p>
              <button
                type="button"
                onClick={() => navigate('/plan-my-day')}
                className="px-5 py-2.5 bg-[#1B382B] text-white rounded-xl text-xs font-semibold hover:bg-[#12281E]"
              >
                Plan a Day Trip
              </button>
            </div>
          ) : (
            savedItineraries.map((it) => (
              <div
                key={it.id}
                className="bg-white p-6 rounded-2xl border border-[#E2D8C3] shadow-[0_2px_10px_rgba(27,56,43,0.04)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9A3412]">
                      {it.preferences.durationHours}-Hour Itinerary
                    </span>
                    <span className="text-stone-300">·</span>
                    <span className="text-xs text-stone-500">
                      Mode: {it.preferences.mode}
                    </span>
                    <span className="text-stone-300">·</span>
                    <span className="text-xs text-stone-500">
                      Pace: {it.preferences.pace}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#12281E]">
                    {it.stops.length} Stops Sequence
                  </h3>

                  <p className="text-xs text-stone-700 font-medium">
                    {it.stops.map((s) => s.place.name).join(' → ')}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-stone-500 pt-1">
                    <span>Visits: {it.totalVisitMinutes} mins</span>
                    <span>·</span>
                    <span>Transit: {it.totalTransitMinutes} mins</span>
                    <span>·</span>
                    <span>Distance: ~{it.totalDistanceKm} km</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto">
                  <button
                    type="button"
                    onClick={() => handleRemoveItinerary(it.id)}
                    className="p-2 text-stone-400 hover:text-red-700 rounded-lg transition-colors border border-transparent hover:border-red-200"
                    title="Remove saved itinerary"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

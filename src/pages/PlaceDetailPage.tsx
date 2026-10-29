import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { placesService } from '../services/placesService';
import { Place } from '../types/place';
import { routeService } from '../services/routeService';
import { useUserLocation } from '../hooks/useUserLocation';
import { calculateHaversineDistance, formatDistance } from '../utils/distance';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Badge } from '../components/common/Badge';
import { InteractiveMap } from '../components/map/InteractiveMap';
import {
  MapPin, Clock, Bookmark, CheckCircle2, Navigation,
  Calendar, Info, ArrowLeft, ExternalLink, ShieldAlert
} from 'lucide-react';

export const PlaceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);

  const { coordinates, requestLocation } = useUserLocation();
  const [savedPlaceIds, setSavedPlaceIds] = useLocalStorage<string[]>('saved_places', []);
  const [visitedPlaceIds, setVisitedPlaceIds] = useLocalStorage<string[]>('visited_places', []);

  useEffect(() => {
    if (id) {
      placesService.getPlaceById(id).then((data) => {
        setPlace(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return <div className="py-24 text-center font-serif text-stone-500">Loading heritage destination...</div>;
  }

  if (!place) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#12281E]">Destination Record Not Found</h2>
        <p className="text-stone-600 text-sm">We could not locate this place in the active database or demo records.</p>
        <button
          onClick={() => navigate('/map')}
          className="px-4 py-2 bg-[#1B382B] text-white rounded-lg text-xs font-semibold"
        >
          Return to Explore Map
        </button>
      </div>
    );
  }

  const isSaved = savedPlaceIds.includes(place.id);
  const isVisited = visitedPlaceIds.includes(place.id);

  const toggleSave = () => {
    setSavedPlaceIds((prev) =>
      prev.includes(place.id) ? prev.filter((p) => p !== place.id) : [...prev, place.id]
    );
  };

  const toggleVisited = () => {
    setVisitedPlaceIds((prev) =>
      prev.includes(place.id) ? prev.filter((p) => p !== place.id) : [...prev, place.id]
    );
  };

  const distanceKm = coordinates
    ? calculateHaversineDistance(
        coordinates.latitude,
        coordinates.longitude,
        place.coordinates.latitude,
        place.coordinates.longitude
      )
    : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#1B382B] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Main Hero Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="green">{place.category}</Badge>
          {place.isHiddenGem && <Badge variant="gold">Hidden Gem</Badge>}
          {place.dataSource === 'official_api' ? (
            <Badge variant="neutral">Verified Official API Record</Badge>
          ) : (
            <Badge variant="neutral">Curated Demo Catalog</Badge>
          )}
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#12281E]">
          {place.name}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600">
          {place.neighbourhood && (
            <span className="flex items-center gap-1 font-medium text-stone-700">
              <MapPin className="w-4 h-4 text-[#C85A32]" />
              {place.neighbourhood}
            </span>
          )}

          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-stone-400" />
            Recommended Visit: ~{place.visitingDurationMinutes} mins
          </span>

          {distanceKm !== null ? (
            <span className="font-semibold text-[#1B382B] bg-[#F2F7F4] px-2 py-0.5 rounded border border-[#DFEDE4]">
              {formatDistance(distanceKm)} from your current GPS
            </span>
          ) : (
            <button
              onClick={requestLocation}
              className="text-[#C85A32] hover:underline flex items-center gap-1 font-medium"
            >
              <MapPin className="w-3.5 h-3.5" /> Check distance from me
            </button>
          )}
        </div>
      </div>

      {/* Primary Visual & Actions Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-2xl overflow-hidden border border-[#E2D8C3] shadow-[0_4px_20px_rgba(27,56,43,0.06)] aspect-[16/10] bg-[#F8F5EE]">
          <img
            src={place.coverImage}
            alt={place.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Action Panel */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2D8C3] shadow-[0_2px_10px_rgba(27,56,43,0.04)] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#12281E]">Visitor Controls</h3>

            <button
              type="button"
              onClick={toggleSave}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                isSaved
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-white border-[#E2D8C3] text-stone-700 hover:bg-[#F8F5EE]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current text-[#B89324]' : ''}`} />
              <span>{isSaved ? 'Saved in My Collection' : 'Save to My Collection'}</span>
            </button>

            <button
              type="button"
              onClick={toggleVisited}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                isVisited
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-white border-[#E2D8C3] text-stone-700 hover:bg-[#F8F5EE]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isVisited ? 'Visited' : 'Mark as Visited'}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/plan-my-day')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#F8F5EE] hover:bg-[#EFE9DC] border border-[#E2D8C3] text-[#12281E] flex items-center justify-center gap-2 transition-colors"
            >
              <Calendar className="w-4 h-4 text-[#9A3412]" />
              <span>Add to Day Plan</span>
            </button>
          </div>

          <div className="pt-4 border-t border-[#EFE9DC]">
            <a
              href={routeService.getExternalDirectionsUrl(
                place.coordinates.latitude,
                place.coordinates.longitude,
                place.name
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#1B382B] hover:bg-[#12281E] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors text-center"
            >
              <Navigation className="w-4 h-4" />
              <span>Open External Directions</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>
      </div>

      {/* Description & Historical Narrative */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#12281E]">About the Destination</h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              {place.fullDescription}
            </p>
          </section>

          <section className="space-y-3 bg-[#FDFBF7] p-6 rounded-2xl border border-[#E2D8C3]">
            <h3 className="font-serif text-xl font-bold text-[#12281E] flex items-center gap-2">
              <Info className="w-5 h-5 text-[#C85A32]" />
              Historical Background
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed">
              {place.historicalContext}
            </p>
          </section>

          {place.interestingFacts && place.interestingFacts.length > 0 && (
            <section className="space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#12281E]">Key Architectural & Historical Facts</h3>
              <ul className="space-y-2.5">
                {place.interestingFacts.map((fact, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-sm text-stone-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32] mt-2 flex-shrink-0" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar: Visitor Information Breakdown */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E2D8C3] shadow-[0_2px_10px_rgba(27,56,43,0.04)] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#12281E] border-b border-[#EFE9DC] pb-2">
              Visitor Information
            </h3>

            {place.verifiedVisitorInfo ? (
              <dl className="space-y-3 text-xs">
                <div>
                  <dt className="text-stone-500 font-medium">Opening Hours</dt>
                  <dd className="font-semibold text-stone-800 mt-0.5">
                    {place.verifiedVisitorInfo.openingHoursDescription}
                  </dd>
                </div>

                <div>
                  <dt className="text-stone-500 font-medium">Entry Ticket</dt>
                  <dd className="font-semibold text-stone-800 mt-0.5">
                    {place.verifiedVisitorInfo.entryFeeDescription}
                  </dd>
                </div>

                {place.verifiedVisitorInfo.bestTimeToVisit && (
                  <div>
                    <dt className="text-stone-500 font-medium">Best Timing</dt>
                    <dd className="font-semibold text-stone-800 mt-0.5">
                      {place.verifiedVisitorInfo.bestTimeToVisit}
                    </dd>
                  </div>
                )}
              </dl>
            ) : (
              <p className="text-xs text-stone-500 italic">
                Verified opening hours and admission charges are currently unavailable in the official catalog record.
              </p>
            )}

            <div className="pt-2 border-t border-[#EFE9DC]">
              <span className="text-[11px] text-stone-500 block">Coordinates</span>
              <span className="text-xs font-mono font-medium text-stone-800">
                {place.coordinates.latitude.toFixed(4)}° N, {place.coordinates.longitude.toFixed(4)}° E
              </span>
            </div>
          </div>

          {/* Miniature Map Pin Preview */}
          <div className="rounded-2xl overflow-hidden border border-[#E2D8C3] shadow-sm">
            <InteractiveMap
              places={[place]}
              selectedPlace={place}
              className="h-48 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

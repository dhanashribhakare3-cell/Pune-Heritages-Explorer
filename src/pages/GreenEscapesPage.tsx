import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { placesService } from '../services/placesService';
import { Place } from '../types/place';
import { PlaceCard } from '../components/common/PlaceCard';
import { useUserLocation } from '../hooks/useUserLocation';
import { calculateHaversineDistance } from '../utils/distance';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Trees, Search, MapPin } from 'lucide-react';

export const GreenEscapesPage: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState('');
  const [activeCollection, setActiveCollection] = useState<'all' | 'peaceful' | 'walks' | 'ridges'>('all');

  const { coordinates, requestLocation } = useUserLocation();
  const [savedPlaceIds, setSavedPlaceIds] = useLocalStorage<string[]>('saved_places', []);
  const [visitedPlaceIds, setVisitedPlaceIds] = useLocalStorage<string[]>('visited_places', []);
  const navigate = useNavigate();

  useEffect(() => {
    placesService.getGreenEscapes().then((data) => {
      setPlaces(data);
      setLoading(false);
    });
  }, []);

  const handleToggleSave = (id: string) => {
    setSavedPlaceIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleToggleVisited = (id: string) => {
    setVisitedPlaceIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const filtered = places.filter((p) => {
    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.shortDescription.toLowerCase().includes(q) && !p.neighbourhood?.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (activeCollection === 'peaceful') {
      return p.id.includes('okayama') || p.id.includes('osho') || p.id.includes('saras');
    }
    if (activeCollection === 'walks') {
      return p.id.includes('empress') || p.id.includes('saras') || p.id.includes('aga-khan');
    }
    if (activeCollection === 'ridges') {
      return p.id.includes('vetal') || p.id.includes('sinhagad') || p.id.includes('parvati');
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#1B382B] block">
            Botanical & Nature Escapes
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#12281E]">
            Green Escapes of Pune
          </h1>
          <p className="text-stone-700 text-sm sm:text-base max-w-2xl leading-relaxed">
            From tranquil Japanese stroll gardens and historic Peshwa lakebeds to elevated ridge trails over Vetal Tekdi, discover Pune's peaceful open-air sanctuaries.
          </p>
        </div>

        <button
          type="button"
          onClick={requestLocation}
          className="px-4 py-2.5 rounded-xl border border-[#E2D8C3] bg-white text-stone-700 hover:bg-[#F8F5EE] text-xs font-semibold flex items-center gap-2 self-start md:self-auto shrink-0"
        >
          <MapPin className="w-4 h-4 text-[#C85A32]" />
          <span>{coordinates ? 'Distance Active' : 'Sort by Distance'}</span>
        </button>
      </div>

      {/* Filter and Curated Collection Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[#E2D8C3] pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCollection('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeCollection === 'all'
                ? 'bg-[#1B382B] text-white'
                : 'bg-white border border-[#E2D8C3] text-stone-700 hover:bg-[#F8F5EE]'
            }`}
          >
            All Green Sanctuaries
          </button>
          <button
            type="button"
            onClick={() => setActiveCollection('peaceful')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeCollection === 'peaceful'
                ? 'bg-[#1B382B] text-white'
                : 'bg-white border border-[#E2D8C3] text-stone-700 hover:bg-[#F8F5EE]'
            }`}
          >
            Peaceful Places
          </button>
          <button
            type="button"
            onClick={() => setActiveCollection('walks')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeCollection === 'walks'
                ? 'bg-[#1B382B] text-white'
                : 'bg-white border border-[#E2D8C3] text-stone-700 hover:bg-[#F8F5EE]'
            }`}
          >
            Garden Walks
          </button>
          <button
            type="button"
            onClick={() => setActiveCollection('ridges')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeCollection === 'ridges'
                ? 'bg-[#1B382B] text-white'
                : 'bg-white border border-[#E2D8C3] text-stone-700 hover:bg-[#F8F5EE]'
            }`}
          >
            Nature & Hill Ridges
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search parks & lakes..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E2D8C3] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1B382B]"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Grid of Green Destinations */}
      {loading ? (
        <div className="py-20 text-center font-serif text-stone-500">Loading green escapes...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E2D8C3] space-y-2">
          <p className="font-serif text-lg font-bold text-[#12281E]">No green escapes match this filter</p>
          <p className="text-xs text-stone-500">Try clearing your search keyword.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              userDistanceKm={
                coordinates
                  ? calculateHaversineDistance(
                      coordinates.latitude,
                      coordinates.longitude,
                      place.coordinates.latitude,
                      place.coordinates.longitude
                    )
                  : undefined
              }
              isSaved={savedPlaceIds.includes(place.id)}
              isVisited={visitedPlaceIds.includes(place.id)}
              onToggleSave={handleToggleSave}
              onToggleVisited={handleToggleVisited}
              onSelect={(p) => navigate(`/place/${p.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

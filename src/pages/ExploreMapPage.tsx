import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { placesService } from '../services/placesService';
import { Place, PlaceCategory, DistanceFilter, SortOption } from '../types/place';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { PlaceCard } from '../components/common/PlaceCard';
import { useUserLocation } from '../hooks/useUserLocation';
import { calculateHaversineDistance } from '../utils/distance';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Search, MapPin, X, AlertCircle, Compass, List, Map } from 'lucide-react';

const CATEGORIES: PlaceCategory[] = [
  'Historical Monuments',
  'Forts and Palaces',
  'Museums and Cultural Places',
  'Religious Heritage',
  'Gardens and Parks',
  'Lakes and Nature Spots',
  'Hidden Gems',
];

export const ExploreMapPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [distanceFilter, setDistanceFilter] = useState<DistanceFilter>('all');
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [mobileTab, setMobileTab] = useState<'map' | 'list'>('map');

  const { coordinates, requestLocation, isLoading: locationLoading, error: locationError } = useUserLocation();
  const [savedPlaceIds, setSavedPlaceIds] = useLocalStorage<string[]>('saved_places', []);
  const [visitedPlaceIds, setVisitedPlaceIds] = useLocalStorage<string[]>('visited_places', []);

  useEffect(() => {
    placesService.getPlaces().then((data) => {
      setPlaces(data);
      setLoading(false);
    });
  }, []);

  // Sync state if URL query param changes
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) setSearchQuery(q);
    const cat = searchParams.get('category');
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

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

  // Filter & Sort Pipeline
  const filteredPlaces = useMemo(() => {
    return places
      .filter((place) => {
        // Search text query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            place.name.toLowerCase().includes(q) ||
            place.shortDescription.toLowerCase().includes(q) ||
            place.neighbourhood?.toLowerCase().includes(q) ||
            place.category.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Category
        if (selectedCategory !== 'all' && place.category !== selectedCategory) {
          return false;
        }

        // Distance filter (Requires GPS)
        if (distanceFilter !== 'all' && coordinates) {
          const dist = calculateHaversineDistance(
            coordinates.latitude,
            coordinates.longitude,
            place.coordinates.latitude,
            place.coordinates.longitude
          );
          const maxDist = distanceFilter === '1km' ? 1 : distanceFilter === '5km' ? 5 : 10;
          if (dist > maxDist) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'nearest' && coordinates) {
          const distA = calculateHaversineDistance(
            coordinates.latitude,
            coordinates.longitude,
            a.coordinates.latitude,
            a.coordinates.longitude
          );
          const distB = calculateHaversineDistance(
            coordinates.latitude,
            coordinates.longitude,
            b.coordinates.latitude,
            b.coordinates.longitude
          );
          return distA - distB;
        }
        if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
        if (sortOption === 'name-desc') return b.name.localeCompare(a.name);
        if (sortOption === 'duration-asc') return a.visitingDurationMinutes - b.visitingDurationMinutes;
        return 0;
      });
  }, [places, searchQuery, selectedCategory, distanceFilter, sortOption, coordinates]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setDistanceFilter('all');
    setSortOption('name-asc');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#9A3412] block">
            Geospatial Explorer
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#12281E] mt-0.5">
            Explore Pune Heritage & Nature
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Displaying {filteredPlaces.length} of {places.length} destinations across Pune
          </p>
        </div>

        {/* Location Action Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={requestLocation}
            disabled={locationLoading}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
              coordinates
                ? 'bg-[#F2F7F4] border-[#DFEDE4] text-[#1B382B]'
                : 'bg-white border-[#E2D8C3] text-stone-700 hover:bg-[#F8F5EE]'
            }`}
          >
            <MapPin className="w-4 h-4 text-[#C85A32]" />
            <span>{locationLoading ? 'Detecting Location...' : coordinates ? 'GPS Active (Sorting by Distance)' : 'Find Places Near Me'}</span>
          </button>
        </div>
      </div>

      {/* Location Error Notice */}
      {locationError && (
        <div className="p-3.5 bg-[#FDF6F3] border border-[#F9E8E1] rounded-xl text-xs text-[#9A3412] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#C85A32] flex-shrink-0" />
          <span>{locationError}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2D8C3] shadow-[0_2px_10px_rgba(27,56,43,0.04)] space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by monument or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FDFBF7] border border-[#E2D8C3] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1B382B]"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#FDFBF7] border border-[#E2D8C3] rounded-lg focus:outline-none"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Distance Filter */}
          <div>
            <select
              value={distanceFilter}
              onChange={(e) => setDistanceFilter(e.target.value as DistanceFilter)}
              disabled={!coordinates}
              className="w-full px-3 py-2 text-xs bg-[#FDFBF7] border border-[#E2D8C3] rounded-lg focus:outline-none disabled:opacity-50"
            >
              <option value="all">Any Distance</option>
              <option value="1km">Within 1 km (Requires GPS)</option>
              <option value="5km">Within 5 km (Requires GPS)</option>
              <option value="10km">Within 10 km (Requires GPS)</option>
            </select>
          </div>

          {/* Sort Option */}
          <div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="w-full px-3 py-2 text-xs bg-[#FDFBF7] border border-[#E2D8C3] rounded-lg focus:outline-none"
            >
              <option value="name-asc">Sort by Name (A-Z)</option>
              <option value="name-desc">Sort by Name (Z-A)</option>
              <option value="duration-asc">Shortest Visit Duration</option>
              {coordinates && <option value="nearest">Nearest to Current Location</option>}
            </select>
          </div>
        </div>

        {(searchQuery || selectedCategory !== 'all' || distanceFilter !== 'all') && (
          <div className="flex items-center justify-between pt-2 border-t border-[#EFE9DC] text-xs">
            <span className="text-stone-500 font-medium">Active filters applied</span>
            <button
              type="button"
              onClick={clearFilters}
              className="text-[#C85A32] hover:underline flex items-center gap-1 font-semibold"
            >
              <X className="w-3.5 h-3.5" /> Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Mobile View Switcher (Map vs List) */}
      <div className="lg:hidden flex items-center rounded-xl bg-white border border-[#E2D8C3] p-1">
        <button
          type="button"
          onClick={() => setMobileTab('map')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
            mobileTab === 'map' ? 'bg-[#1B382B] text-white' : 'text-stone-600'
          }`}
        >
          <Map className="w-4 h-4" /> Map View
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('list')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
            mobileTab === 'list' ? 'bg-[#1B382B] text-white' : 'text-stone-600'
          }`}
        >
          <List className="w-4 h-4" /> Place List ({filteredPlaces.length})
        </button>
      </div>

      {/* Split View: List on left, Synchronized Map on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Synchronized Place Cards List */}
        <div
          className={`lg:col-span-7 space-y-4 order-2 lg:order-1 ${
            mobileTab === 'map' ? 'hidden lg:block' : 'block'
          }`}
        >
          {loading ? (
            <div className="py-20 text-center text-stone-500 font-serif">Loading heritage catalog...</div>
          ) : filteredPlaces.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#E2D8C3] space-y-3">
              <p className="font-serif text-xl font-bold text-[#12281E]">No places match your filters</p>
              <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                Try widening your distance limit or clearing search keywords to explore Pune's full catalog.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="px-4 py-2 bg-[#1B382B] text-white text-xs font-semibold rounded-lg hover:bg-[#12281E]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredPlaces.map((place) => (
                <div
                  key={place.id}
                  onMouseEnter={() => setSelectedPlace(place)}
                >
                  <PlaceCard
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
                    onSelect={(p) => {
                      setSelectedPlace(p);
                      navigate(`/place/${p.id}`);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Sticky Leaflet Map */}
        <div
          className={`lg:col-span-5 sticky top-24 order-1 lg:order-2 ${
            mobileTab === 'list' ? 'hidden lg:block' : 'block'
          }`}
        >
          <div className="bg-white p-3 rounded-2xl border border-[#E2D8C3] shadow-[0_4px_20px_rgba(27,56,43,0.06)] space-y-2">
            <InteractiveMap
              places={filteredPlaces}
              userLocation={coordinates}
              selectedPlace={selectedPlace}
              onSelectPlace={(p) => setSelectedPlace(p)}
              className="h-[520px] w-full rounded-xl overflow-hidden"
            />
            <div className="flex items-center justify-between text-[11px] text-stone-500 px-2 pt-1 font-medium">
              <span>● Green: Pune Heritage Site</span>
              {coordinates && <span className="text-[#C85A32] font-semibold">● Orange: Your GPS Location</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

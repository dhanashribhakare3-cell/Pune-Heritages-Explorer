import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { placesService } from '../services/placesService';
import { Place, PlaceCategory } from '../types/place';
import { PlaceCard } from '../components/common/PlaceCard';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { useUserLocation } from '../hooks/useUserLocation';
import { calculateHaversineDistance } from '../utils/distance';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  Search, Compass, Calendar, ArrowRight, MapPin,
  Clock, ShieldAlert, Sparkles, Trees, History
} from 'lucide-react';

const CATEGORY_CHIPS: { label: PlaceCategory; description: string }[] = [
  { label: 'Forts and Palaces', description: 'Maratha hill fortresses & royal seats' },
  { label: 'Historical Monuments', description: 'Colonial & freedom struggle memorials' },
  { label: 'Religious Heritage', description: '8th-century rock caverns & shrines' },
  { label: 'Gardens and Parks', description: 'Japanese stroll & botanical grounds' },
  { label: 'Lakes and Nature Spots', description: 'Ridge tekdis & ecological trails' },
  { label: 'Museums and Cultural Places', description: 'Artisanal crafts & tribal artifacts' },
  { label: 'Hidden Gems', description: 'Lesser-explored historic pockets' },
];

export const HomePage: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { coordinates, requestLocation, isLoading: locationLoading, error: locationError } = useUserLocation();
  const [savedPlaceIds, setSavedPlaceIds] = useLocalStorage<string[]>('saved_places', []);
  const [visitedPlaceIds, setVisitedPlaceIds] = useLocalStorage<string[]>('visited_places', []);
  const navigate = useNavigate();

  useEffect(() => {
    placesService.getPlaces().then((data) => {
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/map?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/map');
    }
  };

  const featuredMonuments = places.filter((p) => p.isFeatured).slice(0, 3);
  const hiddenGems = places.filter((p) => p.isHiddenGem).slice(0, 3);
  const greenEscapes = places.filter((p) => p.isGreenEscape).slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Editorial Hero Section */}
      <section className="relative min-h-[580px] bg-[#12281E] text-stone-100 flex items-center overflow-hidden">
        {/* Cinematic Backdrop with Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_pune_heritage_1793300959733.jpg"
            alt="Historic Shaniwar Wada Delhi Gate in Pune"
            className="w-full h-full object-cover opacity-35 filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12281E] via-[#12281E]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#E5C07B] block">
              The Cultural Capital of Maharashtra
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#FDFBF7]">
              Discover Pune. <br />
              <span className="italic font-normal text-[#E5C07B]">Explore Its History.</span>
            </h1>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
              Venture beyond modern corridors into 8th-century monolithic caverns, Maratha fortresses, and tranquil botanical walks across Pune.
            </p>

            {/* Prominent Search Field */}
            <form onSubmit={handleSearchSubmit} className="pt-2">
              <div className="bg-white p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-2 border border-[#E2D8C3]">
                <div className="relative flex-1 w-full">
                  <Search className="w-5 h-5 text-stone-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search monuments, parks, Sinhagad, Parvati..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-sm text-stone-900 placeholder-stone-400 bg-transparent focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1B382B] hover:bg-[#12281E] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 shrink-0"
                >
                  <Compass className="w-4 h-4" />
                  <span>Search Places</span>
                </button>
              </div>
            </form>

            {/* Direct Action Triggers */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={requestLocation}
                disabled={locationLoading}
                className="px-5 py-3 rounded-xl bg-[#C85A32] hover:bg-[#9A3412] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                <span>{locationLoading ? 'Detecting GPS...' : coordinates ? 'GPS Active (Sort Enabled)' : 'Find Places Near Me'}</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/plan-my-day')}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 backdrop-blur-sm"
              >
                <Calendar className="w-4 h-4 text-[#E5C07B]" />
                <span>Plan My Day</span>
              </button>
            </div>

            {locationError && (
              <div className="p-3 bg-[#9A3412]/80 border border-[#C85A32] rounded-xl text-xs text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-300 flex-shrink-0" />
                <span>{locationError}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Explore by Category */}
        <section className="space-y-6">
          <div className="border-b border-[#E2D8C3] pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9A3412]">
              Curated Thematic Portfolios
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#12281E] mt-1">
              Explore by Heritage Category
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {CATEGORY_CHIPS.map((cat) => (
              <div
                key={cat.label}
                onClick={() => navigate(`/map?category=${encodeURIComponent(cat.label)}`)}
                className="p-5 bg-white rounded-xl border border-[#E2D8C3] hover:border-[#1B382B] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#12281E] group-hover:text-[#C85A32] transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B382B] mt-4 group-hover:translate-x-1 transition-transform">
                  Browse category &rarr;
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Heritage Places */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2D8C3] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#9A3412]">
                Peshwa & Freedom Legacy
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#12281E] mt-1">
                Popular Heritage Landmarks
              </h2>
            </div>
            <Link
              to="/map"
              className="text-xs sm:text-sm font-semibold text-[#1B382B] hover:text-[#C85A32] flex items-center gap-1 transition-colors"
            >
              <span>View all {places.length} places</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMonuments.map((place) => (
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
        </section>

        {/* Feature Spotlight: Plan My Day Banner */}
        <section className="bg-[#F8F5EE] border border-[#E2D8C3] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9A3412] block">
              Automated Route Assembly
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#12281E]">
              Have 2, 4, or 8 Hours in Pune? Let us organize your day.
            </h3>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              No need to handpick every stop. Our deterministic itinerary algorithm factors in visit durations, travel modes (car, walking, or bus transit), and pacing to generate an optimal timeline.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => navigate('/plan-my-day')}
                className="px-6 py-3 rounded-xl bg-[#1B382B] hover:bg-[#12281E] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Launch Itinerary Generator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Then vs Now Feature Showcase */}
        <section className="bg-[#12281E] text-stone-100 rounded-3xl p-8 sm:p-12 shadow-xl border border-[#1B382B] flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5C07B] block">
              Archival Contrast
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#FDFBF7]">
              Then vs Now: Pune's Living Heritage
            </h3>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Slide between 19th-century colonial surveys and modern high-resolution photographs to observe how Pune’s stone fortifications, palaces, and gateways weathered two centuries of urban expansion.
            </p>
            <div className="pt-2">
              <Link
                to="/then-vs-now"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C85A32] hover:bg-[#9A3412] text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
              >
                <History className="w-4 h-4" />
                <span>Explore Then vs Now Slider</span>
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-96 aspect-[16/10] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-stone-900">
            <img
              src="/src/assets/images/hero_pune_heritage_1793300959733.jpg"
              alt="Archival comparison preview"
              className="w-full h-full object-cover filter contrast-110"
            />
          </div>
        </section>

        {/* Hidden Gems Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2D8C3] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B89324]">
                Lesser-Known Treasures
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#12281E] mt-1">
                Hidden Gems & Sacred Caverns
              </h2>
            </div>
            <Link
              to="/map?category=Hidden+Gems"
              className="text-xs sm:text-sm font-semibold text-[#1B382B] hover:text-[#C85A32] flex items-center gap-1 transition-colors"
            >
              <span>Explore all gems</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hiddenGems.map((place) => (
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
        </section>

        {/* Green Escapes Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2D8C3] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B382B]">
                Botanical Sanctuaries
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#12281E] mt-1">
                Green Escapes of Pune
              </h2>
            </div>
            <Link
              to="/green-escapes"
              className="text-xs sm:text-sm font-semibold text-[#1B382B] hover:text-[#C85A32] flex items-center gap-1 transition-colors"
            >
              <span>Explore Green Escapes</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {greenEscapes.map((place) => (
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
        </section>

        {/* Small Interactive Map Preview */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2D8C3] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B382B]">
                Geospatial Discovery
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#12281E] mt-1">
                Pune Heritage Map Preview
              </h2>
            </div>
            <Link
              to="/map"
              className="text-xs sm:text-sm font-semibold text-[#1B382B] hover:text-[#C85A32] flex items-center gap-1 transition-colors"
            >
              <span>Launch Full Interactive Map</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-[#E2D8C3] shadow-[0_4px_20px_rgba(27,56,43,0.06)]">
            <InteractiveMap
              places={places}
              userLocation={coordinates}
              onSelectPlace={(p) => navigate(`/place/${p.id}`)}
              className="h-[440px] w-full rounded-xl overflow-hidden"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

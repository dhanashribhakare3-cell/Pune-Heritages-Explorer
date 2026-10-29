import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Landmark, MapPin, Menu, X, Search, Sparkles } from 'lucide-react';
import { useUserLocation } from '../../hooks/useUserLocation';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');
  const { coordinates, requestLocation, isLoading } = useUserLocation();
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      navigate(`/map?q=${encodeURIComponent(headerSearch.trim())}`);
      setHeaderSearch('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Map', path: '/map' },
    { name: 'Then vs Now', path: '/then-vs-now' },
    { name: 'Plan My Day', path: '/plan-my-day' },
    { name: 'Green Escapes', path: '/green-escapes' },
    { name: 'My Collection', path: '/collection' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E2D8C3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single Wordmark Brand Zone */}
          <NavLink to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-lg bg-[#1B382B] text-white flex items-center justify-center shadow-sm group-hover:bg-[#12281E] transition-colors">
              <Landmark className="w-5 h-5 text-[#E5C07B]" />
            </div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#12281E] whitespace-nowrap">
              Pune Heritage Explorer
            </span>
          </NavLink>

          {/* Zone 2: 4-6 concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `whitespace-nowrap transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#1B382B] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C85A32]'
                      : 'hover:text-[#1B382B]'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action (Location status or Near Me trigger) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={requestLocation}
              disabled={isLoading}
              title={coordinates ? 'GPS Location active' : 'Detect your current location'}
              aria-label={coordinates ? 'GPS Location active' : 'Detect your current location'}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 border transition-all whitespace-nowrap shrink-0 ${
                coordinates
                  ? 'bg-[#F2F7F4] border-[#DFEDE4] text-[#1B382B]'
                  : 'bg-white border-[#E2D8C3] text-stone-700 hover:bg-[#F8F5EE]'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${coordinates ? 'text-[#C85A32]' : 'text-stone-500'} ${isLoading ? 'animate-bounce' : ''}`} />
              <span>{isLoading ? 'Locating...' : coordinates ? 'Near Me (GPS Active)' : 'Find Near Me'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-[#F8F5EE] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2D8C3] bg-[#FDFBF7] px-4 pt-4 pb-6 space-y-4 shadow-lg">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search monuments, gardens..."
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#E2D8C3] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#1B382B]"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          </form>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#1B382B] text-white font-semibold'
                      : 'text-stone-700 hover:bg-[#F8F5EE]'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="pt-2 border-t border-[#EFE9DC]">
            <button
              type="button"
              onClick={() => {
                requestLocation();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-[#C85A32] text-white text-xs font-semibold flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>{coordinates ? 'Update GPS Location' : 'Enable Current Location'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

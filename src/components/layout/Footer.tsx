import React from 'react';
import { Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../../config/appConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#12281E] text-stone-300 border-t border-[#1B382B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1B382B] text-[#E5C07B] flex items-center justify-center">
                <Landmark className="w-4 h-4" />
              </div>
              <span className="font-serif text-lg font-bold text-white tracking-wide">
                {APP_CONFIG.appName}
              </span>
            </div>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              {APP_CONFIG.tagline} An editorial heritage discovery platform engineered with responsive geospatial mapping and automated deterministic itinerary planning.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-xs">
            <span className="font-semibold text-white uppercase tracking-wider block">
              Exploration
            </span>
            <ul className="space-y-2 text-stone-400">
              <li><Link to="/map" className="hover:text-white transition-colors">Interactive Map</Link></li>
              <li><Link to="/then-vs-now" className="hover:text-white transition-colors">Then vs Now Archives</Link></li>
              <li><Link to="/plan-my-day" className="hover:text-white transition-colors">Plan My Day Generator</Link></li>
              <li><Link to="/green-escapes" className="hover:text-white transition-colors">Green Escapes & Parks</Link></li>
              <li><Link to="/collection" className="hover:text-white transition-colors">My Saved Collection</Link></li>
            </ul>
          </div>

          {/* Architecture Notice */}
          <div className="space-y-2 text-xs">
            <span className="font-semibold text-white uppercase tracking-wider block">
              Data Architecture
            </span>
            <p className="text-stone-400 leading-relaxed">
              Configured for <strong>{APP_CONFIG.placesSource.toUpperCase()}</strong> provider mode. Decoupled repository architecture ready for drop-in college professor REST API integration.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-3">
          <span>&copy; {new Date().getFullYear()} Pune Heritage Explorer. OpenStreetMap map tile attribution.</span>
          <span>Preserving cultural narratives with geospatial accuracy</span>
        </div>
      </div>
    </footer>
  );
};

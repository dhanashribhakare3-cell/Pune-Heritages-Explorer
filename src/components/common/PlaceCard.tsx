import React, { useState } from 'react';
import { Place } from '../../types/place';
import { formatDistance } from '../../utils/distance';
import { MapPin, Clock, Bookmark, CheckCircle2, ArrowRight } from 'lucide-react';

interface PlaceCardProps {
  place: Place;
  userDistanceKm?: number;
  isSaved?: boolean;
  isVisited?: boolean;
  onToggleSave?: (placeId: string) => void;
  onToggleVisited?: (placeId: string) => void;
  onSelect?: (place: Place) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  userDistanceKm,
  isSaved,
  isVisited,
  onToggleSave,
  onToggleVisited,
  onSelect,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article
      onClick={() => onSelect?.(place)}
      className="group bg-white rounded-xl overflow-hidden border border-[#E2D8C3] shadow-[0_2px_10px_rgba(27,56,43,0.04)] hover:shadow-[0_12px_24px_rgba(27,56,43,0.08)] transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F8F5EE]">
        {!imageError ? (
          <img
            src={place.coverImage}
            alt={place.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#F8F5EE] to-[#EFE9DC] text-stone-600">
            <span className="font-serif text-lg font-bold text-center text-[#1B382B]">{place.name}</span>
            <span className="text-xs text-stone-500 mt-1">{place.category}</span>
          </div>
        )}

        {/* Action Controls Overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#12281E]/80 backdrop-blur-md p-1 rounded-lg">
          {onToggleSave && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(place.id);
              }}
              title={isSaved ? 'Remove from Saved' : 'Save to My Collection'}
              aria-label={isSaved ? 'Remove from Saved' : 'Save to My Collection'}
              className={`p-1.5 rounded transition-colors ${
                isSaved ? 'text-[#E5C07B] bg-white/20' : 'text-stone-300 hover:text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          )}

          {onToggleVisited && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleVisited(place.id);
              }}
              title={isVisited ? 'Marked as Visited' : 'Mark as Visited'}
              aria-label={isVisited ? 'Marked as Visited' : 'Mark as Visited'}
              className={`p-1.5 rounded transition-colors ${
                isVisited ? 'text-emerald-400 bg-white/20' : 'text-stone-300 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Distance Badge if GPS active */}
        {userDistanceKm !== undefined && (
          <div className="absolute bottom-3 left-3 bg-[#FDFBF7]/95 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-semibold text-[#1B382B] shadow-sm flex items-center gap-1 border border-[#E2D8C3]">
            <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>{formatDistance(userDistanceKm)} away</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Category & Kicker */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5 font-medium">
            <span className="text-[#9A3412] font-semibold">{place.category}</span>
            {place.isHiddenGem && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#B89324]">Hidden Gem</span>
              </>
            )}
            {place.neighbourhood && (
              <>
                <span aria-hidden="true">·</span>
                <span>{place.neighbourhood}</span>
              </>
            )}
          </div>

          <h3 className="font-serif text-xl font-bold text-[#12281E] group-hover:text-[#C85A32] transition-colors line-clamp-1">
            {place.name}
          </h3>

          <p className="text-stone-600 text-sm mt-2 line-clamp-2 leading-relaxed">
            {place.shortDescription}
          </p>
        </div>

        <div className="pt-3 border-t border-[#EFE9DC] flex items-center justify-between text-xs text-stone-500">
          <span className="flex items-center gap-1.5 text-stone-600">
            <Clock className="w-3.5 h-3.5 text-[#1B382B]" />
            ~{place.visitingDurationMinutes} mins
          </span>

          <span className="inline-flex items-center gap-1 text-[#C85A32] font-semibold group-hover:translate-x-0.5 transition-transform">
            Details <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};

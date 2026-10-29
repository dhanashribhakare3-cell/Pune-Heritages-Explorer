import React, { useState } from 'react';
import { THEN_VS_NOW_DATA } from '../data/thenVsNowData';
import { ComparisonSlider } from '../components/thenVsNow/ComparisonSlider';
import { History, ShieldAlert } from 'lucide-react';

export const ThenVsNowPage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeItem = THEN_VS_NOW_DATA[selectedIndex] || THEN_VS_NOW_DATA[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#9A3412] block">
          Archival Photography & Evolution
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#12281E]">
          Then vs Now: Pune's Living History
        </h1>
        <p className="text-stone-700 text-sm sm:text-base max-w-2xl leading-relaxed">
          Compare archival colonial-era surveys and historic preservation photographs directly against present-day perspectives of Pune's landmark monuments.
        </p>
      </div>

      {/* Comparison Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E2D8C3] pb-3">
        {THEN_VS_NOW_DATA.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedIndex(idx)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedIndex === idx
                ? 'bg-[#1B382B] text-white shadow-sm'
                : 'bg-white border border-[#E2D8C3] text-stone-700 hover:bg-[#F8F5EE]'
            }`}
          >
            {item.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Interactive Slider */}
      <ComparisonSlider item={activeItem} />

      {/* Archival Authenticity Disclaimer */}
      <div className="p-4 bg-[#FBF8EF] rounded-xl border border-[#EFE9DC] flex items-start gap-3 text-xs text-stone-700">
        <ShieldAlert className="w-4 h-4 text-[#B89324] flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Archival Source Verification:</strong> Historical visual records are curated with credited photographic archives. We strictly label modern restorations and avoid fabricating historic photographic claims.
        </p>
      </div>
    </div>
  );
};

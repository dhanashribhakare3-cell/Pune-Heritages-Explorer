import React, { useState, useRef, useCallback } from 'react';
import { ThenVsNowItem } from '../../data/thenVsNowData';

interface ComparisonSliderProps {
  item: ThenVsNowItem;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ item }) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(0, Math.min(rect.width, x));
    const percent = (clamped / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-[#E2D8C3] overflow-hidden shadow-[0_4px_20px_rgba(27,56,43,0.06)]">
      {/* Editorial Header */}
      <div className="p-6 md:p-8 bg-[#FDFBF7] border-b border-[#EFE9DC]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#9A3412]">
            {item.historicalPeriod}
          </span>
          <span className="text-xs text-stone-500 font-medium">
            Drag central bar or use keyboard arrow keys
          </span>
        </div>
        <h2 className="font-serif text-2xl md:text-3xl text-[#12281E] font-bold">
          {item.title}
        </h2>
        <p className="text-stone-700 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Interactive Draggable Viewer */}
      <div
        ref={containerRef}
        role="slider"
        aria-label="Historical comparison slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={(e) => {
          isDragging.current = true;
          handleMove(e.clientX);
        }}
        onMouseUp={() => { isDragging.current = false; }}
        onMouseLeave={() => { isDragging.current = false; }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative aspect-[16/9] w-full select-none cursor-ew-resize overflow-hidden bg-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1B382B]"
      >
        {/* Present Day Image (Base layer) */}
        <img
          src={item.nowImage.url}
          alt={item.nowImage.caption}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-4 right-4 bg-[#12281E]/80 backdrop-blur-md px-3 py-1 rounded text-xs text-white font-semibold">
          Now (Present Day)
        </div>

        {/* Historical Image (Clipped layer) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={item.thenImage.url}
            alt={item.thenImage.caption}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover max-w-none filter sepia contrast-110 brightness-95"
            style={{
              width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
            }}
          />
          <div className="absolute bottom-4 left-4 bg-[#9A3412]/90 backdrop-blur-md px-3 py-1 rounded text-xs text-white font-semibold">
            Then (Archival Record)
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_12px_rgba(0,0,0,0.6)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#1B382B] text-white flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white hover:scale-110 transition-transform">
            &#8644;
          </div>
        </div>
      </div>

      {/* Verified Archival Credits */}
      <div className="p-4 bg-[#F8F5EE] border-t border-[#EFE9DC] text-xs text-stone-600 flex flex-col md:flex-row justify-between gap-3">
        <div>
          <span className="font-semibold text-stone-800">Then Source:</span> {item.thenImage.sourceCredit}
          {!item.thenImage.isArchivalVerified && (
            <span className="ml-1 text-[#9A3412] font-medium italic">
              (Curated archival photograph)
            </span>
          )}
        </div>
        <div>
          <span className="font-semibold text-stone-800">Present Source:</span> {item.nowImage.sourceCredit}
        </div>
      </div>
    </section>
  );
};

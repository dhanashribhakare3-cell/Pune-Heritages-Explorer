import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Place } from '../../types/place';
import { APP_CONFIG } from '../../config/appConfig';

// Custom Map Pin Icons using Leaflet divIcon for styling
const createPlaceIcon = (isSelected: boolean) => {
  return L.divIcon({
    className: 'custom-heritage-pin',
    html: `
      <div style="
        width: ${isSelected ? '36px' : '28px'};
        height: ${isSelected ? '36px' : '28px'};
        background: ${isSelected ? '#C85A32' : '#1B382B'};
        border: 2px solid #FFFFFF;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        transition: transform 0.2s ease;
      ">
        <svg width="${isSelected ? '18' : '14'}" height="${isSelected ? '18' : '14'}" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      </div>
    `,
    iconSize: [isSelected ? 36 : 28, isSelected ? 36 : 28],
    iconAnchor: [isSelected ? 18 : 14, isSelected ? 18 : 14],
    popupAnchor: [0, isSelected ? -20 : -16],
  });
};

const userLocationIcon = L.divIcon({
  className: 'custom-user-pin',
  html: `
    <div style="
      width: 22px;
      height: 22px;
      background: #D9653B;
      border: 3px solid #FFFFFF;
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(217, 101, 59, 0.3);
    "></div>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
  popupAnchor: [0, -12],
});

interface InteractiveMapProps {
  places: Place[];
  userLocation?: { latitude: number; longitude: number } | null;
  selectedPlace?: Place | null;
  onSelectPlace?: (place: Place) => void;
  routeGeometry?: [number, number][];
  className?: string;
  zoom?: number;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  places,
  userLocation,
  selectedPlace,
  onSelectPlace,
  routeGeometry,
  className = 'h-[500px] w-full rounded-2xl overflow-hidden border border-[#E2D8C3]',
  zoom = 12,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const initialCenter: [number, number] = userLocation
      ? [userLocation.latitude, userLocation.longitude]
      : selectedPlace
      ? [selectedPlace.coordinates.latitude, selectedPlace.coordinates.longitude]
      : [APP_CONFIG.defaultMapCenter.latitude, APP_CONFIG.defaultMapCenter.longitude];

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom,
      scrollWheelZoom: false,
    });

    L.tileLayer(APP_CONFIG.mapTileLayer.url, {
      attribution: APP_CONFIG.mapTileLayer.attribution,
      maxZoom: 19,
    }).addTo(map);

    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    mapInstanceRef.current = map;

    // Invalidate size after layout mounts
    setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Sync Markers & Bounds
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    const bounds: [number, number][] = [];

    // Render User Location Pin if available
    if (userLocation) {
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
      }
      const userMarker = L.marker([userLocation.latitude, userLocation.longitude], {
        icon: userLocationIcon,
        zIndexOffset: 1000,
      }).addTo(map);

      userMarker.bindPopup(`
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px;">
          <strong style="color: #9A3412; font-size: 13px; display: block;">Your Current Location</strong>
          <span style="font-size: 11px; color: #78716C;">Verified via Browser GPS</span>
        </div>
      `);

      userMarkerRef.current = userMarker;
      bounds.push([userLocation.latitude, userLocation.longitude]);
    }

    // Render Place Markers
    places.forEach((place) => {
      const { latitude, longitude } = place.coordinates;
      if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) return;

      const isSelected = selectedPlace?.id === place.id;
      const marker = L.marker([latitude, longitude], {
        icon: createPlaceIcon(isSelected),
      });

      const popupContent = `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 180px; max-width: 220px; padding: 4px;">
          <h4 style="font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700; color: #12281E; margin: 0 0 4px 0;">${place.name}</h4>
          <span style="font-size: 10px; font-weight: 600; text-transform: uppercase; color: #9A3412; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">${place.category}</span>
          <p style="font-size: 11px; color: #57534E; line-height: 1.4; margin: 0 0 8px 0;">${place.shortDescription.substring(0, 85)}...</p>
          <a href="#/place/${place.id}" style="font-size: 11px; font-weight: 600; color: #1B382B; text-decoration: underline;">View Full Details &rarr;</a>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        onSelectPlace?.(place);
      });

      marker.addTo(markersLayer);
      bounds.push([latitude, longitude]);
    });

    // Fit bounds if multiple places and no specific selected place
    if (bounds.length > 1 && !selectedPlace) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    } else if (selectedPlace) {
      map.setView(
        [selectedPlace.coordinates.latitude, selectedPlace.coordinates.longitude],
        14,
        { animate: true }
      );
    }
  }, [places, selectedPlace, userLocation]);

  // Sync Active Route Polyline
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    if (routeGeometry && routeGeometry.length > 0) {
      const polyline = L.polyline(routeGeometry, {
        color: '#C85A32',
        weight: 4,
        opacity: 0.85,
        dashArray: '8, 6',
      }).addTo(map);

      polylineRef.current = polyline;
      map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
    }
  }, [routeGeometry]);

  return (
    <div className={className}>
      <div ref={mapContainerRef} className="h-full w-full" />
    </div>
  );
};

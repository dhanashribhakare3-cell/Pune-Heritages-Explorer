export const APP_CONFIG = {
  appName: 'Pune Heritage Explorer',
  tagline: 'Discover Pune. Explore Its History. Find Your Next Journey.',
  placesSource: (import.meta.env.VITE_PLACES_SOURCE || 'demo') as 'demo' | 'api',
  apiBaseUrl: import.meta.env.VITE_PLACES_API_BASE_URL || '',
  defaultMapCenter: {
    latitude: 18.5204, // Pune Central coordinates
    longitude: 73.8567,
    zoom: 12,
  },
  mapTileLayer: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
  },
};

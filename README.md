# Pune Heritage Explorer

> Discover Pune. Explore Its History. Find Your Next Journey.

An interactive heritage discovery and trip-planning web application built for the city of Pune. Engineered with an API-ready adapter pattern to enable instant swapping between local demo data and external university backend APIs.

---

## 1. Local Development Quickstart

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Run unit tests
npx vitest run
```

---

## 2. Replacing the Demo Provider with the Professor's Places API

The application adheres strictly to the **Repository & Adapter Pattern**. All UI views, Leaflet map markers, and itinerary generation logic consume the unified `IPlacesService` contract located in `src/services/placesService.ts`. Replacing local demo data with the professor's live API requires **zero UI rebuilds**.

### Step 1: Update Environment Variables
Create or edit your local environment file (`.env` or `.env.local`):

```env
# Switch data source from 'demo' to 'api'
VITE_PLACES_SOURCE=api

# Configure your professor's base URL (e.g. http://localhost:8080/api or https://api.college.edu/v1)
VITE_PLACES_API_BASE_URL=https://api.college-heritage.edu/v1
```

### Step 2: Customize API Field Normalization (If Payload Keys Differ)
Open `src/services/placesService.ts`. The `ApiPlacesProvider` class contains an explicit mapping method:

```typescript
public normalizeApiResponse(item: any): Place {
  return {
    id: String(item.id || item._id),
    name: item.name || item.title || item.monument_name,
    category: this.mapCategory(item.category || item.type),
    shortDescription: item.shortDescription || item.summary || item.description?.substring(0, 160),
    fullDescription: item.fullDescription || item.description,
    historicalContext: item.historicalContext || item.history,
    interestingFacts: Array.isArray(item.interestingFacts || item.facts) ? (item.interestingFacts || item.facts) : [],
    coordinates: {
      latitude: Number(item.latitude || item.lat || item.location?.coordinates?.[1]),
      longitude: Number(item.longitude || item.lng || item.location?.coordinates?.[0]),
    },
    address: item.address || item.formatted_address,
    neighbourhood: item.neighbourhood || item.area,
    coverImage: item.coverImage || item.image_url,
    visitingDurationMinutes: Number(item.visitingDurationMinutes || item.recommended_duration || 60),
    dataSource: 'official_api',
    // ... maps verified visitor information safely without hallucinating
  };
}
```

If the professor's API returns response envelopes (e.g. `{ status: "success", data: [...] }` or `{ places: [...] }`), `ApiPlacesProvider.getPlaces()` automatically unwraps `data.places`, `data.data`, or plain arrays.

### Step 3: Verification & Error Handling Checklist
1. Run `npx vitest run` to verify that normalization and distance constraints pass.
2. Launch `npm run dev`. If the professor's API is unreachable, the application shows clear error banners—it will not pretend or display fabricated fake data in live mode.

---

## 3. Features Implemented

- **Interactive Leaflet Map**: Pune city markers, dynamic popups, active route polylines, and real GPS device marker with distance sorting.
- **Hardware-Accurate Geolocation**: Uses `navigator.geolocation` with actual Haversine distance calculations (no hardcoded fake user locations).
- **Then vs Now Slider**: Independent draggable comparison slider contrasting archival surveys and present-day photography with verified archival citations.
- **Automatic One-Day Trip Planner**: Deterministic itinerary generator respecting user duration (2, 3, 4, 6, 8 hours), start time, pace, and travel mode (car, transit, walking).
- **Green Escapes**: Dedicated curation for Pune's parks, gardens, tekdis, lakes, and botanical walks.
- **Browser-Local Persistence**: Bookmarks and generated itineraries persist in `localStorage` across page reloads without requiring sign-up.
- **Fully Responsive**: Mobile stacked layout, touch slider support, and desktop split map list.

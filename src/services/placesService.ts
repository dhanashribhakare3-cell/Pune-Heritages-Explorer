import { Place, PlaceCategory } from '../types/place';
import { DEMO_PLACES } from '../data/demoPlaces';
import { APP_CONFIG } from '../config/appConfig';

export interface IPlacesService {
  getPlaces(): Promise<Place[]>;
  getPlaceById(id: string): Promise<Place | null>;
  searchPlaces(query: string): Promise<Place[]>;
  getPlacesByCategory(category: PlaceCategory): Promise<Place[]>;
  getGreenEscapes(): Promise<Place[]>;
}

export class DemoPlacesProvider implements IPlacesService {
  async getPlaces(): Promise<Place[]> {
    // Simulated realistic asynchronous loading
    return new Promise((resolve) => {
      setTimeout(() => resolve([...DEMO_PLACES]), 60);
    });
  }

  async getPlaceById(id: string): Promise<Place | null> {
    const place = DEMO_PLACES.find((p) => p.id === id);
    return place ? { ...place } : null;
  }

  async searchPlaces(query: string): Promise<Place[]> {
    const q = query.trim().toLowerCase();
    if (!q) return [...DEMO_PLACES];
    return DEMO_PLACES.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.neighbourhood?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  async getPlacesByCategory(category: PlaceCategory): Promise<Place[]> {
    return DEMO_PLACES.filter((p) => p.category === category);
  }

  async getGreenEscapes(): Promise<Place[]> {
    return DEMO_PLACES.filter(
      (p) =>
        p.isGreenEscape ||
        p.category === 'Gardens and Parks' ||
        p.category === 'Lakes and Nature Spots'
    );
  }
}

/**
 * Adapter for the College Professor's future API.
 * When VITE_PLACES_SOURCE=api, this provider fetches real endpoints and
 * normalizes server responses into the standardized Place interface.
 */
export class ApiPlacesProvider implements IPlacesService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/+$/, '');
  }

  public normalizeApiResponse(item: any): Place {
    return {
      id: String(item.id || item._id || Math.random().toString(36).substring(7)),
      name: item.name || item.title || 'Untitled Heritage Site',
      category: this.mapCategory(item.category || item.type),
      shortDescription: item.shortDescription || item.summary || item.description?.substring(0, 160) || '',
      fullDescription: item.fullDescription || item.description || '',
      historicalContext: item.historicalContext || item.history || 'Historical details will be documented upon official archive verification.',
      interestingFacts: Array.isArray(item.interestingFacts || item.facts) ? (item.interestingFacts || item.facts) : [],
      coordinates: {
        latitude: Number(item.latitude || item.lat || item.location?.coordinates?.[1] || 18.5204),
        longitude: Number(item.longitude || item.lng || item.lon || item.location?.coordinates?.[0] || 73.8567),
      },
      address: item.address || item.formatted_address,
      neighbourhood: item.neighbourhood || item.area || item.locality,
      coverImage: item.coverImage || item.image_url || '/src/assets/images/hero_pune_heritage_1793300959733.jpg',
      gallery: Array.isArray(item.gallery)
        ? item.gallery.map((g: any) => ({
            url: typeof g === 'string' ? g : g.url,
            caption: g.caption || item.name,
            sourceCredit: g.sourceCredit || 'Official Places API',
            isIllustrativePlaceholder: Boolean(g.isIllustrativePlaceholder),
          }))
        : [],
      visitingDurationMinutes: Number(item.visitingDurationMinutes || item.recommended_duration || 60),
      isFeatured: Boolean(item.isFeatured || item.featured),
      isGreenEscape: Boolean(item.isGreenEscape || item.is_park),
      isHiddenGem: Boolean(item.isHiddenGem || item.is_gem),
      dataSource: 'official_api',
      verifiedVisitorInfo: item.visitor_info ? {
        openingHoursDescription: item.visitor_info.opening_hours || 'Verified hours pending confirmation',
        entryFeeDescription: item.visitor_info.entry_fee || 'Not specified',
        bestTimeToVisit: item.visitor_info.best_time,
        wheelchairAccessible: item.visitor_info.wheelchair_accessible,
        photographyAllowed: item.visitor_info.photography_allowed,
      } : undefined,
    };
  }

  private mapCategory(rawCat: string): PlaceCategory {
    const normalized = (rawCat || '').toLowerCase();
    if (normalized.includes('monument')) return 'Historical Monuments';
    if (normalized.includes('fort') || normalized.includes('palace')) return 'Forts and Palaces';
    if (normalized.includes('museum') || normalized.includes('culture')) return 'Museums and Cultural Places';
    if (normalized.includes('temple') || normalized.includes('religious') || normalized.includes('cave')) return 'Religious Heritage';
    if (normalized.includes('lake') || normalized.includes('water')) return 'Lakes and Nature Spots';
    if (normalized.includes('garden') || normalized.includes('park')) return 'Gardens and Parks';
    return 'Hidden Gems';
  }

  async getPlaces(): Promise<Place[]> {
    const res = await fetch(`${this.baseUrl}/places`);
    if (!res.ok) {
      throw new Error(`API provider failure: HTTP ${res.status} - ${res.statusText}`);
    }
    const data = await res.json();
    const rawArray = Array.isArray(data) ? data : data.places || data.data || [];
    return rawArray.map((item: any) => this.normalizeApiResponse(item));
  }

  async getPlaceById(id: string): Promise<Place | null> {
    const res = await fetch(`${this.baseUrl}/places/${encodeURIComponent(id)}`);
    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`API provider failure: HTTP ${res.status}`);
    }
    const data = await res.json();
    return this.normalizeApiResponse(data.place || data);
  }

  async searchPlaces(query: string): Promise<Place[]> {
    const res = await fetch(`${this.baseUrl}/places/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) {
      const all = await this.getPlaces();
      return all.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
    }
    const data = await res.json();
    const rawArray = Array.isArray(data) ? data : data.places || [];
    return rawArray.map((item: any) => this.normalizeApiResponse(item));
  }

  async getPlacesByCategory(category: PlaceCategory): Promise<Place[]> {
    const all = await this.getPlaces();
    return all.filter((p) => p.category === category);
  }

  async getGreenEscapes(): Promise<Place[]> {
    const all = await this.getPlaces();
    return all.filter((p) => p.isGreenEscape || p.category === 'Gardens and Parks' || p.category === 'Lakes and Nature Spots');
  }
}

// Factory instantiation honoring runtime configuration
export const placesService: IPlacesService =
  APP_CONFIG.placesSource === 'api' && APP_CONFIG.apiBaseUrl
    ? new ApiPlacesProvider(APP_CONFIG.apiBaseUrl)
    : new DemoPlacesProvider();

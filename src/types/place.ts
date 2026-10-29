export type PlaceCategory =
  | 'Historical Monuments'
  | 'Forts and Palaces'
  | 'Museums and Cultural Places'
  | 'Religious Heritage'
  | 'Gardens and Parks'
  | 'Lakes and Nature Spots'
  | 'Hidden Gems';

export interface PlaceImage {
  url: string;
  caption: string;
  sourceCredit: string;
  isIllustrativePlaceholder?: boolean;
}

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  shortDescription: string;
  fullDescription: string;
  historicalContext: string;
  interestingFacts: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address?: string;
  neighbourhood?: string;
  coverImage: string;
  gallery: PlaceImage[];
  visitingDurationMinutes: number; // Configurable duration estimate
  isFeatured?: boolean;
  isGreenEscape?: boolean;
  isHiddenGem?: boolean;
  dataSource: 'demo' | 'official_api';

  // Explicitly marked visitor information (avoids fabricating live state)
  verifiedVisitorInfo?: {
    openingHoursDescription: string;
    entryFeeDescription: string;
    bestTimeToVisit?: string;
    wheelchairAccessible?: boolean;
    photographyAllowed?: boolean;
  };
}

export type SortOption = 'nearest' | 'name-asc' | 'name-desc' | 'duration-asc';
export type DistanceFilter = '1km' | '5km' | '10km' | 'all';

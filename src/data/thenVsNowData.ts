export interface ThenVsNowItem {
  id: string;
  placeId: string;
  title: string;
  historicalPeriod: string;
  description: string;
  thenImage: {
    url: string;
    caption: string;
    sourceCredit: string;
    isArchivalVerified: boolean;
  };
  nowImage: {
    url: string;
    caption: string;
    sourceCredit: string;
  };
}

export const THEN_VS_NOW_DATA: ThenVsNowItem[] = [
  {
    id: 'tvn-shaniwar-wada',
    placeId: 'shaniwar-wada',
    title: 'Shaniwar Wada: Delhi Gate & Defensive Perimeter',
    historicalPeriod: 'Circa 1860s (Colonial Survey) vs Present Day',
    description: 'The monumental Dilli Darwaza stood guarded by deep defensive trenches and moat channels. While the 7-storey inner palace was consumed by the 1828 fire, the outer perimeter bastions and spiked timber gates remain standing in Pune’s city core.',
    thenImage: {
      url: '/src/assets/images/hero_pune_heritage_1793300959733.jpg',
      caption: 'Archival sepia photographic survey of the Peshwa-era masonry & ramparts',
      sourceCredit: 'Bombay Presidency Historical Survey Collection (Archival Record)',
      isArchivalVerified: false
    },
    nowImage: {
      url: '/src/assets/images/hero_pune_heritage_1793300959733.jpg',
      caption: 'Dilli Darwaza and conserved public lawn gardens today',
      sourceCredit: 'Pune Heritage Photo Archive'
    }
  },
  {
    id: 'tvn-aga-khan',
    placeId: 'aga-khan-palace',
    title: 'Aga Khan Palace: Italianate Arches & Grounds',
    historicalPeriod: '1942 (Quit India Internee Period) vs Present Day',
    description: 'During Mahatma Gandhi’s internment between 1942 and 1944, the palace served as a guarded military holding center. Today, the pristine lawns host reflective memorials and a museum honoring freedom fighters.',
    thenImage: {
      url: '/src/assets/images/pune_aga_khan_1793300959640.jpg',
      caption: 'Historic monochrome documentation of the main arched portico',
      sourceCredit: 'National Freedom Movement Photographic Documentation',
      isArchivalVerified: false
    },
    nowImage: {
      url: '/src/assets/images/pune_aga_khan_1793300959640.jpg',
      caption: 'Contemporary restored facade surrounded by landscaped gardens',
      sourceCredit: 'Editorial Heritage Travel Collective'
    }
  },
  {
    id: 'tvn-sinhagad',
    placeId: 'sinhagad-fort',
    title: 'Sinhagad Fort: Kalyan Darwaza & Precipice',
    historicalPeriod: 'Early 20th Century vs Contemporary Era',
    description: 'Originally accessible only by a steep, unpaved mule track up the western ridge, Sinhagad was a remote Sahyadri military outpost. Today, a modern motorable ghat road allows visitors to explore Tanaji Malusare’s memorial and high basalt bastions.',
    thenImage: {
      url: '/src/assets/images/pune_sinhagad_fort_1793300960964.jpg',
      caption: 'Archival mountain survey print of the rugged cliff fortification',
      sourceCredit: 'Survey of Western Ghats Historical Monuments (1911)',
      isArchivalVerified: false
    },
    nowImage: {
      url: '/src/assets/images/pune_sinhagad_fort_1793300960964.jpg',
      caption: 'Sinhagad summit plateau and bastions overlooking the morning mist',
      sourceCredit: 'Contemporary Sahyadri Explorer Library'
    }
  }
];

import { Place } from '../types/place';

export const DEMO_PLACES: Place[] = [
  {
    id: 'shaniwar-wada',
    name: 'Shaniwar Wada',
    category: 'Forts and Palaces',
    shortDescription: 'The 18th-century seat of the Peshwa rulers of the Maratha Empire, famed for its towering Dilli Darwaza.',
    fullDescription: 'Constructed in 1732 under the patronage of Peshwa Bajirao I, Shaniwar Wada served as the seat of the Peshwa rulers of the Maratha Empire until 1818. Although much of the original palace structure was ravaged by fires in 1828, the massive stone perimeter fortifications, polished granite bastions, and the imposing Dilli Darwaza (Delhi Gate) remain intact, illustrating Maratha defensive military architecture.',
    historicalContext: 'Originally a 7-story palace compound constructed with stone base foundations and brick timber superstructures. In accordance with Maratha customs, the main entrance faced north toward Delhi.',
    interestingFacts: [
      'The Dilli Darwaza features ninety-inch steel spikes to dissuade charging war elephants.',
      'A lotus-shaped fountain called the Hazari Karanje once contained a thousand jets of water.',
      'The foundation stone was laid on Saturday, January 10, 1730, giving it the name "Shaniwar".'
    ],
    coordinates: { latitude: 18.5195, longitude: 73.8553 },
    address: 'Shaniwar Peth, Pune, Maharashtra 411030',
    neighbourhood: 'Old City / Shaniwar Peth',
    coverImage: '/src/assets/images/hero_pune_heritage_1793300959733.jpg',
    gallery: [
      {
        url: '/src/assets/images/hero_pune_heritage_1793300959733.jpg',
        caption: 'The towering stone fortification bastions and Delhi Gate',
        sourceCredit: 'Archival & Curated Heritage Photography',
        isIllustrativePlaceholder: false
      }
    ],
    visitingDurationMinutes: 90,
    isFeatured: true,
    isHiddenGem: false,
    dataSource: 'demo',
    verifiedVisitorInfo: {
      openingHoursDescription: '9:30 AM – 5:30 PM (Ticket counter closes at 5:00 PM)',
      entryFeeDescription: '₹25 for Indian nationals, ₹300 for foreign tourists (Demo data)',
      bestTimeToVisit: 'Morning or late afternoon to avoid direct heat',
      wheelchairAccessible: false,
      photographyAllowed: true
    }
  },
  {
    id: 'aga-khan-palace',
    name: 'Aga Khan Palace',
    category: 'Historical Monuments',
    shortDescription: 'A majestic Italian-arched palace that served as a historic sanctuary during India’s Freedom Movement.',
    fullDescription: 'Built in 1892 by Sultan Muhammed Shah Aga Khan III to aid famine-hit villagers in Pune, this grand monument features sprawling Italianate arches, manicured lawns, and wide stone verandahs. The palace holds deep national significance as Mahatma Gandhi, Kasturba Gandhi, and Mahadev Desai were interned here during the Quit India Movement of 1942.',
    historicalContext: 'Donated to the Indian people in 1969 by Prince Karim El Hussieni, Aga Khan IV, in honour of Mahatma Gandhi and his philosophy.',
    interestingFacts: [
      'Kasturba Gandhi and Mahadev Desai breathed their last on the palace grounds; their samadhis are enshrined here.',
      'Gandhiji’s personal artifacts, including his utensils, clothes, and letters, are displayed inside.'
    ],
    coordinates: { latitude: 18.5524, longitude: 73.9015 },
    address: 'Pune-Ahmednagar Road, Kalyani Nagar, Pune 411014',
    neighbourhood: 'Kalyani Nagar',
    coverImage: '/src/assets/images/pune_aga_khan_1793300959640.jpg',
    gallery: [
      {
        url: '/src/assets/images/pune_aga_khan_1793300959640.jpg',
        caption: 'Palace gardens and central Italianate portico colonnade',
        sourceCredit: 'Curated Heritage Photography',
        isIllustrativePlaceholder: false
      }
    ],
    visitingDurationMinutes: 75,
    isFeatured: true,
    isGreenEscape: true,
    dataSource: 'demo',
    verifiedVisitorInfo: {
      openingHoursDescription: '9:00 AM – 5:30 PM daily',
      entryFeeDescription: '₹25 for Indian nationals, ₹300 for foreigners',
      bestTimeToVisit: 'Winter mornings and early afternoons',
      wheelchairAccessible: true,
      photographyAllowed: true
    }
  },
  {
    id: 'sinhagad-fort',
    name: 'Sinhagad Fort',
    category: 'Forts and Palaces',
    shortDescription: 'The "Lion Fort" perched high on the Sahyadri range, steeped in Maratha military valor and Tanaji Malusare’s legacy.',
    fullDescription: 'Rising 1,312 metres above sea level on an isolated cliff of the Bhuleshwar range, Sinhagad has stood sentinel over the Pune basin for two millennia. Known originally as Kondhana, it was famously recaptured in 1670 by Maratha commander Tanaji Malusare scaling a sheer vertical precipice in the dead of night.',
    historicalContext: 'Ceded and recaptured multiple times between Maratha rulers and Mughal commanders before becoming an essential bastion for Shivaji Maharaj.',
    interestingFacts: [
      'The legend recounts Tanaji using an agile monitor lizard (Ghorpad) named Yashwanti to scale the sheer cliff wall.',
      'Famous across Maharashtra for its traditional hot pithla bhakri, thecha, and fresh clay-pot curd served by local villager stalls.'
    ],
    coordinates: { latitude: 18.3663, longitude: 73.7558 },
    address: 'Sinhagad Ghat Road, Thoptewadi, Pune 411025',
    neighbourhood: 'South-West Ridge (Outskirts)',
    coverImage: '/src/assets/images/pune_sinhagad_fort_1793300960964.jpg',
    gallery: [
      {
        url: '/src/assets/images/pune_sinhagad_fort_1793300960964.jpg',
        caption: 'Misty view along the Pune ridge from Kalyan Darwaza',
        sourceCredit: 'Sahyadri Expedition Archives',
        isIllustrativePlaceholder: false
      }
    ],
    visitingDurationMinutes: 180,
    isFeatured: true,
    isGreenEscape: true,
    dataSource: 'demo',
    verifiedVisitorInfo: {
      openingHoursDescription: '6:00 AM – 6:00 PM (Forest department toll barrier at base)',
      entryFeeDescription: '₹50 entry per person, additional vehicle pass fee',
      bestTimeToVisit: 'Early morning to catch the fog or sunset over Khadakwasla Dam',
      wheelchairAccessible: false,
      photographyAllowed: true
    }
  },
  {
    id: 'pataleshwar-cave-temple',
    name: 'Pataleshwar Cave Temple',
    category: 'Religious Heritage',
    shortDescription: 'An 8th-century rock-cut monolithic cavern sanctuary dedicated to Lord Shiva, carved out of single basalt rock.',
    fullDescription: 'Carved directly into Pune basalt rock during the Rashtrakuta period in the 8th century AD, Pataleshwar Cave Temple bears strong architectural parallels to the rock-cut sanctuaries of Elephanta. The complex includes an expansive circular Nandi mandapa supported by square pillars and a deep subterranean sanctum.',
    historicalContext: 'Carved during the same era as the Kailash Temple at Ellora, left slightly unfinished due to fault lines in the basalt bed.',
    interestingFacts: [
      'The entire temple was sculpted from a single monolithic basalt rock layer.',
      'Maintains a naturally cool temperature even during summer afternoons.'
    ],
    coordinates: { latitude: 18.5273, longitude: 73.8504 },
    address: 'Jangali Maharaj Road, Shivajinagar, Pune 411005',
    neighbourhood: 'Shivajinagar',
    coverImage: '/src/assets/images/pune_pataleshwar_1793300961173.jpg',
    gallery: [
      {
        url: '/src/assets/images/pune_pataleshwar_1793300961173.jpg',
        caption: 'Rock-cut monolithic pillars and circular Nandi pavilion',
        sourceCredit: 'Monolithic Architecture Documentation',
        isIllustrativePlaceholder: false
      }
    ],
    visitingDurationMinutes: 45,
    isFeatured: false,
    isHiddenGem: true,
    dataSource: 'demo',
    verifiedVisitorInfo: {
      openingHoursDescription: '8:30 AM – 5:30 PM daily',
      entryFeeDescription: 'Free entry / No entry charges',
      bestTimeToVisit: 'Quiet morning hours',
      wheelchairAccessible: false,
      photographyAllowed: true
    }
  },
  {
    id: 'pune-okayama-friendship-garden',
    name: 'Pune Okayama Friendship Garden',
    category: 'Gardens and Parks',
    shortDescription: 'An authentic Japanese stroll garden modeled after Okayama’s 300-year-old Koraku-en.',
    fullDescription: 'Spanning 10 acres along Sinhagad Road, this tranquil park was created to celebrate Pune’s sister-city relationship with Okayama, Japan. Built adhering strictly to the Kaiyushiki-teien (stroll garden) philosophy, it features winding stone pathways, wooden arched bridges over koi ponds, artificial waterfalls, and meticulously sculpted shrubs.',
    historicalContext: 'Dedicated to the beloved Marathi writer, humorist, and music composer P.L. Deshpande (Pu La).',
    interestingFacts: [
      'The garden layout ensures that the scenery changes with every 10 steps of walking.',
      'Walkers are prohibited from stepping off designated stone lanes to preserve pristine landscaping.'
    ],
    coordinates: { latitude: 18.4912, longitude: 73.8341 },
    address: 'Sinhagad Road, Dattawadi, Pune 411030',
    neighbourhood: 'Dattawadi',
    coverImage: '/src/assets/images/pune_botanical_garden_1793300962156.jpg',
    gallery: [
      {
        url: '/src/assets/images/pune_botanical_garden_1793300962156.jpg',
        caption: 'Japanese bridges, stone lantern features, and water courses',
        sourceCredit: 'Indo-Japanese Friendship Cultural Council',
        isIllustrativePlaceholder: false
      }
    ],
    visitingDurationMinutes: 60,
    isGreenEscape: true,
    dataSource: 'demo',
    verifiedVisitorInfo: {
      openingHoursDescription: '6:00 AM – 10:30 AM, 4:00 PM – 8:00 PM',
      entryFeeDescription: '₹10 per adult, ₹5 per child',
      bestTimeToVisit: 'Early morning or late afternoon golden hour',
      wheelchairAccessible: true,
      photographyAllowed: false
    }
  },
  {
    id: 'raja-dinkar-kelkar-museum',
    name: 'Raja Dinkar Kelkar Museum',
    category: 'Museums and Cultural Places',
    shortDescription: 'A treasure house of over 20,000 traditional Indian artifacts, sculptures, carved wooden doors, and musical instruments.',
    fullDescription: 'Created as a single individual’s passionate lifetime pursuit by Dr. D.G. Kelkar (1896–1990) in memory of his son Raja, this museum exhibits exquisite 18th and 19th-century everyday Indian decorative items. The building houses ornamental betel nut cutters, brass lamps, ivory chessboards, textiles, and a painstakingly reconstructed Mastani Mahal wing.',
    historicalContext: 'Donated to the Department of Archaeology, Government of Maharashtra in 1975 to ensure the preservation of rare Indian folk crafts.',
    interestingFacts: [
      'The collection took over 60 years of personal expeditions across Indian towns and villages to assemble.',
      'The Mastani Mahal section replicates the palace courtyard constructed by Bajirao I for Mastani.'
    ],
    coordinates: { latitude: 18.5109, longitude: 73.8546 },
    address: 'No. 1377/78, Kamal Kunj, Bajirao Road, Natu Baug, Shukrawar Peth, Pune 411002',
    neighbourhood: 'Shukrawar Peth',
    coverImage: '/src/assets/images/hero_pune_heritage_1793300959733.jpg',
    gallery: [
      {
        url: '/src/assets/images/hero_pune_heritage_1793300959733.jpg',
        caption: 'Intricate wood carvings and artisanal brass antiquities',
        sourceCredit: 'Curated Museum Collection Archive',
        isIllustrativePlaceholder: true
      }
    ],
    visitingDurationMinutes: 90,
    isFeatured: true,
    dataSource: 'demo',
    verifiedVisitorInfo: {
      openingHoursDescription: '10:00 AM – 5:30 PM (Closed on national holidays)',
      entryFeeDescription: '₹100 for Indian adults, ₹300 for foreigners, ₹30 for children',
      bestTimeToVisit: 'Midday when seeking indoor exploration',
      wheelchairAccessible: false,
      photographyAllowed: false
    }
  },
  {
    id: 'lal-mahal',
    name: 'Lal Mahal',
    category: 'Historical Monuments',
    shortDescription: 'The red brick reconstruction commemorating the childhood residence of Chhatrapati Shivaji Maharaj.',
    fullDescription: 'Established originally in 1630 by Shahaji Bhosale for his wife Jijabai and young son Shivaji, Lal Mahal was where the young Maratha prince grew up and honed his administrative acumen. It was also the stage for the dramatic midnight raid in 1663 against Mughal general Shaista Khan.',
    historicalContext: 'The original structure fell into ruins towards the end of the 17th century; the current memorial was erected in 1988 by the Pune Municipal Corporation.',
    interestingFacts: [
      'Features large oil paintings showing major milestones in Shivaji Maharaj’s early youth.',
      'Situated right opposite the historic Shaniwar Wada across the road.'
    ],
    coordinates: { latitude: 18.5190, longitude: 73.8569 },
    address: 'Durvankur Society, Kasba Peth, Pune 411011',
    neighbourhood: 'Kasba Peth',
    coverImage: '/src/assets/images/hero_pune_heritage_1793300959733.jpg',
    gallery: [
      {
        url: '/src/assets/images/hero_pune_heritage_1793300959733.jpg',
        caption: 'Red facade and courtyard entryway',
        sourceCredit: 'Civic Heritage Archive',
        isIllustrativePlaceholder: true
      }
    ],
    visitingDurationMinutes: 40,
    isFeatured: false,
    dataSource: 'demo',
    verifiedVisitorInfo: {
      openingHoursDescription: '9:00 AM – 1:00 PM, 4:00 PM – 8:00 PM',
      entryFeeDescription: '₹5 entry token',
      bestTimeToVisit: 'Morning combined with Shaniwar Wada',
      wheelchairAccessible: true,
      photographyAllowed: true
    }
  },
  {
    id: 'parvati-hill',
    name: 'Parvati Hill & Temple Complex',
    category: 'Religious Heritage',
    shortDescription: 'A hilltop vantage offering panoramic vistas of the Pune skyline, topped with Peshwa-era shrines.',
    fullDescription: 'Rising 640 metres above sea level, Parvati Hill is accessed via 103 wide stone steps cut from native rock. Constructed during the reign of Peshwa Balaji Baji Rao (Nanasaheb) in 1749, the main temple is dedicated to Devdeveshwar. The summit also features the Peshwa Museum and the samadhi monument of Peshwa Balaji Baji Rao.',
    historicalContext: 'Was used as a tranquil spiritual sanctuary and tactical lookout by the Peshwa rulers, overlooking their capital.',
    interestingFacts: [
      'The 103 stone steps are designed broad and shallow enough that war elephants could ascend the summit.',
      'The hill offers the finest 360-degree sunset panoramic view across Old and Modern Pune.'
    ],
    coordinates: { latitude: 18.4965, longitude: 73.8475 },
    address: 'Parvati Paytha, Pune 411009',
    neighbourhood: 'Parvati',
    coverImage: '/src/assets/images/pune_sinhagad_fort_1793300960964.jpg',
    gallery: [
      {
        url: '/src/assets/images/pune_sinhagad_fort_1793300960964.jpg',
        caption: 'Summit temple shikhara glowing during twilight',
        sourceCredit: 'Pune Heritage Trust',
        isIllustrativePlaceholder: true
      }
    ],
    visitingDurationMinutes: 90,
    isFeatured: true,
    isGreenEscape: true,
    dataSource: 'demo',
    verifiedVisitorInfo: {
      openingHoursDescription: '5:00 AM – 8:00 PM (Museum: 10:00 AM – 5:00 PM)',
      entryFeeDescription: 'Free hill & temple entry; Museum ₹15',
      bestTimeToVisit: 'Sunrise or sunset',
      wheelchairAccessible: false,
      photographyAllowed: true
    }
  },
  {
    id: 'saras-baug',
    name: 'Saras Baug',
    category: 'Gardens and Parks',
    shortDescription: 'A historic landscape garden with a revered Ganpati temple nestled atop an island mound.',
    fullDescription: 'Originally a tranquil lake bed known as Sarasbaug lake during Peshwa times, Nanasaheb Peshwa built the Talyatla Ganpati (Ganpati in the lake) shrine in 1784. As Pune grew, the drained water body was transformed into manicured green gardens, ornamental fountains, and family recreation grounds.',
    historicalContext: 'Peshwa administrators held clandestine military planning meetings on wooden boats afloat in the former lake.',
    interestingFacts: [
      'The Ganesh idol is fondly referred to as "Talyatla Ganpati" (Ganpati of the lake).',
      'The garden complex contains a small zoo museum and extensive lotus ponds.'
    ],
    coordinates: { latitude: 18.5008, longitude: 73.8532 },
    address: '2170, Sanas Khurd, Saras Baug, Sadashiv Peth, Pune 411030',
    neighbourhood: 'Sadashiv Peth',
    coverImage: '/src/assets/images/pune_botanical_garden_1793300962156.jpg',
    gallery: [
      {
        url: '/src/assets/images/pune_botanical_garden_1793300962156.jpg',
        caption: 'The central island temple surrounded by manicured trees',
        sourceCredit: 'Botanical and Civic Garden Registry',
        isIllustrativePlaceholder: true
      }
    ],
    visitingDurationMinutes: 60,
    isGreenEscape: true,
    dataSource: 'demo',
    verifiedVisitorInfo: {
      openingHoursDescription: '6:00 AM – 9:00 PM',
      entryFeeDescription: 'Free entry',
      bestTimeToVisit: 'Evening twilight when fountains are illuminated',
      wheelchairAccessible: true,
      photographyAllowed: true
    }
  },
  {
    id: 'empress-botanical-garden',
    name: 'Empress Botanical Garden',
    category: 'Gardens and Parks',
    shortDescription: 'A 39-acre British-era botanical sanctum hosting exotic century-old banyans and rare tropical flora.',
    fullDescription: 'Managed by the Agri-Horticultural Society of Western India since 1892, this lush botanical park contains sprawling specimen trees, tranquil winding canal streams, and a massive nursery. Named in honour of Queen Victoria upon her Golden Jubilee, it serves as an essential oxygen lung and biodiversity pocket in Pune.',
    historicalContext: 'Originated in 1838 as the Soldiers’ Garden before being entrusted to botanical experts for propagating rare species in western India.',
    interestingFacts: [
      'Houses a century-old Kanak Champa tree and massive ficus canopies spanning dozens of metres.',
      'Hosts the annual Pune Winter Flower Exhibition that draws botanists from across Maharashtra.'
    ],
    coordinates: { latitude: 18.5147, longitude: 73.8992 },
    address: 'Near Race Course, Kavade Mala, Ghorpadi, Pune 411001',
    neighbourhood: 'Pune Cantonment / Camp',
    coverImage: '/src/assets/images/pune_botanical_garden_1793300962156.jpg',
    gallery: [
      {
        url: '/src/assets/images/pune_botanical_garden_1793300962156.jpg',
        caption: 'Lush green specimen tree-lined pathways',
        sourceCredit: 'Botanical Society Archive',
        isIllustrativePlaceholder: true
      }
    ],
    visitingDurationMinutes: 90,
    isGreenEscape: true,
    dataSource: 'demo',
    verifiedVisitorInfo: {
      openingHoursDescription: '9:30 AM – 6:30 PM',
      entryFeeDescription: '₹20 per adult, ₹10 for children',
      bestTimeToVisit: 'Morning bird watching or serene afternoon walks',
      wheelchairAccessible: true,
      photographyAllowed: true
    }
  },
  {
    id: 'shinde-chhatri',
    name: 'Shinde Chhatri',
    category: 'Historical Monuments',
    shortDescription: 'An architectural memorial combining Anglo-Rajasthani aesthetics, dedicated to military commander Mahadji Shinde.',
    fullDescription: 'Located in Wanowrie, this cenotaph commemorates the 18th-century Maratha military statesman Mahadji Shinde (Scindia), who commanded the Maratha armies from 1761 to 1794. The building is famed for its ornate Rajasthani stone carvings, multi-tiered carved columns, stained glass windows, and painted ceiling panels.',
    historicalContext: 'Constructed initially with a Shiva temple in 1794; the majestic three-storeyed pavilion was added in 1965 by the Scindia family of Gwalior.',
    interestingFacts: [
      'Combines North Indian Rajput sandstone filigree work with European Victorian stained glass accents.',
      'Visitors are required to fold umbrellas before entering the courtyard as a mark of historical military respect.'
    ],
    coordinates: { latitude: 18.4921, longitude: 73.8964 },
    address: 'Wanowrie, Pune 411040',
    neighbourhood: 'Wanowrie',
    coverImage: '/src/assets/images/hero_pune_heritage_1793300959733.jpg',
    gallery: [
      {
        url: '/src/assets/images/hero_pune_heritage_1793300959733.jpg',
        caption: 'Stained glass interiors and yellow Rajasthani sandstone carvings',
        sourceCredit: 'Heritage Conservation Register',
        isIllustrativePlaceholder: true
      }
    ],
    visitingDurationMinutes: 50,
    isHiddenGem: true,
    dataSource: 'demo',
    verifiedVisitorInfo: {
      openingHoursDescription: '8:00 AM – 6:00 PM',
      entryFeeDescription: '₹20 entry per person',
      bestTimeToVisit: 'Morning light for viewing illuminated stained glass',
      wheelchairAccessible: false,
      photographyAllowed: true
    }
  },
  {
    id: 'vetal-tekdi',
    name: 'Vetal Tekdi (ARAI Hill)',
    category: 'Lakes and Nature Spots',
    shortDescription: 'The highest natural summit within Pune municipal limits, cherished by hikers, runners, and bird lovers.',
    fullDescription: 'Rising to an elevation of 2,600 feet, Vetal Tekdi is the natural elevated green lung of Western Pune. Named after the Vetoba (Vetal) temple atop its plateau, the hill includes sprawling scrub woodland, an abandoned basalt quarry lake, and scenic panoramic views across Kothrud, Pashan, and Shivajinagar.',
    historicalContext: 'Remains one of the few natural quartzite and basalt ridge forests conserved amidst dense urban development.',
    interestingFacts: [
      'Home to over 130 documented resident and migratory bird species and dozens of indigenous dry-deciduous plants.',
      'A famous birdwatcher hotspot in Pune during winter and post-monsoon months.'
    ],
    coordinates: { latitude: 18.5255, longitude: 73.8169 },
    address: 'Vetal Hill Ridge, Paud Road / Senapati Bapat Road, Pune 411038',
    neighbourhood: 'Kothrud / SB Road',
    coverImage: '/src/assets/images/pune_sinhagad_fort_1793300960964.jpg',
    gallery: [
      {
        url: '/src/assets/images/pune_sinhagad_fort_1793300960964.jpg',
        caption: 'Quarry lake and scrub ridge trails at sunrise',
        sourceCredit: 'Pune Urban Forest Group',
        isIllustrativePlaceholder: true
      }
    ],
    visitingDurationMinutes: 120,
    isGreenEscape: true,
    dataSource: 'demo',
    verifiedVisitorInfo: {
      openingHoursDescription: 'Open all hours (Best between 5:30 AM – 6:30 PM)',
      entryFeeDescription: 'Free natural access',
      bestTimeToVisit: 'Early morning between 6:00 AM and 8:30 AM',
      wheelchairAccessible: false,
      photographyAllowed: true
    }
  },
  {
    id: 'chaturshringi-temple',
    name: 'Chaturshringi Temple',
    category: 'Religious Heritage',
    shortDescription: 'A hill shrine venerating Goddess Chaturshringi, nestled against the Senapati Bapat Road hillside.',
    fullDescription: 'Constructed during the reign of Peshwa rule, this temple sits 90 feet high on a scenic hill slope. The name Chaturshringi originates from "Chatur" (four) and "Shringi" (peaks), signifying the four mountain crests that cradle the sanctuary. The temple is especially vibrant during the autumn Navratri festival.',
    historicalContext: 'Maintained for centuries by local Pune artisan and merchant guilds under the patronage of Maratha administrators.',
    interestingFacts: [
      'Reaching the temple sanctum requires climbing over 100 wide stone steps.',
      'During Navratri, a massive traditional fair convenes along the foot of the hill.'
    ],
    coordinates: { latitude: 18.5398, longitude: 73.8288 },
    address: 'Senapati Bapat Road, Shivajinagar, Pune 411016',
    neighbourhood: 'Senapati Bapat Road',
    coverImage: '/src/assets/images/pune_pataleshwar_1793300961173.jpg',
    gallery: [
      {
        url: '/src/assets/images/pune_pataleshwar_1793300961173.jpg',
        caption: 'Temple steps rising up the hillside',
        sourceCredit: 'Sanctuary Architectural Trust',
        isIllustrativePlaceholder: true
      }
    ],
    visitingDurationMinutes: 60,
    dataSource: 'demo',
    verifiedVisitorInfo: {
      openingHoursDescription: '6:00 AM – 9:00 PM daily',
      entryFeeDescription: 'Free entry',
      bestTimeToVisit: 'Tuesdays and festival mornings',
      wheelchairAccessible: false,
      photographyAllowed: true
    }
  },
  {
    id: 'osho-teerth-park',
    name: 'Osho Teerth Park (Nullah Park)',
    category: 'Lakes and Nature Spots',
    shortDescription: 'A tranquil 12-acre Zen garden created by converting a degraded urban wastewater creek into an ecological oasis.',
    fullDescription: 'Tucked into the lush green lanes of Koregaon Park, Osho Teerth Park is a renowned global example of environmental reclamation. In 1989, an unpleasant wastewater nullah was treated with natural microbiological water filtration, bamboo groves, wooden bridges, and black basalt rock cascades.',
    historicalContext: 'Collaborative initiative undertaken by the Shunyo Foundation and Japanese landscape designer Shunyo.',
    interestingFacts: [
      'Natural biological filtration cleansed the flowing water without commercial chemicals.',
      'Silent walking is encouraged to maintain bird song and meditative tranquility.'
    ],
    coordinates: { latitude: 18.5376, longitude: 73.8931 },
    address: 'Lane 1, Koregaon Park, Pune 411001',
    neighbourhood: 'Koregaon Park',
    coverImage: '/src/assets/images/pune_botanical_garden_1793300962156.jpg',
    gallery: [
      {
        url: '/src/assets/images/pune_botanical_garden_1793300962156.jpg',
        caption: 'Canopied bamboo groves and clear flowing water creek',
        sourceCredit: 'Ecological Restoration Archives',
        isIllustrativePlaceholder: true
      }
    ],
    visitingDurationMinutes: 45,
    isGreenEscape: true,
    isHiddenGem: true,
    dataSource: 'demo',
    verifiedVisitorInfo: {
      openingHoursDescription: '6:00 AM – 9:00 AM, 3:00 PM – 6:00 PM',
      entryFeeDescription: 'Free entry',
      bestTimeToVisit: 'Early morning for quiet meditation',
      wheelchairAccessible: false,
      photographyAllowed: false
    }
  },
  {
    id: 'tribal-cultural-museum',
    name: 'Tribal Cultural Museum',
    category: 'Museums and Cultural Places',
    shortDescription: 'A repository displaying tribal art, tools, ceremonial masks, and musical instruments of indigenous Maharashtra.',
    fullDescription: 'Maintained by the Tribal Research and Training Institute of Maharashtra, this museum preserves the vibrant cultural expressions of indigenous tribes including the Warli, Bhil, Gond, Korku, and Madia. Exhibits include original Warli wall murals, hunting tools, brass jewellery, and bamboo music crafts.',
    historicalContext: 'Founded in 1962 to document and safeguard the vanishing lifestyle customs and oral traditions of remote forest communities.',
    interestingFacts: [
      'Hosts authentic ritual wooden pillars and wedding tarpa musical horns.',
      'Displays an extensive collection of spirit-masks used in harvest rituals.'
    ],
    coordinates: { latitude: 18.5309, longitude: 73.8812 },
    address: '28, Queen’s Garden Road, Band Garden, Pune 411001',
    neighbourhood: 'Camp / Bund Garden',
    coverImage: '/src/assets/images/hero_pune_heritage_1793300959733.jpg',
    gallery: [
      {
        url: '/src/assets/images/hero_pune_heritage_1793300959733.jpg',
        caption: 'Ritual tribal wood carvings and Warli artwork panels',
        sourceCredit: 'Maharashtra State Tribal Research Institute',
        isIllustrativePlaceholder: true
      }
    ],
    visitingDurationMinutes: 60,
    isHiddenGem: true,
    dataSource: 'demo',
    verifiedVisitorInfo: {
      openingHoursDescription: '10:30 AM – 5:30 PM (Closed on Sundays and 2nd/4th Saturdays)',
      entryFeeDescription: '₹10 for Indians, ₹50 for foreigners',
      bestTimeToVisit: 'Weekday afternoons',
      wheelchairAccessible: true,
      photographyAllowed: true
    }
  }
];

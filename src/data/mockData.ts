import { DestinationData, TripSummary, AppNotification } from '../types';

export const DESTINATIONS: Record<string, DestinationData> = {
  tokyo: {
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    countryFlag: '🇯🇵',
    airportCode: 'HND / NRT',
    originCity: 'San Francisco',
    originAirport: 'SFO',
    travelDates: 'Oct 14 - Oct 28, 2025',
    durationDays: 14,
    passportNationality: 'United States',
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    regionalMapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJxHQJLmP5__hGXkA6xq0JQdG7u2quZDDhFYbfGupIhcsYIXMSWiNdaeMOsKpKl5DVahPgxLcibbegdxDFun9EKNJGMn6Ehlto9ufwzb6LUIeUPuxtBvSBefmJy3vByieS46a_PlEtmBx8PLYMCpNU_sHgJYNWNyiUmt8L1hoPAekmJ7v6TDbICW_Wa6JYERZ7hE2SdsGj8g9zCPYQJg4TZbXGYQqr-IvNuUomDa6zagMEcQugEUOR5Q',
    transitPassName: 'Suica / Pasmo IC Card Active',
    transitPassDesc: 'JR East & Tokyo Metro unified pass. Instant mobile tap on Yamanote Line and Toei Subways.',

    entryStatusSummary: 'Visa-Free (90 Days)',
    entryStatusSubtext: 'US Citizen • Tourist Status Confirmed',
    typicalClimateTempC: 18,
    typicalClimateDesc: 'Mild & crisp autumn conditions',
    seasonalPeakTitle: 'Mid-Autumn Foliage',
    seasonalPeakSubtext: 'Peak momiji in gardens & western valleys',
    culturalEventsCount: 12,
    culturalEventsSubtext: 'TIFF, Rikugien Night Light, Sake festivals',

    weatherOverview: {
      headline: 'Mild & Crisp Autumn Weather',
      subheadline: 'Optimal urban exploration window. Mild afternoons with brisk evening temperatures requiring light layering.',
      tempC: 18,
      feelsLikeC: 17,
      precipMm: 14,
      solarHours: '11h 21m',
      sunriseTime: '05:48',
      sunsetTime: '17:09',
      uvIndex: 4,
      checklistTips: [
        'Breathable merino base layers for fluctuating indoor/outdoor climates',
        'Light trench or wool overcoat for brisk evening temperatures (11°C)',
        'Slip-on shoes for frequent temple, ryokan, and izakaya entries',
        'Compact travel umbrella for occasional coastal drizzle (14mm expected)'
      ]
    },

    forecast7Days: [
      { day: 'Mon', date: 'Oct 14', tempC: 19, minTempC: 13, maxTempC: 21, condition: 'Clear Sky', icon: 'wb_sunny', rainChance: 5, windKmh: 12, uvIndex: 4 },
      { day: 'Tue', date: 'Oct 15', tempC: 20, minTempC: 14, maxTempC: 22, condition: 'Partly Cloudy', icon: 'partly_cloudy_day', rainChance: 10, windKmh: 14, uvIndex: 4 },
      { day: 'Wed', date: 'Oct 16', tempC: 18, minTempC: 12, maxTempC: 20, condition: 'Mild Breeze', icon: 'air', rainChance: 15, windKmh: 18, uvIndex: 3 },
      { day: 'Thu', date: 'Oct 17', tempC: 16, minTempC: 11, maxTempC: 18, condition: 'Light Showers', icon: 'rainy', rainChance: 45, windKmh: 16, uvIndex: 2 },
      { day: 'Fri', date: 'Oct 18', tempC: 17, minTempC: 11, maxTempC: 19, condition: 'Crisp Sun', icon: 'wb_sunny', rainChance: 5, windKmh: 10, uvIndex: 4 },
      { day: 'Sat', date: 'Oct 19', tempC: 19, minTempC: 13, maxTempC: 21, condition: 'Optimal', icon: 'sunny', rainChance: 10, windKmh: 9, uvIndex: 4 },
      { day: 'Sun', date: 'Oct 20', tempC: 18, minTempC: 12, maxTempC: 20, condition: 'High Cirrus', icon: 'cloud', rainChance: 20, windKmh: 13, uvIndex: 3 }
    ],

    visa: {
      status: 'Visa-Free',
      durationDays: 90,
      entryType: 'Single Entry',
      summaryTitle: 'Consular Clearance • Confirmed',
      summarySubtitle: 'Visa Exempt for Tourism (United States Passport Holder)',
      validityRequirement: 'Must be valid for full intended duration of stay in Japan',
      biometricRequirement: 'Fingerprint & facial scan recorded at immigration gate',
      processingTimeStdHours: 0,
      processingTimeExpHours: 0,
      standardFeeUsd: 0,
      officialPortalUrl: 'https://vjw-lp.digital.go.jp/en/',
      portalHost: 'vjw-lp.digital.go.jp',
      applicationDeadlines: [
        { label: 'Today', dateStr: 'Consular Status Valid', status: 'passed' },
        { label: 'Visit Japan Web', dateStr: 'Oct 10, 2025', status: 'recommended' },
        { label: 'Flight Check-in', dateStr: 'Oct 14, 2025', status: 'limit' },
        { label: 'Terminal Exit', dateStr: 'Oct 28, 2025', status: 'exit' }
      ],
      dossierItems: [
        { id: 'v1', title: 'Passport Validity Check', requirement: 'United States passport valid for entirety of travel dates.', checked: true },
        { id: 'v2', title: 'Visit Japan Web Pre-clearance', requirement: 'Immigration & Customs QR generated to bypass line at Haneda.', checked: true },
        { id: 'v3', title: 'Return Transit / Exit Ticket Proof', requirement: 'Confirmed airline itinerary back to SFO within 90-day window.', checked: true },
        { id: 'v4', title: 'Accommodation Vouchers', requirement: 'Hotel addresses registered in Shinjuku & Ginza.', checked: false }
      ],
      faqs: [
        { question: 'Do US citizens need a visa for short tourist stays in Japan?', answer: 'No. US citizens traveling for tourism or business under 90 days are granted visa-free entry upon arrival at all major Japanese ports.' },
        { question: 'Is the Visit Japan Web QR code mandatory?', answer: 'While paper customs and disembarkation forms are still available on flights, Visit Japan Web fast-tracks your terminal arrival by up to 45 minutes.' },
        { question: 'Can I extend my 90-day tourist visa while in Japan?', answer: 'Tourist status cannot typically be extended except under rare humanitarian circumstances. Exiting to a third country and returning resets the clock.' }
      ],
      embassies: [
        { name: 'Embassy of Japan in Washington, D.C.', address: '2520 Massachusetts Ave NW, Washington, DC 20008', phone: '+1 (202) 238-6700', hours: '09:00 - 17:00 EST' },
        { name: 'Consulate General of Japan in San Francisco', address: '275 Battery St #2100, San Francisco, CA 94111', phone: '+1 (415) 780-6000', hours: '09:30 - 16:30 PST' }
      ]
    },

    packingList: [
      { id: 'p1', name: 'Packable Rain Trench / Windbreaker', category: 'outerwear', tag: 'Weather Barrier', badge: 'Essential', packed: true, essential: true },
      { id: 'p2', name: 'Merino Wool Base Layer Tops (x3)', category: 'outerwear', tag: 'Breathable', badge: '3 Sets', packed: true, essential: true },
      { id: 'p3', name: 'Light Cashmere / Fleece Mid-Layer', category: 'outerwear', tag: 'Insulation', badge: 'Warmth', packed: false, essential: true },
      { id: 'p4', name: 'Slip-on Walking Loafers or Sneakers', category: 'essentials', tag: 'Temple Protocol', badge: 'Essential', packed: true, essential: true },
      { id: 'p5', name: 'Pocket Travel Umbrella (Compact)', category: 'essentials', tag: 'Rain Defense', badge: '14mm rain', packed: true, essential: false },
      { id: 'p6', name: 'Coin Pouch (Japan Cash Culture)', category: 'essentials', tag: 'Yen Currency', badge: 'Daily', packed: true, essential: false },
      { id: 'p7', name: 'Pocket WiFi / e-SIM Profile', category: 'tech-gear', tag: 'Connectivity', badge: '5G Active', packed: true, essential: true },
      { id: 'p8', name: 'Type A to Type A USB-C Power Bank', category: 'tech-gear', tag: '10,000mAh', badge: 'Crucial', packed: false, essential: true },
      { id: 'p9', name: 'Hand Towel / Tenugui (Restroom Prep)', category: 'essentials', tag: 'Cultural Norm', badge: 'Handy', packed: false, essential: false }
    ],
    packingWeightKg: 11.2,
    packingMaxKg: 23,

    eventsList: [
      {
        id: 'e1',
        title: 'Tokyo International Film Festival (TIFF)',
        category: 'arts',
        categoryLabel: 'Cinema & Visual Arts',
        dateStr: 'Oct 23 - Nov 01, 2025',
        timeStr: '10:00 - 22:30',
        location: 'Hibiya / Ginza / Roppongi Precincts',
        transitTimeMin: 18,
        crowdLevel: 'High',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRmbfajyP3qTBoYG0Cgnb4W3hWV1U-ZRMhvP19dTf2D5zKeFFPCTtFAcHI9EzKu5ZpmLtxz8J6sZKpjeIJliT9rnr8862eS6IPgbRMAu6zcjQP1RkRzcar2Bhi6mMcqof9vDl-0D9nDuTgXFw3yStYqBv3VBnpF6KsHGBK9YEReB4kw6bRn18vRySMBYNE4LzBCo3QEF_TW_oOZ2bhxLYtebZ1Ab3e_gk5QCMyckbEU6msswo2maWz3Q',
        description: "Asia's premiere international cinema celebration featuring outdoor red carpet screenings and director retrospectives across Hibiya Midtown.",
        highlightBadge: 'Special Access',
        isBookmarked: true,
        inItinerary: true,
        itineraryDay: 10
      },
      {
        id: 'e2',
        title: 'Rikugien Autumn Night Illumination',
        category: 'foliage',
        categoryLabel: 'Botanical Heritage',
        dateStr: 'Oct 20 - Nov 05, 2025',
        timeStr: '18:00 - 21:00',
        location: 'Rikugien Gardens, Bunkyo District',
        transitTimeMin: 24,
        crowdLevel: 'High',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOBQaNY9mpM4EjbBwfp9vXeKELXlw8J1VOs4xj-SrWW_eDMMIYHxTBXTFb-eYeGPh-yMOn9eG5p0jdMgLKmSkWgryRoSNxK1XXvacui6NhfSwQ8t-yOcqUwGldruwQ5k3qZAEweY1g45ePQSoVtDb1vIXBgprswvUTTIc5kvJej5AQB7Y6LgKQoNCIdkmZVLBB7uZcKoSXs-JE0ooXq8g6SxX81kME5XSbubor-jZIZ3xoRK_xBKVmew',
        description: 'Edo-period strolling garden featuring 400 incandescent lanterns reflecting over the central Fukiage pond and fiery maple foliage.',
        highlightBadge: 'Night Magic',
        isBookmarked: false,
        inItinerary: false
      },
      {
        id: 'e3',
        title: 'Roppongi Art & Design Night Walk',
        category: 'arts',
        categoryLabel: 'Contemporary Culture',
        dateStr: 'Oct 18, 2025',
        timeStr: '17:00 - Midnight',
        location: 'Roppongi Hills & Tokyo Midtown',
        transitTimeMin: 15,
        crowdLevel: 'Moderate',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP774fmpzm2XynhxxGsm3__TvGbcK_kaibw_0HmV7xk42rz0cYSxVDc9zaOk5nCPRoRwwiXJlvFnfBKuPEHMmed0D_sXIIfAfybPcds5Wyi8WBq-yYWmDtpSeTou4WAIr0IeIWhnpWYbRQZwczSIN0je7fbe5gE91ufqY31j_8_YxPEdOvuU9e1XEtanRXdezLgDDYkROKgZuB_IZM4CXFxt5Vdmo03GOGm0fVWppZFlDQbimt20wa6g',
        description: 'Museums open late with public kinetic installations, curated jazz performances, and rooftop observation viewing.',
        highlightBadge: 'One Night Only',
        isBookmarked: true,
        inItinerary: true,
        itineraryDay: 5
      },
      {
        id: 'e4',
        title: 'Kanto Craft Beer Autumn Gathering',
        category: 'food',
        categoryLabel: 'Epicurean Gathering',
        dateStr: 'Oct 15 - Oct 17, 2025',
        timeStr: '11:00 - 20:00',
        location: 'Meiji Jingu Outer Gardens',
        transitTimeMin: 12,
        crowdLevel: 'Moderate',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByFjBCOUKv08oTJxcy2vKOedQoikRaQnMXi4jlrX88OewjVHiOR1IXqxhjpYQcfHE-AkAx0wW6myz-frc5xRdEWNBhjn3z4xmqj-2Ot4PNV2WiFsMeMX7Q-7yRbBZOfoXdfhwCD7Y-fyLKkWeTUPsiZvpsoAtJJcclOmNqEDwI1DPlyt-JuUtD8ceOLz5uE5Z1HcafioKxodVUtkk9FzdeDvqD2Qte6OIPfuZBfVIvyQ_cMi4f7QMZ-g',
        description: 'Over 60 independent Japanese microbreweries pouring seasonal pumpkin ales, yuzu sours, and charcoal-grilled yakitori skewers.',
        highlightBadge: 'Culinary Pick',
        isBookmarked: false,
        inItinerary: false
      }
    ]
  },

  reykjavik: {
    id: 'reykjavik',
    city: 'Reykjavik',
    country: 'Iceland',
    countryFlag: '🇮🇸',
    airportCode: 'KEF',
    originCity: 'New York',
    originAirport: 'JFK',
    travelDates: 'Nov 18 - Nov 26, 2025',
    durationDays: 8,
    passportNationality: 'United States',
    heroImage: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80',
    regionalMapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwREWU29DjSCabGIMifX-ZrFhMiZHiD7HCTIWag7RlnRn2ceIryGURRuqNY5TVExAyfK99zSEtVByCK7xiuB00S4orEZ5fhxXUDHe7QRM3JXfzGOFY0qWbpdP6tY_J7arH-T3L3wiYc5ryE8LUY80EjOKHnMKliQIs17ZUj5b5nIuH-2AolThZjKoBO9hCOjbI-sREOaImrQgc-3DjhCIljin-U5TyPCzuLVCmsim0d3t45cvjlCy_Xw',
    transitPassName: 'Flybus & Strætó Pass',
    transitPassDesc: 'Keflavik to BSÍ terminal express coach + Reykjavik Capital area bus system with winter snow chains.',

    entryStatusSummary: 'Schengen 90/180 Rule',
    entryStatusSubtext: 'US Citizen • No Prior Visa Needed',
    typicalClimateTempC: 1,
    typicalClimateDesc: 'Sub-polar cold & high windchill',
    seasonalPeakTitle: 'Aurora Borealis Peak',
    seasonalPeakSubtext: 'High geomagnetic index KP 4.8 expected',
    culturalEventsCount: 6,
    culturalEventsSubtext: 'Iceland Airwaves fringe, Solstice lightwalk',

    weatherOverview: {
      headline: 'Sub-Polar Low Pressure Matrix',
      subheadline: 'Cold Arctic airmass colliding with Gulf Stream eddies. Gale-force wind gusts and rapid precipitation shifts between sleet and snow.',
      tempC: 3,
      feelsLikeC: -6,
      precipMm: 38,
      solarHours: '5h 12m',
      sunriseTime: '10:14',
      sunsetTime: '15:26',
      auroraKp: 4.8,
      uvIndex: 1,
      checklistTips: [
        'Strict three-shell doctrine: Moisture-wicking base, insulating loft, impenetrable hardshell',
        'Crampons / microspikes compulsory for icy sidewalks and glacial waterfall overlooks',
        'Cold-resistant power banks kept in inner pockets to prevent rapid chemical discharge',
        'Hold vehicle doors with two hands when opening in high coastal winds (doors bend backward)'
      ]
    },

    forecast7Days: [
      { day: 'Mon', date: 'Nov 18', tempC: 2, minTempC: -2, maxTempC: 4, condition: 'Wind & Sleet', icon: 'snowing', rainChance: 65, windKmh: 42, uvIndex: 1 },
      { day: 'Tue', date: 'Nov 19', tempC: 0, minTempC: -4, maxTempC: 2, condition: 'Arctic Clear', icon: 'nightlight', rainChance: 15, windKmh: 28, uvIndex: 1 },
      { day: 'Wed', date: 'Nov 20', tempC: -1, minTempC: -5, maxTempC: 1, condition: 'Aurora Night', icon: 'auto_awesome', rainChance: 10, windKmh: 18, uvIndex: 1 },
      { day: 'Thu', date: 'Nov 21', tempC: 1, minTempC: -3, maxTempC: 3, condition: 'Coastal Squall', icon: 'air', rainChance: 70, windKmh: 54, uvIndex: 1 },
      { day: 'Fri', date: 'Nov 22', tempC: 3, minTempC: 0, maxTempC: 4, condition: 'Snow Showers', icon: 'weather_snowy', rainChance: 50, windKmh: 35, uvIndex: 1 },
      { day: 'Sat', date: 'Nov 23', tempC: 2, minTempC: -1, maxTempC: 3, condition: 'Low Cloud', icon: 'cloudy_snowing', rainChance: 40, windKmh: 26, uvIndex: 1 },
      { day: 'Sun', date: 'Nov 24', tempC: 0, minTempC: -4, maxTempC: 2, condition: 'Glacial Calm', icon: 'partly_cloudy_day', rainChance: 20, windKmh: 15, uvIndex: 1 }
    ],

    windGustsHourly: [
      { hour: '06:00', gustKmh: 28 },
      { hour: '09:00', gustKmh: 36 },
      { hour: '12:00', gustKmh: 44 },
      { hour: '15:00', gustKmh: 54 },
      { hour: '18:00', gustKmh: 48 },
      { hour: '21:00', gustKmh: 38 },
      { hour: '00:00', gustKmh: 30 }
    ],

    visa: {
      status: 'Visa-Free',
      durationDays: 90,
      entryType: 'Single Entry',
      summaryTitle: 'Schengen Border Protocol',
      summarySubtitle: 'Permitted up to 90 days within any 180-day window across Schengen Zone',
      validityRequirement: 'Passport must be valid at least 3 months beyond intended departure date',
      biometricRequirement: 'Standard EES / ETIAS biometric registration',
      processingTimeStdHours: 0,
      processingTimeExpHours: 0,
      standardFeeUsd: 0,
      officialPortalUrl: 'https://island.is/en/visas-and-entry',
      portalHost: 'island.is',
      applicationDeadlines: [
        { label: 'Today', dateStr: 'Clearance Active', status: 'passed' },
        { label: 'ETIAS Window', dateStr: 'Nov 01, 2025', status: 'recommended' },
        { label: 'Departure', dateStr: 'Nov 18, 2025', status: 'limit' },
        { label: 'Exit Window', dateStr: 'Nov 26, 2025', status: 'exit' }
      ],
      dossierItems: [
        { id: 'iv1', title: 'Passport 3-Month Minimum Rule', requirement: 'US passport expiration must exceed Feb 26, 2026.', checked: true },
        { id: 'iv2', title: 'Travel Health & Evacuation Insurance', requirement: 'Coverage for extreme weather & geothermal terrain.', checked: true },
        { id: 'iv3', title: 'Car Rental Winter Protocol', requirement: 'Studded tire confirmation & gravel damage waiver signed.', checked: false }
      ],
      faqs: [
        { question: 'Do US citizens need a visa to visit Iceland?', answer: 'No. As a Schengen member, Iceland grants US citizens visa-free tourism for up to 90 days.' },
        { question: 'What is the wind advisory threshold in Iceland?', answer: 'Winds above 40 km/h present steering hazards; yellow warnings trigger at 50 km/h with loose gravel risks.' }
      ],
      embassies: [
        { name: 'Embassy of Iceland in Washington, D.C.', address: '2900 K St NW #509, Washington, DC 20007', phone: '+1 (202) 265-6653', hours: '09:00 - 16:00 EST' }
      ]
    },

    packingList: [
      { id: 'ip1', name: 'Gore-Tex Pro 3-Layer Hardshell Jacket', category: 'outerwear', tag: '28,000mm Waterproof', badge: 'Essential', packed: true, essential: true },
      { id: 'ip2', name: '800-Fill Hydrophobic Down Parka', category: 'outerwear', tag: 'Sub-Zero Loft', badge: 'Crucial', packed: true, essential: true },
      { id: 'ip3', name: 'Windstopper Softshell Fleece Pants', category: 'outerwear', tag: 'Thermal Armor', badge: '2 Sets', packed: true, essential: true },
      { id: 'ip4', name: 'Thermal Balaclava & Heavy Merino Beanie', category: 'outerwear', tag: 'Wind Defense', badge: 'Headgear', packed: false, essential: true },
      { id: 'ip5', name: 'Windproof Touchscreen Technical Gloves', category: 'outerwear', tag: 'Dexterity', badge: 'Insulated', packed: false, essential: true },
      { id: 'ip6', name: 'Quick-Dry Thermal Swimsuit', category: 'essentials', tag: 'Geothermal Spas', badge: 'Blue Lagoon', packed: true, essential: true },
      { id: 'ip7', name: 'Microfiber Packable Camp Towel', category: 'essentials', tag: 'Hot Springs', badge: 'Quick Dry', packed: true, essential: false },
      { id: 'ip8', name: 'Polarized UV Cat-3 Sunglasses', category: 'essentials', tag: 'Low Sun Glare', badge: 'Solar Arc', packed: false, essential: true },
      { id: 'ip9', name: 'Slip-on Boot Crampons (Microspikes)', category: 'tech-gear', tag: 'Black Ice Prep', badge: 'Life Saver', packed: true, essential: true },
      { id: 'ip10', name: '20,000mAh Cold-Resistant Power Bank', category: 'tech-gear', tag: 'Inner Pocket Kept', badge: 'Essential', packed: true, essential: true },
      { id: 'ip11', name: 'Europlug Type C/F Grounded Adapter', category: 'tech-gear', tag: '230V / 50Hz', badge: 'Power', packed: true, essential: false },
      { id: 'ip12', name: 'Waterproof 15L Roll-Top Dry Bag', category: 'tech-gear', tag: 'Waterfall Spray', badge: 'Dry Guard', packed: false, essential: false }
    ],
    packingWeightKg: 14.5,
    packingMaxKg: 23,

    eventsList: [
      {
        id: 'ie1',
        title: 'Geomagnetic Aurora Observation Fleet',
        category: 'foliage',
        categoryLabel: 'Celestial Phenomenon',
        dateStr: 'Nov 19 - Nov 21, 2025',
        timeStr: '20:30 - 01:00',
        location: 'Thingvellir National Park Dark Sky Reserve',
        transitTimeMin: 45,
        crowdLevel: 'Moderate',
        image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80',
        description: 'Guided scientific observation convoy seeking clear sky pockets in the rift valley during anticipated solar storm KP index 5.0.',
        highlightBadge: 'Peak KP 4.8',
        isBookmarked: true,
        inItinerary: true,
        itineraryDay: 2
      },
      {
        id: 'ie2',
        title: 'Harpa Nordic Solstice Concert Series',
        category: 'music',
        categoryLabel: 'Acoustic Performance',
        dateStr: 'Nov 22, 2025',
        timeStr: '19:30 - 22:00',
        location: 'Harpa Concert Hall Eldborg Hall',
        transitTimeMin: 10,
        crowdLevel: 'High',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
        description: 'Icelandic Symphony Orchestra performing contemporary neoclassical movements behind the basalt glass facade.',
        highlightBadge: 'Sold Out Soon',
        isBookmarked: false,
        inItinerary: false
      }
    ]
  },

  kyoto: {
    id: 'kyoto',
    city: 'Kyoto & Osaka',
    country: 'Japan',
    countryFlag: '🇯🇵',
    airportCode: 'KIX / ITM',
    originCity: 'San Francisco',
    originAirport: 'SFO',
    travelDates: 'Oct 18 - Oct 29, 2025',
    durationDays: 12,
    passportNationality: 'United States',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    regionalMapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi7_Gmr3DnQbv_AA6ExPhL2df7ud_VoAeyKx2LTY0sBi2-9ynUuGeqrRGD4OgAhG17nBIb3KDUTWjEo-gFbJzsZyVIQAyiOrqNkek9w2oaGUnw-hDoBjb0pmsgMn2P8xJVqNrnT4PO_BdcX4mAal1kVtVCIhspgrFZECuXNxONEVnKR0R3YQq2UB3bj-1CRwZqnsFj5M7-lgvMbEL-naXCA9OY8-FT2IpUQQWKwN6SQ6ruWtVRYoq8lw',
    transitPassName: 'Kansai Thru Pass / ICOCA',
    transitPassDesc: 'Full coverage on Hankyu, Keihan, and Kintetsu private railways connecting Kyoto Sanjo to Osaka Namba.',

    entryStatusSummary: 'Visa-Free (90 Days)',
    entryStatusSubtext: 'US Citizen • Automatic Border Clearance',
    typicalClimateTempC: 17,
    typicalClimateDesc: 'Crisp mountain basin autumn',
    seasonalPeakTitle: 'Imperial Jidai Matsuri',
    seasonalPeakSubtext: 'Ancient processions & fire rituals',
    culturalEventsCount: 16,
    culturalEventsSubtext: 'Kurama Fire, Kiyomizu night illumination',

    weatherOverview: {
      headline: 'Basin Microclimate & Crisp Evenings',
      subheadline: 'Kyoto basin cools quickly at twilight. Ideal dry daytime conditions for temple walks and courtyard viewing.',
      tempC: 17,
      feelsLikeC: 16,
      precipMm: 10,
      solarHours: '11h 15m',
      sunriseTime: '06:05',
      sunsetTime: '17:15',
      uvIndex: 4,
      checklistTips: [
        'Slip-on socks and footwear for historic tatami temple halls',
        'Light insulated vest for mountain excursions to Mt. Kurama',
        'Small shoulder bag to hold temple stamps (Goshuincho)'
      ]
    },

    forecast7Days: [
      { day: 'Mon', date: 'Oct 18', tempC: 18, minTempC: 11, maxTempC: 20, condition: 'Sunny Basin', icon: 'wb_sunny', rainChance: 5, windKmh: 8, uvIndex: 4 },
      { day: 'Tue', date: 'Oct 19', tempC: 19, minTempC: 12, maxTempC: 21, condition: 'Partly Sunny', icon: 'partly_cloudy_day', rainChance: 10, windKmh: 9, uvIndex: 4 },
      { day: 'Wed', date: 'Oct 20', tempC: 17, minTempC: 10, maxTempC: 19, condition: 'Clear Autumn', icon: 'sunny', rainChance: 0, windKmh: 11, uvIndex: 4 },
      { day: 'Thu', date: 'Oct 21', tempC: 16, minTempC: 9, maxTempC: 18, condition: 'Mountain Fog', icon: 'foggy', rainChance: 15, windKmh: 7, uvIndex: 3 },
      { day: 'Fri', date: 'Oct 22', tempC: 15, minTempC: 8, maxTempC: 17, condition: 'Crisp & Cold', icon: 'flare', rainChance: 5, windKmh: 10, uvIndex: 4 },
      { day: 'Sat', date: 'Oct 23', tempC: 18, minTempC: 11, maxTempC: 20, condition: 'Gentle Sun', icon: 'wb_sunny', rainChance: 10, windKmh: 8, uvIndex: 4 },
      { day: 'Sun', date: 'Oct 24', tempC: 17, minTempC: 10, maxTempC: 19, condition: 'Pleasant', icon: 'wb_sunny', rainChance: 10, windKmh: 9, uvIndex: 4 }
    ],

    visa: {
      status: 'Visa-Free',
      durationDays: 90,
      entryType: 'Single Entry',
      summaryTitle: 'Consular Clearance • Confirmed',
      summarySubtitle: 'Visa Exempt for Tourism (United States Passport Holder)',
      validityRequirement: 'Valid passport for full stay',
      biometricRequirement: 'KIX airport biometric gate screening',
      processingTimeStdHours: 0,
      processingTimeExpHours: 0,
      standardFeeUsd: 0,
      officialPortalUrl: 'https://vjw-lp.digital.go.jp/en/',
      portalHost: 'vjw-lp.digital.go.jp',
      applicationDeadlines: [
        { label: 'Today', dateStr: 'Consular Status Valid', status: 'passed' },
        { label: 'Visit Japan Web', dateStr: 'Oct 14, 2025', status: 'recommended' },
        { label: 'KIX Departure', dateStr: 'Oct 18, 2025', status: 'limit' },
        { label: 'Terminal Exit', dateStr: 'Oct 29, 2025', status: 'exit' }
      ],
      dossierItems: [
        { id: 'kv1', title: 'Passport Validity Verification', requirement: 'US passport current and undamaged.', checked: true },
        { id: 'kv2', title: 'KIX Immigration Fast Track QR', requirement: 'Visit Japan Web registration code.', checked: true },
        { id: 'kv3', title: 'Kansai Hotel Registrations', requirement: 'Kyoto Sanjo + Osaka Umeda confirmations.', checked: true }
      ],
      faqs: [
        { question: 'Can I travel freely between Kyoto and Osaka without border checks?', answer: 'Yes, Kansai is within Japan with no internal border checks. Trains take just 28 minutes.' }
      ],
      embassies: [
        { name: 'US Consulate General Osaka-Kobe', address: '2-11-5 Nishitenma, Kita-ku, Osaka 530-8543', phone: '+81 (6) 6315-5900', hours: '08:30 - 17:00 JST' }
      ]
    },

    packingList: [
      { id: 'kp1', name: 'Cotton Slip-on Footwear (Temple Friendly)', category: 'essentials', tag: 'Easy Removal', badge: 'Essential', packed: true, essential: true },
      { id: 'kp2', name: 'Thick Wool Socks for Wood/Stone Temple Verandas', category: 'essentials', tag: 'Basin Cold', badge: 'Comfort', packed: true, essential: true },
      { id: 'kp3', name: 'Compact Goshuincho Pilgrim Stamp Book', category: 'essentials', tag: 'Cultural Keepsake', badge: 'Handmade', packed: false, essential: false },
      { id: 'kp4', name: 'Midweight Quilted Field Jacket', category: 'outerwear', tag: '10°C Twilight', badge: 'Warmth', packed: true, essential: true },
      { id: 'kp5', name: 'Compact Rapid-Deployment Umbrella', category: 'outerwear', tag: 'Garden Showers', badge: 'Pocket', packed: true, essential: false },
      { id: 'kp6', name: 'Mobile Transit NFC loaded on phone', category: 'tech-gear', tag: 'ICOCA / Suica', badge: 'Rail Tap', packed: true, essential: true }
    ],
    packingWeightKg: 9.8,
    packingMaxKg: 23,

    featuredEvent: {
      id: 'ke_feat',
      title: 'Jidai Matsuri (Festival of the Ages)',
      category: 'matsuri',
      categoryLabel: 'Imperial Historical Pageant',
      dateStr: 'Wed, Oct 22, 2025',
      timeStr: '12:00 - 16:00',
      location: 'Kyoto Imperial Palace to Heian Shrine',
      transitTimeMin: 14,
      crowdLevel: 'Extreme',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnu3xNuvBJV_K0c0F6ZSlocVPt4qJvPwKnrNiKSbZx3xhMxC8dzDfo0rN1nAmqVpyoTtIjEG6sMacxkx25ONR8ZTK9Xy-cNHGnY3GWMTwJngnl1sap8NX9KJQW2xODXucleZaPYWJAVhkMUtjYEDeYgIhx4LPBKg49cj3fEWvwUF5NA65bGFqSVT0LKWRKszXAgvaaBguFAb9zyRgEcb6vagFJh7zrQ1-pMZQNVXgshxd-xdqkkQvbA',
      description: 'One of Kyoto’s three premier festivals. A majestic 2,000-person historical procession spanning 1,100 years of imperial history with authentic samurai armor, court ladies, and mikoshi.',
      highlightBadge: 'Premier Event',
      isBookmarked: true,
      inItinerary: true,
      itineraryDay: 5
    },

    eventsList: [
      {
        id: 'ke1',
        title: 'Kurama Fire Festival (Kurama no Hi-Matsuri)',
        category: 'matsuri',
        categoryLabel: 'Sacred Mountain Rite',
        dateStr: 'Oct 22, 2025',
        timeStr: '18:00 - 23:00',
        location: 'Yuki Shrine, Kurama Mountain Village',
        transitTimeMin: 42,
        crowdLevel: 'Extreme',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbnXdWGRXIrwVOewEkicM4NAWXZME62QrwekJCQgV6b05lfnZuJzaxXVqUkq7mzxKmb_bqJzBpjdGlQ_AbfxnBo0LNmGX0NFNUqa4SiIwr330GPgeGFnwS6fq3jjpT5bGx7mpRLtsOZktoP1ocCAH79x1zLx5jTv5fsS_LtMRNCFGyzV-HEydrtNCViVQChIGHSGUDAz0L2nSiv5TLfMa4OkPu-vWNBxMZbEnkFBdhxOwE9WDXv_qOOg',
        description: 'Blazing multi-meter torches carried through narrow cedar mountain alleys. Ancient spirit welcoming ritual under moonlit peaks.',
        highlightBadge: 'Advisory Alert',
        isBookmarked: true,
        inItinerary: true,
        itineraryDay: 5
      },
      {
        id: 'ke2',
        title: 'Kiyomizu-dera Autumn Special Illuminations',
        category: 'foliage',
        categoryLabel: 'Temple Heritage',
        dateStr: 'Oct 20 - Nov 30, 2025',
        timeStr: '17:30 - 21:30',
        location: 'Kiyomizu-dera, Higashiyama Hills',
        transitTimeMin: 22,
        crowdLevel: 'High',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPHvRwoqYnEv0NElwpAIeX5873YJ3SN6mqEoJEAWsOPosW1tFXhCodr6lb5uAZMkBsgrtjkuUeU-QCIY_j0HtPg1Y1LxhnCLm9v6ASqFsTjwItGUPkv_-QTu6v1BFWIck92jQnguTVPW5wNlAvcWxEGX0JQHTZYTBbJwKtIZhkxwyxLegouOqAv58WtIeRW9y3IDJIBhbZOjafYgEDxnnnKXq5WxcWxku88sypY4-fKdciROCVonYQKA',
        description: 'A blue beam of compassionate light shoots into the night sky while 1,000 maple trees glow beneath the iconic wooden cantilever stage.',
        highlightBadge: 'Must Visit',
        isBookmarked: true,
        inItinerary: true,
        itineraryDay: 7
      },
      {
        id: 'ke3',
        title: 'Dotonbori Gourmet & Craft Sake Street Fest',
        category: 'food',
        categoryLabel: 'Osaka Night Culture',
        dateStr: 'Oct 25 - Oct 27, 2025',
        timeStr: '15:00 - 23:00',
        location: 'Dotonbori Canal Promenade, Osaka',
        transitTimeMin: 48,
        crowdLevel: 'High',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuJGxibKpnf6IHuGijA7wjOEAo_HMaYVG2owzs6iNaBxWNju67IaSWxXC9kKiZNC-CsEOEEmUmMOkOdyhgUdGze1UszBLAU2BNUigMU3NkBz-mhwJqNmOHWkthfB2Ep1TV5kVZz6rcgUHwxdPSmkWuaYuVSq2iY0yMxHujvadQLQvhhy48yRiXraLNYI3ir1Bu3plURkClUUFwDEPS4J7k8qnjeHK_EGBBKL5IYtyowMdmtmCgnjpUdw',
        description: 'Taste traditional Kansai street foods, sizzling takoyaki, grilled wagyu, and sake pairings from 30 regional breweries along the canal.',
        highlightBadge: 'Foodie Heaven',
        isBookmarked: false,
        inItinerary: false
      },
      {
        id: 'ke4',
        title: 'Nijo Castle Digital Art Projection by NAKED',
        category: 'arts',
        categoryLabel: 'Interactive Projection',
        dateStr: 'Daily Oct 15 - Nov 20, 2025',
        timeStr: '18:00 - 22:00',
        location: 'Nijo-jo Castle Inner Moat & Courtyard',
        transitTimeMin: 12,
        crowdLevel: 'Moderate',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5EHlfFyjzUzSJ0EobKKhD_2EFlPFqdJ6yFjmMMsSKiVYLHBItMafdgz_jh3fO9WP3RvHak2mo1Rfj4Xput-iU0dBgZYj39Pu3HWQLC2TZGwKC0VZNJl8JdxPzbBelqh3iCVy0qPjXSVV8KX4bzjlklE9e5cj3-A6P6Lu0ufrR0TDlO_dWIRrvFvgYoV6pZImND0q83BYSKT-3kJe3II88NoNPsc7E-GPbqRX7W03R9orByHVJa6IAHQ',
        description: 'Heritage UNESCO castle illuminated with reactive digital koi, falling sakura petals, and projection mapping across historic stone ramparts.',
        highlightBadge: 'UNESCO Site',
        isBookmarked: false,
        inItinerary: false
      }
    ]
  },

  newdelhi: {
    id: 'newdelhi',
    city: 'New Delhi',
    country: 'India',
    countryFlag: '🇮🇳',
    airportCode: 'DEL',
    originCity: 'Sydney',
    originAirport: 'SYD',
    travelDates: 'Nov 12 - Nov 28, 2025',
    durationDays: 16,
    passportNationality: 'Australia',
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    transitPassName: 'Delhi Metro Smart Card',
    transitPassDesc: 'Airport Express line from Terminal 3 to New Delhi Railway station in 19 mins.',

    entryStatusSummary: 'e-Visa Required (30 Days)',
    entryStatusSubtext: 'Australian Citizen • ETA Mandatory Prior to Boarding',
    typicalClimateTempC: 22,
    typicalClimateDesc: 'Pleasant winter transition, warm days',
    seasonalPeakTitle: 'Post-Monsoon Heritage Season',
    seasonalPeakSubtext: 'Diwali festivities and cooler evenings',
    culturalEventsCount: 9,
    culturalEventsSubtext: 'Qutub Festival, Delhi Literature Walk',

    weatherOverview: {
      headline: 'Pleasant Autumn Sun & Cooling Evenings',
      subheadline: 'Comfortable day temperatures around 25°C dropping to 14°C at night. Dry air with occasional urban haze.',
      tempC: 22,
      feelsLikeC: 23,
      precipMm: 5,
      solarHours: '10h 40m',
      sunriseTime: '06:42',
      sunsetTime: '17:28',
      uvIndex: 6,
      checklistTips: [
        'Light cotton breathable clothing with modest shoulder and knee coverage',
        'Light sweater or pashmina shawl for evening terrace dining',
        'N95 mask recommended for peak transit hours during post-harvest haze',
        'Hand sanitizer and electrolyte rehydration packets'
      ]
    },

    forecast7Days: [
      { day: 'Wed', date: 'Nov 12', tempC: 24, minTempC: 15, maxTempC: 27, condition: 'Hazy Sun', icon: 'wb_sunny', rainChance: 0, windKmh: 6, uvIndex: 6 },
      { day: 'Thu', date: 'Nov 13', tempC: 23, minTempC: 14, maxTempC: 26, condition: 'Sunny', icon: 'sunny', rainChance: 0, windKmh: 7, uvIndex: 6 },
      { day: 'Fri', date: 'Nov 14', tempC: 22, minTempC: 13, maxTempC: 25, condition: 'Mild', icon: 'wb_sunny', rainChance: 0, windKmh: 5, uvIndex: 5 },
      { day: 'Sat', date: 'Nov 15', tempC: 21, minTempC: 13, maxTempC: 25, condition: 'Clear Sky', icon: 'sunny', rainChance: 0, windKmh: 8, uvIndex: 5 },
      { day: 'Sun', date: 'Nov 16', tempC: 21, minTempC: 12, maxTempC: 24, condition: 'Partly Sunny', icon: 'partly_cloudy_day', rainChance: 0, windKmh: 6, uvIndex: 5 },
      { day: 'Mon', date: 'Nov 17', tempC: 20, minTempC: 12, maxTempC: 24, condition: 'Pleasant', icon: 'wb_sunny', rainChance: 0, windKmh: 7, uvIndex: 5 },
      { day: 'Tue', date: 'Nov 18', tempC: 20, minTempC: 11, maxTempC: 23, condition: 'Cool Evening', icon: 'nightlight', rainChance: 0, windKmh: 6, uvIndex: 5 }
    ],

    visa: {
      status: 'ETA / e-Visa',
      durationDays: 30,
      entryType: 'Double Entry',
      summaryTitle: 'Electronic Travel Authorization (ETA)',
      summarySubtitle: 'Official e-Visa for Australian Citizens Traveling to India for Tourism',
      validityRequirement: 'Ordinary passport with minimum 6 months validity from arrival date and 2 blank pages',
      biometricRequirement: 'Biometrics (photo & fingerprints) mandatorily captured upon arrival at DEL airport',
      processingTimeStdHours: 72,
      processingTimeExpHours: 24,
      standardFeeUsd: 25,
      shoulderFeeUsd: 10,
      longTermFeeUsd: 40,
      officialPortalUrl: 'https://indianvisaonline.gov.in/evisa/tvoa.html',
      portalHost: 'indianvisaonline.gov.in',
      applicationDeadlines: [
        { label: 'Today', dateStr: 'Window Open', status: 'passed' },
        { label: 'Recommended', dateStr: 'Oct 15, 2025', status: 'recommended' },
        { label: 'Absolute Limit', dateStr: 'Nov 04, 2025', status: 'limit' },
        { label: 'Departure Exit', dateStr: 'Nov 12, 2025', status: 'exit' }
      ],
      dossierItems: [
        { id: 'nv1', title: 'Ordinary Passport (Original)', requirement: 'Must have at least 6 months validity remaining and minimum 2 blank pages.', checked: true },
        { id: 'nv2', title: 'Digital Biometric Portrait Photo', requirement: 'Recent front-facing square JPEG with plain white background, size 10KB to 1MB.', checked: true },
        { id: 'nv3', title: 'Passport Bio-Data Page Scan', requirement: 'Scanned clear PDF of passport biographical page containing photo & personal details (10-300KB).', checked: false },
        { id: 'nv4', title: 'Proof of Onward Return Journey', requirement: 'Confirmed return airline ticket or onward ticket out of India within the validity period.', checked: false }
      ],
      faqs: [
        { question: 'When should I apply for my 30-day India e-Tourist Visa?', answer: 'For 30-day e-Tourists, applicants may apply minimum 4 days and maximum 30 days prior to their arrival date. We recommend applying exactly around Oct 15-20 for a Nov 12 departure.' },
        { question: 'What is the fee for the 30-day tourist e-visa?', answer: 'During high season (July to March), the government fee is USD $25. During shoulder season (April to June), it is USD $10. A 1-year multiple entry option is USD $40.' },
        { question: 'Is the printed ETA document required at the boarding gate?', answer: 'Yes. You MUST carry a clear physical printout of your Electronic Travel Authorization (ETA) confirmation showing "GRANTED" status.' },
        { question: 'Can I extend or convert the 30-day e-Visa in India?', answer: 'No. The 30-day e-Tourist visa is strictly non-extendable and non-convertible to any other category once in India.' }
      ],
      embassies: [
        { name: 'High Commission of India, Canberra', address: '3-5 Moonah Place, Yarralumla ACT 2600', phone: '+61 2 6223 3800', hours: '09:00 - 17:30 AEST' },
        { name: 'Consulate General of India, Sydney', address: 'Level 1, 265 Castlereagh St, Sydney NSW 2000', phone: '+61 2 9223 2702', hours: '09:30 - 16:30 AEST' },
        { name: 'Australian Smartraveller Emergency Helpline', address: 'Department of Foreign Affairs and Trade, Canberra', phone: '+61 2 6261 3305', hours: '24/7 Consular Emergency' }
      ]
    },

    packingList: [
      { id: 'np1', name: 'Cotton Long-Sleeve Breathable Shirts', category: 'outerwear', tag: 'Sun & Temple Modesty', badge: 'Crucial', packed: true, essential: true },
      { id: 'np2', name: 'Light Pashmina / Merino Travel Shawl', category: 'outerwear', tag: 'Evening Breeze', badge: '14°C Night', packed: true, essential: true },
      { id: 'np3', name: 'Slip-on Shoes / Sandals with Heel Straps', category: 'essentials', tag: 'Frequent Shoe Removal', badge: 'Temples', packed: false, essential: true },
      { id: 'np4', name: 'Physical Paper Printout of ETA Visa (x2)', category: 'essentials', tag: 'Airport Mandatory', badge: 'Check-in', packed: true, essential: true },
      { id: 'np5', name: 'Oral Rehydration Salts & Hand Sanitizer', category: 'essentials', tag: 'Health Protocol', badge: 'Wellness', packed: true, essential: true },
      { id: 'np6', name: 'India Type D / M 3-Pin Grounded Adapter', category: 'tech-gear', tag: '230V Standard', badge: 'Adapter', packed: false, essential: true }
    ],
    packingWeightKg: 10.4,
    packingMaxKg: 20,

    eventsList: [
      {
        id: 'ne1',
        title: 'Qutub Autumn Heritage & Sufi Music Festival',
        category: 'music',
        categoryLabel: 'Traditional Qawwali & Heritage',
        dateStr: 'Nov 15 - Nov 17, 2025',
        timeStr: '18:30 - 22:00',
        location: 'Qutub Minar Archaeological Complex, Mehrauli',
        transitTimeMin: 28,
        crowdLevel: 'High',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=1200&q=80',
        description: 'Classical Indian dance and Sufi vocalists performing against the dramatically illuminated 73-meter medieval minaret.',
        highlightBadge: 'Sufi Magic',
        isBookmarked: true,
        inItinerary: true,
        itineraryDay: 4
      }
    ]
  }
};

export const INITIAL_SAVED_TRIPS: TripSummary[] = [
  {
    id: 'trip-tokyo',
    destinationId: 'tokyo',
    title: 'Tokyo Autumn Protocol',
    dates: 'Oct 14 - Oct 28, 2025',
    duration: '14 Days',
    daysRemaining: 18,
    countryFlag: '🇯🇵',
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    visaStatus: 'Visa-Free (90d)',
    packedCount: 6,
    totalPackCount: 9,
    weatherSummary: '18°C Mild Autumn'
  },
  {
    id: 'trip-reykjavik',
    destinationId: 'reykjavik',
    title: 'Iceland Aurora Expedition',
    dates: 'Nov 18 - Nov 26, 2025',
    duration: '8 Days',
    daysRemaining: 53,
    countryFlag: '🇮🇸',
    heroImage: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80',
    visaStatus: 'Schengen 90d',
    packedCount: 8,
    totalPackCount: 12,
    weatherSummary: '3°C Gale Squalls'
  },
  {
    id: 'trip-kyoto',
    destinationId: 'kyoto',
    title: 'Kyoto & Kansai Cultural Matsuri',
    dates: 'Oct 18 - Oct 29, 2025',
    duration: '12 Days',
    daysRemaining: 22,
    countryFlag: '🇯🇵',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    visaStatus: 'Visa-Free (90d)',
    packedCount: 4,
    totalPackCount: 6,
    weatherSummary: '17°C Crisp Basin'
  },
  {
    id: 'trip-newdelhi',
    destinationId: 'newdelhi',
    title: 'Golden Triangle & Delhi Heritage',
    dates: 'Nov 12 - Nov 28, 2025',
    duration: '16 Days',
    daysRemaining: 47,
    countryFlag: '🇮🇳',
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
    visaStatus: 'ETA Window Open',
    packedCount: 4,
    totalPackCount: 6,
    weatherSummary: '22°C Pleasant'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    type: 'visa',
    title: 'India e-Visa Window Opening Soon',
    message: 'Your recommended window for India 30-Day ETA opens Oct 15, 2025. Prepare bio-data PDF & passport photo.',
    timeAgo: '12m ago',
    read: false,
    actionView: 'visa-checker'
  },
  {
    id: 'n2',
    type: 'weather',
    title: 'Reykjavik Gale Warning Update',
    message: 'Low pressure front tracking across south coast. Winds reaching 54 km/h Nov 21. Check vehicle rental damage waiver.',
    timeAgo: '1h ago',
    read: false,
    actionView: 'packing-weather'
  },
  {
    id: 'n3',
    type: 'event',
    title: 'Jidai Matsuri Grandstand Seats: 85% Booked',
    message: 'Kyoto Imperial Palace official seated viewings are selling fast. Added Day 5 reminder to your calendar.',
    timeAgo: '3h ago',
    read: true,
    actionView: 'destination-events'
  },
  {
    id: 'n4',
    type: 'consular',
    title: 'Visit Japan Web QR Code Active',
    message: 'Consular telemetry verified for Haneda Airport (HND). Tax exemption and disembarkation forms pre-cleared.',
    timeAgo: '1d ago',
    read: true,
    actionView: 'trip-planner'
  }
];

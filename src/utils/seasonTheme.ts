import { Season } from '../types';

export interface SeasonalTheme {
  id: Season;
  name: string;
  label: string;
  tagline: string;
  emoji: string;
  icon: string;
  description: string;
  pageBg: string;
  pageGradient: string;
  cardBg: string;
  cardBorder: string;
  cardBorderHover: string;
  bannerClass: string;
  bannerBadgeBg: string;
  bannerBadgeText: string;
  accentText: string;
  accentBg: string;
  accentLightBg: string;
  accentBorder: string;
  primaryBtn: string;
  secondaryBtn: string;
  badge: string;
  pulseDot: string;
  progressColor: string;
  activeTab: string;
  glowEffect: string;
  forecastHighlight: string;
  seasonalHighlight: string;
}

export const SEASON_THEMES: Record<Season, SeasonalTheme> = {
  summer: {
    id: 'summer',
    name: 'Summer',
    label: 'Sunny Summer Weather',
    tagline: 'High Solar Arc · Warm Radiant Sun',
    emoji: '☀️',
    icon: 'wb_sunny',
    description: 'Sunny, cheerful golden warmth reflecting radiant summer skies and outdoor exploration.',
    pageBg: '#fffdf5',
    pageGradient: 'bg-gradient-to-b from-[#fffbeb] via-[#fffdf5] to-[#fefce8]',
    cardBg: 'bg-white/95',
    cardBorder: 'border-[#fef08a]',
    cardBorderHover: 'hover:border-[#f59e0b]',
    bannerClass: 'bg-[#fffbeb] text-[#78350f] border-[#fde68a]',
    bannerBadgeBg: 'bg-[#f59e0b]',
    bannerBadgeText: 'text-white',
    accentText: 'text-[#d97706]',
    accentBg: 'bg-[#f59e0b]',
    accentLightBg: 'bg-[#fef3c7]',
    accentBorder: 'border-[#fde68a]',
    primaryBtn: 'bg-[#d97706] hover:bg-[#b45309] text-white shadow-md shadow-[#d97706]/20',
    secondaryBtn: 'bg-[#fef3c7] text-[#92400e] hover:bg-[#fde68a] border border-[#fde68a]',
    badge: 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]',
    pulseDot: 'bg-[#f59e0b]',
    progressColor: 'bg-[#d97706]',
    activeTab: 'bg-[#d97706] text-white shadow-xs',
    glowEffect: 'shadow-[0_8px_30px_rgb(245,158,11,0.12)]',
    forecastHighlight: 'bg-[#fffbeb] border-[#fde68a] text-[#78350f]',
    seasonalHighlight: 'text-[#f59e0b]',
  },
  autumn: {
    id: 'autumn',
    name: 'Autumn',
    label: 'Autumn Foliage Weather',
    tagline: 'Crisp Evenings · Golden Momiji & Harvest',
    emoji: '🍁',
    icon: 'nature',
    description: 'Rich terracotta, crimson maple, and burnished amber reflecting crisp autumn foliage.',
    pageBg: '#fdf8f5',
    pageGradient: 'bg-gradient-to-b from-[#fff7ed] via-[#fdf8f5] to-[#fef3ee]',
    cardBg: 'bg-white/95',
    cardBorder: 'border-[#fed7aa]',
    cardBorderHover: 'hover:border-[#ea580c]',
    bannerClass: 'bg-[#fff7ed] text-[#7c2d12] border-[#fed7aa]',
    bannerBadgeBg: 'bg-[#ea580c]',
    bannerBadgeText: 'text-white',
    accentText: 'text-[#c2410c]',
    accentBg: 'bg-[#ea580c]',
    accentLightBg: 'bg-[#ffedd5]',
    accentBorder: 'border-[#fed7aa]',
    primaryBtn: 'bg-[#c2410c] hover:bg-[#9a3412] text-white shadow-md shadow-[#c2410c]/20',
    secondaryBtn: 'bg-[#ffedd5] text-[#9a3412] hover:bg-[#fed7aa] border border-[#fed7aa]',
    badge: 'bg-[#ffedd5] text-[#9a3412] border border-[#fed7aa]',
    pulseDot: 'bg-[#ea580c]',
    progressColor: 'bg-[#c2410c]',
    activeTab: 'bg-[#c2410c] text-white shadow-xs',
    glowEffect: 'shadow-[0_8px_30px_rgb(234,88,12,0.12)]',
    forecastHighlight: 'bg-[#fff7ed] border-[#fed7aa] text-[#7c2d12]',
    seasonalHighlight: 'text-[#ea580c]',
  },
  winter: {
    id: 'winter',
    name: 'Winter',
    label: 'Winter Frost & Alpine Weather',
    tagline: 'Glacial Crispness · Sub-Zero & Frost Arc',
    emoji: '❄️',
    icon: 'ac_unit',
    description: 'Frosted glacier blue, arctic sapphire, and ice cyan reflecting crystalline winter clarity.',
    pageBg: '#f4f8fd',
    pageGradient: 'bg-gradient-to-b from-[#f0f9ff] via-[#f4f8fd] to-[#e0f2fe]',
    cardBg: 'bg-white/95',
    cardBorder: 'border-[#bae6fd]',
    cardBorderHover: 'hover:border-[#0284c7]',
    bannerClass: 'bg-[#f0f9ff] text-[#0c4a6e] border-[#bae6fd]',
    bannerBadgeBg: 'bg-[#0284c7]',
    bannerBadgeText: 'text-white',
    accentText: 'text-[#0284c7]',
    accentBg: 'bg-[#0284c7]',
    accentLightBg: 'bg-[#e0f2fe]',
    accentBorder: 'border-[#bae6fd]',
    primaryBtn: 'bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-[#0284c7]/20',
    secondaryBtn: 'bg-[#e0f2fe] text-[#0369a1] hover:bg-[#bae6fd] border border-[#bae6fd]',
    badge: 'bg-[#e0f2fe] text-[#0369a1] border border-[#bae6fd]',
    pulseDot: 'bg-[#0284c7]',
    progressColor: 'bg-[#0284c7]',
    activeTab: 'bg-[#0284c7] text-white shadow-xs',
    glowEffect: 'shadow-[0_8px_30px_rgb(2,132,199,0.12)]',
    forecastHighlight: 'bg-[#f0f9ff] border-[#bae6fd] text-[#0c4a6e]',
    seasonalHighlight: 'text-[#0284c7]',
  },
  spring: {
    id: 'spring',
    name: 'Spring',
    label: 'Spring Blossom Weather',
    tagline: 'Floral Renewal · Sakura Bloom & Fresh Meadows',
    emoji: '🌸',
    icon: 'local_florist',
    description: 'Delicate sakura petal pink and fresh meadow green reflecting blooming botanical awakening.',
    pageBg: '#fdf7fa',
    pageGradient: 'bg-gradient-to-b from-[#fdf2f8] via-[#fdf7fa] to-[#fce7f3]',
    cardBg: 'bg-white/95',
    cardBorder: 'border-[#fbcfe8]',
    cardBorderHover: 'hover:border-[#db2777]',
    bannerClass: 'bg-[#fdf2f8] text-[#831843] border-[#fbcfe8]',
    bannerBadgeBg: 'bg-[#db2777]',
    bannerBadgeText: 'text-white',
    accentText: 'text-[#db2777]',
    accentBg: 'bg-[#db2777]',
    accentLightBg: 'bg-[#fce7f3]',
    accentBorder: 'border-[#fbcfe8]',
    primaryBtn: 'bg-[#db2777] hover:bg-[#be185d] text-white shadow-md shadow-[#db2777]/20',
    secondaryBtn: 'bg-[#fce7f3] text-[#9d174d] hover:bg-[#fbcfe8] border border-[#fbcfe8]',
    badge: 'bg-[#fce7f3] text-[#9d174d] border border-[#fbcfe8]',
    pulseDot: 'bg-[#db2777]',
    progressColor: 'bg-[#db2777]',
    activeTab: 'bg-[#db2777] text-white shadow-xs',
    glowEffect: 'shadow-[0_8px_30px_rgb(219,39,119,0.12)]',
    forecastHighlight: 'bg-[#fdf2f8] border-[#fbcfe8] text-[#831843]',
    seasonalHighlight: 'text-[#db2777]',
  },
};

const SOUTHERN_HEMISPHERE_COUNTRIES = [
  'australia',
  'new zealand',
  'south africa',
  'argentina',
  'chile',
  'brazil',
  'uruguay',
  'namibia',
  'botswana',
  'zimbabwe',
  'madagascar',
  'peru',
  'bolivia',
  'paraguay',
  'fiji',
  'samoa',
];

const SOUTHERN_CITIES = [
  'sydney',
  'melbourne',
  'brisbane',
  'perth',
  'auckland',
  'wellington',
  'christchurch',
  'queenstown',
  'cape town',
  'johannesburg',
  'buenos aires',
  'santiago',
  'rio de janeiro',
  'sao paulo',
  'montevideo',
  'lima',
];

export function detectSeason(
  datesStr: string,
  country: string,
  city?: string,
  tempC?: number
): Season {
  const normCountry = (country || '').toLowerCase().trim();
  const normCity = (city || '').toLowerCase().trim();
  const normDates = (datesStr || '').toLowerCase();

  const isSouthern =
    SOUTHERN_HEMISPHERE_COUNTRIES.some((c) => normCountry.includes(c)) ||
    SOUTHERN_CITIES.some((c) => normCity.includes(c));

  // Extract month from string (e.g., "Oct 14 - Oct 28", "2026-07-15", "July", "10")
  let month = -1;

  const monthMap: Record<string, number> = {
    jan: 1, january: 1,
    feb: 2, february: 2,
    mar: 3, march: 3,
    apr: 4, april: 4,
    may: 5,
    jun: 6, june: 6,
    jul: 7, july: 7,
    aug: 8, august: 8,
    sep: 9, september: 9,
    oct: 10, october: 10,
    nov: 11, november: 11,
    dec: 12, december: 12,
  };

  for (const [key, m] of Object.entries(monthMap)) {
    if (normDates.includes(key)) {
      month = m;
      break;
    }
  }

  // Check ISO format "2026-07-15"
  if (month === -1) {
    const isoMatch = normDates.match(/\d{4}-(\d{2})-\d{2}/);
    if (isoMatch) {
      month = parseInt(isoMatch[1], 10);
    }
  }

  // Fallback to current date or temperature if no month recognized
  if (month === -1) {
    if (typeof tempC === 'number') {
      if (tempC >= 25) return 'summer';
      if (tempC <= 6) return 'winter';
      if (tempC >= 18) return 'summer';
      return 'autumn';
    }
    month = new Date().getMonth() + 1;
  }

  if (isSouthern) {
    // Southern Hemisphere seasons:
    // Dec, Jan, Feb -> Summer
    // Mar, Apr, May -> Autumn
    // Jun, Jul, Aug -> Winter
    // Sep, Oct, Nov -> Spring
    if ([12, 1, 2].includes(month)) return 'summer';
    if ([3, 4, 5].includes(month)) return 'autumn';
    if ([6, 7, 8].includes(month)) return 'winter';
    return 'spring';
  } else {
    // Northern Hemisphere seasons:
    // Mar, Apr, May -> Spring
    // Jun, Jul, Aug -> Summer
    // Sep, Oct, Nov -> Autumn
    // Dec, Jan, Feb -> Winter
    if ([3, 4, 5].includes(month)) return 'spring';
    if ([6, 7, 8].includes(month)) return 'summer';
    if ([9, 10, 11].includes(month)) return 'autumn';
    return 'winter';
  }
}

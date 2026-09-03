import { DestinationData, Season, WeatherDay, PackingItem, TravelEvent, VisaDetails } from '../types';
import { detectSeason } from '../utils/seasonTheme';

// Curated database of world cities for rich realistic intelligence
interface CityPreset {
  city: string;
  country: string;
  flag: string;
  airport: string;
  isSouthern?: boolean;
  isTropical?: boolean;
  baseClimate: {
    summer: { tempC: number; desc: string; uv: number; precip: number; sun: string; sunrise: string; sunset: string };
    autumn: { tempC: number; desc: string; uv: number; precip: number; sun: string; sunrise: string; sunset: string };
    winter: { tempC: number; desc: string; uv: number; precip: number; sun: string; sunrise: string; sunset: string };
    spring: { tempC: number; desc: string; uv: number; precip: number; sun: string; sunrise: string; sunset: string };
  };
  transitPass: string;
  transitDesc: string;
  visaType: 'Visa-Free' | 'ETA / e-Visa' | 'Visa Required';
  visaDuration: number;
  visaFee: number;
  portalUrl: string;
  heroImages: Record<Season, string>;
  events: Record<Season, TravelEvent[]>;
}

export const CITY_PRESETS: Record<string, CityPreset> = {
  tokyo: {
    city: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
    airport: 'HND / NRT',
    baseClimate: {
      summer: { tempC: 29, desc: 'Hot & humid with vibrant summer festivals', uv: 9, precip: 35, sun: '14h 10m', sunrise: '04:30', sunset: '19:00' },
      autumn: { tempC: 18, desc: 'Mild & crisp autumn foliage window', uv: 4, precip: 14, sun: '11h 20m', sunrise: '05:48', sunset: '17:09' },
      winter: { tempC: 6, desc: 'Cold, clear winter skies with views of Mt. Fuji', uv: 2, precip: 8, sun: '9h 45m', sunrise: '06:50', sunset: '16:50' },
      spring: { tempC: 17, desc: 'Mild, blooming sakura cherry blossom peak', uv: 5, precip: 22, sun: '12h 30m', sunrise: '05:20', sunset: '18:10' },
    },
    transitPass: 'Suica / Pasmo IC Card Active',
    transitDesc: 'JR East & Tokyo Metro unified pass. Instant mobile tap on Yamanote Line and Toei Subways.',
    visaType: 'Visa-Free',
    visaDuration: 90,
    visaFee: 0,
    portalUrl: 'https://vjw-lp.digital.go.jp/en/',
    heroImages: {
      summer: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80',
      autumn: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      winter: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=1200&q=80',
      spring: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    },
    events: {
      summer: [
        { id: 't_s1', title: 'Sumida River Fireworks Festival', category: 'matsuri', categoryLabel: 'Fireworks & Lanterns', dateStr: 'Late July', timeStr: '19:00', location: 'Sumida River, Asakusa', transitTimeMin: 18, crowdLevel: 'Extreme', image: 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?auto=format&fit=crop&w=600&q=80', description: 'Over 20,000 fireworks illuminated across the historic Edo waterfront with yukata crowds.' },
        { id: 't_s2', title: 'Roppongi Summer Yatai Market', category: 'food', categoryLabel: 'Night Market', dateStr: 'Daily in Summer', timeStr: '17:30', location: 'Roppongi Hills Arena', transitTimeMin: 12, crowdLevel: 'Moderate', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80', description: 'Open-air craft beer, yakitori stalls, and shaved ice kakigori pavilions.' },
      ],
      autumn: [
        { id: 't_a1', title: 'Rikugien Garden Autumn Night Illuminations', category: 'foliage', categoryLabel: 'Foliage & Light', dateStr: 'Mid November', timeStr: '18:00', location: 'Rikugien Gardens, Bunkyo', transitTimeMin: 22, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80', description: 'Vibrant Japanese maple canopies reflecting on tranquil feudal pond waters.' },
        { id: 't_a2', title: 'Tokyo International Film Festival (TIFF)', category: 'arts', categoryLabel: 'Cinema & Arts', dateStr: 'Late October', timeStr: '10:00 - 22:00', location: 'Hibiya & Ginza Theaters', transitTimeMin: 10, crowdLevel: 'Moderate', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80', description: 'Asia premier cinematic festival with red-carpet premieres and indie director Q&As.' },
      ],
      winter: [
        { id: 't_w1', title: 'Marunouchi Champagne Gold Illuminations', category: 'arts', categoryLabel: 'Winter Lights', dateStr: 'Nov - Feb', timeStr: '17:00 - 23:00', location: 'Marunouchi Naka-dori', transitTimeMin: 8, crowdLevel: 'Moderate', image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=600&q=80', description: 'Over 1.2 million LED lights strung across 300 roadside zelkova trees.' },
        { id: 't_w2', title: 'Meiji Jingu Hatsumode New Year Blessing', category: 'matsuri', categoryLabel: 'Shinto Tradition', dateStr: 'Jan 01 - 03', timeStr: 'All Day', location: 'Meiji Jingu, Harajuku', transitTimeMin: 15, crowdLevel: 'Extreme', image: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=600&q=80', description: 'First ceremonial shrine visit of the new year with sacred sake and wooden ema prayers.' },
      ],
      spring: [
        { id: 't_sp1', title: 'Ueno Park Sakura Blossom Promenade', category: 'foliage', categoryLabel: 'Cherry Blossoms', dateStr: 'Late March - Early April', timeStr: '09:00 - 20:00', location: 'Ueno Onshi Park', transitTimeMin: 14, crowdLevel: 'Extreme', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80', description: 'Over 1,000 Somei Yoshino cherry blossom trees creating pink tunnels for hanami picnics.' },
        { id: 't_sp2', title: 'Meguro River Cherry Blossom Canal Illumination', category: 'arts', categoryLabel: 'Lantern Canopy', dateStr: 'Early April', timeStr: '18:00 - 21:00', location: 'Nakameguro Canal', transitTimeMin: 16, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=600&q=80', description: 'Pink paper lanterns casting reflections onto cherry blossoms arching over the canal.' },
      ],
    },
  },

  paris: {
    city: 'Paris',
    country: 'France',
    flag: '🇫🇷',
    airport: 'CDG / ORY',
    baseClimate: {
      summer: { tempC: 26, desc: 'Warm, sunny long European summer days along the Seine', uv: 7, precip: 15, sun: '15h 45m', sunrise: '05:55', sunset: '21:45' },
      autumn: { tempC: 14, desc: 'Crisp golden leaves in Tuileries and mild café weather', uv: 3, precip: 20, sun: '11h 10m', sunrise: '07:45', sunset: '18:50' },
      winter: { tempC: 5, desc: 'Chilly, romantic winter fog with festive holiday lights', uv: 1, precip: 22, sun: '8h 20m', sunrise: '08:40', sunset: '17:00' },
      spring: { tempC: 16, desc: 'Fresh blooming gardens and temperate bistro afternoons', uv: 5, precip: 18, sun: '13h 40m', sunrise: '06:45', sunset: '20:30' },
    },
    transitPass: 'Navigo Easy Pass Active',
    transitDesc: 'RATP Metro, RER and Bus contactless pass. Unlimited tap across Central Paris Zones 1-2.',
    visaType: 'Visa-Free',
    visaDuration: 90,
    visaFee: 0,
    portalUrl: 'https://france-visas.gouv.fr/',
    heroImages: {
      summer: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
      autumn: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80',
      winter: 'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=1200&q=80',
      spring: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80',
    },
    events: {
      summer: [
        { id: 'p_s1', title: 'Paris Plages & Seine Waterfront Openings', category: 'food', categoryLabel: 'Open Air Leisure', dateStr: 'July - August', timeStr: '10:00 - 22:00', location: 'Voie Georges Pompidou, Seine', transitTimeMin: 12, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80', description: 'Artificial sandy beaches, open-air sunbeds, and pétanque lanes along the Seine banks.' },
        { id: 'p_s2', title: 'Bastille Day Fireworks at the Eiffel Tower', category: 'matsuri', categoryLabel: 'National Spectacle', dateStr: 'July 14', timeStr: '23:00', location: 'Champ de Mars, 7th Arr.', transitTimeMin: 15, crowdLevel: 'Extreme', image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=600&q=80', description: 'Dazzling 30-minute pyrotechnic concert erupting from the Eiffel Tower framework.' },
      ],
      autumn: [
        { id: 'p_a1', title: 'Nuit Blanche (White Night Arts Festival)', category: 'arts', categoryLabel: 'Contemporary Art', dateStr: 'Early October', timeStr: '19:00 - Dawn', location: 'Citywide Landmarks & Galleries', transitTimeMin: 10, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80', description: 'All-night public art installations, interactive sculptures, and illuminated historical facades.' },
        { id: 'p_a2', title: 'Fête des Vendanges de Montmartre (Grape Harvest)', category: 'food', categoryLabel: 'Wine & Gastronomy', dateStr: 'Mid October', timeStr: '11:00 - 21:00', location: 'Montmartre Vineyard, 18th Arr.', transitTimeMin: 20, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80', description: 'Centuries-old Parisian harvest festival with grand tastings, parades, and artisan wines.' },
      ],
      winter: [
        { id: 'p_w1', title: 'Tuileries Garden Christmas Village & Ice Rink', category: 'food', categoryLabel: 'Holiday Village', dateStr: 'Late Nov - Early Jan', timeStr: '11:00 - 23:00', location: 'Jardin des Tuileries', transitTimeMin: 8, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=600&q=80', description: 'Chalet market stalls with vin chaud, raclette, artisan nougat, and giant ferris wheel.' },
        { id: 'p_w2', title: 'Champs-Élysées Winter Illuminations', category: 'arts', categoryLabel: 'Grand Avenue Lights', dateStr: 'Dec - Jan', timeStr: '17:00 - Midnight', location: 'Avenue des Champs-Élysées', transitTimeMin: 12, crowdLevel: 'Moderate', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80', description: 'Four hundred plane trees illuminated with dazzling crystal-red light strands.' },
      ],
      spring: [
        { id: 'p_sp1', title: 'Foire du Trône Carnival', category: 'matsuri', categoryLabel: 'Spring Fair', dateStr: 'April - May', timeStr: '12:00 - 23:00', location: 'Pelouse de Reuilly, 12th Arr.', transitTimeMin: 18, crowdLevel: 'Moderate', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80', description: 'France’s largest traditional funfair dating back to 957 AD with 300 rides and treats.' },
        { id: 'p_sp2', title: 'Monet’s Giverny Spring Garden Reopening', category: 'foliage', categoryLabel: 'Botanical Gardens', dateStr: 'Early April', timeStr: '09:30 - 18:00', location: 'Giverny (Express Transit)', transitTimeMin: 45, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80', description: 'Bursting tulips, Japanese wisteria bridges, and water lily ponds in full spring color.' },
      ],
    },
  },

  sydney: {
    city: 'Sydney',
    country: 'Australia',
    flag: '🇦🇺',
    airport: 'SYD',
    isSouthern: true,
    baseClimate: {
      summer: { tempC: 27, desc: 'Sunny, hot beach weather with golden sun on Bondi', uv: 11, precip: 18, sun: '14h 25m', sunrise: '05:40', sunset: '20:05' },
      autumn: { tempC: 21, desc: 'Crisp, pleasant coastal days and mild evenings', uv: 6, precip: 22, sun: '11h 30m', sunrise: '06:30', sunset: '18:00' },
      winter: { tempC: 15, desc: 'Mild, brisk winter sun with whale migration along cliffs', uv: 3, precip: 20, sun: '9h 55m', sunrise: '07:00', sunset: '16:55' },
      spring: { tempC: 23, desc: 'Warm sunny breezes and blooming purple jacaranda trees', uv: 8, precip: 15, sun: '13h 10m', sunrise: '05:50', sunset: '19:15' },
    },
    transitPass: 'Opal Contactless Card Active',
    transitDesc: 'Sydney Trains, Sydney Ferries, and Metro. Contactless tap on phone or credit card.',
    visaType: 'ETA / e-Visa',
    visaDuration: 90,
    visaFee: 20,
    portalUrl: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601',
    heroImages: {
      summer: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
      autumn: 'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?auto=format&fit=crop&w=1200&q=80',
      winter: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=80',
      spring: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    },
    events: {
      summer: [
        { id: 's_s1', title: 'Sydney Harbour New Year Fireworks', category: 'matsuri', categoryLabel: 'Global Milestone', dateStr: 'Dec 31', timeStr: '21:00 & 00:00', location: 'Sydney Harbour Bridge', transitTimeMin: 10, crowdLevel: 'Extreme', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80', description: 'World-famous pyrotechnic spectacle over the Harbour Bridge and Opera House sails.' },
        { id: 's_s2', title: 'Sydney Festival Open-Air Concerts', category: 'arts', categoryLabel: 'Live Arts', dateStr: 'January', timeStr: '16:00 - 22:00', location: 'The Domain, Royal Botanic Garden', transitTimeMin: 12, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?auto=format&fit=crop&w=600&q=80', description: 'Two weeks of outdoor contemporary music, cabaret, and indigenous dance performances.' },
      ],
      autumn: [
        { id: 's_a1', title: 'Vivid Sydney Light & Music Extravaganza', category: 'arts', categoryLabel: 'Illuminations', dateStr: 'May - June', timeStr: '18:00 - 23:00', location: 'Circular Quay, Darling Harbour', transitTimeMin: 8, crowdLevel: 'Extreme', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80', description: 'Southern Hemisphere’s largest festival of light, 3D laser mapping onto the Opera House.' },
        { id: 's_a2', title: 'Sydney Royal Easter Show', category: 'matsuri', categoryLabel: 'Agricultural Heritage', dateStr: 'April', timeStr: '09:00 - 21:00', location: 'Sydney Showground, Olympic Park', transitTimeMin: 28, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=600&q=80', description: 'Australian cultural celebration of livestock, food tasting pavilions, and woodchopping.' },
      ],
      winter: [
        { id: 's_w1', title: 'Humpback Whale Migration Watching', category: 'foliage', categoryLabel: 'Coastal Wildlife', dateStr: 'June - August', timeStr: '10:00 - 15:00', location: 'South Head & Bondi Coastal Path', transitTimeMin: 22, crowdLevel: 'Moderate', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80', description: 'Over 30,000 humpback whales breaching along the dramatic Sydney sandstone clifftops.' },
        { id: 's_w2', title: 'Bondi Winter Ice Skating by the Beach', category: 'arts', categoryLabel: 'Winter Fun', dateStr: 'July', timeStr: '10:00 - 21:00', location: 'Bondi Beach Pavilion', transitTimeMin: 20, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?auto=format&fit=crop&w=600&q=80', description: 'Ice skating on an open-air rink positioned right next to the breaking Pacific surf.' },
      ],
      spring: [
        { id: 's_sp1', title: 'Grafton & Kirribilli Jacaranda Bloom Trail', category: 'foliage', categoryLabel: 'Purple Canopy', dateStr: 'October - November', timeStr: 'All Day', location: 'Kirribilli & McDougall St', transitTimeMin: 14, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=600&q=80', description: 'Avenue of blooming purple jacaranda trees forming a fairy-tale lilac tunnel.' },
        { id: 's_sp2', title: 'Sculpture by the Sea (Bondi to Tamarama)', category: 'arts', categoryLabel: 'Outdoor Gallery', dateStr: 'Late October - November', timeStr: 'Dawn - Dusk', location: 'Bondi Coastal Walkway', transitTimeMin: 20, crowdLevel: 'Extreme', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80', description: 'Over 100 large-scale sculptures created by world artists mounted directly on cliff rocks.' },
      ],
    },
  },

  reykjavik: {
    city: 'Reykjavik',
    country: 'Iceland',
    flag: '🇮🇸',
    airport: 'KEF / RKV',
    baseClimate: {
      summer: { tempC: 14, desc: 'Midnight sun, continuous daylight, and mild tundra warmth', uv: 4, precip: 12, sun: '21h 30m', sunrise: '02:50', sunset: '00:20' },
      autumn: { tempC: 5, desc: 'Crisp golden moss, brisk sub-polar gusts, and early auroras', uv: 2, precip: 24, sun: '10h 15m', sunrise: '07:30', sunset: '17:45' },
      winter: { tempC: -2, desc: 'Sub-zero snowscapes, crystalline ice caves, and aurora peak', uv: 1, precip: 32, sun: '4h 10m', sunrise: '11:15', sunset: '15:25' },
      spring: { tempC: 6, desc: 'Glacial thaw, returning puffin colonies, and crisp clear air', uv: 3, precip: 16, sun: '14h 50m', sunrise: '05:40', sunset: '20:30' },
    },
    transitPass: 'Strætó Bus Pass & Flybus Combo',
    transitDesc: 'Capital area bus network pass and Keflavik international express terminal voucher.',
    visaType: 'Visa-Free',
    visaDuration: 90,
    visaFee: 0,
    portalUrl: 'https://island.is/en/visas-to-iceland',
    heroImages: {
      summer: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80',
      autumn: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1200&q=80',
      winter: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
      spring: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=1200&q=80',
    },
    events: {
      summer: [
        { id: 'r_s1', title: 'Secret Solstice Festival (Midnight Sun)', category: 'music', categoryLabel: 'Midnight Sun Music', dateStr: 'Late June', timeStr: '24 Hours', location: 'Laugardalur Park', transitTimeMin: 14, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=600&q=80', description: 'Music festival partying through 72 hours of continuous sun under volcanic peaks.' },
        { id: 'r_s2', title: 'Reykjavik Pride & Rainbow Street Parade', category: 'matsuri', categoryLabel: 'Cultural Unity', dateStr: 'Early August', timeStr: '14:00 - 20:00', location: 'Skólavörðustígur & Downtown', transitTimeMin: 5, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=600&q=80', description: 'Colourful celebration with third of Iceland attending the downtown concerts.' },
      ],
      autumn: [
        { id: 'r_a1', title: 'Iceland Airwaves Music Festival', category: 'music', categoryLabel: 'Indie Music Fest', dateStr: 'Early November', timeStr: '17:00 - 02:00', location: 'Harpa Concert Hall & Venues', transitTimeMin: 8, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80', description: 'Global artists showcasing inside churches, bars, and the crystalline Harpa Hall.' },
        { id: 'r_a2', title: 'Imagine Peace Tower Relighting', category: 'arts', categoryLabel: 'Light Beam Monument', dateStr: 'October 9', timeStr: '20:00', location: 'Viðey Island (Ferry Transit)', transitTimeMin: 25, crowdLevel: 'Moderate', image: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=600&q=80', description: 'Yoko Ono’s towering column of light beaming straight into the Arctic stratospheric clouds.' },
      ],
      winter: [
        { id: 'r_w1', title: 'Reykjavik Winter Lights Festival', category: 'arts', categoryLabel: 'Nordic Illumination', dateStr: 'Early February', timeStr: '18:00 - 23:00', location: 'Hallgrímskirkja & Citywide', transitTimeMin: 6, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80', description: 'Vivid digital light projections illuminating Hallgrímskirkja facade and thermal pools.' },
        { id: 'r_w2', title: 'New Year’s Bonfires & Firework Havoc', category: 'matsuri', categoryLabel: 'Midwinter Fire', dateStr: 'December 31', timeStr: '20:00 - 01:00', location: 'Aegissida Coast Bonfire', transitTimeMin: 12, crowdLevel: 'Extreme', image: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=600&q=80', description: 'Huge neighborhood bonfires followed by 500 tons of fireworks shot by citizens.' },
      ],
      spring: [
        { id: 'r_sp1', title: 'DesignMarch Festival', category: 'arts', categoryLabel: 'Nordic Design', dateStr: 'Late March - April', timeStr: '10:00 - 19:00', location: 'Grandi Harbor & Downtown', transitTimeMin: 10, crowdLevel: 'Moderate', image: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=600&q=80', description: 'Iceland’s foremost contemporary design event highlighting sustainable architecture.' },
        { id: 'r_sp2', title: 'First Day of Summer (Sumardagurinn Fyrsti)', category: 'matsuri', categoryLabel: 'Ancient Norse Holiday', dateStr: 'Third Thursday in April', timeStr: '11:00 - 17:00', location: 'Austurvöllur Square', transitTimeMin: 5, crowdLevel: 'Moderate', image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=600&q=80', description: 'Traditional Viking calendar holiday celebrating the end of brutal winter with parades.' },
      ],
    },
  },

  kualalumpur: {
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    flag: '🇲🇾',
    airport: 'KUL',
    isTropical: true,
    baseClimate: {
      summer: { tempC: 32, desc: 'Tropical warmth with gentle afternoon monsoon drizzles', uv: 11, precip: 38, sun: '12h 15m', sunrise: '07:05', sunset: '19:25' },
      autumn: { tempC: 31, desc: 'Lush tropical warmth with spectacular golden sunsets', uv: 10, precip: 42, sun: '12h 10m', sunrise: '07:00', sunset: '19:10' },
      winter: { tempC: 31, desc: 'Pleasant tropical breeze and vibrant night food markets', uv: 11, precip: 32, sun: '12h 05m', sunrise: '07:15', sunset: '19:20' },
      spring: { tempC: 33, desc: 'Warm equatorial sunshine with rich cultural festivals', uv: 12, precip: 35, sun: '12h 10m', sunrise: '07:10', sunset: '19:20' },
    },
    transitPass: 'Touch n Go / KL TravelPass Active',
    transitDesc: 'RapidKL LRT, MRT, and Monorail unified card. Seamless contactless tap across Klang Valley.',
    visaType: 'Visa-Free',
    visaDuration: 90,
    visaFee: 0,
    portalUrl: 'https://imigresen-online.imi.gov.my/mdac/main',
    heroImages: {
      summer: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
      autumn: 'https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=1200&q=80',
      winter: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
      spring: 'https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=1200&q=80',
    },
    events: {
      summer: [
        { id: 'kl_s1', title: 'Merdeka Independence Eve Fireworks', category: 'matsuri', categoryLabel: 'National Celebration', dateStr: 'August 30 - 31', timeStr: '20:00 - 00:30', location: 'Merdeka Square & KLCC Park', transitTimeMin: 10, crowdLevel: 'Extreme', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=600&q=80', description: 'Massive celebratory concert and fireworks display exploding over the Petronas Twin Towers.' },
        { id: 'kl_s2', title: 'Jalan Alor Night Food Heritage Crawl', category: 'food', categoryLabel: 'Street Food Heritage', dateStr: 'Nightly', timeStr: '18:00 - 02:00', location: 'Jalan Alor, Bukit Bintang', transitTimeMin: 6, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=600&q=80', description: 'Legendary hawker street with sizzling satay, chili crab, durian stalls, and grilled chicken wings.' },
      ],
      autumn: [
        { id: 'kl_a1', title: 'Deepavali Festival of Lights at Batu Caves', category: 'matsuri', categoryLabel: 'Spiritual Heritage', dateStr: 'October / November', timeStr: 'All Day', location: 'Batu Caves Temple Sanctuary', transitTimeMin: 22, crowdLevel: 'Extreme', image: 'https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=600&q=80', description: 'Thousands of oil lamps, flower garlands, and vibrant rituals ascending the 272 rainbow steps.' },
        { id: 'kl_a2', title: 'KL International Jazz & Arts Rendezvous', category: 'arts', categoryLabel: 'Music & Culture', dateStr: 'Mid October', timeStr: '19:00 - 23:30', location: 'Kuala Lumpur Performing Arts Centre', transitTimeMin: 15, crowdLevel: 'Moderate', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80', description: 'Southeast Asian contemporary jazz ensembles and visual gallery displays.' },
      ],
      winter: [
        { id: 'kl_w1', title: 'Thaipusam Grand Chariot Procession', category: 'matsuri', categoryLabel: 'Grand Cultural Ritual', dateStr: 'Late January / February', timeStr: 'Dawn to Midnight', location: 'Sri Maha Mariamman to Batu Caves', transitTimeMin: 20, crowdLevel: 'Extreme', image: 'https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=600&q=80', description: 'Over one million devotees and ornate Kavadi bearers in one of the world’s largest spiritual spectacles.' },
        { id: 'kl_w2', title: 'Chinese New Year Thean Hou Temple Illumination', category: 'matsuri', categoryLabel: 'Lunar New Year', dateStr: 'January / February', timeStr: '18:00 - 23:00', location: 'Thean Hou Temple, Robson Heights', transitTimeMin: 12, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1548625361-19597c2718cf?auto=format&fit=crop&w=600&q=80', description: 'Ten thousand red hanging lanterns illuminating the multi-tiered pagoda overlooking Kuala Lumpur.' },
      ],
      spring: [
        { id: 'kl_sp1', title: 'Hari Raya Aidilfitri Open House Feasts', category: 'food', categoryLabel: 'Culinary Hospitality', dateStr: 'March / April', timeStr: '11:00 - 20:00', location: 'Citywide Heritage Districts', transitTimeMin: 10, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80', description: 'Traditional rendang, lemang, and satay open houses welcoming visitors across the city.' },
        { id: 'kl_sp2', title: 'Perdana Botanical Garden Orchid Walk', category: 'foliage', categoryLabel: 'Botanical Sanctuary', dateStr: 'April', timeStr: '08:00 - 18:00', location: 'Perdana Botanical Garden', transitTimeMin: 8, crowdLevel: 'Moderate', image: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=600&q=80', description: 'Exotic blooming tropical orchids and hibiscus collections in pristine landscaped gardens.' },
      ],
    },
  },

  hongkong: {
    city: 'Hong Kong',
    country: 'Hong Kong SAR',
    flag: '🇭🇰',
    airport: 'HKG',
    baseClimate: {
      summer: { tempC: 31, desc: 'Hot, humid subtropical breezes with sparkling Victoria Harbour views', uv: 10, precip: 45, sun: '13h 10m', sunrise: '05:40', sunset: '19:10' },
      autumn: { tempC: 24, desc: 'Ideal clear, dry autumn weather with breezy hiking and harbor strolls', uv: 6, precip: 15, sun: '11h 45m', sunrise: '06:20', sunset: '17:50' },
      winter: { tempC: 17, desc: 'Mild, brisk and dry winter weather with festive neon harbor displays', uv: 4, precip: 12, sun: '10h 50m', sunrise: '07:00', sunset: '17:55' },
      spring: { tempC: 22, desc: 'Pleasant, misty spring mornings and lively Art Basel cultural week', uv: 6, precip: 28, sun: '12h 15m', sunrise: '06:15', sunset: '18:35' },
    },
    transitPass: 'Octopus Card Active',
    transitDesc: 'World-renowned contactless smart card for MTR, Star Ferry, Ding Ding Tram, and 7-Eleven.',
    visaType: 'Visa-Free',
    visaDuration: 90,
    visaFee: 0,
    portalUrl: 'https://www.immd.gov.hk/eng/services/visas/visit-transit/visit-visa-entry-permit.html',
    heroImages: {
      summer: 'https://images.unsplash.com/photo-1506970845036-3c2e572d7b70?auto=format&fit=crop&w=1200&q=80',
      autumn: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=1200&q=80',
      winter: 'https://images.unsplash.com/photo-1506970845036-3c2e572d7b70?auto=format&fit=crop&w=1200&q=80',
      spring: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=1200&q=80',
    },
    events: {
      summer: [
        { id: 'hk_s1', title: 'Hong Kong Dragon Boat Carnival', category: 'matsuri', categoryLabel: 'Harbour Racing', dateStr: 'Late June', timeStr: '09:00 - 17:30', location: 'Victoria Harbour Waterfront', transitTimeMin: 8, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1506970845036-3c2e572d7b70?auto=format&fit=crop&w=600&q=80', description: 'Pounding drums, vibrantly painted dragon boats, and craft beer village on Tsim Sha Tsui promenade.' },
        { id: 'hk_s2', title: 'Symphony of Lights Waterfront Promenade', category: 'arts', categoryLabel: 'Laser Spectacle', dateStr: 'Daily', timeStr: '20:00 - 20:15', location: 'Avenue of Stars, Tsim Sha Tsui', transitTimeMin: 5, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=600&q=80', description: 'Synchronized laser, searchlight, and LED display radiating across 44 skyscrapers on both sides of Victoria Harbour.' },
      ],
      autumn: [
        { id: 'hk_a1', title: 'Tai Hang Fire Dragon Dance (Mid-Autumn)', category: 'matsuri', categoryLabel: 'Intangible Cultural Heritage', dateStr: 'Mid-Autumn Festival', timeStr: '20:15 - 22:30', location: 'Tai Hang, Causeway Bay', transitTimeMin: 12, crowdLevel: 'Extreme', image: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=600&q=80', description: 'A 67-meter fiery dragon studded with 72,000 burning incense sticks paraded through narrow historic streets.' },
        { id: 'hk_a2', title: 'Hong Kong Wine & Dine Festival', category: 'food', categoryLabel: 'Gastronomy Fair', dateStr: 'Late October', timeStr: '12:00 - 23:00', location: 'Central Harbourfront Event Space', transitTimeMin: 10, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80', description: 'World Michelin-starred chefs, artisan wineries, and harborfront tastings overlooking the illuminated skyline.' },
      ],
      winter: [
        { id: 'hk_w1', title: 'Victoria Harbour New Year Fireworks Countdown', category: 'matsuri', categoryLabel: 'Midnight Countdown', dateStr: 'December 31', timeStr: '23:00 - 00:30', location: 'Victoria Harbour', transitTimeMin: 10, crowdLevel: 'Extreme', image: 'https://images.unsplash.com/photo-1506970845036-3c2e572d7b70?auto=format&fit=crop&w=600&q=80', description: 'Spectacular musical pyrotechnic extravaganza lighting up the world-famous harbour and Hong Kong Convention Centre.' },
        { id: 'hk_w2', title: 'Hong Kong WinterFest & Giant Christmas Tree', category: 'arts', categoryLabel: 'Festive Lights', dateStr: 'Dec - Jan', timeStr: '17:00 - 23:00', location: 'West Kowloon Cultural District', transitTimeMin: 15, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1506970845036-3c2e572d7b70?auto=format&fit=crop&w=600&q=80', description: 'A 20-meter glittering Christmas tree against the skyline with romantic festive markets and hot mulled tea.' },
      ],
      spring: [
        { id: 'hk_sp1', title: 'Art Basel Hong Kong', category: 'arts', categoryLabel: 'Global Fine Arts', dateStr: 'Late March', timeStr: '11:00 - 20:00', location: 'HKCEC, Wan Chai', transitTimeMin: 8, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=600&q=80', description: 'Premier international art fair bringing together 240 premier galleries from across 40 countries.' },
        { id: 'hk_sp2', title: 'Cheung Chau Bun Festival & Tower Scramble', category: 'matsuri', categoryLabel: 'Taoist Heritage', dateStr: 'Early May', timeStr: 'All Day', location: 'Cheung Chau Island (Ferry)', transitTimeMin: 45, crowdLevel: 'Extreme', image: 'https://images.unsplash.com/photo-1506970845036-3c2e572d7b70?auto=format&fit=crop&w=600&q=80', description: 'Centuries-old folk ritual featuring costumed children floating on stilts and athletes scrambling up 60-foot bun towers.' },
      ],
    },
  },

  beijing: {
    city: 'Beijing',
    country: 'China',
    flag: '🇨🇳',
    airport: 'PEK / PKX',
    baseClimate: {
      summer: { tempC: 30, desc: 'Warm summer sun with vibrant Forbidden City courtyard tours', uv: 8, precip: 45, sun: '14h 30m', sunrise: '04:50', sunset: '19:40' },
      autumn: { tempC: 17, desc: 'Glorious golden autumn with crisp blue skies and red maple Great Wall views', uv: 5, precip: 15, sun: '11h 25m', sunrise: '06:25', sunset: '17:35' },
      winter: { tempC: -2, desc: 'Crisp cold winter air with frozen Houhai lake ice skating and snow on imperial tiles', uv: 2, precip: 5, sun: '9h 40m', sunrise: '07:30', sunset: '17:00' },
      spring: { tempC: 16, desc: 'Fresh blooming peach and magnolia blossoms across Summer Palace', uv: 6, precip: 18, sun: '12h 45m', sunrise: '05:55', sunset: '18:45' },
    },
    transitPass: 'Beijing Yikatong / Metro NFC Active',
    transitDesc: 'Beijing Subway unified card. Contactless phone NFC tap across 27 subway lines.',
    visaType: 'Visa-Free',
    visaDuration: 30,
    visaFee: 0,
    portalUrl: 'https://www.nia.gov.cn/',
    heroImages: {
      summer: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80',
      autumn: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80',
      winter: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=1200&q=80',
      spring: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80',
    },
    events: {
      summer: [
        { id: 'bj_s1', title: 'Summer Palace Lotus Bloom Fair', category: 'foliage', categoryLabel: 'Imperial Gardens', dateStr: 'July - August', timeStr: '08:30 - 17:30', location: 'Kunming Lake, Summer Palace', transitTimeMin: 35, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80', description: 'Traditional dragon boat cruises through acres of blooming pink lotus flowers under the Foxiang Pavilion.' },
        { id: 'bj_s2', title: '798 Art District Summer Night Galleries', category: 'arts', categoryLabel: 'Contemporary Art', dateStr: 'Every Weekend', timeStr: '16:00 - 22:00', location: '798 Art Zone, Chaoyang', transitTimeMin: 25, crowdLevel: 'Moderate', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80', description: 'Bauhaus factory complex transformed into contemporary art galleries, outdoor craft markets, and rooftop cafes.' },
      ],
      autumn: [
        { id: 'bj_a1', title: 'Fragrant Hills Red Leaves Festival (Xiangshan)', category: 'foliage', categoryLabel: 'Autumn Foliage', dateStr: 'Mid October - November', timeStr: '08:00 - 17:00', location: 'Fragrant Hills Park, Haidian', transitTimeMin: 40, crowdLevel: 'Extreme', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80', description: 'Over 100,000 smoke trees turning blazing crimson across the historic imperial hillside.' },
        { id: 'bj_a2', title: 'Mutianyu Great Wall Golden Sunset Hike', category: 'arts', categoryLabel: 'Heritage Monument', dateStr: 'October', timeStr: '15:00 - 18:30', location: 'Mutianyu Great Wall', transitTimeMin: 65, crowdLevel: 'Moderate', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80', description: 'Dramatic stone watchtowers snaking along mountain ridges flanked by fiery golden oak and ginkgo canopies.' },
      ],
      winter: [
        { id: 'bj_w1', title: 'Houhai Lake Ice Skating & Sledding Fair', category: 'matsuri', categoryLabel: 'Winter Tradition', dateStr: 'Late Dec - February', timeStr: '09:00 - 17:00', location: 'Shichahai & Houhai Lake', transitTimeMin: 15, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=600&q=80', description: 'Centuries-old Beijing tradition of ice chair sledding and ice skating with roast chestnut aromas.' },
        { id: 'bj_w2', title: 'Ditan Temple Fair (Spring Festival)', category: 'matsuri', categoryLabel: 'Lunar New Year', dateStr: 'Chinese New Year Week', timeStr: '08:30 - 17:00', location: 'Ditan Park (Temple of Earth)', transitTimeMin: 18, crowdLevel: 'Extreme', image: 'https://images.unsplash.com/photo-1548625361-19597c2718cf?auto=format&fit=crop&w=600&q=80', description: 'Reenactment of Qing Dynasty sacrificial ceremonies, lion dances, sugar painting, and folk performances.' },
      ],
      spring: [
        { id: 'bj_sp1', title: 'Yuyuantan Park Cherry Blossom Festival', category: 'foliage', categoryLabel: 'Spring Cherry Blossoms', dateStr: 'Late March - April', timeStr: '08:00 - 18:00', location: 'Yuyuantan Park, Haidian', transitTimeMin: 20, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80', description: 'Over 2,000 cherry trees blooming around the central lake with Central TV Tower in the background.' },
        { id: 'bj_sp2', title: 'Forbidden City Magnolia & Pear Blossom Awakening', category: 'arts', categoryLabel: 'Imperial Palace', dateStr: 'April', timeStr: '08:30 - 17:00', location: 'The Palace Museum (Forbidden City)', transitTimeMin: 12, crowdLevel: 'Extreme', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80', description: 'Ancient white magnolia blossoms set against vermilion imperial palace walls and golden glazed tiles.' },
      ],
    },
  },
};

// Highly detailed consular intelligence engine for specific nationalities
export interface ConsularAdvisoryResult {
  visa: VisaDetails;
  entryStatusSummary: string;
  entryStatusSubtext: string;
  passportCountryFlag: string;
  passportTitle: string;
  specialNotice?: {
    type: 'success' | 'warning' | 'info';
    badge: string;
    headline: string;
    details: string;
    highlights: string[];
  };
}

export function getPassportConsularAdvisory(
  passportNationality: string,
  destinationCountry: string,
  destinationCity: string,
  travelDates?: string
): ConsularAdvisoryResult {
  const normPassport = (passportNationality || 'United States').toLowerCase();
  const destCountryLower = (destinationCountry || '').toLowerCase();
  const destCityLower = (destinationCity || '').toLowerCase();

  const isChinaPassport = normPassport.includes('china') || normPassport.includes('chinese') || normPassport.includes('prc');
  const isHongKongPassport = normPassport.includes('hong kong') || normPassport.includes('hksar') || normPassport.includes('hk');
  const isMalaysiaPassport = normPassport.includes('malaysia') || normPassport.includes('malaysian');

  // Today and future milestones for application timeline
  const now = new Date();
  const dateStrToday = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const twoWeeksPrior = new Date(now.getTime() + 14 * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const departureDateStr = travelDates ? travelDates.split(' - ')[0] || 'Flight Day' : 'Flight Day';
  const returnDateStr = travelDates ? travelDates.split(' - ')[1] || 'Return Day' : 'Return Day';

  // 1. CHINA (PRC Ordinary Passport / 中华人民共和国普通护照)
  if (isChinaPassport) {
    // A. Destination: Malaysia
    if (destCountryLower.includes('malaysia')) {
      return {
        passportCountryFlag: '🇨🇳',
        passportTitle: 'China (PRC Ordinary Passport)',
        entryStatusSummary: 'Visa-Free (30 Days)',
        entryStatusSubtext: 'PRC Passport • 30-Day Mutual Exemption Active',
        specialNotice: {
          type: 'success',
          badge: 'Mutual Visa Exemption',
          headline: '30-Day Bilateral Visa-Free Exemption Agreement Active',
          details: 'Under the historic bilateral agreement between China and Malaysia, ordinary passport holders enjoy up to 30 days of visa-free entry for tourism and business. No embassy visit is required.',
          highlights: [
            'Malaysia Digital Arrival Card (MDAC) must be registered online within 3 days before landing',
            'Confirmed return flight ticket to China or onward transit hub within 30 days',
            'Passport must have at least 6 months remaining validity upon port arrival',
            'Sufficient funds (cash or international card) and confirmed hotel reservation',
          ],
        },
        visa: {
          status: 'Visa-Free',
          durationDays: 30,
          entryType: 'Single/Multiple Entry',
          summaryTitle: '30-Day Bilateral Visa Exemption Agreement Active',
          summarySubtitle: 'PRC Passport Holder • Malaysia Immigration Exemption',
          validityRequirement: 'PRC passport must have minimum 6 months validity from entry date',
          biometricRequirement: 'Digital fingerprint capture and facial imaging at port immigration autogates/counters',
          processingTimeStdHours: 0,
          processingTimeExpHours: 0,
          standardFeeUsd: 0,
          officialPortalUrl: 'https://imigresen-online.imi.gov.my/mdac/main',
          portalHost: 'imigresen-online.imi.gov.my',
          applicationDeadlines: [
            { label: 'Validity Check', dateStr: 'Passport 6+ Mos', status: 'passed' },
            { label: 'MDAC Registration', dateStr: '3 Days Prior', status: 'recommended' },
            { label: 'Border Gate Entry', dateStr: departureDateStr, status: 'limit' },
            { label: 'Max 30-Day Exit', dateStr: returnDateStr, status: 'exit' },
          ],
          dossierItems: [
            { id: 'cn_my_1', title: 'PRC Ordinary Passport (护照原件)', requirement: 'Original PRC passport with at least 6 months validity and 2 blank visa pages.', checked: true },
            { id: 'cn_my_2', title: 'MDAC Online Arrival Registration', requirement: 'Malaysia Digital Arrival Card submission confirmation PIN / PDF.', checked: true },
            { id: 'cn_my_3', title: 'Confirmed Return Airfare (回程机票行程单)', requirement: 'Valid exit ticket from Malaysia within the 30-day authorized period.', checked: true },
            { id: 'cn_my_4', title: 'Accommodation Vouchers (酒店预订单)', requirement: 'Confirmed lodging address across Kuala Lumpur or Malaysian destinations.', checked: true },
            { id: 'cn_my_5', title: 'Proof of Funds (旅费资金准备)', requirement: 'Recommended minimum $500 USD equivalent in cash or international unionpay/credit card.', checked: false },
          ],
          faqs: [
            {
              question: 'Do Chinese citizens need a visa to travel to Malaysia?',
              answer: 'No. Under the mutual visa exemption agreement between China and Malaysia, Chinese ordinary passport holders can enter Malaysia visa-free for tourism and social visits for up to 30 days.',
            },
            {
              question: 'Is the Malaysia Digital Arrival Card (MDAC) mandatory for Chinese tourists?',
              answer: 'Yes! All travelers holding Chinese passports must submit the online MDAC form within 3 days (72 hours) prior to arriving in Malaysia at the official Immigration Department portal.',
            },
            {
              question: 'Can the 30-day visa-free stay be extended inside Malaysia?',
              answer: 'Generally, no. The 30-day visa-free entry cannot be extended except in certified force majeure or medical emergencies. Travelers needing longer stays must apply for a social visit pass in advance.',
            },
            {
              question: 'Are Chinese tourists eligible to use Malaysian e-Gates at KLIA?',
              answer: 'Yes, after completing the first manual entry counter verification and MDAC registration, subsequent entries may use the automated border control autogates.',
            },
          ],
          embassies: [
            {
              name: 'Embassy of Malaysia in Beijing (Consular Section)',
              address: 'No. 2, Liangmaqiao North Street, Chaoyang District, Beijing',
              phone: '+86 (10) 6532-2531',
              hours: '09:00 - 17:00 Mon-Fri',
            },
            {
              name: 'Consulate-General of Malaysia in Shanghai',
              address: 'Unit 01, 9th Floor, CITIC Square, 1168 Nanjing West Rd, Jing’an, Shanghai',
              phone: '+86 (21) 6090-0360',
              hours: '08:30 - 16:30 Mon-Fri',
            },
            {
              name: 'Consulate-General of Malaysia in Guangzhou',
              address: 'Units 1912-1918, CITIC Plaza Office Tower, 233 Tianhe North Rd, Guangzhou',
              phone: '+86 (20) 3877-0763',
              hours: '09:00 - 17:00 Mon-Fri',
            },
          ],
        },
      };
    }

    // B. Destination: Japan
    if (destCountryLower.includes('japan')) {
      return {
        passportCountryFlag: '🇨🇳',
        passportTitle: 'China (PRC Ordinary Passport)',
        entryStatusSummary: 'eVisa / Agency Visa Required',
        entryStatusSubtext: 'PRC Passport • JAPAN eVISA or Authorized Agency Filing',
        specialNotice: {
          type: 'warning',
          badge: 'Consular Application Mandatory',
          headline: 'Advance Japanese Tourist Visa / JAPAN eVISA Required',
          details: 'Chinese ordinary passport holders residing in Mainland China or overseas must obtain an entry visa prior to travel. Single-entry tourist eVisas can be applied via designated agencies or the JAPAN eVISA portal, while 3-year and 5-year multiple-entry visas require financial solvency proof.',
          highlights: [
            'Single entry tourist eVisa issued via accredited agency or official JAPAN eVISA portal',
            'Financial solvency: proof of annual income (tax clearance) or 100,000+ RMB bank deposit',
            'Visit Japan Web electronic declaration QR code required for fast-track immigration',
            'Shore Pass (72h transit) is discretionary and strictly reserved for unexpected airline disruptions',
          ],
        },
        visa: {
          status: 'ETA / e-Visa',
          durationDays: 15,
          entryType: 'Single or Multiple Entry (3-5 Years)',
          summaryTitle: 'JAPAN eVISA Pre-Clearance / Tourist Visa Required',
          summarySubtitle: 'PRC Passport Holder • Designated Agency Filing & MoFA eVISA',
          validityRequirement: 'PRC passport valid for at least 6 months with 2 blank visa pages',
          biometricRequirement: 'Live facial capture and index finger biometrics scanned at Japanese immigration kiosk',
          processingTimeStdHours: 120,
          processingTimeExpHours: 72,
          standardFeeUsd: 22,
          officialPortalUrl: 'https://www.evisa.mofa.go.jp/index',
          portalHost: 'evisa.mofa.go.jp',
          applicationDeadlines: [
            { label: 'Dossier Filing', dateStr: '15 Days Prior', status: 'passed' },
            { label: 'Agency Review', dateStr: '8 Days Prior', status: 'recommended' },
            { label: 'eVisa Notice PDF', dateStr: '3 Days Prior', status: 'limit' },
            { label: 'Boarding Gate', dateStr: departureDateStr, status: 'exit' },
          ],
          dossierItems: [
            { id: 'cn_jp_1', title: 'PRC Passport Original (护照原件)', requirement: 'Valid for 6+ months with at least 2 empty visa pages.', checked: true },
            { id: 'cn_jp_2', title: 'Visa Application Form with Photo (签证申请表)', requirement: '45mm x 35mm white background photo taken within 6 months.', checked: true },
            { id: 'cn_jp_3', title: 'Tax Clearance Certificate (个人所得税纳税记录)', requirement: 'Official State Taxation Administration tax certificate proving annual income thresholds.', checked: false },
            { id: 'cn_jp_4', title: 'Bank Asset Verification (银行存款证明 / 流水)', requirement: 'Bank savings deposit freeze slip or 12-month salary bank statement.', checked: false },
            { id: 'cn_jp_5', title: 'Round-trip Flight & Hotel Vouchers (机票酒店预订单)', requirement: 'Accredited travel agency booking vouchers matching planned itinerary.', checked: true },
            { id: 'cn_jp_6', title: 'Visit Japan Web QR Registration', requirement: 'Pre-registered digital customs & immigration QR on mobile phone.', checked: true },
          ],
          faqs: [
            {
              question: 'Can Chinese citizens apply for a Japan tourist visa individually without an agency?',
              answer: 'Applicants residing in Mainland China must submit their visa applications through authorized travel agencies designated by the Japanese Embassy or Consulates. Overseas residents may apply directly via the JAPAN eVISA portal.',
            },
            {
              question: 'What are the income requirements for a 3-year or 5-year multiple Japan visa?',
              answer: 'For a 3-year visa (stay up to 30 days), an annual taxable income of approximately 200,000 RMB is typically required. For a 5-year visa (stay up to 90 days), an annual taxable income of 500,000 RMB or substantial equivalent assets is required.',
            },
            {
              question: 'How is the JAPAN eVISA displayed at airport check-in?',
              answer: 'Travelers must present the digital "Visa Issuance Notice" on their mobile device with an active internet connection. Screenshots or printed PDF sheets are not accepted by airline check-in agents.',
            },
          ],
          embassies: [
            {
              name: 'Embassy of Japan in China (Consular Section)',
              address: 'No. 1, Ritan Road, Chaoyang District, Beijing',
              phone: '+86 (10) 6532-2007',
              hours: '09:00 - 17:30 Mon-Fri',
            },
            {
              name: 'Consulate-General of Japan in Shanghai',
              address: '8 Denggao Rd, Changning District, Shanghai',
              phone: '+86 (21) 5257-4766',
              hours: '09:00 - 17:00 Mon-Fri',
            },
            {
              name: 'Consulate-General of Japan in Guangzhou',
              address: 'Garden Tower, 368 Huanshi Dong Rd, Yuexiu District, Guangzhou',
              phone: '+86 (20) 8334-3009',
              hours: '08:45 - 17:15 Mon-Fri',
            },
          ],
        },
      };
    }

    // C. Destination: France / Iceland / Europe (Schengen Area)
    if (destCountryLower.includes('france') || destCountryLower.includes('iceland') || destCountryLower.includes('italy') || destCountryLower.includes('germany')) {
      return {
        passportCountryFlag: '🇨🇳',
        passportTitle: 'China (PRC Ordinary Passport)',
        entryStatusSummary: 'Schengen Visa Required (Type C)',
        entryStatusSubtext: 'PRC Passport • In-Person VIS Biometrics at TLScontact/VFS',
        specialNotice: {
          type: 'warning',
          badge: 'Biometric Appointment Required',
          headline: 'Mandatory VIS Biometric Appointment at Visa Center',
          details: 'Chinese ordinary passport holders must secure a Schengen Short-Stay Visa (Type C). First-time applicants or those whose biometric data has passed the 59-month cycle must appear in person at a TLScontact or VFS Global visa center for 10-finger scanning.',
          highlights: [
            'Mandatory travel health insurance with minimum €30,000 emergency medical and repatriation cover',
            '3-6 months official bank statements showing steady cash flow and balance',
            'Official company employment certificate with approved leave and business license copy',
            'Confirmed round-trip flight booking and hotel vouchers for each day in Schengen',
          ],
        },
        visa: {
          status: 'Visa Required',
          durationDays: 90,
          entryType: 'Short Stay Type C (Single/Multiple)',
          summaryTitle: 'Schengen Uniform Visa (Type C) Mandatory',
          summarySubtitle: 'PRC Passport Holder • VIS Biometric Center Lodgement',
          validityRequirement: 'Valid for at least 3 months after departure date from Schengen with 2 blank pages',
          biometricRequirement: '10-fingerprint scan and digital biometric facial photo at TLScontact or VFS Global',
          processingTimeStdHours: 360,
          processingTimeExpHours: 240,
          standardFeeUsd: 98,
          officialPortalUrl: 'https://france-visas.gouv.fr/',
          portalHost: 'france-visas.gouv.fr',
          applicationDeadlines: [
            { label: 'Online Application', dateStr: '45 Days Prior', status: 'passed' },
            { label: 'VIS Biometrics Slot', dateStr: '30 Days Prior', status: 'recommended' },
            { label: 'Passport Stamping', dateStr: '10 Days Prior', status: 'limit' },
            { label: 'Departure', dateStr: departureDateStr, status: 'exit' },
          ],
          dossierItems: [
            { id: 'cn_eu_1', title: 'PRC Passport Original (护照原件)', requirement: 'Issued within the last 10 years, valid for 3+ months post-departure.', checked: true },
            { id: 'cn_eu_2', title: 'Schengen Application Form & Receipt', requirement: 'Fully completed online application summary and receipt code.', checked: true },
            { id: 'cn_eu_3', title: 'Travel Insurance Policy (€30,000 / 30万保额境外险)', requirement: 'Compliant Schengen policy with zero deductible covering repatriation.', checked: true },
            { id: 'cn_eu_4', title: 'Bank Statements for 6 Months (银行借记卡流水)', requirement: 'Certified bank statements showing sufficient balance with daily transaction records.', checked: false },
            { id: 'cn_eu_5', title: 'Employment Certificate (在职证明 & 营业执照副本)', requirement: 'Company letterhead signed with official seal stating position, salary, and authorized leave.', checked: false },
            { id: 'cn_eu_6', title: 'Flight & Accommodation Proof (全程行程单与住宿)', requirement: 'Day-by-day itinerary with verifiable reservations.', checked: true },
          ],
          faqs: [
            {
              question: 'How far in advance should Chinese citizens apply for a Schengen visa?',
              answer: 'Applications can be submitted up to 6 months before the intended travel date. It is strongly recommended to apply at least 30 to 45 days in advance due to biometric appointment slot availability in Chinese cities.',
            },
            {
              question: 'Can I travel to Iceland or other European countries with a French Schengen visa?',
              answer: 'Yes! As long as France is your main destination (country of longest stay) or your initial entry point, your Uniform Schengen Visa allows unrestricted travel across all 29 Schengen member states.',
            },
            {
              question: 'Do Chinese minors need notarized parental authorizations for Schengen?',
              answer: 'Yes. Minors traveling without both parents must submit a notarized and Ministry of Foreign Affairs (MFA) apostilled parental consent declaration alongside birth certificate verification.',
            },
          ],
          embassies: [
            {
              name: 'Embassy of France in China (Consular Section)',
              address: 'No. 60, Tianze Road, Chaoyang District, Beijing',
              phone: '+86 (10) 8531-2000',
              hours: '08:30 - 17:30 Mon-Fri',
            },
            {
              name: 'TLScontact France Visa Application Center Beijing',
              address: 'Room 301, 3F, Building 2, No. 19 Dongdaqiao Rd, Chaoyang, Beijing',
              phone: '+86 (21) 6016-8668',
              hours: '08:30 - 16:30 Mon-Fri',
            },
            {
              name: 'TLScontact France Visa Center Shanghai',
              address: '8F, Longyu International Business Plaza, 329 Hengfeng Rd, Shanghai',
              phone: '+86 (21) 6016-8668',
              hours: '08:30 - 16:30 Mon-Fri',
            },
          ],
        },
      };
    }

    // D. Destination: Australia
    if (destCountryLower.includes('australia')) {
      return {
        passportCountryFlag: '🇨🇳',
        passportTitle: 'China (PRC Ordinary Passport)',
        entryStatusSummary: 'Visitor Visa (Subclass 600) Required',
        entryStatusSubtext: 'PRC Passport • ImmiAccount Application & Biometrics at AVAC',
        specialNotice: {
          type: 'warning',
          badge: 'Subclass 600 Mandate',
          headline: 'Subclass 600 Tourist Stream Required (Not ETA Eligible)',
          details: 'Chinese ordinary passport holders are not eligible for the Australian ETA mobile app. Travelers must create an ImmiAccount, lodge a Subclass 600 Visitor Visa, and complete biometric collection at an Australian Visa Application Centre (AVAC) in China.',
          highlights: [
            'Lodge online via Australian Department of Home Affairs ImmiAccount portal',
            'Schedule biometric capture (facial photo and fingerprints) at AVAC in Beijing, Shanghai, Guangzhou, Chengdu, etc.',
            'Standard processing averages 15 to 25 working days',
            'Subclass 600 grants 3-month stays per entry with up to 1-year or 3-year validity',
          ],
        },
        visa: {
          status: 'Visa Required',
          durationDays: 90,
          entryType: 'Multiple Entry (1 - 3 Years)',
          summaryTitle: 'Visitor Visa (Subclass 600) Lodgement Required',
          summarySubtitle: 'PRC Passport Holder • ImmiAccount Electronic Grant',
          validityRequirement: 'PRC passport valid for intended stay with 6 months validity recommended',
          biometricRequirement: 'Mandatory biometric collection (fingerprints & facial photo) at AVAC center',
          processingTimeStdHours: 480,
          processingTimeExpHours: 240,
          standardFeeUsd: 130,
          officialPortalUrl: 'https://online.immi.gov.au/lusc/login',
          portalHost: 'online.immi.gov.au',
          applicationDeadlines: [
            { label: 'ImmiAccount Filing', dateStr: '30 Days Prior', status: 'passed' },
            { label: 'AVAC Biometrics', dateStr: '20 Days Prior', status: 'recommended' },
            { label: 'Electronic Visa Grant', dateStr: '7 Days Prior', status: 'limit' },
            { label: 'Flight Day', dateStr: departureDateStr, status: 'exit' },
          ],
          dossierItems: [
            { id: 'cn_au_1', title: 'PRC Passport Bio Page (彩色护照扫描件)', requirement: 'High-resolution color scan of biodata and all travel stamps.', checked: true },
            { id: 'cn_au_2', title: 'Chinese ID Card & Hukou (身份证及户口本整本彩色扫描)', requirement: 'Full color scans with certified English translations.', checked: true },
            { id: 'cn_au_3', title: 'Financial Evidence (存款、流水及资产证明)', requirement: 'Recent 6-month bank statements, personal tax returns, vehicle or property deeds.', checked: false },
            { id: 'cn_au_4', title: 'Employment Certificate (在职收入证明)', requirement: 'Company letter specifying tenure, position, annual salary, and approved leave.', checked: false },
            { id: 'cn_au_5', title: 'AVAC Biometrics Appointment Slip', requirement: 'Appointment letter for biometric fingerprint scan in China.', checked: true },
          ],
          faqs: [
            {
              question: 'Can Chinese citizens use the Australian ETA smartphone app?',
              answer: 'No. Only citizens of ETA-eligible passport countries (e.g. Hong Kong SAR, Malaysia, USA, Singapore, Japan) can use the ETA app. Chinese ordinary passport holders must apply for Subclass 600.',
            },
            {
              question: 'Do I need a physical visa label in my Chinese passport for Australia?',
              answer: 'No. Australia issues electronic visa grants (EVAs) linked directly to your passport number in the global advance passenger processing system.',
            },
          ],
          embassies: [
            {
              name: 'Australian Embassy in Beijing',
              address: '21 Dongzhimenwai Dajie, Sanlitun, Chaoyang, Beijing',
              phone: '+86 (10) 5140-4111',
              hours: '08:30 - 17:00 Mon-Fri',
            },
            {
              name: 'VFS Global Australian Visa Application Centre Shanghai',
              address: '2F, Jiushi Commercial Building, 318 Sichuan Middle Rd, Huangpu, Shanghai',
              phone: '+86 (20) 2910-6150',
              hours: '08:30 - 15:00 Mon-Fri',
            },
          ],
        },
      };
    }

    // E. Destination: Hong Kong SAR
    if (destCountryLower.includes('hong kong')) {
      return {
        passportCountryFlag: '🇨🇳',
        passportTitle: 'China (PRC Ordinary Passport)',
        entryStatusSummary: '7-Day Transit Visa-Free / Permit',
        entryStatusSubtext: 'PRC Passport • 7-Day Third-Country Transit Privilege',
        specialNotice: {
          type: 'info',
          badge: 'Transit Exemption Active',
          headline: '7-Day Visa-Free Transit Privilege to Third Country',
          details: 'Chinese passport holders transiting through Hong Kong to or from a third country or territory with confirmed onward tickets enjoy 7 days of visa-free stay without needing an Exit-Entry Permit (港澳通行证).',
          highlights: [
            'Must present confirmed onward flight/ferry ticket departing Hong Kong within 7 days',
            'Valid entry clearance/visa for the destination country',
            'No Exit-Entry Permit (EEP) endorsement required for legitimate third-country transits',
            'For direct non-transit visits from Mainland, an Exit-Entry Permit with travel endorsement is required',
          ],
        },
        visa: {
          status: 'Visa-Free',
          durationDays: 7,
          entryType: 'Transit Entry (7 Days per Leg)',
          summaryTitle: '7-Day Visa-Free Transit Exemption',
          summarySubtitle: 'PRC Passport Holder • Connecting to/from Third Destination',
          validityRequirement: 'PRC passport valid for intended stay with 6 months validity',
          biometricRequirement: 'Standard immigration landing slip inspection at airport or boundary control points',
          processingTimeStdHours: 0,
          processingTimeExpHours: 0,
          standardFeeUsd: 0,
          officialPortalUrl: 'https://www.immd.gov.hk/eng/services/visas/overseas-chinese-entry-arrangements.html',
          portalHost: 'immd.gov.hk',
          applicationDeadlines: [
            { label: 'Passport & Ticket', dateStr: 'Check Onward Flights', status: 'passed' },
            { label: 'Port Arrival', dateStr: departureDateStr, status: 'limit' },
            { label: '7-Day Transit Exit', dateStr: returnDateStr, status: 'exit' },
          ],
          dossierItems: [
            { id: 'cn_hk_1', title: 'PRC Ordinary Passport', requirement: 'Original passport with 6+ months validity.', checked: true },
            { id: 'cn_hk_2', title: 'Confirmed Onward Flight Ticket', requirement: 'Flight ticket leaving HK within 7 days to a foreign destination.', checked: true },
            { id: 'cn_hk_3', title: 'Destination Entry Visa / Proof', requirement: 'Valid visa or entry exemption proof for the final country.', checked: true },
          ],
          faqs: [
            {
              question: 'Can I enter Hong Kong with a Chinese passport without a Two-Way Permit?',
              answer: 'Yes, provided you are in transit to or from a foreign country and hold a confirmed onward ticket and visa for your final destination. You can stay in Hong Kong for up to 7 days.',
            },
            {
              question: 'What happens if I enter Hong Kong using transit but cancel my onward flight?',
              answer: 'Intentionally abusing the transit waiver is an immigration offence ("DT stamp" on passport) and can lead to immediate prosecution or severe future transit bans.',
            },
          ],
          embassies: [
            {
              name: 'Immigration Department of Hong Kong SAR',
              address: 'Immigration Tower, 7 Gloucester Road, Wan Chai, Hong Kong',
              phone: '+852 2824-6111',
              hours: '08:45 - 17:15 Mon-Fri',
            },
          ],
        },
      };
    }
  }

  // 2. HONG KONG (HKSAR Passport / 香港特别行政区护照)
  if (isHongKongPassport) {
    // A. Destination: Japan
    if (destCountryLower.includes('japan')) {
      return {
        passportCountryFlag: '🇭🇰',
        passportTitle: 'Hong Kong (HKSAR Passport)',
        entryStatusSummary: 'Visa-Free (90 Days)',
        entryStatusSubtext: 'HKSAR Passport • 90-Day Tourist Exemption',
        specialNotice: {
          type: 'success',
          badge: 'Consular Visa Exemption',
          headline: '90-Day Visa-Free Freedom for Hong Kong SAR Citizens',
          details: 'Holders of HKSAR passports enjoy complete visa-free entry to Japan for tourism, business visits, and visiting relatives for stays up to 90 consecutive days. Simply register on Visit Japan Web for express airport processing.',
          highlights: [
            '90 days visa-free access across Japan',
            'Pre-fill Visit Japan Web digital customs declaration & immigration QR',
            'No visa fees or consular appointments required',
            'Eligible for tax-free shopping with passport stamp verification',
          ],
        },
        visa: {
          status: 'Visa-Free',
          durationDays: 90,
          entryType: 'Multiple Entry',
          summaryTitle: '90-Day Visa-Free Consular Exemption Active',
          summarySubtitle: 'HKSAR Passport Holder • Japanese Consular Waiver',
          validityRequirement: 'Passport must be valid for intended period of stay in Japan',
          biometricRequirement: 'Standard landing photograph and index finger touch scan at airport gate',
          processingTimeStdHours: 0,
          processingTimeExpHours: 0,
          standardFeeUsd: 0,
          officialPortalUrl: 'https://vjw-lp.digital.go.jp/en/',
          portalHost: 'vjw-lp.digital.go.jp',
          applicationDeadlines: [
            { label: 'Visit Japan Web', dateStr: 'Register Online', status: 'passed' },
            { label: 'Boarding Gate', dateStr: departureDateStr, status: 'limit' },
            { label: '90-Day Max Stay', dateStr: returnDateStr, status: 'exit' },
          ],
          dossierItems: [
            { id: 'hk_jp_1', title: 'HKSAR Biometric Passport', requirement: 'Valid for intended duration of travel.', checked: true },
            { id: 'hk_jp_2', title: 'Visit Japan Web QR Code', requirement: 'Generated QR codes on smartphone for fast-track immigration and customs.', checked: true },
            { id: 'hk_jp_3', title: 'Return Flight Ticket to HK or Onward Hub', requirement: 'Proof of transport out of Japan within 90 days.', checked: true },
          ],
          faqs: [
            {
              question: 'Do Hong Kong SAR passport holders need any visa for Japan?',
              answer: 'No. HKSAR passport holders can enter Japan visa-free for tourism or business stays up to 90 days.',
            },
            {
              question: 'What is Visit Japan Web?',
              answer: 'It is the official web service created by the Japanese Digital Agency allowing travelers to submit immigration and customs quarantine declarations online, generating a QR code for express terminal transit.',
            },
          ],
          embassies: [
            {
              name: 'Consulate-General of Japan in Hong Kong',
              address: '46-47/F, One Exchange Square, 8 Connaught Place, Central, Hong Kong',
              phone: '+852 2522-1184',
              hours: '09:15 - 16:45 Mon-Fri',
            },
          ],
        },
      };
    }

    // B. Destination: France / Iceland / Europe (Schengen)
    if (destCountryLower.includes('france') || destCountryLower.includes('iceland') || destCountryLower.includes('italy') || destCountryLower.includes('germany')) {
      return {
        passportCountryFlag: '🇭🇰',
        passportTitle: 'Hong Kong (HKSAR Passport)',
        entryStatusSummary: 'Visa-Free (90 Days / 180 Days)',
        entryStatusSubtext: 'HKSAR Passport • 90-Day Schengen Exemption',
        specialNotice: {
          type: 'success',
          badge: 'Schengen Exemption',
          headline: '90-Day Visa-Free Exemption Across 29 Schengen Countries',
          details: 'HKSAR passport holders can travel freely within the 29 Schengen countries for up to 90 days in any 180-day period without a visa. (Note: The European Travel Information and Authorisation System ETIAS will require simple online pre-clearance once implemented).',
          highlights: [
            '90 days in any rolling 180-day window throughout Schengen Area',
            'No visa appointments or consular lodgements needed',
            'Passport must be valid for at least 3 months past the intended departure date',
            'Valid travel medical insurance strongly recommended for emergency coverage',
          ],
        },
        visa: {
          status: 'Visa-Free',
          durationDays: 90,
          entryType: 'Multiple Entry (90/180 Days Rule)',
          summaryTitle: 'Schengen Visa-Free Exemption Active',
          summarySubtitle: 'HKSAR Passport Holder • European Union Visa Waiver',
          validityRequirement: 'Valid for at least 3 months after departure date from Schengen zone',
          biometricRequirement: 'Standard border entry stamp and passport chip inspection',
          processingTimeStdHours: 0,
          processingTimeExpHours: 0,
          standardFeeUsd: 0,
          officialPortalUrl: 'https://travel-europe.europa.eu/etias_en',
          portalHost: 'travel-europe.europa.eu',
          applicationDeadlines: [
            { label: 'Passport Validity', dateStr: '3+ Months Remaining', status: 'passed' },
            { label: 'Border Arrival', dateStr: departureDateStr, status: 'limit' },
            { label: '90-Day Window Exit', dateStr: returnDateStr, status: 'exit' },
          ],
          dossierItems: [
            { id: 'hk_eu_1', title: 'HKSAR Biometric Passport', requirement: 'Issued within the last 10 years, valid for 3+ months post-departure.', checked: true },
            { id: 'hk_eu_2', title: 'Return Flight Confirmation', requirement: 'Confirmed booking returning to Hong Kong or departing Europe within 90 days.', checked: true },
            { id: 'hk_eu_3', title: 'Travel Health Insurance Cover', requirement: 'Emergency medical coverage recommended.', checked: true },
          ],
          faqs: [
            {
              question: 'Do Hong Kong citizens need a Schengen visa for France or Iceland?',
              answer: 'No. HKSAR passport holders do not need a Schengen visa for short stays up to 90 days in any 180-day period.',
            },
            {
              question: 'What is the 90/180-day Schengen rule for Hong Kong travelers?',
              answer: 'You can stay a maximum of 90 days within any rolling 180-day period. Once you hit 90 days, you must exit Schengen for 90 days before returning.',
            },
          ],
          embassies: [
            {
              name: 'Consulate General of France in Hong Kong & Macau',
              address: '25/F & 26/F, Tower II, Admiralty Centre, 18 Harcourt Road, Hong Kong',
              phone: '+852 3752-9900',
              hours: '08:30 - 17:30 Mon-Fri',
            },
          ],
        },
      };
    }

    // C. Destination: Australia
    if (destCountryLower.includes('australia')) {
      return {
        passportCountryFlag: '🇭🇰',
        passportTitle: 'Hong Kong (HKSAR Passport)',
        entryStatusSummary: 'ETA (Subclass 601) Mobile App Eligible',
        entryStatusSubtext: 'HKSAR Passport • Australian ETA Smartphone App Fast-Track',
        specialNotice: {
          type: 'success',
          badge: 'Smartphone App Eligible',
          headline: 'Eligible for Fast Australian ETA Mobile App (Subclass 601)',
          details: 'HKSAR passport holders are among the privileged nationalities eligible to apply directly for the Electronic Travel Authority (Subclass 601) using the Australian ETA smartphone app with near-instant approvals.',
          highlights: [
            'Direct mobile application via the official "Australian ETA" app (iOS / Android)',
            'Scan your HKSAR passport NFC chip and complete live liveness selfie on phone',
            'Fee is only AUD $20 (~$13 USD) app processing fee; no visa application charge',
            'Grants 12-month multiple entries with up to 3 months per visit',
          ],
        },
        visa: {
          status: 'ETA / e-Visa',
          durationDays: 90,
          entryType: '12-Month Multiple Entry',
          summaryTitle: 'Australian ETA (Subclass 601) Fast-Track Eligible',
          summarySubtitle: 'HKSAR Passport Holder • Smartphone App NFC Verification',
          validityRequirement: 'HKSAR passport must be valid for at least 6 months with readable biometric chip',
          biometricRequirement: 'Facial liveness scan and passport NFC chip contact verified in mobile app',
          processingTimeStdHours: 24,
          processingTimeExpHours: 1,
          standardFeeUsd: 13,
          officialPortalUrl: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601',
          portalHost: 'immi.homeaffairs.gov.au',
          applicationDeadlines: [
            { label: 'Download ETA App', dateStr: 'Apple Store / Play Store', status: 'passed' },
            { label: 'Scan Chip & Face', dateStr: '3 Days Prior', status: 'recommended' },
            { label: 'ETA Linked to Passport', dateStr: 'Instant / 24h', status: 'limit' },
            { label: 'Board Flight', dateStr: departureDateStr, status: 'exit' },
          ],
          dossierItems: [
            { id: 'hk_au_1', title: 'HKSAR Biometric Passport with NFC Chip', requirement: 'Original passport with NFC capability enabled.', checked: true },
            { id: 'hk_au_2', title: 'Australian ETA Smartphone App', requirement: 'Application completed and approved on phone.', checked: true },
            { id: 'hk_au_3', title: 'Confirmed Onward Travel Booking', requirement: 'Return flight confirmation out of Australia.', checked: true },
          ],
          faqs: [
            {
              question: 'How do Hong Kong passport holders apply for an Australian ETA?',
              answer: 'Download the official "Australian ETA" app from the App Store or Google Play. Follow the instructions to scan your passport biodata, hold your phone against the passport cover to read the NFC chip, take a selfie, and pay the AUD $20 service fee.',
            },
            {
              question: 'How long does Australian ETA approval take for HKSAR passports?',
              answer: 'Most applications receive electronic grant confirmation within a few minutes to 24 hours.',
            },
          ],
          embassies: [
            {
              name: 'Australian Consulate-General Hong Kong',
              address: '23/F, Harbour Centre, 25 Harbour Road, Wan Chai, Hong Kong',
              phone: '+852 2827-8881',
              hours: '09:00 - 17:00 Mon-Fri',
            },
          ],
        },
      };
    }

    // D. Destination: Malaysia
    if (destCountryLower.includes('malaysia')) {
      return {
        passportCountryFlag: '🇭🇰',
        passportTitle: 'Hong Kong (HKSAR Passport)',
        entryStatusSummary: 'Visa-Free (90 Days)',
        entryStatusSubtext: 'HKSAR Passport • 90-Day Social Visit Clearance',
        specialNotice: {
          type: 'success',
          badge: '90-Day Exemption',
          headline: '90-Day Visa-Free Access to Malaysia',
          details: 'HKSAR passport holders enjoy up to 90 days of visa-free stay in Malaysia for tourism and social visits. You only need to register the digital arrival card (MDAC) online before arriving.',
          highlights: [
            'Generous 90-day visa-free stay across peninsular and East Malaysia',
            'Submit Malaysia Digital Arrival Card (MDAC) online within 3 days of arrival',
            'Eligible for KLIA automated autogate lanes on subsequent trips',
          ],
        },
        visa: {
          status: 'Visa-Free',
          durationDays: 90,
          entryType: 'Multiple Entry',
          summaryTitle: '90-Day Visa-Free Entry to Malaysia',
          summarySubtitle: 'HKSAR Passport Holder • Malaysia Consular Exemption',
          validityRequirement: 'HKSAR passport valid for at least 6 months beyond arrival date',
          biometricRequirement: 'Immigration digital photo and fingerprint scan at entry counter',
          processingTimeStdHours: 0,
          processingTimeExpHours: 0,
          standardFeeUsd: 0,
          officialPortalUrl: 'https://imigresen-online.imi.gov.my/mdac/main',
          portalHost: 'imigresen-online.imi.gov.my',
          applicationDeadlines: [
            { label: 'MDAC Registration', dateStr: 'Within 3 Days Prior', status: 'recommended' },
            { label: 'Arrival in Malaysia', dateStr: departureDateStr, status: 'limit' },
            { label: '90-Day Period Exit', dateStr: returnDateStr, status: 'exit' },
          ],
          dossierItems: [
            { id: 'hk_my_1', title: 'HKSAR Passport', requirement: 'Original with at least 6 months validity.', checked: true },
            { id: 'hk_my_2', title: 'MDAC Digital Submission Proof', requirement: 'Online confirmation barcode / PDF.', checked: true },
            { id: 'hk_my_3', title: 'Return Flight to HK or Onward Hub', requirement: 'Confirmed return ticket within 90 days.', checked: true },
          ],
          faqs: [
            {
              question: 'How long can Hong Kong citizens stay in Malaysia visa-free?',
              answer: 'Up to 90 consecutive days for tourism and social visits.',
            },
            {
              question: 'Do Hong Kong citizens need to fill in MDAC?',
              answer: 'Yes, all foreign travelers including HKSAR passport holders must submit the free MDAC online within 3 days prior to landing in Malaysia.',
            },
          ],
          embassies: [
            {
              name: 'Consulate General of Malaysia in Hong Kong',
              address: '24/F, Malaysia Building, 50 Gloucester Road, Wan Chai, Hong Kong',
              phone: '+852 2821-0800',
              hours: '09:00 - 17:00 Mon-Fri',
            },
          ],
        },
      };
    }

    // E. Destination: Mainland China (Beijing, Shanghai, etc.)
    if (destCountryLower.includes('china') || destCountryLower.includes('beijing') || destCountryLower.includes('shanghai')) {
      return {
        passportCountryFlag: '🇭🇰',
        passportTitle: 'Hong Kong (HKSAR Permanent Resident)',
        entryStatusSummary: 'Home Return Permit (回乡证)',
        entryStatusSubtext: 'HK Permanent Resident • Unrestricted Border Clearance',
        specialNotice: {
          type: 'success',
          badge: 'Mainland Travel Permit',
          headline: 'Mainland Travel Permit for Hong Kong Residents (回乡证)',
          details: 'Hong Kong permanent residents of Chinese nationality enter Mainland China using the Mainland Travel Permit (港澳居民来往内地通行证 / 回乡证), allowing unlimited border crossings and travel without foreign visa restrictions.',
          highlights: [
            'Use Mainland Travel Permit (Home Return Permit / 回乡证) at all automated border control gates',
            'Full unrestricted domestic travel, rail ticketing (12306), and lodging across China',
            'Non-Chinese permanent residents in HK can apply for the 5-year multi-entry Card for Foreigners',
          ],
        },
        visa: {
          status: 'Visa-Free',
          durationDays: 365,
          entryType: 'Unlimited Multi-Entry',
          summaryTitle: 'Mainland Travel Permit Clearance Active',
          summarySubtitle: 'HK Permanent Resident • Electronic Smart Card Clearance',
          validityRequirement: 'Home Return Permit must be within valid 5-year (minors) or 10-year validity window',
          biometricRequirement: 'Integrated chip contact and biometric facial recognition at Chinese e-Gates',
          processingTimeStdHours: 0,
          processingTimeExpHours: 0,
          standardFeeUsd: 0,
          officialPortalUrl: 'https://www.nia.gov.cn/',
          portalHost: 'nia.gov.cn',
          applicationDeadlines: [
            { label: 'Check Permit Expiry', dateStr: 'CTS Hong Kong Renewal', status: 'passed' },
            { label: 'E-channel Tap', dateStr: departureDateStr, status: 'limit' },
          ],
          dossierItems: [
            { id: 'hk_cn_1', title: 'Mainland Travel Permit (回乡证)', requirement: 'Physical card within 10-year validity.', checked: true },
            { id: 'hk_cn_2', title: 'Hong Kong Permanent Identity Card', requirement: 'Smart HKID card.', checked: true },
          ],
          faqs: [
            {
              question: 'Do Hong Kong residents use the HKSAR passport to enter Mainland China?',
              answer: 'No. Hong Kong permanent residents of Chinese nationality use their Mainland Travel Permit for Hong Kong and Macao Residents (Home Return Permit / 回乡证) at immigration borders.',
            },
          ],
          embassies: [
            {
              name: 'Office of the Commissioner of MFA of PRC in HKSAR',
              address: '42 Kennedy Road, Central, Hong Kong',
              phone: '+852 2106-6303',
              hours: '09:00 - 17:00 Mon-Fri',
            },
          ],
        },
      };
    }
  }

  // 3. MALAYSIA (Pasport Malaysia / 🇲🇾)
  if (isMalaysiaPassport) {
    // A. Destination: China (Beijing, Shanghai, etc.)
    if (destCountryLower.includes('china') || destCountryLower.includes('beijing') || destCountryLower.includes('shanghai')) {
      return {
        passportCountryFlag: '🇲🇾',
        passportTitle: 'Malaysia (Pasport Antarabangsa Malaysia)',
        entryStatusSummary: 'Visa-Free (30 Days)',
        entryStatusSubtext: 'Malaysian Passport • 30-Day Mutual Exemption Active',
        specialNotice: {
          type: 'success',
          badge: 'Mutual Visa Exemption',
          headline: '30-Day Mutual Visa Exemption to China Active',
          details: 'Under the bilateral mutual visa-exemption policy between Malaysia and the People’s Republic of China, ordinary Malaysian passport holders enjoy up to 30 days of visa-free entry for tourism, business, transit, and visiting family.',
          highlights: [
            'Up to 30 days visa-free entry across all Chinese ports of entry',
            'No consular application or visa fees required prior to travel',
            'Fill out standard Foreigner Arrival Card on airplane or at border kiosk',
            'Passport must be valid for at least 6 months upon arrival',
          ],
        },
        visa: {
          status: 'Visa-Free',
          durationDays: 30,
          entryType: 'Multiple Entry',
          summaryTitle: '30-Day Bilateral Visa-Free Exemption to China Active',
          summarySubtitle: 'Malaysian Passport Holder • PRC National Immigration Administration Exemption',
          validityRequirement: 'Malaysian passport must have at least 6 months validity remaining',
          biometricRequirement: 'Ten-fingerprint biometric collection at arrival self-service kiosks before border inspection',
          processingTimeStdHours: 0,
          processingTimeExpHours: 0,
          standardFeeUsd: 0,
          officialPortalUrl: 'https://www.nia.gov.cn/',
          portalHost: 'nia.gov.cn',
          applicationDeadlines: [
            { label: 'Validity Check', dateStr: 'Passport 6+ Mos', status: 'passed' },
            { label: 'Foreigner Arrival Card', dateStr: 'On Plane / Kiosk', status: 'recommended' },
            { label: 'Chinese Border Clearance', dateStr: departureDateStr, status: 'limit' },
            { label: 'Max 30-Day Exit', dateStr: returnDateStr, status: 'exit' },
          ],
          dossierItems: [
            { id: 'my_cn_1', title: 'Malaysian Passport (Pasport Malaysia)', requirement: 'Original with minimum 6 months remaining validity.', checked: true },
            { id: 'my_cn_2', title: 'Foreigner Arrival Card (外国人入境卡)', requirement: 'Completed card available on flight or at airport terminal arrival halls.', checked: true },
            { id: 'my_cn_3', title: 'Confirmed Return / Onward Flight', requirement: 'Confirmed exit airfare departing China within 30 days.', checked: true },
            { id: 'my_cn_4', title: 'Hotel Booking or Host Address in China', requirement: 'Lodging address proof in Beijing, Shanghai, or host invitation.', checked: true },
          ],
          faqs: [
            {
              question: 'Can Malaysian citizens visit China without a visa?',
              answer: 'Yes! Under the mutual visa-exemption agreement between Malaysia and China, holders of Malaysian ordinary passports can enter China visa-free for stays up to 30 days for tourism, business, transit, and family visits.',
            },
            {
              question: 'Can the 30-day visa-free stay be extended inside China?',
              answer: 'No. The 30-day exemption cannot be extended except in certified humanitarian emergencies. If you intend to stay longer than 30 days, you must apply for an L (tourist) or M (business) visa at the Chinese Visa Application Service Center in Kuala Lumpur before traveling.',
            },
            {
              question: 'Do Malaysians need to provide fingerprints upon arriving in China?',
              answer: 'Yes. Travelers aged 14 to 70 must scan their fingerprints at the automated biometric collection kiosks before queueing for the immigration officer.',
            },
          ],
          embassies: [
            {
              name: 'Embassy of the People’s Republic of China in Malaysia',
              address: '229, Jalan Ampang, 50450 Kuala Lumpur, Malaysia',
              phone: '+60 3-2164-5301',
              hours: '09:00 - 17:00 Mon-Fri',
            },
            {
              name: 'Chinese Visa Application Service Centre Kuala Lumpur',
              address: 'Level 5 & 6, Hampshire Place Office, 157 Jalan Hampshire, KL',
              phone: '+60 3-2176-0888',
              hours: '09:00 - 15:00 Mon-Fri',
            },
          ],
        },
      };
    }

    // B. Destination: Japan
    if (destCountryLower.includes('japan')) {
      return {
        passportCountryFlag: '🇲🇾',
        passportTitle: 'Malaysia (Pasport Antarabangsa Malaysia)',
        entryStatusSummary: 'Visa-Free (90 Days)',
        entryStatusSubtext: 'Malaysian ICAO Biometric Passport • 90-Day Visa Exemption',
        specialNotice: {
          type: 'success',
          badge: 'Biometric Exemption Active',
          headline: '90-Day Visa-Free Access to Japan with Biometric Passport',
          details: 'Holders of Malaysian passports with an embedded ICAO biometric chip (the standard microchip icon on the bottom of the front cover) enjoy 90 days of visa-free entry for tourism and business in Japan.',
          highlights: [
            '90 days visa-free entry with Malaysian ICAO chip biometric passport',
            'Pre-register on Visit Japan Web to receive fast-track immigration & customs QR',
            'Zero visa fees and no consular appointment required',
          ],
        },
        visa: {
          status: 'Visa-Free',
          durationDays: 90,
          entryType: 'Multiple Entry',
          summaryTitle: '90-Day Visa-Free Consular Exemption Active',
          summarySubtitle: 'Malaysian Biometric Passport Holder • Japan MoFA Waiver',
          validityRequirement: 'Malaysian biometric passport valid for intended duration of stay',
          biometricRequirement: 'Standard digital photograph and finger touch scan at airport gate',
          processingTimeStdHours: 0,
          processingTimeExpHours: 0,
          standardFeeUsd: 0,
          officialPortalUrl: 'https://vjw-lp.digital.go.jp/en/',
          portalHost: 'vjw-lp.digital.go.jp',
          applicationDeadlines: [
            { label: 'Visit Japan Web', dateStr: 'Pre-register QR', status: 'passed' },
            { label: 'Airport Landing', dateStr: departureDateStr, status: 'limit' },
            { label: '90-Day Max Stay', dateStr: returnDateStr, status: 'exit' },
          ],
          dossierItems: [
            { id: 'my_jp_1', title: 'Malaysian ICAO Biometric Passport', requirement: 'Passport with embedded chip icon on cover.', checked: true },
            { id: 'my_jp_2', title: 'Visit Japan Web QR Code', requirement: 'Digital customs and immigration declaration QR on phone.', checked: true },
            { id: 'my_jp_3', title: 'Return Ticket Booking to Malaysia', requirement: 'Flight confirmation within 90 days.', checked: true },
          ],
          faqs: [
            {
              question: 'Do Malaysians need a visa to visit Japan?',
              answer: 'No! Malaysian citizens holding biometric passports that comply with ICAO standards do not require a visa for tourist stays up to 90 days.',
            },
            {
              question: 'What if my Malaysian passport does not have a biometric chip?',
              answer: 'All modern Malaysian passports issued since 1998 feature biometric chips. Non-biometric emergency temporary travel documents require an advance visa.',
            },
          ],
          embassies: [
            {
              name: 'Embassy of Japan in Malaysia',
              address: 'No. 11, Persiaran Stonor, Off Jalan Tun Razak, 50450 Kuala Lumpur',
              phone: '+60 3-2177-2600',
              hours: '08:30 - 16:30 Mon-Fri',
            },
          ],
        },
      };
    }

    // C. Destination: France / Iceland / Europe (Schengen)
    if (destCountryLower.includes('france') || destCountryLower.includes('iceland') || destCountryLower.includes('italy') || destCountryLower.includes('germany')) {
      return {
        passportCountryFlag: '🇲🇾',
        passportTitle: 'Malaysia (Pasport Antarabangsa Malaysia)',
        entryStatusSummary: 'Visa-Free (90 Days / 180 Days)',
        entryStatusSubtext: 'Malaysian Passport • 90-Day Schengen Exemption',
        specialNotice: {
          type: 'success',
          badge: 'Schengen Exemption',
          headline: '90-Day Visa-Free Access Across 29 Schengen Countries',
          details: 'Malaysian passport holders are exempt from Schengen visa requirements for stays up to 90 days within any 180-day window across France, Iceland, Italy, Germany, and all 29 member states.',
          highlights: [
            'Visa-free tourism stay up to 90 days in any 180-day period',
            'No visa fees, no embassy appointments, no advance paperwork',
            'Passport must have at least 3 months validity beyond the date you intend to leave Europe',
          ],
        },
        visa: {
          status: 'Visa-Free',
          durationDays: 90,
          entryType: 'Multiple Entry (90/180 Rule)',
          summaryTitle: 'Schengen Visa-Free Consular Exemption',
          summarySubtitle: 'Malaysian Passport Holder • European Union Waiver',
          validityRequirement: 'Valid for at least 3 months past the intended departure date from Schengen',
          biometricRequirement: 'Standard passport chip scan at European airport border control',
          processingTimeStdHours: 0,
          processingTimeExpHours: 0,
          standardFeeUsd: 0,
          officialPortalUrl: 'https://travel-europe.europa.eu/etias_en',
          portalHost: 'travel-europe.europa.eu',
          applicationDeadlines: [
            { label: 'Validity Check', dateStr: '3+ Months Past Exit', status: 'passed' },
            { label: 'Border Arrival', dateStr: departureDateStr, status: 'limit' },
            { label: '90-Day Window Exit', dateStr: returnDateStr, status: 'exit' },
          ],
          dossierItems: [
            { id: 'my_eu_1', title: 'Malaysian Biometric Passport', requirement: 'Issued within last 10 years, 3+ months valid post-departure.', checked: true },
            { id: 'my_eu_2', title: 'Return Flight Ticket to Malaysia', requirement: 'Confirmed return booking within 90 days.', checked: true },
            { id: 'my_eu_3', title: 'Comprehensive Travel Insurance', requirement: 'Recommended emergency healthcare coverage.', checked: true },
          ],
          faqs: [
            {
              question: 'Do Malaysians need a visa to travel to France or Iceland?',
              answer: 'No. Malaysian citizens enjoy visa-free entry to all Schengen Area countries for up to 90 days in any 180-day period.',
            },
          ],
          embassies: [
            {
              name: 'Embassy of France in Malaysia',
              address: 'Level 31, Integra Tower, The Intermark, 348 Jalan Tun Razak, KL',
              phone: '+60 3-2053-5500',
              hours: '08:30 - 17:00 Mon-Fri',
            },
          ],
        },
      };
    }

    // D. Destination: Australia
    if (destCountryLower.includes('australia')) {
      return {
        passportCountryFlag: '🇲🇾',
        passportTitle: 'Malaysia (Pasport Antarabangsa Malaysia)',
        entryStatusSummary: 'ETA (Subclass 601) Smartphone App Eligible',
        entryStatusSubtext: 'Malaysian Passport • Australian ETA Smartphone App Fast-Track',
        specialNotice: {
          type: 'success',
          badge: 'Smartphone App Eligible',
          headline: 'Eligible for Fast Australian ETA Mobile App (Subclass 601)',
          details: 'Malaysian passport holders are eligible to apply directly for an Electronic Travel Authority (Subclass 601) via the official Australian ETA smartphone app on iOS and Android.',
          highlights: [
            'Direct mobile application using the "Australian ETA" app',
            'NFC chip scan of your Malaysian passport and live facial selfie on phone',
            'Processing fee of AUD $20 (~$13 USD)',
            '12-month multiple-entry authorization allowing up to 3 months stay per visit',
          ],
        },
        visa: {
          status: 'ETA / e-Visa',
          durationDays: 90,
          entryType: '12-Month Multiple Entry',
          summaryTitle: 'Australian ETA (Subclass 601) Mobile Fast-Track',
          summarySubtitle: 'Malaysian Passport Holder • Smartphone App NFC Verification',
          validityRequirement: 'Malaysian passport with valid chip, recommended 6+ months validity',
          biometricRequirement: 'Facial liveness scan and chip verification directly in ETA smartphone app',
          processingTimeStdHours: 24,
          processingTimeExpHours: 1,
          standardFeeUsd: 13,
          officialPortalUrl: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601',
          portalHost: 'immi.homeaffairs.gov.au',
          applicationDeadlines: [
            { label: 'Download ETA App', dateStr: 'Mobile App Store', status: 'passed' },
            { label: 'Scan Chip & Face', dateStr: '3 Days Prior', status: 'recommended' },
            { label: 'Grant Confirmation', dateStr: 'Instant / 24h', status: 'limit' },
            { label: 'Board Flight', dateStr: departureDateStr, status: 'exit' },
          ],
          dossierItems: [
            { id: 'my_au_1', title: 'Malaysian Biometric Passport', requirement: 'Original with readable NFC chip.', checked: true },
            { id: 'my_au_2', title: 'Australian ETA Mobile App Grant', requirement: 'Approved digital grant linked to passport.', checked: true },
            { id: 'my_au_3', title: 'Return Airfare to Malaysia', requirement: 'Confirmed return flight proof within 3 months.', checked: true },
          ],
          faqs: [
            {
              question: 'How do Malaysians apply for an Australian travel visa?',
              answer: 'Malaysian citizens must apply via the official "Australian ETA" app available on iOS and Android. You simply scan your passport and face with your phone camera, pay the AUD $20 app fee, and receive approval electronically.',
            },
          ],
          embassies: [
            {
              name: 'Australian High Commission Kuala Lumpur',
              address: '6 Jalan Yap Kwan Seng, 50450 Kuala Lumpur',
              phone: '+60 3-2146-5555',
              hours: '08:30 - 17:00 Mon-Fri',
            },
          ],
        },
      };
    }

    // E. Destination: Hong Kong SAR
    if (destCountryLower.includes('hong kong')) {
      return {
        passportCountryFlag: '🇲🇾',
        passportTitle: 'Malaysia (Pasport Antarabangsa Malaysia)',
        entryStatusSummary: 'Visa-Free (90 Days)',
        entryStatusSubtext: 'Malaysian Passport • 90-Day Tourist Exemption',
        specialNotice: {
          type: 'success',
          badge: '90-Day Exemption',
          headline: '90-Day Visa-Free Access to Hong Kong',
          details: 'Malaysian passport holders are granted 90 days of visa-free entry into Hong Kong SAR for tourism and social visits.',
          highlights: [
            '90 days visa-free entry into Hong Kong',
            'No visa fees or consular applications required',
            'Automated e-Channel gates available to frequent visitors',
          ],
        },
        visa: {
          status: 'Visa-Free',
          durationDays: 90,
          entryType: 'Multiple Entry',
          summaryTitle: '90-Day Visa-Free Clearance to Hong Kong',
          summarySubtitle: 'Malaysian Passport Holder • HK Immigration Exemption',
          validityRequirement: 'Malaysian passport valid for at least 1 month beyond stay',
          biometricRequirement: 'Standard arrival slip issued at Hong Kong border control',
          processingTimeStdHours: 0,
          processingTimeExpHours: 0,
          standardFeeUsd: 0,
          officialPortalUrl: 'https://www.immd.gov.hk/eng/services/visas/visit-transit/visit-visa-entry-permit.html',
          portalHost: 'immd.gov.hk',
          applicationDeadlines: [
            { label: 'Check Passport', dateStr: 'Valid for Trip', status: 'passed' },
            { label: 'Arrival Gate', dateStr: departureDateStr, status: 'limit' },
            { label: '90-Day Exit', dateStr: returnDateStr, status: 'exit' },
          ],
          dossierItems: [
            { id: 'my_hk_1', title: 'Malaysian Passport', requirement: 'Original valid passport.', checked: true },
            { id: 'my_hk_2', title: 'Return Flight to Malaysia', requirement: 'Confirmed return booking.', checked: true },
          ],
          faqs: [
            {
              question: 'Do Malaysians need a visa to visit Hong Kong?',
              answer: 'No. Malaysian citizens enjoy 90 days of visa-free entry to Hong Kong SAR for tourism and social visits.',
            },
          ],
          embassies: [
            {
              name: 'Consulate General of Malaysia in Hong Kong',
              address: '24/F, Malaysia Building, 50 Gloucester Road, Wan Chai, Hong Kong',
              phone: '+852 2821-0800',
              hours: '09:00 - 17:00 Mon-Fri',
            },
          ],
        },
      };
    }
  }

  // 4. Default / General Passports (United States, UK, Australia, EU, etc.)
  const isUS = normPassport.includes('united states') || normPassport.includes('usa') || normPassport.includes('american');
  const flag = isUS ? '🇺🇸' : normPassport.includes('kingdom') || normPassport.includes('uk') || normPassport.includes('british') ? '🇬🇧' : normPassport.includes('australia') ? '🇦🇺' : normPassport.includes('singapore') ? '🇸🇬' : '🌐';
  const isJapan = destCountryLower.includes('japan');
  const isSchengen = destCountryLower.includes('france') || destCountryLower.includes('iceland') || destCountryLower.includes('italy');
  const isAustralia = destCountryLower.includes('australia');

  return {
    passportCountryFlag: flag,
    passportTitle: `${passportNationality} Passport`,
    entryStatusSummary: isAustralia && !normPassport.includes('australia') ? 'ETA (Subclass 601) Pre-Clearance' : 'Visa-Free (90 Days)',
    entryStatusSubtext: `${passportNationality} Citizen • Clear To Travel`,
    visa: {
      status: isAustralia && !normPassport.includes('australia') ? 'ETA / e-Visa' : 'Visa-Free',
      durationDays: 90,
      entryType: 'Multiple Entry',
      summaryTitle: isAustralia && !normPassport.includes('australia') ? 'Electronic Travel Authority (ETA) Required' : 'Consular Clearance • Visa Exempt',
      summarySubtitle: `${passportNationality} Passport Holder • Tourism Status`,
      validityRequirement: 'Passport must be valid for at least 6 months beyond intended stay',
      biometricRequirement: 'Standard digital biometric photo recorded at arrival gate',
      processingTimeStdHours: isAustralia ? 24 : 0,
      processingTimeExpHours: isAustralia ? 1 : 0,
      standardFeeUsd: isAustralia ? 13 : 0,
      officialPortalUrl: isJapan ? 'https://vjw-lp.digital.go.jp/en/' : isAustralia ? 'https://immi.homeaffairs.gov.au/' : 'https://travel-europe.europa.eu/etias_en',
      portalHost: isJapan ? 'vjw-lp.digital.go.jp' : isAustralia ? 'immi.homeaffairs.gov.au' : 'travel-europe.europa.eu',
      applicationDeadlines: [
        { label: 'Today', dateStr: 'Document Pre-check', status: 'passed' },
        { label: 'Portal Verification', dateStr: '7 Days Prior', status: 'recommended' },
        { label: 'Flight Check-in', dateStr: departureDateStr, status: 'limit' },
        { label: 'Terminal Exit', dateStr: returnDateStr, status: 'exit' },
      ],
      dossierItems: [
        { id: 'v1', title: 'Passport Minimum Validity', requirement: `${passportNationality} passport valid for duration of travel.`, checked: true },
        { id: 'v2', title: 'Confirmed Return / Onward Transit', requirement: 'Proof of exit ticket within authorized duration.', checked: true },
        { id: 'v3', title: 'Accommodation Registration', requirement: `Registered lodging address in ${destinationCity}.`, checked: false },
        { id: 'v4', title: 'Health & Medical Travel Cover', requirement: 'Recommended comprehensive emergency medical coverage.', checked: true },
      ],
      faqs: [
        {
          question: `Do ${passportNationality} passport holders need a visa for ${destinationCountry}?`,
          answer: isAustralia && !normPassport.includes('australia')
            ? `Travelers must obtain an official Electronic Travel Authority (ETA) via the mobile app before boarding flights to Australia.`
            : `No. Citizens with ${passportNationality} passports can enter ${destinationCountry} visa-free for tourism stays up to 90 days.`,
        },
      ],
      embassies: [
        {
          name: `Embassy of ${destinationCountry} Consular Section`,
          address: `100 Diplomatic Avenue, Consular Quarter`,
          phone: '+1 (202) 555-0199',
          hours: '09:00 - 16:30 Mon-Fri',
        },
      ],
    },
  };
}
function generateSeasonalPackingList(season: Season, city: string, tempC: number): PackingItem[] {
  if (season === 'summer') {
    return [
      { id: 's_p1', name: 'UV400 Polarized Sunglasses & Hat', category: 'outerwear', tag: 'Solar Defense', badge: 'Essential', packed: false, essential: true },
      { id: 's_p2', name: 'Breathable Pure Linen Shirts (x3)', category: 'outerwear', tag: 'High Ventilation', badge: '3 Sets', packed: false, essential: true },
      { id: 's_p3', name: 'Reef-Safe Mineral Sunscreen SPF 50+', category: 'essentials', tag: 'UV Shield', badge: 'Essential', packed: true, essential: true },
      { id: 's_p4', name: 'Lightweight Breathable Walking Runners', category: 'essentials', tag: 'City Pavements', badge: 'Comfort', packed: true, essential: true },
      { id: 's_p5', name: 'Electrolyte Hydration Replenishment Tablets', category: 'essentials', tag: 'Thermal Guard', badge: 'Hydration', packed: false, essential: false },
      { id: 's_p6', name: 'Quick-Dry Swimwear & Beach Microfiber Towel', category: 'outerwear', tag: 'Waterfront Leisure', badge: 'Swim', packed: false, essential: false },
      { id: 's_p7', name: 'High-Capacity Fast-Charge Power Bank (20,000mAh)', category: 'tech-gear', tag: 'Navigation Power', badge: 'Essential', packed: true, essential: true },
      { id: 's_p8', name: 'Ultra-Compact USB Rechargeable Mist Fan', category: 'tech-gear', tag: 'Thermal Relief', badge: 'Pocket', packed: false, essential: false },
    ];
  }

  if (season === 'autumn') {
    return [
      { id: 'a_p1', name: 'Packable Weatherproof Trench Coat', category: 'outerwear', tag: 'Wind & Sleet Armor', badge: 'Essential', packed: false, essential: true },
      { id: 'a_p2', name: 'Merino Wool Base Layer (200g)', category: 'outerwear', tag: 'Thermal Equilibrium', badge: 'Breathable', packed: true, essential: true },
      { id: 'a_p3', name: 'Light Cashmere Knit Mid-Layer Sweater', category: 'outerwear', tag: 'Evening Loft', badge: 'Warmth', packed: false, essential: true },
      { id: 'a_p4', name: 'Water-Resistant Slip-on Walking Shoes', category: 'essentials', tag: 'Wet Pavement Grip', badge: 'Essential', packed: true, essential: true },
      { id: 'a_p5', name: 'Windproof Compact Travel Umbrella', category: 'essentials', tag: 'Rain Defense', badge: 'Daily', packed: true, essential: true },
      { id: 'a_p6', name: 'Moisturizing Lip Balm & Hand Protection Cream', category: 'essentials', tag: 'Wind Guard', badge: 'Skincare', packed: false, essential: false },
      { id: 'a_p7', name: 'Universal Travel Power Adapter with Type-C Fast Hub', category: 'tech-gear', tag: 'Corridor Power', badge: 'Essential', packed: true, essential: true },
      { id: 'a_p8', name: 'High-Speed Local eSIM Profile / Pocket Router', category: 'tech-gear', tag: 'Connectivity', badge: '5G Active', packed: true, essential: true },
    ];
  }

  if (season === 'winter') {
    return [
      { id: 'w_p1', name: '800-Fill Hydrophobic Down Expedition Parka', category: 'outerwear', tag: 'Sub-Zero Loft', badge: 'Essential', packed: false, essential: true },
      { id: 'w_p2', name: 'Heavyweight Merino Wool Thermal Base Layer (260g)', category: 'outerwear', tag: 'Moisture Wicking', badge: 'Base Armor', packed: true, essential: true },
      { id: 'w_p3', name: 'GORE-TEX 28,000mm Waterproof Technical Hardshell', category: 'outerwear', tag: 'Storm Barrier', badge: 'Shell 3', packed: false, essential: true },
      { id: 'w_p4', name: 'Insulated Vibram Winter Boots (Waterproof)', category: 'essentials', tag: 'Ice & Slush Grip', badge: 'Essential', packed: true, essential: true },
      { id: 'w_p5', name: 'Touchscreen Thermal Gloves & Windproof Beanie', category: 'essentials', tag: 'Extremity Defense', badge: 'Essential', packed: true, essential: true },
      { id: 'w_p6', name: 'Air-Activated Hand & Foot Thermal Warmers (x6)', category: 'essentials', tag: 'Instant Heat', badge: 'Daily', packed: false, essential: false },
      { id: 'w_p7', name: 'Cold-Weather Insulated Battery Pouch for Electronics', category: 'tech-gear', tag: 'Preserve Cell Charge', badge: 'Lithium Guard', packed: true, essential: true },
      { id: 'w_p8', name: 'Compact Micro-Spikes / Ice Cleats for Boot Soles', category: 'tech-gear', tag: 'Glacier & Slick Basalt', badge: 'Safety', packed: false, essential: false },
    ];
  }

  // Spring
  return [
    { id: 'sp_p1', name: 'Light Windbreaker / Packable Rain Shell', category: 'outerwear', tag: 'Breeze Barrier', badge: 'Essential', packed: false, essential: true },
    { id: 'sp_p2', name: 'Cotton-Linen Breathable Layering Cardigan', category: 'outerwear', tag: 'Mild Afternoon', badge: 'Versatile', packed: true, essential: true },
    { id: 'sp_p3', name: 'Comfortable Daybreak Walking Sneakers', category: 'essentials', tag: 'Park & Garden Walks', badge: 'Essential', packed: true, essential: true },
    { id: 'sp_p4', name: 'Anti-Pollen Barrier Nasal Spray / Light Mask', category: 'essentials', tag: 'Hanami Defense', badge: 'Health', packed: false, essential: false },
    { id: 'sp_p5', name: 'Compact Picnic Blanket & Travel Umbrella', category: 'essentials', tag: 'Outdoor Gatherings', badge: 'Parks', packed: true, essential: false },
    { id: 'sp_p6', name: 'High-Res Optical Lens / Mirrorless Camera Pack', category: 'tech-gear', tag: 'Blossom Photography', badge: 'Visuals', packed: false, essential: false },
    { id: 'sp_p7', name: 'High-Capacity Power Bank & Fast Charging Cord', category: 'tech-gear', tag: 'All-Day Touring', badge: 'Essential', packed: true, essential: true },
    { id: 'sp_p8', name: 'Dual Currency Card / Local Cash Stash', category: 'essentials', tag: 'Market Stalls', badge: 'Daily', packed: true, essential: true },
  ];
}

// Generate 7-day microclimate forecast matching the season
function generateSeasonalForecast(season: Season, baseTempC: number, startDateStr: string): WeatherDay[] {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const seasonIcons: Record<Season, { icons: string[]; conditions: string[]; tempOffsets: number[] }> = {
    summer: {
      icons: ['wb_sunny', 'sunny', 'partly_cloudy_day', 'wb_sunny', 'wb_sunny', 'thunderstorm', 'wb_sunny'],
      conditions: ['Radiant Sun', 'Clear Blue Sky', 'Warm Scattered Clouds', 'High Sun', 'Golden Afternoon', 'Brief Summer Shower', 'Pure Sunshine'],
      tempOffsets: [0, 1, 2, 1, 3, -1, 2],
    },
    autumn: {
      icons: ['wb_sunny', 'partly_cloudy_day', 'air', 'rainy', 'wb_sunny', 'cloud', 'nature'],
      conditions: ['Crisp Sun', 'Partly Cloudy', 'Brisk Autumn Wind', 'Light Showers', 'Amber Afternoon', 'Overcast', 'Optimal Foliage'],
      tempOffsets: [0, 1, -1, -2, 0, -1, 1],
    },
    winter: {
      icons: ['ac_unit', 'cloud', 'weather_snowy', 'ac_unit', 'wb_twilight', 'severe_cold', 'ac_unit'],
      conditions: ['Frost & Ice', 'Low Cloud Cover', 'Light Snow Dusting', 'Crisp Cold Sky', 'Short Twilight Arc', 'Sub-Zero Freeze', 'Glacial Clarity'],
      tempOffsets: [0, -1, -2, -3, -1, -2, 0],
    },
    spring: {
      icons: ['wb_sunny', 'local_florist', 'partly_cloudy_day', 'rainy', 'wb_sunny', 'sunny', 'air'],
      conditions: ['Mild Spring Sun', 'Blossom Breeze', 'Light High Clouds', 'Gentle Floral Rain', 'Fresh Morning', 'Warm Spring Day', 'Gentle Breeze'],
      tempOffsets: [0, 1, 0, -2, 1, 2, 1],
    },
  };

  const config = seasonIcons[season];

  return days.map((day, idx) => {
    const temp = Math.round(baseTempC + config.tempOffsets[idx]);
    return {
      day,
      date: `Day ${idx + 1}`,
      tempC: temp,
      minTempC: temp - 6,
      maxTempC: temp + 3,
      condition: config.conditions[idx],
      icon: config.icons[idx],
      rainChance: season === 'summer' ? 15 : season === 'autumn' ? 30 : season === 'winter' ? 40 : 25,
      windKmh: season === 'winter' ? 24 : season === 'autumn' ? 18 : 12,
      uvIndex: season === 'summer' ? 9 : season === 'spring' ? 6 : season === 'autumn' ? 4 : 2,
    };
  });
}

export async function lookupDestinationIntelligence(params: {
  location: string;
  startDate: string;
  endDate?: string;
  passportNationality?: string;
}): Promise<DestinationData> {
  const { location, startDate, endDate, passportNationality = 'United States' } = params;

  // First try backend API if available
  try {
    const res = await fetch('/api/lookup-destination', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.city && data.country) {
        return data as DestinationData;
      }
    }
  } catch (err) {
    // Graceful fallback to client-side synthesizer
    console.warn('API lookup returned error or unreachable, using local synthesizer:', err);
  }

  // Local synthesis:
  const query = location.toLowerCase();
  
  // Find matching preset or construct one
  let matchedKey = Object.keys(CITY_PRESETS).find(
    (k) => query.includes(k) || query.includes(CITY_PRESETS[k].city.toLowerCase()) || query.includes(CITY_PRESETS[k].country.toLowerCase())
  );

  let preset: CityPreset;

  if (matchedKey) {
    preset = CITY_PRESETS[matchedKey];
  } else {
    // Generate intelligent dynamic preset for any generic location
    const parts = location.split(',').map((p) => p.trim());
    const city = parts[0] || 'Destination City';
    const country = parts[1] || parts[0] || 'International';

    // Guess flag and hemisphere
    preset = {
      city,
      country,
      flag: '✈️',
      airport: `${city.substring(0, 3).toUpperCase()} Intl`,
      baseClimate: {
        summer: { tempC: 28, desc: 'Warm sunny summer days with high solar exposure', uv: 8, precip: 20, sun: '14h 30m', sunrise: '05:30', sunset: '20:00' },
        autumn: { tempC: 16, desc: 'Cool autumn breeze with crisp pleasant afternoons', uv: 4, precip: 25, sun: '11h 15m', sunrise: '06:30', sunset: '17:45' },
        winter: { tempC: 4, desc: 'Brisk cold winter window requiring layered thermal armor', uv: 2, precip: 30, sun: '8h 45m', sunrise: '07:45', sunset: '16:30' },
        spring: { tempC: 19, desc: 'Fresh blooming spring flora and comfortable walking climate', uv: 6, precip: 22, sun: '12h 45m', sunrise: '06:00', sunset: '18:45' },
      },
      transitPass: `${city} Metro & City Pass`,
      transitDesc: `Unified urban public transport corridor pass across all central zones.`,
      visaType: 'Visa-Free',
      visaDuration: 90,
      visaFee: 0,
      portalUrl: 'https://travel.state.gov',
      heroImages: {
        summer: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        autumn: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        winter: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1200&q=80',
        spring: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80',
      },
      events: {
        summer: [
          { id: 'gen_s1', title: `${city} Summer Solstice Promenade`, category: 'arts', categoryLabel: 'Open Air Event', dateStr: 'Summer Window', timeStr: '16:00 - 22:00', location: `Central Plaza, ${city}`, transitTimeMin: 12, crowdLevel: 'Moderate', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', description: `Open-air festival featuring artisan food stalls, acoustic music, and golden hour dining.` },
        ],
        autumn: [
          { id: 'gen_a1', title: `${city} Autumn Harvest & Wine Fair`, category: 'food', categoryLabel: 'Gastronomy', dateStr: 'Autumn Window', timeStr: '12:00 - 21:00', location: `Historic Quarter, ${city}`, transitTimeMin: 15, crowdLevel: 'Moderate', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', description: `Local culinary stalls celebrating regional autumn produce and vintage wines.` },
        ],
        winter: [
          { id: 'gen_w1', title: `${city} Grand Winter Illumination Market`, category: 'matsuri', categoryLabel: 'Winter Lights', dateStr: 'Winter Window', timeStr: '17:00 - 22:00', location: `Old Town Square, ${city}`, transitTimeMin: 10, crowdLevel: 'High', image: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=600&q=80', description: `Fairy lights, hot spiced drinks, and festive seasonal artisan stalls.` },
        ],
        spring: [
          { id: 'gen_sp1', title: `${city} Spring Blossom Carnival`, category: 'foliage', categoryLabel: 'Botanical Bloom', dateStr: 'Spring Window', timeStr: '10:00 - 18:00', location: `Botanical Promenade, ${city}`, transitTimeMin: 14, crowdLevel: 'Moderate', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80', description: `Celebration of blooming city gardens with outdoor floral exhibitions.` },
        ],
      },
    };
  }

  // Calculate dates and duration
  const startD = startDate ? new Date(startDate) : new Date();
  const endD = endDate ? new Date(endDate) : new Date(startD.getTime() + 14 * 86400000);
  const diffDays = Math.max(1, Math.round((endD.getTime() - startD.getTime()) / (1000 * 60 * 60 * 24)));
  
  const formattedDates = `${startD.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endD.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

  // Detect Season strictly matching destination country and dates!
  const detectedSeason = detectSeason(startDate || formattedDates, preset.country, preset.city);
  const climate = preset.baseClimate[detectedSeason];

  const seasonalPeakTitles: Record<Season, string> = {
    summer: 'High Summer Arc · Radiant Sun',
    autumn: 'Autumn Foliage & Harvest Window',
    winter: 'Winter Frost & Alpine Climes',
    spring: 'Spring Sakura & Meadow Awakening',
  };

  const seasonalPeakSubtexts: Record<Season, string> = {
    summer: 'Max solar hours & sunny warm outdoor exploration',
    autumn: 'Vibrant amber foliage & temperate crisp afternoons',
    winter: 'Crisp sub-zero clarity & illuminated winter nights',
    spring: 'Bursting floral blooms & mild comfortable conditions',
  };

  const id = `dest-${preset.city.toLowerCase().replace(/\s+/g, '-')}-${detectedSeason}`;

  const packingList = generateSeasonalPackingList(detectedSeason, preset.city, climate.tempC);
  const forecast7Days = generateSeasonalForecast(detectedSeason, climate.tempC, formattedDates);
  const events = preset.events[detectedSeason] || [];

  const consularIntelligence = getPassportConsularAdvisory(
    passportNationality,
    preset.country,
    preset.city,
    formattedDates
  );

  const visa = consularIntelligence.visa;

  return {
    id,
    city: preset.city,
    country: preset.country,
    countryFlag: preset.flag,
    airportCode: preset.airport,
    originCity: 'San Francisco',
    originAirport: 'SFO',
    travelDates: formattedDates,
    durationDays: diffDays,
    passportNationality,
    season: detectedSeason,
    heroImage: preset.heroImages[detectedSeason],
    regionalMapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJxHQJLmP5__hGXkA6xq0JQdG7u2quZDDhFYbfGupIhcsYIXMSWiNdaeMOsKpKl5DVahPgxLcibbegdxDFun9EKNJGMn6Ehlto9ufwzb6LUIeUPuxtBvSBefmJy3vByieS46a_PlEtmBx8PLYMCpNU_sHgJYNWNyiUmt8L1hoPAekmJ7v6TDbICW_Wa6JYERZ7hE2SdsGj8g9zCPYQJg4TZbXGYQqr-IvNuUomDa6zagMEcQugEUOR5Q',
    transitPassName: preset.transitPass,
    transitPassDesc: preset.transitDesc,

    entryStatusSummary: consularIntelligence.entryStatusSummary,
    entryStatusSubtext: consularIntelligence.entryStatusSubtext,
    typicalClimateTempC: climate.tempC,
    typicalClimateDesc: climate.desc,
    seasonalPeakTitle: seasonalPeakTitles[detectedSeason],
    seasonalPeakSubtext: seasonalPeakSubtexts[detectedSeason],
    culturalEventsCount: events.length + 4,
    culturalEventsSubtext: `Active celebrations and seasonal cultural happenings across ${preset.city}`,

    weatherOverview: {
      headline: `${detectedSeason.charAt(0).toUpperCase() + detectedSeason.slice(1)} Climate Matrix: ${climate.desc}`,
      subheadline: `Microclimate analysis for ${preset.city}, ${preset.country} during ${formattedDates}`,
      tempC: climate.tempC,
      feelsLikeC: climate.tempC - (detectedSeason === 'winter' ? 2 : -1),
      precipMm: climate.precip,
      solarHours: climate.sun,
      sunriseTime: climate.sunrise,
      sunsetTime: climate.sunset,
      auroraKp: preset.city.toLowerCase() === 'reykjavik' && (detectedSeason === 'winter' || detectedSeason === 'autumn') ? 4 : undefined,
      uvIndex: climate.uv,
      checklistTips: [
        `Recommended thermal comfort window: ${climate.tempC}°C / ${Math.round((climate.tempC * 9) / 5 + 32)}°F.`,
        `Solar arc daylight: ${climate.sun} with sunrise at ${climate.sunrise} and sunset at ${climate.sunset}.`,
        `Pack specialized ${detectedSeason} gear: follow the active packing list architecture.`,
        `Local transit: tap ${preset.transitPass.split(' ')[0]} seamlessly at turnstiles.`,
      ],
    },
    forecast7Days,
    windGustsHourly: [
      { hour: '06:00', gustKmh: 14 },
      { hour: '09:00', gustKmh: 20 },
      { hour: '12:00', gustKmh: 28 },
      { hour: '15:00', gustKmh: 36 },
      { hour: '18:00', gustKmh: 26 },
      { hour: '21:00', gustKmh: 18 },
      { hour: '00:00', gustKmh: 12 },
    ],

    visa,
    packingList,
    packingWeightKg: detectedSeason === 'winter' ? 18.5 : detectedSeason === 'summer' ? 11.2 : 14.0,
    packingMaxKg: 23.0,

    featuredEvent: events[0],
    eventsList: events,
  };
}

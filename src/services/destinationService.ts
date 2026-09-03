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
};

// Generate specialized packing list based on the calculated season & climate
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

  const visa: VisaDetails = {
    status: preset.visaType,
    durationDays: preset.visaDuration,
    entryType: 'Multiple Entry',
    summaryTitle: preset.visaType === 'Visa-Free' ? 'Consular Clearance • Visa Exempt' : 'ETA Application Required',
    summarySubtitle: `${passportNationality} Passport Holder • Tourism Status`,
    validityRequirement: 'Passport must be valid for at least 6 months beyond intended stay',
    biometricRequirement: 'Standard digital biometric photo recorded at arrival gate',
    processingTimeStdHours: preset.visaType === 'Visa-Free' ? 0 : 24,
    processingTimeExpHours: preset.visaType === 'Visa-Free' ? 0 : 4,
    standardFeeUsd: preset.visaFee,
    officialPortalUrl: preset.portalUrl,
    portalHost: new URL(preset.portalUrl).hostname,
    applicationDeadlines: [
      { label: 'Today', dateStr: 'Document Pre-check', status: 'passed' },
      { label: 'Portal Verification', dateStr: '7 Days Prior', status: 'recommended' },
      { label: 'Flight Check-in', dateStr: startD.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), status: 'limit' },
      { label: 'Terminal Exit', dateStr: endD.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), status: 'exit' },
    ],
    dossierItems: [
      { id: 'v1', title: 'Passport Minimum Validity', requirement: `${passportNationality} passport valid for duration of travel.`, checked: true },
      { id: 'v2', title: 'Confirmed Return / Onward Transit', requirement: 'Proof of exit ticket within authorized duration.', checked: true },
      { id: 'v3', title: 'Accommodation Registration', requirement: `Registered lodging address in ${preset.city}.`, checked: false },
      { id: 'v4', title: 'Health & Medical Travel Cover', requirement: 'Recommended comprehensive emergency medical coverage.', checked: true },
    ],
    faqs: [
      {
        question: `Do ${passportNationality} passport holders need a visa for ${preset.country}?`,
        answer: preset.visaType === 'Visa-Free' 
          ? `No. Citizens with ${passportNationality} passports can enter ${preset.country} visa-free for tourism stays up to ${preset.visaDuration} days.` 
          : `Travelers must obtain an official Electronic Travel Authorization (ETA) online before boarding flights to ${preset.country}.`,
      },
      {
        question: `What is the typical weather during ${detectedSeason} in ${preset.city}?`,
        answer: `During ${detectedSeason}, ${preset.city} experiences an average temperature of around ${climate.tempC}°C (${Math.round((climate.tempC * 9) / 5 + 32)}°F). ${climate.desc}.`,
      },
    ],
    embassies: [
      {
        name: `Embassy of ${preset.country} Consular Section`,
        address: `100 Diplomatic Avenue, Consular Quarter`,
        phone: '+1 (202) 555-0199',
        hours: '09:00 - 16:30 Mon-Fri',
      },
    ],
  };

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

    entryStatusSummary: preset.visaType === 'Visa-Free' ? `Visa-Free (${preset.visaDuration} Days)` : `${preset.visaType} Pre-Clearance`,
    entryStatusSubtext: `${passportNationality} Citizen • Clear To Travel`,
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

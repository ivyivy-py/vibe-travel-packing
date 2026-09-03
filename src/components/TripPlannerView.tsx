import React, { useState, useEffect } from 'react';
import { DestinationData, PlannerSubTab, AppView, Currency, TempUnit, Season } from '../types';
import { useSeason } from '../context/SeasonContext';

interface TripPlannerViewProps {
  destination: DestinationData;
  allDestinations: Record<string, DestinationData>;
  onSelectDestination: (id: string) => void;
  onNavigateToView: (view: AppView) => void;
  currency: Currency;
  tempUnit: TempUnit;
  onLookupDestination: (params: {
    location: string;
    startDate: string;
    endDate?: string;
    passportNationality?: string;
  }) => Promise<void>;
  onSeasonChange: (season: Season) => void;
}

export const TripPlannerView: React.FC<TripPlannerViewProps> = ({
  destination,
  allDestinations,
  onSelectDestination,
  onNavigateToView,
  currency,
  tempUnit,
  onLookupDestination,
  onSeasonChange,
}) => {
  const { season, theme } = useSeason();
  const [activeSubTab, setActiveSubTab] = useState<PlannerSubTab>('comprehensive');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLookingUp, setIsLookingUp] = useState(false);

  // User input states for Dates & Location
  const [locationInput, setLocationInput] = useState(`${destination.city}, ${destination.country}`);
  const [startDateInput, setStartDateInput] = useState('2026-07-15');
  const [endDateInput, setEndDateInput] = useState('2026-07-29');
  const [passportInput, setPassportInput] = useState(destination.passportNationality || 'United States');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // Checklist state
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({
    p1: true,
    p2: true,
    p3: true,
  });

  // Sync inputs when destination changes
  useEffect(() => {
    setLocationInput(`${destination.city}, ${destination.country}`);
    setPassportInput(destination.passportNationality || 'United States');
  }, [destination.id]);

  const toggleCheck = (id: string) => {
    setChecklistState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const convertTemp = (celsius: number) => {
    if (tempUnit === 'F') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return Math.round(celsius);
  };

  const handleSimulateGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 600);
  };

  // Perform dynamic lookup when user submits dates and location
  const handleExecuteLookup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!locationInput.trim()) return;

    setIsLookingUp(true);
    setShowLocationDropdown(false);
    try {
      await onLookupDestination({
        location: locationInput.trim(),
        startDate: startDateInput,
        endDate: endDateInput,
        passportNationality: passportInput,
      });
    } finally {
      setIsLookingUp(false);
    }
  };

  // Quick seasonal shortcut dates
  const handleApplySeasonalPreset = (presetSeason: Season) => {
    let sDate = '2026-07-15';
    let eDate = '2026-07-29';
    if (presetSeason === 'autumn') {
      sDate = '2025-10-14';
      eDate = '2025-10-28';
    } else if (presetSeason === 'winter') {
      sDate = '2026-01-12';
      eDate = '2026-01-26';
    } else if (presetSeason === 'spring') {
      sDate = '2026-04-05';
      eDate = '2026-04-19';
    }

    setStartDateInput(sDate);
    setEndDateInput(eDate);

    // Trigger lookup directly with the new dates and active location
    setIsLookingUp(true);
    onLookupDestination({
      location: locationInput.trim(),
      startDate: sDate,
      endDate: eDate,
      passportNationality: passportInput,
    }).finally(() => setIsLookingUp(false));
  };

  const popularWorldCorridors = [
    { label: 'Tokyo, Japan', flag: '🇯🇵', id: 'tokyo' },
    { label: 'Kuala Lumpur, Malaysia', flag: '🇲🇾', id: 'kualalumpur' },
    { label: 'Hong Kong SAR', flag: '🇭🇰', id: 'hongkong' },
    { label: 'Beijing, China', flag: '🇨🇳', id: 'beijing' },
    { label: 'Sydney, Australia', flag: '🇦🇺', id: 'sydney' },
    { label: 'Paris, France', flag: '🇫🇷', id: 'paris' },
    { label: 'Reykjavik, Iceland', flag: '🇮🇸', id: 'reykjavik' },
    { label: 'Honolulu, Hawaii', flag: '🌺', id: 'honolulu' },
    { label: 'Rome, Italy', flag: '🇮🇹', id: 'rome' },
    { label: 'Kyoto, Japan', flag: '🇯🇵', id: 'kyoto' },
    { label: 'New Delhi, India', flag: '🇮🇳', id: 'newdelhi' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Seasonal Atmosphere Telemetry Banner */}
      <div className={`p-4 md:p-5 rounded-2xl border transition-all duration-300 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${theme.bannerClass}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-xs shrink-0 ${theme.accentLightBg} border ${theme.accentBorder}`}>
            <span>{theme.emoji}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${theme.badge}`}>
                {theme.label}
              </span>
              <span className="text-xs font-semibold opacity-90">in {destination.country}</span>
            </div>
            <p className="text-xs mt-0.5 font-medium opacity-90">
              {theme.tagline} • {theme.description}
            </p>
          </div>
        </div>

        {/* Season Quick-Tester Pills */}
        <div className="flex items-center gap-1.5 shrink-0 bg-white/70 backdrop-blur p-1 rounded-xl border border-black/5">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 text-[#74777e]">Palette:</span>
          {(['summer', 'autumn', 'winter', 'spring'] as Season[]).map((s) => {
            const isCur = season === s;
            const emojis: Record<Season, string> = { summer: '☀️', autumn: '🍁', winter: '❄️', spring: '🌸' };
            const names: Record<Season, string> = { summer: 'Summer', autumn: 'Autumn', winter: 'Winter', spring: 'Spring' };
            return (
              <button
                key={s}
                onClick={() => onSeasonChange(s)}
                title={`Switch UI theme to ${names[s]}`}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  isCur
                    ? `${theme.activeTab} font-bold`
                    : 'text-[#44474d] hover:bg-white hover:text-[#0b1c30]'
                }`}
              >
                <span>{emojis[s]}</span>
                <span className="hidden md:inline">{names[s]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Consular Telemetry Header & Interactive Query Matrix */}
      <div className={`bg-white rounded-3xl p-6 md:p-8 shadow-xs border transition-all duration-300 ${theme.cardBorder}`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${theme.badge}`}>
                <span className={`w-2 h-2 rounded-full ${theme.pulseDot} animate-pulse`}></span>
                Consular Telemetry Active
              </span>
              <span className="text-xs text-[#74777e] font-mono">
                Corridor #{destination.airportCode.split(' ')[0]}
              </span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
              Trip Intelligence & Sovereign Advisory
            </h1>
            <p className="text-sm text-[#44474d] mt-1">
              Live meteorological synthesis, entry clearances, and cultural happenings for {destination.city}, {destination.country}.
            </p>
          </div>

          {/* Quick World Corridor Presets */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-[#74777e] uppercase tracking-wider mr-1">Corridors:</span>
            {popularWorldCorridors.slice(0, 4).map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setLocationInput(p.label);
                  if (allDestinations[p.id]) {
                    onSelectDestination(p.id);
                  } else {
                    onLookupDestination({
                      location: p.label,
                      startDate: startDateInput,
                      endDate: endDateInput,
                      passportNationality: passportInput,
                    });
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${
                  p.id === destination.id || destination.city.toLowerCase() === p.label.split(',')[0].toLowerCase()
                    ? `${theme.activeTab} font-bold shadow-xs`
                    : 'bg-white text-[#0b1c30] border-[#dce9ff] hover:bg-[#eff4ff]'
                }`}
              >
                <span>{p.flag}</span>
                <span>{p.label.split(',')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Query & Search Matrix Form */}
        <form
          onSubmit={handleExecuteLookup}
          className={`p-4 md:p-5 rounded-2xl border transition-all duration-300 ${theme.accentLightBg} ${theme.accentBorder}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            
            {/* Location Input with Autocomplete Dropdown */}
            <div className="md:col-span-4 relative">
              <label className="block text-[11px] font-bold text-[#44474d] uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Destination (City, Country)</span>
                <span className="text-[10px] text-[#74777e] font-normal">Type any location</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onFocus={() => setShowLocationDropdown(true)}
                  placeholder="e.g. Paris, France or Sydney"
                  className="w-full h-11 pl-9 pr-3 rounded-xl bg-white text-xs font-semibold text-[#0b1c30] border border-[#dce9ff] focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 shadow-2xs"
                />
                <span className="material-symbols-outlined text-[18px] text-[#74777e] absolute left-2.5 top-2.5">
                  location_on
                </span>
              </div>

              {/* Location Suggestions Dropdown */}
              {showLocationDropdown && (
                <div className="absolute left-0 top-full mt-1.5 w-full bg-white rounded-2xl shadow-xl border border-[#dce9ff] py-2 z-50 max-h-60 overflow-y-auto">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#74777e]">
                    Recommended World Corridors
                  </div>
                  {popularWorldCorridors.map((corridor) => (
                    <button
                      key={corridor.label}
                      type="button"
                      onClick={() => {
                        setLocationInput(corridor.label);
                        setShowLocationDropdown(false);
                      }}
                      className="w-full px-3 py-2 text-left text-xs hover:bg-[#eff4ff] flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2 font-medium text-[#0b1c30]">
                        <span>{corridor.flag}</span>
                        <span>{corridor.label}</span>
                      </div>
                      <span className="text-[10px] text-[#74777e]">Instant Telemetry</span>
                    </button>
                  ))}
                  <div className="border-t border-[#eff4ff] mt-1 pt-1 px-3 py-1 text-[10px] text-[#74777e]">
                    Or press Enter to lookup any custom city
                  </div>
                </div>
              )}
            </div>

            {/* Travel Dates Picker */}
            <div className="md:col-span-4">
              <label className="block text-[11px] font-bold text-[#44474d] uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Travel Dates (Departure - Return)</span>
                <span className="text-[10px] text-[#74777e] font-normal">Sets Season</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <input
                  type="date"
                  value={startDateInput}
                  onChange={(e) => setStartDateInput(e.target.value)}
                  className="w-full h-11 px-2.5 rounded-xl bg-white text-xs font-semibold text-[#0b1c30] border border-[#dce9ff] focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 shadow-2xs"
                  title="Departure Date"
                />
                <input
                  type="date"
                  value={endDateInput}
                  onChange={(e) => setEndDateInput(e.target.value)}
                  className="w-full h-11 px-2.5 rounded-xl bg-white text-xs font-semibold text-[#0b1c30] border border-[#dce9ff] focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 shadow-2xs"
                  title="Return Date"
                />
              </div>
            </div>

            {/* Passport Nationality */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold text-[#44474d] uppercase tracking-wider mb-1">
                Passport / Nationality
              </label>
              <select
                value={passportInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setPassportInput(val);
                  // Auto-lookup with updated nationality
                  setIsLookingUp(true);
                  onLookupDestination({
                    location: locationInput.trim(),
                    startDate: startDateInput,
                    endDate: endDateInput,
                    passportNationality: val,
                  }).finally(() => setIsLookingUp(false));
                }}
                className="w-full h-11 px-2.5 rounded-xl bg-white text-xs font-semibold text-[#0b1c30] border border-[#dce9ff] focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 shadow-2xs"
              >
                <option value="China">🇨🇳 China (PRC Ordinary)</option>
                <option value="Hong Kong">🇭🇰 Hong Kong (HKSAR)</option>
                <option value="Malaysia">🇲🇾 Malaysia (Pasport Malaysia)</option>
                <option value="United States">🇺🇸 United States</option>
                <option value="United Kingdom">🇬🇧 United Kingdom</option>
                <option value="Canada">🇨🇦 Canada</option>
                <option value="European Union">🇪🇺 European Union</option>
                <option value="Australia">🇦🇺 Australia</option>
                <option value="Singapore">🇸🇬 Singapore</option>
                <option value="Japan">🇯🇵 Japan</option>
                <option value="India">🇮🇳 India</option>
              </select>
            </div>

            {/* Lookup Action Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isLookingUp}
                className={`w-full h-11 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 px-3 ${theme.primaryBtn}`}
              >
                {isLookingUp ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">travel_explore</span>
                    <span>Lookup Advisory</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Quick Passport Advisory Switches */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-black/5 text-xs">
            <span className="text-[11px] font-bold text-[#74777e] uppercase tracking-wider mr-1">Passport Advisory:</span>
            {[
              { label: 'China', flag: '🇨🇳', title: 'China Passport' },
              { label: 'Hong Kong', flag: '🇭🇰', title: 'Hong Kong Passport' },
              { label: 'Malaysia', flag: '🇲🇾', title: 'Malaysian Passport' },
              { label: 'United States', flag: '🇺🇸', title: 'US Passport' },
              { label: 'United Kingdom', flag: '🇬🇧', title: 'UK Passport' },
              { label: 'Australia', flag: '🇦🇺', title: 'Australia' },
            ].map((p) => {
              const isActive = passportInput.toLowerCase().includes(p.label.toLowerCase()) || 
                (destination.passportNationality && destination.passportNationality.toLowerCase().includes(p.label.toLowerCase()));
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setPassportInput(p.label);
                    setIsLookingUp(true);
                    onLookupDestination({
                      location: locationInput.trim(),
                      startDate: startDateInput,
                      endDate: endDateInput,
                      passportNationality: p.label,
                    }).finally(() => setIsLookingUp(false));
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                    isActive
                      ? 'bg-[#0c1e34] text-white border-[#0c1e34] shadow-xs'
                      : 'bg-white/80 hover:bg-white text-[#0b1c30] border-[#dce9ff]'
                  }`}
                >
                  <span>{p.flag}</span>
                  <span>{p.title}</span>
                </button>
              );
            })}
          </div>

          {/* Seasonal Presets Quick Buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-black/5 text-xs">
            <span className="text-[11px] font-bold text-[#74777e]">Quick Season Projections:</span>
            <button
              type="button"
              onClick={() => handleApplySeasonalPreset('summer')}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/80 hover:bg-white text-amber-900 border border-amber-300 flex items-center gap-1 shadow-2xs"
            >
              <span>☀️</span>
              <span>Summer Season (July)</span>
            </button>
            <button
              type="button"
              onClick={() => handleApplySeasonalPreset('autumn')}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/80 hover:bg-white text-orange-900 border border-orange-300 flex items-center gap-1 shadow-2xs"
            >
              <span>🍁</span>
              <span>Autumn Season (October)</span>
            </button>
            <button
              type="button"
              onClick={() => handleApplySeasonalPreset('winter')}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/80 hover:bg-white text-sky-900 border border-sky-300 flex items-center gap-1 shadow-2xs"
            >
              <span>❄️</span>
              <span>Winter Season (January)</span>
            </button>
            <button
              type="button"
              onClick={() => handleApplySeasonalPreset('spring')}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/80 hover:bg-white text-pink-900 border border-pink-300 flex items-center gap-1 shadow-2xs"
            >
              <span>🌸</span>
              <span>Spring Season (April)</span>
            </button>
          </div>
        </form>

        {/* Quick Overview Metric Bar with Seasonal Accents */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          
          <div className={`p-4 rounded-2xl bg-white border transition-all ${theme.cardBorder}`}>
            <div className="flex items-center justify-between text-[#74777e] mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Entry Clearance</span>
              <span className={`material-symbols-outlined text-[18px] ${theme.accentText}`}>verified</span>
            </div>
            <div className="font-['Plus_Jakarta_Sans'] font-bold text-base md:text-lg text-[#0b1c30] truncate">
              {destination.entryStatusSummary}
            </div>
            <div className="text-[11px] text-[#44474d] truncate mt-0.5">
              {destination.entryStatusSubtext}
            </div>
          </div>

          <div className={`p-4 rounded-2xl bg-white border transition-all ${theme.cardBorder}`}>
            <div className="flex items-center justify-between text-[#74777e] mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Typical Climate</span>
              <span className={`material-symbols-outlined text-[18px] ${theme.accentText}`}>thermostat</span>
            </div>
            <div className="font-['Plus_Jakarta_Sans'] font-bold text-base md:text-lg text-[#0b1c30]">
              {convertTemp(destination.typicalClimateTempC)}°{tempUnit}
            </div>
            <div className="text-[11px] text-[#44474d] truncate mt-0.5">
              {destination.typicalClimateDesc}
            </div>
          </div>

          <div className={`p-4 rounded-2xl bg-white border transition-all ${theme.cardBorder}`}>
            <div className="flex items-center justify-between text-[#74777e] mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Seasonal Peak</span>
              <span className={`material-symbols-outlined text-[18px] ${theme.accentText}`}>
                {theme.icon}
              </span>
            </div>
            <div className="font-['Plus_Jakarta_Sans'] font-bold text-base md:text-lg text-[#0b1c30] truncate">
              {destination.seasonalPeakTitle}
            </div>
            <div className="text-[11px] text-[#44474d] truncate mt-0.5">
              {destination.seasonalPeakSubtext}
            </div>
          </div>

          <div className={`p-4 rounded-2xl bg-white border transition-all ${theme.cardBorder}`}>
            <div className="flex items-center justify-between text-[#74777e] mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Cultural Events</span>
              <span className={`material-symbols-outlined text-[18px] ${theme.accentText}`}>celebration</span>
            </div>
            <div className="font-['Plus_Jakarta_Sans'] font-bold text-base md:text-lg text-[#0b1c30]">
              {destination.culturalEventsCount} Major Festivities
            </div>
            <div className="text-[11px] text-[#44474d] truncate mt-0.5">
              {destination.culturalEventsSubtext}
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Section Tabs */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-2 ${theme.cardBorder}`}>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(
            [
              { id: 'comprehensive', label: 'Comprehensive Briefing', icon: 'dashboard' },
              { id: 'visa', label: 'Visa Details', icon: 'verified_user' },
              { id: 'packing', label: 'What to Pack', icon: 'luggage' },
              { id: 'events', label: 'Local Festivities', icon: 'event' },
            ] as { id: PlannerSubTab; label: string; icon: string }[]
          ).map((tab) => {
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id);
                  if (tab.id === 'visa') onNavigateToView('visa-checker');
                  if (tab.id === 'packing') onNavigateToView('packing-weather');
                  if (tab.id === 'events') onNavigateToView('destination-events');
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? `${theme.activeTab} font-bold`
                    : 'text-[#44474d] hover:text-[#0b1c30] hover:bg-white'
                }`}
              >
                <span className={`material-symbols-outlined text-[16px]`}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs text-[#74777e] font-mono shrink-0">
          <span className={`w-2 h-2 rounded-full ${theme.pulseDot}`}></span>
          <span>Verified live • {season.toUpperCase()} atmospheric window</span>
        </div>
      </div>

      {/* Bento Grid Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Consular Clearance */}
        <div className={`bg-white rounded-3xl p-6 shadow-xs border transition-all ${theme.cardBorder} flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl ${theme.accentLightBg} ${theme.accentText} flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
                    {destination.visa.summaryTitle}
                  </h3>
                  <p className="text-xs text-[#4f5f78]">{destination.visa.summarySubtitle}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${theme.badge}`}>
                {destination.visa.status}
              </span>
            </div>

            <p className="text-xs text-[#44474d] mb-4">
              Travelers with ordinary {destination.passportNationality} passports qualify for {destination.visa.durationDays}-day tourist exemption. No advance consular application fee required.
            </p>

            <div className={`space-y-2.5 p-4 rounded-2xl border ${theme.accentLightBg} ${theme.accentBorder}`}>
              <div className="text-[11px] font-bold text-[#0c1e34] uppercase tracking-wider mb-2">
                Arrival Gate Checklist
              </div>
              
              <label className="flex items-start gap-2.5 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={checklistState['p1'] ?? true}
                  onChange={() => toggleCheck('p1')}
                  className="mt-0.5 rounded"
                />
                <div>
                  <span className="font-semibold text-[#0b1c30]">Passport Validity Check</span>
                  <p className="text-[11px] text-[#44474d]">Must be valid for full duration of intended stay.</p>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={checklistState['p2'] ?? true}
                  onChange={() => toggleCheck('p2')}
                  className="mt-0.5 rounded"
                />
                <div>
                  <span className="font-semibold text-[#0b1c30]">Electronic Pre-Registration</span>
                  <p className="text-[11px] text-[#44474d]">Complete customs and disembarkation declaration online.</p>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={checklistState['p3'] ?? true}
                  onChange={() => toggleCheck('p3')}
                  className="mt-0.5 rounded"
                />
                <div>
                  <span className="font-semibold text-[#0b1c30]">Return Transit / Exit Ticket</span>
                  <p className="text-[11px] text-[#44474d]">Confirmed airline outbound ticket within window.</p>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-black/5 flex items-center justify-between">
            <span className="text-xs text-[#74777e]">Gate Biometrics: Active</span>
            <button
              onClick={() => onNavigateToView('visa-checker')}
              className={`text-xs font-bold ${theme.accentText} hover:opacity-80 flex items-center gap-1 transition-opacity`}
            >
              View Sovereign Protocol & Gate Guide
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Card 2: Weather Synthesis with Seasonal Atmosphere */}
        <div className={`bg-white rounded-3xl p-6 shadow-xs border transition-all ${theme.cardBorder} flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl ${theme.accentLightBg} ${theme.accentText} flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-[18px]">thermostat</span>
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
                    Weather Synthesis • {destination.city}
                  </h3>
                  <p className="text-xs text-[#4f5f78]">{destination.weatherOverview.headline}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-lg font-extrabold font-['Plus_Jakarta_Sans'] ${theme.accentText}`}>
                  {convertTemp(destination.weatherOverview.tempC)}°{tempUnit}
                </span>
                <div className="text-[10px] text-[#74777e]">
                  Feels {convertTemp(destination.weatherOverview.feelsLikeC)}°{tempUnit}
                </div>
              </div>
            </div>

            <p className="text-xs text-[#44474d] mb-4">
              {destination.weatherOverview.subheadline}
            </p>

            <div className={`space-y-2 p-4 rounded-2xl border ${theme.accentLightBg} ${theme.accentBorder}`}>
              <div className="text-[11px] font-bold text-[#0c1e34] uppercase tracking-wider mb-1">
                Atmospheric Protocols ({theme.name} Edition)
              </div>
              {destination.weatherOverview.checklistTips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#0b1c30]">
                  <span className={`material-symbols-outlined text-[14px] ${theme.accentText} mt-0.5 shrink-0`}>
                    check_circle
                  </span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-black/5 flex items-center justify-between">
            <span className="text-xs text-[#74777e]">Solar Arc: {destination.weatherOverview.solarHours}</span>
            <button
              onClick={() => onNavigateToView('packing-weather')}
              className={`text-xs font-bold ${theme.accentText} hover:opacity-80 flex items-center gap-1 transition-opacity`}
            >
              Interactive Gear & Capsule Wardrobe
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Card 3: 7-Day Microclimate Projection */}
        <div className={`bg-white rounded-3xl p-6 shadow-xs border transition-all ${theme.cardBorder}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
                7-Day Microclimate Projection
              </h3>
              <p className="text-xs text-[#4f5f78]">Temperature curves, precipitation probability & solar index</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#74777e]">
              <span>UV {destination.weatherOverview.uvIndex}</span>
              <span>·</span>
              <span>Rain {destination.weatherOverview.precipMm}mm</span>
            </div>
          </div>

          {/* Sparkline & Forecast Grid */}
          <div className="grid grid-cols-7 gap-1.5 pt-2">
            {destination.forecast7Days.map((day, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-2xl text-center border flex flex-col items-center justify-between min-h-[115px] transition-all hover:scale-105 ${
                  idx === 0
                    ? theme.forecastHighlight
                    : 'bg-white/80 border-[#dce9ff] hover:bg-[#eff4ff]'
                }`}
              >
                <span className="text-[11px] font-bold text-[#4f5f78]">{day.day}</span>
                <span className={`material-symbols-outlined text-[20px] my-1 ${theme.accentText}`}>
                  {day.icon}
                </span>
                <div>
                  <div className="text-xs font-bold text-[#0b1c30]">
                    {convertTemp(day.tempC)}°
                  </div>
                  <div className="text-[10px] text-[#74777e]">
                    {convertTemp(day.minTempC)}°
                  </div>
                </div>
                {day.rainChance > 0 && (
                  <span className={`text-[9px] font-mono font-semibold ${theme.accentText} mt-1`}>
                    {day.rainChance}%
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-[#74777e] mt-4 pt-4 border-t border-black/5">
            <div className="flex items-center gap-3">
              <span>🌅 Sunrise {destination.weatherOverview.sunriseTime}</span>
              <span>🌇 Sunset {destination.weatherOverview.sunsetTime}</span>
            </div>
            <span className={`font-mono text-[11px] font-semibold ${theme.accentText}`}>
              Telemetry: {theme.name} Atmosphere Confirmed
            </span>
          </div>
        </div>

        {/* Card 4: Key Cultural Festivals & Happenings */}
        <div className={`bg-white rounded-3xl p-6 shadow-xs border transition-all ${theme.cardBorder} flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
                  Key Cultural Festivals & Happenings
                </h3>
                <p className="text-xs text-[#4f5f78]">Verified seasonal dates and ticket access advisories</p>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${theme.badge}`}>
                {theme.name} Season
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {destination.eventsList.slice(0, 4).map((evt) => (
                <div
                  key={evt.id}
                  className={`group relative rounded-2xl overflow-hidden border p-3 hover:shadow-md transition-all flex flex-col justify-between bg-white ${theme.cardBorder}`}
                >
                  <div className="h-24 w-full rounded-xl overflow-hidden mb-2 relative">
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-1.5 left-1.5 bg-[#0c1e34]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur">
                      {evt.categoryLabel}
                    </span>
                  </div>
                  <div>
                    <h4 className={`font-bold text-xs text-[#0b1c30] line-clamp-1 transition-colors group-hover:${theme.accentText}`}>
                      {evt.title}
                    </h4>
                    <p className="text-[10px] text-[#74777e] mt-0.5">{evt.dateStr}</p>
                    <p className="text-[11px] text-[#44474d] line-clamp-2 mt-1">
                      {evt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between">
            <span className="text-xs text-[#74777e]">Synced with Local Tourism Registry</span>
            <button
              onClick={() => onNavigateToView('destination-events')}
              className={`text-xs font-bold ${theme.accentText} hover:opacity-80 flex items-center gap-1 transition-opacity`}
            >
              Explore All {destination.culturalEventsCount} Curated Events
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

      </div>

      {/* Arrival & Regional Geography Section */}
      <div className={`bg-white rounded-3xl p-6 shadow-xs border transition-all ${theme.cardBorder}`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`material-symbols-outlined text-[18px] ${theme.accentText}`}>train</span>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
                Arrival & Regional Geography
              </h3>
            </div>
            <p className="text-xs text-[#4f5f78]">
              Transit telemetry, terminal connectors, and metropolitan rail passes
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${theme.badge}`}>
              {destination.transitPassName}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-1 space-y-3">
            <div className={`p-4 rounded-2xl border ${theme.accentLightBg} ${theme.accentBorder}`}>
              <div className="text-[11px] font-bold text-[#0c1e34] uppercase tracking-wider mb-1">
                Regional Rail Protocol
              </div>
              <p className="text-xs text-[#44474d] leading-relaxed">
                {destination.transitPassDesc}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border ${theme.accentLightBg} ${theme.accentBorder}`}>
              <div className="text-[11px] font-bold text-[#0c1e34] uppercase tracking-wider mb-1">
                Port of Disembarkation
              </div>
              <div className="flex items-center justify-between text-xs text-[#0b1c30] font-semibold">
                <span>Airport Hub: {destination.airportCode}</span>
                <span className={`${theme.accentText} font-bold`}>Fast-Track Active</span>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-2 h-56 rounded-2xl overflow-hidden border relative shadow-xs ${theme.cardBorder}`}>
            {destination.regionalMapImage ? (
              <img
                src={destination.regionalMapImage}
                alt={`${destination.city} Regional Map`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-[#e5eeff] flex items-center justify-center text-xs text-[#4f5f78]">
                Map Telemetry Synchronized
              </div>
            )}
            <div className="absolute top-3 left-3 bg-[#0c1e34]/85 backdrop-blur text-white px-3 py-1 rounded-lg text-xs font-semibold">
              Greater {destination.city} Metropolitan Area
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

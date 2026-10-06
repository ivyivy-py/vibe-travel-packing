import React, { useState, useEffect } from 'react';
import {
  Currency,
  DestinationData,
  TravelSearchParams,
  TravelSearchResults,
  FlightOffer,
  HotelOffer,
} from '../types';
import { useSeason } from '../context/SeasonContext';
import { searchFlightsAndHotels, calculateNights } from '../services/travelSearchService';

interface FlightHotelSearchViewProps {
  activeDestination: DestinationData;
  currency: Currency;
  onNavigateToTripIntelligence: (destinationCity: string, startDate: string, returnDate: string) => void;
  onSelectDestinationById?: (id: string) => void;
}

const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  JPY: { symbol: '¥', rate: 152 },
  GBP: { symbol: '£', rate: 0.79 },
  AUD: { symbol: 'A$', rate: 1.54 },
  CNY: { symbol: '¥', rate: 7.24 },
  HKD: { symbol: 'HK$', rate: 7.82 },
  MYR: { symbol: 'RM', rate: 4.42 },
};

export const FlightHotelSearchView: React.FC<FlightHotelSearchViewProps> = ({
  activeDestination,
  currency,
  onNavigateToTripIntelligence,
  onSelectDestinationById,
}) => {
  const { theme } = useSeason();

  // Search Form State
  const [destinationInput, setDestinationInput] = useState(`${activeDestination.city}, ${activeDestination.country}`);
  const [startDateInput, setStartDateInput] = useState('2026-07-15');
  const [destinationDateInput, setDestinationDateInput] = useState('2026-07-16');
  const [returnDateInput, setReturnDateInput] = useState('2026-07-29');
  const [originInput, setOriginInput] = useState(activeDestination.originCity || 'San Francisco (SFO)');
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState<'Economy' | 'Premium Economy' | 'Business' | 'First'>('Economy');

  // Search Results & Loading
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<TravelSearchResults | null>(null);
  const [activeResultsTab, setActiveResultsTab] = useState<'all' | 'flights' | 'hotels'>('all');
  const [flightSort, setFlightSort] = useState<'best' | 'price' | 'duration'>('best');
  const [hotelSort, setHotelSort] = useState<'recommended' | 'price' | 'rating'>('recommended');

  // Selected Booking Items
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string | null>(null);

  // Sync destination if changed from outside
  useEffect(() => {
    if (activeDestination?.city) {
      setDestinationInput(`${activeDestination.city}, ${activeDestination.country}`);
    }
  }, [activeDestination.id]);

  // Initial auto-search on mount
  useEffect(() => {
    handleExecuteSearch();
  }, []);

  const formatPrice = (priceUsd: number) => {
    const { symbol, rate } = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
    const converted = Math.round(priceUsd * rate);
    return `${symbol}${converted.toLocaleString()}`;
  };

  const handleExecuteSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!destinationInput.trim()) return;

    setIsSearching(true);
    setBookingSuccessMsg(null);

    try {
      const searchParams: TravelSearchParams = {
        destination: destinationInput.trim(),
        startDate: startDateInput,
        returnDate: returnDateInput,
        destinationDate: destinationDateInput || startDateInput,
        origin: originInput.trim(),
        passengers,
        cabinClass,
      };

      const res = await searchFlightsAndHotels(searchParams);
      setResults(res);

      if (res.flights.length > 0 && !selectedFlightId) {
        setSelectedFlightId(res.flights[0].id);
      }
      if (res.hotels.length > 0 && !selectedHotelId) {
        setSelectedHotelId(res.hotels[0].id);
      }
    } catch (err) {
      console.error('Error during flight and hotel search:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const popularCorridors = [
    { label: 'Tokyo, Japan', flag: '🇯🇵', id: 'tokyo' },
    { label: 'Paris, France', flag: '🇫🇷', id: 'paris' },
    { label: 'Hong Kong SAR', flag: '🇭🇰', id: 'hongkong' },
    { label: 'Kuala Lumpur, Malaysia', flag: '🇲🇾', id: 'kualalumpur' },
    { label: 'Beijing, China', flag: '🇨🇳', id: 'beijing' },
    { label: 'Sydney, Australia', flag: '🇦🇺', id: 'sydney' },
    { label: 'Reykjavik, Iceland', flag: '🇮🇸', id: 'reykjavik' },
  ];

  const handleSelectCorridor = (corridor: { label: string; flag: string; id: string }) => {
    setDestinationInput(corridor.label);
    if (onSelectDestinationById) {
      onSelectDestinationById(corridor.id);
    }
  };

  const nightsCount = calculateNights(destinationDateInput, returnDateInput, startDateInput);

  // Sorting
  const sortedFlights = results ? [...results.flights].sort((a, b) => {
    if (flightSort === 'price') return a.priceUsd - b.priceUsd;
    if (flightSort === 'duration') return a.duration.localeCompare(b.duration);
    return a.stops - b.stops;
  }) : [];

  const sortedHotels = results ? [...results.hotels].sort((a, b) => {
    if (hotelSort === 'price') return a.pricePerNightUsd - b.pricePerNightUsd;
    if (hotelSort === 'rating') return b.ratingScore - a.ratingScore;
    return b.stars - a.stars;
  }) : [];

  const selectedFlight = results?.flights.find(f => f.id === selectedFlightId);
  const selectedHotel = results?.hotels.find(h => h.id === selectedHotelId);
  const totalCombinedPriceUsd = (selectedFlight?.priceUsd || 0) + (selectedHotel ? selectedHotel.pricePerNightUsd * nightsCount : 0);

  return (
    <div className="space-y-6">

      {/* Top Banner & Quick Navigation */}
      <div className={`p-4 md:p-5 rounded-2xl border transition-all duration-300 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${theme.bannerClass}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-xs shrink-0 bg-white/80 border border-black/5">
            <span>✈️</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                MCP Search Active
              </span>
              <span className="text-xs font-semibold text-[#0b1c30]">
                Live Endpoint: <code className="font-mono text-[11px] bg-white/70 px-1.5 py-0.5 rounded border border-black/5">https://mcp.smithery.ai/ivy-poon</code>
              </span>
            </div>
            <p className="text-xs mt-0.5 font-medium text-[#44474d]">
              Searching real-time flights & hotel inventory • No API key required
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateToTripIntelligence(destinationInput, startDateInput, returnDateInput)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-[#0c1e34] bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-all shrink-0"
        >
          <span>Trip Intelligence & Advisory</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      {/* Primary Section Switcher Tabs: Search Flights & Hotels (MCP) | Trip Intelligence & Advisory */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 bg-white/95 backdrop-blur rounded-2xl border border-[#dce9ff] shadow-xs">
        <button
          type="button"
          className="flex-1 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2.5 transition-all bg-[#0c1e34] text-white shadow-xs border border-transparent"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="material-symbols-outlined text-[18px] text-[#97f5ca]">travel_explore</span>
          <span>✈️ Search Flights & Hotels (https://mcp.smithery.ai/ivy-poon)</span>
        </button>
        <button
          type="button"
          onClick={() => onNavigateToTripIntelligence(destinationInput, startDateInput, returnDateInput)}
          className="flex-1 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2.5 transition-all bg-white text-[#44474d] hover:bg-[#eff4ff] hover:text-[#0b1c30] border border-slate-200 hover:border-slate-300 shadow-2xs group"
          title="Switch to Trip Intelligence & Advisory section"
        >
          <span className="material-symbols-outlined text-[18px]">map</span>
          <span>🌐 Trip Intelligence & Advisory Section</span>
          <span className="material-symbols-outlined text-[14px] text-slate-400">arrow_forward</span>
        </button>
      </div>

      {/* SEARCH BOX CARD */}
      <div className={`bg-white rounded-3xl p-6 md:p-8 shadow-xs border transition-all duration-300 ${theme.cardBorder}`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                Smithery Travel MCP Gateway
              </span>
              <span className="text-xs text-[#74777e] font-mono">
                Protocol: Model Context Protocol (ivy-poon)
              </span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
              Flight & Hotel Search Engine
            </h1>
            <p className="text-sm text-[#44474d] mt-1">
              Specify your travel start date, arrival date at destination, and return date to pull verified flight routes and premier hotels.
            </p>
          </div>

          {/* Quick World Corridor Presets */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-[#74777e] uppercase tracking-wider mr-1">Corridors:</span>
            {popularCorridors.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectCorridor(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${
                  destinationInput.toLowerCase().includes(p.label.split(',')[0].toLowerCase())
                    ? 'bg-[#0c1e34] text-white font-bold border-[#0c1e34] shadow-xs'
                    : 'bg-white text-[#0b1c30] border-[#dce9ff] hover:bg-[#eff4ff]'
                }`}
              >
                <span>{p.flag}</span>
                <span>{p.label.split(',')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* INPUT BOX FORM */}
        <form onSubmit={handleExecuteSearch} className={`p-5 md:p-6 rounded-2xl border transition-all ${theme.accentLightBg} ${theme.accentBorder}`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* Destination Input */}
            <div className="md:col-span-4">
              <label className="block text-[11px] font-bold text-[#44474d] uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Destination (City, Country)</span>
                <span className="text-[10px] text-[#74777e] font-normal">Where to?</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={destinationInput}
                  onChange={(e) => setDestinationInput(e.target.value)}
                  placeholder="e.g. Tokyo, Japan or Paris, France"
                  className="w-full h-11 pl-9 pr-3 rounded-xl bg-white text-xs font-semibold text-[#0b1c30] border border-[#dce9ff] focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 shadow-2xs"
                  required
                />
                <span className="material-symbols-outlined text-[18px] text-[#74777e] absolute left-2.5 top-2.5">
                  location_on
                </span>
              </div>
            </div>

            {/* Travel Start Date */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold text-[#44474d] uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Travel Start Date</span>
                <span className="text-[10px] text-[#74777e] font-normal">Departure</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={startDateInput}
                  onChange={(e) => setStartDateInput(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-white text-xs font-semibold text-[#0b1c30] border border-[#dce9ff] focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 shadow-2xs"
                  required
                />
              </div>
            </div>

            {/* Destination Date */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold text-[#44474d] uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Destination Date</span>
                <span className="text-[10px] text-emerald-700 font-bold">Arrive / Check-in</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={destinationDateInput}
                  onChange={(e) => setDestinationDateInput(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-white text-xs font-semibold text-[#0b1c30] border border-[#dce9ff] focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 shadow-2xs"
                  required
                />
              </div>
            </div>

            {/* Return Date */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold text-[#44474d] uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Return Date</span>
                <span className="text-[10px] text-[#74777e] font-normal">Flight Back</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={returnDateInput}
                  onChange={(e) => setReturnDateInput(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-white text-xs font-semibold text-[#0b1c30] border border-[#dce9ff] focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 shadow-2xs"
                  required
                />
              </div>
            </div>

            {/* Submit Search Button */}
            <div className="md:col-span-2 flex items-end">
              <button
                type="submit"
                disabled={isSearching}
                className={`w-full h-11 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 px-3 ${theme.primaryBtn}`}
              >
                {isSearching ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                    <span>Querying MCP...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">travel_explore</span>
                    <span>Search Flights & Hotels</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Secondary Filter Row: Origin, Passengers, Cabin Class & Telemetry Summary */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-4 pt-3 border-t border-black/5 items-center text-xs">
            
            <div className="md:col-span-4 flex items-center gap-2">
              <span className="text-[11px] font-semibold text-[#74777e] shrink-0">Departure Origin:</span>
              <input
                type="text"
                value={originInput}
                onChange={(e) => setOriginInput(e.target.value)}
                placeholder="Origin City / Airport (e.g. SFO)"
                className="w-full h-8 px-2.5 rounded-lg bg-white text-xs text-[#0b1c30] border border-[#dce9ff]"
              />
            </div>

            <div className="md:col-span-3 flex items-center gap-2">
              <span className="text-[11px] font-semibold text-[#74777e] shrink-0">Cabin Class:</span>
              <select
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value as any)}
                className="w-full h-8 px-2 rounded-lg bg-white text-xs text-[#0b1c30] border border-[#dce9ff]"
              >
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business Class</option>
                <option value="First">First Class</option>
              </select>
            </div>

            <div className="md:col-span-2 flex items-center gap-2">
              <span className="text-[11px] font-semibold text-[#74777e] shrink-0">Travelers:</span>
              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="w-full h-8 px-2 rounded-lg bg-white text-xs text-[#0b1c30] border border-[#dce9ff]"
              >
                <option value={1}>1 Traveler</option>
                <option value={2}>2 Travelers</option>
                <option value={3}>3 Travelers</option>
                <option value={4}>4+ Travelers</option>
              </select>
            </div>

            <div className="md:col-span-3 flex items-center justify-end gap-2 text-[11px] text-[#4f5f78] font-mono">
              <span className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Duration: {nightsCount} Nights Stay
              </span>
            </div>

          </div>
        </form>

      </div>

      {/* RESULTS DISPLAY BELOW THE BOX */}
      {isSearching && (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#eff4ff] shadow-xs">
          <div className="w-12 h-12 border-3 border-amber-500/20 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#0b1c30]">
            Querying Smithery Travel MCP Endpoint...
          </h3>
          <p className="text-xs text-[#74777e] mt-1 max-w-md mx-auto">
            Contacting <code className="font-mono text-[#0c1e34]">https://mcp.smithery.ai/ivy-poon</code> for live flight corridors and hotel inventory matching your dates.
          </p>
        </div>
      )}

      {results && !isSearching && (
        <div className="space-y-6">

          {/* Results Header Telemetry & Sub-Tabs */}
          <div className="bg-white rounded-2xl p-4 md:p-5 border border-[#eff4ff] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0b1c30] uppercase tracking-wider">
                  Search Results for {results.query.destination}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-[#44474d] font-mono">
                  {results.flights.length} Flights • {results.hotels.length} Hotels
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">
                  {nightsCount} Nights ({results.query.startDate} ➔ {results.query.returnDate})
                </span>
              </div>
              <p className="text-xs text-[#74777e] mt-0.5">
                Source: <span className="font-semibold text-[#0c1e34]">{results.source}</span> • Protocol: <code className="font-mono">{results.endpointUrl}</code>
              </p>
            </div>

            {/* Results Filter Tabs */}
            <div className="flex items-center gap-1 bg-[#eff4ff] p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveResultsTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeResultsTab === 'all'
                    ? 'bg-white text-[#0b1c30] shadow-xs'
                    : 'text-[#44474d] hover:text-[#0b1c30]'
                }`}
              >
                All Results ({results.flights.length + results.hotels.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveResultsTab('flights')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  activeResultsTab === 'flights'
                    ? 'bg-white text-[#0b1c30] shadow-xs'
                    : 'text-[#44474d] hover:text-[#0b1c30]'
                }`}
              >
                <span>✈️ Flights</span>
                <span className="text-[10px] opacity-70">({results.flights.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveResultsTab('hotels')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  activeResultsTab === 'hotels'
                    ? 'bg-white text-[#0b1c30] shadow-xs'
                    : 'text-[#44474d] hover:text-[#0b1c30]'
                }`}
              >
                <span>🏨 Hotels</span>
                <span className="text-[10px] opacity-70">({results.hotels.length})</span>
              </button>
            </div>
          </div>

          {/* FLIGHT OFFERS SECTION */}
          {(activeResultsTab === 'all' || activeResultsTab === 'flights') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#0c1e34] text-white flex items-center justify-center text-sm">
                    ✈️
                  </div>
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
                      Available Flight Options
                    </h3>
                    <p className="text-xs text-[#74777e]">
                      Departs {startDateInput} • Arrives at destination {destinationDateInput} • Returns {returnDateInput}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <span className="text-[11px] text-[#74777e] font-semibold mr-1">Sort:</span>
                  <select
                    value={flightSort}
                    onChange={(e) => setFlightSort(e.target.value as any)}
                    className="h-8 px-2 rounded-lg bg-white text-xs border border-[#dce9ff]"
                  >
                    <option value="best">Best Flights</option>
                    <option value="price">Lowest Price</option>
                    <option value="duration">Fastest Duration</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {sortedFlights.map((flight) => {
                  const isSelected = selectedFlightId === flight.id;
                  return (
                    <div
                      key={flight.id}
                      className={`bg-white rounded-2xl p-5 border transition-all duration-200 shadow-2xs ${
                        isSelected
                          ? 'border-[#0c1e34] ring-2 ring-[#0c1e34]/20 bg-slate-50/50'
                          : 'border-[#eff4ff] hover:border-[#cbd5e1]'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                        
                        {/* Airline & Route Details */}
                        <div className="space-y-4 flex-1">
                          
                          {/* Outbound Leg */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-[#0c1e34]">
                                {flight.airlineCode}
                              </div>
                              <div>
                                <div className="font-bold text-sm text-[#0b1c30] flex items-center gap-1.5">
                                  <span>{flight.airline}</span>
                                  <span className="text-xs font-mono text-[#74777e] font-normal">• {flight.flightNumber}</span>
                                </div>
                                <div className="text-[11px] text-[#74777e]">
                                  {flight.aircraft} • {flight.cabinClass}
                                </div>
                              </div>
                            </div>

                            {/* Timing visualizer */}
                            <div className="flex items-center gap-6 text-center">
                              <div>
                                <div className="text-base font-extrabold text-[#0b1c30] font-mono">{flight.departureTime}</div>
                                <div className="text-[11px] font-semibold text-[#44474d]">{flight.departureAirport}</div>
                                <div className="text-[10px] text-[#74777e]">{flight.departureDate}</div>
                              </div>

                              <div className="flex flex-col items-center px-2">
                                <span className="text-[10px] font-semibold text-[#74777e]">{flight.duration}</span>
                                <div className="w-24 h-0.5 bg-slate-300 relative my-1">
                                  <span className="material-symbols-outlined text-[14px] text-[#0c1e34] absolute left-1/2 -top-2 -translate-x-1/2">
                                    flight
                                  </span>
                                </div>
                                <span className={`text-[10px] font-bold ${flight.stops === 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                                  {flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop (${flight.stopDetails})`}
                                </span>
                              </div>

                              <div>
                                <div className="text-base font-extrabold text-[#0b1c30] font-mono">{flight.arrivalTime}</div>
                                <div className="text-[11px] font-semibold text-[#44474d]">{flight.arrivalAirport}</div>
                                <div className="text-[10px] text-emerald-700 font-bold">{flight.arrivalDate}</div>
                              </div>
                            </div>
                          </div>

                          {/* Return Leg (if available) */}
                          {flight.returnFlight && (
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center font-bold text-xs text-[#0c1e34]">
                                  {flight.airlineCode}
                                </div>
                                <div>
                                  <div className="font-bold text-xs text-[#0b1c30] flex items-center gap-1.5">
                                    <span className="text-emerald-700 font-bold">Return Flight</span>
                                    <span className="text-xs font-mono text-[#74777e] font-normal">• {flight.returnFlight.flightNumber}</span>
                                  </div>
                                  <div className="text-[11px] text-[#74777e]">
                                    {flight.baggage}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-6 text-center">
                                <div>
                                  <div className="text-sm font-bold text-[#0b1c30] font-mono">{flight.returnFlight.departureTime}</div>
                                  <div className="text-[11px] text-[#44474d]">{flight.returnFlight.departureAirport}</div>
                                  <div className="text-[10px] text-[#74777e]">{flight.returnFlight.departureDate}</div>
                                </div>

                                <div className="flex flex-col items-center px-2">
                                  <span className="text-[10px] text-[#74777e]">{flight.returnFlight.duration}</span>
                                  <div className="w-20 h-0.5 bg-slate-300 relative my-0.5">
                                    <span className="material-symbols-outlined text-[12px] text-slate-500 absolute left-1/2 -top-1.5 -translate-x-1/2 rotate-180">
                                      flight
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-emerald-600 font-bold">Return Non-stop</span>
                                </div>

                                <div>
                                  <div className="text-sm font-bold text-[#0b1c30] font-mono">{flight.returnFlight.arrivalTime}</div>
                                  <div className="text-[11px] text-[#44474d]">{flight.returnFlight.arrivalAirport}</div>
                                  <div className="text-[10px] text-[#74777e]">{flight.returnFlight.arrivalDate}</div>
                                </div>
                              </div>
                            </div>
                          )}

                        </div>

                        {/* Price & Action Box */}
                        <div className="lg:border-l lg:border-slate-100 lg:pl-6 flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-3 shrink-0">
                          <div className="text-left lg:text-right">
                            <span className="text-[10px] text-[#74777e] uppercase tracking-wider block">Roundtrip Total</span>
                            <div className="text-2xl font-extrabold text-[#0b1c30]">
                              {formatPrice(flight.priceUsd)}
                            </div>
                            <span className="text-[11px] text-emerald-700 font-semibold block">Taxes & fees included</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedFlightId(flight.id);
                              setBookingSuccessMsg(`Flight ${flight.flightNumber} selected!`);
                            }}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-[#0c1e34] text-white shadow-xs'
                                : 'bg-slate-100 text-[#0c1e34] hover:bg-slate-200'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              {isSelected ? 'check_circle' : 'add_circle'}
                            </span>
                            <span>{isSelected ? 'Selected Flight' : 'Select Flight'}</span>
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* HOTEL OFFERS SECTION */}
          {(activeResultsTab === 'all' || activeResultsTab === 'hotels') && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-sm">
                    🏨
                  </div>
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
                      Accommodations in {results.query.destination}
                    </h3>
                    <p className="text-xs text-[#74777e]">
                      Check-in: {destinationDateInput} • Check-out: {returnDateInput} • {nightsCount} Nights
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <span className="text-[11px] text-[#74777e] font-semibold mr-1">Sort:</span>
                  <select
                    value={hotelSort}
                    onChange={(e) => setHotelSort(e.target.value as any)}
                    className="h-8 px-2 rounded-lg bg-white text-xs border border-[#dce9ff]"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="rating">Highest Guest Rating</option>
                    <option value="price">Lowest Nightly Price</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {sortedHotels.map((hotel) => {
                  const isSelected = selectedHotelId === hotel.id;
                  const totalHotelPrice = hotel.pricePerNightUsd * nightsCount;

                  return (
                    <div
                      key={hotel.id}
                      className={`bg-white rounded-2xl overflow-hidden border transition-all duration-200 flex flex-col justify-between shadow-2xs ${
                        isSelected
                          ? 'border-[#0c1e34] ring-2 ring-[#0c1e34]/20'
                          : 'border-[#eff4ff] hover:shadow-md'
                      }`}
                    >
                      <div>
                        {/* Hotel Image with Badges */}
                        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                          <img
                            src={hotel.image}
                            alt={hotel.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                          <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur text-white px-2.5 py-1 rounded-full text-[11px] font-bold">
                            <span className="text-amber-400">★</span>
                            <span>{hotel.stars} Stars</span>
                          </div>
                          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur text-[#0b1c30] px-2.5 py-1 rounded-full text-[11px] font-extrabold shadow-xs flex items-center gap-1">
                            <span className="text-emerald-700 font-bold">{hotel.ratingScore}</span>
                            <span className="text-[10px] text-[#74777e]">/10</span>
                          </div>
                          {hotel.freeCancellation && (
                            <div className="absolute bottom-3 left-3 bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-2xs">
                              Free Cancellation
                            </div>
                          )}
                        </div>

                        {/* Hotel Content */}
                        <div className="p-5 space-y-3">
                          <div>
                            <div className="flex items-center gap-1 text-[11px] text-[#74777e]">
                              <span className="material-symbols-outlined text-[14px]">pin_drop</span>
                              <span>{hotel.neighborhood}</span>
                              <span>•</span>
                              <span>{hotel.distanceToCenter}</span>
                            </div>
                            <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30] mt-1 leading-snug">
                              {hotel.name}
                            </h4>
                            <p className="text-xs text-[#44474d] mt-1 line-clamp-1 font-medium">
                              {hotel.roomType}
                            </p>
                          </div>

                          {/* Amenities Tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {hotel.amenities.slice(0, 3).map((am, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-slate-100 text-[#44474d] text-[10px] font-medium"
                              >
                                {am}
                              </span>
                            ))}
                            {hotel.amenities.length > 3 && (
                              <span className="px-1.5 py-0.5 rounded bg-slate-50 text-[#74777e] text-[10px]">
                                +{hotel.amenities.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Pricing & Selection Footer */}
                      <div className="p-5 pt-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <div>
                          <div className="text-lg font-extrabold text-[#0b1c30]">
                            {formatPrice(hotel.pricePerNightUsd)}
                            <span className="text-[11px] font-normal text-[#74777e]"> / night</span>
                          </div>
                          <div className="text-[11px] text-[#74777e]">
                            Total {formatPrice(totalHotelPrice)} for {nightsCount} nights
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedHotelId(hotel.id);
                            setBookingSuccessMsg(`Hotel ${hotel.name} selected!`);
                          }}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                            isSelected
                              ? 'bg-[#0c1e34] text-white shadow-xs'
                              : 'bg-white text-[#0c1e34] border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            {isSelected ? 'check_circle' : 'hotel'}
                          </span>
                          <span>{isSelected ? 'Selected' : 'Select'}</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* COMBINED ITINERARY SUMMARY STICKY BAR */}
          <div className="sticky bottom-4 z-30 bg-[#0c1e34] text-white p-4 md:p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[#213145]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg">
                📋
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">
                    Selected Travel Package
                  </span>
                  {bookingSuccessMsg && (
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700">
                      {bookingSuccessMsg}
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#a0b3cf] mt-0.5 flex flex-wrap items-center gap-2">
                  <span>
                    Flight: <strong className="text-white">{selectedFlight ? `${selectedFlight.airline} (${selectedFlight.flightNumber})` : 'None chosen'}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Hotel: <strong className="text-white">{selectedHotel ? `${selectedHotel.name} (${nightsCount}n)` : 'None chosen'}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Total: <strong className="text-emerald-300 font-mono text-sm">{formatPrice(totalCombinedPriceUsd)}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <button
                type="button"
                onClick={() => onNavigateToTripIntelligence(destinationInput, startDateInput, returnDateInput)}
                className="w-full md:w-auto px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-[#0c1e34] transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Proceed to Trip Intelligence & Advisory</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

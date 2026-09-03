import React, { useState } from 'react';
import { DestinationData, PackingItem, TempUnit } from '../types';
import { useSeason } from '../context/SeasonContext';

interface PackingWeatherViewProps {
  destination: DestinationData;
  tempUnit: TempUnit;
  onSelectDestination: (id: string) => void;
}

export const PackingWeatherView: React.FC<PackingWeatherViewProps> = ({
  destination,
  tempUnit,
  onSelectDestination,
}) => {
  const { theme, season } = useSeason();
  const [packingItems, setPackingItems] = useState<PackingItem[]>(destination.packingList);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<'outerwear' | 'essentials' | 'tech-gear'>('outerwear');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync if destination changes
  React.useEffect(() => {
    setPackingItems(destination.packingList);
  }, [destination.id]);

  const toggleItem = (id: string) => {
    setPackingItems(prev =>
      prev.map(item => (item.id === id ? { ...item, packed: !item.packed } : item))
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: PackingItem = {
      id: `custom-${Date.now()}`,
      name: newItemName.trim(),
      category: newItemCategory,
      tag: 'Custom Addition',
      badge: 'Personal',
      packed: false,
      essential: false,
    };

    setPackingItems(prev => [newItem, ...prev]);
    setNewItemName('');
    showToast(`Added "${newItem.name}" to packing architecture.`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendToNotes = () => {
    const lines = [
      `VOYAGEPASS PACKING PROTOCOL: ${destination.city}, ${destination.country}`,
      `Dates: ${destination.travelDates} | Thermal: ${destination.weatherOverview.tempC}°C`,
      `----------------------------------------`,
      ...packingItems.map(
        item => `[${item.packed ? 'X' : ' '}] ${item.name} (${item.category.toUpperCase()})`
      ),
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    showToast('Copied packing protocol to clipboard for Apple Notes.');
  };

  const handlePrintProtocol = () => {
    window.print();
  };

  const packedCount = packingItems.filter(i => i.packed).length;
  const totalCount = packingItems.length;
  const completionPct = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  const convertTemp = (celsius: number) => {
    if (tempUnit === 'F') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return Math.round(celsius);
  };

  const outerwearItems = packingItems.filter(i => i.category === 'outerwear');
  const essentialItems = packingItems.filter(i => i.category === 'essentials');
  const techItems = packingItems.filter(i => i.category === 'tech-gear' || i.category === 'custom');

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0c1e34] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-[#97f5ca]/30 animate-bounce">
          <span className="material-symbols-outlined text-[18px] text-[#97f5ca]">check_circle</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Expedition Header & Quick Actions */}
      <div className={`bg-white rounded-3xl p-6 md:p-8 shadow-xs border transition-all ${theme.cardBorder}`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${theme.badge}`}>
                <span className={`w-2 h-2 rounded-full ${theme.pulseDot} animate-pulse`}></span>
                {theme.name} Expedition Dispatch Active
              </span>
              <span className="text-xs font-mono text-[#74777e]">Corridor #{destination.airportCode.split(' ')[0]}</span>
            </div>

            <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-extrabold text-[#0b1c30] tracking-tight flex items-center gap-2">
              <span>{destination.city}, {destination.country}</span>
              <span>{destination.countryFlag}</span>
            </h1>

            {/* Telemetry metadata tags */}
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs mt-3">
              <span className={`px-3 py-1 rounded-lg font-semibold border ${theme.accentLightBg} ${theme.accentBorder} text-[#0c1e34]`}>
                🗓️ {destination.travelDates}
              </span>
              <span className={`px-3 py-1 rounded-lg font-semibold border ${theme.accentLightBg} ${theme.accentBorder} text-[#0c1e34]`}>
                {theme.emoji} Thermal Window: {convertTemp(destination.weatherOverview.tempC)}° / {convertTemp(destination.weatherOverview.feelsLikeC)}°{tempUnit}
              </span>
              <span className={`px-3 py-1 rounded-lg font-semibold border ${theme.accentLightBg} ${theme.accentBorder} text-[#0c1e34]`}>
                ☀️ Solar Arc: {destination.weatherOverview.solarHours}
              </span>
              {destination.weatherOverview.auroraKp && (
                <span className="bg-[#002316] text-[#97f5ca] px-3 py-1 rounded-lg font-semibold border border-[#005139]">
                  ✨ Aurora KP: {destination.weatherOverview.auroraKp}
                </span>
              )}
            </div>
          </div>

          {/* Quick Actions Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleSendToNotes}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#eff4ff] text-[#0c1e34] hover:bg-[#dce9ff] border border-[#dce9ff] transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px] text-[#a0401c]">description</span>
              Send to Notes
            </button>
            <button
              onClick={handlePrintProtocol}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${theme.primaryBtn}`}
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Download Packing Protocol
            </button>
          </div>
        </div>
      </div>

      {/* Atmospheric Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Sub-Polar Low Pressure Matrix */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-xs border border-[#eff4ff]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#0c1e34]">storm</span>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
                  Atmospheric Telemetry Matrix
                </h3>
              </div>
              <p className="text-xs text-[#4f5f78]">{destination.weatherOverview.headline}</p>
            </div>
            <div className="text-right">
              <span className="font-mono text-xl font-extrabold text-[#0b1c30]">
                {convertTemp(destination.weatherOverview.tempC)}°{tempUnit}
              </span>
              <div className="text-[11px] text-[#a0401c] font-semibold">
                Feels like {convertTemp(destination.weatherOverview.feelsLikeC)}°{tempUnit} windchill
              </div>
            </div>
          </div>

          {/* Solar Zenith & Twilight Arc Visual */}
          <div className="bg-[#eff4ff] p-4 rounded-2xl border border-[#dce9ff] mb-4">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-bold text-[#0c1e34]">Solar Zenith & Twilight Arc</span>
              <span className="font-mono text-[#74777e]">{destination.weatherOverview.solarHours} Direct Daylight</span>
            </div>

            {/* Custom SVG Arc curve */}
            <div className="relative h-14 w-full flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 400 60" preserveAspectRatio="none">
                <path
                  d="M 10 50 Q 200 5 390 50"
                  fill="none"
                  stroke="#c4c6cd"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <circle cx="200" cy="18" r="7" fill="#fe875d" />
                <circle cx="200" cy="18" r="12" fill="#fe875d" fillOpacity="0.2" />
              </svg>
              <div className="absolute left-2 bottom-0 text-[10px] font-mono text-[#74777e]">
                🌅 Sunrise {destination.weatherOverview.sunriseTime}
              </div>
              <div className="absolute right-2 bottom-0 text-[10px] font-mono text-[#74777e]">
                🌇 Sunset {destination.weatherOverview.sunsetTime}
              </div>
            </div>
          </div>

          {/* 5-Day Forecast Scroller */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {destination.forecast7Days.slice(0, 5).map((d, i) => (
              <div
                key={i}
                className="bg-[#eff4ff] p-3 rounded-2xl border border-[#dce9ff] text-center flex flex-col justify-between"
              >
                <span className="text-xs font-bold text-[#4f5f78]">{d.day}</span>
                <span className="material-symbols-outlined text-[20px] text-[#0c1e34] my-1">
                  {d.icon}
                </span>
                <div className="text-xs font-bold text-[#0b1c30]">
                  {convertTemp(d.tempC)}°
                </div>
                <div className="text-[10px] text-[#74777e]">
                  {d.windKmh} km/h wind
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Coastal Wind Gust Profile & Warning */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#eff4ff] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#a0401c]">air</span>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
                  Wind Gust Profile
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-[#a0401c]">Peak 54 km/h</span>
            </div>

            <p className="text-xs text-[#44474d] mb-4">
              Hourly aerodynamic velocity models. Sustained gusts above 40 km/h require extreme vehicular caution.
            </p>

            {/* Bar chart */}
            <div className="h-32 bg-[#eff4ff] rounded-2xl p-3 border border-[#dce9ff] flex items-end justify-between gap-2">
              {(destination.windGustsHourly || [
                { hour: '06:00', gustKmh: 22 },
                { hour: '09:00', gustKmh: 30 },
                { hour: '12:00', gustKmh: 42 },
                { hour: '15:00', gustKmh: 54 },
                { hour: '18:00', gustKmh: 48 },
                { hour: '21:00', gustKmh: 36 },
                { hour: '00:00', gustKmh: 28 },
              ]).map((item, idx) => {
                const heightPct = Math.min(100, Math.round((item.gustKmh / 60) * 100));
                const isPeak = item.gustKmh >= 50;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t-md transition-all ${
                        isPeak ? 'bg-[#a0401c]' : 'bg-[#0c1e34]'
                      }`}
                      title={`${item.hour}: ${item.gustKmh} km/h`}
                    ></div>
                    <span className="text-[9px] font-mono text-[#74777e] mt-1 truncate">
                      {item.hour}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#ffdbcf]/50 border border-[#ffdbcf] p-3 rounded-2xl mt-4 text-[11px] text-[#722200] flex items-start gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#a0401c] shrink-0 mt-0.5">warning</span>
            <span>Always hold car doors with two hands when opening in high coastal winds. Hinges bend outward on unsheltered headlands.</span>
          </div>
        </div>

      </div>

      {/* Intelligent Packing Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Checklist & Interactive Form */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#eff4ff]">
            {/* Progress and status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
                  Intelligent Packing Architecture
                </h3>
                <p className="text-xs text-[#4f5f78]">Verified gear requirements based on current microclimate</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-[#0c1e34]">
                  {packedCount} of {totalCount} Packed ({completionPct}%)
                </span>
                <div className="w-40 h-2 bg-[#eff4ff] rounded-full overflow-hidden mt-1 border border-[#dce9ff]">
                  <div
                    style={{ width: `${completionPct}%` }}
                    className="h-full bg-[#0c1e34] rounded-full transition-all duration-300"
                  ></div>
                </div>
              </div>
            </div>

            {/* Quick Add Item Form */}
            <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row gap-2 mb-6 p-3 bg-[#eff4ff] rounded-2xl border border-[#dce9ff]">
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Add custom travel gear item..."
                className="flex-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#dce9ff] text-[#0b1c30] focus:outline-hidden focus:ring-1 focus:ring-[#0c1e34]"
              />
              <select
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value as any)}
                className="px-3 py-2 text-xs bg-white rounded-xl border border-[#dce9ff] text-[#0b1c30] font-medium"
              >
                <option value="outerwear">Outerwear & Armor</option>
                <option value="essentials">Cultural & Essentials</option>
                <option value="tech-gear">Tech & Ice Navigation</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0c1e34] hover:bg-[#213145] text-white text-xs font-bold rounded-xl transition-colors shrink-0"
              >
                + Add Item
              </button>
            </form>

            {/* Category 1: Outerwear & Weather Armoring */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[18px] text-[#0c1e34]">shield</span>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#0c1e34]">
                  Outerwear & Weather Armoring
                </h4>
                <span className="text-[10px] font-mono text-[#74777e]">
                  ({outerwearItems.filter(i => i.packed).length}/{outerwearItems.length})
                </span>
              </div>

              <div className="space-y-2">
                {outerwearItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      item.packed
                        ? 'bg-[#eff4ff]/60 border-[#dce9ff] opacity-75'
                        : 'bg-white border-[#dce9ff] hover:border-[#74777e]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.packed}
                        onChange={() => {}}
                        className="accent-[#0c1e34] rounded"
                      />
                      <div>
                        <span className={`text-xs font-semibold ${item.packed ? 'line-through text-[#74777e]' : 'text-[#0b1c30]'}`}>
                          {item.name}
                        </span>
                        {item.tag && (
                          <span className="block text-[10px] text-[#74777e]">{item.tag}</span>
                        )}
                      </div>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#0c1e34] border border-[#dce9ff]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Category 2: Cultural Protocol & Everyday Essentials */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[18px] text-[#a0401c]">hot_tub</span>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#0c1e34]">
                  Cultural Protocol & Everyday Essentials
                </h4>
                <span className="text-[10px] font-mono text-[#74777e]">
                  ({essentialItems.filter(i => i.packed).length}/{essentialItems.length})
                </span>
              </div>

              <div className="space-y-2">
                {essentialItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      item.packed
                        ? 'bg-[#eff4ff]/60 border-[#dce9ff] opacity-75'
                        : 'bg-white border-[#dce9ff] hover:border-[#74777e]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.packed}
                        onChange={() => {}}
                        className="accent-[#0c1e34] rounded"
                      />
                      <div>
                        <span className={`text-xs font-semibold ${item.packed ? 'line-through text-[#74777e]' : 'text-[#0b1c30]'}`}>
                          {item.name}
                        </span>
                        {item.tag && (
                          <span className="block text-[10px] text-[#74777e]">{item.tag}</span>
                        )}
                      </div>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#ffdbcf] text-[#a0401c]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Category 3: Tech & Ice Navigation Gear */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[18px] text-[#0c1e34]">electric_bolt</span>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#0c1e34]">
                  Tech & Specialized Hardware
                </h4>
                <span className="text-[10px] font-mono text-[#74777e]">
                  ({techItems.filter(i => i.packed).length}/{techItems.length})
                </span>
              </div>

              <div className="space-y-2">
                {techItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      item.packed
                        ? 'bg-[#eff4ff]/60 border-[#dce9ff] opacity-75'
                        : 'bg-white border-[#dce9ff] hover:border-[#74777e]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.packed}
                        onChange={() => {}}
                        className="accent-[#0c1e34] rounded"
                      />
                      <div>
                        <span className={`text-xs font-semibold ${item.packed ? 'line-through text-[#74777e]' : 'text-[#0b1c30]'}`}>
                          {item.name}
                        </span>
                        {item.tag && (
                          <span className="block text-[10px] text-[#74777e]">{item.tag}</span>
                        )}
                      </div>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#0c1e34] border border-[#dce9ff]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right 1 Col: Three-Shell Doctrine, Weight Telemetry, Field Photo */}
        <div className="space-y-6">
          
          {/* Ballast & Baggage Mass Telemetry */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#eff4ff]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0b1c30]">
                Baggage Mass & Payload Limit
              </h4>
              <span className="material-symbols-outlined text-[18px] text-[#0c1e34]">scale</span>
            </div>

            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs text-[#74777e]">Estimated Mass:</span>
              <span className="font-mono text-base font-extrabold text-[#0b1c30]">
                {destination.packingWeightKg} kg / {Math.round(destination.packingWeightKg * 2.20462)} lbs
              </span>
            </div>

            <div className="w-full h-3 bg-[#eff4ff] rounded-full overflow-hidden border border-[#dce9ff] mb-2">
              <div
                style={{ width: `${Math.round((destination.packingWeightKg / destination.packingMaxKg) * 100)}%` }}
                className="h-full bg-[#0c1e34] rounded-full"
              ></div>
            </div>

            <div className="flex justify-between text-[10px] font-mono text-[#74777e]">
              <span>Current: {Math.round((destination.packingWeightKg / destination.packingMaxKg) * 100)}%</span>
              <span>Max Allowance: {destination.packingMaxKg} kg</span>
            </div>
          </div>

          {/* Three-Shell Doctrine */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#eff4ff]">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[20px] text-[#a0401c]">layers</span>
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0b1c30]">
                The Three-Shell Doctrine
              </h4>
            </div>

            <p className="text-xs text-[#44474d] mb-4 leading-relaxed">
              Standard Nordic sub-polar layering protocol designed to prevent sweat chilling and hypothermia:
            </p>

            <div className="space-y-3">
              <div className="p-3 bg-[#eff4ff] rounded-2xl border border-[#dce9ff]">
                <div className="flex items-center justify-between text-xs font-bold text-[#0c1e34]">
                  <span>Layer 1: Merino Base</span>
                  <span className="text-[10px] text-[#369571]">Moisture Wicking</span>
                </div>
                <p className="text-[11px] text-[#44474d] mt-1">
                  250g midweight merino wool close to skin. Keeps sweat off body during glacier walks.
                </p>
              </div>

              <div className="p-3 bg-[#eff4ff] rounded-2xl border border-[#dce9ff]">
                <div className="flex items-center justify-between text-xs font-bold text-[#0c1e34]">
                  <span>Layer 2: Insulating Loft</span>
                  <span className="text-[10px] text-[#a0401c]">Thermal Trap</span>
                </div>
                <p className="text-[11px] text-[#44474d] mt-1">
                  800-fill hydrophobic down or high-loft fleece sweater trapping body warmth.
                </p>
              </div>

              <div className="p-3 bg-[#eff4ff] rounded-2xl border border-[#dce9ff]">
                <div className="flex items-center justify-between text-xs font-bold text-[#0c1e34]">
                  <span>Layer 3: Technical Armor</span>
                  <span className="text-[10px] text-[#0c1e34]">28,000mm Shell</span>
                </div>
                <p className="text-[11px] text-[#44474d] mt-1">
                  Windproof and waterproof hardshell repelling rain, sleet, and gale-force drafts.
                </p>
              </div>
            </div>
          </div>

          {/* Field Tested Photo & Protocol */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xs border border-[#eff4ff]">
            <div className="h-44 w-full relative">
              <img
                src={destination.regionalMapImage || destination.heroImage}
                alt="Field Tested Location"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1e34] via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#97f5ca]">
                  Field Tested Terrain
                </span>
                <h5 className="font-bold text-xs">{destination.city} Coastal Ridge</h5>
              </div>
            </div>
            <div className="p-4 text-xs text-[#44474d] leading-relaxed">
              Temperatures on exposed sea cliffs drop by an additional 5°C due to laminar windchill. Fast-track crampons before descending onto slick basalt sand.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

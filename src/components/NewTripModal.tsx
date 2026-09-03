import React, { useState } from 'react';
import { DestinationData, TripSummary } from '../types';

interface NewTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  allDestinations: Record<string, DestinationData>;
  onAddTrip: (newTrip: TripSummary, destinationId: string) => void;
}

export const NewTripModal: React.FC<NewTripModalProps> = ({
  isOpen,
  onClose,
  allDestinations,
  onAddTrip,
}) => {
  const [selectedDestKey, setSelectedDestKey] = useState<string>('tokyo');
  const [customTitle, setCustomTitle] = useState('');
  const [customDates, setCustomDates] = useState('Nov 20 - Dec 04, 2025');
  const [durationStr, setDurationStr] = useState('14 Days');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dest = allDestinations[selectedDestKey];
    if (!dest) return;

    const newTrip: TripSummary = {
      id: `trip-${Date.now()}`,
      destinationId: dest.id,
      title: customTitle.trim() || `${dest.city} Sovereign Expedition`,
      dates: customDates,
      duration: durationStr,
      daysRemaining: 42,
      countryFlag: dest.countryFlag,
      heroImage: dest.heroImage,
      visaStatus: dest.entryStatusSummary,
      packedCount: 0,
      totalPackCount: dest.packingList.length,
      weatherSummary: `${dest.typicalClimateTempC}°C Expected`
    };

    onAddTrip(newTrip, dest.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#00040d]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-[#eff4ff]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl text-[#0b1c30]">
              Plan New Flight Corridor
            </h3>
            <p className="text-xs text-[#4f5f78] mt-0.5">Initialize consular telemetry and gear manifests</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#74777e] hover:text-[#0b1c30] hover:bg-[#eff4ff]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0c1e34] mb-1.5 uppercase tracking-wider">
              Select Destination Hub
            </label>
            <select
              value={selectedDestKey}
              onChange={(e) => setSelectedDestKey(e.target.value)}
              className="w-full p-3 rounded-xl border border-[#dce9ff] text-xs font-semibold bg-[#eff4ff] text-[#0b1c30]"
            >
              {(Object.values(allDestinations) as DestinationData[]).map(d => (
                <option key={d.id} value={d.id}>
                  {d.countryFlag} {d.city}, {d.country} ({d.airportCode})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0c1e34] mb-1.5 uppercase tracking-wider">
              Expedition Title
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="e.g. Tokyo Autumn Cultural Run"
              className="w-full p-3 rounded-xl border border-[#dce9ff] text-xs bg-[#eff4ff] text-[#0b1c30] font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0c1e34] mb-1.5 uppercase tracking-wider">
                Travel Window Dates
              </label>
              <input
                type="text"
                value={customDates}
                onChange={(e) => setCustomDates(e.target.value)}
                placeholder="Oct 14 - Oct 28"
                className="w-full p-3 rounded-xl border border-[#dce9ff] text-xs bg-[#eff4ff] text-[#0b1c30] font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0c1e34] mb-1.5 uppercase tracking-wider">
                Duration
              </label>
              <input
                type="text"
                value={durationStr}
                onChange={(e) => setDurationStr(e.target.value)}
                placeholder="14 Days"
                className="w-full p-3 rounded-xl border border-[#dce9ff] text-xs bg-[#eff4ff] text-[#0b1c30] font-medium"
              />
            </div>
          </div>

          <div className="p-3 bg-[#eff4ff] rounded-2xl border border-[#dce9ff] text-xs text-[#44474d] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#369571]">verified_user</span>
            <span>Pre-clearing sovereign entry requirements and 7-day microclimate projections.</span>
          </div>

          <div className="pt-3 border-t border-[#eff4ff] flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-xs font-semibold border border-[#dce9ff] text-[#44474d] hover:bg-[#eff4ff]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl text-xs font-bold bg-[#0c1e34] text-white hover:bg-[#213145] transition-colors shadow-xs"
            >
              Initialize Corridor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

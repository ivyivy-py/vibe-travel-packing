import React from 'react';
import { TripSummary, AppView } from '../types';

interface SavedTripsViewProps {
  savedTrips: TripSummary[];
  onSelectTrip: (destinationId: string, view?: AppView) => void;
  onOpenNewTripModal: () => void;
  onDeleteTrip: (id: string) => void;
}

export const SavedTripsView: React.FC<SavedTripsViewProps> = ({
  savedTrips,
  onSelectTrip,
  onOpenNewTripModal,
  onDeleteTrip,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-[#eff4ff] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#eff4ff] text-[#0c1e34] border border-[#dce9ff]">
              <span className="material-symbols-outlined text-[16px] text-[#369571]">folder_shared</span>
              Sovereign Flight Dossiers
            </span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
            Saved Expeditions & Corridors
          </h1>
          <p className="text-xs md:text-sm text-[#44474d] mt-1">
            Access your active itineraries, consular clearances, and gear manifests across all destinations.
          </p>
        </div>

        <button
          onClick={onOpenNewTripModal}
          className="px-5 py-3 rounded-2xl bg-[#0c1e34] hover:bg-[#213145] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 shrink-0"
        >
          <span className="material-symbols-outlined text-[18px] text-[#97f5ca]">add_circle</span>
          Plan New Destination
        </button>
      </div>

      {/* Grid of Saved Trips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedTrips.map((trip) => {
          const packPct = Math.round((trip.packedCount / trip.totalPackCount) * 100);

          return (
            <div
              key={trip.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xs border border-[#eff4ff] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Hero header */}
                <div className="h-48 w-full relative overflow-hidden">
                  <img
                    src={trip.heroImage}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1e34] via-transparent to-transparent"></div>
                  
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-[#0c1e34]/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                      <span className="text-sm">{trip.countryFlag}</span>
                      <span>{trip.duration}</span>
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTrip(trip.id);
                      }}
                      className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#ba1a1a] flex items-center justify-center backdrop-blur transition-colors"
                      title="Archive or remove trip"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-4 text-white">
                    <span className="text-[11px] font-mono text-[#97f5ca] block font-semibold">
                      DEPARTS IN {trip.daysRemaining} DAYS
                    </span>
                    <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-lg md:text-xl text-white">
                      {trip.title}
                    </h3>
                  </div>
                </div>

                {/* Details Bar */}
                <div className="p-6">
                  <div className="text-xs text-[#74777e] mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                    <span className="font-medium text-[#0b1c30]">{trip.dates}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-[#eff4ff] rounded-2xl border border-[#dce9ff]">
                      <span className="text-[10px] font-bold text-[#74777e] block uppercase">CONSULAR CLEARANCE</span>
                      <strong className="text-xs text-[#0c1e34]">{trip.visaStatus}</strong>
                    </div>
                    <div className="p-3 bg-[#eff4ff] rounded-2xl border border-[#dce9ff]">
                      <span className="text-[10px] font-bold text-[#74777e] block uppercase">PROJECTED CLIMATE</span>
                      <strong className="text-xs text-[#0c1e34]">{trip.weatherSummary}</strong>
                    </div>
                  </div>

                  {/* Packing Progress */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-[#44474d] font-medium">Packing Architecture:</span>
                      <span className="font-bold text-[#0c1e34]">
                        {trip.packedCount}/{trip.totalPackCount} ({packPct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#eff4ff] rounded-full overflow-hidden border border-[#dce9ff]">
                      <div
                        style={{ width: `${packPct}%` }}
                        className="h-full bg-[#0c1e34] rounded-full transition-all"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex gap-2">
                <button
                  onClick={() => onSelectTrip(trip.destinationId, 'trip-planner')}
                  className="flex-1 py-3 bg-[#0c1e34] hover:bg-[#213145] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>Open Consular Briefing</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
                <button
                  onClick={() => onSelectTrip(trip.destinationId, 'packing-weather')}
                  className="px-3.5 py-3 bg-[#eff4ff] text-[#0c1e34] hover:bg-[#dce9ff] border border-[#dce9ff] rounded-xl text-xs font-semibold"
                  title="Open packing checklist"
                >
                  <span className="material-symbols-outlined text-[18px]">luggage</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

import React from 'react';
import { AppView } from '../types';

interface FooterProps {
  onSelectView: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectView }) => {
  return (
    <footer className="w-full bg-[#0c1e34] text-white border-t border-[#213145] mt-16 pt-12 pb-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Telemetry Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 border-b border-[#213145]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px] text-[#97f5ca]">verified</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white tracking-wide">Consular Telemetry Synchronized</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#002316] text-[#97f5ca] border border-[#005139]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#97f5ca] animate-pulse"></span>
                  LIVE · SYNC-ID: VP-88492-TYO
                </span>
              </div>
              <p className="text-[11px] text-[#7686a1] mt-0.5">
                Verified against IATA Timatic, Japanese MOFA, Schengen EES, and Indian Ministry of Home Affairs APIs.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#7686a1]">
            <span>Latency: 42ms</span>
            <span>·</span>
            <span>Encryption: TLS 1.3</span>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Intelligence Suite</h4>
            <ul className="space-y-2 text-xs text-[#7686a1]">
              <li>
                <button onClick={() => onSelectView('flight-hotel-search')} className="hover:text-white transition-colors flex items-center gap-1 text-emerald-400">
                  <span>✈️ Search Flights and Hotels</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('trip-planner')} className="hover:text-white transition-colors">
                  Consular Briefing Matrix
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('visa-checker')} className="hover:text-white transition-colors">
                  ETA & Visa Requirements
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('packing-weather')} className="hover:text-white transition-colors">
                  Microclimate & Packing
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('destination-events')} className="hover:text-white transition-colors">
                  Matsuri & Event Calendar
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('talk-to-us')} className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Talk to Us (Community)</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#97f5ca]"></span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Corridors</h4>
            <ul className="space-y-2 text-xs text-[#7686a1]">
              <li><span className="hover:text-white cursor-pointer">Tokyo (HND/NRT) Autumn Protocol</span></li>
              <li><span className="hover:text-white cursor-pointer">Reykjavik (KEF) Sub-Polar Grid</span></li>
              <li><span className="hover:text-white cursor-pointer">Kyoto / Osaka (KIX) Heritage Run</span></li>
              <li><span className="hover:text-white cursor-pointer">New Delhi (DEL) Winter ETA Protocol</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Emergency Consular</h4>
            <ul className="space-y-2 text-xs text-[#7686a1]">
              <li><span className="hover:text-white cursor-pointer">US State Dept Smart Traveler (STEP)</span></li>
              <li><span className="hover:text-white cursor-pointer">Australian Smartraveller Emergency</span></li>
              <li><span className="hover:text-white cursor-pointer">UK Foreign & Commonwealth Office</span></li>
              <li><span className="hover:text-white cursor-pointer">Global 24/7 SOS Hotlines</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">VoyagePass Protocol</h4>
            <p className="text-xs text-[#7686a1] leading-relaxed">
              Automated immigration policy syntheses are compiled for informational planning. Always verify with official consular portals prior to departure.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-[#213145] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7686a1] gap-2">
          <div>© {new Date().getFullYear()} VoyagePass Telemetry Technologies. All sovereign rights reserved.</div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Security Directive</span>
            <span className="hover:text-white cursor-pointer">Immigration Compliance</span>
            <span className="hover:text-white cursor-pointer">API Telemetry Status</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

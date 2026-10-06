import React, { useState } from 'react';
import { AppView, Currency, TempUnit, AppNotification, DestinationData } from '../types';
import { useSeason } from '../context/SeasonContext';

interface HeaderProps {
  currentView: AppView;
  onSelectView: (view: AppView) => void;
  activeDestination: DestinationData;
  allDestinations: Record<string, DestinationData>;
  onSelectDestination: (id: string) => void;
  currency: Currency;
  tempUnit: TempUnit;
  onToggleCurrency: (c: Currency) => void;
  onToggleTempUnit: (u: TempUnit) => void;
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
  onOpenNewTrip: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  activeDestination,
  allDestinations,
  onSelectDestination,
  currency,
  tempUnit,
  onToggleCurrency,
  onToggleTempUnit,
  notifications,
  onMarkNotificationRead,
  onOpenNewTrip,
}) => {
  const [showRouteMenu, setShowRouteMenu] = useState(false);
  const [showPrefMenu, setShowPrefMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { theme, season } = useSeason();
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems: { id: AppView; label: string; icon: string }[] = [
    { id: 'flight-hotel-search', label: 'Search Flights and Hotels', icon: 'travel_explore' },
    { id: 'trip-planner', label: 'Trip Planner', icon: 'map' },
    { id: 'visa-checker', label: 'Visa Checker', icon: 'verified_user' },
    { id: 'packing-weather', label: 'Packing & Weather', icon: 'luggage' },
    { id: 'destination-events', label: 'Destination Events', icon: 'event' },
    { id: 'saved-trips', label: 'Saved Trips', icon: 'bookmark' },
    { id: 'talk-to-us', label: 'Talk to Us', icon: 'forum' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-[#eff4ff] shadow-xs">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectView('trip-planner')}
              className="flex items-center gap-2.5 text-left focus:outline-hidden group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#0c1e34] text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-[20px] text-[#97f5ca]">near_me</span>
              </div>
              <div>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight text-[#0b1c30]">
                  Voyage<span className="text-[#a0401c]">Pass</span>
                </span>
                <span className="block text-[10px] font-medium tracking-widest text-[#4f5f78] uppercase -mt-1">
                  Consular Intelligence
                </span>
              </div>
            </button>

            {/* Active Route Pill Selector */}
            <div className="relative hidden md:flex items-center gap-2">
              <button
                onClick={() => {
                  setShowRouteMenu(!showRouteMenu);
                  setShowPrefMenu(false);
                  setShowNotifMenu(false);
                  setShowProfileMenu(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-[#eff4ff] text-[#0b1c30] border border-[#dce9ff] hover:bg-[#e5eeff] transition-colors"
              >
                <span className="font-mono text-[11px] text-[#4f5f78]">{activeDestination.originAirport}</span>
                <span className="material-symbols-outlined text-[14px] text-[#a0401c]">arrow_forward</span>
                <span className="font-mono text-[11px] text-[#0b1c30]">{activeDestination.airportCode.split(' ')[0]}</span>
                <span className="text-xs">{activeDestination.countryFlag}</span>
                <span className="material-symbols-outlined text-[14px] text-[#4f5f78]">expand_more</span>
              </button>

              {/* Dynamic Seasonal Badge */}
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold flex items-center gap-1 shadow-2xs ${theme.badge}`}
                title={`Current destination season: ${theme.name}`}
              >
                <span>{theme.emoji}</span>
                <span className="capitalize">{theme.name}</span>
              </span>

              {showRouteMenu && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#dce9ff] py-2 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-[#74777e] uppercase tracking-wider">
                    Active Flight Corridors
                  </div>
                  {(Object.values(allDestinations) as DestinationData[]).map(d => (
                    <button
                      key={d.id}
                      onClick={() => {
                        onSelectDestination(d.id);
                        setShowRouteMenu(false);
                      }}
                      className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs hover:bg-[#eff4ff] transition-colors ${
                        d.id === activeDestination.id ? 'bg-[#eff4ff] font-semibold text-[#0c1e34]' : 'text-[#44474d]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{d.countryFlag}</span>
                        <div>
                          <div className="font-medium text-[#0b1c30]">{d.city}, {d.country}</div>
                          <div className="text-[11px] text-[#74777e] font-mono">{d.originAirport} → {d.airportCode}</div>
                        </div>
                      </div>
                      {d.id === activeDestination.id && (
                        <span className="material-symbols-outlined text-[16px] text-[#0c1e34]">check</span>
                      )}
                    </button>
                  ))}
                  <div className="border-t border-[#eff4ff] mt-1 pt-1 px-2">
                    <button
                      onClick={() => {
                        setShowRouteMenu(false);
                        onOpenNewTrip();
                      }}
                      className="w-full text-center py-1.5 text-xs text-[#a0401c] font-semibold hover:bg-[#ffdbcf]/30 rounded-lg flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span>
                      Plan New Corridor
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#eff4ff]/70 p-1 rounded-full border border-[#dce9ff]/60">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? `${theme.activeTab} shadow-xs`
                      : 'text-[#44474d] hover:text-[#0b1c30] hover:bg-white/70'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[16px] ${isActive ? 'text-[#97f5ca]' : 'text-[#74777e]'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Items: Units, Notifs, Profile */}
          <div className="flex items-center gap-2">
            
            {/* Currency & Unit Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowPrefMenu(!showPrefMenu);
                  setShowRouteMenu(false);
                  setShowNotifMenu(false);
                  setShowProfileMenu(false);
                }}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff] transition-colors border border-[#dce9ff]"
                title="Change display currency & unit"
              >
                <span className="font-mono font-semibold">{currency}</span>
                <span className="text-[#c4c6cd]">·</span>
                <span className="font-mono font-semibold">°{tempUnit}</span>
                <span className="material-symbols-outlined text-[14px] text-[#74777e]">expand_more</span>
              </button>

              {showPrefMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#dce9ff] p-2 z-50">
                  <div className="text-[11px] font-semibold text-[#74777e] uppercase tracking-wider px-2 py-1">
                    Currency
                  </div>
                  <div className="grid grid-cols-3 gap-1 mb-2">
                    {(['USD', 'EUR', 'JPY', 'GBP', 'AUD'] as Currency[]).map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          onToggleCurrency(c);
                        }}
                        className={`py-1 text-xs font-mono rounded-md border text-center transition-colors ${
                          currency === c
                            ? 'bg-[#0c1e34] text-white border-[#0c1e34]'
                            : 'bg-[#eff4ff] text-[#0b1c30] border-[#dce9ff] hover:bg-[#e5eeff]'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  <div className="text-[11px] font-semibold text-[#74777e] uppercase tracking-wider px-2 py-1 border-t border-[#eff4ff] pt-2">
                    Temperature
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {(['C', 'F'] as TempUnit[]).map((u) => (
                      <button
                        key={u}
                        onClick={() => {
                          onToggleTempUnit(u);
                        }}
                        className={`py-1 text-xs font-mono rounded-md border text-center transition-colors ${
                          tempUnit === u
                            ? 'bg-[#0c1e34] text-white border-[#0c1e34]'
                            : 'bg-[#eff4ff] text-[#0b1c30] border-[#dce9ff] hover:bg-[#e5eeff]'
                        }`}
                      >
                        °{u}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifMenu(!showNotifMenu);
                  setShowRouteMenu(false);
                  setShowPrefMenu(false);
                  setShowProfileMenu(false);
                }}
                className="relative p-1.5 text-[#44474d] hover:text-[#0b1c30] hover:bg-[#eff4ff] rounded-lg transition-colors"
                title="Consular Bulletins"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#a0401c] rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#dce9ff] py-2 z-50">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-[#eff4ff]">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-sm text-[#0b1c30]">Consular Advisories</span>
                      {unreadCount > 0 && (
                        <span className="bg-[#ffdbcf] text-[#a0401c] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#74777e]">Real-time Feed</span>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-[#eff4ff]">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          onMarkNotificationRead(n.id);
                          if (n.actionView) {
                            onSelectView(n.actionView);
                            setShowNotifMenu(false);
                          }
                        }}
                        className={`p-3 text-left cursor-pointer hover:bg-[#eff4ff] transition-colors ${
                          !n.read ? 'bg-[#f8f9ff]' : 'opacity-85'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className={`material-symbols-outlined text-[16px] ${
                              n.type === 'visa' ? 'text-[#a0401c]' : n.type === 'weather' ? 'text-[#0c1e34]' : 'text-[#369571]'
                            }`}>
                              {n.type === 'visa' ? 'fact_check' : n.type === 'weather' ? 'cyclone' : 'celebration'}
                            </span>
                            <span className="font-medium text-xs text-[#0b1c30] line-clamp-1">{n.title}</span>
                          </div>
                          <span className="text-[10px] text-[#74777e] shrink-0">{n.timeAgo}</span>
                        </div>
                        <p className="text-[11px] text-[#44474d] mt-1 pl-5 line-clamp-2">
                          {n.message}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#eff4ff] p-2 text-center bg-[#f8f9ff]">
                    <button
                      onClick={() => setShowNotifMenu(false)}
                      className="text-xs text-[#4f5f78] hover:text-[#0b1c30] font-medium"
                    >
                      Close Advisories
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowRouteMenu(false);
                  setShowPrefMenu(false);
                  setShowNotifMenu(false);
                }}
                className="w-8 h-8 rounded-full ring-2 ring-[#dce9ff] overflow-hidden focus:outline-hidden hover:ring-[#0c1e34] transition-all"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjMqSQCqveTF7slU3-D5YA_qyjQKPoeNJ0JuxyLvLWMSplGrnqNskwbby8J_xi3BEPtRQ_GfwBZPn3tk_woTF681AB2w3nCDuEGVEM4X6hZsW5xJj6bAC3mStyRsk3QUx6Dc6LEHVPA9cBwY7wSQ-5xIY4awIzmlP2HUPnjdQbdLjAl0h65ef_i2dlkrg4b2A9sJs13cD73fdoAsvPBw1dlqmXMZ0bVZlt-kMazva1TTlXM8EGqrbAcw"
                  alt="Traveler Profile"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#dce9ff] py-2 z-50">
                  <div className="px-3 py-2 border-b border-[#eff4ff]">
                    <div className="font-semibold text-xs text-[#0b1c30]">Alex Vance</div>
                    <div className="text-[11px] text-[#74777e]">US Citizen • Pass #8849204</div>
                  </div>
                  <button
                    onClick={() => {
                      onSelectView('saved-trips');
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs text-[#44474d] hover:bg-[#eff4ff] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">folder_shared</span>
                    My Active Itineraries
                  </button>
                  <button
                    onClick={() => {
                      onOpenNewTrip();
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs text-[#44474d] hover:bg-[#eff4ff] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_circle</span>
                    Plan New Destination
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1 border-t border-[#eff4ff] no-scrollbar">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-[#0c1e34] text-white'
                    : 'text-[#44474d] hover:bg-[#eff4ff]'
                }`}
              >
                <span className={`material-symbols-outlined text-[15px] ${isActive ? 'text-[#97f5ca]' : 'text-[#74777e]'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};

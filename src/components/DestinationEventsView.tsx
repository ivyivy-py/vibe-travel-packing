import React, { useState } from 'react';
import { DestinationData, TravelEvent } from '../types';

interface DestinationEventsViewProps {
  destination: DestinationData;
  onSelectDestination: (id: string) => void;
}

export const DestinationEventsView: React.FC<DestinationEventsViewProps> = ({
  destination,
  onSelectDestination,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [transitFilter, setTransitFilter] = useState<number>(60);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(['ke_feat', 'ke1', 'e1', 'e3']));
  const [itineraryList, setItineraryList] = useState<TravelEvent[]>([
    destination.featuredEvent || destination.eventsList[0],
    ...destination.eventsList.filter(e => e.inItinerary)
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Removed from saved bookmarks.');
      } else {
        next.add(id);
        showToast('Saved to personal travel bookmarks.');
      }
      return next;
    });
  };

  const toggleItinerary = (event: TravelEvent) => {
    if (itineraryList.some(e => e.id === event.id)) {
      setItineraryList(prev => prev.filter(e => e.id !== event.id));
      showToast(`Removed "${event.title}" from active itinerary.`);
    } else {
      setItineraryList(prev => [...prev, event]);
      showToast(`Added "${event.title}" to active itinerary.`);
    }
  };

  const handleExportIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//VoyagePass//Travel Advisory Protocol//EN',
      ...itineraryList.map(e => [
        'BEGIN:VEVENT',
        `SUMMARY:${e.title}`,
        `DESCRIPTION:${e.description}`,
        `LOCATION:${e.location}`,
        `STATUS:CONFIRMED`,
        'END:VEVENT'
      ].join('\n')),
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `VoyagePass_${destination.city}_Events.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded .ICS itinerary calendar file.');
  };

  const handleSyncGoogle = () => {
    showToast('Google Calendar synchronization link initiated.');
  };

  // Filter events
  const allAvailableEvents = [
    ...(destination.featuredEvent ? [destination.featuredEvent] : []),
    ...destination.eventsList
  ];

  const filteredEvents = allAvailableEvents.filter(e => {
    const matchesCat = selectedCategory === 'all' || e.category === selectedCategory;
    const matchesTransit = e.transitTimeMin <= transitFilter;
    return matchesCat && matchesTransit;
  });

  const featured = destination.featuredEvent || destination.eventsList[0];

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0c1e34] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-[#97f5ca]/30 animate-bounce">
          <span className="material-symbols-outlined text-[18px] text-[#97f5ca]">check_circle</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header & Calendar Sync Bar */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-[#eff4ff]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#002316] text-[#97f5ca] border border-[#005139]">
                <span className="w-2 h-2 rounded-full bg-[#97f5ca] animate-pulse"></span>
                Cultural Telemetry Active
              </span>
              <span className="text-xs font-mono text-[#74777e]">Synced with Kansai Regional Board</span>
            </div>

            <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-extrabold text-[#0b1c30] tracking-tight flex items-center gap-2">
              <span>{destination.city} Cultural Calendar</span>
              <span>{destination.countryFlag}</span>
            </h1>

            <p className="text-xs md:text-sm text-[#44474d] mt-1">
              Active window: {destination.travelDates} ({destination.durationDays} Days Active). Curated imperial festivals, evening temple illuminations, and local food alleys.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleSyncGoogle}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#eff4ff] text-[#0c1e34] hover:bg-[#dce9ff] border border-[#dce9ff] transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px] text-[#a0401c]">sync</span>
              Sync Google Calendar
            </button>
            <button
              onClick={handleExportIcs}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0c1e34] hover:bg-[#213145] text-white transition-all shadow-xs flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px] text-[#97f5ca]">calendar_add_on</span>
              Export .ICS File ({itineraryList.length})
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Timeline Control Rig */}
      <div className="bg-white rounded-3xl p-5 md:p-6 shadow-xs border border-[#eff4ff]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {[
              { id: 'all', label: 'All Events' },
              { id: 'matsuri', label: 'Traditional Matsuri' },
              { id: 'foliage', label: 'Autumn Foliage' },
              { id: 'food', label: 'Food & Night Markets' },
              { id: 'arts', label: 'Music & Visual Arts' },
            ].map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#0c1e34] text-white shadow-xs'
                      : 'bg-[#eff4ff] text-[#44474d] hover:bg-[#dce9ff]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Transit Proximity Radius filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-[#74777e] uppercase tracking-wider text-[10px]">Transit Radius:</span>
            <div className="flex items-center gap-1 bg-[#eff4ff] p-1 rounded-xl border border-[#dce9ff]">
              {[
                { min: 25, label: '< 30m' },
                { min: 45, label: '< 45m Express' },
                { min: 60, label: 'All Regional' },
              ].map((r) => (
                <button
                  key={r.min}
                  onClick={() => setTransitFilter(r.min)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    transitFilter === r.min
                      ? 'bg-[#0c1e34] text-white'
                      : 'text-[#44474d] hover:text-[#0b1c30]'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Curated Featured Event Hero Banner */}
      {featured && (
        <div className="bg-white rounded-3xl overflow-hidden shadow-xs border border-[#eff4ff]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            <div className="lg:col-span-7 h-72 lg:h-auto min-h-[300px] relative overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-[#0c1e34]/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full">
                  Featured Seasonal Spectacle
                </span>
                <span className="bg-[#002316]/90 backdrop-blur text-[#97f5ca] text-xs font-bold px-3 py-1 rounded-full border border-[#005139]">
                  Reserved Seating Available
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#a0401c]">
                    {featured.categoryLabel}
                  </span>
                  <button
                    onClick={() => toggleBookmark(featured.id)}
                    className="p-1.5 rounded-full hover:bg-[#eff4ff] text-[#0c1e34] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {bookmarkedIds.has(featured.id) ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>
                </div>

                <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl md:text-2xl text-[#0b1c30] mb-2">
                  {featured.title}
                </h3>

                <p className="text-xs text-[#44474d] leading-relaxed mb-4">
                  {featured.description}
                </p>

                <div className="grid grid-cols-2 gap-2 bg-[#eff4ff] p-3 rounded-2xl border border-[#dce9ff] text-xs mb-4">
                  <div>
                    <span className="text-[10px] text-[#74777e] block font-mono uppercase">DATE & TIME</span>
                    <strong className="text-[#0b1c30]">{featured.dateStr} · {featured.timeStr}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#74777e] block font-mono uppercase">LOCATION</span>
                    <strong className="text-[#0b1c30]">{featured.location}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#74777e] block font-mono uppercase">TRANSIT TIME</span>
                    <strong className="text-[#0c1e34]">{featured.transitTimeMin} mins from Ace Hotel</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#74777e] block font-mono uppercase">CROWD CONGESTION</span>
                    <strong className="text-[#a0401c]">{featured.crowdLevel} (Arrive early)</strong>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 pt-4 border-t border-[#eff4ff]">
                <button
                  onClick={() => toggleItinerary(featured)}
                  className={`w-full sm:flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    itineraryList.some(e => e.id === featured.id)
                      ? 'bg-[#002316] text-[#97f5ca] border border-[#005139]'
                      : 'bg-[#0c1e34] hover:bg-[#213145] text-white shadow-xs'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {itineraryList.some(e => e.id === featured.id) ? 'check' : 'add_circle'}
                  </span>
                  <span>{itineraryList.some(e => e.id === featured.id) ? 'Added to Itinerary (Day 5)' : 'Add to Day 5 Itinerary'}</span>
                </button>

                <button
                  onClick={() => showToast(`Navigation: 14 mins via Karasuma Line from Ace Hotel Kyoto.`)}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl text-xs font-semibold bg-[#eff4ff] text-[#0c1e34] hover:bg-[#dce9ff] border border-[#dce9ff]"
                >
                  Route from Hotel
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Main Grid: Events Cards + Active Itinerary Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Event Cards (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
              Curated Event Highlights ({filteredEvents.length})
            </h3>
            <span className="text-xs text-[#74777e]">Sorted by Date & Transit Proximity</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredEvents.map((event) => {
              const isSaved = bookmarkedIds.has(event.id);
              const isInItinerary = itineraryList.some(e => e.id === event.id);

              return (
                <div
                  key={event.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xs border border-[#eff4ff] hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="h-44 w-full relative overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        {event.highlightBadge && (
                          <span className="bg-[#0c1e34]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur">
                            {event.highlightBadge}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => toggleBookmark(event.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-[#0b1c30] hover:scale-110 transition-transform"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {isSaved ? 'bookmark' : 'bookmark_border'}
                        </span>
                      </button>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between text-[11px] text-[#74777e] mb-1">
                        <span className="font-semibold text-[#a0401c] uppercase">{event.categoryLabel}</span>
                        <span className="font-mono">{event.transitTimeMin}m transit</span>
                      </div>

                      <h4 className="font-bold text-sm text-[#0b1c30] mb-1 group-hover:text-[#a0401c] transition-colors line-clamp-1">
                        {event.title}
                      </h4>

                      <p className="text-xs text-[#44474d] line-clamp-2 leading-relaxed mb-3">
                        {event.description}
                      </p>

                      <div className="bg-[#eff4ff] p-2.5 rounded-xl border border-[#dce9ff] text-[11px] space-y-1">
                        <div className="flex justify-between">
                          <span className="text-[#74777e]">Date:</span>
                          <strong className="text-[#0b1c30]">{event.dateStr}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#74777e]">Venue:</span>
                          <span className="text-[#0b1c30] truncate max-w-[160px]">{event.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#74777e]">Crowd:</span>
                          <span className="font-bold text-[#a0401c]">{event.crowdLevel}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      onClick={() => toggleItinerary(event)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isInItinerary
                          ? 'bg-[#002316] text-[#97f5ca] border border-[#005139]'
                          : 'bg-[#eff4ff] text-[#0c1e34] hover:bg-[#dce9ff] border border-[#dce9ff]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isInItinerary ? 'check' : 'add'}
                      </span>
                      <span>{isInItinerary ? 'In Itinerary' : 'Add to Itinerary'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar: Active Itinerary & Geospatial Transit Distribution */}
        <div className="space-y-6">
          
          {/* Active Itinerary List */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#eff4ff]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#0c1e34]">checklist</span>
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0b1c30]">
                  Active Travel Itinerary
                </h4>
              </div>
              <span className="text-xs font-mono font-bold bg-[#eff4ff] px-2.5 py-0.5 rounded-full border border-[#dce9ff]">
                {itineraryList.length} Scheduled
              </span>
            </div>

            {itineraryList.length === 0 ? (
              <p className="text-xs text-[#74777e] py-6 text-center">
                No events added yet. Browse the calendar and click "Add to Itinerary".
              </p>
            ) : (
              <div className="space-y-2.5">
                {itineraryList.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#eff4ff] rounded-2xl border border-[#dce9ff] flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-xs text-[#0b1c30] line-clamp-1">{item.title}</div>
                      <div className="text-[10px] text-[#74777e] font-mono">{item.dateStr} · {item.transitTimeMin}m</div>
                    </div>
                    <button
                      onClick={() => toggleItinerary(item)}
                      className="text-[#74777e] hover:text-[#ba1a1a] p-1"
                      title="Remove from itinerary"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                ))}

                <button
                  onClick={handleExportIcs}
                  className="w-full py-2.5 mt-2 bg-[#0c1e34] hover:bg-[#213145] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#97f5ca]">download</span>
                  Download .ICS File
                </button>
              </div>
            )}
          </div>

          {/* Geospatial Distribution & Transit Distance Module */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#eff4ff]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0b1c30]">
                Geospatial Distribution Map
              </h4>
              <span className="text-xs font-mono text-[#74777e]">Ace Hotel Base</span>
            </div>

            <div className="h-44 w-full rounded-2xl overflow-hidden border border-[#dce9ff] mb-4 relative shadow-inner">
              {destination.regionalMapImage ? (
                <img
                  src={destination.regionalMapImage}
                  alt="Transit distribution"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-[#e5eeff] flex items-center justify-center text-xs text-[#4f5f78]">
                  Transit Vector Map
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-[#0c1e34]/90 backdrop-blur text-white px-2.5 py-1 rounded-md text-[10px] font-bold">
                Kansai Rail Corridor
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2 bg-[#eff4ff] rounded-xl">
                <span className="text-[#0b1c30]">Ace Hotel → Heian Jingu</span>
                <span className="font-mono font-bold text-[#0c1e34]">14 mins</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-[#eff4ff] rounded-xl">
                <span className="text-[#0b1c30]">Ace Hotel → Mt. Kurama</span>
                <span className="font-mono font-bold text-[#a0401c]">42 mins</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-[#eff4ff] rounded-xl">
                <span className="text-[#0b1c30]">Ace Hotel → Kiyomizu-dera</span>
                <span className="font-mono font-bold text-[#0c1e34]">22 mins</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-[#eff4ff] rounded-xl">
                <span className="text-[#0b1c30]">Ace Hotel → Dotonbori Osaka</span>
                <span className="font-mono font-bold text-[#0c1e34]">48 mins</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { AppView, Currency, TempUnit, TripSummary, AppNotification, DestinationData, Season } from './types';
import { DESTINATIONS, INITIAL_SAVED_TRIPS, INITIAL_NOTIFICATIONS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TripPlannerView } from './components/TripPlannerView';
import { VisaCheckerView } from './components/VisaCheckerView';
import { PackingWeatherView } from './components/PackingWeatherView';
import { DestinationEventsView } from './components/DestinationEventsView';
import { SavedTripsView } from './components/SavedTripsView';
import { NewTripModal } from './components/NewTripModal';
import { SeasonProvider, useSeason } from './context/SeasonContext';
import { detectSeason, SEASON_THEMES } from './utils/seasonTheme';
import { lookupDestinationIntelligence, getPassportConsularAdvisory } from './services/destinationService';

function AppContent() {
  const [currentView, setCurrentView] = useState<AppView>('trip-planner');
  const [activeDestId, setActiveDestId] = useState<string>('tokyo');
  const [allDestinations, setAllDestinations] = useState<Record<string, DestinationData>>(DESTINATIONS);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [tempUnit, setTempUnit] = useState<TempUnit>('C');
  const [savedTrips, setSavedTrips] = useState<TripSummary[]>(INITIAL_SAVED_TRIPS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [isNewTripModalOpen, setIsNewTripModalOpen] = useState(false);

  const { season, theme, setSeason } = useSeason();

  const activeDestination = allDestinations[activeDestId] || allDestinations.tokyo || DESTINATIONS.tokyo;

  const handleSelectDestination = (destId: string) => {
    if (allDestinations[destId]) {
      setActiveDestId(destId);
      const d = allDestinations[destId];
      const detected = d.season || detectSeason(d.travelDates, d.country, d.city, d.typicalClimateTempC);
      setSeason(detected);
    }
  };

  const handleSelectTrip = (destId: string, view: AppView = 'trip-planner') => {
    handleSelectDestination(destId);
    setCurrentView(view);
  };

  const handleDeleteTrip = (id: string) => {
    setSavedTrips(prev => prev.filter(t => t.id !== id));
  };

  const handleAddTrip = (newTrip: TripSummary, destinationId: string) => {
    setSavedTrips(prev => [newTrip, ...prev]);
    handleSelectDestination(destinationId);
    setCurrentView('trip-planner');
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleUpdatePassportNationality = (nationality: string) => {
    if (!activeDestination) return;
    const advisory = getPassportConsularAdvisory(
      nationality,
      activeDestination.country,
      activeDestination.city,
      activeDestination.travelDates
    );

    const updatedDestination: DestinationData = {
      ...activeDestination,
      passportNationality: nationality,
      visa: advisory.visa,
      entryStatusSummary: advisory.entryStatusSummary,
      entryStatusSubtext: advisory.entryStatusSubtext,
    };

    setAllDestinations(prev => ({
      ...prev,
      [activeDestination.id]: updatedDestination,
    }));

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: `Consular Advisory: ${nationality} Passport`,
        message: `${nationality} ➔ ${activeDestination.city}: ${advisory.entryStatusSummary}`,
        timeAgo: 'Just now',
        read: false,
        type: 'visa',
        actionView: 'visa-checker',
      },
      ...prev,
    ]);
  };

  // Dynamic Lookup when user inputs dates & location
  const handleLookupDestination = async (params: {
    location: string;
    startDate: string;
    endDate?: string;
    passportNationality?: string;
  }) => {
    try {
      const result = await lookupDestinationIntelligence(params);
      
      // Store into destinations
      setAllDestinations(prev => ({
        ...prev,
        [result.id]: result,
      }));

      // Set active
      setActiveDestId(result.id);

      // Reflect seasonal theme
      if (result.season) {
        setSeason(result.season);
      }

      // Add to saved trips list
      const summaryItem: TripSummary = {
        id: `trip-${Date.now()}`,
        destinationId: result.id,
        title: `${result.city} Expedition`,
        dates: result.travelDates,
        duration: `${result.durationDays} Days`,
        daysRemaining: 14,
        countryFlag: result.countryFlag,
        heroImage: result.heroImage,
        visaStatus: result.entryStatusSummary.includes('Visa-Free') ? 'Visa-Free' : 'ETA Active',
        packedCount: result.packingList.filter(p => p.packed).length,
        totalPackCount: result.packingList.length,
        weatherSummary: `${result.typicalClimateTempC}°C, ${result.typicalClimateDesc}`,
      };

      setSavedTrips(prev => [summaryItem, ...prev.filter(t => t.destinationId !== result.id)]);

      // Push a telemetry update notification
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          title: `${result.city} Telemetry & Weather Updated`,
          message: `Season: ${result.season?.toUpperCase()} • Climate: ${result.typicalClimateTempC}°C • ${result.entryStatusSummary}`,
          timeAgo: 'Just now',
          read: false,
          type: 'weather',
          actionView: 'trip-planner',
        },
        ...prev,
      ]);
    } catch (err) {
      console.error('Error during destination lookup:', err);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 text-[#0b1c30]`}
      style={{ backgroundColor: theme.pageBg }}
    >
      {/* Header */}
      <Header
        currentView={currentView}
        onSelectView={setCurrentView}
        activeDestination={activeDestination}
        allDestinations={allDestinations}
        onSelectDestination={handleSelectDestination}
        currency={currency}
        tempUnit={tempUnit}
        onToggleCurrency={setCurrency}
        onToggleTempUnit={setTempUnit}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onOpenNewTrip={() => setIsNewTripModalOpen(true)}
      />

      {/* Main Screen Content */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {currentView === 'trip-planner' && (
          <TripPlannerView
            destination={activeDestination}
            allDestinations={allDestinations}
            onSelectDestination={handleSelectDestination}
            onNavigateToView={setCurrentView}
            currency={currency}
            tempUnit={tempUnit}
            onLookupDestination={handleLookupDestination}
            onSeasonChange={setSeason}
          />
        )}

        {currentView === 'visa-checker' && (
          <VisaCheckerView
            destination={activeDestination}
            currency={currency}
            onSelectDestination={handleSelectDestination}
            onUpdatePassportNationality={handleUpdatePassportNationality}
          />
        )}

        {currentView === 'packing-weather' && (
          <PackingWeatherView
            destination={activeDestination}
            tempUnit={tempUnit}
            onSelectDestination={handleSelectDestination}
          />
        )}

        {currentView === 'destination-events' && (
          <DestinationEventsView
            destination={activeDestination}
            onSelectDestination={handleSelectDestination}
          />
        )}

        {currentView === 'saved-trips' && (
          <SavedTripsView
            savedTrips={savedTrips}
            onSelectTrip={handleSelectTrip}
            onOpenNewTripModal={() => setIsNewTripModalOpen(true)}
            onDeleteTrip={handleDeleteTrip}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectView={setCurrentView} />

      {/* New Trip / Plan Corridor Modal */}
      <NewTripModal
        isOpen={isNewTripModalOpen}
        onClose={() => setIsNewTripModalOpen(false)}
        allDestinations={allDestinations}
        onAddTrip={handleAddTrip}
      />
    </div>
  );
}

export default function App() {
  const initialSeason = detectSeason(
    DESTINATIONS.tokyo.travelDates,
    DESTINATIONS.tokyo.country,
    DESTINATIONS.tokyo.city,
    DESTINATIONS.tokyo.typicalClimateTempC
  );

  const [activeSeason, setActiveSeason] = useState<Season>(initialSeason);

  return (
    <SeasonProvider season={activeSeason} onSeasonChange={setActiveSeason}>
      <AppContent />
    </SeasonProvider>
  );
}

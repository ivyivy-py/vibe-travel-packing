import React, { useState } from 'react';
import { AppView, Currency, TempUnit, TripSummary, AppNotification, DestinationData, Season, FlightOffer, HotelOffer } from './types';
import { DESTINATIONS, INITIAL_SAVED_TRIPS, INITIAL_NOTIFICATIONS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TripPlannerView } from './components/TripPlannerView';
import { VisaCheckerView } from './components/VisaCheckerView';
import { PackingWeatherView } from './components/PackingWeatherView';
import { DestinationEventsView } from './components/DestinationEventsView';
import { SavedTripsView } from './components/SavedTripsView';
import { TalkToUsView } from './components/TalkToUsView';
import { FlightHotelSearchView } from './components/FlightHotelSearchView';
import { NewTripModal } from './components/NewTripModal';
import { SeasonProvider, useSeason } from './context/SeasonContext';
import { detectSeason, SEASON_THEMES } from './utils/seasonTheme';
import { lookupDestinationIntelligence, getPassportConsularAdvisory } from './services/destinationService';
import { getInitialDates } from './services/travelSearchService';

function AppContent() {
  const initialDates = getInitialDates();
  const [currentView, setCurrentView] = useState<AppView>('trip-planner');
  const [activeDestId, setActiveDestId] = useState<string>('tokyo');
  const [allDestinations, setAllDestinations] = useState<Record<string, DestinationData>>(DESTINATIONS);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [tempUnit, setTempUnit] = useState<TempUnit>('C');
  const [savedTrips, setSavedTrips] = useState<TripSummary[]>(INITIAL_SAVED_TRIPS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [isNewTripModalOpen, setIsNewTripModalOpen] = useState(false);

  // Shared travel values carried between "Flight & Hotel Search Engine" and "Travel Advisory" tabs
  const [sharedDestination, setSharedDestination] = useState<string>('Tokyo, Japan');
  const [sharedStartDate, setSharedStartDate] = useState<string>(initialDates.destinationDate);
  const [sharedReturnDate, setSharedReturnDate] = useState<string>(initialDates.returnDate);
  const [sharedOrigin, setSharedOrigin] = useState<string>('San Francisco (SFO)');
  const [sharedPassengers, setSharedPassengers] = useState<number>(1);
  const [sharedCabinClass, setSharedCabinClass] = useState<'Economy' | 'Premium Economy' | 'Business' | 'First'>('Economy');
  const [selectedFlight, setSelectedFlight] = useState<FlightOffer | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<HotelOffer | null>(null);

  const { season, theme, setSeason } = useSeason();

  const activeDestination = allDestinations[activeDestId] || allDestinations.tokyo || DESTINATIONS.tokyo;

  const handleSelectDestination = (destId: string) => {
    if (allDestinations[destId]) {
      setActiveDestId(destId);
      const d = allDestinations[destId];
      setSharedDestination(`${d.city}, ${d.country}`);
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
      setSharedDestination(result.city ? `${result.city}, ${result.country}` : params.location);
      if (params.startDate) setSharedStartDate(params.startDate);
      if (params.endDate) setSharedReturnDate(params.endDate);

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
        {currentView === 'flight-hotel-search' && (
          <FlightHotelSearchView
            activeDestination={activeDestination}
            currency={currency}
            travelDestination={sharedDestination}
            travelStartDate={sharedStartDate}
            travelReturnDate={sharedReturnDate}
            travelOrigin={sharedOrigin}
            travelPassengers={sharedPassengers}
            travelCabinClass={sharedCabinClass}
            selectedFlight={selectedFlight}
            selectedHotel={selectedHotel}
            onUpdateTravelDestination={(dest) => {
              setSharedDestination(dest);
            }}
            onUpdateTravelDates={(sDate, rDate) => {
              setSharedStartDate(sDate);
              setSharedReturnDate(rDate);
            }}
            onUpdateTravelOrigin={(orig) => {
              setSharedOrigin(orig);
            }}
            onUpdateTravelDetails={({ passengers, cabinClass }) => {
              setSharedPassengers(passengers);
              setSharedCabinClass(cabinClass);
            }}
            onSelectFlight={(flight) => {
              setSelectedFlight(flight);
            }}
            onSelectHotel={(hotel) => {
              setSelectedHotel(hotel);
            }}
            onNavigateToTripIntelligence={(destCity, startD, endD) => {
              setSharedDestination(destCity);
              setSharedStartDate(startD);
              setSharedReturnDate(endD);
              handleLookupDestination({
                location: destCity,
                startDate: startD,
                endDate: endD,
              });
              setCurrentView('trip-planner');
            }}
            onSelectDestinationById={handleSelectDestination}
          />
        )}

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
            travelDestination={sharedDestination}
            travelStartDate={sharedStartDate}
            travelReturnDate={sharedReturnDate}
            travelOrigin={sharedOrigin}
            selectedFlight={selectedFlight}
            selectedHotel={selectedHotel}
            onUpdateTravelValues={({ destination, startDate, returnDate, origin }) => {
              if (destination) setSharedDestination(destination);
              if (startDate) setSharedStartDate(startDate);
              if (returnDate) setSharedReturnDate(returnDate);
              if (origin) setSharedOrigin(origin);
            }}
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

        {currentView === 'talk-to-us' && (
          <TalkToUsView onNavigateToView={setCurrentView} />
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

import handleHealth from "./health.js";
import handleLookupDestination from "./lookup-destination.js";
import handleTravelSearch from "./travel-search.js";

export { handleHealth, handleLookupDestination, handleTravelSearch };
export default {
  health: handleHealth,
  lookupDestination: handleLookupDestination,
  travelSearch: handleTravelSearch,
};

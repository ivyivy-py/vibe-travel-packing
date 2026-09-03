import React, { createContext, useContext } from 'react';
import { Season } from '../types';
import { SeasonalTheme, SEASON_THEMES } from '../utils/seasonTheme';

interface SeasonContextValue {
  season: Season;
  theme: SeasonalTheme;
  setSeason: (s: Season) => void;
}

const SeasonContext = createContext<SeasonContextValue>({
  season: 'summer',
  theme: SEASON_THEMES.summer,
  setSeason: () => {},
});

export const useSeason = () => useContext(SeasonContext);

export const SeasonProvider: React.FC<{
  season: Season;
  onSeasonChange: (s: Season) => void;
  children: React.ReactNode;
}> = ({ season, onSeasonChange, children }) => {
  const theme = SEASON_THEMES[season] || SEASON_THEMES.summer;
  return (
    <SeasonContext.Provider value={{ season, theme, setSeason: onSeasonChange }}>
      {children}
    </SeasonContext.Provider>
  );
};

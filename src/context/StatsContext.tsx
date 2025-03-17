import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Stat, defaultStats } from "@/components/CharacterStats";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";

// Local storage key
const STATS_STORAGE_KEY = "fantasyCharacter_stats";

interface StatsContextType {
  stats: Stat[];
  updateStat: (index: number, stat: Partial<Stat>) => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export function StatsProvider({ children }: { children: ReactNode }) {
  // Stats state - load from localStorage if available, but handle React elements properly
  const [stats, setStats] = useState<Stat[]>(() => {
    // Get raw stats from localStorage
    const storedStats = getFromLocalStorage<any[]>(STATS_STORAGE_KEY, null);
    
    // If no stored stats, use default
    if (!storedStats) {
      return defaultStats;
    }
    
    // If stored stats exist, ensure icons are properly recreated
    // We use defaultStats as reference for the icon components
    return storedStats.map((stat, index) => {
      return {
        ...stat,
        // Maintain the icon from defaultStats to ensure it's a valid React element
        icon: defaultStats[index]?.icon || defaultStats[0].icon
      };
    });
  });
  
  // Save to localStorage whenever stats change, but don't save the React elements
  useEffect(() => {
    // Create a copy of stats without React elements for localStorage
    const statsForStorage = stats.map(stat => ({
      name: stat.name,
      short: stat.short,
      start: stat.start,
      increase: stat.increase,
      // Omit the icon property as it can't be properly serialized
    }));
    
    setToLocalStorage(STATS_STORAGE_KEY, statsForStorage);
  }, [stats]);
  
  // Stat update function
  const updateStat = (index: number, newStat: Partial<Stat>) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], ...newStat };
    setStats(newStats);
  };
  
  return (
    <StatsContext.Provider value={{ stats, updateStat }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error("useStats must be used within a StatsProvider");
  }
  return context;
}

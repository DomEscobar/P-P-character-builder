
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Stat, defaultStats } from "@/components/CharacterStats";

interface StatsContextType {
  stats: Stat[];
  updateStat: (index: number, stat: Partial<Stat>) => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export function StatsProvider({ children }: { children: ReactNode }) {
  // Stats state
  const [stats, setStats] = useState<Stat[]>(defaultStats);
  
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

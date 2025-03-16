
import React, { createContext, useContext, useState, ReactNode } from "react";
import { CharacterSecondary } from "@/types/character";

interface SecondaryContextType {
  secondary: CharacterSecondary;
  updateSecondary: (data: Partial<CharacterSecondary>) => void;
}

const SecondaryContext = createContext<SecondaryContextType | undefined>(undefined);

export function SecondaryProvider({ children }: { children: ReactNode }) {
  // Secondary attributes state
  const [secondary, setSecondary] = useState<CharacterSecondary>({
    fate: { schicksal: 0, glueck: 0 },
    toughness: { zaehigkeit: 0, mut: 0, motivation: "" },
    experience: { aktuell: 0, ausgegeben: 0, gesamt: 0 },
    movement: { bewegung: 0, gehen: 0, rennen: 0 },
  });
  
  // Secondary attributes update function
  const updateSecondary = (data: Partial<CharacterSecondary>) => {
    setSecondary(prev => ({
      ...prev,
      ...data,
      fate: { ...prev.fate, ...(data.fate || {}) },
      toughness: { ...prev.toughness, ...(data.toughness || {}) },
      experience: { ...prev.experience, ...(data.experience || {}) },
      movement: { ...prev.movement, ...(data.movement || {}) },
    }));
  };
  
  return (
    <SecondaryContext.Provider value={{ secondary, updateSecondary }}>
      {children}
    </SecondaryContext.Provider>
  );
}

export function useSecondary() {
  const context = useContext(SecondaryContext);
  if (context === undefined) {
    throw new Error("useSecondary must be used within a SecondaryProvider");
  }
  return context;
}

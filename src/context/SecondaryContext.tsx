import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CharacterSecondary } from "@/types/character";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";

// Local storage key
const SECONDARY_STORAGE_KEY = "fantasyCharacter_secondary";

// Default secondary attributes
const defaultSecondary: CharacterSecondary = {
  fate: { schicksal: 0, glueck: 0 },
  toughness: { zaehigkeit: 0, mut: 0, motivation: "" },
  experience: { aktuell: 0, ausgegeben: 0, gesamt: 0 },
  movement: { bewegung: 0, gehen: 0, rennen: 0 },
};

interface SecondaryContextType {
  secondary: CharacterSecondary;
  updateSecondary: (data: Partial<CharacterSecondary>) => void;
}

const SecondaryContext = createContext<SecondaryContextType | undefined>(undefined);

export function SecondaryProvider({ children }: { children: ReactNode }) {
  // Secondary attributes state - load from localStorage if available
  const [secondary, setSecondary] = useState<CharacterSecondary>(() => 
    getFromLocalStorage<CharacterSecondary>(SECONDARY_STORAGE_KEY, defaultSecondary)
  );
  
  // Save to localStorage whenever secondary attributes change
  useEffect(() => {
    setToLocalStorage(SECONDARY_STORAGE_KEY, secondary);
  }, [secondary]);
  
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

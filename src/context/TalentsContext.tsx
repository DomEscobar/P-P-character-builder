import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Talent } from "@/types/character";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";

// Local storage key
const TALENTS_STORAGE_KEY = "fantasyCharacter_talents";

// Default talents
const defaultTalents: Talent[] = [
  {
    id: "talent1",
    name: "",
    stufe: "",
    beschreibung: "",
  },
  {
    id: "talent2",
    name: "",
    stufe: "",
    beschreibung: "",
  },
];

interface TalentsContextType {
  talents: Talent[];
  addTalent: (talent: Talent) => void;
  updateTalent: (id: string, talent: Partial<Talent>) => void;
  deleteTalent: (id: string) => void;
}

const TalentsContext = createContext<TalentsContextType | undefined>(undefined);

export function TalentsProvider({ children }: { children: ReactNode }) {
  // Talents state - load from localStorage if available
  const [talents, setTalents] = useState<Talent[]>(() => 
    getFromLocalStorage<Talent[]>(TALENTS_STORAGE_KEY, defaultTalents)
  );
  
  // Save to localStorage whenever talents change
  useEffect(() => {
    setToLocalStorage(TALENTS_STORAGE_KEY, talents);
  }, [talents]);
  
  // Add a new talent
  const addTalent = (talent: Talent) => {
    setTalents([...talents, talent]);
  };
  
  // Update existing talent
  const updateTalent = (id: string, newTalentData: Partial<Talent>) => {
    setTalents(prevTalents => 
      prevTalents.map(talent => 
        talent.id === id ? { ...talent, ...newTalentData } : talent
      )
    );
  };
  
  // Delete a talent
  const deleteTalent = (id: string) => {
    setTalents(prevTalents => prevTalents.filter(talent => talent.id !== id));
  };
  
  return (
    <TalentsContext.Provider value={{ talents, addTalent, updateTalent, deleteTalent }}>
      {children}
    </TalentsContext.Provider>
  );
}

export function useTalents() {
  const context = useContext(TalentsContext);
  if (context === undefined) {
    throw new Error("useTalents must be used within a TalentsProvider");
  }
  return context;
}

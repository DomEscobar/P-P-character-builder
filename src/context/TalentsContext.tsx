
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Talent } from "@/types/character";

interface TalentsContextType {
  talents: Talent[];
  updateTalent: (index: number, talent: Partial<Talent>) => void;
}

const TalentsContext = createContext<TalentsContextType | undefined>(undefined);

export function TalentsProvider({ children }: { children: ReactNode }) {
  // Talents state
  const [talents, setTalents] = useState<Talent[]>(
    Array(6).fill(null).map((_, index) => ({
      id: `talent${index + 1}`,
      name: "",
      stufe: "",
      beschreibung: "",
    }))
  );
  
  // Talent update function
  const updateTalent = (index: number, newTalent: Partial<Talent>) => {
    const newTalents = [...talents];
    newTalents[index] = { ...newTalents[index], ...newTalent };
    setTalents(newTalents);
  };
  
  return (
    <TalentsContext.Provider value={{ talents, updateTalent }}>
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

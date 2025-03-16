
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Talent } from "@/types/character";

interface TalentsContextType {
  talents: Talent[];
  addTalent: (talent: Talent) => void;
  updateTalent: (id: string, talent: Partial<Talent>) => void;
  deleteTalent: (id: string) => void;
}

const TalentsContext = createContext<TalentsContextType | undefined>(undefined);

export function TalentsProvider({ children }: { children: ReactNode }) {
  // Talents state with initial values
  const [talents, setTalents] = useState<Talent[]>([
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
  ]);
  
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

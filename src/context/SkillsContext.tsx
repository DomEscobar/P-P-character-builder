import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Skill } from "@/types/character";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";

// Local storage key
const SKILLS_STORAGE_KEY = "fantasyCharacter_skills";

// Default skills
const defaultSkills: Skill[] = [
  { id: "1", name: "Anführen", spielwert: "CH", steigerung: 0 },
  { id: "2", name: "Klettern", spielwert: "ST", steigerung: 0 },
  { id: "3", name: "Orientierung", spielwert: "IN", steigerung: 0 },
  { id: "4", name: "Reiten", spielwert: "GW", steigerung: 0 },
  { id: "5", name: "Schleichen", spielwert: "GW", steigerung: 0 },
];

interface SkillsContextType {
  skills: Skill[];
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
}

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

export function SkillsProvider({ children }: { children: ReactNode }) {
  // Skills state - load from localStorage if available
  const [skills, setSkills] = useState<Skill[]>(() => 
    getFromLocalStorage<Skill[]>(SKILLS_STORAGE_KEY, defaultSkills)
  );
  
  // Save to localStorage whenever skills change
  useEffect(() => {
    setToLocalStorage(SKILLS_STORAGE_KEY, skills);
  }, [skills]);
  
  // Skill functions
  const addSkill = (skill: Skill) => {
    setSkills(prev => [...prev, skill]);
  };
  
  const updateSkill = (id: string, updatedSkill: Partial<Skill>) => {
    setSkills(prev => 
      prev.map(skill => 
        skill.id === id ? { ...skill, ...updatedSkill } : skill
      )
    );
  };
  
  const deleteSkill = (id: string) => {
    setSkills(prev => prev.filter(skill => skill.id !== id));
  };
  
  return (
    <SkillsContext.Provider value={{ skills, addSkill, updateSkill, deleteSkill }}>
      {children}
    </SkillsContext.Provider>
  );
}

export function useSkills() {
  const context = useContext(SkillsContext);
  if (context === undefined) {
    throw new Error("useSkills must be used within a SkillsProvider");
  }
  return context;
}

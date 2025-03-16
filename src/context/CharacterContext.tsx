
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Stat, defaultStats } from "@/components/CharacterStats";

// Skill type
export type Skill = {
  id: string;
  name: string;
  spielwert: string;
  steigerung: number;
};

// Talent type
export type Talent = {
  id: string;
  name: string;
  stufe: string;
  beschreibung: string;
};

// Character data types
type CharacterProfile = {
  name: string;
  volk: string;
  klasse: string;
  karriere: string;
  portrait: string | null;
};

type CharacterSecondary = {
  fate: {
    schicksal: number;
    glueck: number;
  };
  toughness: {
    zaehigkeit: number;
    mut: number;
    motivation: string;
  };
  experience: {
    aktuell: number;
    ausgegeben: number;
    gesamt: number;
  };
  movement: {
    bewegung: number;
    gehen: number;
    rennen: number;
  };
};

type GroupData = {
  name: string;
  kurzfristig: string;
  langfristig: string;
  mitglieder: string;
};

type Goals = {
  kurzfristig: string;
  langfristig: string;
};

// Main character context type
interface CharacterContextType {
  // Character profile
  profile: CharacterProfile;
  updateProfile: (profile: Partial<CharacterProfile>) => void;
  
  // Stats
  stats: Stat[];
  updateStat: (index: number, stat: Partial<Stat>) => void;
  
  // Skills
  skills: Skill[];
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  
  // Talents
  talents: Talent[];
  updateTalent: (index: number, talent: Partial<Talent>) => void;
  
  // Secondary attributes
  secondary: CharacterSecondary;
  updateSecondary: (data: Partial<CharacterSecondary>) => void;
  
  // Goals
  goals: Goals;
  updateGoals: (goals: Partial<Goals>) => void;
  
  // Group
  group: GroupData;
  updateGroup: (group: Partial<GroupData>) => void;
}

// Create the context with a default undefined value
const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

// Provider component
export function CharacterProvider({ children }: { children: ReactNode }) {
  // Character profile state
  const [profile, setProfile] = useState<CharacterProfile>({
    name: "",
    volk: "",
    klasse: "",
    karriere: "",
    portrait: null,
  });
  
  // Stats state
  const [stats, setStats] = useState<Stat[]>(defaultStats);
  
  // Skills state
  const [skills, setSkills] = useState<Skill[]>([
    { id: "1", name: "Anführen", spielwert: "CH", steigerung: 0 },
    { id: "2", name: "Klettern", spielwert: "ST", steigerung: 0 },
    { id: "3", name: "Orientierung", spielwert: "IN", steigerung: 0 },
    { id: "4", name: "Reiten", spielwert: "GW", steigerung: 0 },
    { id: "5", name: "Schleichen", spielwert: "GW", steigerung: 0 },
  ]);
  
  // Talents state
  const [talents, setTalents] = useState<Talent[]>(
    Array(6).fill(null).map((_, index) => ({
      id: `talent${index + 1}`,
      name: "",
      stufe: "",
      beschreibung: "",
    }))
  );
  
  // Secondary attributes state
  const [secondary, setSecondary] = useState<CharacterSecondary>({
    fate: { schicksal: 0, glueck: 0 },
    toughness: { zaehigkeit: 0, mut: 0, motivation: "" },
    experience: { aktuell: 0, ausgegeben: 0, gesamt: 0 },
    movement: { bewegung: 0, gehen: 0, rennen: 0 },
  });
  
  // Goals state
  const [goals, setGoals] = useState<Goals>({
    kurzfristig: "",
    langfristig: "",
  });
  
  // Group state
  const [group, setGroup] = useState<GroupData>({
    name: "",
    kurzfristig: "",
    langfristig: "",
    mitglieder: "",
  });
  
  // Profile update function
  const updateProfile = (newProfile: Partial<CharacterProfile>) => {
    setProfile(prev => ({ ...prev, ...newProfile }));
  };
  
  // Stat update function
  const updateStat = (index: number, newStat: Partial<Stat>) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], ...newStat };
    setStats(newStats);
  };
  
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
  
  // Talent update function
  const updateTalent = (index: number, newTalent: Partial<Talent>) => {
    const newTalents = [...talents];
    newTalents[index] = { ...newTalents[index], ...newTalent };
    setTalents(newTalents);
  };
  
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
  
  // Goals update function
  const updateGoals = (newGoals: Partial<Goals>) => {
    setGoals(prev => ({ ...prev, ...newGoals }));
  };
  
  // Group update function
  const updateGroup = (newGroup: Partial<GroupData>) => {
    setGroup(prev => ({ ...prev, ...newGroup }));
  };
  
  // Context value
  const value = {
    profile,
    updateProfile,
    stats,
    updateStat,
    skills,
    addSkill,
    updateSkill,
    deleteSkill,
    talents,
    updateTalent,
    secondary,
    updateSecondary,
    goals,
    updateGoals,
    group,
    updateGroup,
  };
  
  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
}

// Custom hook to use the character context
export function useCharacter() {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error("useCharacter must be used within a CharacterProvider");
  }
  return context;
}

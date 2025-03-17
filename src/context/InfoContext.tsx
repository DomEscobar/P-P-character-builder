import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Goals, GroupData } from "@/types/character";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";

// Local storage keys
const GOALS_STORAGE_KEY = "fantasyCharacter_goals";
const GROUP_STORAGE_KEY = "fantasyCharacter_group";

// Default values
const defaultGoals: Goals = {
  kurzfristig: "",
  langfristig: "",
};

const defaultGroup: GroupData = {
  name: "",
  kurzfristig: "",
  langfristig: "",
  mitglieder: "",
};

interface InfoContextType {
  goals: Goals;
  updateGoals: (goals: Partial<Goals>) => void;
  group: GroupData;
  updateGroup: (group: Partial<GroupData>) => void;
}

const InfoContext = createContext<InfoContextType | undefined>(undefined);

export function InfoProvider({ children }: { children: ReactNode }) {
  // Goals state - load from localStorage if available
  const [goals, setGoals] = useState<Goals>(() => 
    getFromLocalStorage<Goals>(GOALS_STORAGE_KEY, defaultGoals)
  );
  
  // Group state - load from localStorage if available
  const [group, setGroup] = useState<GroupData>(() => 
    getFromLocalStorage<GroupData>(GROUP_STORAGE_KEY, defaultGroup)
  );
  
  // Save goals to localStorage whenever they change
  useEffect(() => {
    setToLocalStorage(GOALS_STORAGE_KEY, goals);
  }, [goals]);
  
  // Save group to localStorage whenever it changes
  useEffect(() => {
    setToLocalStorage(GROUP_STORAGE_KEY, group);
  }, [group]);
  
  // Goals update function
  const updateGoals = (newGoals: Partial<Goals>) => {
    setGoals(prev => ({ ...prev, ...newGoals }));
  };
  
  // Group update function
  const updateGroup = (newGroup: Partial<GroupData>) => {
    setGroup(prev => ({ ...prev, ...newGroup }));
  };
  
  return (
    <InfoContext.Provider value={{ goals, updateGoals, group, updateGroup }}>
      {children}
    </InfoContext.Provider>
  );
}

export function useInfo() {
  const context = useContext(InfoContext);
  if (context === undefined) {
    throw new Error("useInfo must be used within a InfoProvider");
  }
  return context;
}

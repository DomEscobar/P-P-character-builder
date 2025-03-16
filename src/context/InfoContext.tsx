
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Goals, GroupData } from "@/types/character";

interface InfoContextType {
  goals: Goals;
  updateGoals: (goals: Partial<Goals>) => void;
  group: GroupData;
  updateGroup: (group: Partial<GroupData>) => void;
}

const InfoContext = createContext<InfoContextType | undefined>(undefined);

export function InfoProvider({ children }: { children: ReactNode }) {
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

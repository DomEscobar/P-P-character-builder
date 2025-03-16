
import React, { createContext, useContext, useState, ReactNode } from "react";

interface HealthWealthData {
  health: {
    robustheit: number;
    lp: number;
  };
  wealth: {
    gold: number;
    silber: number;
    groschen: number;
  };
}

interface HealthWealthContextType {
  healthWealth: HealthWealthData;
  updateHealth: (data: Partial<HealthWealthData['health']>) => void;
  updateWealth: (data: Partial<HealthWealthData['wealth']>) => void;
}

const HealthWealthContext = createContext<HealthWealthContextType | undefined>(undefined);

export function HealthWealthProvider({ children }: { children: ReactNode }) {
  const [healthWealth, setHealthWealth] = useState<HealthWealthData>({
    health: { robustheit: 0, lp: 0 },
    wealth: { gold: 0, silber: 0, groschen: 0 }
  });
  
  const updateHealth = (data: Partial<HealthWealthData['health']>) => {
    setHealthWealth(prev => ({
      ...prev,
      health: { ...prev.health, ...data }
    }));
  };
  
  const updateWealth = (data: Partial<HealthWealthData['wealth']>) => {
    setHealthWealth(prev => ({
      ...prev,
      wealth: { ...prev.wealth, ...data }
    }));
  };
  
  return (
    <HealthWealthContext.Provider value={{ healthWealth, updateHealth, updateWealth }}>
      {children}
    </HealthWealthContext.Provider>
  );
}

export function useHealthWealth() {
  const context = useContext(HealthWealthContext);
  if (context === undefined) {
    throw new Error("useHealthWealth must be used within a HealthWealthProvider");
  }
  return context;
}

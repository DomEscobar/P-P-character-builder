
import React, { createContext, useContext, useState, ReactNode } from "react";
import { CharacterProfile } from "@/types/character";

interface ProfileContextType {
  profile: CharacterProfile;
  updateProfile: (profile: Partial<CharacterProfile>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  // Character profile state
  const [profile, setProfile] = useState<CharacterProfile>({
    name: "",
    volk: "",
    klasse: "",
    karriere: "",
    portrait: null,
  });
  
  // Profile update function
  const updateProfile = (newProfile: Partial<CharacterProfile>) => {
    setProfile(prev => ({ ...prev, ...newProfile }));
  };
  
  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}

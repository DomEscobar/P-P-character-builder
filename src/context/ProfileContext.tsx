import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CharacterProfile } from "@/types/character";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";

// Local storage key
const PROFILE_STORAGE_KEY = "fantasyCharacter_profile";

interface ProfileContextType {
  profile: CharacterProfile;
  updateProfile: (profile: Partial<CharacterProfile>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  // Character profile state - load from localStorage if available
  const [profile, setProfile] = useState<CharacterProfile>(() => 
    getFromLocalStorage<CharacterProfile>(PROFILE_STORAGE_KEY, {
      name: "",
      volk: "",
      klasse: "",
      karriere: "",
      portrait: null,
    })
  );
  
  // Save to localStorage whenever profile changes
  useEffect(() => {
    setToLocalStorage(PROFILE_STORAGE_KEY, profile);
  }, [profile]);
  
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

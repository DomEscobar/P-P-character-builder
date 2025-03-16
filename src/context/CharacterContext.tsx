
import React, { ReactNode } from "react";
import { ProfileProvider, useProfile } from "./ProfileContext";
import { StatsProvider, useStats } from "./StatsContext";
import { SkillsProvider, useSkills } from "./SkillsContext";
import { TalentsProvider, useTalents } from "./TalentsContext";
import { SecondaryProvider, useSecondary } from "./SecondaryContext";
import { InfoProvider, useInfo } from "./InfoContext";

// Re-export types from the new types file
export type { Skill, Talent } from "@/types/character";

// Character Provider component that combines all providers
export function CharacterProvider({ children }: { children: ReactNode }) {
  return (
    <ProfileProvider>
      <StatsProvider>
        <SkillsProvider>
          <TalentsProvider>
            <SecondaryProvider>
              <InfoProvider>
                {children}
              </InfoProvider>
            </SecondaryProvider>
          </TalentsProvider>
        </SkillsProvider>
      </StatsProvider>
    </ProfileProvider>
  );
}

// Custom hook to use all character context data
export function useCharacter() {
  const profile = useProfile();
  const stats = useStats();
  const skills = useSkills();
  const talents = useTalents();
  const secondary = useSecondary();
  const info = useInfo();

  return {
    // Profile
    profile: profile.profile,
    updateProfile: profile.updateProfile,
    
    // Stats
    stats: stats.stats,
    updateStat: stats.updateStat,
    
    // Skills
    skills: skills.skills,
    addSkill: skills.addSkill,
    updateSkill: skills.updateSkill,
    deleteSkill: skills.deleteSkill,
    
    // Talents
    talents: talents.talents,
    updateTalent: talents.updateTalent,
    
    // Secondary attributes
    secondary: secondary.secondary,
    updateSecondary: secondary.updateSecondary,
    
    // Goals and Group
    goals: info.goals,
    updateGoals: info.updateGoals,
    group: info.group,
    updateGroup: info.updateGroup,
  };
}

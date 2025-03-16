
import React from "react";
import type { Skill } from "@/types/character";
import { useIsMobile } from "@/hooks/use-mobile";
import { Scroll } from "lucide-react";

interface SkillItemProps {
  skill: Skill;
  wert: number;
  onEdit: (skill: Skill) => void;
}

export function SkillItem({ skill, wert, onEdit }: SkillItemProps) {
  const isMobile = useIsMobile();
  
  // Calculate visual elements based on wert value and device
  const getProgressBarWidth = () => {
    return `${Math.min(wert * 5, 100)}%`;
  };
  
  return (
    <div 
      className="relative cursor-pointer transition-all duration-300 hover:transform hover:scale-105"
      onClick={() => onEdit(skill)}
    >
      <div className="bg-[#f0ddb0] border-2 border-[#d8c38d] rounded-lg p-2 shadow-md relative overflow-hidden">
        {/* Decorative corner scroll icon */}
        <div className="absolute top-1 right-1 text-[#8b7339] opacity-30">
          <Scroll size={isMobile ? 14 : 16} />
        </div>
        
        {/* Skill name */}
        <div className="font-serif text-[#6b592b] font-bold mb-1 truncate pr-5">
          {skill.name}
        </div>
        
        {/* Base attribute */}
        <div className="flex items-center mb-2">
          <div className="bg-[#8b7339] text-[#f5e8c8] rounded-md px-2 py-0.5 text-xs font-medium">
            {skill.spielwert}
          </div>
          <div className="text-[#8b7339] text-xs ml-2">
            +{skill.steigerung}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="h-4 bg-[#e2cc9c] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#d4af37] to-[#f0ca61] rounded-full transition-all duration-300"
            style={{ width: getProgressBarWidth() }}
          ></div>
        </div>
        
        {/* Skill value */}
        <div className="absolute bottom-2 right-2 bg-[#3a3333] text-[#d4af37] font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm">
          {wert}
        </div>
      </div>
    </div>
  );
}

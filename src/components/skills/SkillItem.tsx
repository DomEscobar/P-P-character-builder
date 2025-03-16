
import React from "react";
import type { Skill } from "@/types/character";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollText } from "lucide-react";

interface SkillItemProps {
  skill: Skill;
  wert: number;
  onEdit: (skill: Skill) => void;
}

export function SkillItem({ skill, wert, onEdit }: SkillItemProps) {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
      onClick={() => onEdit(skill)}
    >
      <div className={`relative flex flex-col items-center justify-center ${isMobile ? "w-full" : "w-24"} mb-2`}>
        <div className="bg-[#f0ddb0] border-2 border-[#d8c38d] rounded-lg p-3 w-full flex flex-col items-center relative overflow-hidden">
          {/* Decoration */}
          <div className="absolute -top-1 -left-1 text-[#8b7339] opacity-20">
            <ScrollText size={isMobile ? 16 : 20} />
          </div>
          
          {/* Skill value */}
          <div className={`text-${isMobile ? "xl" : "2xl"} font-serif font-bold text-[#4e3c10]`}>
            {wert}
          </div>
          
          {/* Skill name */}
          <div className="mt-1 text-center">
            <span className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-[#6b592b] truncate max-w-full`}>
              {skill.name}
            </span>
          </div>
          
          {/* Spielwert indicator */}
          <div className="absolute bottom-0 right-0 bg-[#8b7339] text-[#f5e8c8] px-1 text-xs rounded-tl-md">
            {skill.spielwert}
          </div>
        </div>
      </div>
    </div>
  );
}

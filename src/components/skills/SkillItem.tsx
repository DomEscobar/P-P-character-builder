
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
      className="relative flex flex-col items-center cursor-pointer transition-all hover:scale-105 mb-4"
      onClick={() => onEdit(skill)}
    >
      <div className={`${isMobile ? 'w-16 h-16' : 'w-24 h-24'} relative`}>
        {/* Parchment background */}
        <div className="absolute inset-0 bg-[#f5e8c8] rounded-full border-2 border-[#d8c38d] shadow-md"></div>
        
        {/* Decorative border */}
        <div 
          className="absolute inset-0 rounded-full border-4 border-[#d4af37] opacity-60"
          style={{
            clipPath: `polygon(0% 0%, ${wert}% 0%, ${wert}% 100%, 0% 100%)`
          }}
        ></div>
        
        {/* Skill value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-serif font-bold text-[#8b7339]`}>
            {wert}
          </span>
        </div>
      </div>
      
      {/* Skill name */}
      <div className="relative mt-1 px-3 py-1 bg-[#3a3333] rounded-lg border border-[#d4af37] w-full max-w-[90%]">
        <ScrollText className="absolute left-1 top-1/2 -translate-y-1/2 text-[#d4af37]" size={isMobile ? 10 : 12} />
        <span className={`${isMobile ? 'text-xs pl-3' : 'text-sm pl-4'} font-serif font-medium text-[#d4af37] truncate block text-center`}>
          {skill.name}
        </span>
      </div>
    </div>
  );
}

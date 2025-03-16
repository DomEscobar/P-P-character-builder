
import React from "react";
import type { Skill } from "@/types/character";
import { useIsMobile } from "@/hooks/use-mobile";

interface SkillItemProps {
  skill: Skill;
  wert: number;
  onEdit: (skill: Skill) => void;
}

export function SkillItem({ skill, wert, onEdit }: SkillItemProps) {
  const isMobile = useIsMobile();
  
  const calculateStrokeWidth = (value: number) => {
    return value > 0 ? (isMobile ? 6 : 8) : (isMobile ? 3 : 4);
  };

  const getStrokeDashArray = (value: number) => {
    return `${value > 0 ? (value / 100) * 251.2 : 0} 251.2`;
  };

  const size = isMobile ? "w-14 h-14" : "w-20 h-20";
  const fontSize = isMobile ? "text-lg" : "text-2xl";
  const labelSize = isMobile ? "text-xs" : "text-sm";

  return (
    <div 
      className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105 mb-2"
      onClick={() => onEdit(skill)}
    >
      <div className={`relative flex items-center justify-center ${size} mb-1`}>
        <svg className="absolute" width="100%" height="100%" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#3a3333"
            strokeWidth={calculateStrokeWidth(0)}
            opacity="0.6"
          />
        </svg>
        
        <svg className="absolute transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#d4af37"
            strokeWidth={calculateStrokeWidth(wert)}
            strokeDasharray={getStrokeDashArray(wert)}
            strokeLinecap="round"
          />
        </svg>
        
        <div className={`z-10 ${fontSize} font-bold text-[#3a3333]`}>
          {wert}
        </div>
      </div>
      
      <div className="bg-[#3a3333] px-2 py-0.5 rounded-full w-full max-w-[90%]">
        <span className={`${labelSize} font-medium text-[#d4af37] truncate block text-center`}>
          {skill.name}
        </span>
      </div>
    </div>
  );
}

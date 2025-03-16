
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
    return value > 0 ? (isMobile ? 8 : 10) : (isMobile ? 4 : 5);
  };

  const getStrokeDashArray = (value: number) => {
    return `${value > 0 ? (value / 100) * 251.2 : 0} 251.2`;
  };

  const size = isMobile ? "w-16 h-16" : "w-20 h-20";
  const fontSize = isMobile ? "text-xl" : "text-2xl";
  const labelSize = isMobile ? "text-xs" : "text-sm";

  return (
    <div 
      className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105 group"
      onClick={() => onEdit(skill)}
    >
      <div className={`relative flex items-center justify-center ${size} mb-1 md:mb-2`}>
        <svg className="absolute" width="100%" height="100%" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={isMobile ? "8" : "10"}
          />
        </svg>
        
        <svg className="absolute transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(59, 130, 246, 0.8)"
            strokeWidth={calculateStrokeWidth(wert)}
            strokeDasharray={getStrokeDashArray(wert)}
            strokeLinecap="round"
          />
        </svg>
        
        <div className={`z-10 ${fontSize} font-bold text-white`}>
          {wert}
        </div>
      </div>
      
      <div className="flex items-center justify-center bg-secondary/60 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 rounded-full group-hover:bg-primary/60 transition-colors">
        <span className={`${labelSize} font-medium text-foreground truncate max-w-full`}>
          {skill.name}
        </span>
      </div>
    </div>
  );
}

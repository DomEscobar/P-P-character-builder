
import React from "react";
import type { Skill } from "@/context/CharacterContext";

interface SkillItemProps {
  skill: Skill;
  wert: number;
  onEdit: (skill: Skill) => void;
}

export function SkillItem({ skill, wert, onEdit }: SkillItemProps) {
  const calculateStrokeWidth = (value: number) => {
    return value > 0 ? 10 : 5;
  };

  const getStrokeDashArray = (value: number) => {
    return `${value > 0 ? (value / 100) * 251.2 : 0} 251.2`;
  };

  return (
    <div 
      className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
      onClick={() => onEdit(skill)}
    >
      <div className="relative flex items-center justify-center w-24 h-24 mb-2">
        <svg className="absolute" width="100%" height="100%" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#3a3333"
            strokeWidth="10"
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
        
        <div className="z-10 text-3xl font-bold text-white">
          {wert}
        </div>
      </div>
      
      <div className="flex items-center justify-center bg-[#3a3333] px-4 py-1 rounded-full">
        <span className="text-sm font-medium text-[#d4af37]">{skill.name}</span>
      </div>
    </div>
  );
}

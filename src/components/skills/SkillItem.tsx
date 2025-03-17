import React from "react";
import type { Skill } from "@/types/character";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface SkillItemProps {
  skill: Skill;
  wert: number;
  onEdit: (skill: Skill) => void;
}

export function SkillItem({ skill, wert, onEdit }: SkillItemProps) {
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      className="group relative"
      onClick={() => onEdit(skill)}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-[#2A1A17] rounded-lg transform rotate-1 scale-[1.02] -z-10"></div>
      <div className="bg-gradient-to-b from-[#2A1A17] to-[#1D1210] hover:from-[#3A2A27] hover:to-[#2D2220] p-3 rounded-lg border border-[#513428] cursor-pointer transition-all duration-300 hover:shadow-[0_0_10px_rgba(170,60,59,0.3)]">
        {/* Main value */}
        <div className="text-4xl font-bold text-[#E4D8B4] text-center font-serif mb-1">
          {wert}
        </div>
        
        {/* Skill name */}
        <div className="text-center w-full">
          <span className="text-sm font-medium text-[#C09E6B]">
            {skill.name}
          </span>
        </div>
        
        {/* Attribute tag */}
        <div className="absolute bottom-1 right-1 bg-[#191210] text-[#AA3C3B] px-2 py-[2px] text-xs rounded-sm">
          {skill.spielwert}
        </div>
        
        {/* Edit indicator on hover */}
        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="text-xs px-1.5 py-0.5 bg-[#540804]/80 text-[#E4D8B4] rounded-sm">
            Bearbeiten
          </div>
        </div>
      </div>
    </motion.div>
  );
}

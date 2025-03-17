import React from "react";
import type { Talent } from "@/types/character";
import { useIsMobile } from "@/hooks/use-mobile";
import { Award, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface TalentItemProps {
  talent: Talent;
  onEdit: (talent: Talent) => void;
}

export function TalentItem({ talent, onEdit }: TalentItemProps) {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className="group relative cursor-pointer"
      onClick={() => onEdit(talent)}
    >
      <div className="absolute inset-0 bg-[#2A1A17] rounded-lg transform rotate-0.5 scale-[1.01] -z-10"></div>
      <div className="bg-gradient-to-b from-[#2A1A17] to-[#1D1210] hover:from-[#3A2A27] hover:to-[#2D2220] p-3 rounded-lg border border-[#513428] transition-all duration-300 hover:shadow-[0_0_10px_rgba(170,60,59,0.3)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-1.5 rounded-full bg-[#191210] text-[#AA3C3B] mr-2">
              <Award size={isMobile ? 16 : 18} />
            </div>
            <div className="overflow-hidden">
              <div className="font-medium text-[#E4D8B4] font-serif truncate">
                {talent.name || "Unbenannt"}
              </div>
              {talent.beschreibung && (
                <div className="text-xs text-[#C09E6B] truncate max-w-[200px]">
                  {talent.beschreibung}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center">
            {talent.stufe && (
              <div className="bg-[#191210] text-[#AA3C3B] px-2 py-0.5 rounded-sm text-xs mr-2 border border-[#513428]/50">
                {talent.stufe}
              </div>
            )}
            <ChevronRight size={isMobile ? 14 : 16} className="text-[#AA3C3B]" />
          </div>
        </div>
        
        {/* Edit indicator on hover */}
        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="text-xs px-1.5 py-0.5 bg-[#540804]/80 text-[#E4D8B4] rounded-sm">
            Bearbeiten
          </div>
        </div>
      </div>
    </div>
  );
}

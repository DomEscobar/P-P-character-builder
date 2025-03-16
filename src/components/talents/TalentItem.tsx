
import React from "react";
import type { Talent } from "@/types/character";
import { useIsMobile } from "@/hooks/use-mobile";
import { Award } from "lucide-react";

interface TalentItemProps {
  talent: Talent;
  onEdit: (talent: Talent) => void;
}

export function TalentItem({ talent, onEdit }: TalentItemProps) {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
      onClick={() => onEdit(talent)}
    >
      <div className={`relative flex flex-col items-center justify-center ${isMobile ? "w-full" : "w-36"} mb-2`}>
        <div className="bg-[#f0ddb0] border-2 border-[#d8c38d] rounded-lg p-3 w-full flex flex-col items-center relative overflow-hidden">
          {/* Decoration */}
          <div className="absolute -top-1 -left-1 text-[#8b7339] opacity-20">
            <Award size={isMobile ? 16 : 20} />
          </div>
          
          {/* Talent name */}
          <div className="mt-1 text-center">
            <span className={`${isMobile ? "text-md" : "text-lg"} font-medium text-[#4e3c10] truncate max-w-full font-serif`}>
              {talent.name || "Unbenannt"}
            </span>
          </div>
          
          {/* Talent stufe indicator */}
          <div className="absolute bottom-0 right-0 bg-[#8b7339] text-[#f5e8c8] px-1 text-xs rounded-tl-md">
            {talent.stufe || "-"}
          </div>
          
          {/* Description preview (if any) */}
          {talent.beschreibung && (
            <div className="mt-2 text-xs text-[#6b592b] line-clamp-2 text-center">
              {talent.beschreibung}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

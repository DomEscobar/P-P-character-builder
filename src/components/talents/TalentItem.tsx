
import React from "react";
import type { Talent } from "@/types/character";
import { useIsMobile } from "@/hooks/use-mobile";
import { Award, ChevronRight, Edit } from "lucide-react";

interface TalentItemProps {
  talent: Talent;
  onEdit: (talent: Talent) => void;
}

export function TalentItem({ talent, onEdit }: TalentItemProps) {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className="flex items-center justify-between bg-[#f0ddb0] border border-[#d8c38d] rounded-md p-2 mb-2 hover:bg-[#e8d4a0] transition-colors cursor-pointer"
      onClick={() => onEdit(talent)}
    >
      <div className="flex items-center">
        <Award size={isMobile ? 16 : 20} className="text-[#8b7339] mr-2" />
        <div className="overflow-hidden">
          <div className="font-medium text-[#4e3c10] font-serif truncate">
            {talent.name || "Unbenannt"}
          </div>
          {talent.beschreibung && (
            <div className="text-xs text-[#6b592b] truncate max-w-[200px]">
              {talent.beschreibung}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center">
        {talent.stufe && (
          <div className="bg-[#8b7339] text-[#f5e8c8] px-2 py-0.5 rounded-md text-xs mr-2">
            {talent.stufe}
          </div>
        )}
        <ChevronRight size={isMobile ? 14 : 16} className="text-[#8b7339]" />
      </div>
    </div>
  );
}

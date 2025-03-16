
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Skill } from "@/context/CharacterContext";
import { Stat } from "@/components/CharacterStats";
import { useIsMobile } from "@/hooks/use-mobile";

interface SkillEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSkill: Skill | null;
  editValues: { name: string; spielwert: string; steigerung: number };
  setEditValues: React.Dispatch<React.SetStateAction<{ name: string; spielwert: string; steigerung: number }>>;
  onSave: () => void;
  onDelete: () => void;
  stats: Stat[];
  calculateWert: (skill: { spielwert: string; steigerung: number }) => number;
}

export function SkillEditDialog({
  open,
  onOpenChange,
  selectedSkill,
  editValues,
  setEditValues,
  onSave,
  onDelete,
  stats,
  calculateWert
}: SkillEditDialogProps) {
  const isMobile = useIsMobile();
  
  // Get character stats to use in the dropdown
  const getCharacterStatOptions = (stats: Stat[]) => {
    return stats.map(stat => ({
      value: stat.short,
      label: `${stat.name} (${stat.short})`,
      baseValue: stat.start
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`bg-[#f5e8c8] border-[#d8c38d] text-[#4e3c10] ${isMobile ? 'p-3 max-w-[90vw]' : 'p-6'}`}>
        <DialogHeader>
          <DialogTitle className="text-[#8b7339] font-serif">
            {selectedSkill?.name ? `${selectedSkill.name} bearbeiten` : "Neue Fähigkeit"}
          </DialogTitle>
        </DialogHeader>
        
        <div className={`grid gap-3 py-2 ${isMobile ? 'text-sm' : ''}`}>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex flex-col space-y-1">
              <label className="font-medium text-[#6b592b]">Name</label>
              <Input
                value={editValues.name}
                onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                className="bg-[#fff] border-[#d8c38d] text-[#4e3c10]"
              />
            </div>
            
            <div className="flex flex-col space-y-1">
              <label className="font-medium text-[#6b592b]">Spielwert</label>
              <Select 
                value={editValues.spielwert}
                onValueChange={(value) => setEditValues({ ...editValues, spielwert: value })}
              >
                <SelectTrigger className={`bg-[#fff] border-[#d8c38d] text-[#4e3c10] ${isMobile ? 'h-8 text-sm' : ''}`}>
                  <SelectValue placeholder="Wähle einen Spielwert" />
                </SelectTrigger>
                <SelectContent className="bg-[#f5e8c8] border-[#d8c38d] text-[#4e3c10] max-h-[40vh]">
                  {getCharacterStatOptions(stats).map(option => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className={`text-[#4e3c10] focus:bg-[#e2cc9c] focus:text-[#4e3c10] ${isMobile ? 'text-sm py-1' : ''}`}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col space-y-1">
              <label className="font-medium text-[#6b592b]">Steigerung</label>
              <Input
                type="number"
                value={editValues.steigerung}
                onChange={(e) => setEditValues({ ...editValues, steigerung: Number(e.target.value) })}
                className="bg-[#fff] border-[#d8c38d] text-[#4e3c10]"
              />
            </div>
            
            <div className="flex flex-col space-y-1">
              <label className="font-medium text-[#6b592b]">Wert (Spielwert + Steigerung)</label>
              <div className="bg-[#e2cc9c] border border-[#d8c38d] text-[#4e3c10] rounded-md px-3 py-1 flex items-center justify-center font-bold">
                {editValues.spielwert 
                  ? calculateWert({ spielwert: editValues.spielwert, steigerung: editValues.steigerung })
                  : "—"}
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className={`flex ${isMobile ? 'flex-col space-y-2' : 'justify-between'} mt-2`}>
          {selectedSkill && selectedSkill.name && (
            <Button 
              onClick={onDelete}
              size={isMobile ? "sm" : "default"}
              className="bg-[#8b3939] hover:bg-[#722e2e] text-[#f5e8c8]"
            >
              Löschen
            </Button>
          )}
          
          <div className={`flex ${isMobile ? 'justify-end space-x-2 w-full' : 'space-x-2'}`}>
            <Button 
              onClick={() => onOpenChange(false)}
              size={isMobile ? "sm" : "default"}
              className="bg-[#6b592b] hover:bg-[#4e3c10] text-[#f5e8c8]"
            >
              Abbrechen
            </Button>
            <Button 
              onClick={onSave}
              size={isMobile ? "sm" : "default"}
              className="bg-[#8b7339] hover:bg-[#6b592b] text-[#f5e8c8]"
            >
              Speichern
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

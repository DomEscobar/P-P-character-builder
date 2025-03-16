
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Skill } from "@/context/CharacterContext";
import { Stat } from "@/components/CharacterStats";

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
      <DialogContent className="bg-[#262222] border-[#473b3b] text-[#e0d0b0]">
        <DialogHeader>
          <DialogTitle className="text-[#d4af37]">
            {selectedSkill?.name ? `${selectedSkill.name} bearbeiten` : "Neue Fähigkeit"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#c0b090]">Name</label>
              <Input
                value={editValues.name}
                onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                className="bg-[#332d2d] border-[#473b3b] text-[#e0d0b0]"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#c0b090]">Spielwert</label>
              <Select 
                value={editValues.spielwert}
                onValueChange={(value) => setEditValues({ ...editValues, spielwert: value })}
              >
                <SelectTrigger className="bg-[#332d2d] border-[#473b3b] text-[#e0d0b0]">
                  <SelectValue placeholder="Wähle einen Spielwert" />
                </SelectTrigger>
                <SelectContent className="bg-[#262222] border-[#473b3b] text-[#e0d0b0]">
                  {getCharacterStatOptions(stats).map(option => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="text-[#e0d0b0] focus:bg-[#473b3b] focus:text-[#d4af37]"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#c0b090]">Steigerung</label>
              <Input
                type="number"
                value={editValues.steigerung}
                onChange={(e) => setEditValues({ ...editValues, steigerung: Number(e.target.value) })}
                className="bg-[#332d2d] border-[#473b3b] text-[#e0d0b0]"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#c0b090]">Wert (Spielwert + Steigerung)</label>
              <div className="bg-[#332d2d] border border-[#473b3b] text-[#e0d0b0] rounded-md px-3 py-2 h-10">
                {editValues.spielwert 
                  ? calculateWert({ spielwert: editValues.spielwert, steigerung: editValues.steigerung })
                  : "—"}
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between">
          {selectedSkill && selectedSkill.name && (
            <Button 
              onClick={onDelete}
              className="bg-red-800 hover:bg-red-700 text-white"
            >
              Löschen
            </Button>
          )}
          
          <div className="flex space-x-2">
            <Button 
              onClick={() => onOpenChange(false)}
              className="bg-[#332d2d] hover:bg-[#473b3b] text-[#e0d0b0]"
            >
              Abbrechen
            </Button>
            <Button 
              onClick={onSave}
              className="bg-[#d4af37] hover:bg-[#c09a20] text-[#262222]"
            >
              Speichern
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

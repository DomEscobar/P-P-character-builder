
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Skill } from "@/context/CharacterContext";
import { Stat } from "@/components/CharacterStats";
import { ScrollText } from "lucide-react";

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
      <DialogContent className="bg-[#f5e8c8] border-[#d8c38d] text-[#4e3c10] max-w-sm">
        <div className="absolute -top-2 -left-2 text-[#8b7339] opacity-30">
          <ScrollText size={24} />
        </div>
        <div className="absolute -bottom-2 -right-2 text-[#8b7339] opacity-30 transform rotate-180">
          <ScrollText size={24} />
        </div>
        
        <DialogHeader>
          <DialogTitle className="text-[#4e3c10] font-serif text-xl text-center">
            {selectedSkill?.name ? `${selectedSkill.name} bearbeiten` : "Neue Fähigkeit"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#6b592b] font-medium">Name</label>
              <Input
                value={editValues.name}
                onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10]"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#6b592b] font-medium">Spielwert</label>
              <Select 
                value={editValues.spielwert}
                onValueChange={(value) => setEditValues({ ...editValues, spielwert: value })}
              >
                <SelectTrigger className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10]">
                  <SelectValue placeholder="Wähle einen Spielwert" />
                </SelectTrigger>
                <SelectContent className="bg-[#f5e8c8] border-[#d0b978] text-[#4e3c10]">
                  {getCharacterStatOptions(stats).map(option => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="text-[#4e3c10] focus:bg-[#e2cc9c] focus:text-[#4e3c10]"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#6b592b] font-medium">Steigerung</label>
              <Input
                type="number"
                value={editValues.steigerung}
                onChange={(e) => setEditValues({ ...editValues, steigerung: Number(e.target.value) })}
                className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10]"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#6b592b] font-medium">Wert (Spielwert + Steigerung)</label>
              <div className="bg-[#f0ddb0] border border-[#d0b978] text-[#4e3c10] rounded-md px-3 py-2 h-10 flex items-center font-medium">
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
              className="bg-[#8b3939] hover:bg-[#6b2929] text-[#f5e8c8]"
            >
              Löschen
            </Button>
          )}
          
          <div className="flex space-x-2">
            <Button 
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="border-[#d0b978] text-[#6b592b] hover:bg-[#e2cc9c] hover:text-[#4e3c10]"
            >
              Abbrechen
            </Button>
            <Button 
              onClick={onSave}
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

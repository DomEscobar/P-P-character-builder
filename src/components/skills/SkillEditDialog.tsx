
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Skill } from "@/context/CharacterContext";
import { Stat } from "@/components/CharacterStats";
import { useIsMobile } from "@/hooks/use-mobile";
import { Scroll, Feather, BookOpen, Trash2 } from "lucide-react";

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
      <DialogContent className={`bg-[#f5e8c8] border-[#d8c38d] text-[#4e3c10] max-w-[90vw] sm:max-w-md relative overflow-hidden ${isMobile ? 'p-4' : 'p-6'}`}>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 text-[#d8c38d] opacity-10">
          <Scroll size={isMobile ? 40 : 60} />
        </div>
        <div className="absolute bottom-0 left-0 text-[#d8c38d] opacity-10 transform rotate-180">
          <Scroll size={isMobile ? 40 : 60} />
        </div>
        
        <DialogHeader className="relative z-10">
          <DialogTitle className="text-[#8b7339] font-serif flex items-center">
            <BookOpen size={18} className="mr-2" />
            {selectedSkill?.name ? `${selectedSkill.name} bearbeiten` : "Neue Fähigkeit"}
          </DialogTitle>
        </DialogHeader>
        
        <div className={`grid gap-3 py-2 ${isMobile ? 'text-sm' : ''} relative z-10`}>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="font-medium text-[#6b592b] flex items-center text-sm">
                <Feather size={14} className="mr-1" /> Name
              </label>
              <Input
                value={editValues.name}
                onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                className="bg-[#fff] border-[#d8c38d] text-[#4e3c10] h-8"
                placeholder="Fähigkeitsname"
              />
            </div>
            
            <div className="space-y-1">
              <label className="font-medium text-[#6b592b] flex items-center text-sm">
                Grundwert
              </label>
              <Select 
                value={editValues.spielwert}
                onValueChange={(value) => setEditValues({ ...editValues, spielwert: value })}
              >
                <SelectTrigger className="bg-[#fff] border-[#d8c38d] text-[#4e3c10] h-8">
                  <SelectValue placeholder="Attribut wählen" />
                </SelectTrigger>
                <SelectContent 
                  className="bg-[#f5e8c8] border-[#d8c38d] text-[#4e3c10]"
                  position="popper"
                  sideOffset={5}
                >
                  {getCharacterStatOptions(stats).map(option => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="text-[#4e3c10] focus:bg-[#e2cc9c] focus:text-[#4e3c10] h-8 text-sm"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <label className="font-medium text-[#6b592b] flex items-center text-sm">
                Steigerung
              </label>
              <Input
                type="number"
                min="0"
                value={editValues.steigerung}
                onChange={(e) => setEditValues({ ...editValues, steigerung: Number(e.target.value) })}
                className="bg-[#fff] border-[#d8c38d] text-[#4e3c10] h-8"
              />
            </div>
            
            <div className="space-y-1 pt-1">
              <label className="font-medium text-[#6b592b] text-sm">
                Gesamtwert
              </label>
              <div className="bg-[#3a3333] text-[#d4af37] rounded-md px-3 py-2 flex items-center justify-center font-bold text-xl">
                {editValues.spielwert 
                  ? calculateWert({ spielwert: editValues.spielwert, steigerung: editValues.steigerung })
                  : "—"}
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className={`flex ${isMobile ? 'flex-col gap-2' : 'flex-row justify-between'} mt-2 relative z-10`}>
          {selectedSkill && selectedSkill.name && (
            <Button 
              onClick={onDelete}
              size="sm"
              variant="destructive"
              className="bg-[#8b3939] hover:bg-[#722e2e] text-[#f5e8c8] h-8"
            >
              <Trash2 size={14} className="mr-1" /> Löschen
            </Button>
          )}
          
          <div className={`flex ${isMobile ? 'w-full justify-end space-x-2' : 'space-x-2'}`}>
            <Button 
              onClick={() => onOpenChange(false)}
              size="sm"
              className="bg-[#6b592b] hover:bg-[#4e3c10] text-[#f5e8c8] h-8"
            >
              Abbrechen
            </Button>
            <Button 
              onClick={onSave}
              size="sm"
              className="bg-[#8b7339] hover:bg-[#6b592b] text-[#f5e8c8] h-8"
            >
              Speichern
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

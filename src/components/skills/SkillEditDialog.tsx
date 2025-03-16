
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
      <DialogContent className="bg-card border-primary/20 text-foreground">
        <DialogHeader>
          <DialogTitle className="text-primary">
            {selectedSkill?.name ? `${selectedSkill.name} bearbeiten` : "Neue Fähigkeit"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-muted-foreground">Name</label>
              <Input
                value={editValues.name}
                onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                className="bg-secondary/40 border-primary/10 text-foreground"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-muted-foreground">Spielwert</label>
              <Select 
                value={editValues.spielwert}
                onValueChange={(value) => setEditValues({ ...editValues, spielwert: value })}
              >
                <SelectTrigger className="bg-secondary/40 border-primary/10 text-foreground">
                  <SelectValue placeholder="Wähle einen Spielwert" />
                </SelectTrigger>
                <SelectContent className="bg-card border-primary/20 text-foreground">
                  {getCharacterStatOptions(stats).map(option => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="text-foreground focus:bg-primary/20 focus:text-primary"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-muted-foreground">Steigerung</label>
              <Input
                type="number"
                value={editValues.steigerung}
                onChange={(e) => setEditValues({ ...editValues, steigerung: Number(e.target.value) })}
                className="bg-secondary/40 border-primary/10 text-foreground"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-muted-foreground">Wert (Spielwert + Steigerung)</label>
              <div className="bg-secondary/60 border border-primary/20 text-foreground rounded-md px-3 py-2 h-10">
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
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Löschen
            </Button>
          )}
          
          <div className="flex space-x-2">
            <Button 
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="border-primary/20 hover:bg-secondary/60 text-foreground"
            >
              Abbrechen
            </Button>
            <Button 
              onClick={onSave}
              className="bg-primary hover:bg-primary/80 text-primary-foreground"
            >
              Speichern
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

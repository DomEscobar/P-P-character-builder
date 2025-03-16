
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Talent } from "@/types/character";
import { Award } from "lucide-react";

interface TalentEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTalent: Talent | null;
  editValues: { name: string; stufe: string; beschreibung: string };
  setEditValues: React.Dispatch<React.SetStateAction<{ name: string; stufe: string; beschreibung: string }>>;
  onSave: () => void;
  onDelete: () => void;
}

export function TalentEditDialog({
  open,
  onOpenChange,
  selectedTalent,
  editValues,
  setEditValues,
  onSave,
  onDelete,
}: TalentEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#f5e8c8] border-[#d8c38d] text-[#4e3c10] max-w-sm">
        <div className="absolute -top-2 -left-2 text-[#8b7339] opacity-30">
          <Award size={24} />
        </div>
        <div className="absolute -bottom-2 -right-2 text-[#8b7339] opacity-30 transform rotate-180">
          <Award size={24} />
        </div>
        
        <DialogHeader>
          <DialogTitle className="text-[#4e3c10] font-serif text-xl text-center">
            {selectedTalent?.name ? `${selectedTalent.name} bearbeiten` : "Neues Talent"}
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
              <label className="text-sm text-[#6b592b] font-medium">Stufe</label>
              <Input
                value={editValues.stufe}
                onChange={(e) => setEditValues({ ...editValues, stufe: e.target.value })}
                className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10]"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#6b592b] font-medium">Beschreibung</label>
              <Textarea
                value={editValues.beschreibung}
                onChange={(e) => setEditValues({ ...editValues, beschreibung: e.target.value })}
                className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10] min-h-[80px]"
              />
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between">
          {selectedTalent && (
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

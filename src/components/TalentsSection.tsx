
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Award, Scroll } from "lucide-react";
import { useTalents } from "@/context/TalentsContext";
import type { Talent } from "@/types/character";
import { TalentItem } from "./talents/TalentItem";
import { TalentEditDialog } from "./talents/TalentEditDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";

export function TalentsSection() {
  const { talents, updateTalent, addTalent, deleteTalent } = useTalents();
  const isMobile = useIsMobile();

  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editValues, setEditValues] = useState({ name: "", stufe: "", beschreibung: "" });

  const handleAddTalent = () => {
    const newId = `talent${Date.now()}`;
    setSelectedTalent({ id: newId, name: "", stufe: "", beschreibung: "" });
    setEditValues({ name: "", stufe: "", beschreibung: "" });
    setOpenDialog(true);
  };

  const handleEditTalent = (talent: Talent) => {
    setSelectedTalent(talent);
    setEditValues({
      name: talent.name,
      stufe: talent.stufe,
      beschreibung: talent.beschreibung
    });
    setOpenDialog(true);
  };

  const handleSaveTalent = () => {
    if (selectedTalent) {
      if (talents.some(t => t.id === selectedTalent.id)) {
        // Update existing talent
        updateTalent(selectedTalent.id, {
          name: editValues.name,
          stufe: editValues.stufe,
          beschreibung: editValues.beschreibung
        });
      } else {
        // Add new talent
        addTalent({
          id: selectedTalent.id,
          name: editValues.name,
          stufe: editValues.stufe,
          beschreibung: editValues.beschreibung
        });
      }
      setOpenDialog(false);
    }
  };

  const handleDeleteTalent = () => {
    if (selectedTalent) {
      deleteTalent(selectedTalent.id);
      setOpenDialog(false);
    }
  };

  return (
    <Card className="bg-[#f5e8c8] border-[#d8c38d] shadow-sm relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-2 left-2 text-[#8b7339] opacity-20">
        <Scroll size={isMobile ? 20 : 24} />
      </div>
      <div className="absolute bottom-2 right-2 text-[#8b7339] opacity-20 transform rotate-180">
        <Scroll size={isMobile ? 20 : 24} />
      </div>
      
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-[#4e3c10] font-serif text-lg">Talente</CardTitle>
        <Button 
          onClick={handleAddTalent}
          size="sm"
          className="bg-[#8b7339] hover:bg-[#6b592b] text-[#f5e8c8] h-7 text-xs"
        >
          <Plus size={14} className="mr-1" /> Hinzufügen
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {talents.length > 0 ? (
            talents.map((talent) => (
              <TalentItem 
                key={talent.id} 
                talent={talent} 
                onEdit={handleEditTalent} 
              />
            ))
          ) : (
            <div className="text-center py-6 text-[#6b592b] italic">
              Keine Talente vorhanden. Klicke auf "Hinzufügen" um zu beginnen.
            </div>
          )}
        </div>

        <TalentEditDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          selectedTalent={selectedTalent}
          editValues={editValues}
          setEditValues={setEditValues}
          onSave={handleSaveTalent}
          onDelete={handleDeleteTalent}
        />
      </CardContent>
    </Card>
  );
}

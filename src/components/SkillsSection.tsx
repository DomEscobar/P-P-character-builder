
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Scroll } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";
import type { Skill } from "@/context/CharacterContext";
import { SkillItem } from "./skills/SkillItem";
import { SkillEditDialog } from "./skills/SkillEditDialog";
import { calculateWert } from "@/utils/skillUtils";
import { useIsMobile } from "@/hooks/use-mobile";

export function SkillsSection() {
  const { skills, addSkill, updateSkill, deleteSkill, stats } = useCharacter();
  const isMobile = useIsMobile();

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editValues, setEditValues] = useState({ name: "", spielwert: "", steigerung: 0 });

  const handleAddSkill = () => {
    const newId = `skill${Date.now()}`;
    setSelectedSkill({ id: newId, name: "", spielwert: "", steigerung: 0 });
    setEditValues({ name: "", spielwert: "", steigerung: 0 });
    setOpenDialog(true);
  };

  const handleEditSkill = (skill: Skill) => {
    setSelectedSkill(skill);
    setEditValues({
      name: skill.name,
      spielwert: skill.spielwert,
      steigerung: skill.steigerung
    });
    setOpenDialog(true);
  };

  const handleSaveSkill = () => {
    if (selectedSkill) {
      if (skills.some(s => s.id === selectedSkill.id)) {
        // Update existing skill
        updateSkill(selectedSkill.id, {
          name: editValues.name,
          spielwert: editValues.spielwert,
          steigerung: editValues.steigerung
        });
      } else {
        // Add new skill
        addSkill({
          id: selectedSkill.id,
          name: editValues.name,
          spielwert: editValues.spielwert,
          steigerung: editValues.steigerung
        });
      }
      setOpenDialog(false);
    }
  };

  const handleDeleteSkill = () => {
    if (selectedSkill) {
      deleteSkill(selectedSkill.id);
      setOpenDialog(false);
    }
  };

  const calculateSkillWert = (skill: Skill): number => {
    return calculateWert(skill, stats);
  };

  return (
    <Card className="relative bg-[#f5e8c8] border-[#d8c38d] border-2 shadow-md overflow-hidden">
      {/* Decorative scroll elements */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#8b7339] rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#8b7339] rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#8b7339] rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#8b7339] rounded-br-lg"></div>
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-[#d8c38d]">
        <CardTitle className="text-[#4e3c10] font-serif text-lg flex items-center gap-2">
          <Scroll className="text-[#8b7339]" size={isMobile ? 18 : 22} />
          Fähigkeiten
        </CardTitle>
        <Button 
          onClick={handleAddSkill}
          size={isMobile ? "sm" : "default"}
          className="bg-[#8b7339] hover:bg-[#6b592b] text-[#f5e8c8] h-8 text-xs font-serif"
        >
          <Plus size={14} className="mr-1" /> Hinzufügen
        </Button>
      </CardHeader>
      
      <CardContent className={`${isMobile ? 'p-2 pt-3' : 'p-4 pt-6'}`}>
        {skills.length === 0 ? (
          <div className="text-center py-6 text-[#8b7339] font-serif">
            <p>Keine Fähigkeiten vorhanden.</p>
            <p className="text-sm mt-2">Füge deine erste Fähigkeit hinzu!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
            {skills.map((skill) => (
              <SkillItem 
                key={skill.id} 
                skill={skill} 
                wert={calculateSkillWert(skill)} 
                onEdit={handleEditSkill} 
              />
            ))}
          </div>
        )}

        <SkillEditDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          selectedSkill={selectedSkill}
          editValues={editValues}
          setEditValues={setEditValues}
          onSave={handleSaveSkill}
          onDelete={handleDeleteSkill}
          stats={stats}
          calculateWert={(skill) => calculateWert(skill, stats)}
        />
      </CardContent>
    </Card>
  );
}

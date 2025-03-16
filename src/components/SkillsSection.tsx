
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
    <Card className="bg-[#f5e8c8] border-[#d8c38d] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-[#4e3c10] font-serif text-lg">Fähigkeiten</CardTitle>
        <Button 
          onClick={handleAddSkill}
          size={isMobile ? "sm" : "default"}
          className="bg-[#8b7339] hover:bg-[#6b592b] text-[#f5e8c8] h-7 text-xs"
        >
          <Plus size={14} className="mr-1" /> Hinzufügen
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {skills.map((skill) => (
            <SkillItem 
              key={skill.id} 
              skill={skill} 
              wert={calculateSkillWert(skill)} 
              onEdit={handleEditSkill} 
            />
          ))}
        </div>

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

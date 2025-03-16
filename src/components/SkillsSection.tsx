
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";
import type { Skill } from "@/context/CharacterContext";
import { SkillItem } from "./skills/SkillItem";
import { SkillEditDialog } from "./skills/SkillEditDialog";
import { calculateWert } from "@/utils/skillUtils";

export function SkillsSection() {
  const { skills, addSkill, updateSkill, deleteSkill, stats } = useCharacter();

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
    <Card className="bg-[#332d2d] border-[#473b3b]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[#d4af37] text-center">Fähigkeiten</CardTitle>
        <Button 
          onClick={handleAddSkill}
          className="bg-[#403e43] hover:bg-[#53525a] text-[#d4af37]"
        >
          <Plus size={16} className="mr-1" /> Fähigkeit hinzufügen
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scroll, Plus } from "lucide-react";
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
    <Card className="bg-[#f5e8c8] border-[#d8c38d] shadow-md relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-2 right-2 text-[#d8c38d] opacity-10">
        <Scroll size={isMobile ? 30 : 50} />
      </div>
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-[#e2cc9c]">
        <CardTitle className="text-[#4e3c10] font-serif text-lg flex items-center">
          <Scroll size={16} className="mr-2" />
          Fähigkeiten
        </CardTitle>
        <Button 
          onClick={handleAddSkill}
          size="sm"
          className="bg-[#8b7339] hover:bg-[#6b592b] text-[#f5e8c8] h-7 text-xs"
        >
          <Plus size={14} className="mr-1" /> Hinzufügen
        </Button>
      </CardHeader>
      
      <CardContent className="pt-4">
        {skills.length === 0 ? (
          <div className="text-center py-8 text-[#8b7339] italic">
            Keine Fähigkeiten vorhanden
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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

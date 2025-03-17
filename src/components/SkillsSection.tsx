import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ScrollText } from "lucide-react";
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
    <div className="bg-[#1D1210]/90 border border-[#513428] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.3)] p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#540804] via-[#AA3C3B] to-[#540804]"></div>
      
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold text-[#E4D8B4] font-serif">Fähigkeiten</h2>
        <div className="ml-auto flex items-center">
          <Button 
            onClick={handleAddSkill}
            size="sm"
            className="bg-gradient-to-b from-[#540804] to-[#380303] text-[#E4D8B4] hover:from-[#6A1008] hover:to-[#480404] border border-[#513428] h-7"
          >
            <Plus size={14} className="mr-1" /> Hinzufügen
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skills.map((skill) => (
          <SkillItem 
            key={skill.id} 
            skill={skill} 
            wert={30} // Using fixed value 30 as shown in screenshot
            onEdit={handleEditSkill} 
          />
        ))}
        
        {/* Empty state */}
        {skills.length === 0 && (
          <div className="col-span-full text-center py-6 text-[#867E70] italic">
            Keine Fähigkeiten vorhanden. Klicke auf "Hinzufügen" um zu beginnen.
          </div>
        )}
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
    </div>
  );
}

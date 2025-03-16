
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { defaultStats, Stat } from "./CharacterStats";

type Skill = {
  id: string;
  name: string;
  spielwert: string;
  steigerung: number;
};

// Get character stats to use in the dropdown
const getCharacterStatOptions = () => {
  return defaultStats.map(stat => ({
    value: stat.short,
    label: `${stat.name} (${stat.short})`,
    baseValue: stat.start
  }));
};

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([
    { id: "1", name: "Anführen", spielwert: "CH", steigerung: 0 },
    { id: "2", name: "Klettern", spielwert: "ST", steigerung: 0 },
    { id: "3", name: "Orientierung", spielwert: "IN", steigerung: 0 },
    { id: "4", name: "Reiten", spielwert: "GW", steigerung: 0 },
    { id: "5", name: "Schleichen", spielwert: "GW", steigerung: 0 },
  ]);

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editValues, setEditValues] = useState({ name: "", spielwert: "", steigerung: 0 });

  // Calculate the total value based on base value of spielwert + steigerung
  const calculateWert = (skill: Skill): number => {
    const statOption = getCharacterStatOptions().find(option => option.value === skill.spielwert);
    return statOption ? statOption.baseValue + skill.steigerung : 0;
  };

  const handleAddSkill = () => {
    const newId = `skill${skills.length + 1}`;
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
      const existingIndex = skills.findIndex(s => s.id === selectedSkill.id);
      const updatedSkills = [...skills];
      
      const updatedSkill = {
        ...selectedSkill,
        name: editValues.name,
        spielwert: editValues.spielwert,
        steigerung: editValues.steigerung
      };

      if (existingIndex >= 0) {
        // Update existing skill
        updatedSkills[existingIndex] = updatedSkill;
      } else {
        // Add new skill
        updatedSkills.push(updatedSkill);
      }

      setSkills(updatedSkills);
      setOpenDialog(false);
    }
  };

  const handleDeleteSkill = () => {
    if (selectedSkill) {
      const updatedSkills = skills.filter(skill => skill.id !== selectedSkill.id);
      setSkills(updatedSkills);
      setOpenDialog(false);
    }
  };

  const calculateStrokeWidth = (value: number) => {
    return value > 0 ? 10 : 5;
  };

  const getStrokeDashArray = (value: number) => {
    return `${value > 0 ? (value / 100) * 251.2 : 0} 251.2`;
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
          {skills.map((skill) => {
            const wert = calculateWert(skill);
            return (
              <div 
                key={skill.id}
                className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleEditSkill(skill)}
              >
                <div className="relative flex items-center justify-center w-24 h-24 mb-2">
                  {/* Background circle */}
                  <svg className="absolute" width="100%" height="100%" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3a3333"
                      strokeWidth="10"
                    />
                  </svg>
                  
                  {/* Progress circle */}
                  <svg className="absolute transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#d4af37"
                      strokeWidth={calculateStrokeWidth(wert)}
                      strokeDasharray={getStrokeDashArray(wert)}
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Value in the middle */}
                  <div className="z-10 text-3xl font-bold text-white">
                    {wert}
                  </div>
                </div>
                
                <div className="flex items-center justify-center bg-[#3a3333] px-4 py-1 rounded-full">
                  <span className="text-sm font-medium text-[#d4af37]">{skill.name}</span>
                </div>
              </div>
            );
          })}
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-[#262222] border-[#473b3b] text-[#e0d0b0]">
            <DialogHeader>
              <DialogTitle className="text-[#d4af37]">
                {selectedSkill?.name ? `${selectedSkill.name} bearbeiten` : "Neue Fähigkeit"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm text-[#c0b090]">Name</label>
                  <Input
                    value={editValues.name}
                    onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                    className="bg-[#332d2d] border-[#473b3b] text-[#e0d0b0]"
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <label className="text-sm text-[#c0b090]">Spielwert</label>
                  <Select 
                    value={editValues.spielwert}
                    onValueChange={(value) => setEditValues({ ...editValues, spielwert: value })}
                  >
                    <SelectTrigger className="bg-[#332d2d] border-[#473b3b] text-[#e0d0b0]">
                      <SelectValue placeholder="Wähle einen Spielwert" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#262222] border-[#473b3b] text-[#e0d0b0]">
                      {getCharacterStatOptions().map(option => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className="text-[#e0d0b0] focus:bg-[#473b3b] focus:text-[#d4af37]"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <label className="text-sm text-[#c0b090]">Steigerung</label>
                  <Input
                    type="number"
                    value={editValues.steigerung}
                    onChange={(e) => setEditValues({ ...editValues, steigerung: Number(e.target.value) })}
                    className="bg-[#332d2d] border-[#473b3b] text-[#e0d0b0]"
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <label className="text-sm text-[#c0b090]">Wert (Spielwert + Steigerung)</label>
                  <div className="bg-[#332d2d] border border-[#473b3b] text-[#e0d0b0] rounded-md px-3 py-2 h-10">
                    {editValues.spielwert 
                      ? getCharacterStatOptions().find(option => option.value === editValues.spielwert)?.baseValue + editValues.steigerung 
                      : "—"}
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex justify-between">
              {selectedSkill?.id && selectedSkill.id.indexOf("skill") === 0 ? (
                <Button 
                  onClick={handleDeleteSkill}
                  className="bg-red-800 hover:bg-red-700 text-white"
                >
                  Löschen
                </Button>
              ) : <div></div>}
              
              <div className="flex space-x-2">
                <Button 
                  onClick={() => setOpenDialog(false)}
                  className="bg-[#332d2d] hover:bg-[#473b3b] text-[#e0d0b0]"
                >
                  Abbrechen
                </Button>
                <Button 
                  onClick={handleSaveSkill}
                  className="bg-[#d4af37] hover:bg-[#c09a20] text-[#262222]"
                >
                  Speichern
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

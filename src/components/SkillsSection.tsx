
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

type Skill = {
  id: string;
  name: string;
  spielwert: string;
  steigerung: number;
  wert: string;
};

// Get character stats to use in the dropdown
const getCharacterStatOptions = () => {
  return [
    { value: "KG", label: "Kampfgeschick (KG)" },
    { value: "BF", label: "Ballistische Fertigkeit (BF)" },
    { value: "ST", label: "Stärke (ST)" },
    { value: "WI", label: "Widerstand (WI)" },
    { value: "GW", label: "Gewandtheit (GW)" },
    { value: "GS", label: "Geschwindigkeit (GS)" },
    { value: "IN", label: "Intelligenz (IN)" },
    { value: "WK", label: "Willenskraft (WK)" },
    { value: "CH", label: "Charisma (CH)" },
  ];
};

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([
    { id: "1", name: "Anführen", spielwert: "CH", steigerung: 0, wert: "13" },
    { id: "2", name: "Klettern", spielwert: "ST", steigerung: 0, wert: "10" },
    { id: "3", name: "Orientierung", spielwert: "IN", steigerung: 0, wert: "15" },
    { id: "4", name: "Reiten", spielwert: "GW", steigerung: 0, wert: "12" },
    { id: "5", name: "Schleichen", spielwert: "GW", steigerung: 0, wert: "12" },
  ]);

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editValues, setEditValues] = useState({ name: "", spielwert: "", steigerung: 0, wert: "" });

  const handleAddSkill = () => {
    const newId = `skill${skills.length + 1}`;
    setSelectedSkill({ id: newId, name: "", spielwert: "", steigerung: 0, wert: "" });
    setEditValues({ name: "", spielwert: "", steigerung: 0, wert: "" });
    setOpenDialog(true);
  };

  const handleEditSkill = (skill: Skill) => {
    setSelectedSkill(skill);
    setEditValues({
      name: skill.name,
      spielwert: skill.spielwert,
      steigerung: skill.steigerung,
      wert: skill.wert
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
        steigerung: editValues.steigerung,
        wert: editValues.wert
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

  const calculateStrokeWidth = (value: string) => {
    return parseInt(value) > 0 ? 10 : 5;
  };

  const getStrokeDashArray = (value: string) => {
    const numValue = parseInt(value) || 0;
    return `${numValue > 0 ? (numValue / 100) * 251.2 : 0} 251.2`;
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
                    strokeWidth={calculateStrokeWidth(skill.wert)}
                    strokeDasharray={getStrokeDashArray(skill.wert)}
                    strokeLinecap="round"
                  />
                </svg>
                
                {/* Value in the middle */}
                <div className="z-10 text-3xl font-bold text-white">
                  {skill.wert}
                </div>
              </div>
              
              <div className="flex items-center justify-center bg-[#3a3333] px-4 py-1 rounded-full">
                <span className="text-sm font-medium text-[#d4af37]">{skill.name}</span>
              </div>
            </div>
          ))}
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
                  <label className="text-sm text-[#c0b090]">Wert</label>
                  <Input
                    value={editValues.wert}
                    onChange={(e) => setEditValues({ ...editValues, wert: e.target.value })}
                    className="bg-[#332d2d] border-[#473b3b] text-[#e0d0b0]"
                  />
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

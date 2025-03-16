
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Book, Target } from "lucide-react";

type Skill = {
  id: string;
  name: string;
  spielwert: string;
  steigerung: number;
  wert: string;
};

export function SkillsSection() {
  const [basicSkills, setBasicSkills] = useState<Skill[]>([
    { id: "1", name: "Anführen", spielwert: "CH", steigerung: 0, wert: "" },
    { id: "2", name: "Klettern", spielwert: "ST", steigerung: 0, wert: "" },
    { id: "3", name: "Orientierung", spielwert: "IN", steigerung: 0, wert: "" },
    { id: "4", name: "Reiten", spielwert: "GW", steigerung: 0, wert: "" },
    { id: "5", name: "Schleichen", spielwert: "GW", steigerung: 0, wert: "" },
  ]);

  const [advancedSkills, setAdvancedSkills] = useState<Skill[]>(
    Array(10).fill(null).map((_, index) => ({
      id: `adv${index + 1}`,
      name: "",
      spielwert: "",
      steigerung: 0,
      wert: "",
    }))
  );

  const handleBasicSkillChange = (index: number, field: keyof Skill, value: string | number) => {
    const newSkills = [...basicSkills];
    newSkills[index][field] = value;
    setBasicSkills(newSkills);
  };

  const handleAdvancedSkillChange = (index: number, field: keyof Skill, value: string | number) => {
    const newSkills = [...advancedSkills];
    newSkills[index][field] = value;
    setAdvancedSkills(newSkills);
  };

  return (
    <Card className="bg-[#332d2d] border-[#473b3b]">
      <CardHeader>
        <CardTitle className="text-[#d4af37] text-center">Fähigkeiten</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="grid grid-cols-2 mb-4 bg-[#262222]">
            <TabsTrigger value="basic" className="flex items-center">
              <Book size={16} className="mr-2" />
              Grundfähigkeiten
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center">
              <Target size={16} className="mr-2" />
              Ausbaufähigkeiten
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <SkillTable 
              skills={basicSkills} 
              onChange={handleBasicSkillChange} 
            />
          </TabsContent>
          
          <TabsContent value="advanced">
            <SkillTable 
              skills={advancedSkills} 
              onChange={handleAdvancedSkillChange} 
              editable
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function SkillTable({ 
  skills, 
  onChange, 
  editable = false 
}: { 
  skills: Skill[];
  onChange: (index: number, field: keyof Skill, value: string | number) => void;
  editable?: boolean;
}) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-[#473b3b]">
            <TableHead className="text-[#d4af37]">Name</TableHead>
            <TableHead className="text-[#d4af37] w-20">Spielwert</TableHead>
            <TableHead className="text-[#d4af37] w-24">Steig.</TableHead>
            <TableHead className="text-[#d4af37] w-20">Wert</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills.map((skill, index) => (
            <TableRow key={skill.id} className="border-[#473b3b]">
              <TableCell>
                {editable ? (
                  <Input
                    value={skill.name}
                    onChange={(e) => onChange(index, 'name', e.target.value)}
                    className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] h-8"
                  />
                ) : (
                  skill.name
                )}
              </TableCell>
              <TableCell>
                <Input
                  value={skill.spielwert}
                  onChange={(e) => onChange(index, 'spielwert', e.target.value)}
                  className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] h-8"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={skill.steigerung}
                  onChange={(e) => onChange(index, 'steigerung', Number(e.target.value))}
                  className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] h-8"
                />
              </TableCell>
              <TableCell>
                <Input
                  value={skill.wert}
                  onChange={(e) => onChange(index, 'wert', e.target.value)}
                  className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] h-8"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

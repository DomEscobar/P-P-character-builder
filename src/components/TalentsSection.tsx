
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";

export function TalentsSection() {
  const { talents, updateTalent } = useCharacter();

  const handleTalentChange = (index: number, field: string, value: string) => {
    updateTalent(index, { [field]: value });
  };

  return (
    <Card className="bg-[#332d2d] border-[#473b3b]">
      <CardHeader>
        <CardTitle className="text-[#d4af37] text-center">Talente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {talents.map((talent, index) => (
          <div 
            key={talent.id} 
            className="p-3 bg-[#262222] rounded-md border border-[#473b3b]"
          >
            <div className="flex items-center gap-2 mb-2">
              <Star size={16} className="text-[#d4af37]" />
              <Input
                value={talent.name}
                onChange={(e) => handleTalentChange(index, 'name', e.target.value)}
                placeholder="Talentname"
                className="bg-[#332d2d] border-[#473b3b] text-[#e0d0b0] h-8 flex-1"
              />
              <Input
                value={talent.stufe}
                onChange={(e) => handleTalentChange(index, 'stufe', e.target.value)}
                placeholder="Stufe"
                className="bg-[#332d2d] border-[#473b3b] text-[#e0d0b0] h-8 w-20"
              />
            </div>
            <Textarea
              value={talent.beschreibung}
              onChange={(e) => handleTalentChange(index, 'beschreibung', e.target.value)}
              placeholder="Beschreibung des Talents..."
              className="bg-[#332d2d] border-[#473b3b] text-[#e0d0b0] min-h-[60px]"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

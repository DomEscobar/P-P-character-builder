
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Flag, Scroll } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";
import { useIsMobile } from "@/hooks/use-mobile";

export function GoalsSection() {
  const { goals, updateGoals } = useCharacter();
  const isMobile = useIsMobile();

  return (
    <Card className="bg-[#f5e8c8] border-[#d8c38d] shadow-sm relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-2 left-2 text-[#8b7339] opacity-20">
        <Scroll size={isMobile ? 20 : 24} />
      </div>
      <div className="absolute bottom-2 right-2 text-[#8b7339] opacity-20 transform rotate-180">
        <Scroll size={isMobile ? 20 : 24} />
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-[#4e3c10] font-serif text-lg flex items-center">
          <Flag size={isMobile ? 18 : 20} className="mr-2 text-[#8b7339]" />
          Ziele
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="kurzfristig" className="text-[#6b592b] font-medium">Kurzfristig</Label>
          <Textarea
            id="kurzfristig"
            value={goals.kurzfristig}
            onChange={(e) => updateGoals({ kurzfristig: e.target.value })}
            placeholder="Kurzfristige Ziele deines Charakters..."
            className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] min-h-[80px] focus:border-[#8b7339] focus:ring-[#8b7339]/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="langfristig" className="text-[#6b592b] font-medium">Langfristig</Label>
          <Textarea
            id="langfristig"
            value={goals.langfristig}
            onChange={(e) => updateGoals({ langfristig: e.target.value })}
            placeholder="Langfristige Ziele deines Charakters..."
            className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] min-h-[80px] focus:border-[#8b7339] focus:ring-[#8b7339]/20"
          />
        </div>
      </CardContent>
    </Card>
  );
}

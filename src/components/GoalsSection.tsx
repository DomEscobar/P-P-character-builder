
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Flag } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";

export function GoalsSection() {
  const { goals, updateGoals } = useCharacter();

  return (
    <Card className="bg-card/70 backdrop-blur-md border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-primary flex items-center">
          <Flag size={18} className="mr-2" />
          Ziele
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="kurzfristig" className="text-muted-foreground">Kurzfristig</Label>
          <Textarea
            id="kurzfristig"
            value={goals.kurzfristig}
            onChange={(e) => updateGoals({ kurzfristig: e.target.value })}
            placeholder="Kurzfristige Ziele deines Charakters..."
            className="bg-secondary/40 border-primary/10 text-foreground min-h-[80px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="langfristig" className="text-muted-foreground">Langfristig</Label>
          <Textarea
            id="langfristig"
            value={goals.langfristig}
            onChange={(e) => updateGoals({ langfristig: e.target.value })}
            placeholder="Langfristige Ziele deines Charakters..."
            className="bg-secondary/40 border-primary/10 text-foreground min-h-[80px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}

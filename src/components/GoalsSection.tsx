
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Flag } from "lucide-react";

export function GoalsSection() {
  const [goals, setGoals] = useState({
    kurzfristig: "",
    langfristig: ""
  });

  return (
    <Card className="bg-[#332d2d] border-[#473b3b]">
      <CardHeader>
        <CardTitle className="text-[#d4af37] flex items-center">
          <Flag size={18} className="mr-2" />
          Ziele
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="kurzfristig" className="text-[#e0d0b0]">Kurzfristig</Label>
          <Textarea
            id="kurzfristig"
            value={goals.kurzfristig}
            onChange={(e) => setGoals({ ...goals, kurzfristig: e.target.value })}
            placeholder="Kurzfristige Ziele deines Charakters..."
            className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] min-h-[80px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="langfristig" className="text-[#e0d0b0]">Langfristig</Label>
          <Textarea
            id="langfristig"
            value={goals.langfristig}
            onChange={(e) => setGoals({ ...goals, langfristig: e.target.value })}
            placeholder="Langfristige Ziele deines Charakters..."
            className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] min-h-[80px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}

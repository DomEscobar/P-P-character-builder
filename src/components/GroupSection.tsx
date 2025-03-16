
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";

export function GroupSection() {
  const [group, setGroup] = useState({
    name: "",
    kurzfristig: "",
    langfristig: "",
    mitglieder: ""
  });

  return (
    <Card className="bg-[#332d2d] border-[#473b3b]">
      <CardHeader>
        <CardTitle className="text-[#d4af37] flex items-center">
          <Users size={18} className="mr-2" />
          Gruppe
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="gruppenname" className="text-[#e0d0b0]">Gruppenname</Label>
          <Input
            id="gruppenname"
            value={group.name}
            onChange={(e) => setGroup({ ...group, name: e.target.value })}
            placeholder="Name der Gruppe"
            className="bg-[#262222] border-[#473b3b] text-[#e0d0b0]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="kurzfristig_gruppe" className="text-[#e0d0b0]">Kurzfristig</Label>
          <Textarea
            id="kurzfristig_gruppe"
            value={group.kurzfristig}
            onChange={(e) => setGroup({ ...group, kurzfristig: e.target.value })}
            placeholder="Kurzfristige Ziele der Gruppe..."
            className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] min-h-[80px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="langfristig_gruppe" className="text-[#e0d0b0]">Langfristig</Label>
          <Textarea
            id="langfristig_gruppe"
            value={group.langfristig}
            onChange={(e) => setGroup({ ...group, langfristig: e.target.value })}
            placeholder="Langfristige Ziele der Gruppe..."
            className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] min-h-[80px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mitglieder" className="text-[#e0d0b0]">Mitglieder</Label>
          <Textarea
            id="mitglieder"
            value={group.mitglieder}
            onChange={(e) => setGroup({ ...group, mitglieder: e.target.value })}
            placeholder="Namen und Details der Gruppenmitglieder..."
            className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] min-h-[80px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}

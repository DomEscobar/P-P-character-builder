
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";

export function GroupSection() {
  const { group, updateGroup } = useCharacter();

  return (
    <Card className="bg-card/70 backdrop-blur-md border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-primary flex items-center">
          <Users size={18} className="mr-2" />
          Gruppe
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="gruppenname" className="text-muted-foreground">Gruppenname</Label>
          <Input
            id="gruppenname"
            value={group.name}
            onChange={(e) => updateGroup({ name: e.target.value })}
            placeholder="Name der Gruppe"
            className="bg-secondary/40 border-primary/10 text-foreground"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="kurzfristig_gruppe" className="text-muted-foreground">Kurzfristig</Label>
          <Textarea
            id="kurzfristig_gruppe"
            value={group.kurzfristig}
            onChange={(e) => updateGroup({ kurzfristig: e.target.value })}
            placeholder="Kurzfristige Ziele der Gruppe..."
            className="bg-secondary/40 border-primary/10 text-foreground min-h-[80px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="langfristig_gruppe" className="text-muted-foreground">Langfristig</Label>
          <Textarea
            id="langfristig_gruppe"
            value={group.langfristig}
            onChange={(e) => updateGroup({ langfristig: e.target.value })}
            placeholder="Langfristige Ziele der Gruppe..."
            className="bg-secondary/40 border-primary/10 text-foreground min-h-[80px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mitglieder" className="text-muted-foreground">Mitglieder</Label>
          <Textarea
            id="mitglieder"
            value={group.mitglieder}
            onChange={(e) => updateGroup({ mitglieder: e.target.value })}
            placeholder="Namen und Details der Gruppenmitglieder..."
            className="bg-secondary/40 border-primary/10 text-foreground min-h-[80px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}

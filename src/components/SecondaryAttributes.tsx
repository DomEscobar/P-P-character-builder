
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Heart, Shield, Star, ArrowRight } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";
import { useIsMobile } from "@/hooks/use-mobile";

export function SecondaryAttributes() {
  const { secondary, updateSecondary } = useCharacter();
  const { fate, toughness, experience, movement } = secondary;
  const isMobile = useIsMobile();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-card/70 backdrop-blur-md border-primary/20 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-sm flex items-center">
            <Heart size={16} className="mr-2 text-red-400" />
            Schicksal & Zähigkeit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="schicksal" className="text-xs text-muted-foreground">Schicksal</Label>
              <Input
                id="schicksal"
                type="number"
                value={fate.schicksal}
                onChange={(e) => updateSecondary({ 
                  fate: { ...fate, schicksal: Number(e.target.value) } 
                })}
                className="bg-secondary/40 border-primary/10 text-foreground h-8"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="glueck" className="text-xs text-muted-foreground">Glück</Label>
              <Input
                id="glueck"
                type="number"
                value={fate.glueck}
                onChange={(e) => updateSecondary({ 
                  fate: { ...fate, glueck: Number(e.target.value) } 
                })}
                className="bg-secondary/40 border-primary/10 text-foreground h-8"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zaehigkeit" className="text-xs text-muted-foreground">Zähigkeit</Label>
              <Input
                id="zaehigkeit"
                type="number"
                value={toughness.zaehigkeit}
                onChange={(e) => updateSecondary({ 
                  toughness: { ...toughness, zaehigkeit: Number(e.target.value) } 
                })}
                className="bg-secondary/40 border-primary/10 text-foreground h-8"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mut" className="text-xs text-muted-foreground">Mut</Label>
              <Input
                id="mut"
                type="number"
                value={toughness.mut}
                onChange={(e) => updateSecondary({ 
                  toughness: { ...toughness, mut: Number(e.target.value) } 
                })}
                className="bg-secondary/40 border-primary/10 text-foreground h-8"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="motivation" className="text-xs text-muted-foreground">Motivation</Label>
            <Input
              id="motivation"
              value={toughness.motivation}
              onChange={(e) => updateSecondary({ 
                toughness: { ...toughness, motivation: e.target.value } 
              })}
              className="bg-secondary/40 border-primary/10 text-foreground h-8"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/70 backdrop-blur-md border-primary/20 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-sm flex items-center">
            <Star size={16} className="mr-2 text-yellow-400" />
            Erfahrung
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs mb-1 text-muted-foreground">
              <span>Aktuell: {experience.aktuell}</span>
              <span>Gesamt: {experience.gesamt}</span>
            </div>
            <Progress 
              value={(experience.aktuell / Math.max(experience.gesamt, 1)) * 100} 
              className="h-2 bg-secondary/40" 
              indicatorClassName="bg-primary"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="aktuell" className="text-xs text-muted-foreground">Aktuell</Label>
              <Input
                id="aktuell"
                type="number"
                value={experience.aktuell}
                onChange={(e) => updateSecondary({ 
                  experience: { ...experience, aktuell: Number(e.target.value) } 
                })}
                className="bg-secondary/40 border-primary/10 text-foreground h-8"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ausgegeben" className="text-xs text-muted-foreground">Ausgeg.</Label>
              <Input
                id="ausgegeben"
                type="number"
                value={experience.ausgegeben}
                onChange={(e) => updateSecondary({ 
                  experience: { ...experience, ausgegeben: Number(e.target.value) } 
                })}
                className="bg-secondary/40 border-primary/10 text-foreground h-8"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gesamt" className="text-xs text-muted-foreground">Gesamt</Label>
              <Input
                id="gesamt"
                type="number"
                value={experience.gesamt}
                onChange={(e) => updateSecondary({ 
                  experience: { ...experience, gesamt: Number(e.target.value) } 
                })}
                className="bg-secondary/40 border-primary/10 text-foreground h-8"
              />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-primary text-sm flex items-center mt-2">
              <ArrowRight size={16} className="mr-2 text-blue-400" />
              Bewegung
            </CardTitle>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label htmlFor="bewegung" className="text-xs text-muted-foreground">Bewegung</Label>
                <Input
                  id="bewegung"
                  type="number"
                  value={movement.bewegung}
                  onChange={(e) => updateSecondary({ 
                    movement: { ...movement, bewegung: Number(e.target.value) } 
                  })}
                  className="bg-secondary/40 border-primary/10 text-foreground h-8"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gehen" className="text-xs text-muted-foreground">Gehen</Label>
                <Input
                  id="gehen"
                  type="number"
                  value={movement.gehen}
                  onChange={(e) => updateSecondary({ 
                    movement: { ...movement, gehen: Number(e.target.value) } 
                  })}
                  className="bg-secondary/40 border-primary/10 text-foreground h-8"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rennen" className="text-xs text-muted-foreground">Rennen</Label>
                <Input
                  id="rennen"
                  type="number"
                  value={movement.rennen}
                  onChange={(e) => updateSecondary({ 
                    movement: { ...movement, rennen: Number(e.target.value) } 
                  })}
                  className="bg-secondary/40 border-primary/10 text-foreground h-8"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

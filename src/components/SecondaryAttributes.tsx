
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Heart, Shield, Star, ArrowRight } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";

export function SecondaryAttributes() {
  const { secondary, updateSecondary } = useCharacter();
  const { fate, toughness, experience, movement } = secondary;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-[#f5e8c8] border-[#d8c38d] shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-[#4e3c10] text-sm flex items-center font-serif">
            <Heart size={15} className="mr-2 text-[#8b7339]" />
            Schicksal & Zähigkeit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="schicksal" className="text-xs text-[#6b592b]">Schicksal</Label>
              <Input
                id="schicksal"
                type="number"
                value={fate.schicksal}
                onChange={(e) => updateSecondary({ 
                  fate: { ...fate, schicksal: Number(e.target.value) } 
                })}
                className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10] h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="glueck" className="text-xs text-[#6b592b]">Glück</Label>
              <Input
                id="glueck"
                type="number"
                value={fate.glueck}
                onChange={(e) => updateSecondary({ 
                  fate: { ...fate, glueck: Number(e.target.value) } 
                })}
                className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10] h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="zaehigkeit" className="text-xs text-[#6b592b]">Zähigkeit</Label>
              <Input
                id="zaehigkeit"
                type="number"
                value={toughness.zaehigkeit}
                onChange={(e) => updateSecondary({ 
                  toughness: { ...toughness, zaehigkeit: Number(e.target.value) } 
                })}
                className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10] h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="mut" className="text-xs text-[#6b592b]">Mut</Label>
              <Input
                id="mut"
                type="number"
                value={toughness.mut}
                onChange={(e) => updateSecondary({ 
                  toughness: { ...toughness, mut: Number(e.target.value) } 
                })}
                className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10] h-7 text-xs"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="motivation" className="text-xs text-[#6b592b]">Motivation</Label>
            <Input
              id="motivation"
              value={toughness.motivation}
              onChange={(e) => updateSecondary({ 
                toughness: { ...toughness, motivation: e.target.value } 
              })}
              className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10] h-7 text-xs"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#f5e8c8] border-[#d8c38d] shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-[#4e3c10] text-sm flex items-center font-serif">
            <Star size={15} className="mr-2 text-[#8b7339]" />
            Erfahrung
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-3">
          <div className="space-y-2">
            <div className="flex justify-between text-xs mb-1 text-[#6b592b]">
              <span>Aktuell: {experience.aktuell}</span>
              <span>Gesamt: {experience.gesamt}</span>
            </div>
            <Progress 
              value={(experience.aktuell / Math.max(experience.gesamt, 1)) * 100} 
              className="h-2 bg-[#e2cc9c]" 
              indicatorClassName="bg-[#8b7339]"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label htmlFor="aktuell" className="text-xs text-[#6b592b]">Aktuell</Label>
              <Input
                id="aktuell"
                type="number"
                value={experience.aktuell}
                onChange={(e) => updateSecondary({ 
                  experience: { ...experience, aktuell: Number(e.target.value) } 
                })}
                className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10] h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="ausgegeben" className="text-xs text-[#6b592b]">Ausgeg.</Label>
              <Input
                id="ausgegeben"
                type="number"
                value={experience.ausgegeben}
                onChange={(e) => updateSecondary({ 
                  experience: { ...experience, ausgegeben: Number(e.target.value) } 
                })}
                className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10] h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="gesamt" className="text-xs text-[#6b592b]">Gesamt</Label>
              <Input
                id="gesamt"
                type="number"
                value={experience.gesamt}
                onChange={(e) => updateSecondary({ 
                  experience: { ...experience, gesamt: Number(e.target.value) } 
                })}
                className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10] h-7 text-xs"
              />
            </div>
          </div>
          <div className="space-y-1">
            <CardTitle className="text-[#4e3c10] text-xs flex items-center mt-2 font-serif">
              <ArrowRight size={14} className="mr-2 text-[#8b7339]" />
              Bewegung
            </CardTitle>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label htmlFor="bewegung" className="text-xs text-[#6b592b]">Bewegung</Label>
                <Input
                  id="bewegung"
                  type="number"
                  value={movement.bewegung}
                  onChange={(e) => updateSecondary({ 
                    movement: { ...movement, bewegung: Number(e.target.value) } 
                  })}
                  className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10] h-7 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="gehen" className="text-xs text-[#6b592b]">Gehen</Label>
                <Input
                  id="gehen"
                  type="number"
                  value={movement.gehen}
                  onChange={(e) => updateSecondary({ 
                    movement: { ...movement, gehen: Number(e.target.value) } 
                  })}
                  className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10] h-7 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="rennen" className="text-xs text-[#6b592b]">Rennen</Label>
                <Input
                  id="rennen"
                  type="number"
                  value={movement.rennen}
                  onChange={(e) => updateSecondary({ 
                    movement: { ...movement, rennen: Number(e.target.value) } 
                  })}
                  className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10] h-7 text-xs"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

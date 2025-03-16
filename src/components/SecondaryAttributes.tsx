
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Heart, Shield, Star, ArrowRight } from "lucide-react";

export function SecondaryAttributes() {
  const [fate, setFate] = useState({ schicksal: 0, glueck: 0 });
  const [toughness, setToughness] = useState({ zaehigkeit: 0, mut: 0, motivation: "" });
  const [experience, setExperience] = useState({ aktuell: 0, ausgegeben: 0, gesamt: 0 });
  const [movement, setMovement] = useState({ bewegung: 0, gehen: 0, rennen: 0 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-[#332d2d] border-[#473b3b]">
        <CardHeader className="pb-2">
          <CardTitle className="text-[#d4af37] text-sm flex items-center">
            <Heart size={16} className="mr-2" />
            Schicksal & Zähigkeit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="schicksal" className="text-xs">Schicksal</Label>
              <Input
                id="schicksal"
                type="number"
                value={fate.schicksal}
                onChange={(e) => setFate({ ...fate, schicksal: Number(e.target.value) })}
                className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] h-8"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="glueck" className="text-xs">Glück</Label>
              <Input
                id="glueck"
                type="number"
                value={fate.glueck}
                onChange={(e) => setFate({ ...fate, glueck: Number(e.target.value) })}
                className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] h-8"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zaehigkeit" className="text-xs">Zähigkeit</Label>
              <Input
                id="zaehigkeit"
                type="number"
                value={toughness.zaehigkeit}
                onChange={(e) => setToughness({ ...toughness, zaehigkeit: Number(e.target.value) })}
                className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] h-8"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mut" className="text-xs">Mut</Label>
              <Input
                id="mut"
                type="number"
                value={toughness.mut}
                onChange={(e) => setToughness({ ...toughness, mut: Number(e.target.value) })}
                className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] h-8"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="motivation" className="text-xs">Motivation</Label>
            <Input
              id="motivation"
              value={toughness.motivation}
              onChange={(e) => setToughness({ ...toughness, motivation: e.target.value })}
              className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] h-8"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#332d2d] border-[#473b3b]">
        <CardHeader className="pb-2">
          <CardTitle className="text-[#d4af37] text-sm flex items-center">
            <Star size={16} className="mr-2" />
            Erfahrung
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs mb-1">
              <span>Aktuell: {experience.aktuell}</span>
              <span>Gesamt: {experience.gesamt}</span>
            </div>
            <Progress 
              value={(experience.aktuell / Math.max(experience.gesamt, 1)) * 100} 
              className="h-2 bg-[#473b3b]" 
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="aktuell" className="text-xs">Aktuell</Label>
              <Input
                id="aktuell"
                type="number"
                value={experience.aktuell}
                onChange={(e) => setExperience({ ...experience, aktuell: Number(e.target.value) })}
                className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] h-8"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ausgegeben" className="text-xs">Ausgeg.</Label>
              <Input
                id="ausgegeben"
                type="number"
                value={experience.ausgegeben}
                onChange={(e) => setExperience({ ...experience, ausgegeben: Number(e.target.value) })}
                className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] h-8"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gesamt" className="text-xs">Gesamt</Label>
              <Input
                id="gesamt"
                type="number"
                value={experience.gesamt}
                onChange={(e) => setExperience({ ...experience, gesamt: Number(e.target.value) })}
                className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] h-8"
              />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-[#d4af37] text-sm flex items-center mt-2">
              <Footprints size={16} className="mr-2" />
              Bewegung
            </CardTitle>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label htmlFor="bewegung" className="text-xs">Bewegung</Label>
                <Input
                  id="bewegung"
                  type="number"
                  value={movement.bewegung}
                  onChange={(e) => setMovement({ ...movement, bewegung: Number(e.target.value) })}
                  className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] h-8"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gehen" className="text-xs">Gehen</Label>
                <Input
                  id="gehen"
                  type="number"
                  value={movement.gehen}
                  onChange={(e) => setMovement({ ...movement, gehen: Number(e.target.value) })}
                  className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] h-8"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rennen" className="text-xs">Rennen</Label>
                <Input
                  id="rennen"
                  type="number"
                  value={movement.rennen}
                  onChange={(e) => setMovement({ ...movement, rennen: Number(e.target.value) })}
                  className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] h-8"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

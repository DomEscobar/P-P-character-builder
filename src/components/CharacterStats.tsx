
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Target, 
  Dumbbell, 
  Brain, 
  Wind, 
  Footprints, 
  Eye, 
  Compass, 
  MessageCircle
} from "lucide-react";

type Stat = {
  name: string;
  short: string;
  icon: React.ReactNode;
  start: number;
  increase: number;
};

export function CharacterStats() {
  const [stats, setStats] = useState<Stat[]>([
    { name: "Kampfgeschick", short: "KG", icon: <Shield size={20} />, start: 30, increase: 5 },
    { name: "Ballistische Fertigkeit", short: "BF", icon: <Target size={20} />, start: 30, increase: 0 },
    { name: "Stärke", short: "ST", icon: <Dumbbell size={20} />, start: 30, increase: 5 },
    { name: "Widerstand", short: "WI", icon: <Shield size={20} />, start: 30, increase: 10 },
    { name: "Gewandtheit", short: "GW", icon: <Wind size={20} />, start: 30, increase: 5 },
    { name: "Geschwindigkeit", short: "GS", icon: <Footprints size={20} />, start: 30, increase: 0 },
    { name: "Intelligenz", short: "IN", icon: <Brain size={20} />, start: 30, increase: 5 },
    { name: "Willenskraft", short: "WK", icon: <Compass size={20} />, start: 30, increase: 0 },
    { name: "Charisma", short: "CH", icon: <MessageCircle size={20} />, start: 30, increase: 0 },
  ]);

  const handleStatChange = (index: number, field: 'start' | 'increase', value: number) => {
    const newStats = [...stats];
    newStats[index][field] = value;
    setStats(newStats);
  };

  return (
    <Card className="bg-[#332d2d] border-[#473b3b]">
      <CardHeader>
        <CardTitle className="text-[#d4af37] text-center">Spielwerte</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={stat.short} 
            className="flex items-center p-3 bg-[#262222] rounded-md border border-[#473b3b]"
          >
            <div className="mr-3 p-2 bg-[#3a3333] rounded-full">
              {stat.icon}
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-bold text-sm">{stat.short}</span>
                <span className="text-[#d4af37]">{stat.start + stat.increase}</span>
              </div>
              <Progress 
                value={(stat.start + stat.increase) / 100 * 100} 
                className="h-2 bg-[#473b3b]" 
              />
              <div className="flex justify-between mt-1 text-xs text-[#c0b090]">
                <span>Base: {stat.start}</span>
                <span>+{stat.increase}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

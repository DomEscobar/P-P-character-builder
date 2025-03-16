
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Target, 
  Dumbbell, 
  Brain, 
  Wind, 
  ArrowRight, 
  Compass, 
  MessageCircle
} from "lucide-react";

export type Stat = {
  name: string;
  short: string;
  icon: React.ReactNode;
  start: number;
  increase: number;
};

// Export the stats for other components to use
export const defaultStats: Stat[] = [
  { name: "Kampfgeschick", short: "KG", icon: <Shield size={20} />, start: 30, increase: 5 },
  { name: "Ballistische Fertigkeit", short: "BF", icon: <Target size={20} />, start: 30, increase: 0 },
  { name: "Stärke", short: "ST", icon: <Dumbbell size={20} />, start: 30, increase: 5 },
  { name: "Widerstand", short: "WI", icon: <Shield size={20} />, start: 30, increase: 10 },
  { name: "Gewandtheit", short: "GW", icon: <Wind size={20} />, start: 30, increase: 5 },
  { name: "Geschwindigkeit", short: "GS", icon: <ArrowRight size={20} />, start: 30, increase: 0 },
  { name: "Intelligenz", short: "IN", icon: <Brain size={20} />, start: 30, increase: 5 },
  { name: "Willenskraft", short: "WK", icon: <Compass size={20} />, start: 30, increase: 0 },
  { name: "Charisma", short: "CH", icon: <MessageCircle size={20} />, start: 30, increase: 0 },
];

export function CharacterStats() {
  const [stats, setStats] = useState<Stat[]>(defaultStats);

  const [selectedStat, setSelectedStat] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editValues, setEditValues] = useState({ start: 0, increase: 0 });

  const handleStatClick = (index: number) => {
    setSelectedStat(index);
    setEditValues({ 
      start: stats[index].start, 
      increase: stats[index].increase 
    });
    setOpenDialog(true);
  };

  const handleSaveStat = () => {
    if (selectedStat !== null) {
      const newStats = [...stats];
      newStats[selectedStat].start = editValues.start;
      newStats[selectedStat].increase = editValues.increase;
      setStats(newStats);
      setOpenDialog(false);
    }
  };

  const calculateStrokeWidth = (value: number) => {
    return value > 0 ? 10 : 5;
  };

  return (
    <Card className="bg-[#332d2d] border-[#473b3b]">
      <CardHeader>
        <CardTitle className="text-[#d4af37] text-center">Spielwerte</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const total = stat.start + stat.increase;
            return (
              <div 
                key={stat.short}
                className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleStatClick(index)}
              >
                <div className="relative flex items-center justify-center w-24 h-24 mb-2">
                  {/* Background circle */}
                  <svg className="absolute" width="100%" height="100%" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3a3333"
                      strokeWidth="10"
                    />
                  </svg>
                  
                  {/* Progress circle */}
                  <svg className="absolute transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#d4af37"
                      strokeWidth={calculateStrokeWidth(total)}
                      strokeDasharray={`${total > 0 ? (total / 100) * 251.2 : 0} 251.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Value in the middle */}
                  <div className="z-10 text-3xl font-bold text-white">
                    {total}
                  </div>
                </div>
                
                <div className="flex items-center justify-center bg-[#3a3333] px-4 py-1 rounded-full">
                  <span className="text-sm font-medium text-[#d4af37]">{stat.name}</span>
                </div>
              </div>
            );
          })}
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-[#262222] border-[#473b3b] text-[#e0d0b0]">
            <DialogHeader>
              <DialogTitle className="text-[#d4af37]">
                {selectedStat !== null ? stats[selectedStat].name : "Stat"} bearbeiten
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm text-[#c0b090]">Basiswert</label>
                  <Input
                    type="number"
                    value={editValues.start}
                    onChange={(e) => setEditValues({ ...editValues, start: Number(e.target.value) })}
                    className="bg-[#332d2d] border-[#473b3b] text-[#e0d0b0]"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm text-[#c0b090]">Steigerung</label>
                  <Input
                    type="number"
                    value={editValues.increase}
                    onChange={(e) => setEditValues({ ...editValues, increase: Number(e.target.value) })}
                    className="bg-[#332d2d] border-[#473b3b] text-[#e0d0b0]"
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <div className="text-sm text-[#c0b090]">
                  Gesamtwert: <span className="text-[#d4af37] font-bold">{editValues.start + editValues.increase}</span>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                onClick={() => setOpenDialog(false)}
                className="bg-[#332d2d] hover:bg-[#473b3b] text-[#e0d0b0]"
              >
                Abbrechen
              </Button>
              <Button 
                onClick={handleSaveStat}
                className="bg-[#d4af37] hover:bg-[#c09a20] text-[#262222]"
              >
                Speichern
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

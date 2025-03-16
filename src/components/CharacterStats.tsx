
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
import { useCharacter } from "@/context/CharacterContext";

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
  const { stats, updateStat } = useCharacter();

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
      updateStat(selectedStat, {
        start: editValues.start,
        increase: editValues.increase
      });
      setOpenDialog(false);
    }
  };

  return (
    <Card className="bg-[#f5e8c8] border-[#d8c38d] shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-[#4e3c10] text-center text-lg font-serif">Spielwerte</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => {
            const total = stat.start + stat.increase;
            return (
              <div 
                key={stat.short}
                className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleStatClick(index)}
              >
                <div className="bg-[#f0ddb0] border border-[#d8c38d] rounded-lg p-2 flex flex-col items-center w-full">
                  <div className="text-[#8b7339] mb-1">
                    {stat.icon}
                  </div>
                  <div className="text-xl font-medium text-[#4e3c10]">
                    {total}
                  </div>
                  <div className="text-xs text-[#6b592b] mt-1 font-medium">
                    {stat.short}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-[#f5e8c8] border-[#d8c38d] text-[#4e3c10] max-w-xs">
            <DialogHeader>
              <DialogTitle className="text-[#4e3c10] font-serif">
                {selectedStat !== null ? stats[selectedStat].name : "Stat"} bearbeiten
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-3 py-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col space-y-1">
                  <label className="text-xs text-[#6b592b]">Basiswert</label>
                  <Input
                    type="number"
                    value={editValues.start}
                    onChange={(e) => setEditValues({ ...editValues, start: Number(e.target.value) })}
                    className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10] h-8 text-sm"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-xs text-[#6b592b]">Steigerung</label>
                  <Input
                    type="number"
                    value={editValues.increase}
                    onChange={(e) => setEditValues({ ...editValues, increase: Number(e.target.value) })}
                    className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10] h-8 text-sm"
                  />
                </div>
              </div>
              
              <div className="text-sm text-[#6b592b] pt-1">
                Gesamtwert: <span className="text-[#4e3c10] font-bold">{editValues.start + editValues.increase}</span>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                onClick={() => setOpenDialog(false)}
                variant="outline"
                className="border-[#d0b978] text-[#6b592b] hover:bg-[#ecdcb4] hover:text-[#4e3c10]"
              >
                Abbrechen
              </Button>
              <Button 
                onClick={handleSaveStat}
                className="bg-[#8b7339] hover:bg-[#6b592b] text-[#f5e8c8]"
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

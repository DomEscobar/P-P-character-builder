
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
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

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

  const calculateStrokeWidth = (value: number) => {
    return value > 0 ? (isMobile ? 8 : 10) : (isMobile ? 4 : 5);
  };

  return (
    <Card className="bg-card/70 backdrop-blur-md border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-primary text-center">Spielwerte</CardTitle>
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
                <div className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mb-2 group">
                  {/* Background circle */}
                  <svg className="absolute" width="100%" height="100%" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
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
                      stroke="rgba(59, 130, 246, 0.8)"
                      strokeWidth={calculateStrokeWidth(total)}
                      strokeDasharray={`${total > 0 ? (total / 100) * 251.2 : 0} 251.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Icon in the middle */}
                  <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-primary">
                    {stat.icon}
                  </div>
                  
                  {/* Value in the middle */}
                  <div className="z-10 text-2xl md:text-3xl font-bold text-white group-hover:opacity-0 transition-opacity duration-200">
                    {total}
                  </div>
                </div>
                
                <div className="flex items-center justify-center bg-secondary/60 px-3 py-1 rounded-full backdrop-blur-sm">
                  <span className="text-xs md:text-sm font-medium text-primary/90">{stat.name}</span>
                </div>
              </div>
            );
          })}
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-card border-primary/20 text-foreground">
            <DialogHeader>
              <DialogTitle className="text-primary">
                {selectedStat !== null ? stats[selectedStat].name : "Stat"} bearbeiten
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm text-muted-foreground">Basiswert</label>
                  <Input
                    type="number"
                    value={editValues.start}
                    onChange={(e) => setEditValues({ ...editValues, start: Number(e.target.value) })}
                    className="bg-secondary/40 border-primary/20 text-foreground"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm text-muted-foreground">Steigerung</label>
                  <Input
                    type="number"
                    value={editValues.increase}
                    onChange={(e) => setEditValues({ ...editValues, increase: Number(e.target.value) })}
                    className="bg-secondary/40 border-primary/20 text-foreground"
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <div className="text-sm text-muted-foreground">
                  Gesamtwert: <span className="text-primary font-bold">{editValues.start + editValues.increase}</span>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                onClick={() => setOpenDialog(false)}
                variant="outline"
                className="border-primary/20 hover:bg-secondary/60 text-foreground"
              >
                Abbrechen
              </Button>
              <Button 
                onClick={handleSaveStat}
                className="bg-primary hover:bg-primary/80 text-primary-foreground"
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

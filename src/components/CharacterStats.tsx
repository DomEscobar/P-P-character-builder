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
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

  const getStatLevel = (value: number) => {
    if (value >= 90) return { text: "Legendär", color: "#9D4CFF" };
    if (value >= 80) return { text: "Meisterhaft", color: "#FFC107" };
    if (value >= 70) return { text: "Fortgeschritten", color: "#2196F3" };
    if (value >= 60) return { text: "Kompetent", color: "#4CAF50" };
    if (value >= 50) return { text: "Durchschnittlich", color: "#8BC34A" };
    if (value >= 40) return { text: "Grundlegend", color: "#CDDC39" };
    return { text: "Anfänger", color: "#9E9E9E" };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-[#1D1210]/90 border border-[#513428] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.3)] p-4 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#540804] via-[#AA3C3B] to-[#540804]"></div>
      
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold text-[#E4D8B4] font-serif">Grundeigenschaften</h2>
        <div className="ml-auto flex items-center">
          <div className="text-xs text-[#867E70] mr-4 hidden md:block">KLICKE AUF EINEN WERT UM IHN ZU ÄNDERN</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const total = stat.start + stat.increase;
          const statLevel = getStatLevel(total);
          const progressPercent = Math.min(100, total);
          
          return (
            <motion.div
              key={stat.short}
              variants={itemVariants}
              className="group relative"
              onClick={() => handleStatClick(index)}
            >
              <div className="absolute inset-0 bg-[#2A1A17] rounded-lg transform rotate-1 scale-[1.02] -z-10"></div>
              <div className="bg-gradient-to-b from-[#2A1A17] to-[#1D1210] hover:from-[#3A2A27] hover:to-[#2D2220] p-3 rounded-lg border border-[#513428] cursor-pointer transition-all duration-300 hover:shadow-[0_0_10px_rgba(170,60,59,0.3)]">
                <div className="flex items-center mb-2">
                  <div className="p-1.5 rounded-full bg-[#191210] text-[#AA3C3B] mr-2">
                    {stat.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline">
                      <h3 className="font-semibold text-[#E4D8B4]">{stat.name}</h3>
                      <span className="ml-auto text-2xl font-bold text-[#E4D8B4]">{total}</span>
                    </div>
                    <div className="flex items-center text-xs text-[#867E70]">
                      <span>{stat.short}</span>
                      <span className="ml-auto">{stat.start} + {stat.increase}</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative h-2 overflow-hidden rounded-full bg-[#191210]">
                  <motion.div 
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to right, #540804, ${statLevel.color})`, width: `${progressPercent}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>

                <div className="text-xs text-right mt-1" style={{ color: statLevel.color }}>
                  {statLevel.text}
                </div>
                
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-xs px-1.5 py-0.5 bg-[#540804]/80 text-[#E4D8B4] rounded-sm">
                    Bearbeiten
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-[#2A1A17] border border-[#513428] text-[#E4D8B4] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#C09E6B] flex items-center">
              {selectedStat !== null && (
                <>
                  <div className="p-1.5 rounded-full bg-[#191210] text-[#AA3C3B] mr-2">
                    {stats[selectedStat].icon}
                  </div>
                  {stats[selectedStat].name} ({stats[selectedStat].short}) bearbeiten
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="start-value" className="font-medium text-[#C09E6B]">Grundwert</label>
                <span className="text-[#867E70]">Basis-Charakterwert</span>
              </div>
              <Input
                id="start-value"
                type="number"
                value={editValues.start}
                onChange={(e) => setEditValues({ ...editValues, start: parseInt(e.target.value) || 0 })}
                className="bg-[#191210] border-[#513428] text-[#E4D8B4]"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="increase-value" className="font-medium text-[#C09E6B]">Steigerung</label>
                <span className="text-[#867E70]">Durch Erfahrung & Training</span>
              </div>
              <Input
                id="increase-value"
                type="number"
                value={editValues.increase}
                onChange={(e) => setEditValues({ ...editValues, increase: parseInt(e.target.value) || 0 })}
                className="bg-[#191210] border-[#513428] text-[#E4D8B4]"
              />
            </div>
            
            {selectedStat !== null && (
              <div className="rounded-md bg-[#191210] p-3 border border-[#513428]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-[#C09E6B]">Gesamtwert</span>
                  <span className="text-xl font-bold text-[#E4D8B4]">
                    {editValues.start + editValues.increase}
                  </span>
                </div>
                <div className="text-sm text-[#867E70]">
                  {getStatLevel(editValues.start + editValues.increase).text}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className="flex sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => setOpenDialog(false)}
              className="border-[#513428] text-[#C09E6B] hover:bg-[#513428]/20"
            >
              Abbrechen
            </Button>
            <Button 
              onClick={handleSaveStat}
              className="bg-gradient-to-b from-[#540804] to-[#380303] text-[#E4D8B4] hover:from-[#6A1008] hover:to-[#480404] border border-[#513428]"
            >
              Speichern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

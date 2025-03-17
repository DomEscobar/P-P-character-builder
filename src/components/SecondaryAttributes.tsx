import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Heart, Shield, Zap, Footprints, Activity, Skull, Star, Flame, Sparkles, Clock } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";
import { motion, AnimatePresence, Variants } from "framer-motion";

// Define types for fate, tenacity, and experience values
interface FateAndTenacity {
  schicksal: number;
  gluck: number;
  zahigkeit: number;
  mut: number;
  motivation: string;
}

interface Experience {
  current: number;
  spent: number;
  total: number;
  bewegung: {
    standard: number;
    gehen: number;
    rennen: number;
  };
}

// We'll use these as mock data since we don't have real context yet
const initialFateAndTenacity: FateAndTenacity = {
  schicksal: 0,
  gluck: 0,
  zahigkeit: 0,
  mut: 0,
  motivation: ""
};

const initialExperience: Experience = {
  current: 0,
  spent: 0,
  total: 0,
  bewegung: {
    standard: 0,
    gehen: 0,
    rennen: 0
  }
};

// Max values for attributes to calculate percentages
const MAX_ATTRIBUTE_VALUE = 10;
const MAX_EXPERIENCE_VALUE = 100;

// Custom gauge chart component
const GaugeChart = ({ value, max = MAX_ATTRIBUTE_VALUE, color = "#AA3C3B" }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const angle = (percentage / 100) * 180;
  
  return (
    <div className="relative w-14 h-8 mx-auto">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-7 bg-[#191210] rounded-t-full overflow-hidden relative border-t border-l border-r border-[#513428]">
          <div 
            className="absolute bottom-0 left-0 right-0 rounded-t-full origin-bottom"
            style={{ 
              height: '100%',
              background: `conic-gradient(${color} ${angle}deg, transparent ${angle}deg)`,
              transform: 'rotate(-90deg)',
            }}
          />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-[#E4D8B4]">
        {value}
      </div>
    </div>
  );
};

// Sparkle animation component
const AnimatedSparkle = ({ visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute -top-1 -right-1"
      >
        <Sparkles className="h-4 w-4 text-yellow-400" />
      </motion.div>
    )}
  </AnimatePresence>
);

export function SecondaryAttributes() {
  const { stats } = useCharacter();
  
  // In a real implementation, these would come from a context
  const [fateAndTenacity, setFateAndTenacity] = useState<FateAndTenacity>(initialFateAndTenacity);
  const [experience, setExperience] = useState<Experience>(initialExperience);
  
  // Dialog states
  const [fateDialogOpen, setFateDialogOpen] = useState(false);
  const [expDialogOpen, setExpDialogOpen] = useState(false);
  const [editField, setEditField] = useState<string | null>(null);
  
  const handleFateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFateAndTenacity(prev => ({
      ...prev,
      [name]: name === 'motivation' ? value : Number(value) || 0
    }));
  };
  
  const handleExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'bewegung') {
        setExperience(prev => ({
          ...prev,
          bewegung: {
            ...prev.bewegung,
            [child]: Number(value) || 0
          }
        }));
      }
    } else {
      setExperience(prev => ({
        ...prev,
        [name]: Number(value) || 0
      }));
    }
  };

  const openFieldEdit = (field: string) => {
    setEditField(field);
  };

  // Get attribute color based on value
  const getAttributeColor = (value: number, max = MAX_ATTRIBUTE_VALUE) => {
    const percentage = (value / max) * 100;
    if (percentage >= 75) return "#22c55e"; // High - green
    if (percentage >= 40) return "#facc15"; // Medium - yellow
    return "#AA3C3B"; // Low - red
  };

  // Calculate experience percentage
  const calculateExpProgress = () => {
    if (experience.total === 0) return 0;
    return Math.min(100, (experience.current / experience.total) * 100);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const pulseVariants: Variants = {
    initial: { scale: 1 },
    pulse: { 
      scale: [1, 1.05, 1],
      transition: { duration: 1.5, repeat: Infinity, repeatType: "reverse" as const }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      {/* Schicksal & Zähigkeit Card */}
      <motion.div variants={itemVariants}>
        <div className="bg-[#241C17] rounded-lg border border-[#513428] shadow-md overflow-hidden">
          <div className="flex items-center p-3 border-b border-[#513428] bg-[#1D1210]">
            <Heart className="text-[#AA3C3B] h-4 w-4 mr-2" />
            <span className="text-[#E4D8B4] font-medium text-sm">Schicksal & Zähigkeit</span>
          </div>
          
          <div className="p-3">
            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
              <div>
                <div className="flex justify-between text-xs text-[#867E70] mb-1">
                  <span>Schicksal</span>
                  <span>{fateAndTenacity.schicksal}/{MAX_ATTRIBUTE_VALUE}</span>
                </div>
                <div 
                  className="relative bg-[#191210] border border-[#513428] rounded-sm p-2 cursor-pointer hover:bg-[#241C17] transition-colors"
                  onClick={() => setFateDialogOpen(true)}
                >
                  <AnimatedSparkle visible={fateAndTenacity.schicksal > 7} />
                  <GaugeChart 
                    value={fateAndTenacity.schicksal} 
                    color={getAttributeColor(fateAndTenacity.schicksal)}
                  />
                  <Progress 
                    value={(fateAndTenacity.schicksal / MAX_ATTRIBUTE_VALUE) * 100} 
                    className="h-1 mt-1"
                    indicatorClassName={`bg-gradient-to-r from-[#513428] to-[${getAttributeColor(fateAndTenacity.schicksal)}]`}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-[#867E70] mb-1">
                  <span>Glück</span>
                  <span>{fateAndTenacity.gluck}/{MAX_ATTRIBUTE_VALUE}</span>
                </div>
                <div 
                  className="relative bg-[#191210] border border-[#513428] rounded-sm p-2 cursor-pointer hover:bg-[#241C17] transition-colors"
                  onClick={() => setFateDialogOpen(true)}
                >
                  <AnimatedSparkle visible={fateAndTenacity.gluck > 7} />
                  <GaugeChart 
                    value={fateAndTenacity.gluck} 
                    color="#FCBA03"
                  />
                  <Progress 
                    value={(fateAndTenacity.gluck / MAX_ATTRIBUTE_VALUE) * 100} 
                    className="h-1 mt-1"
                    indicatorClassName="bg-gradient-to-r from-[#513428] to-[#FCBA03]"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-[#867E70] mb-1">
                  <span>Zähigkeit</span>
                  <span>{fateAndTenacity.zahigkeit}/{MAX_ATTRIBUTE_VALUE}</span>
                </div>
                <div 
                  className="relative bg-[#191210] border border-[#513428] rounded-sm p-2 cursor-pointer hover:bg-[#241C17] transition-colors"
                  onClick={() => setFateDialogOpen(true)}
                >
                  <AnimatedSparkle visible={fateAndTenacity.zahigkeit > 7} />
                  <GaugeChart 
                    value={fateAndTenacity.zahigkeit} 
                    color="#60A5FA"
                  />
                  <Progress 
                    value={(fateAndTenacity.zahigkeit / MAX_ATTRIBUTE_VALUE) * 100} 
                    className="h-1 mt-1"
                    indicatorClassName="bg-gradient-to-r from-[#513428] to-[#60A5FA]"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-[#867E70] mb-1">
                  <span>Mut</span>
                  <span>{fateAndTenacity.mut}/{MAX_ATTRIBUTE_VALUE}</span>
                </div>
                <div 
                  className="relative bg-[#191210] border border-[#513428] rounded-sm p-2 cursor-pointer hover:bg-[#241C17] transition-colors"
                  onClick={() => setFateDialogOpen(true)}
                >
                  <AnimatedSparkle visible={fateAndTenacity.mut > 7} />
                  <GaugeChart 
                    value={fateAndTenacity.mut} 
                    color="#9333ea"
                  />
                  <Progress 
                    value={(fateAndTenacity.mut / MAX_ATTRIBUTE_VALUE) * 100} 
                    className="h-1 mt-1"
                    indicatorClassName="bg-gradient-to-r from-[#513428] to-[#9333ea]"
                  />
                </div>
              </div>
              
              <div className="col-span-2 mt-1">
                <div className="flex justify-between text-xs text-[#867E70] mb-1">
                  <span>Motivation</span>
                </div>
                <div 
                  className="bg-[#191210] border border-[#513428] rounded-sm min-h-8 px-2 py-2 flex items-center justify-start cursor-pointer hover:bg-[#241C17] transition-colors"
                  onClick={() => setFateDialogOpen(true)}
                >
                  <Flame className="h-4 w-4 mr-2 text-[#AA3C3B]" />
                  <span className="text-[#E4D8B4] text-sm">
                    {fateAndTenacity.motivation || "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Erfahrung Card */}
      <motion.div variants={itemVariants}>
        <div className="bg-[#241C17] rounded-lg border border-[#513428] shadow-md overflow-hidden">
          <div className="flex items-center p-3 border-b border-[#513428] bg-[#1D1210]">
            <Star className="text-[#FCBA03] h-4 w-4 mr-2" />
            <span className="text-[#E4D8B4] font-medium text-sm">Erfahrung</span>
          </div>
          
          <div className="p-3">
            <motion.div 
              variants={pulseVariants}
              initial="initial"
              animate="pulse"
              className="mb-3"
            >
              <div className="flex justify-between text-xs text-[#867E70] mb-1">
                <span>Erfahrung: {experience.current}/{experience.total}</span>
                <span>Ausgegeben: {experience.spent}</span>
              </div>
              <div 
                className="relative bg-[#191210] border border-[#513428] rounded-sm p-3 cursor-pointer hover:bg-[#241C17] transition-colors"
                onClick={() => setExpDialogOpen(true)}
              >
                <div className="flex items-center justify-between mb-2">
                  <Star className="h-5 w-5 text-[#FCBA03]" />
                  <span className="text-[#E4D8B4] font-medium text-lg">{experience.current}</span>
                  <Sparkles className="h-5 w-5 text-[#FCBA03]" />
                </div>
                <Progress 
                  value={calculateExpProgress()} 
                  className="h-2"
                  indicatorClassName="bg-gradient-to-r from-[#513428] to-[#FCBA03]"
                />
                <div className="flex justify-between mt-1 text-xs text-[#867E70]">
                  <span>0</span>
                  <span>{experience.total}</span>
                </div>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center text-xs text-[#867E70] mb-1">
                <Footprints className="h-3 w-3 text-[#60A5FA] mr-1" />
                <span>Bewegung</span>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col">
                  <div 
                    className="relative flex-1 bg-[#191210] border border-[#513428] rounded-sm py-1 px-1 flex flex-col items-center cursor-pointer hover:bg-[#241C17] transition-colors"
                    onClick={() => setExpDialogOpen(true)}
                  >
                    <span className="text-[#867E70] text-xs mb-1">Bewegung</span>
                    <div className="w-full px-1">
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded-sm bg-[#1D1210]">
                          <div 
                            style={{ width: `${(experience.bewegung.standard / 10) * 100}%` }} 
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#60A5FA]"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <span className="text-[#E4D8B4] font-medium mt-1">{experience.bewegung.standard}</span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div 
                    className="relative flex-1 bg-[#191210] border border-[#513428] rounded-sm py-1 px-1 flex flex-col items-center cursor-pointer hover:bg-[#241C17] transition-colors"
                    onClick={() => setExpDialogOpen(true)}
                  >
                    <span className="text-[#867E70] text-xs mb-1">Gehen</span>
                    <div className="w-full px-1">
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded-sm bg-[#1D1210]">
                          <div 
                            style={{ width: `${(experience.bewegung.gehen / 10) * 100}%` }} 
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#60A5FA]"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <span className="text-[#E4D8B4] font-medium mt-1">{experience.bewegung.gehen}</span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div 
                    className="relative flex-1 bg-[#191210] border border-[#513428] rounded-sm py-1 px-1 flex flex-col items-center cursor-pointer hover:bg-[#241C17] transition-colors"
                    onClick={() => setExpDialogOpen(true)}
                  >
                    <span className="text-[#867E70] text-xs mb-1">Rennen</span>
                    <div className="w-full px-1">
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded-sm bg-[#1D1210]">
                          <div 
                            style={{ width: `${(experience.bewegung.rennen / 10) * 100}%` }} 
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#60A5FA]"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <span className="text-[#E4D8B4] font-medium mt-1">{experience.bewegung.rennen}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fate & Tenacity Dialog */}
      <Dialog open={fateDialogOpen} onOpenChange={setFateDialogOpen}>
        <DialogContent className="bg-[#2A1A17] border border-[#513428] text-[#E4D8B4] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-[#C09E6B] font-serif flex items-center">
              <Flame size={20} className="text-[#AA3C3B] mr-2" />
              Schicksal & Zähigkeit
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="schicksal" className="text-[#C09E6B]">Schicksal</Label>
                <Input
                  id="schicksal"
                  name="schicksal"
                  type="number"
                  value={fateAndTenacity.schicksal}
                  onChange={handleFateChange}
                  className="bg-[#191210] border-[#513428] text-[#E4D8B4]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gluck" className="text-[#C09E6B]">Glück</Label>
                <Input
                  id="gluck"
                  name="gluck"
                  type="number"
                  value={fateAndTenacity.gluck}
                  onChange={handleFateChange}
                  className="bg-[#191210] border-[#513428] text-[#E4D8B4]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="zahigkeit" className="text-[#C09E6B]">Zähigkeit</Label>
                <Input
                  id="zahigkeit"
                  name="zahigkeit"
                  type="number"
                  value={fateAndTenacity.zahigkeit}
                  onChange={handleFateChange}
                  className="bg-[#191210] border-[#513428] text-[#E4D8B4]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mut" className="text-[#C09E6B]">Mut</Label>
                <Input
                  id="mut"
                  name="mut"
                  type="number"
                  value={fateAndTenacity.mut}
                  onChange={handleFateChange}
                  className="bg-[#191210] border-[#513428] text-[#E4D8B4]"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="motivation" className="text-[#C09E6B]">Motivation</Label>
              <Input
                id="motivation"
                name="motivation"
                value={fateAndTenacity.motivation}
                onChange={handleFateChange}
                className="bg-[#191210] border-[#513428] text-[#E4D8B4]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              onClick={() => setFateDialogOpen(false)}
              className="bg-gradient-to-b from-[#540804] to-[#380303] text-[#E4D8B4] hover:from-[#6A1008] hover:to-[#480404] border border-[#513428]"
            >
              Speichern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Experience Dialog */}
      <Dialog open={expDialogOpen} onOpenChange={setExpDialogOpen}>
        <DialogContent className="bg-[#2A1A17] border border-[#513428] text-[#E4D8B4] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-[#C09E6B] font-serif flex items-center">
              <Star size={20} className="text-[#FCBA03] mr-2" />
              Erfahrung
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current" className="text-[#C09E6B]">Aktuell</Label>
                <Input
                  id="current"
                  name="current"
                  type="number"
                  value={experience.current}
                  onChange={handleExpChange}
                  className="bg-[#191210] border-[#513428] text-[#E4D8B4]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="spent" className="text-[#C09E6B]">Ausgeg.</Label>
                <Input
                  id="spent"
                  name="spent"
                  type="number"
                  value={experience.spent}
                  onChange={handleExpChange}
                  className="bg-[#191210] border-[#513428] text-[#E4D8B4]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="total" className="text-[#C09E6B]">Gesamt</Label>
                <Input
                  id="total"
                  name="total"
                  type="number"
                  value={experience.total}
                  onChange={handleExpChange}
                  className="bg-[#191210] border-[#513428] text-[#E4D8B4]"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-[#C09E6B] flex items-center">
                <Footprints size={16} className="text-[#60A5FA] mr-1" />
                Bewegung
              </Label>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="bewegung.standard" className="text-[#867E70] text-xs">Bewegung</Label>
                  <Input
                    id="bewegung.standard"
                    name="bewegung.standard"
                    type="number"
                    value={experience.bewegung.standard}
                    onChange={handleExpChange}
                    className="bg-[#191210] border-[#513428] text-[#E4D8B4]"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="bewegung.gehen" className="text-[#867E70] text-xs">Gehen</Label>
                  <Input
                    id="bewegung.gehen"
                    name="bewegung.gehen"
                    type="number"
                    value={experience.bewegung.gehen}
                    onChange={handleExpChange}
                    className="bg-[#191210] border-[#513428] text-[#E4D8B4]"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="bewegung.rennen" className="text-[#867E70] text-xs">Rennen</Label>
                  <Input
                    id="bewegung.rennen"
                    name="bewegung.rennen"
                    type="number"
                    value={experience.bewegung.rennen}
                    onChange={handleExpChange}
                    className="bg-[#191210] border-[#513428] text-[#E4D8B4]"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              onClick={() => setExpDialogOpen(false)}
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

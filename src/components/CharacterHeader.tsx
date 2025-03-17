import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { User, Pencil, Heart, Shield, Coins, Plus, Minus, Skull, Droplet, Activity, CircleDollarSign, CircleDot, Circle } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";
import { useHealthWealth } from "@/context/HealthWealthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function CharacterHeader() {
  const { profile, updateProfile } = useCharacter();
  const { healthWealth, updateHealth, updateWealth } = useHealthWealth();
  const isMobile = useIsMobile();
  const [editOpen, setEditOpen] = useState(false);
  const [healthOpen, setHealthOpen] = useState(false); 
  const [wealthOpen, setWealthOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProfile({
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({
          portrait: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const adjustHealth = (field: 'robustheit' | 'lp' | 'maxLp', amount: number) => {
    updateHealth({
      [field]: Math.max(0, (healthWealth.health[field] || 0) + amount)
    });
  };

  const adjustWealth = (field: 'gold' | 'silber' | 'groschen', amount: number) => {
    updateWealth({
      [field]: Math.max(0, (healthWealth.wealth[field] || 0) + amount)
    });
  };

  // Calculate health percentage
  const healthPercentage = healthWealth.health.maxLp > 0 
    ? (healthWealth.health.lp / healthWealth.health.maxLp) * 100 
    : 0;

  // Calculate health bar color based on percentage
  const getHealthBarColor = () => {
    if (healthPercentage <= 25) return "from-[#6A0904] to-[#AA3C3B]";
    if (healthPercentage <= 50) return "from-[#9C2806] to-[#C86A45]";
    return "from-[#540804] to-[#AA3C3B]";
  };

  return (
    <div className="space-y-4">
      {/* Character Profile Card */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-[#2A1A17] rounded-lg transform rotate-1 scale-[1.02] -z-10"></div>
        <Card className="border-[#513428] shadow-[0_0_15px_rgba(0,0,0,0.4)] overflow-hidden bg-[#1D1210]">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#540804] via-[#946A06] to-[#540804]"></div>
          <CardContent className="p-4 pt-5">
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="h-16 w-16 bg-[#F5E8C8]/20 rounded-full flex justify-center items-center border-2 border-[#513428] shadow-inner cursor-pointer overflow-hidden relative"
                onClick={triggerFileInput}
              >
                {profile.portrait ? (
                  <img 
                    src={profile.portrait} 
                    alt="Character Portrait" 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#2A1A17] flex items-center justify-center">
                    <User className="h-8 w-8 text-[#C09E6B]" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/40 to-transparent opacity-60"></div>
              </motion.div>
              
              <div className="flex-1 cursor-pointer" onClick={() => setEditOpen(true)}>
                <motion.h2 
                  className="text-xl font-serif text-[#C09E6B] font-medium tracking-wide"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {profile.name || "New Character"}
                </motion.h2>
                <div className="flex items-center gap-2 text-sm text-[#867E70] mt-1">
                  <span>{profile.volk || "Race"}</span>
                  {(profile.volk && profile.klasse) && <span className="text-[#513428]">•</span>}
                  <span>{profile.klasse || "Class"}</span>
                  {(profile.klasse && profile.karriere) && <span className="text-[#513428]">•</span>}
                  <span>{profile.karriere || ""}</span>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-[#C09E6B] hover:text-[#E4D8B4] hover:bg-[#513428]/30"
                onClick={() => setEditOpen(true)}
              >
                <Pencil size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Health and Wealth Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Health Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-[#240F0B] rounded-lg transform rotate-1 scale-[1.02] -z-10"></div>
          <Card className="border-[#513428] shadow-[0_0_15px_rgba(84,8,4,0.3)] overflow-hidden bg-[#1D1210]">
            <CardContent className="p-0">
              <div 
                className="relative cursor-pointer" 
                onClick={() => setHealthOpen(true)}
              >
                {/* Top decorative border */}
                <div className="h-2 bg-gradient-to-r from-[#540804] via-[#AA3C3B] to-[#540804]"></div>
                
                {/* Health bar */}
                <div className="px-4 py-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Heart size={18} className="text-[#AA3C3B] mr-2" />
                      <span className="text-[#E4D8B4] font-serif font-medium">Lebenspunkte</span>
                    </div>
                    <div className="flex items-center text-[#E4D8B4] font-medium">
                      <span>{healthWealth.health.lp}</span>
                      <span className="mx-1 text-[#867E70]">/</span>
                      <span>{healthWealth.health.maxLp}</span>
                    </div>
                  </div>
                  
                  <div className="relative h-3 overflow-hidden rounded-full bg-[#2A1A17]">
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-r ${getHealthBarColor()}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${healthPercentage}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <Shield size={16} className="text-[#6E6B66] mr-1" />
                      <span className="text-[#867E70] text-sm">
                        Robustheit: {healthWealth.health.robustheit}
                      </span>
                    </div>
                    
                    <div className="flex -space-x-1">
                      <div className="w-8 h-2 bg-[#540804] rounded-l-sm opacity-30"></div>
                      <div className="w-5 h-2 bg-[#6A0904] opacity-40"></div>
                      <div className="w-3 h-2 bg-[#9C2806] opacity-50"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Wealth Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-[#24211A] rounded-lg transform rotate-1 scale-[1.02] -z-10"></div>
          <Card className="border-[#513428] shadow-[0_0_15px_rgba(128,100,38,0.3)] overflow-hidden bg-[#1D1210]">
            <CardContent className="p-0">
              <div 
                className="relative cursor-pointer" 
                onClick={() => setWealthOpen(true)}
              >
                {/* Top decorative border */}
                <div className="h-2 bg-gradient-to-r from-[#C09E6B] via-[#E4D8B4] to-[#C09E6B]"></div>
                
                <div className="px-4 py-3">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <Coins size={18} className="text-[#C09E6B] mr-2" />
                      <span className="text-[#E4D8B4] font-serif font-medium">Vermögen</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#2A1A17] rounded-md p-2 flex flex-col items-center border border-[#513428] relative">
                      <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#E4AB4B] flex items-center justify-center">
                        <CircleDollarSign size={18} className="text-[#2A1A17]" />
                      </div>
                      <span className="text-[#E4AB4B] font-medium mt-2">{healthWealth.wealth.gold}</span>
                    </div>
                    
                    <div className="bg-[#2A1A17] rounded-md p-2 flex flex-col items-center border border-[#513428] relative">
                      <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#C0C0C0] flex items-center justify-center">
                        <CircleDollarSign size={18} className="text-[#2A1A17]" />
                      </div>
                      <span className="text-[#C0C0C0] font-medium mt-2">{healthWealth.wealth.silber}</span>
                    </div>
                    
                    <div className="bg-[#2A1A17] rounded-md p-2 flex flex-col items-center border border-[#513428] relative">
                      <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#CD7F32] flex items-center justify-center">
                        <CircleDollarSign size={18} className="text-[#2A1A17]" />
                      </div>
                      <span className="text-[#CD7F32] font-medium mt-2">{healthWealth.wealth.groschen}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Character Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-[#2A1A17] border border-[#513428] text-[#E4D8B4] max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-[#C09E6B] font-serif">Charakter bearbeiten</DialogTitle>
            <DialogDescription className="text-[#867E70]">Passe die Details deines Charakters an.</DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center mb-4">
            <div 
              className="relative h-24 w-24 bg-[#1D1210] rounded-full flex justify-center items-center border-2 border-[#513428] shadow-[0_0_15px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer"
              onClick={triggerFileInput}
            >
              {profile.portrait ? (
                <img 
                  src={profile.portrait} 
                  alt="Character Portrait" 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <User className="h-12 w-12 text-[#C09E6B]" />
                  <span className="text-xs text-[#C09E6B] mt-1">Upload</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 to-transparent opacity-60"></div>
            </div>
          </div>
          
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-[#C09E6B] text-sm">Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="bg-[#191210] border-[#513428] text-[#E4D8B4] placeholder:text-[#513428] warhammer-input"
                placeholder="Charaktername"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-volk" className="text-[#C09E6B] text-sm">Volk</Label>
              <Input
                id="edit-volk"
                name="volk"
                value={profile.volk}
                onChange={handleChange}
                className="bg-[#191210] border-[#513428] text-[#E4D8B4] placeholder:text-[#513428] warhammer-input"
                placeholder="z.B. Mensch, Zwerg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-klasse" className="text-[#C09E6B] text-sm">Klasse</Label>
              <Input
                id="edit-klasse"
                name="klasse"
                value={profile.klasse}
                onChange={handleChange}
                className="bg-[#191210] border-[#513428] text-[#E4D8B4] placeholder:text-[#513428] warhammer-input"
                placeholder="z.B. Krieger, Magier"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-karriere" className="text-[#C09E6B] text-sm">Karriere</Label>
              <Input
                id="edit-karriere"
                name="karriere"
                value={profile.karriere}
                onChange={handleChange}
                className="bg-[#191210] border-[#513428] text-[#E4D8B4] placeholder:text-[#513428] warhammer-input"
                placeholder="z.B. Ritter, Gelehrter"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-[#C09E6B] text-sm">Portrait</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2 text-[#C09E6B] hover:text-[#E4D8B4] hover:bg-[#513428]/30"
                        onClick={triggerFileInput}
                      >
                        Bild hochladen
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#2A1A17] border-[#513428] text-[#E4D8B4]">
                      <p>Wähle ein Bild von deinem Gerät</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {profile.portrait && (
                <div className="relative mt-2 h-20 rounded-md overflow-hidden border border-[#513428]">
                  <img 
                    src={profile.portrait} 
                    alt="Character Portrait" 
                    className="w-full h-full object-cover"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute top-1 right-1 h-6 w-6 p-0 bg-[#1D1210]/80 hover:bg-[#540804] text-[#E4D8B4] rounded-full"
                    onClick={() => updateProfile({ portrait: null })}
                  >
                    <Minus size={12} />
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between border-t border-[#513428] pt-4 mt-2">
            <Button 
              variant="outline" 
              onClick={() => setEditOpen(false)}
              className="border-[#513428] text-[#C09E6B] hover:bg-[#513428]/20"
            >
              Abbrechen
            </Button>
            <Button 
              onClick={() => setEditOpen(false)}
              className="bg-gradient-to-b from-[#540804] to-[#380303] text-[#E4D8B4] hover:from-[#6A1008] hover:to-[#480404] border border-[#513428]"
            >
              Speichern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Health Dialog */}
      <Dialog open={healthOpen} onOpenChange={setHealthOpen}>
        <DialogContent className="bg-[#2A1A17] border border-[#513428] text-[#E4D8B4] max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-[#C09E6B] font-serif flex items-center">
              <Heart size={18} className="text-[#AA3C3B] mr-2" />
              Lebenspunkte
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4">
            <div className="rounded-md bg-[#1D1210] p-3 border border-[#513428]">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Droplet size={16} className="text-[#AA3C3B] mr-2" />
                  <span className="text-[#E4D8B4] font-medium">Lebenspunkte (LP)</span>
                </div>
                <div className="text-[#E4D8B4] font-medium">{healthWealth.health.lp}</div>
              </div>
              
              <div className="flex items-center justify-center mt-3 space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full h-8 w-8 p-0 border-[#513428] text-[#867E70] hover:text-[#AA3C3B] hover:border-[#AA3C3B]"
                  onClick={() => adjustHealth('lp', -1)}
                >
                  <Minus size={14} />
                </Button>
                <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-[#191210]">
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-r ${getHealthBarColor()}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${healthPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full h-8 w-8 p-0 border-[#513428] text-[#867E70] hover:text-[#10B981] hover:border-[#10B981]"
                  onClick={() => adjustHealth('lp', 1)}
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>
            
            <div className="rounded-md bg-[#1D1210] p-3 border border-[#513428]">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Shield size={16} className="text-[#6E6B66] mr-2" />
                  <span className="text-[#E4D8B4] font-medium">Robustheit</span>
                </div>
                <div className="text-[#E4D8B4] font-medium">{healthWealth.health.robustheit}</div>
              </div>
              
              <div className="flex items-center justify-center mt-3 space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full h-8 w-8 p-0 border-[#513428] text-[#867E70] hover:text-[#AA3C3B] hover:border-[#AA3C3B]"
                  onClick={() => adjustHealth('robustheit', -1)}
                >
                  <Minus size={14} />
                </Button>
                <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-[#191210]">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-[#513428] to-[#6E6B66]"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, healthWealth.health.robustheit * 10)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full h-8 w-8 p-0 border-[#513428] text-[#867E70] hover:text-[#10B981] hover:border-[#10B981]"
                  onClick={() => adjustHealth('robustheit', 1)}
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>
            
            <div className="rounded-md bg-[#1D1210] p-3 border border-[#513428]">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Activity size={16} className="text-[#10B981] mr-2" />
                  <span className="text-[#E4D8B4] font-medium">Max Lebenspunkte</span>
                </div>
                <div className="text-[#E4D8B4] font-medium">{healthWealth.health.maxLp}</div>
              </div>
              
              <div className="flex items-center justify-center mt-3 space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full h-8 w-8 p-0 border-[#513428] text-[#867E70] hover:text-[#AA3C3B] hover:border-[#AA3C3B]"
                  onClick={() => adjustHealth('maxLp', -1)}
                >
                  <Minus size={14} />
                </Button>
                <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-[#191210]">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-[#0D9488] to-[#10B981]"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, healthWealth.health.maxLp * 5)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full h-8 w-8 p-0 border-[#513428] text-[#867E70] hover:text-[#10B981] hover:border-[#10B981]"
                  onClick={() => adjustHealth('maxLp', 1)}
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between border-t border-[#513428] pt-4 mt-2">
            <Button 
              variant="outline" 
              onClick={() => setHealthOpen(false)}
              className="border-[#513428] text-[#C09E6B] hover:bg-[#513428]/20"
            >
              Schließen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Wealth Dialog */}
      <Dialog open={wealthOpen} onOpenChange={setWealthOpen}>
        <DialogContent className="bg-[#2A1A17] border border-[#513428] text-[#E4D8B4] max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-[#C09E6B] font-serif flex items-center">
              <Coins size={18} className="text-[#C09E6B] mr-2" />
              Vermögen
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4">
            <div className="rounded-md bg-[#1D1210] p-3 border border-[#513428]">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Circle size={16} className="text-[#E4AB4B] fill-[#E4AB4B] mr-2" />
                  <span className="text-[#E4AB4B] font-medium">Goldkronen</span>
                </div>
                <div className="text-[#E4AB4B] font-medium">{healthWealth.wealth.gold}</div>
              </div>
              
              <div className="flex items-center justify-center mt-3 space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full h-8 w-8 p-0 border-[#513428] text-[#867E70] hover:text-[#AA3C3B] hover:border-[#AA3C3B]"
                  onClick={() => adjustWealth('gold', -1)}
                >
                  <Minus size={14} />
                </Button>
                <Input
                  type="number"
                  value={healthWealth.wealth.gold}
                  onChange={(e) => updateWealth({ gold: parseInt(e.target.value) || 0 })}
                  className="bg-[#191210] border-[#513428] text-[#E4AB4B] text-center warhammer-input"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full h-8 w-8 p-0 border-[#513428] text-[#867E70] hover:text-[#10B981] hover:border-[#10B981]"
                  onClick={() => adjustWealth('gold', 1)}
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>
            
            <div className="rounded-md bg-[#1D1210] p-3 border border-[#513428]">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Circle size={16} className="text-[#C0C0C0] fill-[#C0C0C0] mr-2" />
                  <span className="text-[#C0C0C0] font-medium">Silberschillinge</span>
                </div>
                <div className="text-[#C0C0C0] font-medium">{healthWealth.wealth.silber}</div>
              </div>
              
              <div className="flex items-center justify-center mt-3 space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full h-8 w-8 p-0 border-[#513428] text-[#867E70] hover:text-[#AA3C3B] hover:border-[#AA3C3B]"
                  onClick={() => adjustWealth('silber', -1)}
                >
                  <Minus size={14} />
                </Button>
                <Input
                  type="number"
                  value={healthWealth.wealth.silber}
                  onChange={(e) => updateWealth({ silber: parseInt(e.target.value) || 0 })}
                  className="bg-[#191210] border-[#513428] text-[#C0C0C0] text-center warhammer-input"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full h-8 w-8 p-0 border-[#513428] text-[#867E70] hover:text-[#10B981] hover:border-[#10B981]"
                  onClick={() => adjustWealth('silber', 1)}
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>
            
            <div className="rounded-md bg-[#1D1210] p-3 border border-[#513428]">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Circle size={16} className="text-[#CD7F32] fill-[#CD7F32] mr-2" />
                  <span className="text-[#CD7F32] font-medium">Kupfergroschen</span>
                </div>
                <div className="text-[#CD7F32] font-medium">{healthWealth.wealth.groschen}</div>
              </div>
              
              <div className="flex items-center justify-center mt-3 space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full h-8 w-8 p-0 border-[#513428] text-[#867E70] hover:text-[#AA3C3B] hover:border-[#AA3C3B]"
                  onClick={() => adjustWealth('groschen', -1)}
                >
                  <Minus size={14} />
                </Button>
                <Input
                  type="number"
                  value={healthWealth.wealth.groschen}
                  onChange={(e) => updateWealth({ groschen: parseInt(e.target.value) || 0 })}
                  className="bg-[#191210] border-[#513428] text-[#CD7F32] text-center warhammer-input"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full h-8 w-8 p-0 border-[#513428] text-[#867E70] hover:text-[#10B981] hover:border-[#10B981]"
                  onClick={() => adjustWealth('groschen', 1)}
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between border-t border-[#513428] pt-4 mt-2">
            <Button 
              variant="outline" 
              onClick={() => setWealthOpen(false)}
              className="border-[#513428] text-[#C09E6B] hover:bg-[#513428]/20"
            >
              Schließen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add the file input element at the root of the component */}
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange}
      />
    </div>
  );
}


import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { User, Pencil, Heart, Shield, Coins, Plus, Minus } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";
import { useHealthWealth } from "@/context/HealthWealthContext";
import { useIsMobile } from "@/hooks/use-mobile";

export function CharacterHeader() {
  const { profile, updateProfile } = useCharacter();
  const { healthWealth, updateHealth, updateWealth } = useHealthWealth();
  const isMobile = useIsMobile();
  const [editOpen, setEditOpen] = useState(false);
  const [healthOpen, setHealthOpen] = useState(false); 
  const [wealthOpen, setWealthOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProfile({
      [e.target.name]: e.target.value
    });
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

  return (
    <div className="mb-4 space-y-3">
      <Card className="bg-[#f5e8c8] border-[#d8c38d] shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div 
              className="h-16 w-16 bg-[#f0ddb0] rounded-full flex justify-center items-center border-2 border-[#d0b978] shadow-inner cursor-pointer"
              onClick={() => setEditOpen(true)}
            >
              {profile.portrait ? (
                <img 
                  src={profile.portrait} 
                  alt="Character Portrait" 
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <User className="h-8 w-8 text-[#8b7339]" />
              )}
            </div>
            
            <div className="flex-1" onClick={() => setEditOpen(true)}>
              <h2 className="text-xl font-serif text-[#4e3c10] font-medium">
                {profile.name || "New Character"}
              </h2>
              <div className="flex items-center gap-1 text-sm text-[#6b592b]">
                <span>{profile.volk || "Race"}</span>
                {(profile.volk && profile.klasse) && <span>•</span>}
                <span>{profile.klasse || "Class"}</span>
                {(profile.klasse && profile.karriere) && <span>•</span>}
                <span>{profile.karriere || ""}</span>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-[#8b7339] hover:text-[#5e4512] hover:bg-[#ecdcb4]"
              onClick={() => setEditOpen(true)}
            >
              <Pencil size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Health and Wealth Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Health Card */}
        <Card className="bg-[#f5e8c8] border-[#d8c38d] shadow-md overflow-hidden">
          <CardContent className="p-0">
            <div 
              className="relative cursor-pointer" 
              onClick={() => setHealthOpen(true)}
            >
              {/* Top decorative border */}
              <div className="h-2 bg-gradient-to-r from-[#a5453a] via-[#c43f3c] to-[#a5453a]"></div>
              
              {/* Health bar */}
              <div className="px-4 py-3">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <Heart size={18} className="text-[#c43f3c] mr-2" />
                    <span className="text-[#4e3c10] font-serif font-medium">Lebenspunkte</span>
                  </div>
                  <div className="flex items-center text-[#4e3c10] font-medium">
                    <span>{healthWealth.health.lp}</span>
                    <span className="mx-1">/</span>
                    <span>{healthWealth.health.maxLp}</span>
                  </div>
                </div>
                
                <Progress 
                  value={healthPercentage} 
                  className="h-3 bg-[#e8d4d4]" 
                  indicatorClassName="bg-gradient-to-r from-[#a5453a] to-[#c43f3c]"
                />
                
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <Shield size={16} className="text-[#8b7339] mr-1" />
                    <span className="text-[#6b592b] text-sm">
                      Robustheit: {healthWealth.health.robustheit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Wealth Card */}
        <Card className="bg-[#f5e8c8] border-[#d8c38d] shadow-md overflow-hidden">
          <CardContent className="p-0">
            <div 
              className="relative cursor-pointer" 
              onClick={() => setWealthOpen(true)}
            >
              {/* Top decorative border */}
              <div className="h-2 bg-gradient-to-r from-[#b89b40] via-[#e9c46a] to-[#b89b40]"></div>
              
              <div className="px-4 py-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Coins size={18} className="text-[#b89b40] mr-2" />
                    <span className="text-[#4e3c10] font-serif font-medium">Vermögen</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-[#f0ddb0] rounded-md p-2 flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-[#e9c46a] flex items-center justify-center mb-1">
                      <span className="text-[#4e3c10] font-bold text-xs">G</span>
                    </div>
                    <span className="text-[#4e3c10] font-medium">{healthWealth.wealth.gold}</span>
                  </div>
                  
                  <div className="bg-[#f0ddb0] rounded-md p-2 flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-[#c4c4c4] flex items-center justify-center mb-1">
                      <span className="text-[#4e3c10] font-bold text-xs">S</span>
                    </div>
                    <span className="text-[#4e3c10] font-medium">{healthWealth.wealth.silber}</span>
                  </div>
                  
                  <div className="bg-[#f0ddb0] rounded-md p-2 flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-[#cd7f32] flex items-center justify-center mb-1">
                      <span className="text-[#4e3c10] font-bold text-xs">G</span>
                    </div>
                    <span className="text-[#4e3c10] font-medium">{healthWealth.wealth.groschen}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Character Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-[#f5e8c8] border-[#d8c38d] text-[#4e3c10] max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-[#4e3c10] font-serif">Edit Character</DialogTitle>
          </DialogHeader>
          
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 bg-[#f0ddb0] rounded-full flex justify-center items-center border-2 border-[#d0b978]">
              {profile.portrait ? (
                <img 
                  src={profile.portrait} 
                  alt="Character Portrait" 
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <User className="h-10 w-10 text-[#8b7339]" />
              )}
            </div>
          </div>
          
          <div className="grid gap-3">
            <div className="space-y-1">
              <Label htmlFor="edit-name" className="text-[#6b592b] text-xs">Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10] placeholder:text-[#a89562] h-8 text-sm"
                placeholder="Character Name"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="edit-volk" className="text-[#6b592b] text-xs">Volk</Label>
              <Input
                id="edit-volk"
                name="volk"
                value={profile.volk}
                onChange={handleChange}
                className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10] placeholder:text-[#a89562] h-8 text-sm"
                placeholder="e.g. Human, Dwarf"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="edit-klasse" className="text-[#6b592b] text-xs">Klasse</Label>
              <Input
                id="edit-klasse"
                name="klasse"
                value={profile.klasse}
                onChange={handleChange}
                className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10] placeholder:text-[#a89562] h-8 text-sm"
                placeholder="e.g. Warrior, Mage"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="edit-karriere" className="text-[#6b592b] text-xs">Karriere</Label>
              <Input
                id="edit-karriere"
                name="karriere"
                value={profile.karriere}
                onChange={handleChange}
                className="bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10] placeholder:text-[#a89562] h-8 text-sm"
                placeholder="e.g. Mercenary"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setEditOpen(false)}
              className="border-[#d0b978] text-[#6b592b] hover:bg-[#ecdcb4] hover:text-[#4e3c10]"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Health Edit Dialog */}
      <Dialog open={healthOpen} onOpenChange={setHealthOpen}>
        <DialogContent className="bg-[#f5e8c8] border-[#d8c38d] text-[#4e3c10] max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-[#4e3c10] font-serif">Edit Health Points</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Robustheit adjustment */}
            <div>
              <Label className="text-[#6b592b] text-sm mb-2 block">Robustheit</Label>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10]"
                  onClick={() => adjustHealth('robustheit', -1)}
                >
                  <Minus size={16} />
                </Button>
                <div className="w-16 h-10 mx-2 bg-[#f0ddb0] border border-[#d0b978] rounded-md flex items-center justify-center text-[#4e3c10] font-medium">
                  {healthWealth.health.robustheit}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10]"
                  onClick={() => adjustHealth('robustheit', 1)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            
            {/* Current HP adjustment */}
            <div>
              <Label className="text-[#6b592b] text-sm mb-2 block">Current LP</Label>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10]"
                  onClick={() => adjustHealth('lp', -1)}
                >
                  <Minus size={16} />
                </Button>
                <div className="w-16 h-10 mx-2 bg-[#f0ddb0] border border-[#d0b978] rounded-md flex items-center justify-center text-[#4e3c10] font-medium">
                  {healthWealth.health.lp}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10]"
                  onClick={() => adjustHealth('lp', 1)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            
            {/* Max HP adjustment */}
            <div>
              <Label className="text-[#6b592b] text-sm mb-2 block">Max LP</Label>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10]"
                  onClick={() => adjustHealth('maxLp', -1)}
                >
                  <Minus size={16} />
                </Button>
                <div className="w-16 h-10 mx-2 bg-[#f0ddb0] border border-[#d0b978] rounded-md flex items-center justify-center text-[#4e3c10] font-medium">
                  {healthWealth.health.maxLp}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10]"
                  onClick={() => adjustHealth('maxLp', 1)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setHealthOpen(false)}
              className="border-[#d0b978] text-[#6b592b] hover:bg-[#ecdcb4] hover:text-[#4e3c10]"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Wealth Edit Dialog */}
      <Dialog open={wealthOpen} onOpenChange={setWealthOpen}>
        <DialogContent className="bg-[#f5e8c8] border-[#d8c38d] text-[#4e3c10] max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-[#4e3c10] font-serif">Edit Wealth</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Gold adjustment */}
            <div>
              <Label className="text-[#6b592b] text-sm mb-2 block">Gold</Label>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10]"
                  onClick={() => adjustWealth('gold', -1)}
                >
                  <Minus size={16} />
                </Button>
                <div className="w-16 h-10 mx-2 bg-[#f0ddb0] border border-[#d0b978] rounded-md flex items-center justify-center text-[#4e3c10] font-medium">
                  {healthWealth.wealth.gold}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10]"
                  onClick={() => adjustWealth('gold', 1)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            
            {/* Silber adjustment */}
            <div>
              <Label className="text-[#6b592b] text-sm mb-2 block">Silber</Label>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10]"
                  onClick={() => adjustWealth('silber', -1)}
                >
                  <Minus size={16} />
                </Button>
                <div className="w-16 h-10 mx-2 bg-[#f0ddb0] border border-[#d0b978] rounded-md flex items-center justify-center text-[#4e3c10] font-medium">
                  {healthWealth.wealth.silber}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10]"
                  onClick={() => adjustWealth('silber', 1)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            
            {/* Groschen adjustment */}
            <div>
              <Label className="text-[#6b592b] text-sm mb-2 block">Groschen</Label>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10]"
                  onClick={() => adjustWealth('groschen', -1)}
                >
                  <Minus size={16} />
                </Button>
                <div className="w-16 h-10 mx-2 bg-[#f0ddb0] border border-[#d0b978] rounded-md flex items-center justify-center text-[#4e3c10] font-medium">
                  {healthWealth.wealth.groschen}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 bg-[#f0ddb0] border-[#d0b978] text-[#4e3c10]"
                  onClick={() => adjustWealth('groschen', 1)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setWealthOpen(false)}
              className="border-[#d0b978] text-[#6b592b] hover:bg-[#ecdcb4] hover:text-[#4e3c10]"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

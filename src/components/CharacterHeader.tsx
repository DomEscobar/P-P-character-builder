
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Pencil, Heart, Coins } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";
import { useHealthWealth } from "@/context/HealthWealthContext";
import { useIsMobile } from "@/hooks/use-mobile";

export function CharacterHeader() {
  const { profile, updateProfile } = useCharacter();
  const { healthWealth, updateHealth, updateWealth } = useHealthWealth();
  const isMobile = useIsMobile();
  const [editOpen, setEditOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProfile({
      [e.target.name]: e.target.value
    });
  };

  const handleHealthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateHealth({
      [e.target.name]: parseInt(e.target.value) || 0
    });
  };

  const handleWealthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateWealth({
      [e.target.name]: parseInt(e.target.value) || 0
    });
  };

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
        <Card className="bg-[#f5e8c8] border-[#d8c38d] shadow-md">
          <CardContent className="p-3">
            <div className="flex items-center">
              <div className="flex items-center mr-3">
                <Heart size={18} className="text-[#8b7339] mr-2" />
                <span className="text-[#4e3c10] font-serif font-medium">Lebenspunkte</span>
              </div>
              <div className="flex items-center space-x-2 ml-auto">
                <div className="flex flex-col items-center">
                  <Label className="text-[#6b592b] text-xs">Robustheit</Label>
                  <Input 
                    name="robustheit"
                    value={healthWealth.health.robustheit}
                    onChange={handleHealthChange}
                    className="w-16 h-8 bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <Label className="text-[#6b592b] text-xs">LP</Label>
                  <Input 
                    name="lp"
                    value={healthWealth.health.lp}
                    onChange={handleHealthChange}
                    className="w-16 h-8 bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Wealth Card */}
        <Card className="bg-[#f5e8c8] border-[#d8c38d] shadow-md">
          <CardContent className="p-3">
            <div className="flex items-center">
              <div className="flex items-center mr-3">
                <Coins size={18} className="text-[#8b7339] mr-2" />
                <span className="text-[#4e3c10] font-serif font-medium">Vermögen</span>
              </div>
              <div className="flex items-center space-x-2 ml-auto">
                <div className="flex flex-col items-center">
                  <Label className="text-[#6b592b] text-xs">Gold</Label>
                  <Input 
                    name="gold"
                    value={healthWealth.wealth.gold}
                    onChange={handleWealthChange}
                    className="w-16 h-8 bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <Label className="text-[#6b592b] text-xs">Silber</Label>
                  <Input 
                    name="silber"
                    value={healthWealth.wealth.silber}
                    onChange={handleWealthChange}
                    className="w-16 h-8 bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <Label className="text-[#6b592b] text-xs">Groschen</Label>
                  <Input 
                    name="groschen"
                    value={healthWealth.wealth.groschen}
                    onChange={handleWealthChange}
                    className="w-16 h-8 bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
    </div>
  );
}

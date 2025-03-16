
import { useState } from "react";
import { User, Sparkles } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export function CharacterHeader() {
  const { profile, updateProfile } = useProfile();
  const isMobile = useIsMobile();
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    name: profile.name || "",
    volk: profile.volk || "",
    klasse: profile.klasse || "",
    karriere: profile.karriere || ""
  });

  const handleEditClick = () => {
    setEditValues({
      name: profile.name || "",
      volk: profile.volk || "",
      klasse: profile.klasse || "",
      karriere: profile.karriere || ""
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProfile(editValues);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValues({
      ...editValues,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div 
        className="mt-4 py-6 px-2 bg-[#fef7cd] rounded-lg cursor-pointer border border-[#e8d9a0] shadow-sm"
        onClick={handleEditClick}
      >
        <div className="max-w-xl mx-auto">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-4">
              <User className="text-[#8a7c61] h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-[#5d5545] text-lg sm:text-xl font-medium">
                {profile.name || "Character Name"}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <Sparkles className="text-[#8a7c61] h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-[#5d5545] text-lg sm:text-xl font-medium">
                {profile.klasse || "Character Class"}
              </span>
            </div>
            
            <div className="h-px w-full bg-[#e8d9a0]" />
          </div>
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-[#fef7cd] border-[#e8d9a0] text-[#5d5545] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#5d5545] text-center">Edit Character Details</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-5 py-4">
            <div className="flex flex-col space-y-2">
              <label className="text-[#8a7c61] text-sm">Name</label>
              <Input
                name="name"
                value={editValues.name}
                onChange={handleChange}
                className="bg-white/70 border-[#e8d9a0] text-[#5d5545]"
                placeholder="Character Name"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-[#8a7c61] text-sm">Volk (Race)</label>
              <Input
                name="volk"
                value={editValues.volk}
                onChange={handleChange}
                className="bg-white/70 border-[#e8d9a0] text-[#5d5545]"
                placeholder="e.g. Human, Dwarf"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-[#8a7c61] text-sm">Klasse (Class)</label>
              <Input
                name="klasse"
                value={editValues.klasse}
                onChange={handleChange}
                className="bg-white/70 border-[#e8d9a0] text-[#5d5545]"
                placeholder="e.g. Warrior, Mage"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-[#8a7c61] text-sm">Karriere (Career)</label>
              <Input
                name="karriere"
                value={editValues.karriere}
                onChange={handleChange}
                className="bg-white/70 border-[#e8d9a0] text-[#5d5545]"
                placeholder="e.g. Mercenary"
              />
            </div>
          </div>
          
          <DialogFooter className="flex justify-end gap-2">
            <Button 
              type="button"
              onClick={() => setIsEditing(false)}
              variant="outline"
              className="bg-white/80 text-[#8a7c61] border-[#e8d9a0] hover:bg-white"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="bg-[#8a7c61] text-white hover:bg-[#726752]"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

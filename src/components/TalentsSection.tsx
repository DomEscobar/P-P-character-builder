import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Award } from "lucide-react";
import { useTalents } from "@/context/TalentsContext";
import type { Talent } from "@/types/character";
import { TalentItem } from "./talents/TalentItem";
import { TalentEditDialog } from "./talents/TalentEditDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

export function TalentsSection() {
  const { talents, updateTalent, addTalent, deleteTalent } = useTalents();
  const isMobile = useIsMobile();

  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editValues, setEditValues] = useState({ name: "", stufe: "", beschreibung: "" });

  const handleAddTalent = () => {
    const newId = `talent${Date.now()}`;
    setSelectedTalent({ id: newId, name: "", stufe: "", beschreibung: "" });
    setEditValues({ name: "", stufe: "", beschreibung: "" });
    setOpenDialog(true);
  };

  const handleEditTalent = (talent: Talent) => {
    setSelectedTalent(talent);
    setEditValues({
      name: talent.name,
      stufe: talent.stufe,
      beschreibung: talent.beschreibung
    });
    setOpenDialog(true);
  };

  const handleSaveTalent = () => {
    if (selectedTalent) {
      if (talents.some(t => t.id === selectedTalent.id)) {
        // Update existing talent
        updateTalent(selectedTalent.id, {
          name: editValues.name,
          stufe: editValues.stufe,
          beschreibung: editValues.beschreibung
        });
      } else {
        // Add new talent
        addTalent({
          id: selectedTalent.id,
          name: editValues.name,
          stufe: editValues.stufe,
          beschreibung: editValues.beschreibung
        });
      }
      setOpenDialog(false);
    }
  };

  const handleDeleteTalent = () => {
    if (selectedTalent) {
      deleteTalent(selectedTalent.id);
      setOpenDialog(false);
    }
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
    hidden: { y: 10, opacity: 0 },
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
        <h2 className="text-xl font-bold text-[#E4D8B4] font-serif">Talente</h2>
        <div className="ml-auto flex items-center">
          <Button 
            onClick={handleAddTalent}
            size="sm"
            className="bg-gradient-to-b from-[#540804] to-[#380303] text-[#E4D8B4] hover:from-[#6A1008] hover:to-[#480404] border border-[#513428] h-7"
          >
            <Plus size={14} className="mr-1" /> Hinzufügen
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        {talents.length > 0 ? (
          talents.map((talent, index) => (
            <motion.div key={talent.id} variants={itemVariants}>
              <TalentItem 
                talent={talent} 
                onEdit={handleEditTalent} 
              />
            </motion.div>
          ))
        ) : (
          <div className="text-center py-6 text-[#867E70] italic">
            Keine Talente vorhanden. Klicke auf "Hinzufügen" um zu beginnen.
          </div>
        )}
      </div>

      <TalentEditDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        selectedTalent={selectedTalent}
        editValues={editValues}
        setEditValues={setEditValues}
        onSave={handleSaveTalent}
        onDelete={handleDeleteTalent}
      />
    </motion.div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Users, Shield } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

export function GroupSection() {
  const { group, updateGroup } = useCharacter();
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Background effect */}
        <div className="absolute inset-0 bg-[#2A1A17] rounded-lg transform rotate-1 scale-[1.02] -z-10"></div>
        
        <Card className="bg-gradient-to-b from-[#2A1A17] to-[#1D1210] border-[#513428] shadow-md overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-3 left-3 text-[#AA3C3B] opacity-30">
            <Users size={isMobile ? 24 : 28} />
          </div>
          <div className="absolute bottom-3 right-3 text-[#AA3C3B] opacity-30">
            <Shield size={isMobile ? 24 : 28} />
          </div>
          
          <CardHeader className="pb-2">
            <CardTitle className="text-[#E4D8B4] font-serif text-xl flex items-center justify-center">
              <Users size={isMobile ? 18 : 20} className="mr-2 text-[#C09E6B]" />
              Gruppe
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4 px-4">
            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="gruppenname" className="text-[#C09E6B] font-medium flex items-center">
                <span className="bg-[#191210] text-[#AA3C3B] px-2 py-1 text-xs rounded-sm mr-2">Name</span>
              </Label>
              <Input
                id="gruppenname"
                value={group.name}
                onChange={(e) => updateGroup({ name: e.target.value })}
                placeholder="Name der Gruppe"
                className="bg-[#191210] border-[#513428] text-[#E4D8B4] focus:border-[#AA3C3B] focus:ring-[#AA3C3B]/20 transition-all duration-300"
              />
            </motion.div>
            
            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="kurzfristig_gruppe" className="text-[#C09E6B] font-medium flex items-center">
                <span className="bg-[#191210] text-[#AA3C3B] px-2 py-1 text-xs rounded-sm mr-2">Kurzfristig</span>
              </Label>
              <Textarea
                id="kurzfristig_gruppe"
                value={group.kurzfristig}
                onChange={(e) => updateGroup({ kurzfristig: e.target.value })}
                placeholder="Kurzfristige Ziele der Gruppe..."
                className="bg-[#191210] border-[#513428] text-[#E4D8B4] min-h-[80px] focus:border-[#AA3C3B] focus:ring-[#AA3C3B]/20 transition-all duration-300"
              />
            </motion.div>
            
            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="langfristig_gruppe" className="text-[#C09E6B] font-medium flex items-center">
                <span className="bg-[#191210] text-[#AA3C3B] px-2 py-1 text-xs rounded-sm mr-2">Langfristig</span>
              </Label>
              <Textarea
                id="langfristig_gruppe"
                value={group.langfristig}
                onChange={(e) => updateGroup({ langfristig: e.target.value })}
                placeholder="Langfristige Ziele der Gruppe..."
                className="bg-[#191210] border-[#513428] text-[#E4D8B4] min-h-[80px] focus:border-[#AA3C3B] focus:ring-[#AA3C3B]/20 transition-all duration-300"
              />
            </motion.div>
            
            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="mitglieder" className="text-[#C09E6B] font-medium flex items-center">
                <span className="bg-[#191210] text-[#AA3C3B] px-2 py-1 text-xs rounded-sm mr-2">Mitglieder</span>
              </Label>
              <Textarea
                id="mitglieder"
                value={group.mitglieder}
                onChange={(e) => updateGroup({ mitglieder: e.target.value })}
                placeholder="Namen und Details der Gruppenmitglieder..."
                className="bg-[#191210] border-[#513428] text-[#E4D8B4] min-h-[80px] focus:border-[#AA3C3B] focus:ring-[#AA3C3B]/20 transition-all duration-300"
              />
            </motion.div>
          </CardContent>
          
          {/* Add a subtle glow effect on focus within */}
          <div className="absolute inset-0 bg-[#AA3C3B]/0 group-focus-within:bg-[#AA3C3B]/5 transition-all duration-300 pointer-events-none rounded-lg"></div>
        </Card>
      </div>
    </motion.div>
  );
}

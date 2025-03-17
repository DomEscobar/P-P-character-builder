import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Package, Weight, Brain, Skull } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

export function EquipmentLoadSection() {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6">
      {/* Equipment Section */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-[#2A1A17] rounded-lg transform rotate-1 scale-[1.02] -z-10"></div>
        <div className="bg-gradient-to-b from-[#2A1A17] to-[#1D1210] p-4 rounded-lg border border-[#513428] transition-all duration-300 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#E4D8B4] font-serif text-xl flex items-center">
              <Package size={isMobile ? 18 : 20} className="mr-2 text-[#AA3C3B]" />
              Ausrüstung
            </h3>
          </div>
          
          <div className="space-y-2">
            {/* Equipment List - Mobile Optimized */}
            {[...Array(6)].map((_, index) => (
              <motion.div 
                key={index}
                className="flex items-center gap-2 bg-[#262120]/40 p-2 rounded-md border border-[#513428]/50"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-grow">
                  <Input
                    placeholder="Name"
                    className="bg-[#2D2220] border-[#513428] text-[#E4D8B4] placeholder:text-[#8A7266]/70"
                  />
                </div>
                <div className="w-16">
                  <Input
                    placeholder="TP"
                    className="bg-[#2D2220] border-[#513428] text-[#E4D8B4] text-center placeholder:text-[#8A7266]/70"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Two-column layout for remaining sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Encumbrance Section */}
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="absolute inset-0 bg-[#2A1A17] rounded-lg transform rotate-1 scale-[1.02] -z-10"></div>
          <div className="bg-gradient-to-b from-[#2A1A17] to-[#1D1210] p-4 rounded-lg border border-[#513428] transition-all duration-300 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[#E4D8B4] font-serif text-xl flex items-center">
                <Weight size={isMobile ? 18 : 20} className="mr-2 text-[#AA3C3B]" />
                Traglast
              </h3>
            </div>
            
            <div className="space-y-3">
              <motion.div 
                className="flex items-center justify-between"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Label className="text-[#C09E6B] font-medium">Waffen (STB)</Label>
                <Input 
                  placeholder="0"
                  className="w-20 bg-[#2D2220] border-[#513428] text-[#E4D8B4] text-center placeholder:text-[#8A7266]/70"
                />
              </motion.div>
              <motion.div 
                className="flex items-center justify-between"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Label className="text-[#C09E6B] font-medium">Rüstung (WIB×2)</Label>
                <Input 
                  placeholder="0"
                  className="w-20 bg-[#2D2220] border-[#513428] text-[#E4D8B4] text-center placeholder:text-[#8A7266]/70"
                />
              </motion.div>
              <motion.div 
                className="flex items-center justify-between"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Label className="text-[#C09E6B] font-medium">Ausrüstung (WKB)</Label>
                <Input 
                  placeholder="0"
                  className="w-20 bg-[#2D2220] border-[#513428] text-[#E4D8B4] text-center placeholder:text-[#8A7266]/70"
                />
              </motion.div>
              
              <Separator className="bg-[#513428] my-2" />
              
              <motion.div 
                className="flex items-center justify-between"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Label className="text-[#C09E6B] font-medium">Maximum TP</Label>
                <Input 
                  placeholder="0"
                  className="w-20 bg-[#2D2220] border-[#513428] text-[#E4D8B4] text-center placeholder:text-[#8A7266]/70"
                />
              </motion.div>
              <motion.div 
                className="flex items-center justify-between"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Label className="text-[#C09E6B] font-medium">Gesamt</Label>
                <Input 
                  placeholder="0"
                  className="w-20 bg-[#2D2220] border-[#513428] text-[#E4D8B4] text-center placeholder:text-[#8A7266]/70"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Psychology & Corruption Sections */}
        <div className="space-y-6">
          {/* Psychology Section */}
          <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-[#2A1A17] rounded-lg transform rotate-1 scale-[1.02] -z-10"></div>
            <div className="bg-gradient-to-b from-[#2A1A17] to-[#1D1210] p-4 rounded-lg border border-[#513428] transition-all duration-300 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#E4D8B4] font-serif text-xl flex items-center">
                  <Brain size={isMobile ? 18 : 20} className="mr-2 text-[#AA3C3B]" />
                  Psychologie
                </h3>
              </div>
              
              <Textarea 
                placeholder="Beschreibe psychologische Aspekte deines Charakters..."
                className="bg-[#2D2220] border-[#513428] text-[#E4D8B4] min-h-[100px] placeholder:text-[#8A7266]/70"
              />
            </div>
          </motion.div>

          {/* Corruption & Mutation Section */}
          <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-[#2A1A17] rounded-lg transform rotate-1 scale-[1.02] -z-10"></div>
            <div className="bg-gradient-to-b from-[#2A1A17] to-[#1D1210] p-4 rounded-lg border border-[#513428] transition-all duration-300 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#E4D8B4] font-serif text-xl flex items-center">
                  <Skull size={isMobile ? 18 : 20} className="mr-2 text-[#AA3C3B]" />
                  Korrumpierung & Mutation
                </h3>
              </div>
              
              <Textarea 
                placeholder="Beschreibe Korrumpierung und Mutationen deines Charakters..."
                className="bg-[#2D2220] border-[#513428] text-[#E4D8B4] min-h-[100px] placeholder:text-[#8A7266]/70"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

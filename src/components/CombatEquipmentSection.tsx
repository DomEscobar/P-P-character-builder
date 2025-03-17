import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Sword, Wand, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface EquipmentRowProps {
  fields: {
    label: string;
    placeholder: string;
    className?: string;
  }[];
  isMobile: boolean;
}

function EquipmentRow({ fields, isMobile }: EquipmentRowProps) {
  if (isMobile) {
    return (
      <AccordionItem value={`item-${Math.random()}`} className="border-[#513428]">
        <AccordionTrigger className="hover:no-underline py-2 px-3">
          <Input
            placeholder={fields[0].placeholder}
            className="bg-[#191210] border-[#513428] text-[#E4D8B4] focus:ring-[#AA3C3B]/30 placeholder:text-[#867E70]"
          />
        </AccordionTrigger>
        <AccordionContent className="px-3 pb-3 space-y-2">
          {fields.slice(1).map((field, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <Label className="text-[#C09E6B] text-sm flex-shrink-0">{field.label}</Label>
              <Input
                placeholder={field.placeholder}
                className={cn(
                  "bg-[#191210] border-[#513428] text-[#E4D8B4] focus:ring-[#AA3C3B]/30 placeholder:text-[#867E70]",
                  field.className
                )}
              />
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <TableRow className="border-[#513428] hover:bg-[#2A1A17]/60">
      {fields.map((field, index) => (
        <TableCell key={index} className="p-1.5">
          <Input
            placeholder={field.placeholder}
            className={cn(
              "bg-[#191210] border-[#513428] text-[#E4D8B4] focus:ring-[#AA3C3B]/30 placeholder:text-[#867E70]",
              field.className
            )}
          />
        </TableCell>
      ))}
    </TableRow>
  );
}

export function CombatEquipmentSection() {
  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const hitZones = [
    { label: "Kopf (01-09)", placeholder: "RP" },
    { label: "Linker Arm (25-44)", placeholder: "RP" },
    { label: "Rechter Arm (45-79)", placeholder: "RP" },
    { label: "Körper (90-00)", placeholder: "RP" },
    { label: "Rechtes Bein (80-89)", placeholder: "RP" },
    { label: "Linkes Bein (10-24)", placeholder: "RP" },
    { label: "Schild", placeholder: "RP" }
  ];

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Armor Section */}
      <motion.div 
        variants={itemVariants}
        className="bg-[#1D1210]/90 border border-[#513428] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.3)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#540804] via-[#AA3C3B] to-[#540804]"></div>
        
        <div className="p-4">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-bold text-[#E4D8B4] font-serif flex items-center">
              <div className="p-1.5 rounded-full bg-[#191210] text-[#AA3C3B] mr-2">
                <Shield size={isMobile ? 18 : 20} />
              </div>
              Rüstung
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-7">
              <div className={cn(
                "rounded-md border border-[#513428]/50 shadow-inner",
                isMobile ? "" : "overflow-x-auto"
              )}>
                {isMobile ? (
                  <Accordion type="single" collapsible className="w-full">
                    {[...Array(3)].map((_, index) => (
                      <EquipmentRow
                        key={index}
                        isMobile={isMobile}
                        fields={[
                          { label: "Name", placeholder: "Name" },
                          { label: "Zone", placeholder: "Zone" },
                          { label: "TP", placeholder: "TP" },
                          { label: "RP", placeholder: "RP" },
                          { label: "Eigenschaften", placeholder: "Eigenschaften" }
                        ]}
                      />
                    ))}
                  </Accordion>
                ) : (
                  <Table className="w-full">
                    <TableHeader className="bg-[#2A1A17]">
                      <TableRow className="border-[#513428] hover:bg-transparent">
                        <TableHead className="text-[#C09E6B] font-medium">Name</TableHead>
                        <TableHead className="text-[#C09E6B] font-medium text-center">Trefferzone</TableHead>
                        <TableHead className="text-[#C09E6B] font-medium text-center">TP</TableHead>
                        <TableHead className="text-[#C09E6B] font-medium text-center">RP</TableHead>
                        <TableHead className="text-[#C09E6B] font-medium">Eigenschaften</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[...Array(3)].map((_, index) => (
                        <EquipmentRow
                          key={index}
                          isMobile={isMobile}
                          fields={[
                            { label: "Name", placeholder: "Name" },
                            { label: "Zone", placeholder: "Zone", className: "text-center" },
                            { label: "TP", placeholder: "TP", className: "text-center" },
                            { label: "RP", placeholder: "RP", className: "text-center" },
                            { label: "Eigenschaften", placeholder: "Eigenschaften" }
                          ]}
                        />
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
            
            <div className="md:col-span-5 flex flex-col">
              <div className="text-center mb-3 font-medium text-[#C09E6B]">Trefferzonen</div>
              
              <div className="bg-gradient-to-b from-[#2A1A17] to-[#1D1210] border border-[#513428] rounded-md p-3">
                {isMobile ? (
                  <div className="grid grid-cols-1 gap-2">
                    {hitZones.map((zone, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <Label className="text-[#C09E6B] text-sm">{zone.label}</Label>
                        <Input 
                          className="w-14 bg-[#191210] border-[#513428] text-[#E4D8B4] text-center focus:ring-[#AA3C3B]/30" 
                          placeholder={zone.placeholder}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-3">
                        {hitZones.slice(0, 3).map((zone, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <Label className="text-[#C09E6B] text-sm">{zone.label}</Label>
                            <Input 
                              className="w-14 bg-[#191210] border-[#513428] text-[#E4D8B4] text-center focus:ring-[#AA3C3B]/30" 
                              placeholder={zone.placeholder}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        {hitZones.slice(3, 6).map((zone, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <Label className="text-[#C09E6B] text-sm">{zone.label}</Label>
                            <Input 
                              className="w-14 bg-[#191210] border-[#513428] text-[#E4D8B4] text-center focus:ring-[#AA3C3B]/30" 
                              placeholder={zone.placeholder}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#513428]/30">
                      <div className="flex items-center justify-between">
                        <Label className="text-[#C09E6B] text-sm">{hitZones[6].label}</Label>
                        <Input 
                          className="w-14 bg-[#191210] border-[#513428] text-[#E4D8B4] text-center focus:ring-[#AA3C3B]/30" 
                          placeholder={hitZones[6].placeholder}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Weapons Section */}
      <motion.div 
        variants={itemVariants}
        className="bg-[#1D1210]/90 border border-[#513428] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.3)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#540804] via-[#AA3C3B] to-[#540804]"></div>
        
        <div className="p-4">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-bold text-[#E4D8B4] font-serif flex items-center">
              <div className="p-1.5 rounded-full bg-[#191210] text-[#AA3C3B] mr-2">
                <Sword size={isMobile ? 18 : 20} />
              </div>
              Waffen
            </h2>
          </div>
          
          <div className={cn(
            "rounded-md border border-[#513428]/50 shadow-inner",
            isMobile ? "" : "overflow-x-auto"
          )}>
            {isMobile ? (
              <Accordion type="single" collapsible className="w-full">
                {[...Array(3)].map((_, index) => (
                  <EquipmentRow
                    key={index}
                    isMobile={isMobile}
                    fields={[
                      { label: "Name", placeholder: "Name" },
                      { label: "Gruppe", placeholder: "Gruppe" },
                      { label: "TP", placeholder: "TP" },
                      { label: "Reichweite", placeholder: "Reichweite" },
                      { label: "Schaden", placeholder: "Schaden" },
                      { label: "Eigenschaften", placeholder: "Eigenschaften" }
                    ]}
                  />
                ))}
              </Accordion>
            ) : (
              <Table className="w-full">
                <TableHeader className="bg-[#2A1A17]">
                  <TableRow className="border-[#513428] hover:bg-transparent">
                    <TableHead className="text-[#C09E6B] font-medium">Name</TableHead>
                    <TableHead className="text-[#C09E6B] font-medium">Gruppe</TableHead>
                    <TableHead className="text-[#C09E6B] font-medium text-center">TP</TableHead>
                    <TableHead className="text-[#C09E6B] font-medium">Reichw/Länge</TableHead>
                    <TableHead className="text-[#C09E6B] font-medium">Schaden</TableHead>
                    <TableHead className="text-[#C09E6B] font-medium">Eigenschaften</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(3)].map((_, index) => (
                    <EquipmentRow
                      key={index}
                      isMobile={isMobile}
                      fields={[
                        { label: "Name", placeholder: "Name" },
                        { label: "Gruppe", placeholder: "Gruppe" },
                        { label: "TP", placeholder: "TP", className: "text-center" },
                        { label: "Reichweite", placeholder: "Reichweite" },
                        { label: "Schaden", placeholder: "Schaden" },
                        { label: "Eigenschaften", placeholder: "Eigenschaften" }
                      ]}
                    />
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </motion.div>

      {/* Spells and Prayers Section */}
      <motion.div 
        variants={itemVariants}
        className="bg-[#1D1210]/90 border border-[#513428] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.3)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#540804] via-[#AA3C3B] to-[#540804]"></div>
        
        <div className="p-4">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-bold text-[#E4D8B4] font-serif flex items-center">
              <div className="p-1.5 rounded-full bg-[#191210] text-[#AA3C3B] mr-2">
                <Wand size={isMobile ? 18 : 20} />
              </div>
              Zauber und Gebete
            </h2>
          </div>
          
          <div className={cn(
            "rounded-md border border-[#513428]/50 shadow-inner",
            isMobile ? "" : "overflow-x-auto"
          )}>
            {isMobile ? (
              <Accordion type="single" collapsible className="w-full">
                {[...Array(3)].map((_, index) => (
                  <EquipmentRow
                    key={index}
                    isMobile={isMobile}
                    fields={[
                      { label: "Name", placeholder: "Name" },
                      { label: "ZW", placeholder: "ZW" },
                      { label: "Reichweite", placeholder: "Reichweite" },
                      { label: "Ziel", placeholder: "Ziel" },
                      { label: "Dauer", placeholder: "Dauer" },
                      { label: "Effekt", placeholder: "Effekt" }
                    ]}
                  />
                ))}
              </Accordion>
            ) : (
              <Table className="w-full">
                <TableHeader className="bg-[#2A1A17]">
                  <TableRow className="border-[#513428] hover:bg-transparent">
                    <TableHead className="text-[#C09E6B] font-medium">Name</TableHead>
                    <TableHead className="text-[#C09E6B] font-medium text-center">ZW</TableHead>
                    <TableHead className="text-[#C09E6B] font-medium">Reichweite</TableHead>
                    <TableHead className="text-[#C09E6B] font-medium">Ziel</TableHead>
                    <TableHead className="text-[#C09E6B] font-medium">Dauer</TableHead>
                    <TableHead className="text-[#C09E6B] font-medium">Effekt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(3)].map((_, index) => (
                    <EquipmentRow
                      key={index}
                      isMobile={isMobile}
                      fields={[
                        { label: "Name", placeholder: "Name" },
                        { label: "ZW", placeholder: "ZW", className: "text-center" },
                        { label: "Reichweite", placeholder: "Reichweite" },
                        { label: "Ziel", placeholder: "Ziel" },
                        { label: "Dauer", placeholder: "Dauer" },
                        { label: "Effekt", placeholder: "Effekt" }
                      ]}
                    />
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

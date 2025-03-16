
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Package, Sword, Wand } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";

export function CombatEquipmentSection() {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      {/* Armor Section */}
      <Card className="bg-[#f5e8c8] border-[#d8c38d] shadow-sm relative overflow-hidden">
        <div className="absolute top-2 left-2 text-[#8b7339] opacity-20">
          <Shield size={isMobile ? 20 : 24} />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-[#4e3c10] font-serif text-lg flex items-center">
            <Shield size={isMobile ? 18 : 20} className="mr-2 text-[#8b7339]" />
            Rüstung
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-7">
              <Table className="w-full">
                <TableHeader className="bg-[#e6d8b0]">
                  <TableRow>
                    <TableHead className="text-[#4e3c10] font-medium">Name</TableHead>
                    <TableHead className="text-[#4e3c10] font-medium text-center">Trefferzone</TableHead>
                    <TableHead className="text-[#4e3c10] font-medium text-center">TP</TableHead>
                    <TableHead className="text-[#4e3c10] font-medium text-center">RP</TableHead>
                    <TableHead className="text-[#4e3c10] font-medium">Eigenschaften</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(3)].map((_, index) => (
                    <TableRow key={index} className="hover:bg-[#ecdeb8]">
                      <TableCell className="p-1.5">
                        <Input
                          placeholder="Name"
                          className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10]"
                        />
                      </TableCell>
                      <TableCell className="p-1.5">
                        <Input
                          placeholder="Zone"
                          className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center"
                        />
                      </TableCell>
                      <TableCell className="p-1.5">
                        <Input
                          placeholder="TP"
                          className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center"
                        />
                      </TableCell>
                      <TableCell className="p-1.5">
                        <Input
                          placeholder="RP"
                          className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center"
                        />
                      </TableCell>
                      <TableCell className="p-1.5">
                        <Input
                          placeholder="Eigenschaften"
                          className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10]"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="md:col-span-5 flex flex-col">
              <div className="text-center mb-2 font-medium text-[#4e3c10]">Trefferzonen</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-[#6b592b] text-sm">Kopf (01-09)</Label>
                    <Input 
                      className="w-14 bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center" 
                      placeholder="RP" 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-[#6b592b] text-sm">Linker Arm (25-44)</Label>
                    <Input 
                      className="w-14 bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center" 
                      placeholder="RP" 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-[#6b592b] text-sm">Rechter Arm (45-79)</Label>
                    <Input 
                      className="w-14 bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center" 
                      placeholder="RP" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-[#6b592b] text-sm">Körper (90-00)</Label>
                    <Input 
                      className="w-14 bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center" 
                      placeholder="RP" 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-[#6b592b] text-sm">Rechtes Bein (80-89)</Label>
                    <Input 
                      className="w-14 bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center" 
                      placeholder="RP" 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-[#6b592b] text-sm">Linkes Bein (10-24)</Label>
                    <Input 
                      className="w-14 bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center" 
                      placeholder="RP" 
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <Label className="text-[#6b592b] text-sm">Schild</Label>
                  <Input 
                    className="w-14 bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center" 
                    placeholder="RP" 
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weapons Section */}
      <Card className="bg-[#f5e8c8] border-[#d8c38d] shadow-sm relative overflow-hidden">
        <div className="absolute top-2 left-2 text-[#8b7339] opacity-20">
          <Sword size={isMobile ? 20 : 24} />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-[#4e3c10] font-serif text-lg flex items-center">
            <Sword size={isMobile ? 18 : 20} className="mr-2 text-[#8b7339]" />
            Waffen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader className="bg-[#e6d8b0]">
              <TableRow>
                <TableHead className="text-[#4e3c10] font-medium">Name</TableHead>
                <TableHead className="text-[#4e3c10] font-medium">Gruppe</TableHead>
                <TableHead className="text-[#4e3c10] font-medium text-center">TP</TableHead>
                <TableHead className="text-[#4e3c10] font-medium">Reichw/Länge</TableHead>
                <TableHead className="text-[#4e3c10] font-medium">Schaden</TableHead>
                <TableHead className="text-[#4e3c10] font-medium">Eigenschaften</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(3)].map((_, index) => (
                <TableRow key={index} className="hover:bg-[#ecdeb8]">
                  <TableCell className="p-1.5">
                    <Input
                      placeholder="Name"
                      className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10]"
                    />
                  </TableCell>
                  <TableCell className="p-1.5">
                    <Input
                      placeholder="Gruppe"
                      className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10]"
                    />
                  </TableCell>
                  <TableCell className="p-1.5">
                    <Input
                      placeholder="TP"
                      className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center"
                    />
                  </TableCell>
                  <TableCell className="p-1.5">
                    <Input
                      placeholder="Reichweite"
                      className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10]"
                    />
                  </TableCell>
                  <TableCell className="p-1.5">
                    <Input
                      placeholder="Schaden"
                      className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10]"
                    />
                  </TableCell>
                  <TableCell className="p-1.5">
                    <Input
                      placeholder="Eigenschaften"
                      className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10]"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Spells and Prayers Section */}
      <Card className="bg-[#f5e8c8] border-[#d8c38d] shadow-sm relative overflow-hidden">
        <div className="absolute top-2 left-2 text-[#8b7339] opacity-20">
          <Wand size={isMobile ? 20 : 24} />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-[#4e3c10] font-serif text-lg flex items-center">
            <Wand size={isMobile ? 18 : 20} className="mr-2 text-[#8b7339]" />
            Zauber und Gebete
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader className="bg-[#e6d8b0]">
              <TableRow>
                <TableHead className="text-[#4e3c10] font-medium">Name</TableHead>
                <TableHead className="text-[#4e3c10] font-medium text-center">ZW</TableHead>
                <TableHead className="text-[#4e3c10] font-medium">Reichweite</TableHead>
                <TableHead className="text-[#4e3c10] font-medium">Ziel</TableHead>
                <TableHead className="text-[#4e3c10] font-medium">Dauer</TableHead>
                <TableHead className="text-[#4e3c10] font-medium">Effekt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(3)].map((_, index) => (
                <TableRow key={index} className="hover:bg-[#ecdeb8]">
                  <TableCell className="p-1.5">
                    <Input
                      placeholder="Name"
                      className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10]"
                    />
                  </TableCell>
                  <TableCell className="p-1.5">
                    <Input
                      placeholder="ZW"
                      className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center"
                    />
                  </TableCell>
                  <TableCell className="p-1.5">
                    <Input
                      placeholder="Reichweite"
                      className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10]"
                    />
                  </TableCell>
                  <TableCell className="p-1.5">
                    <Input
                      placeholder="Ziel"
                      className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10]"
                    />
                  </TableCell>
                  <TableCell className="p-1.5">
                    <Input
                      placeholder="Dauer"
                      className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10]"
                    />
                  </TableCell>
                  <TableCell className="p-1.5">
                    <Input
                      placeholder="Effekt"
                      className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10]"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Two-column layout for remaining sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Equipment Section */}
          <Card className="bg-[#f5e8c8] border-[#d8c38d] shadow-sm relative overflow-hidden">
            <div className="absolute top-2 left-2 text-[#8b7339] opacity-20">
              <Package size={isMobile ? 20 : 24} />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-[#4e3c10] font-serif text-lg flex items-center">
                <Package size={isMobile ? 18 : 20} className="mr-2 text-[#8b7339]" />
                Ausrüstung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="w-full">
                <TableHeader className="bg-[#e6d8b0]">
                  <TableRow>
                    <TableHead className="text-[#4e3c10] font-medium">Name</TableHead>
                    <TableHead className="text-[#4e3c10] font-medium text-center">TP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(4)].map((_, index) => (
                    <TableRow key={index} className="hover:bg-[#ecdeb8]">
                      <TableCell className="p-1.5">
                        <Input
                          placeholder="Name"
                          className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10]"
                        />
                      </TableCell>
                      <TableCell className="p-1.5">
                        <Input
                          placeholder="TP"
                          className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Psychology Section */}
          <Card className="bg-[#f5e8c8] border-[#d8c38d] shadow-sm relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#4e3c10] font-serif text-lg">
                Psychologie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Beschreibe psychologische Aspekte deines Charakters..."
                className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] min-h-[120px]"
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Encumbrance Section */}
          <Card className="bg-[#f5e8c8] border-[#d8c38d] shadow-sm relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#4e3c10] font-serif text-lg">
                Traglast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-[#6b592b] font-medium">Waffen (STB)</Label>
                  <Input 
                    placeholder="0"
                    className="w-20 bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-[#6b592b] font-medium">Rüstung (WIB×2)</Label>
                  <Input 
                    placeholder="0"
                    className="w-20 bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-[#6b592b] font-medium">Ausrüstung (WKB)</Label>
                  <Input 
                    placeholder="0"
                    className="w-20 bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center"
                  />
                </div>
                <Separator className="bg-[#d8c38d] my-2" />
                <div className="flex items-center justify-between">
                  <Label className="text-[#6b592b] font-medium">Maximum TP</Label>
                  <Input 
                    placeholder="0"
                    className="w-20 bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-[#6b592b] font-medium">Gesamt</Label>
                  <Input 
                    placeholder="0"
                    className="w-20 bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] text-center"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Corruption & Mutation Section */}
          <Card className="bg-[#f5e8c8] border-[#d8c38d] shadow-sm relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#4e3c10] font-serif text-lg">
                Korrumpierung & Mutation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Beschreibe Korrumpierung und Mutationen deines Charakters..."
                className="bg-[#f0ddb0] border-[#d8c38d] text-[#4e3c10] min-h-[120px]"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

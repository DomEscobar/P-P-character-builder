
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Weight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export function EquipmentLoadSection() {
  const isMobile = useIsMobile();

  return (
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
              {[...Array(6)].map((_, index) => (
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

      {/* Two-column layout for remaining sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Encumbrance Section */}
          <Card className="bg-[#f5e8c8] border-[#d8c38d] shadow-sm relative overflow-hidden">
            <div className="absolute top-2 left-2 text-[#8b7339] opacity-20">
              <Weight size={isMobile ? 20 : 24} />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-[#4e3c10] font-serif text-lg flex items-center">
                <Weight size={isMobile ? 18 : 20} className="mr-2 text-[#8b7339]" />
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
        </div>

        {/* Right Column */}
        <div className="space-y-4">
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

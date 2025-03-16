
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CharacterHeader } from "@/components/CharacterHeader";
import { CharacterStats } from "@/components/CharacterStats";
import { SecondaryAttributes } from "@/components/SecondaryAttributes";
import { SkillsSection } from "@/components/SkillsSection";
import { TalentsSection } from "@/components/TalentsSection";
import { GoalsSection } from "@/components/GoalsSection";
import { GroupSection } from "@/components/GroupSection";
import { Activity, Lightbulb, Award, FileText } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-[#262222] text-[#e0d0b0] font-serif">
      <div className="container px-2 py-4 mx-auto max-w-3xl md:px-4 md:py-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-[#d4af37] md:text-3xl md:mb-6">
          Warhammer Fantasy Roleplay
        </h1>
        
        <CharacterHeader />
        
        <div className="mt-4 md:mt-6">
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4 md:mb-6 bg-[#332d2d]">
              <TabsTrigger value="stats" className="text-[#d4af37] h-10">
                {isMobile ? <Activity size={18} /> : "Stats"}
              </TabsTrigger>
              <TabsTrigger value="skills" className="text-[#d4af37] h-10">
                {isMobile ? <Award size={18} /> : "Skills"}
              </TabsTrigger>
              <TabsTrigger value="talents" className="text-[#d4af37] h-10">
                {isMobile ? <Lightbulb size={18} /> : "Talents"}
              </TabsTrigger>
              <TabsTrigger value="info" className="text-[#d4af37] h-10">
                {isMobile ? <FileText size={18} /> : "Info"}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="stats" className="space-y-4 md:space-y-6">
              <CharacterStats />
              <SecondaryAttributes />
            </TabsContent>
            
            <TabsContent value="skills" className="space-y-4 md:space-y-6">
              <SkillsSection />
            </TabsContent>
            
            <TabsContent value="talents" className="space-y-4 md:space-y-6">
              <TalentsSection />
            </TabsContent>
            
            <TabsContent value="info" className="space-y-4 md:space-y-6">
              <GoalsSection />
              <GroupSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;

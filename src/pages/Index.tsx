
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CharacterHeader } from "@/components/CharacterHeader";
import { CharacterStats } from "@/components/CharacterStats";
import { SecondaryAttributes } from "@/components/SecondaryAttributes";
import { SkillsSection } from "@/components/SkillsSection";
import { TalentsSection } from "@/components/TalentsSection";
import { GoalsSection } from "@/components/GoalsSection";
import { GroupSection } from "@/components/GroupSection";
import { Activity, Lightbulb, Award, FileText, Shield } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-[#f8f0db] font-serif">
      <div className="container px-2 py-4 mx-auto max-w-3xl md:px-4 md:py-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-[#4e3c10] md:text-3xl md:mb-6 font-serif">
          Character Roundtable
        </h1>
        
        <CharacterHeader />
        
        <div className="relative">
          <div className="absolute inset-0 bg-[#e2cc9c] rounded-lg transform -rotate-1 scale-[1.02] -z-10"></div>
          <div className="bg-[#f5e8c8] rounded-lg shadow-md p-4 border border-[#d8c38d]">
            <Tabs defaultValue="stats" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4 md:mb-4 bg-[#f0ddb0] border border-[#d8c38d] p-1 rounded-md">
                <TabsTrigger value="stats" className="text-[#6b592b] data-[state=active]:bg-[#e2cc9c] data-[state=active]:text-[#4e3c10]">
                  <Shield size={16} className="md:mr-2" />
                  {!isMobile && "Stats"}
                </TabsTrigger>
                <TabsTrigger value="skills" className="text-[#6b592b] data-[state=active]:bg-[#e2cc9c] data-[state=active]:text-[#4e3c10]">
                  <Award size={16} className="md:mr-2" />
                  {!isMobile && "Skills"}
                </TabsTrigger>
                <TabsTrigger value="talents" className="text-[#6b592b] data-[state=active]:bg-[#e2cc9c] data-[state=active]:text-[#4e3c10]">
                  <Lightbulb size={16} className="md:mr-2" />
                  {!isMobile && "Talents"}
                </TabsTrigger>
                <TabsTrigger value="info" className="text-[#6b592b] data-[state=active]:bg-[#e2cc9c] data-[state=active]:text-[#4e3c10]">
                  <FileText size={16} className="md:mr-2" />
                  {!isMobile && "Info"}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="stats" className="space-y-4 md:space-y-4">
                <CharacterStats />
                <SecondaryAttributes />
              </TabsContent>
              
              <TabsContent value="skills" className="space-y-4 md:space-y-4">
                <SkillsSection />
              </TabsContent>
              
              <TabsContent value="talents" className="space-y-4 md:space-y-4">
                <TalentsSection />
              </TabsContent>
              
              <TabsContent value="info" className="space-y-4 md:space-y-4">
                <GoalsSection />
                <GroupSection />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

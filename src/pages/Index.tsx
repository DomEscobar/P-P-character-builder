
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CharacterHeader } from "@/components/CharacterHeader";
import { CharacterStats } from "@/components/CharacterStats";
import { SecondaryAttributes } from "@/components/SecondaryAttributes";
import { SkillsSection } from "@/components/SkillsSection";
import { TalentsSection } from "@/components/TalentsSection";
import { GoalsSection } from "@/components/GoalsSection";
import { GroupSection } from "@/components/GroupSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#262222] text-[#e0d0b0] font-serif">
      <div className="container px-4 py-6 mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#d4af37]">
          Warhammer Fantasy Roleplay
        </h1>
        
        <CharacterHeader />
        
        <div className="mt-6">
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6 bg-[#332d2d]">
              <TabsTrigger value="stats" className="text-[#d4af37]">Stats</TabsTrigger>
              <TabsTrigger value="skills" className="text-[#d4af37]">Skills</TabsTrigger>
              <TabsTrigger value="talents" className="text-[#d4af37]">Talents</TabsTrigger>
              <TabsTrigger value="info" className="text-[#d4af37]">Info</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stats" className="space-y-6">
              <CharacterStats />
              <SecondaryAttributes />
            </TabsContent>
            
            <TabsContent value="skills" className="space-y-6">
              <SkillsSection />
            </TabsContent>
            
            <TabsContent value="talents" className="space-y-6">
              <TalentsSection />
            </TabsContent>
            
            <TabsContent value="info" className="space-y-6">
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

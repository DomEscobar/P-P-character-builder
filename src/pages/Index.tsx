import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CharacterHeader } from "@/components/CharacterHeader";
import { CharacterStats } from "@/components/CharacterStats";
import { SecondaryAttributes } from "@/components/SecondaryAttributes";
import { SkillsSection } from "@/components/SkillsSection";
import { TalentsSection } from "@/components/TalentsSection";
import { GoalsSection } from "@/components/GoalsSection";
import { GroupSection } from "@/components/GroupSection";
import { CombatEquipmentSection } from "@/components/CombatEquipmentSection";
import { EquipmentLoadSection } from "@/components/EquipmentLoadSection";
import { Activity, Lightbulb, Award, FileText, Shield, Sword, Package, Skull, Heart, Brain, Feather, Scroll } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { HealthWealthProvider } from "@/context/HealthWealthContext";
import { useHealthWealth } from "@/context/HealthWealthContext";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Index = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("stats");
  const [showPageTransition, setShowPageTransition] = useState(false);
  
  // Animation for page load
  useEffect(() => {
    setShowPageTransition(true);
    const timer = setTimeout(() => setShowPageTransition(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  // Themed background patterns for each tab
  const getTabBackground = () => {
    switch(activeTab) {

    }
  };
  
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-[#08090A] font-serif text-[#E4D8B4] relative overflow-hidden"
      >
        {/* Ambient background elements */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#540804] via-[#380303] to-transparent opacity-70 z-0"></div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent opacity-70 z-0"></div>

        <div className="container px-2 py-4 mx-auto max-w-4xl md:px-4 md:py-6 relative z-10">
          <motion.h1 
            className="text-2xl font-bold text-center mb-4 text-[#C09E6B] md:text-3xl md:mb-6 font-serif"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <span className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wide">Warhammer Character Sheet</span>
          </motion.h1>
          
          <HealthWealthProvider>
            <CharacterHeader />
            
            <motion.div 
              className="relative mt-6"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute inset-0 bg-[#240F0B] rounded-lg transform rotate-1 scale-[1.02] -z-10 shadow-[0_0_30px_rgba(84,8,4,0.3)]"></div>
              <div className={`rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.6)] p-5 border border-[#513428] transition-all duration-500 ${getTabBackground()}`}>
                <Tabs 
                  defaultValue="stats" 
                  className="w-full"
                  onValueChange={handleTabChange}
                >
                  <TabsList className="grid grid-cols-6 mb-6 md:mb-6 bg-[#1D1210]/80 border border-[#513428] p-1 rounded-md backdrop-blur">
                    <TabsTrigger 
                      value="stats" 
                      className="text-[#C09E6B] data-[state=active]:bg-gradient-to-b data-[state=active]:from-[#540804] data-[state=active]:to-[#380303] data-[state=active]:text-[#E4D8B4] data-[state=active]:shadow-[0_0_10px_rgba(84,8,4,0.5)] transition-all duration-300"
                    >
                      <Shield size={isMobile ? 18 : 16} className={`${!isMobile && 'mr-2'} transition-transform hover:scale-110`} />
                      {!isMobile && "Stats"}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="skills" 
                      className="text-[#C09E6B] data-[state=active]:bg-gradient-to-b data-[state=active]:from-[#540804] data-[state=active]:to-[#380303] data-[state=active]:text-[#E4D8B4] data-[state=active]:shadow-[0_0_10px_rgba(84,8,4,0.5)] transition-all duration-300"
                    >
                      <Award size={isMobile ? 18 : 16} className={`${!isMobile && 'mr-2'} transition-transform hover:scale-110`} />
                      {!isMobile && "Skills"}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="talents" 
                      className="text-[#C09E6B] data-[state=active]:bg-gradient-to-b data-[state=active]:from-[#540804] data-[state=active]:to-[#380303] data-[state=active]:text-[#E4D8B4] data-[state=active]:shadow-[0_0_10px_rgba(84,8,4,0.5)] transition-all duration-300"
                    >
                      <Scroll size={isMobile ? 18 : 16} className={`${!isMobile && 'mr-2'} transition-transform hover:scale-110`} />
                      {!isMobile && "Talents"}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="combat" 
                      className="text-[#C09E6B] data-[state=active]:bg-gradient-to-b data-[state=active]:from-[#540804] data-[state=active]:to-[#380303] data-[state=active]:text-[#E4D8B4] data-[state=active]:shadow-[0_0_10px_rgba(84,8,4,0.5)] transition-all duration-300"
                    >
                      <Sword size={isMobile ? 18 : 16} className={`${!isMobile && 'mr-2'} transition-transform hover:scale-110`} />
                      {!isMobile && "Combat"}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="equipment" 
                      className="text-[#C09E6B] data-[state=active]:bg-gradient-to-b data-[state=active]:from-[#540804] data-[state=active]:to-[#380303] data-[state=active]:text-[#E4D8B4] data-[state=active]:shadow-[0_0_10px_rgba(84,8,4,0.5)] transition-all duration-300"
                    >
                      <Package size={isMobile ? 18 : 16} className={`${!isMobile && 'mr-2'} transition-transform hover:scale-110`} />
                      {!isMobile && "Ausrüstung"}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="info" 
                      className="text-[#C09E6B] data-[state=active]:bg-gradient-to-b data-[state=active]:from-[#540804] data-[state=active]:to-[#380303] data-[state=active]:text-[#E4D8B4] data-[state=active]:shadow-[0_0_10px_rgba(84,8,4,0.5)] transition-all duration-300"
                    >
                      <Feather size={isMobile ? 18 : 16} className={`${!isMobile && 'mr-2'} transition-transform hover:scale-110`} />
                      {!isMobile && "Info"}
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="stats" className="space-y-4 md:space-y-6 relative">
                    <div className="absolute top-0 right-0 -mt-4 -mr-2 opacity-30 pointer-events-none">
                    </div>
                    <CharacterStats />
                    <SecondaryAttributes />
                  </TabsContent>
                  
                  <TabsContent value="skills" className="space-y-4 md:space-y-6 relative">
                    <div className="absolute top-0 right-0 -mt-4 -mr-2 opacity-30 pointer-events-none">
                    </div>
                    <SkillsSection />
                  </TabsContent>
                  
                  <TabsContent value="talents" className="space-y-4 md:space-y-6 relative">
                    <div className="absolute top-0 right-0 -mt-4 -mr-2 opacity-30 pointer-events-none">
                    </div>
                    <TalentsSection />
                  </TabsContent>
                  
                  <TabsContent value="combat" className="space-y-4 md:space-y-6 relative">
                    <div className="absolute top-0 right-0 -mt-4 -mr-2 opacity-30 pointer-events-none">
                    </div>
                    <CombatEquipmentSection />
                  </TabsContent>
                  
                  <TabsContent value="equipment" className="space-y-4 md:space-y-6 relative">
                    <div className="absolute top-0 right-0 -mt-4 -mr-2 opacity-30 pointer-events-none">
                    </div>
                    <EquipmentLoadSection />
                  </TabsContent>
                  
                  <TabsContent value="info" className="space-y-4 md:space-y-6 relative">
                    <div className="absolute top-0 right-0 -mt-4 -mr-2 opacity-30 pointer-events-none">
                    </div>
                    <GoalsSection />
                    <GroupSection />
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          </HealthWealthProvider>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-5 left-5 opacity-50 hidden md:block">
        </div>
        <div className="absolute top-5 right-5 opacity-50 hidden md:block">
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// New component to display health, wealth, and other vital stats visually
const CharacterVitals = () => {
  const { healthWealth } = useHealthWealth();
  const healthPercentage = (healthWealth.health.lp / healthWealth.health.maxLp) * 100 || 0;
  
  return (
    <motion.div 
      className="mb-4 p-3 rounded-lg bg-[#1D1210]/80 border border-[#513428] shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-wrap items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <Heart className="w-4 h-4 text-[#AA3C3B] mr-2" />
                  <span className="text-sm font-bold text-[#E4D8B4]">Lebenspunkte</span>
                  <span className="ml-auto text-sm">{healthWealth.health.lp}/{healthWealth.health.maxLp}</span>
                </div>
                <div className="relative h-3 overflow-hidden rounded-full bg-[#2A1A17]">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-[#540804] to-[#AA3C3B]"
                    initial={{ width: 0 }}
                    animate={{ width: `${healthPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Current Health Points</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex items-center px-4 py-2 bg-[#191210] rounded-md border border-[#513428]">
          <div className="flex items-center">
            <img src="/images/gold-coin.webp" alt="Gold" className="w-6 h-6 mr-1" />
            <span className="text-[#E4AB4B] font-bold">{healthWealth.wealth.gold}</span>
          </div>
          <span className="mx-1 text-[#513428]">|</span>
          <div className="flex items-center">
            <img src="/images/silver-coin.webp" alt="Silber" className="w-6 h-6 mr-1" />
            <span className="text-[#C0C0C0] font-bold">{healthWealth.wealth.silber}</span>
          </div>
          <span className="mx-1 text-[#513428]">|</span>
          <div className="flex items-center">
            <img src="/images/copper-coin.webp" alt="Groschen" className="w-6 h-6 mr-1" />
            <span className="text-[#CD7F32] font-bold">{healthWealth.wealth.groschen}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Index;

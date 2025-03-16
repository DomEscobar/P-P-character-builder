
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Scroll, Users, Sword } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";
import { useIsMobile } from "@/hooks/use-mobile";

export function CharacterHeader() {
  const { profile, updateProfile } = useCharacter();
  const isMobile = useIsMobile();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProfile({
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="flex justify-center mb-2 md:mb-4">
        <div className="h-16 w-16 md:h-24 md:w-24 bg-[#3a3333] rounded-full flex justify-center items-center border-2 border-[#d4af37]">
          {profile.portrait ? (
            <img 
              src={profile.portrait} 
              alt="Character Portrait" 
              className="h-full w-full object-cover rounded-full"
            />
          ) : (
            <User className="h-8 w-8 md:h-12 md:w-12 text-[#d4af37]" />
          )}
        </div>
      </div>

      <Carousel 
        className="w-full"
        opts={{
          align: "start",
          loop: false,
        }}
      >
        <CarouselContent>
          <CarouselItem className="basis-4/5 md:basis-1/3">
            <CharacterInfoCard 
              icon={<User className="h-4 w-4 md:h-5 md:w-5" />}
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Character Name"
            />
          </CarouselItem>
          <CarouselItem className="basis-4/5 md:basis-1/3">
            <CharacterInfoCard 
              icon={<Users className="h-4 w-4 md:h-5 md:w-5" />}
              label="Volk"
              name="volk"
              value={profile.volk}
              onChange={handleChange}
              placeholder="e.g. Human, Dwarf"
            />
          </CarouselItem>
          <CarouselItem className="basis-4/5 md:basis-1/3">
            <CharacterInfoCard 
              icon={<Sword className="h-4 w-4 md:h-5 md:w-5" />}
              label="Klasse"
              name="klasse"
              value={profile.klasse}
              onChange={handleChange}
              placeholder="e.g. Warrior, Mage"
            />
          </CarouselItem>
          <CarouselItem className="basis-4/5 md:basis-1/3">
            <CharacterInfoCard 
              icon={<Scroll className="h-4 w-4 md:h-5 md:w-5" />}
              label="Karriere"
              name="karriere"
              value={profile.karriere}
              onChange={handleChange}
              placeholder="e.g. Mercenary"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}

function CharacterInfoCard({ 
  icon, 
  label, 
  name, 
  value, 
  onChange, 
  placeholder 
}: { 
  icon: React.ReactNode;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  const isMobile = useIsMobile();
  
  return (
    <Card className="bg-[#332d2d] border-[#473b3b]">
      <CardContent className="p-2 md:p-4">
        <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
          {icon}
          <Label htmlFor={name} className="text-[#d4af37] text-xs md:text-sm">{label}</Label>
        </div>
        <Input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] focus-visible:ring-[#d4af37] h-8 md:h-10 text-xs md:text-sm"
        />
      </CardContent>
    </Card>
  );
}


import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { User, Scroll, Users, Sword } from "lucide-react";

export function CharacterHeader() {
  const [character, setCharacter] = useState({
    name: "",
    volk: "",
    klasse: "",
    karriere: "",
    portrait: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacter({
      ...character,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center mb-4">
        <div className="h-24 w-24 bg-[#3a3333] rounded-full flex justify-center items-center border-2 border-[#d4af37]">
          {character.portrait ? (
            <img 
              src={character.portrait} 
              alt="Character Portrait" 
              className="h-full w-full object-cover rounded-full"
            />
          ) : (
            <User className="h-12 w-12 text-[#d4af37]" />
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
              icon={<User className="h-5 w-5" />}
              label="Name"
              name="name"
              value={character.name}
              onChange={handleChange}
              placeholder="Character Name"
            />
          </CarouselItem>
          <CarouselItem className="basis-4/5 md:basis-1/3">
            <CharacterInfoCard 
              icon={<Users className="h-5 w-5" />}
              label="Volk"
              name="volk"
              value={character.volk}
              onChange={handleChange}
              placeholder="e.g. Human, Dwarf"
            />
          </CarouselItem>
          <CarouselItem className="basis-4/5 md:basis-1/3">
            <CharacterInfoCard 
              icon={<Sword className="h-5 w-5" />}
              label="Klasse"
              name="klasse"
              value={character.klasse}
              onChange={handleChange}
              placeholder="e.g. Warrior, Mage"
            />
          </CarouselItem>
          <CarouselItem className="basis-4/5 md:basis-1/3">
            <CharacterInfoCard 
              icon={<Scroll className="h-5 w-5" />}
              label="Karriere"
              name="karriere"
              value={character.karriere}
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
  return (
    <Card className="bg-[#332d2d] border-[#473b3b]">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <Label htmlFor={name} className="text-[#d4af37]">{label}</Label>
        </div>
        <Input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-[#262222] border-[#473b3b] text-[#e0d0b0] focus-visible:ring-[#d4af37]"
        />
      </CardContent>
    </Card>
  );
}

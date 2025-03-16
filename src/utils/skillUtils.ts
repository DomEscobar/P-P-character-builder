
import type { Skill } from "@/types/character";
import type { Stat } from "@/components/CharacterStats";

export const getCharacterStatOptions = (stats: Stat[]) => {
  return stats.map(stat => ({
    value: stat.short,
    label: `${stat.name} (${stat.short})`,
    baseValue: stat.start
  }));
};

export const calculateWert = (skill: { spielwert: string; steigerung: number }, stats: Stat[]): number => {
  const statOption = getCharacterStatOptions(stats).find(option => option.value === skill.spielwert);
  return statOption ? statOption.baseValue + skill.steigerung : 0;
};

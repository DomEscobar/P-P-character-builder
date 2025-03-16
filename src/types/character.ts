
// Character profile types
export type CharacterProfile = {
  name: string;
  volk: string;
  klasse: string;
  karriere: string;
  portrait: string | null;
};

// Skill type
export type Skill = {
  id: string;
  name: string;
  spielwert: string;
  steigerung: number;
};

// Talent type
export type Talent = {
  id: string;
  name: string;
  stufe: string;
  beschreibung: string;
};

// Secondary attributes types
export type FateAttributes = {
  schicksal: number;
  glueck: number;
};

export type ToughnessAttributes = {
  zaehigkeit: number;
  mut: number;
  motivation: string;
};

export type ExperienceAttributes = {
  aktuell: number;
  ausgegeben: number;
  gesamt: number;
};

export type MovementAttributes = {
  bewegung: number;
  gehen: number;
  rennen: number;
};

export type CharacterSecondary = {
  fate: FateAttributes;
  toughness: ToughnessAttributes;
  experience: ExperienceAttributes;
  movement: MovementAttributes;
};

// Group data type
export type GroupData = {
  name: string;
  kurzfristig: string;
  langfristig: string;
  mitglieder: string;
};

// Goals type
export type Goals = {
  kurzfristig: string;
  langfristig: string;
};

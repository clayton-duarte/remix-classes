import { Theme } from "@emotion/react";

import {
  CharacterAbilityName,
  CharacterClassName,
  CharacterRaceName,
  CharacterRoleName,
  PowerSourceName,
  SkillName,
} from "~/helpers/consts";

export type Colors = keyof Theme;

export type StatusColors = keyof Pick<Theme, "error" | "warn" | "success">;

export interface CharacterRole {
  description: string;
  name: CharacterRoleName;
}

export interface PowerSource {
  description: string;
  name: PowerSourceName;
}

export interface CharacterAbility {
  name: CharacterAbilityName;
  description: string;
  sort: number;
}

export interface Skill {
  keyAbility: CharacterAbilityName;
  name: SkillName;
}

export interface CharacterClass {
  name: CharacterClassName;
  powerSource: PowerSourceName;
  mainRole: CharacterRoleName;
  keyAbilities: CharacterAbilityName[];
  skillChoices: number;
  trainedSkills: SkillName[];
  skillList: SkillName[];
  flavorText: string;
  book: string;
  page: number;
}

export interface CharacterRace {
  name: CharacterRaceName;
  abilityBonus: CharacterAbilityName[];
  description: string;
  book: string;
  page: number;
}

export type CharBuilderChoices = Partial<{
  characterClassName: CharacterClassName;
  characterPower: PowerSourceName;
  characterRaceName: CharacterRaceName;
  characterRole: CharacterRoleName;
}>;

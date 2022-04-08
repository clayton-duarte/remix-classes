import { Theme } from "@emotion/react";

export type Colors = keyof Theme;

export type StatusColors = keyof Pick<Theme, "error" | "warn" | "success">;

export enum CharacterRoleName {
  Controller = "controller",
  Defender = "defender",
  Leader = "leader",
  Striker = "striker",
}

export interface CharacterRole {
  description: string;
  name: CharacterRoleName;
}

export enum PowerSourceName {
  Arcane = "arcane",
  Divine = "divine",
  Martial = "martial",
  Primal = "primal",
  Psionic = "psionic",
}

export interface PowerSource {
  description: string;
  name: PowerSourceName;
}

export enum CharacterAbilityName {
  Strength = "strength",
  Constitution = "constitution",
  Dexterity = "dexterity",
  Intelligence = "intelligence",
  Wisdom = "wisdom",
  Charisma = "charisma",
}

export interface CharacterAbility {
  name: CharacterAbilityName;
  description: string;
  sort: number;
}

export enum SkillName {
  Acrobatics = "acrobatics",
  Arcana = "arcana",
  Athletics = "athletics",
  Bluff = "bluff",
  Diplomacy = "diplomacy",
  Dungeoneering = "dungeoneering",
  Endurance = "endurance",
  Heal = "heal",
  History = "history",
  Insight = "insight",
  Intimidate = "intimidate",
  Nature = "nature",
  Perception = "perception",
  Religion = "religion",
  Stealth = "stealth",
  Streetwise = "streetwise",
  Thievery = "thievery",
}

export interface Skill {
  keyAbility: CharacterAbilityName;
  name: SkillName;
}

export enum CharacterClassName {
  Cleric = "cleric",
  Fighter = "fighter",
  Paladin = "paladin",
  Ranger = "ranger",
  Rogue = "rogue",
  Warlock = "warlock",
  Warlord = "warlord",
  Wizard = "wizard",
  Avenger = "avenger",
  Barbarian = "barbarian",
  Bard = "bard",
  Druid = "druid",
  Invoker = "invoker",
  Shaman = "shaman",
  Sorcerer = "sorcerer",
  Warden = "warden",
  Ardent = "ardent",
  Battlemind = "battlemind",
  Monk = "monk",
  Psion = "psion",
  Runepriest = "runepriest",
  Seeker = "seeker",
  SwordMage = "swordmage",
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

export enum CharacterRaceName {
  Dragonborn = "dragonborn",
  Dwarf = "dwarf",
  Eladrin = "eladrin",
  Elf = "elf",
  HalfElf = "half-elf",
  Halfling = "halfling",
  Human = "human",
  Tiefling = "tiefling",
  Deva = "deva",
  Gnome = "gnome",
  Goliath = "goliath",
  HalfOrc = "half-orc",
  Shifter = "shifter",
  Githzerai = "githzerai",
  Minotaur = "minotaur",
  Shardmind = "shardmind",
  Wilden = "wilden",
  Drow = "drow",
  Genasi = "genasi",
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

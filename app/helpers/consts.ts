export enum CharacterRoleName {
  Controller = "controller",
  Defender = "defender",
  Leader = "leader",
  Striker = "striker",
}

export enum PowerSourceName {
  Arcane = "arcane",
  Divine = "divine",
  Martial = "martial",
  Primal = "primal",
  Psionic = "psionic",
}

export enum CharacterAbilityName {
  Strength = "strength",
  Constitution = "constitution",
  Dexterity = "dexterity",
  Intelligence = "intelligence",
  Wisdom = "wisdom",
  Charisma = "charisma",
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

export const SCORE_POINTS_TO_DISTRIBUTE = 20;

export const BASE_ABILITY_SCORE = 10;

export const ABILITY_BONUS_LIMIT = 2;

export const SCORE_COSTS = [
  10, 11, 12, 13, 13, 14, 14, 15, 15, 16, 16, 16, 17, 17, 17, 17, 18,
] as const;

export const COST_BY_SCORE = [0, 1, 2, 3, 5, 7, 9, 12, 16] as const;

export const ABILITY_SCORE_BONUS_VALUE = 2;

export const TRAINED_SKILL_BONUS_VALUE = 5;

export const initialScorePointsDistribution: Record<
  CharacterAbilityName,
  typeof COST_BY_SCORE[number]
> = {
  [CharacterAbilityName.Charisma]: 0,
  [CharacterAbilityName.Constitution]: 0,
  [CharacterAbilityName.Dexterity]: 0,
  [CharacterAbilityName.Intelligence]: 0,
  [CharacterAbilityName.Strength]: 0,
  [CharacterAbilityName.Wisdom]: 0,
} as const;

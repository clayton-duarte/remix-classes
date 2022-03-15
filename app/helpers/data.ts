export enum PowerSource {
  Arcane = "arcane",
  Divine = "divine",
  Martial = "martial",
  Primal = "primal",
  Psionic = "psionic",
}

export enum CharacterRole {
  Controller = "controller",
  Defender = "defender",
  Leader = "leader",
  Striker = "striker",
}

export enum Ability {
  Strength = "Strength",
  Constitution = "Constitution",
  Dexterity = "Dexterity",
  Intelligence = "Intelligence",
  Wisdom = "Wisdom",
  Charisma = "Charisma",
}

export interface CharacterClass {
  powerSource: PowerSource;
  mainRole: CharacterRole;
  keyAbilities: Ability[];
  name: string;
}

export const characterClasses: CharacterClass[] = [
  // Player's Handbook 1
  {
    name: "cleric",
    mainRole: CharacterRole.Leader,
    powerSource: PowerSource.Divine,
    keyAbilities: [Ability.Wisdom, Ability.Strength, Ability.Charisma],
  },
  {
    name: "fighter",
    mainRole: CharacterRole.Defender,
    powerSource: PowerSource.Martial,
    keyAbilities: [
      Ability.Strength,
      Ability.Dexterity,
      Ability.Constitution,
      Ability.Wisdom,
    ],
  },
  {
    name: "paladin",
    mainRole: CharacterRole.Defender,
    powerSource: PowerSource.Divine,
    keyAbilities: [Ability.Strength, Ability.Charisma, Ability.Wisdom],
  },
  {
    name: "ranger",
    mainRole: CharacterRole.Striker,
    powerSource: PowerSource.Martial,
    keyAbilities: [Ability.Strength, Ability.Dexterity, Ability.Wisdom],
  },
  {
    name: "rogue",
    mainRole: CharacterRole.Striker,
    powerSource: PowerSource.Martial,
    keyAbilities: [Ability.Dexterity, Ability.Strength, Ability.Charisma],
  },
  {
    name: "warlock",
    mainRole: CharacterRole.Striker,
    powerSource: PowerSource.Arcane,
    keyAbilities: [
      Ability.Charisma,
      Ability.Constitution,
      Ability.Intelligence,
    ],
  },
  {
    name: "warlord",
    mainRole: CharacterRole.Leader,
    powerSource: PowerSource.Martial,
    keyAbilities: [Ability.Strength, Ability.Intelligence, Ability.Charisma],
  },
  {
    name: "wizard",
    mainRole: CharacterRole.Controller,
    powerSource: PowerSource.Arcane,
    keyAbilities: [Ability.Intelligence, Ability.Wisdom, Ability.Dexterity],
  },
  // Player's Handbook 2
  {
    name: "avenger",
    mainRole: CharacterRole.Striker,
    powerSource: PowerSource.Divine,
    keyAbilities: [Ability.Wisdom, Ability.Dexterity, Ability.Intelligence],
  },
  {
    name: "barbarian",
    mainRole: CharacterRole.Striker,
    powerSource: PowerSource.Primal,
    keyAbilities: [Ability.Strength, Ability.Constitution, Ability.Charisma],
  },
  {
    name: "bard",
    mainRole: CharacterRole.Leader,
    powerSource: PowerSource.Arcane,
    keyAbilities: [
      Ability.Charisma,
      Ability.Intelligence,
      Ability.Constitution,
    ],
  },
  {
    name: "druid",
    mainRole: CharacterRole.Controller,
    powerSource: PowerSource.Primal,
    keyAbilities: [Ability.Wisdom, Ability.Dexterity, Ability.Constitution],
  },
  {
    name: "invoker",
    mainRole: CharacterRole.Controller,
    powerSource: PowerSource.Divine,
    keyAbilities: [Ability.Wisdom, Ability.Constitution, Ability.Intelligence],
  },
  {
    name: "shaman",
    mainRole: CharacterRole.Leader,
    powerSource: PowerSource.Primal,
    keyAbilities: [Ability.Wisdom, Ability.Constitution, Ability.Intelligence],
  },
  {
    name: "sorcerer",
    mainRole: CharacterRole.Striker,
    powerSource: PowerSource.Arcane,
    keyAbilities: [Ability.Charisma, Ability.Dexterity, Ability.Strength],
  },
  {
    name: "warden",
    mainRole: CharacterRole.Defender,
    powerSource: PowerSource.Primal,
    keyAbilities: [Ability.Strength, Ability.Constitution, Ability.Wisdom],
  },
  // Player's Handbook 3
  {
    name: "ardent",
    mainRole: CharacterRole.Leader,
    powerSource: PowerSource.Psionic,
    keyAbilities: [Ability.Charisma, Ability.Constitution, Ability.Wisdom],
  },
  {
    name: "battlemind",
    mainRole: CharacterRole.Defender,
    powerSource: PowerSource.Psionic,
    keyAbilities: [Ability.Constitution, Ability.Wisdom, Ability.Charisma],
  },
  {
    name: "monk",
    mainRole: CharacterRole.Striker,
    powerSource: PowerSource.Psionic,
    keyAbilities: [Ability.Dexterity, Ability.Strength, Ability.Wisdom],
  },
  {
    name: "psion",
    mainRole: CharacterRole.Controller,
    powerSource: PowerSource.Psionic,
    keyAbilities: [Ability.Intelligence, Ability.Charisma, Ability.Wisdom],
  },
  {
    name: "runepriest",
    mainRole: CharacterRole.Leader,
    powerSource: PowerSource.Divine,
    keyAbilities: [Ability.Strength, Ability.Constitution, Ability.Wisdom],
  },
  {
    name: "seeker",
    mainRole: CharacterRole.Controller,
    powerSource: PowerSource.Primal,
    keyAbilities: [Ability.Wisdom, Ability.Strength, Ability.Dexterity],
  },
];

export interface CharacterRace {
  name: string;
  abilityBonus: Ability[];
}

export const characterRaces: CharacterRace[] = [
  // Player's Handbook 1
  { name: "dragonborn", abilityBonus: [Ability.Charisma, Ability.Strength] },
  { name: "dwarf", abilityBonus: [Ability.Constitution, Ability.Wisdom] },
  { name: "eladrin", abilityBonus: [Ability.Dexterity, Ability.Intelligence] },
  { name: "elf", abilityBonus: [Ability.Dexterity, Ability.Wisdom] },
  { name: "half-elf", abilityBonus: [Ability.Constitution, Ability.Charisma] },
  { name: "halfling", abilityBonus: [Ability.Dexterity, Ability.Charisma] },
  {
    name: "human",
    abilityBonus: [
      Ability.Dexterity,
      Ability.Charisma,
      Ability.Constitution,
      Ability.Intelligence,
      Ability.Strength,
      Ability.Wisdom,
    ],
  },
  { name: "tiefling", abilityBonus: [Ability.Intelligence, Ability.Charisma] },
  // Player's Handbook 2
  { name: "deva", abilityBonus: [Ability.Intelligence, Ability.Wisdom] },
  { name: "gnome", abilityBonus: [Ability.Intelligence, Ability.Charisma] },
  { name: "goliath", abilityBonus: [Ability.Strength, Ability.Constitution] },
  { name: "half-orc", abilityBonus: [Ability.Strength, Ability.Dexterity] },
  {
    name: "shifter",
    abilityBonus: [Ability.Strength, Ability.Dexterity, Ability.Wisdom],
  },
  // Player's Handbook 3
  {
    name: "githzerai",
    abilityBonus: [Ability.Wisdom, Ability.Dexterity, Ability.Intelligence],
  },
  {
    name: "minotaur",
    abilityBonus: [Ability.Strength, Ability.Constitution, Ability.Wisdom],
  },
  {
    name: "shardmind",
    abilityBonus: [Ability.Intelligence, Ability.Wisdom, Ability.Charisma],
  },
  {
    name: "wilden",
    abilityBonus: [Ability.Wisdom, Ability.Constitution, Ability.Dexterity],
  },
];

export const characterRoles: CharacterRole[] = [
  ...new Set(characterClasses.map(({ mainRole }) => mainRole)),
];

export const powerSources: PowerSource[] = [
  ...new Set(characterClasses.map(({ powerSource }) => powerSource)),
];

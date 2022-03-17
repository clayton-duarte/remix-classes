export enum CharacterRole {
  Controller = "controller",
  Defender = "defender",
  Leader = "leader",
  Striker = "striker",
}

export enum CharacterPowerSource {
  Arcane = "arcane",
  Divine = "divine",
  Martial = "martial",
  Primal = "primal",
  Psionic = "psionic",
}

export enum CharacterAbility {
  Strength = "Strength",
  Constitution = "Constitution",
  Dexterity = "Dexterity",
  Intelligence = "Intelligence",
  Wisdom = "Wisdom",
  Charisma = "Charisma",
}

export enum CharacterClassName {
  Cleric = "Cleric",
  Fighter = "Fighter",
  Paladin = "Paladin",
  Ranger = "Ranger",
  Rogue = "Rogue",
  Warlock = "Warlock",
  Warlord = "Warlord",
  Wizard = "Wizard",
  Avenger = "Avenger",
  Barbarian = "Barbarian",
  Bard = "Bard",
  Druid = "Druid",
  Invoker = "Invoker",
  Shaman = "Shaman",
  Sorcerer = "Sorcerer",
  Warden = "Warden",
  Ardent = "Ardent",
  Battlemind = "Battlemind",
  Monk = "Monk",
  Psion = "Psion",
  Runepriest = "Runepriest",
  Seeker = "Seeker",
}

export const characterRoles: CharacterRole[] = Object.values(CharacterRole);

export const characterPowerSources: CharacterPowerSource[] =
  Object.values(CharacterPowerSource);

export const characterAbility: CharacterAbility[] =
  Object.values(CharacterAbility);

export const characterClasses: CharacterClassName[] =
  Object.values(CharacterClassName);

export interface CharacterClass {
  name: CharacterClassName;
  powerSource: CharacterPowerSource;
  mainRole: CharacterRole;
  keyAbilities: CharacterAbility[];
  flavorText: string;
  book: number;
  page: number;
}

export type CharacterClassGlossary = {
  [key in CharacterClassName]: CharacterClass;
};

export const characterClassesGlossary: CharacterClassGlossary = {
  [CharacterClassName.Cleric]: {
    book: 1,
    page: 60,
    name: CharacterClassName.Cleric,
    mainRole: CharacterRole.Leader,
    powerSource: CharacterPowerSource.Divine,
    flavorText: "“Have courage, my friends! Pelor favors us today!”",
    keyAbilities: [
      CharacterAbility.Wisdom,
      CharacterAbility.Strength,
      CharacterAbility.Charisma,
    ],
  },
  [CharacterClassName.Fighter]: {
    book: 1,
    page: 75,
    name: CharacterClassName.Fighter,
    mainRole: CharacterRole.Defender,
    powerSource: CharacterPowerSource.Martial,
    flavorText: "“You'll have to deal with me first, dragon!”",
    keyAbilities: [
      CharacterAbility.Strength,
      CharacterAbility.Dexterity,
      CharacterAbility.Constitution,
      CharacterAbility.Wisdom,
    ],
  },
  [CharacterClassName.Paladin]: {
    book: 1,
    page: 89,
    name: CharacterClassName.Paladin,
    mainRole: CharacterRole.Defender,
    powerSource: CharacterPowerSource.Divine,
    flavorText:
      "“I am the righteous shield of Moradin and a sword in his mighty hand! I fear no evil!”",
    keyAbilities: [
      CharacterAbility.Strength,
      CharacterAbility.Charisma,
      CharacterAbility.Wisdom,
    ],
  },
  [CharacterClassName.Ranger]: {
    book: 1,
    page: 103,
    name: CharacterClassName.Ranger,
    mainRole: CharacterRole.Striker,
    powerSource: CharacterPowerSource.Martial,
    flavorText:
      "“I'll get the one in the back. That's one hobgoblin who'll regret ever lifting a bow.”",
    keyAbilities: [
      CharacterAbility.Strength,
      CharacterAbility.Dexterity,
      CharacterAbility.Wisdom,
    ],
  },
  [CharacterClassName.Rogue]: {
    book: 1,
    page: 116,
    name: CharacterClassName.Rogue,
    mainRole: CharacterRole.Striker,
    powerSource: CharacterPowerSource.Martial,
    flavorText:
      "“You look surprised to see me. If you'd been paying attention, you might still be alive.”",
    keyAbilities: [
      CharacterAbility.Dexterity,
      CharacterAbility.Strength,
      CharacterAbility.Charisma,
    ],
  },
  [CharacterClassName.Warlock]: {
    book: 1,
    page: 129,
    name: CharacterClassName.Warlock,
    mainRole: CharacterRole.Striker,
    powerSource: CharacterPowerSource.Arcane,
    flavorText:
      "“The darkness holds no terror for me, demon! I curse you now under the Sign of Ill Omen!”",
    keyAbilities: [
      CharacterAbility.Charisma,
      CharacterAbility.Constitution,
      CharacterAbility.Intelligence,
    ],
  },
  [CharacterClassName.Warlord]: {
    book: 1,
    page: 143,
    name: CharacterClassName.Warlord,
    mainRole: CharacterRole.Leader,
    powerSource: CharacterPowerSource.Martial,
    flavorText: "“Onward to victory! They cannot stand before us!”",
    keyAbilities: [
      CharacterAbility.Strength,
      CharacterAbility.Intelligence,
      CharacterAbility.Charisma,
    ],
  },
  [CharacterClassName.Wizard]: {
    book: 1,
    page: 156,
    name: CharacterClassName.Wizard,
    mainRole: CharacterRole.Controller,
    powerSource: CharacterPowerSource.Arcane,
    flavorText:
      "“I am the fire that burns, the choking fog, the storm that rains devastation on our foes.”",
    keyAbilities: [
      CharacterAbility.Intelligence,
      CharacterAbility.Wisdom,
      CharacterAbility.Dexterity,
    ],
  },
  [CharacterClassName.Avenger]: {
    book: 2,
    page: 32,
    name: CharacterClassName.Avenger,
    mainRole: CharacterRole.Striker,
    powerSource: CharacterPowerSource.Divine,
    flavorText: "“You'll have to deal with me first, dragon!”",
    keyAbilities: [
      CharacterAbility.Wisdom,
      CharacterAbility.Dexterity,
      CharacterAbility.Intelligence,
    ],
  },
  [CharacterClassName.Barbarian]: {
    book: 2,
    page: 48,
    name: CharacterClassName.Barbarian,
    mainRole: CharacterRole.Striker,
    powerSource: CharacterPowerSource.Primal,
    flavorText: "“My strength is the fury of the wild.”",
    keyAbilities: [
      CharacterAbility.Strength,
      CharacterAbility.Constitution,
      CharacterAbility.Charisma,
    ],
  },
  [CharacterClassName.Bard]: {
    book: 2,
    page: 66,
    name: CharacterClassName.Bard,
    mainRole: CharacterRole.Leader,
    powerSource: CharacterPowerSource.Arcane,
    flavorText:
      "“The clash of blades, a note. A battle fought, a verse. The hero's war, a song.”",
    keyAbilities: [
      CharacterAbility.Charisma,
      CharacterAbility.Intelligence,
      CharacterAbility.Constitution,
    ],
  },
  [CharacterClassName.Druid]: {
    book: 2,
    page: 82,
    name: CharacterClassName.Druid,
    mainRole: CharacterRole.Controller,
    powerSource: CharacterPowerSource.Primal,
    flavorText: "“I am the seeker. I am the stalker. I am the storm.”",
    keyAbilities: [
      CharacterAbility.Wisdom,
      CharacterAbility.Dexterity,
      CharacterAbility.Constitution,
    ],
  },
  [CharacterClassName.Invoker]: {
    book: 2,
    page: 100,
    name: CharacterClassName.Invoker,
    mainRole: CharacterRole.Controller,
    powerSource: CharacterPowerSource.Divine,
    flavorText:
      "“The only thing stronger than my faith is the fire I use to burn away those who stand against the will of the gods.”",
    keyAbilities: [
      CharacterAbility.Wisdom,
      CharacterAbility.Constitution,
      CharacterAbility.Intelligence,
    ],
  },
  [CharacterClassName.Shaman]: {
    book: 2,
    page: 118,
    name: CharacterClassName.Shaman,
    mainRole: CharacterRole.Leader,
    powerSource: CharacterPowerSource.Primal,
    flavorText:
      "“The spirits surround us, guide us, and hold all the knowledge of the world.”",
    keyAbilities: [
      CharacterAbility.Wisdom,
      CharacterAbility.Constitution,
      CharacterAbility.Intelligence,
    ],
  },
  [CharacterClassName.Sorcerer]: {
    book: 2,
    page: 136,
    name: CharacterClassName.Sorcerer,
    mainRole: CharacterRole.Striker,
    powerSource: CharacterPowerSource.Arcane,
    flavorText: "“I am in the arcane, and the arcane is in me.”",
    keyAbilities: [
      CharacterAbility.Charisma,
      CharacterAbility.Dexterity,
      CharacterAbility.Strength,
    ],
  },
  [CharacterClassName.Warden]: {
    book: 2,
    page: 152,
    name: CharacterClassName.Warden,
    mainRole: CharacterRole.Defender,
    powerSource: CharacterPowerSource.Primal,
    flavorText:
      "“Get past me? You might as well try to push the mountains aside.”",
    keyAbilities: [
      CharacterAbility.Strength,
      CharacterAbility.Constitution,
      CharacterAbility.Wisdom,
    ],
  },
  [CharacterClassName.Ardent]: {
    book: 3,
    page: 22,
    name: CharacterClassName.Ardent,
    mainRole: CharacterRole.Leader,
    powerSource: CharacterPowerSource.Psionic,
    flavorText: "“The fate of the world rests on the fire of your passions”",
    keyAbilities: [
      CharacterAbility.Charisma,
      CharacterAbility.Constitution,
      CharacterAbility.Wisdom,
    ],
  },
  [CharacterClassName.Battlemind]: {
    book: 3,
    page: 42,
    name: CharacterClassName.Battlemind,
    mainRole: CharacterRole.Defender,
    powerSource: CharacterPowerSource.Psionic,
    flavorText:
      "“My mind is a far deadlier weapon than some ill-crafted bit of iron”",
    keyAbilities: [
      CharacterAbility.Constitution,
      CharacterAbility.Wisdom,
      CharacterAbility.Charisma,
    ],
  },
  [CharacterClassName.Monk]: {
    book: 3,
    page: 62,
    name: CharacterClassName.Monk,
    mainRole: CharacterRole.Striker,
    powerSource: CharacterPowerSource.Psionic,
    flavorText:
      "“You fight well, but without discipline and focus, you will fall.”",
    keyAbilities: [
      CharacterAbility.Dexterity,
      CharacterAbility.Strength,
      CharacterAbility.Wisdom,
    ],
  },
  [CharacterClassName.Psion]: {
    book: 3,
    page: 80,
    name: CharacterClassName.Psion,
    mainRole: CharacterRole.Controller,
    powerSource: CharacterPowerSource.Psionic,
    flavorText:
      "“I can bend the desire of the mortals and immortals to my will”",
    keyAbilities: [
      CharacterAbility.Intelligence,
      CharacterAbility.Charisma,
      CharacterAbility.Wisdom,
    ],
  },
  [CharacterClassName.Runepriest]: {
    book: 3,
    page: 98,
    name: CharacterClassName.Runepriest,
    mainRole: CharacterRole.Leader,
    powerSource: CharacterPowerSource.Divine,
    flavorText:
      "“The divine runes of might are stronger than any steel, more dangerous than any spell”",
    keyAbilities: [
      CharacterAbility.Strength,
      CharacterAbility.Constitution,
      CharacterAbility.Wisdom,
    ],
  },
  [CharacterClassName.Seeker]: {
    book: 3,
    page: 116,
    name: CharacterClassName.Seeker,
    mainRole: CharacterRole.Controller,
    powerSource: CharacterPowerSource.Primal,
    flavorText:
      "“I am the lightning strike, the earth's upheaval, the unruly sea. I am the bringer of your destruction.”",
    keyAbilities: [
      CharacterAbility.Wisdom,
      CharacterAbility.Strength,
      CharacterAbility.Dexterity,
    ],
  },
};

export interface CharacterRace {
  name: string;
  abilityBonus: CharacterAbility[];
}

export const characterRaces: CharacterRace[] = [
  // Player's Handbook 1
  {
    name: "dragonborn",
    abilityBonus: [CharacterAbility.Charisma, CharacterAbility.Strength],
  },
  {
    name: "dwarf",
    abilityBonus: [CharacterAbility.Constitution, CharacterAbility.Wisdom],
  },
  {
    name: "eladrin",
    abilityBonus: [CharacterAbility.Dexterity, CharacterAbility.Intelligence],
  },
  {
    name: "elf",
    abilityBonus: [CharacterAbility.Dexterity, CharacterAbility.Wisdom],
  },
  {
    name: "half-elf",
    abilityBonus: [CharacterAbility.Constitution, CharacterAbility.Charisma],
  },
  {
    name: "halfling",
    abilityBonus: [CharacterAbility.Dexterity, CharacterAbility.Charisma],
  },
  {
    name: "human",
    abilityBonus: [
      CharacterAbility.Dexterity,
      CharacterAbility.Charisma,
      CharacterAbility.Constitution,
      CharacterAbility.Intelligence,
      CharacterAbility.Strength,
      CharacterAbility.Wisdom,
    ],
  },
  {
    name: "tiefling",
    abilityBonus: [CharacterAbility.Intelligence, CharacterAbility.Charisma],
  },
  // Player's Handbook 2
  {
    name: "deva",
    abilityBonus: [CharacterAbility.Intelligence, CharacterAbility.Wisdom],
  },
  {
    name: "gnome",
    abilityBonus: [CharacterAbility.Intelligence, CharacterAbility.Charisma],
  },
  {
    name: "goliath",
    abilityBonus: [CharacterAbility.Strength, CharacterAbility.Constitution],
  },
  {
    name: "half-orc",
    abilityBonus: [CharacterAbility.Strength, CharacterAbility.Dexterity],
  },
  {
    name: "shifter",
    abilityBonus: [
      CharacterAbility.Strength,
      CharacterAbility.Dexterity,
      CharacterAbility.Wisdom,
    ],
  },
  // Player's Handbook 3
  {
    name: "githzerai",
    abilityBonus: [
      CharacterAbility.Wisdom,
      CharacterAbility.Dexterity,
      CharacterAbility.Intelligence,
    ],
  },
  {
    name: "minotaur",
    abilityBonus: [
      CharacterAbility.Strength,
      CharacterAbility.Constitution,
      CharacterAbility.Wisdom,
    ],
  },
  {
    name: "shardmind",
    abilityBonus: [
      CharacterAbility.Intelligence,
      CharacterAbility.Wisdom,
      CharacterAbility.Charisma,
    ],
  },
  {
    name: "wilden",
    abilityBonus: [
      CharacterAbility.Wisdom,
      CharacterAbility.Constitution,
      CharacterAbility.Dexterity,
    ],
  },
];

export type CharacterRolesGlossary = {
  [key in CharacterRole]: {
    description: string;
  };
};

export const characterRolesGlossary: CharacterRolesGlossary = {
  [CharacterRole.Controller]: {
    description:
      "Controllers deal with large numbers of enemies at the same time. They favor offense over defense, using powers that deal damage to multiple foes at once, as well as subtler powers that weaken, confuse, or delay their foes.",
  },
  [CharacterRole.Defender]: {
    description:
      "Defenders have the highest defenses in the game and good close-up offense. They are the party's front-line combatants; wherever they're standing, that's where the action is. Defenders have abilities and powers that make it difficult for enemies to move past them or to ignore them in battle.",
  },
  [CharacterRole.Leader]: {
    description:
      "Leaders inspire, heal, and aid the other characters in an adventuring group. Leaders have good defenses, but their strength lies in powers that protect their companions and target specific foes for the party to concentrate on.",
  },
  [CharacterRole.Striker]: {
    description:
      "Strikers specialize in dealing high amounts of damage to a single target at a time. They have the most concentrated offense of any character in the game. Strikers rely on superior mobility, trickery, or magic to move around tough foes and single out the enemy they want to attack.",
  },
};

export type CharacterPowerSourceGlossary = {
  [key in CharacterPowerSource]: {
    description: string;
  };
};

export const characterPowerSourceGlossary: CharacterPowerSourceGlossary = {
  [CharacterPowerSource.Arcane]: {
    description:
      "You draw your power from a supernatural source from another world, a powerful entity or some occult knowledge. Your powers are called Spells",
  },
  [CharacterPowerSource.Divine]: {
    description:
      "You draw your power from a deity by channeling it through faith to protect its philosophy. Your powers are called Prayers",
  },
  [CharacterPowerSource.Martial]: {
    description:
      "You draw your power from your own training, determination, physical toughness, and natural proficiency. Your powers are called Exploits",
  },
  [CharacterPowerSource.Primal]: {
    description:
      "You draw your power from your connection to the natural world, to all living beings around and to its spirits. Your powers are called Evocations",
  },
  [CharacterPowerSource.Psionic]: {
    description:
      "You draw your power from your connection to your mind, meditation, and your focus to manifest it on the physical world. Your powers are called Disciplines",
  },
};

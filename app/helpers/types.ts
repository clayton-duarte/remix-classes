export enum CharacterRole {
  Controller = "controller",
  Defender = "defender",
  Leader = "leader",
  Striker = "striker",
}

export enum PowerSource {
  Arcane = "arcane",
  Divine = "divine",
  Martial = "martial",
  Primal = "primal",
  Psionic = "psionic",
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
  flavorText: string;
  name: string;
  book: number;
  page: number;
}

export const characterClasses: CharacterClass[] = [
  // Player's Handbook 1
  {
    book: 1,
    page: 60,
    name: "cleric",
    mainRole: CharacterRole.Leader,
    powerSource: PowerSource.Divine,
    flavorText: "“Have courage, my friends! Pelor favors us today!”",
    keyAbilities: [Ability.Wisdom, Ability.Strength, Ability.Charisma],
  },
  {
    book: 1,
    page: 75,
    name: "fighter",
    mainRole: CharacterRole.Defender,
    powerSource: PowerSource.Martial,
    flavorText: "“You’ll have to deal with me first, dragon!”",
    keyAbilities: [
      Ability.Strength,
      Ability.Dexterity,
      Ability.Constitution,
      Ability.Wisdom,
    ],
  },
  {
    book: 1,
    page: 89,
    name: "paladin",
    mainRole: CharacterRole.Defender,
    powerSource: PowerSource.Divine,
    flavorText:
      "“I am the righteous shield of Moradin and a sword in his mighty hand! I fear no evil!”",
    keyAbilities: [Ability.Strength, Ability.Charisma, Ability.Wisdom],
  },
  {
    book: 1,
    page: 103,
    name: "ranger",
    mainRole: CharacterRole.Striker,
    powerSource: PowerSource.Martial,
    flavorText:
      "“I’ll get the one in the back. That’s one hobgoblin who’ll regret ever lifting a bow.”",
    keyAbilities: [Ability.Strength, Ability.Dexterity, Ability.Wisdom],
  },
  {
    book: 1,
    page: 116,
    name: "rogue",
    mainRole: CharacterRole.Striker,
    powerSource: PowerSource.Martial,
    flavorText:
      "“You look surprised to see me. If you’d been paying attention, you might still be alive.”",
    keyAbilities: [Ability.Dexterity, Ability.Strength, Ability.Charisma],
  },
  {
    book: 1,
    page: 129,
    name: "warlock",
    mainRole: CharacterRole.Striker,
    powerSource: PowerSource.Arcane,
    flavorText:
      "“The darkness holds no terror for me, demon! I curse you now under the Sign of Ill Omen!”",
    keyAbilities: [
      Ability.Charisma,
      Ability.Constitution,
      Ability.Intelligence,
    ],
  },
  {
    book: 1,
    page: 143,
    name: "warlord",
    mainRole: CharacterRole.Leader,
    powerSource: PowerSource.Martial,
    flavorText: "“Onward to victory! They cannot stand before us!”",
    keyAbilities: [Ability.Strength, Ability.Intelligence, Ability.Charisma],
  },
  {
    book: 1,
    page: 156,
    name: "wizard",
    mainRole: CharacterRole.Controller,
    powerSource: PowerSource.Arcane,
    flavorText:
      "“I am the fire that burns, the choking fog, the storm that rains devastation on our foes.”",
    keyAbilities: [Ability.Intelligence, Ability.Wisdom, Ability.Dexterity],
  },
  {
    book: 2,
    page: 32,
    name: "avenger",
    mainRole: CharacterRole.Striker,
    powerSource: PowerSource.Divine,
    flavorText: "“You’ll have to deal with me first, dragon!”",
    keyAbilities: [Ability.Wisdom, Ability.Dexterity, Ability.Intelligence],
  },
  {
    book: 2,
    page: 48,
    name: "barbarian",
    mainRole: CharacterRole.Striker,
    powerSource: PowerSource.Primal,
    flavorText: "“My strength is the fury of the wild.”",
    keyAbilities: [Ability.Strength, Ability.Constitution, Ability.Charisma],
  },
  {
    book: 2,
    page: 66,
    name: "bard",
    mainRole: CharacterRole.Leader,
    powerSource: PowerSource.Arcane,
    flavorText:
      "“The clash of blades, a note. A battle fought, a verse. The hero’s war, a song.”",
    keyAbilities: [
      Ability.Charisma,
      Ability.Intelligence,
      Ability.Constitution,
    ],
  },
  {
    book: 2,
    page: 82,
    name: "druid",
    mainRole: CharacterRole.Controller,
    powerSource: PowerSource.Primal,
    flavorText: "“I am the seeker. I am the stalker. I am the storm.”",
    keyAbilities: [Ability.Wisdom, Ability.Dexterity, Ability.Constitution],
  },
  {
    book: 2,
    page: 100,
    name: "invoker",
    mainRole: CharacterRole.Controller,
    powerSource: PowerSource.Divine,
    flavorText:
      "“The only thing stronger than my faith is the fire I use to burn away those who stand against the will of the gods.”",
    keyAbilities: [Ability.Wisdom, Ability.Constitution, Ability.Intelligence],
  },
  {
    book: 2,
    page: 118,
    name: "shaman",
    mainRole: CharacterRole.Leader,
    powerSource: PowerSource.Primal,
    flavorText:
      "“The spirits surround us, guide us, and hold all the knowledge of the world.”",
    keyAbilities: [Ability.Wisdom, Ability.Constitution, Ability.Intelligence],
  },
  {
    book: 2,
    page: 136,
    name: "sorcerer",
    mainRole: CharacterRole.Striker,
    powerSource: PowerSource.Arcane,
    flavorText: "“I am in the arcane, and the arcane is in me.”",
    keyAbilities: [Ability.Charisma, Ability.Dexterity, Ability.Strength],
  },
  {
    book: 2,
    page: 152,
    name: "warden",
    mainRole: CharacterRole.Defender,
    powerSource: PowerSource.Primal,
    flavorText:
      "“Get past me? You might as well try to push the mountains aside.”",
    keyAbilities: [Ability.Strength, Ability.Constitution, Ability.Wisdom],
  },
  {
    book: 3,
    page: 22,
    name: "ardent",
    mainRole: CharacterRole.Leader,
    powerSource: PowerSource.Psionic,
    flavorText: "“The fate of the world rests on the fire of your passions”",
    keyAbilities: [Ability.Charisma, Ability.Constitution, Ability.Wisdom],
  },
  {
    book: 3,
    page: 42,
    name: "battlemind",
    mainRole: CharacterRole.Defender,
    powerSource: PowerSource.Psionic,
    flavorText:
      "“My mind is a far deadlier weapon than some ill-crafted bit of iron”",
    keyAbilities: [Ability.Constitution, Ability.Wisdom, Ability.Charisma],
  },
  {
    book: 3,
    page: 62,
    name: "monk",
    mainRole: CharacterRole.Striker,
    powerSource: PowerSource.Psionic,
    flavorText:
      "“You fight well, but without discipline and focus, you will fall.”",
    keyAbilities: [Ability.Dexterity, Ability.Strength, Ability.Wisdom],
  },
  {
    book: 3,
    page: 80,
    name: "psion",
    mainRole: CharacterRole.Controller,
    powerSource: PowerSource.Psionic,
    flavorText:
      "“I can bend the desire of the mortals and immortals to my will”",
    keyAbilities: [Ability.Intelligence, Ability.Charisma, Ability.Wisdom],
  },
  {
    book: 3,
    page: 98,
    name: "runepriest",
    mainRole: CharacterRole.Leader,
    powerSource: PowerSource.Divine,
    flavorText:
      "“The divine runes of might are stronger than any steel, more dangerous than any spell”",
    keyAbilities: [Ability.Strength, Ability.Constitution, Ability.Wisdom],
  },
  {
    book: 3,
    page: 116,
    name: "seeker",
    mainRole: CharacterRole.Controller,
    powerSource: PowerSource.Primal,
    flavorText:
      "“I am the lightning strike, the earth's upheaval, the unruly sea. I am the bringer of your destruction.”",
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

export type Glossary = {
  description: string;
};

export type CharacterRolesGlossary = {
  [key in CharacterRole]: Glossary;
};

export const characterRolesGlossary: CharacterRolesGlossary = {
  [CharacterRole.Controller]: {
    description:
      "Controllers deal with large numbers of enemies at the same time. They favor offense over defense, using powers that deal damage to multiple foes at once, as well as subtler powers that weaken, confuse, or delay their foes.",
  },
  [CharacterRole.Defender]: {
    description:
      "Defenders have the highest defenses in the game and good close-up offense. They are the party’s front-line combatants; wherever they’re standing, that’s where the action is. Defenders have abilities and powers that make it difficult for enemies to move past them or to ignore them in battle.",
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
  [key in PowerSource]: Glossary;
};

export const characterPowerSourceGlossary: CharacterPowerSourceGlossary = {
  [PowerSource.Arcane]: {
    description:
      "You draw your power from a supernatural source from another world, a powerful entity or some occult knowledge. Your powers are called Spells",
  },
  [PowerSource.Divine]: {
    description:
      "You draw your power from a deity by channeling it through faith to protect its philosophy. Your powers are called Prayers",
  },
  [PowerSource.Martial]: {
    description:
      "You draw your power from your own training, determination, physical toughness, and natural proficiency. Your powers are called Exploits",
  },
  [PowerSource.Primal]: {
    description:
      "You draw your power from your connection to the natural world, to all living beings around and to its spirits. Your powers are called Evocations",
  },
  [PowerSource.Psionic]: {
    description:
      "You draw your power from your connection to your mind, meditation, and your focus to manifest it on the physical world. Your powers are called Disciplines",
  },
};

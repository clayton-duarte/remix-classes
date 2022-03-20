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
  Strength = "strength",
  Constitution = "constitution",
  Dexterity = "dexterity",
  Intelligence = "intelligence",
  Wisdom = "wisdom",
  Charisma = "charisma",
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
      "This source of powers is drawn from a supernatural source from another world, a powerful entity or some occult knowledge. Arcane powers are called Spells.",
  },
  [CharacterPowerSource.Divine]: {
    description:
      "This source of powers is drawn from a deity, channeling it through faith to protect a god's philosophy. Divine powers are called Prayers.",
  },
  [CharacterPowerSource.Martial]: {
    description:
      "This source of powers is drawn from training, determination, physical toughness, and natural proficiency. Martial powers are called Exploits.",
  },
  [CharacterPowerSource.Primal]: {
    description:
      "This source of powers is drawn from the connection to the natural world, to all living beings around and to its spirits. Primal powers are called Evocations.",
  },
  [CharacterPowerSource.Psionic]: {
    description:
      "This source of powers is drawn from a strong connection to ones mind, meditation, and focus to manifest it on the physical world. Psionic powers are called Disciplines.",
  },
};

export interface CharacterClass {
  name: CharacterClassName;
  powerSource: CharacterPowerSource;
  mainRole: CharacterRole;
  keyAbilities: CharacterAbility[];
  flavorText: string;
  book: string;
  page: number;
}

export type CharacterClassGlossary = {
  [key in CharacterClassName]: CharacterClass;
};

export const characterClassesGlossary: CharacterClassGlossary = {
  [CharacterClassName.Cleric]: {
    book: "Player's Handbook 1",
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
    book: "Player's Handbook 1",
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
    book: "Player's Handbook 1",
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
    book: "Player's Handbook 1",
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
    book: "Player's Handbook 1",
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
    book: "Player's Handbook 1",
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
    book: "Player's Handbook 1",
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
    book: "Player's Handbook 1",
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
    book: "Player's Handbook 2",
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
    book: "Player's Handbook 2",
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
    book: "Player's Handbook 2",
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
    book: "Player's Handbook 2",
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
    book: "Player's Handbook 2",
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
    book: "Player's Handbook 2",
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
    book: "Player's Handbook 2",
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
    book: "Player's Handbook 2",
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
    book: "Player's Handbook 3",
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
    book: "Player's Handbook 3",
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
    book: "Player's Handbook 3",
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
    book: "Player's Handbook 3",
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
    book: "Player's Handbook 3",
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
    book: "Player's Handbook 3",
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
  [CharacterClassName.SwordMage]: {
    book: "Forgotten Realms Player's Guide",
    page: 24,
    name: CharacterClassName.SwordMage,
    mainRole: CharacterRole.Defender,
    powerSource: CharacterPowerSource.Arcane,
    flavorText:
      "“Under the leaves of Myth Drannor I learned the ancient eladrin way of battle. Spells are my armor, and words of ruin are bound to my blade”",
    keyAbilities: [
      CharacterAbility.Intelligence,
      CharacterAbility.Strength,
      CharacterAbility.Constitution,
    ],
  },
};

export interface CharacterRace {
  name: CharacterRaceName;
  abilityBonus: CharacterAbility[];
  description: string;
  book: string;
  page: number;
}

export type CharacterRacesGlossary = {
  [key in CharacterRaceName]: CharacterRace;
};

export const characterRacesGlossary: CharacterRacesGlossary = {
  [CharacterRaceName.Dragonborn]: {
    book: "Player's Handbook 1",
    page: 34,
    description:
      "Proud, honorable warriors, born from the blood of an ancient dragon god.",
    name: CharacterRaceName.Dragonborn,
    abilityBonus: [CharacterAbility.Charisma, CharacterAbility.Strength],
  },
  [CharacterRaceName.Dwarf]: {
    book: "Player's Handbook 1",
    page: 36,
    description:
      "Masters of stone and iron, dauntless and unyielding in the face of adversity.",
    name: CharacterRaceName.Dwarf,
    abilityBonus: [CharacterAbility.Constitution, CharacterAbility.Wisdom],
  },
  [CharacterRaceName.Eladrin]: {
    book: "Player's Handbook 1",
    page: 38,
    description:
      "Graceful warriors and wizards at home in the eldritch twilight of the Feywild.",
    name: CharacterRaceName.Eladrin,
    abilityBonus: [CharacterAbility.Dexterity, CharacterAbility.Intelligence],
  },
  [CharacterRaceName.Elf]: {
    book: "Player's Handbook 1",
    page: 40,
    description: "Quick, wary archers who freely roam the forests and wilds.",
    name: CharacterRaceName.Elf,
    abilityBonus: [CharacterAbility.Dexterity, CharacterAbility.Wisdom],
  },
  [CharacterRaceName.HalfElf]: {
    book: "Player's Handbook 1",
    page: 42,
    description:
      "Born heroes and leaders who combine the best features of humans and elves.",
    name: CharacterRaceName.HalfElf,
    abilityBonus: [CharacterAbility.Constitution, CharacterAbility.Charisma],
  },
  [CharacterRaceName.Halfling]: {
    book: "Player's Handbook 1",
    page: 44,
    description:
      "Quick and resourceful wanderers, small in stature but great in courage.",
    name: CharacterRaceName.Halfling,
    abilityBonus: [CharacterAbility.Dexterity, CharacterAbility.Charisma],
  },
  [CharacterRaceName.Human]: {
    book: "Player's Handbook 1",
    page: 46,
    description:
      "Ambitious, driven, pragmatic. A race of heroes, and also a race of villains.",
    name: CharacterRaceName.Human,
    abilityBonus: [
      CharacterAbility.Dexterity,
      CharacterAbility.Charisma,
      CharacterAbility.Constitution,
      CharacterAbility.Intelligence,
      CharacterAbility.Strength,
      CharacterAbility.Wisdom,
    ],
  },
  [CharacterRaceName.Tiefling]: {
    book: "Player's Handbook 1",
    page: 48,
    description:
      "Heirs of a shattered empire who live in the shadows and do not fear the dark.",
    name: CharacterRaceName.Tiefling,
    abilityBonus: [CharacterAbility.Intelligence, CharacterAbility.Charisma],
  },
  [CharacterRaceName.Deva]: {
    book: "Player's Handbook 2",
    page: 8,
    description:
      "Immortal spirits who embody virtue, born and reborn to mortal life in the world.",
    name: CharacterRaceName.Deva,
    abilityBonus: [CharacterAbility.Intelligence, CharacterAbility.Wisdom],
  },
  [CharacterRaceName.Gnome]: {
    book: "Player's Handbook 2",
    page: 10,
    description:
      "Slight, sly tricksters of the Feywild who excel at avoiding notice.",
    name: CharacterRaceName.Gnome,
    abilityBonus: [CharacterAbility.Intelligence, CharacterAbility.Charisma],
  },
  [CharacterRaceName.Goliath]: {
    book: "Player's Handbook 2",
    page: 12,
    description:
      "Tribal nomads of the mountains, strong as the rock and proud as the peak.",
    name: CharacterRaceName.Goliath,
    abilityBonus: [CharacterAbility.Strength, CharacterAbility.Constitution],
  },
  [CharacterRaceName.HalfOrc]: {
    book: "Player's Handbook 2",
    page: 14,
    description: "Fierce warriors who combine human resolve with orc savagery.",
    name: CharacterRaceName.HalfOrc,
    abilityBonus: [CharacterAbility.Strength, CharacterAbility.Dexterity],
  },
  [CharacterRaceName.Shifter]: {
    book: "Player's Handbook 2",
    page: 16,
    description:
      "Ferocious heirs of the wild, the perfect fusion of civilized race and wild beast.",
    name: CharacterRaceName.Shifter,
    abilityBonus: [
      CharacterAbility.Strength,
      CharacterAbility.Dexterity,
      CharacterAbility.Wisdom,
    ],
  },
  [CharacterRaceName.Githzerai]: {
    book: "Player's Handbook 3",
    page: 8,
    description: "Ascetic and disciplined, masters of body and mind.",
    name: CharacterRaceName.Githzerai,
    abilityBonus: [
      CharacterAbility.Wisdom,
      CharacterAbility.Dexterity,
      CharacterAbility.Intelligence,
    ],
  },
  [CharacterRaceName.Minotaur]: {
    book: "Player's Handbook 3",
    page: 10,
    description:
      "Caught between savagery and civilization, these warriors struggle against the beast within.",
    name: CharacterRaceName.Minotaur,
    abilityBonus: [
      CharacterAbility.Strength,
      CharacterAbility.Constitution,
      CharacterAbility.Wisdom,
    ],
  },
  [CharacterRaceName.Shardmind]: {
    book: "Player's Handbook 3",
    page: 12,
    description:
      "Raw psionic energy barely contained in a body of gleaming crystalline shards.",
    name: CharacterRaceName.Shardmind,
    abilityBonus: [
      CharacterAbility.Intelligence,
      CharacterAbility.Wisdom,
      CharacterAbility.Charisma,
    ],
  },
  [CharacterRaceName.Wilden]: {
    book: "Player's Handbook 3",
    page: 14,
    description:
      "Nature's guardians-hunters and destroyers - keepers of ancient knowledge.",
    name: CharacterRaceName.Wilden,
    abilityBonus: [
      CharacterAbility.Wisdom,
      CharacterAbility.Constitution,
      CharacterAbility.Dexterity,
    ],
  },
  [CharacterRaceName.Drow]: {
    book: "Forgotten Realms Player's Guide",
    page: 8,
    description: "Graceful and deadly, at home in the depths of darkness.",
    name: CharacterRaceName.Drow,
    abilityBonus: [CharacterAbility.Dexterity, CharacterAbility.Charisma],
  },
  [CharacterRaceName.Genasi]: {
    book: "Forgotten Realms Player's Guide",
    page: 110,
    description:
      "Energy embodied, chaos and order united - a race of inherent flexibility, passion and diversity.",
    name: CharacterRaceName.Genasi,
    abilityBonus: [CharacterAbility.Strength, CharacterAbility.Intelligence],
  },
};

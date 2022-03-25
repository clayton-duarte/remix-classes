export enum CharacterRoleName {
  Controller = "controller",
  Defender = "defender",
  Leader = "leader",
  Striker = "striker",
}

export type CharacterRolesGlossary = {
  [key in CharacterRoleName]: {
    description: string;
    name: key;
  };
};

export type CharacterRole = CharacterRolesGlossary[CharacterRoleName];

export const characterRolesGlossary: CharacterRolesGlossary = {
  [CharacterRoleName.Controller]: {
    name: CharacterRoleName.Controller,
    description:
      "Controllers deal with large numbers of enemies at the same time. They favor offense over defense, using powers that deal damage to multiple foes at once, as well as subtler powers that weaken, confuse, or delay their foes.",
  },
  [CharacterRoleName.Defender]: {
    name: CharacterRoleName.Defender,
    description:
      "Defenders have the highest defenses in the game and good close-up offense. They are the party's front-line combatants; wherever they're standing, that's where the action is. Defenders have abilities and powers that make it difficult for enemies to move past them or to ignore them in battle.",
  },
  [CharacterRoleName.Leader]: {
    name: CharacterRoleName.Leader,
    description:
      "Leaders inspire, heal, and aid the other characters in an adventuring group. Leaders have good defenses, but their strength lies in powers that protect their companions and target specific foes for the party to concentrate on.",
  },
  [CharacterRoleName.Striker]: {
    name: CharacterRoleName.Striker,
    description:
      "Strikers specialize in dealing high amounts of damage to a single target at a time. They have the most concentrated offense of any character in the game. Strikers rely on superior mobility, trickery, or magic to move around tough foes and single out the enemy they want to attack.",
  },
};

export enum PowerSourceName {
  Arcane = "arcane",
  Divine = "divine",
  Martial = "martial",
  Primal = "primal",
  Psionic = "psionic",
}

export type CharacterPowerSourceGlossary = {
  [key in PowerSourceName]: {
    description: string;
  };
};

export const characterPowerSourceGlossary: CharacterPowerSourceGlossary = {
  [PowerSourceName.Arcane]: {
    description:
      "This source of powers is drawn from a supernatural source from another world, a powerful entity or some occult knowledge. Arcane powers are called Spells.",
  },
  [PowerSourceName.Divine]: {
    description:
      "This source of powers is drawn from a deity, channeling it through faith to protect a god's philosophy. Divine powers are called Prayers.",
  },
  [PowerSourceName.Martial]: {
    description:
      "This source of powers is drawn from training, determination, physical toughness, and natural proficiency. Martial powers are called Exploits.",
  },
  [PowerSourceName.Primal]: {
    description:
      "This source of powers is drawn from the connection to the natural world, to all living beings around and to its spirits. Primal powers are called Evocations.",
  },
  [PowerSourceName.Psionic]: {
    description:
      "This source of powers is drawn from a strong connection to ones mind, meditation, and focus to manifest it on the physical world. Psionic powers are called Disciplines.",
  },
};

export enum CharacterAbility {
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

export type SkillGlossary = {
  [key in SkillName]: {
    name: key;
    keyAbility: CharacterAbility;
  };
};

export type Skill = SkillGlossary[SkillName];

export const skillGlossary: SkillGlossary = {
  [SkillName.Acrobatics]: {
    name: SkillName.Acrobatics,
    keyAbility: CharacterAbility.Dexterity,
  },
  [SkillName.Arcana]: {
    name: SkillName.Arcana,
    keyAbility: CharacterAbility.Intelligence,
  },
  [SkillName.Athletics]: {
    name: SkillName.Athletics,
    keyAbility: CharacterAbility.Strength,
  },
  [SkillName.Bluff]: {
    name: SkillName.Bluff,
    keyAbility: CharacterAbility.Charisma,
  },
  [SkillName.Diplomacy]: {
    name: SkillName.Diplomacy,
    keyAbility: CharacterAbility.Charisma,
  },
  [SkillName.Dungeoneering]: {
    name: SkillName.Dungeoneering,
    keyAbility: CharacterAbility.Dexterity,
  },
  [SkillName.Endurance]: {
    name: SkillName.Endurance,
    keyAbility: CharacterAbility.Constitution,
  },
  [SkillName.Heal]: {
    name: SkillName.Heal,
    keyAbility: CharacterAbility.Wisdom,
  },
  [SkillName.History]: {
    name: SkillName.History,
    keyAbility: CharacterAbility.Intelligence,
  },
  [SkillName.Insight]: {
    name: SkillName.Insight,
    keyAbility: CharacterAbility.Wisdom,
  },
  [SkillName.Intimidate]: {
    name: SkillName.Intimidate,
    keyAbility: CharacterAbility.Charisma,
  },
  [SkillName.Nature]: {
    name: SkillName.Nature,
    keyAbility: CharacterAbility.Wisdom,
  },
  [SkillName.Perception]: {
    name: SkillName.Perception,
    keyAbility: CharacterAbility.Wisdom,
  },
  [SkillName.Religion]: {
    name: SkillName.Religion,
    keyAbility: CharacterAbility.Intelligence,
  },
  [SkillName.Stealth]: {
    name: SkillName.Stealth,
    keyAbility: CharacterAbility.Dexterity,
  },
  [SkillName.Streetwise]: {
    name: SkillName.Streetwise,
    keyAbility: CharacterAbility.Charisma,
  },
  [SkillName.Thievery]: {
    name: SkillName.Thievery,
    keyAbility: CharacterAbility.Dexterity,
  },
};

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

export type CharacterClassGlossary = {
  [key in CharacterClassName]: {
    name: key;
    powerSource: PowerSourceName;
    mainRole: CharacterRoleName;
    keyAbilities: CharacterAbility[];
    skillChoices: number;
    trainedSkills: SkillName[];
    skillList: SkillName[];
    flavorText: string;
    book: string;
    page: number;
  };
};

export type CharacterClass = CharacterClassGlossary[CharacterClassName];

export const characterClassesGlossary: CharacterClassGlossary = {
  [CharacterClassName.Cleric]: {
    book: "Player's Handbook 1",
    page: 60,
    name: CharacterClassName.Cleric,
    mainRole: CharacterRoleName.Leader,
    powerSource: PowerSourceName.Divine,
    flavorText: "“Have courage, my friends! Pelor favors us today!”",
    skillChoices: 4,
    trainedSkills: [SkillName.Religion],
    skillList: [
      SkillName.Arcana,
      SkillName.Diplomacy,
      SkillName.Heal,
      SkillName.History,
      SkillName.Insight,
      SkillName.Religion,
    ],
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
    mainRole: CharacterRoleName.Defender,
    powerSource: PowerSourceName.Martial,
    flavorText: "“You'll have to deal with me first, dragon!”",
    skillChoices: 3,
    trainedSkills: [],
    skillList: [
      SkillName.Athletics,
      SkillName.Endurance,
      SkillName.Heal,
      SkillName.Intimidate,
      SkillName.Streetwise,
    ],
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
    mainRole: CharacterRoleName.Defender,
    powerSource: PowerSourceName.Divine,
    flavorText:
      "“I am the righteous shield of Moradin and a sword in his mighty hand! I fear no evil!”",
    skillChoices: 4,
    trainedSkills: [SkillName.Religion],
    skillList: [
      SkillName.Diplomacy,
      SkillName.Endurance,
      SkillName.Heal,
      SkillName.History,
      SkillName.Insight,
      SkillName.Intimidate,
      SkillName.Religion,
    ],
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
    mainRole: CharacterRoleName.Striker,
    powerSource: PowerSourceName.Martial,
    flavorText:
      "“I'll get the one in the back. That's one hobgoblin who'll regret ever lifting a bow.”",
    skillChoices: 5,
    trainedSkills: [SkillName.Dungeoneering, SkillName.Nature],
    skillList: [
      SkillName.Acrobatics,
      SkillName.Athletics,
      SkillName.Dungeoneering,
      SkillName.Endurance,
      SkillName.Heal,
      SkillName.Nature,
      SkillName.Perception,
    ],
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
    mainRole: CharacterRoleName.Striker,
    powerSource: PowerSourceName.Martial,
    flavorText:
      "“You look surprised to see me. If you'd been paying attention, you might still be alive.”",
    skillChoices: 6,
    trainedSkills: [SkillName.Stealth, SkillName.Thievery],
    skillList: [
      SkillName.Acrobatics,
      SkillName.Athletics,
      SkillName.Bluff,
      SkillName.Dungeoneering,
      SkillName.Insight,
      SkillName.Intimidate,
      SkillName.Perception,
      SkillName.Stealth,
      SkillName.Streetwise,
      SkillName.Thievery,
    ],
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
    mainRole: CharacterRoleName.Striker,
    powerSource: PowerSourceName.Arcane,
    flavorText:
      "“The darkness holds no terror for me, demon! I curse you now under the Sign of Ill Omen!”",
    skillChoices: 4,
    trainedSkills: [],
    skillList: [
      SkillName.Arcana,
      SkillName.Bluff,
      SkillName.History,
      SkillName.Insight,
      SkillName.Intimidate,
      SkillName.Religion,
      SkillName.Streetwise,
      SkillName.Thievery,
    ],
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
    mainRole: CharacterRoleName.Leader,
    powerSource: PowerSourceName.Martial,
    flavorText: "“Onward to victory! They cannot stand before us!”",
    skillChoices: 4,
    trainedSkills: [],
    skillList: [
      SkillName.Athletics,
      SkillName.Diplomacy,
      SkillName.Endurance,
      SkillName.Heal,
      SkillName.History,
      SkillName.Intimidate,
    ],
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
    mainRole: CharacterRoleName.Controller,
    powerSource: PowerSourceName.Arcane,
    flavorText:
      "“I am the fire that burns, the choking fog, the storm that rains devastation on our foes.”",
    skillChoices: 4,
    trainedSkills: [SkillName.Arcana],
    skillList: [
      SkillName.Arcana,
      SkillName.Diplomacy,
      SkillName.Dungeoneering,
      SkillName.History,
      SkillName.Insight,
      SkillName.Nature,
      SkillName.Religion,
    ],
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
    mainRole: CharacterRoleName.Striker,
    powerSource: PowerSourceName.Divine,
    flavorText: "“You'll have to deal with me first, dragon!”",
    skillChoices: 4,
    trainedSkills: [SkillName.Religion],
    skillList: [
      SkillName.Acrobatics,
      SkillName.Athletics,
      SkillName.Endurance,
      SkillName.Heal,
      SkillName.Intimidate,
      SkillName.Perception,
      SkillName.Religion,
      SkillName.Stealth,
      SkillName.Streetwise,
    ],
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
    mainRole: CharacterRoleName.Striker,
    powerSource: PowerSourceName.Primal,
    flavorText: "“My strength is the fury of the wild.”",
    skillChoices: 3,
    trainedSkills: [],
    skillList: [
      SkillName.Acrobatics,
      SkillName.Athletics,
      SkillName.Endurance,
      SkillName.Heal,
      SkillName.Intimidate,
      SkillName.Nature,
      SkillName.Perception,
    ],
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
    mainRole: CharacterRoleName.Leader,
    powerSource: PowerSourceName.Arcane,
    flavorText:
      "“The clash of blades, a note. A battle fought, a verse. The hero's war, a song.”",
    skillChoices: 5,
    trainedSkills: [SkillName.Arcana],
    skillList: [
      SkillName.Acrobatics,
      SkillName.Arcana,
      SkillName.Athletics,
      SkillName.Bluff,
      SkillName.Diplomacy,
      SkillName.Dungeoneering,
      SkillName.Heal,
      SkillName.History,
      SkillName.Insight,
      SkillName.Intimidate,
      SkillName.Nature,
      SkillName.Perception,
      SkillName.Religion,
      SkillName.Streetwise,
    ],
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
    mainRole: CharacterRoleName.Controller,
    powerSource: PowerSourceName.Primal,
    flavorText: "“I am the seeker. I am the stalker. I am the storm.”",
    skillChoices: 4,
    trainedSkills: [SkillName.Nature],
    skillList: [
      SkillName.Arcana,
      SkillName.Athletics,
      SkillName.Diplomacy,
      SkillName.Endurance,
      SkillName.Heal,
      SkillName.History,
      SkillName.Insight,
      SkillName.Nature,
      SkillName.Perception,
    ],
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
    mainRole: CharacterRoleName.Controller,
    powerSource: PowerSourceName.Divine,
    flavorText:
      "“The only thing stronger than my faith is the fire I use to burn away those who stand against the will of the gods.”",
    skillChoices: 4,
    trainedSkills: [SkillName.Religion],
    skillList: [
      SkillName.Arcana,
      SkillName.Diplomacy,
      SkillName.Endurance,
      SkillName.History,
      SkillName.Insight,
      SkillName.Intimidate,
      SkillName.Religion,
    ],
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
    mainRole: CharacterRoleName.Leader,
    powerSource: PowerSourceName.Primal,
    flavorText:
      "“The spirits surround us, guide us, and hold all the knowledge of the world.”",
    skillChoices: 4,
    trainedSkills: [SkillName.Nature],
    skillList: [
      SkillName.Arcana,
      SkillName.Athletics,
      SkillName.Endurance,
      SkillName.Heal,
      SkillName.History,
      SkillName.Insight,
      SkillName.Nature,
      SkillName.Perception,
      SkillName.Religion,
    ],
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
    mainRole: CharacterRoleName.Striker,
    powerSource: PowerSourceName.Arcane,
    flavorText: "“I am in the arcane, and the arcane is in me.”",
    skillChoices: 4,
    trainedSkills: [SkillName.Arcana],
    skillList: [
      SkillName.Arcana,
      SkillName.Athletics,
      SkillName.Bluff,
      SkillName.Diplomacy,
      SkillName.Dungeoneering,
      SkillName.Endurance,
      SkillName.History,
      SkillName.Insight,
      SkillName.Intimidate,
      SkillName.Nature,
    ],
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
    mainRole: CharacterRoleName.Defender,
    powerSource: PowerSourceName.Primal,
    flavorText:
      "“Get past me? You might as well try to push the mountains aside.”",
    skillChoices: 4,
    trainedSkills: [SkillName.Nature],
    skillList: [
      SkillName.Athletics,
      SkillName.Dungeoneering,
      SkillName.Endurance,
      SkillName.Heal,
      SkillName.Intimidate,
      SkillName.Nature,
      SkillName.Perception,
    ],
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
    mainRole: CharacterRoleName.Leader,
    powerSource: PowerSourceName.Psionic,
    flavorText: "“The fate of the world rests on the fire of your passions”",
    skillChoices: 4,
    trainedSkills: [],
    skillList: [
      SkillName.Arcana,
      SkillName.Athletics,
      SkillName.Bluff,
      SkillName.Diplomacy,
      SkillName.Endurance,
      SkillName.Heal,
      SkillName.Insight,
      SkillName.Intimidate,
      SkillName.Streetwise,
    ],
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
    mainRole: CharacterRoleName.Defender,
    powerSource: PowerSourceName.Psionic,
    flavorText:
      "“My mind is a far deadlier weapon than some ill-crafted bit of iron”",
    skillChoices: 3,
    trainedSkills: [],
    skillList: [
      SkillName.Arcana,
      SkillName.Athletics,
      SkillName.Bluff,
      SkillName.Diplomacy,
      SkillName.Endurance,
      SkillName.Heal,
      SkillName.Insight,
      SkillName.Intimidate,
    ],
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
    mainRole: CharacterRoleName.Striker,
    powerSource: PowerSourceName.Psionic,
    flavorText:
      "“You fight well, but without discipline and focus, you will fall.”",
    skillChoices: 4,
    trainedSkills: [],
    skillList: [
      SkillName.Acrobatics,
      SkillName.Athletics,
      SkillName.Diplomacy,
      SkillName.Endurance,
      SkillName.Heal,
      SkillName.Insight,
      SkillName.Perception,
      SkillName.Religion,
      SkillName.Stealth,
      SkillName.Thievery,
    ],
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
    mainRole: CharacterRoleName.Controller,
    powerSource: PowerSourceName.Psionic,
    flavorText:
      "“I can bend the desire of the mortals and immortals to my will”",
    skillChoices: 4,
    trainedSkills: [],
    skillList: [
      SkillName.Arcana,
      SkillName.Bluff,
      SkillName.Diplomacy,
      SkillName.Dungeoneering,
      SkillName.History,
      SkillName.Insight,
      SkillName.Intimidate,
      SkillName.Perception,
    ],
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
    mainRole: CharacterRoleName.Leader,
    powerSource: PowerSourceName.Divine,
    flavorText:
      "“The divine runes of might are stronger than any steel, more dangerous than any spell”",
    skillChoices: 4,
    trainedSkills: [SkillName.Religion],
    skillList: [
      SkillName.Arcana,
      SkillName.Athletics,
      SkillName.Endurance,
      SkillName.Heal,
      SkillName.History,
      SkillName.Insight,
      SkillName.Religion,
      SkillName.Thievery,
    ],
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
    mainRole: CharacterRoleName.Controller,
    powerSource: PowerSourceName.Primal,
    flavorText:
      "“I am the lightning strike, the earth's upheaval, the unruly sea. I am the bringer of your destruction.”",
    skillChoices: 4,
    trainedSkills: [SkillName.Nature],
    skillList: [
      SkillName.Acrobatics,
      SkillName.Athletics,
      SkillName.Endurance,
      SkillName.Heal,
      SkillName.Insight,
      SkillName.Intimidate,
      SkillName.Nature,
      SkillName.Perception,
      SkillName.Stealth,
    ],
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
    mainRole: CharacterRoleName.Defender,
    powerSource: PowerSourceName.Arcane,
    flavorText:
      "“Under the leaves of Myth Drannor I learned the ancient eladrin way of battle. Spells are my armor, and words of ruin are bound to my blade”",
    skillChoices: 4,
    trainedSkills: [SkillName.Arcana],
    skillList: [
      SkillName.Arcana,
      SkillName.Athletics,
      SkillName.Diplomacy,
      SkillName.Endurance,
      SkillName.History,
      SkillName.Insight,
      SkillName.Intimidate,
    ],
    keyAbilities: [
      CharacterAbility.Intelligence,
      CharacterAbility.Strength,
      CharacterAbility.Constitution,
    ],
  },
};

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

export type CharacterRacesGlossary = {
  [key in CharacterRaceName]: {
    name: key;
    abilityBonus: CharacterAbility[];
    description: string;
    book: string;
    page: number;
  };
};

export type CharacterRace = CharacterRacesGlossary[CharacterRaceName];

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

export type CharBuilderChoices = Partial<{
  characterClassName: CharacterClassName;
  characterPower: PowerSourceName;
  characterRaceName: CharacterRaceName;
  characterRole: CharacterRoleName;
}>;

import {
  characterClasses,
  CharacterClass,
  characterRoles,
  CharacterRole,
  characterRaces,
  CharacterRace,
  powerSources,
  PowerSource,
} from "~/helpers/data";

// For now, all data is stored locally

export function fetchCharacterPowerSources(): PowerSource[] {
  return powerSources;
}

export function fetchCharacterRoles(): CharacterRole[] {
  return characterRoles;
}

export function fetchCharacterClasses(): CharacterClass[] {
  return characterClasses;
}

export function fetchCharacterRaces(): CharacterRace[] {
  return characterRaces;
}

export function fetchCharacterClassByName(
  characterClassName: CharacterClass["name"]
): CharacterClass | undefined {
  return characterClasses.find(({ name }) => characterClassName === name);
}

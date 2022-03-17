import {
  CharacterPowerSourceGlossary,
  characterPowerSourceGlossary,
  CharacterRolesGlossary,
  characterRolesGlossary,
  characterClasses,
  CharacterClass,
  characterRoles,
  CharacterRole,
  characterRaces,
  CharacterRace,
  powerSources,
  PowerSource,
  Ability,
} from "~/helpers/data";

// For now, all data is stored locally

export function fetchCharacterRoles(): CharacterRole[] {
  return characterRoles;
}

export function fetchCharacterRolesGlossary(): CharacterRolesGlossary {
  return characterRolesGlossary;
}

export function fetchCharacterPowerSources(): PowerSource[] {
  return powerSources;
}
export function fetchCharacterPowerSourcesGlossary(): CharacterPowerSourceGlossary {
  return characterPowerSourceGlossary;
}
export function fetchCharacterClasses(): CharacterClass[] {
  return characterClasses;
}

export function fetchCharacterClassByRoleAndPower(
  role: CharacterClass["mainRole"],
  power: CharacterClass["powerSource"]
): CharacterClass[] {
  return characterClasses.filter(
    ({ mainRole, powerSource }) =>
      powerSource === power && // same power source
      mainRole === role // same main role
  );
}

export function fetchCharacterClassByName(
  characterClassName: CharacterClass["name"]
): CharacterClass | undefined {
  return characterClasses.find(({ name }) => characterClassName === name);
}

export function fetchCharacterRaces(): CharacterRace[] {
  return characterRaces;
}

export function fetchCharacterRacesByAbilityBonus(
  keyAbilities: Ability[]
): CharacterRace[] {
  const [coreAbility] = keyAbilities;
  return characterRaces
    .reduce((filteredRaces, currentRace): CharacterRace[] => {
      const withFilteredAbilities = {
        ...currentRace,
        abilityBonus: currentRace.abilityBonus.filter((ability) =>
          keyAbilities.includes(ability)
        ),
      };

      if (
        withFilteredAbilities.abilityBonus.length > 0 &&
        withFilteredAbilities.abilityBonus.includes(coreAbility)
      ) {
        filteredRaces.push(withFilteredAbilities);
      }

      return filteredRaces;
    }, [] as CharacterRace[])
    .sort(({ abilityBonus: a }, { abilityBonus: b }) => b.length - a.length);
}

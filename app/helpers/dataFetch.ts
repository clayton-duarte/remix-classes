import {
  CharacterPowerSourceGlossary,
  characterPowerSourceGlossary,
  CharacterRolesGlossary,
  characterRolesGlossary,
  characterClassesGlossary,
  CharacterClassGlossary,
  CharacterClassName,
  characterClasses,
  characterRoles,
  CharacterRole,
  characterRaces,
  CharacterRace,
  characterPowerSources,
  CharacterPowerSource,
  CharacterAbility,
} from "~/helpers/types";

export function fetchCharacterRoles(): CharacterRole[] {
  return characterRoles;
}

export function fetchCharacterRolesGlossary(): CharacterRolesGlossary {
  return characterRolesGlossary;
}

export function fetchCharacterPowerSources(): CharacterPowerSource[] {
  return characterPowerSources;
}

export function fetchCharacterPowerSourcesGlossary(): CharacterPowerSourceGlossary {
  return characterPowerSourceGlossary;
}

export function fetchCharacterClasses(): CharacterClassName[] {
  return characterClasses;
}

export function fetchCharacterClassGlossary(): CharacterClassGlossary {
  return characterClassesGlossary;
}

export function fetchCharacterClassByRoleAndPower(
  role: CharacterClassGlossary[CharacterClassName]["mainRole"],
  power: CharacterClassGlossary[CharacterClassName]["powerSource"]
): CharacterClassGlossary[CharacterClassName][] {
  return Object.values(characterClassesGlossary).filter(
    ({ mainRole, powerSource }) =>
      powerSource === power && // same power source
      mainRole === role // same main role
  );
}

export function fetchCharacterClassByName(
  characterClassName: CharacterClassName
): CharacterClassGlossary[CharacterClassName] {
  return characterClassesGlossary[characterClassName];
}

export function fetchCharacterRaces(): CharacterRace[] {
  return characterRaces;
}

export function fetchCharacterRacesByAbilityBonus(
  keyAbilities: CharacterAbility[]
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

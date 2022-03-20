import {
  CharacterPowerSourceGlossary,
  characterPowerSourceGlossary,
  CharacterRolesGlossary,
  characterRolesGlossary,
  characterClassesGlossary,
  CharacterClassGlossary,
  CharacterClassName,
  CharacterRole,
  characterRacesGlossary,
  CharacterRacesGlossary,
  CharacterRace,
  CharacterRaceName,
  CharacterPowerSource,
  CharacterAbility,
} from "~/helpers/dataTypes";

export function fetchCharacterAbility(): CharacterAbility[] {
  return Object.values(CharacterAbility);
}

export function fetchCharacterRoles(): CharacterRole[] {
  return Object.values(CharacterRole);
}

export function fetchCharacterRolesGlossary(): CharacterRolesGlossary {
  return characterRolesGlossary;
}

export function fetchCharacterPowerSources(): CharacterPowerSource[] {
  return Object.values(CharacterPowerSource);
}

export function fetchCharacterPowerSourcesGlossary(): CharacterPowerSourceGlossary {
  return characterPowerSourceGlossary;
}

export function fetchCharacterClasses(): CharacterClassName[] {
  return Object.values(CharacterClassName);
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

export function fetchCharacterRaceByName(
  characterRaceName: CharacterRaceName
): CharacterRacesGlossary[CharacterRaceName] {
  return characterRacesGlossary[characterRaceName];
}

export function fetchCharacterRaceNames(): CharacterRaceName[] {
  return Object.values(CharacterRaceName);
}

export function fetchCharacterRacesGlossary(): CharacterRacesGlossary {
  return characterRacesGlossary;
}

export function fetchCharacterRacesByAbilityBonus(
  keyAbilities: CharacterAbility[]
): CharacterRace[] {
  const [coreAbility] = keyAbilities;
  return Object.values(characterRacesGlossary)
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

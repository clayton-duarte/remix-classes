import { useParams } from "remix";

import {
  CharBuilderChoices,
  CharacterAbility,
  CharacterRace,
} from "~/helpers/dataTypes";

function getOnlyValidRouteMember(
  routeParams: CharBuilderChoices
): string[] | never[] {
  const orderedRouterParams = [
    routeParams?.characterRole,
    routeParams?.characterPower,
    routeParams?.characterClassName,
    routeParams?.characterRaceName,
  ];

  return orderedRouterParams.filter(Boolean) as string[];
}

export function useValidRouteParameters(): string[] {
  const params = useParams<CharBuilderChoices>();

  return getOnlyValidRouteMember(params);
}

export function builderDynamicRoute(routeParams: CharBuilderChoices): string {
  const validPathMembers = getOnlyValidRouteMember(routeParams);

  return `/builder/${validPathMembers.join("/")}`;
}

export function filterAndSortCharacterRacesByAbilityBonus(
  characterRacesList: CharacterRace[],
  keyAbilities: CharacterAbility[]
): CharacterRace[] {
  const [coreAbility] = keyAbilities;

  return Object.values(characterRacesList)
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

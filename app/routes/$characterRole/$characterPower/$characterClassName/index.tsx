import { json, useLoaderData, useParams } from "remix";

import DataPanel from "~/components/DataPanel";
import Selector from "~/components/Selector";
import { buildDynamicRoute } from "~/helpers";
import {
  fetchCharacterRacesByAbilityBonus,
  fetchCharacterClassByName,
} from "~/helpers/dataFetch";
import {
  CharacterClass,
  CharacterRace,
  RouteParams,
} from "~/helpers/dataTypes";

interface LoaderResponse {
  characterClass: CharacterClass;
  raceList: CharacterRace[];
}

export const loader = async ({ params }: { params: RouteParams }) => {
  if (!params.characterClassName) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const characterClass = fetchCharacterClassByName(params.characterClassName);

  if (characterClass == null) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json<LoaderResponse>({
    raceList: fetchCharacterRacesByAbilityBonus(characterClass.keyAbilities),
    characterClass,
  });
};

export default function Page() {
  const { raceList, characterClass } = useLoaderData<LoaderResponse>();

  const { characterRole, characterPower, characterClassName } =
    useParams<RouteParams>();

  return (
    <>
      <Selector
        area="race"
        data={raceList.map(({ name, abilityBonus }) => ({
          link: buildDynamicRoute({
            characterRaceName: name,
            characterClassName,
            characterPower,
            characterRole,
          }),
          badge: abilityBonus.length,
          label: name,
          id: name,
        }))}
      />
      <DataPanel area="class">
        <em>{characterClass.flavorText}</em>
        <br />- {characterClass.book}, p.{characterClass.page}
      </DataPanel>
      <DataPanel area="race" color="warn" title="action">
        Please select a compatible "Race" from the menu.
      </DataPanel>
    </>
  );
}

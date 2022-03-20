import { json, useLoaderData, useParams, Outlet } from "remix";

import Selector from "~/components/Selector";
import DataPanel from "~/components/DataPanel";
import {
  CharacterPowerSource,
  CharacterClassName,
  CharacterRaceName,
  CharacterClass,
  CharacterRole,
  CharacterRace,
} from "~/helpers/dataTypes";
import {
  fetchCharacterRacesByAbilityBonus,
  fetchCharacterClassByName,
} from "~/helpers/dataFetch";

type LoaderResponse = {
  characterClass: CharacterClass;
  raceList: CharacterRace[];
};

type RouteParams = {
  characterRole: CharacterRole;
  characterPower: CharacterPowerSource;
  characterClassName: CharacterClassName;
  characterRaceName: CharacterRaceName;
};

export const loader = async ({ params }: { params: RouteParams }) => {
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
  const {
    characterRole,
    characterPower,
    characterClassName,
    characterRaceName,
  } = useParams<RouteParams>();

  return (
    <>
      <Selector
        area="race"
        active={characterRaceName}
        data={raceList.map(({ name: raceName, abilityBonus }) => ({
          link: `/${characterRole}/${characterPower}/${characterClassName}/${raceName}`,
          badge: abilityBonus.length,
          label: raceName,
          id: raceName,
        }))}
      />
      <DataPanel area="class">
        <em>{characterClass.flavorText}</em>
        <br />- {characterClass.book}, p.{characterClass.page}
      </DataPanel>
      <Outlet />
    </>
  );
}

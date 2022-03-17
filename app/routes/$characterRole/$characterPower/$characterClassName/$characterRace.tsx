import { json, useLoaderData, useParams, Outlet } from "remix";

import Selector from "~/components/Selector";
import DataPanel from "~/components/DataPanel";
import {
  CharacterClassGlossary,
  CharacterPowerSource,
  CharacterClassName,
  CharacterRaceName,
  CharacterRole,
  CharacterRace,
} from "~/helpers/types";
import {
  fetchCharacterRacesByAbilityBonus,
  fetchCharacterClassGlossary,
  fetchCharacterClassByName,
} from "~/helpers/dataFetch";

type LoaderResponse = {
  characterClassGlossary: CharacterClassGlossary;
  raceList: CharacterRace[];
};

type RouteParams = {
  characterRole: CharacterRole;
  characterPower: CharacterPowerSource;
  characterClassName: CharacterClassName;
  characterRace: CharacterRaceName;
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
    characterClassGlossary: fetchCharacterClassGlossary(),
  });
};

export default function Page() {
  const { raceList, characterClassGlossary } = useLoaderData<LoaderResponse>();
  const { characterRole, characterPower, characterClassName, characterRace } =
    useParams<RouteParams>();

  return (
    <>
      <Selector
        area="race"
        active={characterRace}
        data={raceList.map(({ name: raceName, abilityBonus }) => ({
          link: `/${characterRole}/${characterPower}/${characterClassName}/${raceName}`,
          badge: abilityBonus.length,
          label: raceName,
          id: raceName,
        }))}
      />
      {characterClassName && (
        <DataPanel area="class-data">
          {characterClassGlossary[characterClassName].flavorText}
        </DataPanel>
      )}
      <Outlet />
    </>
  );
}

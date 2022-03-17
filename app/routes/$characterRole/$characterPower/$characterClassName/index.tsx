import { json, useLoaderData, useParams } from "remix";
import DataPanel from "~/components/DataPanel";

import Selector from "~/components/Selector";
import {
  CharacterClassGlossary,
  CharacterPowerSource,
  CharacterClassName,
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
  const { characterRole, characterPower, characterClassName } =
    useParams<RouteParams>();

  return (
    <>
      <Selector
        area="race"
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
    </>
  );
}

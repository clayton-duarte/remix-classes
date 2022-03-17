import { json, useLoaderData, useParams } from "remix";

import DataPanel from "~/components/DataPanel";
import {
  CharacterPowerSource,
  CharacterClassName,
  CharacterClass,
  CharacterRole,
  CharacterRace,
} from "~/helpers/types";
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
  characterRace: CharacterRace["name"];
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
  const {
    raceList,
    characterClass: { keyAbilities },
  } = useLoaderData<LoaderResponse>();
  const { characterRole, characterPower, characterClassName, characterRace } =
    useParams<RouteParams>();

  return (
    <>
      {characterRace && <DataPanel area="race-data">{characterRace}</DataPanel>}
    </>
  );
}

import { json, useLoaderData, useParams } from "remix";

import DataPanel from "~/components/DataPanel";
import {
  CharacterRacesGlossary,
  CharacterPowerSource,
  CharacterClassName,
  CharacterRaceName,
  CharacterClass,
  CharacterRole,
  CharacterRace,
} from "~/helpers/types";
import {
  fetchCharacterRacesByAbilityBonus,
  fetchCharacterRacesGlossary,
  fetchCharacterClassByName,
} from "~/helpers/dataFetch";

type LoaderResponse = {
  characterRacesGlossary: CharacterRacesGlossary;
  characterClass: CharacterClass;
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
    characterRacesGlossary: fetchCharacterRacesGlossary(),
    characterClass,
  });
};

export default function Page() {
  const { characterRacesGlossary } = useLoaderData<LoaderResponse>();
  const { characterRace } = useParams<RouteParams>();

  return (
    <>
      {characterRace && (
        <DataPanel area="race-data">
          {characterRacesGlossary[characterRace].description}
        </DataPanel>
      )}
    </>
  );
}

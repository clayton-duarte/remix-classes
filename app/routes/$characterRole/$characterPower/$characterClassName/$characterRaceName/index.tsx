import { json, useLoaderData, useParams } from "remix";

import DataPanel from "~/components/DataPanel";
import {
  CharacterPowerSource,
  CharacterClassName,
  CharacterRaceName,
  CharacterClass,
  CharacterRole,
  CharacterRace,
} from "~/helpers/types";
import {
  fetchCharacterClassByName,
  fetchCharacterRaceByName,
} from "~/helpers/dataFetch";

type LoaderResponse = {
  characterClass: CharacterClass;
  characterRace: CharacterRace;
};

type RouteParams = {
  characterRole: CharacterRole;
  characterClassName: CharacterClassName;
  characterPower: CharacterPowerSource;
  characterRaceName: CharacterRaceName;
};

export const loader = async ({ params }: { params: RouteParams }) => {
  return json<LoaderResponse>({
    characterClass: fetchCharacterClassByName(params.characterClassName),
    characterRace: fetchCharacterRaceByName(params.characterRaceName),
  });
};

export default function Page() {
  const { characterClass, characterRace } = useLoaderData<LoaderResponse>();

  return (
    <>
      <DataPanel area="race">{characterRace.description}</DataPanel>
      <DataPanel color="secondary" area="char" title="summary">
        <p>
          Class Key Abilities: {characterClass.keyAbilities.sort().join(", ")}
        </p>
        <p>
          (Book: {characterClass.book}, Page: {characterClass.page})
        </p>
        <br />
        <p>
          Racial Ability Bonus: {characterRace.abilityBonus.sort().join(", ")}
        </p>
        <p>
          (Book: {characterRace.book}, Page: {characterRace.page})
        </p>
      </DataPanel>
    </>
  );
}

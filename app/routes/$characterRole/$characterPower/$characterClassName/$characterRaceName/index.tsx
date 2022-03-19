import { useEffect } from "react";
import { json, useLoaderData } from "remix";

import AbilityPoints from "~/components/AbilityPoints";
import DataPanel from "~/components/DataPanel";
import {
  CharacterPowerSource,
  CharacterClassName,
  CharacterRaceName,
  CharacterAbility,
  CharacterClass,
  CharacterRole,
  CharacterRace,
} from "~/helpers/types";
import {
  fetchCharacterClassByName,
  fetchCharacterRaceByName,
  fetchCharacterAbility,
} from "~/helpers/dataFetch";

type LoaderResponse = {
  characterAbilities: CharacterAbility[];
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
    characterAbilities: fetchCharacterAbility(),
  });
};

export default function Page() {
  const { characterClass, characterRace, characterAbilities } =
    useLoaderData<LoaderResponse>();

  useEffect(() => {
    document.getElementById("char-panel")?.scrollIntoView();
  }, [characterRace]);

  return (
    <>
      <DataPanel area="race">{characterRace.description}</DataPanel>
      <DataPanel color="secondary" area="char" title="Bonuses">
        <summary>Available Bonuses:</summary>
        <br />
        <AbilityPoints
          characterAbilities={characterAbilities}
          characterClass={characterClass}
          characterRace={characterRace}
        />
        <br />
        <summary>Class:</summary>
        <span>
          {characterClass.book}, page {characterClass.page}
        </span>
        <summary>Race:</summary>
        <span>
          {characterRace.book}, page {characterRace.page}
        </span>
      </DataPanel>
    </>
  );
}

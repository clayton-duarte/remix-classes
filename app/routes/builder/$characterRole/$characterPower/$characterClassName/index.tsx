import { json, useLoaderData, useParams } from "remix";

import DataPanel from "~/components/DataPanel";
import Selector from "~/components/Selector";
import { builderDynamicRoute } from "~/helpers";
import {
  CharacterClass,
  CharacterRace,
  CharBuilderChoices,
} from "~/helpers/dataTypes";
import dbClient from "~/helpers/dbClient";
import { CharacterClassCrud } from "~/libs/FaunaCrud";

interface LoaderResponse {
  characterClass: CharacterClass;
  raceList: CharacterRace[];
}

export const loader = async ({ params }: { params: CharBuilderChoices }) => {
  if (!params.characterClassName) {
    throw new Response("Not Found", { status: 404 });
  }

  const characterClassClient = new CharacterClassCrud();

  const { data: characterClass } = await characterClassClient.getOneByName(
    params.characterClassName
  );

  if (characterClass == null) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderResponse>({
    raceList: dbClient.fetchCharacterRacesByAbilityBonus(
      characterClass.keyAbilities
    ),
    characterClass,
  });
};

export default function Page() {
  const { raceList, characterClass } = useLoaderData<LoaderResponse>();

  const { characterRole, characterPower, characterClassName } =
    useParams<CharBuilderChoices>();

  return (
    <>
      <Selector
        area="race"
        data={raceList.map(({ name, abilityBonus }) => ({
          link: builderDynamicRoute({
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
      </DataPanel>
      <DataPanel area="race" color="warn" title="action">
        Please select a compatible "Race" from the menu.
      </DataPanel>
    </>
  );
}

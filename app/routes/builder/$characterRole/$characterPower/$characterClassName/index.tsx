import { json, useLoaderData, useParams } from "remix";

import DataPanel from "~/components/DataPanel";
import Selector from "~/components/Selector";
import {
  sortCharacterRacesByAbilityBonusLength,
  builderDynamicRoute,
} from "~/helpers";
import {
  CharBuilderChoices,
  CharacterClass,
  CharacterRace,
} from "~/helpers/dataTypes";
import {
  CharacterClassService,
  CharacterRaceService,
} from "~/libs/FaunaService";

interface LoaderResponse {
  characterClass: CharacterClass;
  characterRaceList: CharacterRace[];
}

export const loader = async ({ params }: { params: CharBuilderChoices }) => {
  if (!params.characterClassName) {
    throw new Response("Not Found", { status: 404 });
  }

  const characterClassClient = new CharacterClassService();

  const { data: characterClass } = await characterClassClient.getOneByName(
    params.characterClassName
  );

  if (characterClass == null) {
    throw new Response("Not Found", { status: 404 });
  }

  const characterRaceListClient = new CharacterRaceService();

  const { data: characterRaceList } =
    await characterRaceListClient.getCharacterRaceByAbilityBonus(
      characterClass.keyAbilities
    );

  if (characterClass == null) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderResponse>({
    characterClass,
    characterRaceList:
      sortCharacterRacesByAbilityBonusLength(characterRaceList),
  });
};

export default function Page() {
  const { characterRaceList, characterClass } = useLoaderData<LoaderResponse>();

  const { characterRole, characterPower, characterClassName } =
    useParams<CharBuilderChoices>();

  return (
    <>
      <Selector
        area="race"
        data={characterRaceList.map(({ name, abilityBonus }) => ({
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

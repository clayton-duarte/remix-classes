import { useLoaderData, useParams, redirect, Outlet, json } from "remix";

import DataPanel from "~/components/DataPanel";
import Selector from "~/components/Selector";
import {
  filterAndSortCharacterRacesByAbilityBonus,
  builderDynamicRoute,
} from "~/helpers";
import {
  CharacterClass,
  CharacterRace,
  CharBuilderChoices,
} from "~/helpers/dataTypes";
import {
  CharacterClassService,
  CharacterRaceService,
} from "~/libs/FaunaService";

interface LoaderResponse {
  characterClass: CharacterClass;
  characterRaceList: CharacterRace[];
}

export const loader = async ({
  params,
  request,
}: {
  params: CharBuilderChoices;
  request: Request;
}) => {
  if (!params.characterClassName) {
    throw new Response("Not Found", { status: 404 });
  }

  const characterClassClient = new CharacterClassService();
  const characterRaceListClient = new CharacterRaceService();

  const [{ data: characterClass }, { data: characterRaceList }] =
    await Promise.all([
      characterClassClient.getOneByName(params.characterClassName),
      characterRaceListClient.getMany(),
    ]);

  if (characterClass == null) {
    throw new Response("Not Found", { status: 404 });
  }

  if (
    characterRaceList.find(({ name }) => name === params.characterRaceName) ==
    null
  ) {
    const nextRoute = builderDynamicRoute({
      characterClassName: params.characterClassName,
      characterPower: params.characterPower,
      characterRole: params.characterRole,
    });

    const url = new URL(request.url);

    if (nextRoute !== url.pathname) {
      return redirect(nextRoute);
    }
  }

  return json<LoaderResponse>({
    characterClass,
    characterRaceList: filterAndSortCharacterRacesByAbilityBonus(
      characterRaceList,
      characterClass.keyAbilities
    ),
  });
};

export default function Page() {
  const { characterRaceList, characterClass } = useLoaderData<LoaderResponse>();

  const {
    characterRole,
    characterPower,
    characterClassName,
    characterRaceName,
  } = useParams<CharBuilderChoices>();

  return (
    <>
      <Selector
        area="race"
        active={characterRaceName}
        data={characterRaceList.map(({ name: raceName, abilityBonus }) => ({
          link: builderDynamicRoute({
            characterRaceName: raceName,
            characterClassName,
            characterPower,
            characterRole,
          }),
          badge: abilityBonus.length,
          label: raceName,
          id: raceName,
        }))}
      />
      <DataPanel area="class">
        <em>{characterClass.flavorText}</em>
      </DataPanel>
      <Outlet />
    </>
  );
}

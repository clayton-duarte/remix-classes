import {
  useLoaderData,
  useNavigate,
  useParams,
  redirect,
  Outlet,
  json,
} from "remix";

import Selector from "~/components/Selector";
import DataPanel from "~/components/DataPanel";
import {
  CharacterClass,
  CharacterRace,
  RouteParams,
} from "~/helpers/dataTypes";
import {
  fetchCharacterRacesByAbilityBonus,
  fetchCharacterClassByName,
} from "~/helpers/dataFetch";
import { buildDynamicRoute } from "~/helpers";
import { useEffect } from "react";

type LoaderResponse = {
  characterClass: CharacterClass;
  raceList: CharacterRace[];
};

export const loader = async ({
  params,
  request,
}: {
  params: RouteParams;
  request: Request;
}) => {
  if (!params.characterClassName) {
    throw new Response("Not Found", { status: 404 });
  }

  const characterClass = fetchCharacterClassByName(params.characterClassName);

  if (characterClass == null) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const raceList = fetchCharacterRacesByAbilityBonus(
    characterClass.keyAbilities
  );

  if (raceList.find(({ name }) => name === params.characterRaceName) == null) {
    const nextRoute = buildDynamicRoute({
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
    raceList,
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
          link: buildDynamicRoute({
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
        <br />- {characterClass.book}, p.{characterClass.page}
      </DataPanel>
      <Outlet />
    </>
  );
}

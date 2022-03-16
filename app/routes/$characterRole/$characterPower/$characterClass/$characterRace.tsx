import { json, useLoaderData, useParams, Outlet } from "remix";

import Selector from "~/components/Selector";
import {
  CharacterClass,
  CharacterRole,
  CharacterRace,
  PowerSource,
} from "~/helpers/data";
import {
  fetchCharacterRacesByAbilityBonus,
  fetchCharacterClassByName,
} from "~/helpers/dataFetch";

type LoaderResponse = {
  raceList: CharacterRace[];
};

type RouteParams = {
  characterRole: CharacterRole;
  characterPower: PowerSource;
  characterClass: CharacterClass["name"];
  characterRace: CharacterRace["name"];
};

export const loader = async ({ params }: { params: RouteParams }) => {
  const selectedClass = fetchCharacterClassByName(params.characterClass);

  if (!selectedClass) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json<LoaderResponse>({
    raceList: fetchCharacterRacesByAbilityBonus(selectedClass.keyAbilities),
  });
};

export default function Page() {
  const { raceList } = useLoaderData<LoaderResponse>();
  const { characterRole, characterPower, characterClass, characterRace } =
    useParams<RouteParams>();

  return (
    <>
      <Selector
        area="race"
        active={characterRace}
        data={raceList.map(({ name: raceName, abilityBonus }) => ({
          link: `/${characterRole}/${characterPower}/${characterClass}/${raceName}`,
          badge: abilityBonus.length,
          label: raceName,
          id: raceName,
        }))}
      />
      <Outlet />
    </>
  );
}

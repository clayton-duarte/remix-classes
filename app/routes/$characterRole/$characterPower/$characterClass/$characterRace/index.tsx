import { Link, json, useLoaderData, useParams } from "remix";

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
  selectedClass: CharacterClass;
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
    selectedClass,
  });
};

export default function Page() {
  const {
    raceList,
    selectedClass: { keyAbilities },
  } = useLoaderData<LoaderResponse>();
  const { characterRole, characterPower, characterClass, characterRace } =
    useParams<RouteParams>();

  return <>{characterRace} data</>;
  return (
    <div style={{ gridArea: "data" }}>
      <h3>Recommended Races</h3>
      <p>{keyAbilities.join(", ")}</p>
      <ul>
        {raceList.map(({ name, abilityBonus }) => (
          <li key={name}>
            <Link to={`/race/${name}`}>
              ({abilityBonus.length}) {name}: {abilityBonus.join(", ")}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

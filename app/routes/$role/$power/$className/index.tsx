import { useMemo } from "react";
import { Link, json, useLoaderData } from "remix";

import {
  CharacterClass,
  CharacterRole,
  CharacterRace,
  PowerSource,
} from "~/helpers/data";
import {
  fetchCharacterRaces,
  fetchCharacterClassByName,
} from "~/helpers/dataFetch";

type LoaderResponse = {
  raceList: CharacterRace[];
  selectedClass: CharacterClass;
};

type RouteParams = {
  role: CharacterRole;
  power: PowerSource;
  className: string;
};

export const loader = async ({ params }: { params: RouteParams }) => {
  const selectedClass = fetchCharacterClassByName(params.className);

  if (!selectedClass) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json<LoaderResponse>({
    raceList: fetchCharacterRaces(),
    selectedClass,
  });
};

export default function Page() {
  const {
    raceList,
    selectedClass: { keyAbilities },
  } = useLoaderData<LoaderResponse>();

  const filteredAndSortedRaces: CharacterRace[] = useMemo(() => {
    const [coreAbility] = keyAbilities;
    return raceList
      .reduce((filteredRaces, currentRace): CharacterRace[] => {
        const withFilteredAbilities = {
          ...currentRace,
          abilityBonus: currentRace.abilityBonus.filter((ability) =>
            keyAbilities.includes(ability)
          ),
        };

        if (
          withFilteredAbilities.abilityBonus.length > 0 &&
          withFilteredAbilities.abilityBonus.includes(coreAbility)
        ) {
          filteredRaces.push(withFilteredAbilities);
        }

        return filteredRaces;
      }, [] as CharacterRace[])
      .sort(({ abilityBonus: a }, { abilityBonus: b }) => b.length - a.length);
  }, [raceList, keyAbilities]);

  return (
    <div style={{ gridArea: "race" }}>
      <h3>Recommended Races</h3>
      <p>{keyAbilities.join(", ")}</p>
      <ul>
        {filteredAndSortedRaces.map(({ name, abilityBonus }) => (
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

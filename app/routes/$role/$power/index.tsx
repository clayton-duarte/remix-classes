import { useMemo } from "react";
import { json, useParams, useLoaderData } from "remix";

import { RecommendedClasses } from "~/components/RecommendedClasses";
import { SuggestedRaces } from "~/components/SuggestedRaces";
import {
  CharacterClass,
  CharacterRole,
  CharacterRace,
  PowerSource,
} from "~/helpers/data";
import {
  fetchCharacterClasses,
  fetchCharacterRaces,
} from "~/helpers/dataFetch";

type LoaderResponse = {
  classList: CharacterClass[];
  raceList: CharacterRace[];
};

export const loader = async () => {
  return json<LoaderResponse>({
    classList: fetchCharacterClasses(),
    raceList: fetchCharacterRaces(),
  });
};

export default function Page() {
  const { classList, raceList } = useLoaderData<LoaderResponse>();
  const { role, power } =
    useParams<{ role: CharacterRole; power: PowerSource }>();

  const filteredClasses = useMemo(() => {
    return classList.filter(
      ({ mainRole, powerSource }) =>
        role != null && // safety check
        powerSource === power && // same power source
        mainRole === role // same main role
    );
  }, [role, power]);

  return (
    <>
      <RecommendedClasses classList={filteredClasses} />
      <SuggestedRaces classList={filteredClasses} raceList={raceList} />
    </>
  );
}

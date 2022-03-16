import { useLoaderData, useParams, json } from "remix";

import Selector from "~/components/Selector";
import { fetchCharacterPowerSources } from "~/helpers/dataFetch";
import { PowerSource, CharacterRole } from "~/helpers/data";

type LoaderResponse = {
  powerList: PowerSource[];
};

type RouteParams = {
  characterRole: CharacterRole;
};

export const loader = async () => {
  return json<LoaderResponse>({
    powerList: fetchCharacterPowerSources(),
  });
};

export default function Page() {
  const { characterRole } = useParams<RouteParams>();
  const { powerList } = useLoaderData<LoaderResponse>();

  return (
    <>
      <Selector
        area="power"
        data={powerList.map((power) => ({
          link: `/${characterRole}/${power}`,
          label: power,
          id: power,
        }))}
      />
      {characterRole} data
    </>
  );
}

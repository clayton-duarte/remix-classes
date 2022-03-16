import { useLoaderData, useParams, Outlet, json } from "remix";

import { fetchCharacterPowerSources } from "~/helpers/dataFetch";
import { PowerSource, CharacterRole } from "~/helpers/data";
import Selector from "~/components/Selector";

type LoaderResponse = {
  powerList: PowerSource[];
};

type RouteParams = {
  characterRole: CharacterRole;
  characterPower: PowerSource;
};

export const loader = async () => {
  return json<LoaderResponse>({
    powerList: fetchCharacterPowerSources(),
  });
};

export default function Page() {
  const { powerList } = useLoaderData<LoaderResponse>();
  const { characterRole, characterPower } = useParams<RouteParams>();

  return (
    <>
      <Selector
        area="power"
        active={characterPower}
        data={powerList.map((power) => ({
          link: `/${characterRole}/${power}`,
          label: power,
          id: power,
        }))}
      />
      <Outlet />
    </>
  );
}

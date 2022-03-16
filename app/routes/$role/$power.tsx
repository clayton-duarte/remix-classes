import { useLoaderData, useParams, Outlet, json } from "remix";

import { fetchCharacterPowerSources } from "~/helpers/dataFetch";
import { PowerSource, CharacterRole } from "~/helpers/data";
import Selector from "~/components/Selector";

type LoaderResponse = {
  powerList: PowerSource[];
};

export const loader = async () => {
  return json<LoaderResponse>({
    powerList: fetchCharacterPowerSources(),
  });
};

export default function Page() {
  const { role, power } =
    useParams<{ role: CharacterRole; power: PowerSource }>();
  const { powerList } = useLoaderData<LoaderResponse>();

  return (
    <>
      <Selector
        area="power"
        active={power}
        data={powerList.map((powerName) => ({
          link: `/${role}/${powerName}`,
          label: powerName,
          id: powerName,
        }))}
      />
      <Outlet />
    </>
  );
}

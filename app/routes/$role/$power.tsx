import { useLoaderData, useParams, Outlet, json } from "remix";

import Selector from "~/components/Selector";
import { fetchCharacterPowerSources } from "~/helpers/dataFetch";
import { PowerSource, CharacterRole } from "~/helpers/data";

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
      <h2>power:</h2>
      <Selector
        data={powerList.map((powerName) => ({
          link: `/${role}/${powerName}`,
          label: powerName,
          id: powerName,
        }))}
        active={power}
      />
      <Outlet />
    </>
  );
}

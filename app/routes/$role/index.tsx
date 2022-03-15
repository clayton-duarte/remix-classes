import { useLoaderData, json } from "remix";

import ChooseYourPower from "~/components/ChooseYourPower";
import { fetchCharacterPowerSources } from "~/helpers/dataFetch";
import { PowerSource } from "~/helpers/data";

type LoaderResponse = {
  powerList: PowerSource[];
};

export const loader = async () => {
  return json<LoaderResponse>({
    powerList: fetchCharacterPowerSources(),
  });
};

export default function Page() {
  const { powerList } = useLoaderData<LoaderResponse>();

  return (
    <>
      <h1>Choose your source of power:</h1>
      <ChooseYourPower powerList={powerList} />
    </>
  );
}

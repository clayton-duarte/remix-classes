import { useLoaderData, useParams, Outlet, json } from "remix";

import {
  fetchCharacterPowerSources,
  fetchCharacterRolesGlossary,
} from "~/helpers/dataFetch";
import {
  CharacterRolesGlossary,
  CharacterRole,
  PowerSource,
} from "~/helpers/types";
import Selector from "~/components/Selector";
import DataPanel from "~/components/DataPanel";

type LoaderResponse = {
  characterRolesGlossary: CharacterRolesGlossary;
  powerList: PowerSource[];
};

type RouteParams = {
  characterRole: CharacterRole;
  characterPower: PowerSource;
};

export const loader = async () => {
  return json<LoaderResponse>({
    characterRolesGlossary: fetchCharacterRolesGlossary(),
    powerList: fetchCharacterPowerSources(),
  });
};

export default function Page() {
  const { powerList, characterRolesGlossary } = useLoaderData<LoaderResponse>();
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
      {characterRole && (
        <DataPanel area="role-data">
          {characterRolesGlossary[characterRole].description}
        </DataPanel>
      )}
      <Outlet />
    </>
  );
}

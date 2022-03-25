import { useLoaderData, useParams, Outlet, json } from "remix";

import DataPanel from "~/components/DataPanel";
import Selector from "~/components/Selector";
import { builderDynamicRoute } from "~/helpers";
import {
  fetchCharacterPowerSources,
  fetchCharacterRolesGlossary,
} from "~/helpers/dataFetch";
import {
  CharacterRolesGlossary,
  CharacterPowerSource,
  RouteParams,
} from "~/helpers/dataTypes";

interface LoaderResponse {
  characterRolesGlossary: CharacterRolesGlossary;
  powerList: CharacterPowerSource[];
}

export const loader = async () => {
  return json<LoaderResponse>({
    characterRolesGlossary: fetchCharacterRolesGlossary(),
    powerList: fetchCharacterPowerSources(),
  });
};

export default function Page() {
  const { powerList, characterRolesGlossary } = useLoaderData<LoaderResponse>();

  const {
    characterRole,
    characterPower,
    characterClassName,
    characterRaceName,
  } = useParams<RouteParams>();

  return (
    <>
      <Selector
        area="power"
        active={characterPower}
        data={powerList.map((power) => ({
          link: builderDynamicRoute({
            characterPower: power,
            characterClassName,
            characterRaceName,
            characterRole,
          }),
          label: power,
          id: power,
        }))}
      />
      {characterRole && (
        <DataPanel area="role">
          {characterRolesGlossary[characterRole].description}
        </DataPanel>
      )}
      <Outlet />
    </>
  );
}

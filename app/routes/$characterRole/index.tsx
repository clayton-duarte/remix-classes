import { useLoaderData, useParams, json } from "remix";

import Selector from "~/components/Selector";
import DataPanel from "~/components/DataPanel";
import {
  fetchCharacterRolesGlossary,
  fetchCharacterPowerSources,
} from "~/helpers/dataFetch";
import {
  CharacterRolesGlossary,
  CharacterPowerSource,
  CharacterRole,
} from "~/helpers/types";

type LoaderResponse = {
  characterRolesGlossary: CharacterRolesGlossary;
  powerList: CharacterPowerSource[];
};

type RouteParams = {
  characterRole: CharacterRole;
};

export const loader = async () => {
  return json<LoaderResponse>({
    characterRolesGlossary: fetchCharacterRolesGlossary(),
    powerList: fetchCharacterPowerSources(),
  });
};

export default function Page() {
  const { powerList, characterRolesGlossary } = useLoaderData<LoaderResponse>();
  const { characterRole } = useParams<RouteParams>();

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
      {characterRole && (
        <DataPanel area="role-data">
          {characterRolesGlossary[characterRole].description}
        </DataPanel>
      )}
    </>
  );
}

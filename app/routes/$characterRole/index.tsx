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
} from "~/helpers/dataTypes";

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
        <DataPanel area="role">
          {characterRolesGlossary[characterRole].description}
        </DataPanel>
      )}
      <DataPanel area="power" color="warn" title="action">
        Please select a "Source of Power" from the menu to know more about it.
      </DataPanel>
    </>
  );
}

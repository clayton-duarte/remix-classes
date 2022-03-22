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
  RouteParams,
} from "~/helpers/dataTypes";
import { buildDynamicRoute } from "~/helpers";

type LoaderResponse = {
  characterRolesGlossary: CharacterRolesGlossary;
  powerList: CharacterPowerSource[];
};

export const loader = async () => {
  return json<LoaderResponse>({
    characterRolesGlossary: fetchCharacterRolesGlossary(),
    powerList: fetchCharacterPowerSources(),
  });
};

export default function Page() {
  const { powerList, characterRolesGlossary } = useLoaderData<LoaderResponse>();
  const { characterRole, characterClassName, characterRaceName } =
    useParams<RouteParams>();
  return (
    <>
      <Selector
        area="power"
        data={powerList.map((power) => ({
          link: buildDynamicRoute({
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
      <DataPanel area="power" color="warn" title="action">
        Please select a "Source of Power" from the menu to know more about it.
      </DataPanel>
    </>
  );
}

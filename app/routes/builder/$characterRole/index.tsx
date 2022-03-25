import { useLoaderData, useParams, json } from "remix";

import DataPanel from "~/components/DataPanel";
import Selector from "~/components/Selector";
import { builderDynamicRoute } from "~/helpers";
import {
  fetchCharacterRolesGlossary,
  fetchCharacterPowerSources,
} from "~/helpers/dataFetch";
import {
  CharacterRolesGlossary,
  CharacterPowerSource,
  CharBuilderChoices,
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

  const { characterRole, characterClassName, characterRaceName } =
    useParams<CharBuilderChoices>();

  return (
    <>
      <Selector
        area="power"
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
      <DataPanel area="power" color="warn" title="action">
        Please select a "Source of Power" from the menu to know more about it.
      </DataPanel>
    </>
  );
}

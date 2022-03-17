import { useLoaderData, useParams, json } from "remix";

import Selector from "~/components/Selector";
import DataPanel from "~/components/DataPanel";
import {
  fetchCharacterRolesGlossary,
  fetchCharacterPowerSources,
} from "~/helpers/dataFetch";
import {
  CharacterRolesGlossary,
  CharacterRole,
  PowerSource,
} from "~/helpers/data";

type LoaderResponse = {
  characterRolesGlossary: CharacterRolesGlossary;
  powerList: PowerSource[];
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
        <DataPanel
          glossary={characterRolesGlossary[characterRole]}
          area="role-data"
        />
      )}
    </>
  );
}

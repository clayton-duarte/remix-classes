import { json, useParams, useLoaderData } from "remix";

import {
  CharacterPowerSourceGlossary,
  CharacterPowerSource,
  CharacterClass,
  CharacterRole,
} from "~/helpers/types";
import {
  fetchCharacterClassByRoleAndPower,
  fetchCharacterPowerSourcesGlossary,
} from "~/helpers/dataFetch";
import Selector from "~/components/Selector";
import DataPanel from "~/components/DataPanel";

type LoaderResponse = {
  characterPowerSourceGlossary: CharacterPowerSourceGlossary;
  classList: CharacterClass[];
};

type RouteParams = {
  characterRole: CharacterRole;
  characterPower: CharacterPowerSource;
};

export const loader = async ({ params }: { params: RouteParams }) => {
  return json<LoaderResponse>({
    characterPowerSourceGlossary: fetchCharacterPowerSourcesGlossary(),
    classList: fetchCharacterClassByRoleAndPower(
      params.characterRole,
      params.characterPower
    ),
  });
};

export default function Page() {
  const { characterRole, characterPower } = useParams<RouteParams>();
  const { classList, characterPowerSourceGlossary } =
    useLoaderData<LoaderResponse>();

  const haveClassesToShow = classList.length > 0;

  return (
    <>
      {haveClassesToShow && (
        <Selector
          area="class"
          data={classList.map(({ name }) => ({
            link: `/${characterRole}/${characterPower}/${name}`,
            label: name,
            id: name,
          }))}
        />
      )}
      {characterPower && (
        <DataPanel area="power-data">
          {characterPowerSourceGlossary[characterPower].description}
        </DataPanel>
      )}
      {!haveClassesToShow && (
        <DataPanel area="class-data" color="error" title="action required">
          No {characterPower}/{characterRole} classes available
        </DataPanel>
      )}
      {haveClassesToShow && (
        <DataPanel area="class-data" color="warn" title="action required">
          Please select a "Class" from the menu
        </DataPanel>
      )}
    </>
  );
}

import { json, useParams, useLoaderData, Outlet } from "remix";

import {
  CharacterPowerSourceGlossary,
  CharacterPowerSource,
  CharacterClassName,
  CharacterClass,
  CharacterRole,
} from "~/helpers/dataTypes";
import {
  fetchCharacterPowerSourcesGlossary,
  fetchCharacterClassByRoleAndPower,
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
  characterClassName: CharacterClassName;
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
  const { characterRole, characterPower, characterClassName } =
    useParams<RouteParams>();
  const { classList, characterPowerSourceGlossary } =
    useLoaderData<LoaderResponse>();

  return (
    <>
      {
        <Selector
          area="class"
          active={characterClassName}
          data={classList.map(({ name }) => ({
            link: `/${characterRole}/${characterPower}/${name}`,
            label: name,
            id: name,
          }))}
        />
      }
      {characterPower && (
        <DataPanel area="power">
          {characterPowerSourceGlossary[characterPower].description} - {}
        </DataPanel>
      )}
      <Outlet />
    </>
  );
}

import { json, useParams, useLoaderData, Outlet } from "remix";

import {
  CharacterPowerSourceGlossary,
  CharacterPowerSource,
  CharacterClassName,
  CharacterClass,
  CharacterRole,
} from "~/helpers/types";
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
      {classList.length > 0 ? (
        <Selector
          area="class"
          active={characterClassName}
          data={classList.map(({ name }) => ({
            link: `/${characterRole}/${characterPower}/${name}`,
            label: name,
            id: name,
          }))}
        />
      ) : (
        <p style={{ gridArea: "class-data" }}>
          No {characterPower}/{characterRole} classes available
        </p>
      )}
      {characterPower && (
        <DataPanel area="power-data">
          {characterPowerSourceGlossary[characterPower].description}
        </DataPanel>
      )}
      <Outlet />
    </>
  );
}

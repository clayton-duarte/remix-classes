import { json, useParams, useLoaderData, Outlet } from "remix";

import {
  CharacterPowerSourceGlossary,
  CharacterClass,
  CharacterRole,
  PowerSource,
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
  characterPower: PowerSource;
  characterClass: CharacterClass["name"];
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
  const { characterRole, characterPower, characterClass } =
    useParams<RouteParams>();
  const { classList, characterPowerSourceGlossary } =
    useLoaderData<LoaderResponse>();

  return (
    <>
      {classList.length > 0 ? (
        <Selector
          area="class"
          active={characterClass}
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
        <DataPanel
          glossary={characterPowerSourceGlossary[characterPower]}
          area="power-data"
        />
      )}
      <Outlet />
    </>
  );
}

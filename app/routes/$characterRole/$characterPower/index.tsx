import { useEffect } from "react";
import { json, useParams, useLoaderData, useNavigate } from "remix";

import {
  CharacterPowerSourceGlossary,
  CharacterPowerSource,
  CharacterClass,
  CharacterRole,
} from "~/helpers/dataTypes";
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
  const navigate = useNavigate();

  const hasJustOneClass = classList.length === 1;
  const hasNoClass = classList.length === 0;

  useEffect(() => {
    document.getElementById("class-panel")?.scrollIntoView();
  }, [characterPower]);

  useEffect(() => {
    if (hasJustOneClass) {
      navigate(`/${characterRole}/${characterPower}/${classList[0].name}`);
    }
  }, [classList]);

  if (hasJustOneClass) {
    return null;
  }

  return (
    <>
      {characterPower && (
        <DataPanel area="power">
          {characterPowerSourceGlossary[characterPower].description}
        </DataPanel>
      )}

      {hasNoClass ? (
        <DataPanel area="class" color="error" title="error">
          There are no {characterRole}/{characterPower} classes available
        </DataPanel>
      ) : (
        <>
          <DataPanel area="class" color="warn" title="action">
            Please select a "Class" from the menu
          </DataPanel>
          <Selector
            area="class"
            data={classList.map(({ name }) => ({
              link: `/${characterRole}/${characterPower}/${name}`,
              label: name,
              id: name,
            }))}
          />
        </>
      )}
    </>
  );
}

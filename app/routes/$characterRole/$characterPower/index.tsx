import { useEffect } from "react";
import { json, useParams, useLoaderData, useNavigate } from "remix";

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
  const navigate = useNavigate();

  const hasJustOneClass = classList.length === 1;

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
        <DataPanel area="power-data">
          {characterPowerSourceGlossary[characterPower].description}
        </DataPanel>
      )}
      <Selector
        area="class"
        data={classList.map(({ name }) => ({
          link: `/${characterRole}/${characterPower}/${name}`,
          label: name,
          id: name,
        }))}
      />
      <DataPanel area="class-data" color="warn" title="action required">
        Please select a "Class" from the menu
      </DataPanel>
    </>
  );
}

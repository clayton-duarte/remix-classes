import { useLoaderData, useParams, Outlet, json } from "remix";

import DataPanel from "~/components/DataPanel";
import Selector from "~/components/Selector";
import { builderDynamicRoute } from "~/helpers";
import {
  CharBuilderChoices,
  PowerSourceName,
  CharacterRole,
} from "~/helpers/dataTypes";
import dbClient from "~/helpers/dbClient";
import FaunaCrud from "~/libs/FaunaCrud";

interface LoaderResponse {
  characterRole: CharacterRole;
  powerList: PowerSourceName[];
}

export const loader = async ({ params }: { params: CharBuilderChoices }) => {
  if (!params.characterRole) {
    throw new Response("Not Found", { status: 404 });
  }

  const rolesClient = new FaunaCrud<CharacterRole>("roles");
  const { data } = await rolesClient.getOneByName(params.characterRole);

  return json<LoaderResponse>({
    powerList: dbClient.fetchCharacterPowerSources(),
    characterRole: data,
  });
};

export default function Page() {
  const { powerList, characterRole } = useLoaderData<LoaderResponse>();
  const params = useParams<CharBuilderChoices>();

  return (
    <>
      <Selector
        area="power"
        active={params.characterPower}
        data={powerList.map((power) => ({
          link: builderDynamicRoute({
            ...params,
            characterPower: power,
          }),
          label: power,
          id: power,
        }))}
      />
      {characterRole && (
        <DataPanel area="role">{characterRole.description}</DataPanel>
      )}
      <Outlet />
    </>
  );
}

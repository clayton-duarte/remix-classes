import { useLoaderData, useParams, Outlet, json } from "remix";

import DataPanel from "~/components/DataPanel";
import Selector from "~/components/Selector";
import { builderDynamicRoute } from "~/helpers";
import {
  CharBuilderChoices,
  CharacterRole,
  PowerSource,
} from "~/helpers/types";
import { PowerSourcesService, CharacterRoleService } from "~/libs/FaunaService";

interface LoaderResponse {
  characterRole: CharacterRole;
  powerSourceList: PowerSource[];
}

export const loader = async ({ params }: { params: CharBuilderChoices }) => {
  if (!params.characterRole) {
    throw new Response("Not Found", { status: 404 });
  }

  const powerSourceClient = new PowerSourcesService();
  const rolesClient = new CharacterRoleService();

  const [{ data: characterRole }, { data: powerSourceList }] =
    await Promise.all([
      rolesClient.getOneByName(params.characterRole),
      powerSourceClient.getAll(),
    ]);

  return json<LoaderResponse>({
    powerSourceList,
    characterRole,
  });
};

export default function Page() {
  const { powerSourceList, characterRole } = useLoaderData<LoaderResponse>();
  const params = useParams<CharBuilderChoices>();

  return (
    <>
      <Selector
        area="power"
        active={params.characterPower}
        data={powerSourceList.map(({ name }) => ({
          link: builderDynamicRoute({
            ...params,
            characterPower: name,
          }),
          label: name,
          id: name,
        }))}
      />
      {characterRole && (
        <DataPanel area="role">{characterRole.description}</DataPanel>
      )}
      <Outlet />
    </>
  );
}

import { json, useLoaderData, Outlet, useParams } from "remix";

import BuilderLayout from "~/components/BuilderLayout";
import Selector from "~/components/Selector";
import { builderDynamicRoute } from "~/helpers";
import { CharacterRole, CharBuilderChoices } from "~/helpers/dataTypes";
import FaunaCrud from "~/libs/FaunaCrud";

interface LoaderResponse {
  roleList: CharacterRole[];
}

export const loader = async () => {
  const rolesClient = new FaunaCrud<CharacterRole>("roles");
  const { data: roleList } = await rolesClient.getMany();

  return json<LoaderResponse>({ roleList });
};

export default function Page() {
  const { roleList } = useLoaderData<LoaderResponse>();

  const {
    characterRole,
    characterPower,
    characterClassName,
    characterRaceName,
  } = useParams<CharBuilderChoices>();

  return (
    <BuilderLayout>
      <Selector
        area="role"
        active={characterRole}
        data={roleList.map(({ name }) => ({
          link: builderDynamicRoute({
            characterRole: name,
            characterClassName,
            characterRaceName,
            characterPower,
          }),
          label: name,
          id: name,
        }))}
      />
      <Outlet />
    </BuilderLayout>
  );
}

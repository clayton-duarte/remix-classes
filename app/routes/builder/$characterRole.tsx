import { json, useLoaderData, Outlet, useParams } from "remix";

import BuilderLayout from "~/components/BuilderLayout";
import Selector from "~/components/Selector";
import { builderDynamicRoute } from "~/helpers";
import { CharacterRoleName, CharBuilderChoices } from "~/helpers/dataTypes";
import dbClient from "~/helpers/dbClient";

interface LoaderResponse {
  roleList: CharacterRoleName[];
}

export const loader = async () => {
  return json<LoaderResponse>({ roleList: dbClient.fetchCharacterRoles() });
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
        data={roleList.map((role) => ({
          link: builderDynamicRoute({
            characterRole: role,
            characterClassName,
            characterRaceName,
            characterPower,
          }),
          label: role,
          id: role,
        }))}
      />
      <Outlet />
    </BuilderLayout>
  );
}

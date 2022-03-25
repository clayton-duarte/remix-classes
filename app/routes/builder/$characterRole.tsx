import { json, useLoaderData, Outlet, useParams } from "remix";

import BuilderLayout from "~/components/BuilderLayout";
import Selector from "~/components/Selector";
import { builderDynamicRoute } from "~/helpers";
import { fetchCharacterRoles } from "~/helpers/dataFetch";
import { CharacterRole, RouteParams } from "~/helpers/dataTypes";

interface LoaderResponse {
  roleList: CharacterRole[];
}

export const loader = async () => {
  return json({ roleList: fetchCharacterRoles() });
};

export default function Page() {
  const { roleList } = useLoaderData<LoaderResponse>();

  const {
    characterRole,
    characterPower,
    characterClassName,
    characterRaceName,
  } = useParams<RouteParams>();

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

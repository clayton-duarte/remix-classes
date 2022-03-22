import { json, useLoaderData, Outlet, useParams } from "remix";

import { CharacterRole, RouteParams } from "~/helpers/dataTypes";
import { fetchCharacterRoles } from "~/helpers/dataFetch";
import Selector from "~/components/Selector";
import { buildDynamicRoute } from "~/helpers";

type LoaderResponse = {
  roleList: CharacterRole[];
};

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
    <>
      <Selector
        area="role"
        active={characterRole}
        data={roleList.map((role) => ({
          link: buildDynamicRoute({
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
    </>
  );
}

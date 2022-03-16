import { json, useLoaderData, Outlet, useParams } from "remix";

import { fetchCharacterRoles } from "~/helpers/dataFetch";
import Selector from "~/components/Selector";
import { CharacterRole, PowerSource } from "~/helpers/data";

type LoaderResponse = {
  roleList: CharacterRole[];
};

type RouteParams = {
  characterRole: CharacterRole;
  characterPower?: PowerSource;
};

export const loader = async () => {
  return json({ roleList: fetchCharacterRoles() });
};

export default function Page() {
  const { characterRole, characterPower = "" } = useParams<RouteParams>();
  const { roleList } = useLoaderData<LoaderResponse>();
  return (
    <>
      <Selector
        area="role"
        active={characterRole}
        data={roleList.map((role) => ({
          link: `/${role}/${characterPower}`,
          label: role,
          id: role,
        }))}
      />
      <Outlet />
    </>
  );
}

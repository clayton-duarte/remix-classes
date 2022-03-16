import { json, useLoaderData, Outlet, useParams } from "remix";

import { fetchCharacterRoles } from "~/helpers/dataFetch";
import Selector from "~/components/Selector";
import { CharacterRole, PowerSource } from "~/helpers/data";

type LoaderResponse = {
  roleList: CharacterRole[];
};

export const loader = async () => {
  return json({ roleList: fetchCharacterRoles() });
};

export default function Page() {
  const { role, power = "" } =
    useParams<{ role: CharacterRole; power: PowerSource }>();
  const { roleList } = useLoaderData<LoaderResponse>();
  return (
    <>
      <Selector
        area="role"
        active={role}
        data={roleList.map((roleName) => ({
          link: `/${roleName}/${power}`,
          label: roleName,
          id: roleName,
        }))}
      />
      <Outlet />
    </>
  );
}

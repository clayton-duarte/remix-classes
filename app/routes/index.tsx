import { json, useLoaderData, Outlet, useParams } from "remix";

import { fetchCharacterRoles } from "~/helpers/dataFetch";
import Selector from "~/components/Selector";
import { CharacterRole } from "~/helpers/data";

type LoaderResponse = {
  roleList: CharacterRole[];
};

export const loader = async () => {
  return json({ roleList: fetchCharacterRoles() });
};

export default function Page() {
  const { roleList } = useLoaderData<LoaderResponse>();
  const { role } = useParams<{ role: CharacterRole }>();

  return (
    <main>
      <h1>role:</h1>
      <Selector
        data={roleList.map((roleName) => ({
          link: `/${roleName}`,
          label: roleName,
          id: roleName,
        }))}
        active={role}
      />
      <Outlet />
    </main>
  );
}

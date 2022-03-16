import { json, useLoaderData } from "remix";

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

  return (
    <>
      <Selector
        area="role"
        data={roleList.map((roleName) => ({
          link: `/${roleName}`,
          label: roleName,
          id: roleName,
        }))}
      />
      index data
    </>
  );
}

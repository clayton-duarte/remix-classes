import { json, useLoaderData } from "remix";

import { fetchCharacterRoles } from "~/helpers/dataFetch";
import Selector from "~/components/Selector";
import { CharacterRole } from "~/helpers/dataTypes";
import DataPanel from "~/components/DataPanel";

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
      <DataPanel area="role" color="warn" title="action">
        Please select a "Party Role" from the menu to see its definition.
      </DataPanel>
    </>
  );
}

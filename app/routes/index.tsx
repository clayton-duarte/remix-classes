import { json, useLoaderData, useParams } from "remix";

import { fetchCharacterRoles } from "~/helpers/dataFetch";
import Selector from "~/components/Selector";
import { CharacterRole, RouteParams } from "~/helpers/dataTypes";
import DataPanel from "~/components/DataPanel";
import { buildDynamicRoute } from "~/helpers";

type LoaderResponse = {
  roleList: CharacterRole[];
};

export const loader = async () => {
  return json({ roleList: fetchCharacterRoles() });
};

export default function Page() {
  const { roleList } = useLoaderData<LoaderResponse>();
  const { characterPower, characterClassName, characterRaceName } =
    useParams<RouteParams>();

  return (
    <>
      <Selector
        area="role"
        data={roleList.map((roleName) => ({
          link: buildDynamicRoute({
            characterRole: roleName,
            characterClassName,
            characterRaceName,
            characterPower,
          }),
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

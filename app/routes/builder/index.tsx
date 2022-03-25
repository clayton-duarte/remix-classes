import { json, useLoaderData, useParams } from "remix";

import BuilderLayout from "~/components/BuilderLayout";
import DataPanel from "~/components/DataPanel";
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

  const { characterPower, characterClassName, characterRaceName } =
    useParams<RouteParams>();

  return (
    <BuilderLayout>
      <Selector
        area="role"
        data={roleList.map((roleName) => ({
          link: builderDynamicRoute({
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
    </BuilderLayout>
  );
}

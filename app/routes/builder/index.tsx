import { json, useLoaderData, useParams } from "remix";

import BuilderLayout from "~/components/BuilderLayout";
import DataPanel from "~/components/DataPanel";
import Selector from "~/components/Selector";
import { builderDynamicRoute } from "~/helpers";
import { CharacterRoleName, CharBuilderChoices } from "~/helpers/dataTypes";
import dbClient from "~/helpers/dbClient";

interface LoaderResponse {
  roleList: CharacterRoleName[];
}

export const loader = async () => {
  const response = await dbClient.findAllCharacterRoles();

  console.log(response);

  return json({ roleList: dbClient.fetchCharacterRoles() });
};

export default function Page() {
  const { roleList } = useLoaderData<LoaderResponse>();

  const { characterPower, characterClassName, characterRaceName } =
    useParams<CharBuilderChoices>();

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

import { json, useLoaderData, useParams } from "remix";

import BuilderLayout from "~/components/BuilderLayout";
import DataPanel from "~/components/DataPanel";
import Selector from "~/components/Selector";
import { builderDynamicRoute } from "~/helpers";
import { CharBuilderChoices, CharacterRole } from "~/helpers/dataTypes";
import { CharacterRoleService } from "~/libs/FaunaService";

interface LoaderResponse {
  roleList: CharacterRole[];
}

export const loader = async () => {
  const rolesClient = new CharacterRoleService();
  const { data: roleList } = await rolesClient.getAll();

  return json<LoaderResponse>({ roleList });
};

export default function Page() {
  const { roleList } = useLoaderData<LoaderResponse>();

  const { characterPower, characterClassName, characterRaceName } =
    useParams<CharBuilderChoices>();

  return (
    <BuilderLayout>
      <Selector
        area="role"
        data={roleList.map(({ name }) => ({
          link: builderDynamicRoute({
            characterRole: name,
            characterClassName,
            characterRaceName,
            characterPower,
          }),
          label: name,
          id: name,
        }))}
      />
      <DataPanel area="role" color="warn" title="action">
        Please select a "Party Role" from the menu to see its definition.
      </DataPanel>
    </BuilderLayout>
  );
}

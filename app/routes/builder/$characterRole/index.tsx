import { useLoaderData, useParams, json } from "remix";

import DataPanel from "~/components/DataPanel";
import Selector from "~/components/Selector";
import { builderDynamicRoute } from "~/helpers";
import {
  CharBuilderChoices,
  CharacterRole,
  PowerSource,
} from "~/helpers/dataTypes";
import FaunaCrud from "~/libs/FaunaCrud";

interface LoaderResponse {
  characterRole: CharacterRole;
  powerSourceList: PowerSource[];
}

export const loader = async ({ params }: { params: CharBuilderChoices }) => {
  if (!params.characterRole) {
    throw new Response("Not Found", { status: 404 });
  }

  const powerSourceClient = new FaunaCrud<PowerSource>("power_sources");
  const rolesClient = new FaunaCrud<CharacterRole>("roles");

  const [{ data: characterRole }, { data: powerSourceList }] =
    await Promise.all([
      rolesClient.getOneByName(params.characterRole),
      powerSourceClient.getMany(),
    ]);

  return json<LoaderResponse>({
    powerSourceList,
    characterRole,
  });
};

export default function Page() {
  const { powerSourceList, characterRole } = useLoaderData<LoaderResponse>();
  const params = useParams<CharBuilderChoices>();

  return (
    <>
      <Selector
        area="power"
        data={powerSourceList.map(({ name }) => ({
          link: builderDynamicRoute({
            ...params,
            characterPower: name,
          }),
          label: name,
          id: name,
        }))}
      />

      <DataPanel area="role">{characterRole.description}</DataPanel>

      <DataPanel area="power" color="warn" title="action">
        Please select a "Source of Power" from the menu to know more about it.
      </DataPanel>
    </>
  );
}

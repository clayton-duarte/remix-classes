import { json, useParams, useLoaderData, redirect } from "remix";

import DataPanel from "~/components/DataPanel";
import Selector from "~/components/Selector";
import { builderDynamicRoute } from "~/helpers";
import {
  CharBuilderChoices,
  CharacterClass,
  PowerSource,
} from "~/helpers/dataTypes";
import dbClient from "~/helpers/dbClient";
import FaunaCrud from "~/libs/FaunaCrud";

interface LoaderResponse {
  powerSource: PowerSource;
  classList: CharacterClass[];
}

export const loader = async ({
  params,
  request,
}: {
  params: CharBuilderChoices;
  request: Request;
}) => {
  if (!params.characterRole || !params.characterPower) {
    throw new Response("Not Found", { status: 404 });
  }

  const classList = dbClient.fetchCharacterClassByRoleAndPower(
    params.characterRole,
    params.characterPower
  );

  if (classList.length === 1) {
    const nextRoute = builderDynamicRoute({
      ...params,
      characterClassName: classList[0].name,
    });

    const url = new URL(request.url);

    if (nextRoute !== url.pathname) {
      return redirect(nextRoute);
    }
  }

  const powerSourceClient = new FaunaCrud<PowerSource>("power_sources");

  const { data: powerSource } = await powerSourceClient.getOneByName(
    params.characterPower
  );

  return json<LoaderResponse>({
    powerSource,
    classList,
  });
};

export default function Page() {
  const { classList, powerSource } = useLoaderData<LoaderResponse>();
  const params = useParams<CharBuilderChoices>();

  return (
    <>
      <DataPanel area="power">{powerSource.description}</DataPanel>

      {classList.length === 0 ? (
        <DataPanel area="class" color="error" title="error">
          There are no {params.characterRole}/{params.characterPower} classes
          available.
        </DataPanel>
      ) : (
        <>
          <DataPanel area="class" color="warn" title="action">
            Please select one of the available "Classes" from the menu.
          </DataPanel>
          <Selector
            area="class"
            data={classList.map(({ name }) => ({
              link: builderDynamicRoute({
                ...params,
                characterClassName: name,
              }),
              label: name,
              id: name,
            }))}
          />
        </>
      )}
    </>
  );
}

import { json, useParams, useLoaderData, redirect } from "remix";

import {
  CharacterPowerSourceGlossary,
  CharacterClass,
  RouteParams,
} from "~/helpers/dataTypes";
import {
  fetchCharacterClassByRoleAndPower,
  fetchCharacterPowerSourcesGlossary,
} from "~/helpers/dataFetch";
import Selector from "~/components/Selector";
import DataPanel from "~/components/DataPanel";
import { buildDynamicRoute } from "~/helpers";

type LoaderResponse = {
  characterPowerSourceGlossary: CharacterPowerSourceGlossary;
  classList: CharacterClass[];
};

export const loader = async ({
  params,
  request,
}: {
  params: RouteParams;
  request: Request;
}) => {
  if (!params.characterRole || !params.characterPower) {
    throw new Response("Not Found", { status: 404 });
  }

  const classList = fetchCharacterClassByRoleAndPower(
    params.characterRole,
    params.characterPower
  );

  if (classList.length === 1) {
    const nextRoute = buildDynamicRoute({
      characterClassName: classList[0].name,
      characterRaceName: params.characterRaceName,
      characterPower: params.characterPower,
      characterRole: params.characterRole,
    });

    const url = new URL(request.url);

    if (nextRoute !== url.pathname) {
      return redirect(nextRoute);
    }
  }

  return json<LoaderResponse>({
    characterPowerSourceGlossary: fetchCharacterPowerSourcesGlossary(),
    classList,
  });
};

export default function Page() {
  const { classList, characterPowerSourceGlossary } =
    useLoaderData<LoaderResponse>();
  const { characterRole, characterPower, characterRaceName } =
    useParams<RouteParams>();

  return (
    <>
      {characterPower && (
        <DataPanel area="power">
          {characterPowerSourceGlossary[characterPower].description}
        </DataPanel>
      )}

      {classList.length === 0 ? (
        <DataPanel area="class" color="error" title="error">
          There are no {characterRole}/{characterPower} classes available.
        </DataPanel>
      ) : (
        <>
          <DataPanel area="class" color="warn" title="action">
            Please select one of the available "Classes" from the menu.
          </DataPanel>
          <Selector
            area="class"
            data={classList.map(({ name }) => ({
              link: buildDynamicRoute({
                characterClassName: name,
                characterRaceName,
                characterPower,
                characterRole,
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

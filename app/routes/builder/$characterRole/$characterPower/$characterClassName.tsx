import {
  LoaderFunction,
  useLoaderData,
  useParams,
  redirect,
  Outlet,
  json,
} from "remix";

import DataPanel from "~/components/DataPanel";
import Selector from "~/components/Selector";
import { builderDynamicRoute } from "~/helpers";
import {
  fetchCharacterPowerSourcesGlossary,
  fetchCharacterClassByRoleAndPower,
} from "~/helpers/dataFetch";
import {
  CharacterPowerSourceGlossary,
  CharacterClass,
  CharBuilderChoices,
} from "~/helpers/dataTypes";

interface LoaderResponse {
  characterPowerSourceGlossary: CharacterPowerSourceGlossary;
  classList: CharacterClass[];
}

export const loader: LoaderFunction = async ({
  params,
  request,
}: {
  params: CharBuilderChoices;
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
    const nextRoute = builderDynamicRoute({
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

  const {
    characterRole,
    characterPower,
    characterClassName,
    characterRaceName,
  } = useParams<CharBuilderChoices>();

  return (
    <>
      {characterPower && (
        <DataPanel area="power">
          {characterPowerSourceGlossary[characterPower].description}
        </DataPanel>
      )}
      {classList.length === 0 ? (
        <DataPanel area="class" color="error" title="error">
          There are no {characterRole}/{characterPower} classes available
        </DataPanel>
      ) : (
        <>
          <Selector
            area="class"
            active={characterClassName}
            data={classList.map(({ name }) => ({
              link: builderDynamicRoute({
                characterClassName: name,
                characterRaceName,
                characterPower,
                characterRole,
              }),
              label: name,
              id: name,
            }))}
          />
          <Outlet />
        </>
      )}
    </>
  );
}

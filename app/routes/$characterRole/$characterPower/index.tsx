import { json, useParams, useLoaderData } from "remix";

import { CharacterClass, CharacterRole, PowerSource } from "~/helpers/data";
import { fetchCharacterClassByRoleAndPower } from "~/helpers/dataFetch";
import Selector from "~/components/Selector";

type LoaderResponse = {
  classList: CharacterClass[];
};

type RouteParams = {
  characterRole: CharacterRole;
  characterPower: PowerSource;
};

export const loader = async ({ params }: { params: RouteParams }) => {
  return json<LoaderResponse>({
    classList: fetchCharacterClassByRoleAndPower(
      params.characterRole,
      params.characterPower
    ),
  });
};

export default function Page() {
  const { classList } = useLoaderData<LoaderResponse>();
  const { characterRole, characterPower } = useParams<RouteParams>();

  return (
    <>
      {classList.length > 0 ? (
        <Selector
          area="class"
          data={classList.map(({ name }) => ({
            link: `/${characterRole}/${characterPower}/${name}`,
            label: name,
            id: name,
          }))}
        />
      ) : (
        <p>
          No{" "}
          <strong>
            {characterPower}/{characterRole}
          </strong>{" "}
          classes available at the moment
        </p>
      )}
      {characterPower} data
    </>
  );
}

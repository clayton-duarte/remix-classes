import { json, useParams, useLoaderData, Outlet } from "remix";

import { CharacterClass, CharacterRole, PowerSource } from "~/helpers/data";
import { fetchCharacterClassByRoleAndPower } from "~/helpers/dataFetch";
import Selector from "~/components/Selector";

type LoaderResponse = {
  classList: CharacterClass[];
};

type RouteParams = {
  characterRole: CharacterRole;
  characterPower: PowerSource;
  characterClass: CharacterClass["name"];
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
  const { characterRole, characterPower, characterClass } =
    useParams<RouteParams>();
  const { classList } = useLoaderData<LoaderResponse>();

  return (
    <>
      {classList.length > 0 ? (
        <Selector
          area="class"
          active={characterClass}
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
      <Outlet />
    </>
  );
}

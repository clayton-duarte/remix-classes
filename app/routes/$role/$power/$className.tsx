import { useMemo } from "react";
import { json, useParams, useLoaderData, Outlet } from "remix";

import { CharacterClass, CharacterRole, PowerSource } from "~/helpers/data";
import { fetchCharacterClasses } from "~/helpers/dataFetch";
import Selector from "~/components/Selector";

type LoaderResponse = {
  classList: CharacterClass[];
};

type RouteParams = {
  role: CharacterRole;
  power: PowerSource;
  className: string;
};

export const loader = async () => {
  return json<LoaderResponse>({
    classList: fetchCharacterClasses(),
  });
};

export default function Page() {
  const { classList } = useLoaderData<LoaderResponse>();
  const { role, power, className } = useParams<RouteParams>();

  const filteredClasses = useMemo(() => {
    return classList.filter(
      ({ mainRole, powerSource }) =>
        role != null && // safety check
        powerSource === power && // same power source
        mainRole === role // same main role
    );
  }, [role, power]);

  return (
    <>
      {filteredClasses.length > 0 ? (
        <Selector
          area="class"
          active={className}
          data={filteredClasses.map(({ name }) => ({
            link: `/${role}/${power}/${name}`,
            label: name,
            id: name,
          }))}
        />
      ) : (
        <p>
          No{" "}
          <strong>
            {power}/{role}
          </strong>{" "}
          classes available at the moment
        </p>
      )}
      <Outlet />
    </>
  );
}

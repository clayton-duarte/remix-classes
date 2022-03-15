import { Link, json, useLoaderData } from "remix";

import { fetchCharacterRoles } from "~/helpers/dataFetch";
import { CharacterRole } from "~/helpers/data";

type LoaderResponse = {
  roleList: CharacterRole[];
};

export const loader = async () => {
  return json({ roleList: fetchCharacterRoles() });
};

export default function Page() {
  const { roleList } = useLoaderData<LoaderResponse>();
  console.log(roleList);

  return (
    <main>
      <h1>Choose your role:</h1>
      <ul>
        {roleList.map((role) => (
          <li key={role}>
            <Link to={`/${role}`}>{role}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

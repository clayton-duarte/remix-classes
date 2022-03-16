import { Link, useParams } from "remix";

import { PowerSource, CharacterRole, CharacterClass } from "~/helpers/data";

export function RecommendedClasses({
  classList,
}: {
  classList: CharacterClass[];
}): JSX.Element {
  const { role, power } =
    useParams<{ role: CharacterRole; power: PowerSource }>();

  if (classList.length === 0) {
    return <></>;
  }

  return (
    <>
      {classList.map(({ name }) => {
        return <Link to={`/${role}/${power}/${name}`}>{name}</Link>;
      })}
    </>
  );

  if (classList.length === 1) {
    return (
      <>
        <h3>Recommended class: {classList[0].name}</h3>
      </>
    );
  }

  return (
    <>
      <h3>Recommended classes:</h3>
      <ul>
        {classList.map(({ name }) => (
          <li key={name}>
            <Link to={`/${role}/${power}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

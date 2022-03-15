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
    return (
      <>
        <p>
          No{" "}
          <strong>
            {power} {role}
          </strong>{" "}
          classes available at the moment
        </p>
        <Link to={`/`}>Please try a different combination</Link>
      </>
    );
  }

  if (classList.length === 1) {
    return (
      <>
        <h3>Recommended class: {classList[0].name}</h3>
        <Link to={`/`}>or try a different combination</Link>
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
      <Link to={`/`}>Or try a different combination</Link>
    </>
  );
}

import { Link, useParams } from "remix";
import { PowerSource, CharacterRole } from "~/helpers/data";

export default function BuilderNavBar() {
  const { role, power } =
    useParams<{ role: CharacterRole; power: PowerSource }>();

  return (
    <nav>
      <Link to={`/`}>back</Link>
      {role && <span> Role: {role}</span>}
      {power && <span> Power: {power}</span>}
    </nav>
  );
}

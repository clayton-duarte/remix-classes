import { Link, useParams } from "remix";
import { CharacterRole, PowerSource } from "../helpers/data";

export default function ChooseYourPower({
  powerList,
}: {
  powerList: PowerSource[];
}) {
  const { role } = useParams<{ role: CharacterRole }>();

  return (
    <ul>
      {powerList.map((power) => (
        <li key={power}>
          <Link to={`/${role}/${power}`}>{power}</Link>
        </li>
      ))}
    </ul>
  );
}

import { useMemo } from "react";
import { Link } from "remix";
import { Ability, CharacterRace } from "~/helpers/data";

export function SuggestedRaces({
  keyAbilities,
  raceList,
}: {
  keyAbilities: Ability[];
  raceList: CharacterRace[];
}): JSX.Element {
  const filteredAndSortedRaces = useMemo(() => {
    const [coreAbility] = keyAbilities;
    return raceList
      .reduce((filteredRaces, currentRace): CharacterRace[] => {
        const withFilteredAbilities = {
          ...currentRace,
          abilityBonus: currentRace.abilityBonus.filter((ability) =>
            keyAbilities.includes(ability)
          ),
        };

        if (
          withFilteredAbilities.abilityBonus.length > 1 &&
          withFilteredAbilities.abilityBonus.includes(coreAbility)
        ) {
          filteredRaces.push(withFilteredAbilities);
        }

        return filteredRaces;
      }, [] as CharacterRace[])
      .sort(({ abilityBonus: a }, { abilityBonus: b }) => b.length - a.length);
  }, [raceList, keyAbilities]);

  return (
    <>
      <h3>Recommended Races</h3>
      <div key={`race-suggestions-for-${name}`}>
        <p>{keyAbilities.join(", ")}</p>
        {filteredAndSortedRaces.map(({ name, abilityBonus }) => (
          <li key={name}>
            <Link to={`/race/${name}`}>
              ({abilityBonus.length}) {name}: {abilityBonus.join(", ")}
            </Link>
          </li>
        ))}
      </div>
    </>
  );
}

import { useCallback } from "react";
import { Link } from "remix";
import { CharacterClass, CharacterRace, Ability } from "~/helpers/data";

export function SuggestedRaces({
  classList,
  raceList,
}: {
  classList: CharacterClass[];
  raceList: CharacterRace[];
}): JSX.Element {
  const filteredAndSortedRaces = useCallback(
    (keyAbilities: Ability[]) => {
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
        .sort(
          ({ abilityBonus: a }, { abilityBonus: b }) => b.length - a.length
        );
    },
    [raceList, classList]
  );

  return (
    <>
      <h3>Recommended Races</h3>
      {classList.map(({ name, keyAbilities }) => {
        // const [coreAbility] = keyAbilities;

        return (
          <div key={`race-suggestions-for-${name}`}>
            {classList.length > 1 ? (
              <p>
                {name}: {keyAbilities.join(", ")}
              </p>
            ) : (
              <p>{keyAbilities.join(", ")}</p>
            )}
            {filteredAndSortedRaces(keyAbilities).map(
              ({ name, abilityBonus }) => (
                <li key={name}>
                  <Link to={`/race/${name}`}>
                    ({abilityBonus.length}) {name}: {abilityBonus.join(", ")}
                  </Link>
                </li>
              )
            )}
          </div>
        );
      })}
    </>
  );
}

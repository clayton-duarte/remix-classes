import { Fragment, useEffect, useState } from "react";
import { Theme } from "@emotion/react";
import styled from "@emotion/styled";

import AbilityPointSelector from "~/components/AbilityPoints/AbilityPointSelector";
import RacialBonusCheckbox from "~/components/AbilityPoints/RacialBonusCheckbox";
import {
  initialScorePointsDistribution,
  ABILITY_BONUS_LIMIT,
  BASE_ABILITY_SCORE,
  SCORE_COSTS,
} from "~/components/AbilityPoints/consts";
import {
  CharacterAbility,
  CharacterClass,
  CharacterRace,
} from "~/helpers/types";

const StyledWrapper = styled.div`
  grid-template-columns: auto auto 1fr auto;
  justify-content: flex-start;
  align-items: center;
  display: grid;
  gap: 1rem;
`;

const StyledAbilityLabel = styled.label<{ color: keyof Theme }>`
  color: ${({ theme, color }) => theme[color]};
  text-transform: uppercase;
  font-weight: 700;
`;

export default function AbilityPoints({
  characterAbilities,
  characterClass,
  characterRace,
}: {
  characterAbilities: CharacterAbility[];
  characterClass: CharacterClass;
  characterRace: CharacterRace;
}) {
  const [selectedAbilityBonus, setSelectedAbilityBonus] = useState<
    CharacterAbility[]
  >([]);
  const [scorePointsDistribution, setScorePointsDistribution] = useState(
    initialScorePointsDistribution
  );

  useEffect(() => {
    if (characterRace.abilityBonus.length === ABILITY_BONUS_LIMIT) {
      // just select them all!
      setSelectedAbilityBonus(characterRace.abilityBonus);
      return;
    }

    if (characterRace.abilityBonus.length > ABILITY_BONUS_LIMIT) {
      // we could pre-select some of the class key abilities
      const relevantAbilities = characterRace.abilityBonus.filter((ability) =>
        characterClass.keyAbilities.includes(ability)
      );
      if (relevantAbilities.length <= ABILITY_BONUS_LIMIT) {
        setSelectedAbilityBonus(relevantAbilities);
        return;
      }
    }

    setSelectedAbilityBonus([]);
  }, [characterClass, characterRace]);

  return (
    <StyledWrapper>
      {characterAbilities.map((ability) => {
        const isSelected = selectedAbilityBonus.includes(ability);
        const classAbilityIndex = characterClass.keyAbilities.indexOf(ability);
        const isRacialAbilityBonus =
          characterRace.abilityBonus.includes(ability);
        const dontNeedToSelect =
          characterRace.abilityBonus.length === ABILITY_BONUS_LIMIT;
        const reachedSelectionLimit =
          selectedAbilityBonus.length === ABILITY_BONUS_LIMIT;
        const racialBonus = isSelected ? 2 : 0;

        return (
          <Fragment key={`bonus-selector-${ability}`}>
            <StyledAbilityLabel
              color={
                classAbilityIndex < 0
                  ? "secondary"
                  : classAbilityIndex === 0
                  ? "success"
                  : "warn"
              }
            >
              {ability.slice(0, 3)}
            </StyledAbilityLabel>
            <RacialBonusCheckbox
              checked={isSelected}
              disabled={
                !isRacialAbilityBonus || // cant select at all
                (!isSelected && reachedSelectionLimit) || // cant select, but can un-select
                dontNeedToSelect // there's no other possible combination
              }
              onChange={() => {
                const checkedIndex = selectedAbilityBonus.indexOf(ability);

                if (
                  checkedIndex < 0 &&
                  selectedAbilityBonus.length < ABILITY_BONUS_LIMIT
                ) {
                  // add
                  return setSelectedAbilityBonus([
                    ...selectedAbilityBonus,
                    ability,
                  ]);
                }

                // remove by index
                return setSelectedAbilityBonus(
                  selectedAbilityBonus.filter(
                    (_, index) => checkedIndex !== index
                  )
                );
              }}
            />
            <AbilityPointSelector
              setScorePointsDistribution={setScorePointsDistribution}
              scorePointsDistribution={scorePointsDistribution}
              baseScore={BASE_ABILITY_SCORE + racialBonus}
              ability={ability}
            />
            <span>
              +
              {Math.floor(
                (Number(SCORE_COSTS[scorePointsDistribution[ability]]) +
                  Number(racialBonus) -
                  BASE_ABILITY_SCORE) /
                  2
              )}
            </span>
          </Fragment>
        );
      })}
    </StyledWrapper>
  );
}

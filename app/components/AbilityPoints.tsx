import { Dispatch, Fragment, useEffect } from "react";
import { Theme } from "@emotion/react";
import styled from "@emotion/styled";

import AbilityPointSelector from "~/components/AbilityPointSelector";
import BonusCheckbox from "~/components/BonusCheckbox";
import ModifierLabel from "~/components/ModifierLabel";
import {
  initialScorePointsDistribution,
  ABILITY_BONUS_LIMIT,
  BASE_ABILITY_SCORE,
  SCORE_COSTS,
} from "~/helpers/consts";
import {
  CharacterAbility,
  CharacterClass,
  CharacterRace,
} from "~/helpers/dataTypes";

const StyledWrapper = styled.div`
  grid-template-columns: auto auto 1fr auto;
  justify-content: flex-start;
  justify-items: center;
  align-items: center;
  display: grid;
  gap: 1rem;
  @media all and (max-width: 768px) {
    gap: 0.75rem;
  }
`;

const StyledAbilityLabel = styled.label<{ color: keyof Theme }>`
  color: ${({ theme, color }) => theme[color]};
  text-transform: uppercase;
  justify-self: start;
  font-weight: 700;
`;

const StyledHeaders = styled.h5`
  font-size: 0.75rem;
  @media all and (max-width: 768px) {
    font-size: 0.5rem;
  }
`;

export default function AbilityPoints({
  setScorePointsDistribution,
  setSelectedAbilityBonus,
  scorePointsDistribution,
  selectedAbilityBonus,
  characterAbilities,
  characterClass,
  characterRace,
}: {
  setScorePointsDistribution: Dispatch<typeof initialScorePointsDistribution>;
  scorePointsDistribution: typeof initialScorePointsDistribution;
  setSelectedAbilityBonus: Dispatch<CharacterAbility[]>;
  selectedAbilityBonus: CharacterAbility[];
  characterAbilities: CharacterAbility[];
  characterClass: CharacterClass;
  characterRace: CharacterRace;
}) {
  useEffect(() => {
    if (characterRace.abilityBonus.length === ABILITY_BONUS_LIMIT) {
      // just select them all!
      return setSelectedAbilityBonus(characterRace.abilityBonus);
    }

    if (characterRace.abilityBonus.length > ABILITY_BONUS_LIMIT) {
      // we could pre-select some of the class key abilities
      const relevantAbilities = characterRace.abilityBonus.filter((ability) =>
        characterClass.keyAbilities.includes(ability)
      );
      if (relevantAbilities.length <= ABILITY_BONUS_LIMIT) {
        return setSelectedAbilityBonus(relevantAbilities);
      }
    }
  }, [characterClass, characterRace]);

  return (
    <StyledWrapper>
      <span />
      <StyledHeaders>bonus</StyledHeaders>
      <StyledHeaders>score</StyledHeaders>
      <StyledHeaders>mod.</StyledHeaders>
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
        const isMobile =
          typeof window !== "undefined" && window.innerWidth < 769;

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
              {isMobile ? ability.slice(0, 3) : ability}
            </StyledAbilityLabel>
            <BonusCheckbox
              checked={isSelected}
              disabled={
                (!isSelected && reachedSelectionLimit) || // cant select, but can un-select
                !isRacialAbilityBonus || // cant select at all
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
            <ModifierLabel>
              {Math.floor(
                (Number(SCORE_COSTS[scorePointsDistribution[ability]]) +
                  Number(racialBonus) -
                  BASE_ABILITY_SCORE) /
                  2
              )}
            </ModifierLabel>
          </Fragment>
        );
      })}
    </StyledWrapper>
  );
}

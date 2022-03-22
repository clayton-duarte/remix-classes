import { Dispatch, useEffect, useMemo } from "react";

import { Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { useLoaderData } from "remix";

import AbilityStepper from "~/components/AbilityStepper";
import BonusCheckbox from "~/components/BonusCheckbox";
import ModifierLabel from "~/components/ModifierLabel";
import SkillCalculator from "~/components/SkillCalculator";
import {
  initialScorePointsDistribution,
  ABILITY_SCORE_BONUS_VALUE,
  ABILITY_BONUS_LIMIT,
  BASE_ABILITY_SCORE,
  SCORE_COSTS,
} from "~/helpers/consts";
import {
  CharacterAbility,
  CharacterClass,
  CharacterRace,
  SkillGlossary,
  SkillName,
} from "~/helpers/dataTypes";

const StyledAbilityLabel = styled.label<{ color: keyof Theme }>`
  color: ${({ theme, color }) => theme[color]};
  text-transform: uppercase;
  justify-self: start;
  font-size: 0.825rem;
  font-weight: 700;
`;

export default function AbilityCalculator({
  setScorePointsDistribution,
  setSelectedAbilityBonus,
  scorePointsDistribution,
  selectedAbilityBonus,
  setTrainedSkills,
  trainedSkills,
  keyAbility,
}: {
  setScorePointsDistribution: Dispatch<typeof initialScorePointsDistribution>;
  scorePointsDistribution: typeof initialScorePointsDistribution;
  setSelectedAbilityBonus: Dispatch<CharacterAbility[]>;
  selectedAbilityBonus: CharacterAbility[];
  setTrainedSkills: Dispatch<SkillName[]>;
  trainedSkills: SkillName[];
  keyAbility: CharacterAbility;
}): JSX.Element {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 769;

  const { characterClass, characterRace, skillGlossary } = useLoaderData<{
    characterAbilities: CharacterAbility[];
    characterClass: CharacterClass;
    characterRace: CharacterRace;
    skillGlossary: SkillGlossary;
  }>();

  const isAbilitySelected = selectedAbilityBonus.includes(keyAbility);
  const classAbilityIndex = characterClass.keyAbilities.indexOf(keyAbility);
  const isRacialAbilityBonus = characterRace.abilityBonus.includes(keyAbility);

  const dontNeedToSelect =
    characterRace.abilityBonus.length === ABILITY_BONUS_LIMIT;

  const reachedSelectionLimit =
    selectedAbilityBonus.length === ABILITY_BONUS_LIMIT;

  const racialBonus = isAbilitySelected ? ABILITY_SCORE_BONUS_VALUE : 0;

  const skillByAbilityMap = useMemo(() => {
    return Object.values(skillGlossary).reduce((acc, { keyAbility, name }) => {
      const currentList = acc[keyAbility] ?? [];

      return {
        ...acc,
        [keyAbility]: [...currentList, name],
      };
    }, {} as { [key in CharacterAbility]: SkillName[] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const abilityModifier = Math.floor(
    (Number(SCORE_COSTS[scorePointsDistribution[keyAbility]]) +
      Number(racialBonus) -
      BASE_ABILITY_SCORE) /
      ABILITY_SCORE_BONUS_VALUE
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
      }
    }
  }, [characterClass, characterRace, setSelectedAbilityBonus]);

  return (
    <>
      <BonusCheckbox
        checked={isAbilitySelected}
        badge
        disabled={
          (!isAbilitySelected && reachedSelectionLimit) || // cant select, but can un-select
          !isRacialAbilityBonus || // cant select at all
          dontNeedToSelect // there's no other possible combination
        }
        onChange={() => {
          const checkedIndex = selectedAbilityBonus.indexOf(keyAbility);

          if (
            checkedIndex < 0 &&
            selectedAbilityBonus.length < ABILITY_BONUS_LIMIT
          ) {
            // add
            return setSelectedAbilityBonus([
              ...selectedAbilityBonus,
              keyAbility,
            ]);
          }

          // remove by index
          return setSelectedAbilityBonus(
            selectedAbilityBonus.filter((_, index) => checkedIndex !== index)
          );
        }}
      />
      <StyledAbilityLabel
        color={
          classAbilityIndex < 0
            ? "black"
            : classAbilityIndex === 0
            ? "success"
            : "warn"
        }
      >
        {isMobile ? keyAbility.slice(0, 3) : keyAbility}
      </StyledAbilityLabel>
      <AbilityStepper
        setScorePointsDistribution={setScorePointsDistribution}
        scorePointsDistribution={scorePointsDistribution}
        baseScore={BASE_ABILITY_SCORE + racialBonus}
        ability={keyAbility}
      />
      <ModifierLabel>{abilityModifier}</ModifierLabel>
      {skillByAbilityMap[keyAbility].map((skillName) => (
        <SkillCalculator
          key={`${skillName}-skill-calculator`}
          setTrainedSkills={setTrainedSkills}
          abilityModifier={abilityModifier}
          trainedSkills={trainedSkills}
          skillName={skillName}
        />
      ))}
    </>
  );
}

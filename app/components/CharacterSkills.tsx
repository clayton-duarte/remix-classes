import { Dispatch, Fragment, useEffect } from "react";
import { Theme } from "@emotion/react";
import styled from "@emotion/styled";

import AbilityPointSelector from "~/components/AbilityPointSelector";
import BonusCheckbox from "~/components/BonusCheckbox";
import ModifierLabel from "~/components/ModifierLabel";
import {
  initialScorePointsDistribution,
  TRAINED_SKILL_BONUS_VALUE,
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

const Wrapper = styled.div`
  grid-template-columns: auto auto 1fr auto;
  justify-items: center;
  align-items: center;
  gap: 0.6rem 1rem;
  display: grid;
`;

const StyledHelperText = styled.span`
  justify-self: flex-start;
  font-size: 0.75rem;
`;

const StyledAbilityLabel = styled.label<{ color: keyof Theme }>`
  color: ${({ theme, color }) => theme[color]};
  text-transform: uppercase;
  justify-self: start;
  font-size: 0.825rem;
  font-weight: 700;
`;

const StyledSkillLabel = styled.summary`
  justify-self: start;
  font-size: 0.75rem;
`;

export default function CharacterSkills({
  setScorePointsDistribution,
  setSelectedAbilityBonus,
  scorePointsDistribution,
  selectedAbilityBonus,
  characterAbilities,
  setTrainedSkills,
  characterClass,
  characterRace,
  trainedSkills,
  skillGlossary,
}: {
  setScorePointsDistribution: Dispatch<typeof initialScorePointsDistribution>;
  scorePointsDistribution: typeof initialScorePointsDistribution;
  setSelectedAbilityBonus: Dispatch<CharacterAbility[]>;
  selectedAbilityBonus: CharacterAbility[];
  setTrainedSkills: Dispatch<SkillName[]>;
  characterAbilities: CharacterAbility[];
  characterClass: CharacterClass;
  skillGlossary: SkillGlossary;
  characterRace: CharacterRace;
  trainedSkills: SkillName[];
}): JSX.Element {
  const skillByAbilityMap = Object.values(skillGlossary).reduce(
    (acc, { keyAbility, name }) => {
      const currentList = acc[keyAbility] ?? [];
      return {
        ...acc,
        [keyAbility]: [...currentList, name],
      };
    },
    {} as { [key in CharacterAbility]: SkillName[] }
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
  }, [characterClass, characterRace]);

  useEffect(() => {
    const { skillChoices, skillList } = characterClass;

    const filteredSkills = trainedSkills
      .filter((skillName) => skillList.includes(skillName))
      .slice(0, skillChoices);

    setTrainedSkills(filteredSkills);
  }, [characterClass, characterRace]);

  return (
    <Wrapper>
      {characterAbilities.map((keyAbility) => {
        const isAbilitySelected = selectedAbilityBonus.includes(keyAbility);
        const classAbilityIndex =
          characterClass.keyAbilities.indexOf(keyAbility);
        const isRacialAbilityBonus =
          characterRace.abilityBonus.includes(keyAbility);
        const dontNeedToSelect =
          characterRace.abilityBonus.length === ABILITY_BONUS_LIMIT;
        const reachedSelectionLimit =
          selectedAbilityBonus.length === ABILITY_BONUS_LIMIT;
        const racialBonus = isAbilitySelected ? ABILITY_SCORE_BONUS_VALUE : 0;
        const isMobile =
          typeof window !== "undefined" && window.innerWidth < 769;
        const abilityModifier = Math.floor(
          (Number(SCORE_COSTS[scorePointsDistribution[keyAbility]]) +
            Number(racialBonus) -
            BASE_ABILITY_SCORE) /
            ABILITY_SCORE_BONUS_VALUE
        );

        return (
          <Fragment key={`${keyAbility}-ability-selector`}>
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
                  selectedAbilityBonus.filter(
                    (_, index) => checkedIndex !== index
                  )
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
            <AbilityPointSelector
              setScorePointsDistribution={setScorePointsDistribution}
              scorePointsDistribution={scorePointsDistribution}
              baseScore={BASE_ABILITY_SCORE + racialBonus}
              ability={keyAbility}
            />
            <ModifierLabel>{abilityModifier}</ModifierLabel>
            {skillByAbilityMap[keyAbility].map((skillName, index) => {
              const canLearnSkill =
                characterClass.skillList.includes(skillName);
              const isClassSkill =
                characterClass.trainedSkills.includes(skillName);
              const skillChoiceLimit = characterClass.skillChoices;
              const isSkillSelected = trainedSkills.includes(skillName);
              const reachedSelectionLimit =
                trainedSkills.length === skillChoiceLimit;

              return (
                <Fragment key={`${skillName}-skill-selector`}>
                  {isMobile && <span />}
                  <BonusCheckbox
                    disabled={
                      (!isSkillSelected && reachedSelectionLimit) || // cant select, but can un-select
                      !canLearnSkill || // cant select at all
                      isClassSkill // there's no other possible combination
                    }
                    checked={isSkillSelected}
                    onChange={() => {
                      const checkedIndex = trainedSkills.indexOf(skillName);

                      if (
                        checkedIndex < 0 &&
                        trainedSkills.length < skillChoiceLimit
                      ) {
                        // add
                        return setTrainedSkills([...trainedSkills, skillName]);
                      }

                      // remove by index
                      return setTrainedSkills(
                        trainedSkills.filter(
                          (_, index) => checkedIndex !== index
                        )
                      );
                    }}
                  />
                  {!isMobile && (
                    <StyledSkillLabel>{skillName}</StyledSkillLabel>
                  )}
                  {isMobile ? (
                    <StyledSkillLabel>{skillName}</StyledSkillLabel>
                  ) : (
                    <StyledHelperText>
                      {`${Number(
                        isSkillSelected ? TRAINED_SKILL_BONUS_VALUE : 0
                      )} from training +${abilityModifier} ability bonus`}
                    </StyledHelperText>
                  )}
                  <ModifierLabel small>
                    {Number(abilityModifier) +
                      Number(isSkillSelected ? TRAINED_SKILL_BONUS_VALUE : 0)}
                  </ModifierLabel>
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
    </Wrapper>
  );
}

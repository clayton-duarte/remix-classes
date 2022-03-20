import { Dispatch, Fragment } from "react";
import styled from "@emotion/styled";

import BonusCheckbox from "~/components/BonusCheckbox";
import ModifierLabel from "~/components/ModifierLabel";
import {
  initialScorePointsDistribution,
  BASE_ABILITY_SCORE,
  SCORE_COSTS,
} from "~/components/AbilityPoints/consts";
import {
  CharacterAbility,
  CharacterClass,
  SkillGlossary,
  SkillName,
} from "~/helpers/dataTypes";

const Wrapper = styled.div`
  grid-template-columns: auto auto auto auto;
  justify-items: center;
  gap: 0.6rem 1rem;
  display: grid;
`;

const StyledLabel = styled.summary`
  justify-self: start;
`;

const StyledHeader = styled.h5`
  font-size: 0.75rem;
`;

export default function CharacterSkills({
  scorePointsDistribution,
  selectedAbilityBonus,
  setTrainedSkills,
  characterClass,
  trainedSkills,
  skillGlossary,
}: {
  scorePointsDistribution: typeof initialScorePointsDistribution;
  selectedAbilityBonus: CharacterAbility[];
  setTrainedSkills: Dispatch<SkillName[]>;
  characterClass: CharacterClass;
  skillGlossary: SkillGlossary;
  trainedSkills: SkillName[];
}): JSX.Element {
  console.log({
    scorePointsDistribution,
    selectedAbilityBonus,
    setTrainedSkills,
    characterClass,
    trainedSkills,
    skillGlossary,
  });

  return (
    <Wrapper>
      <span />
      <StyledHeader>ability</StyledHeader>
      <StyledHeader>trained</StyledHeader>
      <StyledHeader>mod.</StyledHeader>
      {Object.values(skillGlossary).map(({ name, keyAbility }) => {
        const abilityModifier = Math.floor(
          (Number(SCORE_COSTS[scorePointsDistribution[keyAbility]]) +
            Number(selectedAbilityBonus.includes(keyAbility) ? 2 : 0) -
            BASE_ABILITY_SCORE) /
            2
        );
        const canLearnSkill = characterClass.skillList.includes(name);
        const isClassSkill = characterClass.trainedSkills.includes(name);
        const skillChoiceLimit = characterClass.skillChoices;
        const isSelected = trainedSkills.includes(name);
        const reachedSelectionLimit = trainedSkills.length === skillChoiceLimit;

        return (
          <Fragment key={`${name}-skill-row`}>
            <StyledLabel>{name}</StyledLabel>
            <h5>+{abilityModifier}</h5>
            <BonusCheckbox
              disabled={
                (!isSelected && reachedSelectionLimit) || // cant select, but can un-select
                !canLearnSkill || // cant select at all
                isClassSkill // there's no other possible combination
              }
              checked={isSelected}
              onChange={() => {
                const checkedIndex = trainedSkills.indexOf(name);

                if (
                  checkedIndex < 0 &&
                  trainedSkills.length < skillChoiceLimit
                ) {
                  // add
                  return setTrainedSkills([...trainedSkills, name]);
                }

                // remove by index
                return setTrainedSkills(
                  trainedSkills.filter((_, index) => checkedIndex !== index)
                );
              }}
            />
            <ModifierLabel>
              {Number(abilityModifier) + Number(isSelected ? 5 : 0)}
            </ModifierLabel>
          </Fragment>
        );
      })}
    </Wrapper>
  );
}

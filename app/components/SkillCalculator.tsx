import { Dispatch, useEffect, useMemo } from "react";

import styled from "@emotion/styled";
import { useLoaderData } from "remix";

import BonusCheckbox from "~/components/BonusCheckbox";
import ModifierLabel from "~/components/ModifierLabel";
import { TRAINED_SKILL_BONUS_VALUE } from "~/helpers/consts";
import { CharacterClass, SkillName } from "~/helpers/dataTypes";

const StyledHelperText = styled.span`
  justify-self: flex-start;
  font-size: 0.75rem;
`;

const StyledSkillLabel = styled.summary`
  justify-self: start;
  font-size: 0.75rem;
`;

export default function SkillCalculator({
  setTrainedSkills,
  abilityModifier,
  trainedSkills,
  skillName,
}: {
  setTrainedSkills: Dispatch<SkillName[]>;
  trainedSkills: SkillName[];
  abilityModifier: number;
  skillName: SkillName;
}) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 769;

  const { characterClass } =
    useLoaderData<{ characterClass: CharacterClass }>();

  const canLearnSkill = characterClass.skillList.includes(skillName);
  const isClassSkill = characterClass.trainedSkills.includes(skillName);
  const skillChoiceLimit = characterClass.skillChoices;
  const isSkillSelected = trainedSkills.includes(skillName);
  const reachedSelectionLimit = trainedSkills.length === skillChoiceLimit;

  const classSkills = useMemo(() => {
    const uniqueInitialSkills = [
      ...new Set([...characterClass.trainedSkills, ...trainedSkills]),
    ];

    return uniqueInitialSkills
      .filter((skillName) => characterClass.skillList.includes(skillName))
      .slice(0, characterClass.skillChoices);
    // trainedSkills is an array and JS have trouble to understand it didn't changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterClass]);

  useEffect(() => {
    setTrainedSkills(classSkills);
  }, [setTrainedSkills, classSkills]);

  return (
    <>
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

          if (checkedIndex < 0 && trainedSkills.length < skillChoiceLimit) {
            // add
            return setTrainedSkills([...trainedSkills, skillName]);
          }

          // remove by index
          return setTrainedSkills(
            trainedSkills.filter((_, index) => checkedIndex !== index)
          );
        }}
      />
      {!isMobile && <StyledSkillLabel>{skillName}</StyledSkillLabel>}
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
    </>
  );
}

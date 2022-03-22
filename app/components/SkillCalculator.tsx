import styled from "@emotion/styled";
import { useLoaderData } from "remix";

import BonusCheckbox from "~/components/BonusCheckbox";
import ModifierLabel from "~/components/ModifierLabel";
import { TRAINED_SKILL_BONUS_VALUE } from "~/helpers/consts";
import { CharacterClass, SkillName } from "~/helpers/dataTypes";
import useCharCalculator from "~/helpers/useCharCalculator";

const StyledHelperText = styled.span`
  justify-self: flex-start;
  font-size: 0.75rem;
`;

const StyledSkillLabel = styled.summary`
  justify-self: start;
  font-size: 0.75rem;
`;

export default function SkillCalculator({
  abilityModifier,
  skillName,
}: {
  abilityModifier: number;
  skillName: SkillName;
}) {
  const { trainedSkills, toggleSkill } = useCharCalculator();

  const { characterClass } =
    useLoaderData<{ characterClass: CharacterClass }>();

  const isMobile = typeof window !== "undefined" && window.innerWidth < 769;
  const isClassSkill = characterClass.trainedSkills.includes(skillName);
  const canLearnSkill = characterClass.skillList.includes(skillName);
  const skillChoiceLimit = characterClass.skillChoices;
  const reachedSelectionLimit = trainedSkills.length === skillChoiceLimit;
  const isSkillSelected = trainedSkills.includes(skillName);

  return (
    <>
      {isMobile && <span />}
      <BonusCheckbox
        onChange={() => toggleSkill(skillName)}
        checked={isSkillSelected}
        disabled={
          (!isSkillSelected && reachedSelectionLimit) || // cant select, but can un-select
          !canLearnSkill || // cant select at all
          isClassSkill // there's no other possible combination
        }
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

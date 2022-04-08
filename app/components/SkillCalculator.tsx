import styled from "@emotion/styled";
import { useLoaderData } from "remix";

import BonusCheckbox from "~/components/BonusCheckbox";
import ModifierLabel from "~/components/ModifierLabel";
import { TRAINED_SKILL_BONUS_VALUE, SkillName } from "~/helpers/consts";
import { CharacterClass } from "~/helpers/types";
import useCharCalculator from "~/hooks/useCharCalculator";

const StyledHelperText = styled.span`
  color: ${({ theme }) => theme.secondary};
  justify-self: flex-start;
  font-size: 0.75rem;
`;

const StyledSkillLabel = styled.label`
  text-transform: capitalize;
  justify-self: stretch;
  font-size: 0.75rem;
  padding-left: 1rem;
  font-weight: 700;
  @media all and (max-width: 768px) {
    padding-left: 0;
    background-image: linear-gradient(
      ${({ theme }) => `90deg, ${theme.white} , ${theme.bg}`}
    );
  }
`;

export default function SkillCalculator({
  abilityModifier,
  skillName,
}: {
  abilityModifier: number;
  skillName: SkillName;
}) {
  const { trainedSkills, toggleSkill } = useCharCalculator();

  const { characterClass } = useLoaderData<
    Partial<{
      characterClass: CharacterClass;
    }>
  >();

  if (!characterClass) {
    throw new Error("Page loader is missing data");
  }

  const isClassSkill = characterClass.trainedSkills.includes(skillName);
  const canLearnSkill = characterClass.skillList.includes(skillName);
  const skillChoiceLimit = characterClass.skillChoices;
  const reachedSelectionLimit = trainedSkills.length === skillChoiceLimit;
  const isSkillSelected = trainedSkills.includes(skillName);

  return (
    <>
      <StyledSkillLabel htmlFor={`skill-${skillName}-checkbox`}>
        {skillName}
      </StyledSkillLabel>
      <BonusCheckbox
        onChange={() => toggleSkill(skillName)}
        id={`skill-${skillName}-checkbox`}
        checked={isSkillSelected}
        disabled={
          (!isSkillSelected && reachedSelectionLimit) || // cant select, but can un-select
          !canLearnSkill || // cant select at all
          isClassSkill // there's no other possible combination
        }
      />
      <StyledHelperText>
        {`${Number(
          isSkillSelected ? TRAINED_SKILL_BONUS_VALUE : 0
        )} from training +${abilityModifier} ability bonus`}
      </StyledHelperText>
      <ModifierLabel small>
        {Number(abilityModifier) +
          Number(isSkillSelected ? TRAINED_SKILL_BONUS_VALUE : 0)}
      </ModifierLabel>
    </>
  );
}

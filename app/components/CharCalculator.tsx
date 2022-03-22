import { Dispatch } from "react";

import styled from "@emotion/styled";
import { useLoaderData } from "remix";

import AbilityCalculator from "~/components/AbilityCalculator";
import { initialScorePointsDistribution } from "~/helpers/consts";
import { CharacterAbility, SkillName } from "~/helpers/dataTypes";

const Wrapper = styled.div`
  grid-template-columns: auto auto 1fr auto;
  justify-items: center;
  align-items: center;
  gap: 0.6rem 1rem;
  display: grid;
`;

export default function CharacterSkills({
  setScorePointsDistribution,
  setSelectedAbilityBonus,
  scorePointsDistribution,
  selectedAbilityBonus,
  setTrainedSkills,
  trainedSkills,
}: {
  setScorePointsDistribution: Dispatch<typeof initialScorePointsDistribution>;
  scorePointsDistribution: typeof initialScorePointsDistribution;
  setSelectedAbilityBonus: Dispatch<CharacterAbility[]>;
  selectedAbilityBonus: CharacterAbility[];
  setTrainedSkills: Dispatch<SkillName[]>;
  trainedSkills: SkillName[];
}): JSX.Element {
  const { characterAbilities } = useLoaderData<{
    characterAbilities: CharacterAbility[];
  }>();

  return (
    <Wrapper>
      {characterAbilities.map((keyAbility) => (
        <AbilityCalculator
          key={`${keyAbility}-ability-calculator`}
          setScorePointsDistribution={setScorePointsDistribution}
          setSelectedAbilityBonus={setSelectedAbilityBonus}
          scorePointsDistribution={scorePointsDistribution}
          selectedAbilityBonus={selectedAbilityBonus}
          setTrainedSkills={setTrainedSkills}
          trainedSkills={trainedSkills}
          keyAbility={keyAbility}
        />
      ))}
    </Wrapper>
  );
}

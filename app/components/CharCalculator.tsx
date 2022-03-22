import styled from "@emotion/styled";
import { useLoaderData } from "remix";

import AbilityCalculator from "~/components/AbilityCalculator";
import CalculatorWarn from "~/components/CalculatorWarn";
import DataPanel from "~/components/DataPanel";
import {
  SCORE_POINTS_TO_DISTRIBUTE,
  ABILITY_BONUS_LIMIT,
} from "~/helpers/consts";
import { CharacterAbility, CharacterClass } from "~/helpers/dataTypes";
import useCharCalculator from "~/helpers/useCharCalculator";

const Wrapper = styled.div`
  grid-template-columns: auto auto 1fr auto;
  justify-items: center;
  align-items: center;
  gap: 0.6rem 1rem;
  display: grid;
`;

const StyledWrapper = styled.div`
  grid-template-columns: 1fr 1fr;
  grid-area: char-data;
  display: grid;
  gap: 1rem;
  grid-template-areas:
    "warn-data warn-data"
    "ability-data ability-data";
`;

export default function CharacterSkills(): JSX.Element {
  const { selectedAbilityBonus, trainedSkills, sumOfPoints } =
    useCharCalculator();

  const { characterAbilities, characterClass } = useLoaderData<{
    characterAbilities: CharacterAbility[];
    characterClass: CharacterClass;
  }>();

  return (
    <StyledWrapper>
      <CalculatorWarn
        hasSkillChoices={characterClass.skillChoices - trainedSkills.length}
        bonusesToSelect={ABILITY_BONUS_LIMIT - selectedAbilityBonus.length}
        pointsToSpend={SCORE_POINTS_TO_DISTRIBUTE - sumOfPoints}
      />
      <DataPanel color="secondary" area="ability" title="Abilities/Skills">
        <Wrapper>
          {characterAbilities.map((keyAbility) => (
            <AbilityCalculator
              key={`${keyAbility}-ability-calculator`}
              keyAbility={keyAbility}
            />
          ))}
        </Wrapper>
      </DataPanel>
    </StyledWrapper>
  );
}

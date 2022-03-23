import styled from "@emotion/styled";
import { useLoaderData } from "remix";

import AbilityCalculator from "~/components/AbilityCalculator";
import CalculatorWarn from "~/components/CalculatorWarn";
import DataPanel from "~/components/DataPanel";
import { CharacterAbility } from "~/helpers/dataTypes";
import useCharCalculator from "~/helpers/useCharCalculator";

const StyledButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  grid-area: reset-button;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: none;
`;

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
    "ability-data ability-data"
    ". reset-button";
`;

export default function CharacterSkills(): JSX.Element {
  const { pointsToSpend, bonusesToSelect, hasSkillChoices, reset } =
    useCharCalculator();

  const { characterAbilities } = useLoaderData<{
    characterAbilities: CharacterAbility[];
  }>();

  return (
    <StyledWrapper>
      <CalculatorWarn
        hasSkillChoices={hasSkillChoices}
        bonusesToSelect={bonusesToSelect}
        pointsToSpend={pointsToSpend}
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
      <StyledButton onClick={reset}>reset stats</StyledButton>
    </StyledWrapper>
  );
}

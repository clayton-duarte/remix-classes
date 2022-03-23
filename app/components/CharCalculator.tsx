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
  padding: 0.5rem 1rem;
  border: none;
`;

const CalculatorWrapper = styled.div`
  grid-template-columns: auto auto 1fr auto;
  justify-items: center;
  align-items: center;
  display: grid;
  gap: 1rem;
  @media all and (max-width: 768px) {
    gap: 0.25rem 0.5rem;
  }
`;

const ParentCalculatorWrapper = styled.div`
  grid-template-columns: 1fr;
  grid-area: char-data;
  display: grid;
  gap: 1rem;
`;

export default function CharacterSkills(): JSX.Element {
  const { pointsToSpend, bonusesToSelect, hasSkillChoices, reset } =
    useCharCalculator();

  const { characterAbilities } = useLoaderData<{
    characterAbilities: CharacterAbility[];
  }>();

  return (
    <>
      <ParentCalculatorWrapper>
        <DataPanel color="secondary" title="Abilities/Skills">
          <CalculatorWrapper>
            {characterAbilities.map((keyAbility) => (
              <AbilityCalculator
                key={`${keyAbility}-ability-calculator`}
                keyAbility={keyAbility}
              />
            ))}
          </CalculatorWrapper>
        </DataPanel>
        <StyledButton onClick={reset}>reset stats</StyledButton>
        <CalculatorWarn
          hasSkillChoices={hasSkillChoices}
          bonusesToSelect={bonusesToSelect}
          pointsToSpend={pointsToSpend}
        />
      </ParentCalculatorWrapper>
    </>
  );
}

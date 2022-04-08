import styled from "@emotion/styled";
import { useLoaderData } from "remix";

import AbilityCalculator from "~/components/AbilityCalculator";
import Button from "~/components/Button";
import DataPanel from "~/components/DataPanel";
import { CharacterAbility } from "~/helpers/types";
import useCharCalculator from "~/hooks/useCharCalculator";

const CalculatorWrapper = styled.div`
  grid-template-columns: auto auto 1fr auto;
  justify-items: center;
  align-items: center;
  display: grid;
  gap: 1rem;
  @media all and (max-width: 768px) {
    grid-template-columns: 1fr auto;
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
  const { reset } = useCharCalculator();

  const { characterAbilityList } = useLoaderData<
    Partial<{
      characterAbilityList: CharacterAbility[];
    }>
  >();

  if (!characterAbilityList) {
    throw new Error("Page loader is missing data");
  }

  return (
    <>
      <ParentCalculatorWrapper>
        <DataPanel color="secondary" title="Abilities/Skills">
          <CalculatorWrapper>
            {characterAbilityList.map(({ name }) => (
              <AbilityCalculator
                key={`${name}-ability-calculator`}
                keyAbility={name}
              />
            ))}
          </CalculatorWrapper>
        </DataPanel>
        <Button onClick={reset}>reset stats</Button>
      </ParentCalculatorWrapper>
    </>
  );
}

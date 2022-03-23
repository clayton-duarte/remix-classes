import styled from "@emotion/styled";

import { COST_BY_SCORE, SCORE_POINTS_TO_DISTRIBUTE } from "~/helpers/consts";
import { CharacterAbility } from "~/helpers/dataTypes";
import useCharCalculator from "~/helpers/useCharCalculator";

const StyledWrapper = styled.div<{ percent: number }>`
  background-image: linear-gradient(
    ${({ theme, percent }) =>
      `90deg, ${theme.primary} ${percent}%, ${theme.bg} ${percent}%`}
  );
  justify-content: space-between;
  border-radius: 1.25rem;
  grid-auto-flow: column;
  justify-self: stretch;
  transition: 0.3s ease;
  align-items: center;
  display: grid;
`;

const StyledButton = styled.button<{ isSelected: boolean }>`
  transform: scale(${({ isSelected }) => (isSelected ? 1.25 : 1)});
  z-index: ${({ isSelected }) => (isSelected ? 99 : 9)};
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  font-family: "Cinzel", serif;
  transition: 0.3s ease;
  border-radius: 1rem;
  place-items: center;
  line-height: 1.25;
  font-weight: 700;
  font-size: 1rem;
  height: 1.5rem;
  width: 1.5rem;
  display: grid;
  border: none;
  padding: 0;
  &:disabled {
    background: ${({ theme }) => theme.bg};
  }
  @media all and (max-width: 768px) {
    font-size: 0.825rem;
    height: 1.25rem;
    width: 1.25rem;
  }
`;

export default function AbilityPointSelector({
  baseScore,
  ability,
}: {
  ability: CharacterAbility;
  baseScore: number;
}): JSX.Element {
  const { setScorePointsDistribution, scorePointsDistribution, sumOfPoints } =
    useCharCalculator();

  const currentPoints = scorePointsDistribution[ability];
  const currentIndex = COST_BY_SCORE.indexOf(currentPoints);
  const percent = (currentIndex / (COST_BY_SCORE.length - 1)) * 100;

  return (
    <StyledWrapper percent={percent}>
      {COST_BY_SCORE.map((cost, index) => {
        const isSelected = COST_BY_SCORE.indexOf(currentPoints) === index;
        const pointsAvailable = SCORE_POINTS_TO_DISTRIBUTE - sumOfPoints;
        const isDisabled = pointsAvailable < cost - currentPoints;
        const score = index + baseScore;

        return (
          <StyledButton
            key={`${ability}-option-${index}`}
            isSelected={isSelected}
            disabled={isDisabled}
            onClick={() => {
              const nextScores = {
                ...scorePointsDistribution,
                [ability]: cost,
              };

              const newSumOfPoints = Object.values(nextScores).reduce(
                (acc, curr) => Number(acc) + Number(curr),
                0 as number
              );

              if (newSumOfPoints <= SCORE_POINTS_TO_DISTRIBUTE) {
                setScorePointsDistribution(nextScores);
              }
            }}
          >
            {score}
          </StyledButton>
        );
      })}
    </StyledWrapper>
  );
}

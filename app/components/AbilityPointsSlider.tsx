import { Dispatch, useMemo } from "react";
import styled from "@emotion/styled";

import { CharacterAbility } from "~/helpers/types";

export const SCORE_POINTS_TO_DISTRIBUTE = 20;
export const BASE_ABILITY_SCORE = 10;
export const SCORE_COSTS = [
  10, 11, 12, 13, 13, 14, 14, 15, 15, 16, 16, 16, 17, 17, 17, 17, 18,
];
const COST_BY_SCORE = [0, 1, 2, 3, 5, 7, 9, 12, 16];

const StyledWrapper = styled.div<{ percent: number }>`
  background-image: linear-gradient(
    ${({ theme, percent }) =>
      `90deg, ${theme.primary} ${percent}%, ${theme.bg} ${percent}%`}
  );
  justify-content: space-between;
  border-radius: 1.25rem;
  grid-auto-flow: column;
  transition: 0.3s ease;
  display: grid;
`;

const StyledButton = styled.button<{ isSelected: boolean }>`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  border-radius: 1.25rem;
  place-items: center;
  font-size: 0.75rem;
  font-weight: 700;
  height: 1.25rem;
  width: 1.25rem;
  display: grid;
  border: none;
  padding: 0;
  transform: scale(${({ isSelected }) => (isSelected ? 1.5 : 1)});
  &:disabled {
    background: ${({ theme }) => theme.bg};
  }
`;

export default function AbilityPointsSlider({
  setScorePointsDistribution,
  scorePointsDistribution,
  baseScore,
  ability,
}: {
  setScorePointsDistribution: Dispatch<Record<CharacterAbility, number>>;
  scorePointsDistribution: Record<CharacterAbility, number>;
  ability: CharacterAbility;
  baseScore: number;
}): JSX.Element {
  const sumOfPoints = useMemo(() => {
    return Object.values(scorePointsDistribution).reduce(
      (acc, curr) => Number(acc) + Number(curr),
      0
    );
  }, [scorePointsDistribution]);

  const currentPoints = scorePointsDistribution[ability];
  const currentIndex = COST_BY_SCORE.indexOf(currentPoints);
  const percent = (currentIndex / (COST_BY_SCORE.length - 1)) * 100;

  return (
    <StyledWrapper percent={percent}>
      {COST_BY_SCORE.map((cost, index) => {
        const isCurrentlySelected =
          COST_BY_SCORE.indexOf(currentPoints) === index;
        const score = index + baseScore;
        const disabled =
          SCORE_POINTS_TO_DISTRIBUTE - sumOfPoints < cost - currentPoints;

        return (
          <StyledButton
            isSelected={isCurrentlySelected}
            key={`${ability}-option-${index}`}
            disabled={disabled}
            onClick={() => {
              const nextScores = {
                ...scorePointsDistribution,
                [ability]: cost,
              };

              const newSumOfPoints = Object.values(nextScores).reduce(
                (acc, curr) => Number(acc) + Number(curr),
                0
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
  return (
    <input
      value={scorePointsDistribution[ability]}
      max={SCORE_COSTS.length - 1}
      type="range"
      step={
        scorePointsDistribution[ability] <= 3
          ? 1
          : scorePointsDistribution[ability] <= 9
          ? 2
          : scorePointsDistribution[ability] <= 12
          ? 3
          : 4
      }
      min={0}
      onChange={(e) => {
        const nextScores = {
          ...scorePointsDistribution,
          [ability]: e.target.value,
        };

        const sumOfPoints = Object.values(nextScores).reduce(
          (acc, curr) => Number(acc) + Number(curr),
          0
        );

        if (sumOfPoints <= SCORE_POINTS_TO_DISTRIBUTE) {
          setScorePointsDistribution(nextScores);
        }
      }}
    />
  );
}

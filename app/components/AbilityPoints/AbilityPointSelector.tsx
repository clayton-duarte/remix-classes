import { Dispatch, useMemo } from "react";
import styled from "@emotion/styled";

import { CharacterAbility } from "~/helpers/types";
import {
  COST_BY_SCORE,
  SCORE_POINTS_TO_DISTRIBUTE,
} from "~/components/AbilityPoints/consts";

const StyledWrapper = styled.div<{ percent: number }>`
  background-image: linear-gradient(
    ${({ theme, percent }) =>
      `90deg, ${theme.secondary} ${percent}%, ${theme.bg} ${percent}%`}
  );
  justify-content: space-between;
  border-radius: 1.25rem;
  grid-auto-flow: column;
  transition: 0.3s ease;
  display: grid;
  align-items: center;
`;

const StyledButton = styled.button<{ isSelected: boolean }>`
  background: ${({ theme, isSelected }) =>
    isSelected ? theme.primary : theme.secondary};
  color: ${({ theme }) => theme.white};
  border-radius: 1.25rem;
  transition: 0.3s ease;
  place-items: center;
  font-size: 0.5rem;
  font-weight: 700;
  line-height: 1.5;
  cursor: pointer;
  display: grid;
  height: 1rem;
  border: none;
  width: 1rem;
  padding: 0;
  transform: scale(${({ isSelected }) => (isSelected ? 1.75 : 1.25)});
  &:disabled {
    background: ${({ theme }) => theme.bg};
  }
`;

type ScorePoints = Record<CharacterAbility, typeof COST_BY_SCORE[number]>;

export default function AbilityPointSelector({
  setScorePointsDistribution,
  scorePointsDistribution,
  baseScore,
  ability,
}: {
  setScorePointsDistribution: Dispatch<ScorePoints>;
  scorePointsDistribution: ScorePoints;
  ability: CharacterAbility;
  baseScore: number;
}): JSX.Element {
  const sumOfPoints = useMemo(() => {
    return Object.values(scorePointsDistribution).reduce(
      (acc, curr) => Number(acc) + Number(curr),
      0 as number
    );
  }, [scorePointsDistribution]);

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

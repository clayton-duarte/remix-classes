import React, { useEffect, useState } from "react";
import { json, useLoaderData } from "remix";
import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

import DataPanel from "~/components/DataPanel";
import {
  CharacterPowerSource,
  CharacterClassName,
  CharacterRaceName,
  CharacterAbility,
  CharacterClass,
  CharacterRole,
  CharacterRace,
} from "~/helpers/types";
import {
  fetchCharacterClassByName,
  fetchCharacterRaceByName,
  fetchCharacterAbility,
} from "~/helpers/dataFetch";

const SCORE_POINTS_TO_DISTRIBUTE = 20;
const SCORE_COSTS = [
  10, 11, 12, 13, 13, 14, 14, 15, 15, 16, 16, 16, 17, 17, 17, 17, 18,
];

const ABILITY_BONUS_LIMIT = 2;
const BASE_ABILITY_SCORE = 10;

const initialAbilityScores = Object.values(CharacterAbility).reduce(
  (acc, abilityName) => ({ ...acc, [abilityName]: BASE_ABILITY_SCORE }),
  {} as Record<CharacterAbility, number>
);

const initialScorePointsDistribution = Object.values(CharacterAbility).reduce(
  (acc, abilityName) => ({ ...acc, [abilityName]: 0 }),
  {} as Record<CharacterAbility, number>
);

const StyledWrapper = styled.div`
  grid-template-columns: auto auto auto 1fr auto;
  justify-content: flex-start;
  display: grid;
  gap: 0.5rem;
`;

const StyledLabel = styled.label<{ color: keyof Theme }>`
  color: ${({ theme, color }) => theme[color]};
  text-transform: capitalize;
`;

type LoaderResponse = {
  characterAbilities: CharacterAbility[];
  characterClass: CharacterClass;
  characterRace: CharacterRace;
};

type RouteParams = {
  characterRole: CharacterRole;
  characterClassName: CharacterClassName;
  characterPower: CharacterPowerSource;
  characterRaceName: CharacterRaceName;
};

export const loader = async ({ params }: { params: RouteParams }) => {
  return json<LoaderResponse>({
    characterClass: fetchCharacterClassByName(params.characterClassName),
    characterRace: fetchCharacterRaceByName(params.characterRaceName),
    characterAbilities: fetchCharacterAbility(),
  });
};

export default function Page() {
  const { characterClass, characterRace, characterAbilities } =
    useLoaderData<LoaderResponse>();
  const [selectedAbilityBonus, setSelectedAbilityBonus] = useState<
    CharacterAbility[]
  >([]);
  const [scorePointsDistribution, setScorePointsDistribution] = useState(
    initialScorePointsDistribution
  );

  useEffect(() => {
    if (characterRace.abilityBonus.length === ABILITY_BONUS_LIMIT) {
      // just select them all!
      setSelectedAbilityBonus(characterRace.abilityBonus);
      return;
    }

    if (characterRace.abilityBonus.length > ABILITY_BONUS_LIMIT) {
      // we could pre-select some of the class key abilities
      const relevantAbilities = characterRace.abilityBonus.filter((ability) =>
        characterClass.keyAbilities.includes(ability)
      );
      if (relevantAbilities.length <= ABILITY_BONUS_LIMIT) {
        setSelectedAbilityBonus(relevantAbilities);
        return;
      }
    }

    setSelectedAbilityBonus([]);
  }, [characterClass, characterRace]);

  useEffect(() => {
    document.getElementById("char-panel")?.scrollIntoView();
  }, [characterRace]);

  return (
    <>
      <DataPanel area="race">{characterRace.description}</DataPanel>
      <DataPanel color="secondary" area="char" title="Bonuses">
        <summary>
          Available Bonuses:{" "}
          <span>
            {ABILITY_BONUS_LIMIT - selectedAbilityBonus.length}/
            {ABILITY_BONUS_LIMIT}
          </span>
        </summary>
        <br />
        {SCORE_POINTS_TO_DISTRIBUTE -
          Object.values(scorePointsDistribution).reduce(
            (acc, curr) => Number(acc) + Number(curr),
            0
          )}
        <StyledWrapper>
          {characterAbilities.map((ability) => {
            const isSelected = selectedAbilityBonus.includes(ability);
            const classAbilityIndex =
              characterClass.keyAbilities.indexOf(ability);
            const isRacialAbilityBonus =
              characterRace.abilityBonus.includes(ability);
            const dontNeedToSelect =
              characterRace.abilityBonus.length === ABILITY_BONUS_LIMIT;
            const reachedSelectionLimit =
              selectedAbilityBonus.length === ABILITY_BONUS_LIMIT;

            return (
              <React.Fragment key={`bonus-selector-${ability}`}>
                <StyledLabel
                  color={
                    classAbilityIndex < 0
                      ? "secondary"
                      : classAbilityIndex === 0
                      ? "success"
                      : "warn"
                  }
                >
                  {ability.slice(0, 3)}
                </StyledLabel>
                <span>
                  {isRacialAbilityBonus && (
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={
                        (!isSelected && reachedSelectionLimit) ||
                        dontNeedToSelect
                      }
                      onChange={() => {
                        const checkedIndex =
                          selectedAbilityBonus.indexOf(ability);

                        if (
                          checkedIndex < 0 &&
                          selectedAbilityBonus.length < ABILITY_BONUS_LIMIT
                        ) {
                          // add
                          return setSelectedAbilityBonus([
                            ...selectedAbilityBonus,
                            ability,
                          ]);
                        }

                        // remove by index
                        return setSelectedAbilityBonus(
                          selectedAbilityBonus.filter(
                            (_, index) => checkedIndex !== index
                          )
                        );
                      }}
                    />
                  )}
                </span>
                <span>{BASE_ABILITY_SCORE + (isSelected ? 2 : 0)}</span>
                <input
                  value={scorePointsDistribution[ability]}
                  max={SCORE_COSTS.length - 1}
                  type="range"
                  step={1}
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

                    console.log({
                      sumOfPoints,
                      nextScores,
                      [ability]: e.target.value,
                    });
                    if (sumOfPoints <= SCORE_POINTS_TO_DISTRIBUTE) {
                      setScorePointsDistribution(nextScores);
                    }
                  }}
                />
                <span>
                  {Number(SCORE_COSTS[scorePointsDistribution[ability]]) +
                    Number(isSelected ? 2 : 0)}
                </span>
              </React.Fragment>
            );
          })}
        </StyledWrapper>
        <br />
        <summary>Class:</summary>
        <span>
          {characterClass.book}, page {characterClass.page}
        </span>
        <summary>Race:</summary>
        <span>
          {characterRace.book}, page {characterRace.page}
        </span>
      </DataPanel>
    </>
  );
}

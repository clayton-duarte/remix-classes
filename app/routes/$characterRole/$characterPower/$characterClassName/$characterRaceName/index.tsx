import { useEffect, useState, useMemo } from "react";
import { json, useLoaderData } from "remix";
import { BiBadge } from "react-icons/bi";
import styled from "@emotion/styled";

import AbilityPoints from "~/components/AbilityPoints";
import DataPanel from "~/components/DataPanel";
import {
  initialScorePointsDistribution,
  SCORE_POINTS_TO_DISTRIBUTE,
} from "~/components/AbilityPoints/consts";
import {
  CharacterPowerSource,
  CharacterClassName,
  CharacterRaceName,
  CharacterAbility,
  CharacterClass,
  CharacterRole,
  CharacterRace,
} from "~/helpers/dataTypes";
import {
  fetchCharacterClassByName,
  fetchCharacterRaceByName,
  fetchCharacterAbilities as fetchCharacterAbilities,
} from "~/helpers/dataFetch";

const StyledWrapper = styled.div`
  display: grid;
  grid-area: char-data;
  gap: 1rem;
  grid-template-areas:
    "warn-data"
    "main-data";
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
    characterAbilities: fetchCharacterAbilities(),
  });
};

function RenderWarn({
  bonusesToSelect,
  pointsToSpend,
}: {
  bonusesToSelect: number;
  pointsToSpend: number;
}) {
  if (bonusesToSelect > 0) {
    return (
      <DataPanel color="warn" area="warn" title="action">
        Your have {bonusesToSelect} ability bonus to select. Please select your
        racial bonuses by clicking on the <BiBadge /> bellow
      </DataPanel>
    );
  }

  if (pointsToSpend > 0) {
    return (
      <DataPanel color="warn" area="warn" title="action">
        You have <strong>{pointsToSpend}</strong> ability points to spend.
        Please spend your ability score points by selecting the values from{" "}
        <strong>10</strong> to <strong>20</strong> bellow. Higher scores consume
        more points.
      </DataPanel>
    );
  }

  return (
    <DataPanel color="success" area="warn" title="Done">
      You are all set
    </DataPanel>
  );
}

export default function Page() {
  const { characterClass, characterRace, characterAbilities } =
    useLoaderData<LoaderResponse>();
  const [scorePointsDistribution, setScorePointsDistribution] = useState(
    initialScorePointsDistribution
  );
  const [selectedAbilityBonus, setSelectedAbilityBonus] = useState<
    CharacterAbility[]
  >([]);

  const sumOfPoints = useMemo(() => {
    return Object.values(scorePointsDistribution).reduce(
      (acc, curr) => Number(acc) + Number(curr),
      0 as number
    );
  }, [scorePointsDistribution]);

  useEffect(() => {
    document.getElementById("char-panel")?.scrollIntoView();
  }, [characterRace]);

  return (
    <>
      <DataPanel area="race">
        {characterRace.description} - {characterRace.book}, p.
        {characterRace.page}
      </DataPanel>
      <StyledWrapper>
        <RenderWarn
          pointsToSpend={SCORE_POINTS_TO_DISTRIBUTE - sumOfPoints}
          bonusesToSelect={2 - selectedAbilityBonus.length}
        />
        <DataPanel color="secondary" area="main" title="Ability Scores">
          <AbilityPoints
            setScorePointsDistribution={setScorePointsDistribution}
            setSelectedAbilityBonus={setSelectedAbilityBonus}
            scorePointsDistribution={scorePointsDistribution}
            selectedAbilityBonus={selectedAbilityBonus}
            characterAbilities={characterAbilities}
            characterClass={characterClass}
            characterRace={characterRace}
          />
        </DataPanel>
      </StyledWrapper>
    </>
  );
}

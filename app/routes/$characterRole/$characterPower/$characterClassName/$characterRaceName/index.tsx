import { useEffect, useState, useMemo, Dispatch } from "react";
import { json, useLoaderData } from "remix";
import { BiBadge } from "react-icons/bi";
import styled from "@emotion/styled";

import CharacterSkills from "~/components/CharacterSkills";
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
  SkillGlossary,
} from "~/helpers/dataTypes";
import {
  fetchCharacterClassByName,
  fetchCharacterRaceByName,
  fetchCharacterAbilities,
  fetchSkillGlossary,
} from "~/helpers/dataFetch";

const StyledWrapper = styled.div`
  grid-template-columns: 1fr 1fr;
  grid-area: char-data;
  display: grid;
  gap: 1rem;
  grid-template-areas:
    "warn-data warn-data"
    "ability-data ability-data"
    "skill-data .";
`;

type LoaderResponse = {
  characterAbilities: CharacterAbility[];
  characterClass: CharacterClass;
  characterRace: CharacterRace;
  skillGlossary: SkillGlossary;
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
    skillGlossary: fetchSkillGlossary(),
  });
};

export default function Page() {
  const { characterClass, characterRace, characterAbilities, skillGlossary } =
    useLoaderData<LoaderResponse>();
  const [trainedSkills, setTrainedSkills] = useState(
    characterClass.trainedSkills
  );
  const [scorePointsDistribution, setScorePointsDistribution] = useState(
    initialScorePointsDistribution
  );
  const [selectedAbilityBonus, setSelectedAbilityBonus] = useState<
    CharacterAbility[]
  >([]);

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
          Your have {bonusesToSelect} ability bonus to select. Please select
          your racial bonuses by clicking on the <BiBadge /> bellow
        </DataPanel>
      );
    }

    if (pointsToSpend > 0) {
      return (
        <DataPanel color="warn" area="warn" title="action">
          You have <strong>{pointsToSpend}</strong> ability points to spend.
          Please spend your ability score points by selecting the values from{" "}
          <strong>10</strong> to <strong>20</strong> bellow. Higher scores
          consume more points.
        </DataPanel>
      );
    }

    return (
      <DataPanel color="secondary" area="skill" title="Skills">
        <CharacterSkills
          scorePointsDistribution={scorePointsDistribution}
          selectedAbilityBonus={selectedAbilityBonus}
          setTrainedSkills={setTrainedSkills}
          characterClass={characterClass}
          trainedSkills={trainedSkills}
          skillGlossary={skillGlossary}
        />
      </DataPanel>
    );

    return (
      <DataPanel color="success" area="warn" title="Done">
        You are all set
      </DataPanel>
    );
  }

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
        <DataPanel color="secondary" area="ability" title="Ability Scores">
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

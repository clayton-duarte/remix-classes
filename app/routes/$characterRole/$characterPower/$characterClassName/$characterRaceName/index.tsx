import { useMemo } from "react";

import styled from "@emotion/styled";
import { BiBadge, BiCheckbox } from "react-icons/bi";
import { json, useLoaderData } from "remix";

import CharacterSkills from "~/components/CharacterSkills";
import DataPanel from "~/components/DataPanel";
import {
  initialScorePointsDistribution,
  SCORE_POINTS_TO_DISTRIBUTE,
} from "~/helpers/consts";
import {
  fetchCharacterClassByName,
  fetchCharacterRaceByName,
  fetchCharacterAbilities,
  fetchSkillGlossary,
} from "~/helpers/dataFetch";
import {
  CharacterAbility,
  CharacterClass,
  CharacterRace,
  SkillGlossary,
  RouteParams,
  SkillName,
} from "~/helpers/dataTypes";
import useStorage from "~/helpers/useStorage";

const StyledWrapper = styled.div`
  grid-template-columns: 1fr 1fr;
  grid-area: char-data;
  display: grid;
  gap: 1rem;
  grid-template-areas:
    "warn-data warn-data"
    "ability-data ability-data";
`;

interface LoaderResponse {
  characterAbilities: CharacterAbility[];
  characterClass: CharacterClass;
  characterRace: CharacterRace;
  skillGlossary: SkillGlossary;
}

export const loader = async ({ params }: { params: RouteParams }) => {
  if (!params.characterClassName || !params.characterRaceName) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

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

  const [trainedSkills, setTrainedSkills] = useStorage<SkillName[]>(
    "trainedSkills"
  )(characterClass.trainedSkills);

  const [scorePointsDistribution, setScorePointsDistribution] = useStorage<
    typeof initialScorePointsDistribution
  >("scorePointsDistribution")(initialScorePointsDistribution);

  const [selectedAbilityBonus, setSelectedAbilityBonus] = useStorage<
    CharacterAbility[]
  >("selectedAbilityBonus")([]);

  function RenderWarn({
    bonusesToSelect,
    hasSkillChoices,
    pointsToSpend,
  }: {
    bonusesToSelect: number;
    hasSkillChoices: number;
    pointsToSpend: number;
  }) {
    if (bonusesToSelect > 0) {
      return (
        <DataPanel color="warn" area="warn" title="action">
          Your have {bonusesToSelect} ability bonus to select. Please select
          your racial bonuses by clicking on the <BiBadge /> icons bellow.
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

    if (hasSkillChoices > 0) {
      return (
        <DataPanel color="warn" area="warn" title="action">
          You can be trained in <strong>{hasSkillChoices}</strong> more skills.
          Please select your class bonuses by clicking on the <BiCheckbox />{" "}
          icons bellow.
        </DataPanel>
      );
    }

    return (
      <DataPanel color="success" area="warn" title="Done">
        You are all set.
      </DataPanel>
    );
  }

  const sumOfPoints = useMemo(() => {
    return Object.values(scorePointsDistribution ?? {}).reduce(
      (acc, curr) => Number(acc) + Number(curr),
      0 as number
    );
  }, [scorePointsDistribution]);

  if (
    selectedAbilityBonus == null ||
    scorePointsDistribution == null ||
    trainedSkills == null
  ) {
    return null;
  }

  return (
    <>
      <DataPanel area="race">
        {characterRace.description} - {characterRace.book}, p.
        {characterRace.page}
      </DataPanel>
      <StyledWrapper>
        <RenderWarn
          hasSkillChoices={characterClass.skillChoices - trainedSkills.length}
          pointsToSpend={SCORE_POINTS_TO_DISTRIBUTE - sumOfPoints}
          bonusesToSelect={2 - selectedAbilityBonus.length}
        />
        <DataPanel color="secondary" area="ability" title="Abilities/Skills">
          <CharacterSkills
            setScorePointsDistribution={setScorePointsDistribution}
            setSelectedAbilityBonus={setSelectedAbilityBonus}
            scorePointsDistribution={scorePointsDistribution}
            selectedAbilityBonus={selectedAbilityBonus}
            characterAbilities={characterAbilities}
            setTrainedSkills={setTrainedSkills}
            characterClass={characterClass}
            characterRace={characterRace}
            trainedSkills={trainedSkills}
            skillGlossary={skillGlossary}
          />
        </DataPanel>
      </StyledWrapper>
    </>
  );
}

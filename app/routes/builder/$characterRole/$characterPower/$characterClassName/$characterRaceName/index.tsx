import { useMemo } from "react";

import { json, useLoaderData, useNavigate } from "remix";

import Button from "~/components/Button";
import DataPanel from "~/components/DataPanel";
import Grid from "~/components/Grid";
import { ABILITY_BONUS_LIMIT } from "~/helpers/consts";
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
  const { characterRace, characterClass, skillGlossary } =
    useLoaderData<LoaderResponse>();

  const navigate = useNavigate();

  const humanizedAbilityList = useMemo(() => {
    return characterRace.abilityBonus.map((ability) => {
      return (
        <li key={`${ability}-list-item`}>{`${ability
          .slice(0, 3)
          .toUpperCase()}${ability.slice(3)}`}</li>
      );
    });
  }, [characterRace.abilityBonus]);

  const humanizedSkillList = useMemo(() => {
    const formatSkillOption = (skill: SkillName) =>
      `${skill.charAt(0).toUpperCase()}${skill.slice(1)} (${skillGlossary[
        skill
      ].keyAbility
        .slice(0, 3)
        .toUpperCase()});`;

    return characterClass.skillList
      .map((skill) => {
        const formattedSkill = formatSkillOption(skill);

        if (characterClass.trainedSkills.includes(skill)) {
          return (
            <li key={`${skill}-list-item`}>
              <strong>{formattedSkill}</strong>
            </li>
          );
        }

        return <li key={`${skill}-list-item`}>{formattedSkill}</li>;
      })
      .map((skill) => {
        return skill;
      });
  }, [characterClass.skillList, characterClass.trainedSkills, skillGlossary]);

  return (
    <>
      <DataPanel area="race">{characterRace.description}</DataPanel>
      <DataPanel area="char" title="summary">
        <Grid gap=".5rem">
          <h3>{characterRace.name}</h3>
          <p>
            {characterRace.book}, p.
            {characterRace.page}
          </p>
          <p>
            <strong>{ABILITY_BONUS_LIMIT} Bonus</strong>
          </p>
          <ul>{humanizedAbilityList}</ul>
        </Grid>
        <Grid gap=".5rem">
          <h3>{characterClass.name}</h3>
          <p>
            {characterClass.book}, p.
            {characterClass.page}
          </p>
          <p>
            <strong>{characterClass.skillChoices} Skills</strong>
            <ul>{humanizedSkillList}</ul>
          </p>
        </Grid>
        <Button
          onClick={() => {
            navigate("/calculator/ability");
          }}
        >
          accept
        </Button>
      </DataPanel>
    </>
  );
}

import { useMemo } from "react";

import { json, useLoaderData, useNavigate, useParams } from "remix";

import Button from "~/components/Button";
import DataPanel from "~/components/DataPanel";
import Grid from "~/components/Grid";
import { ABILITY_BONUS_LIMIT } from "~/helpers/consts";
import {
  CharBuilderChoices,
  CharacterClass,
  CharacterRace,
  Skill,
} from "~/helpers/dataTypes";
import useStorage from "~/hooks/useStorage";
import {
  CharacterSkillsService,
  CharacterClassService,
  CharacterRaceService,
} from "~/libs/FaunaService";

interface LoaderResponse {
  characterClass: CharacterClass;
  characterRace: CharacterRace;
  skillList: Skill[];
}

export const loader = async ({ params }: { params: CharBuilderChoices }) => {
  if (!params.characterClassName || !params.characterRaceName) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const characterClassClient = new CharacterClassService();
  const characterRaceClient = new CharacterRaceService();
  const skillListClient = new CharacterSkillsService();

  const [
    { data: characterClass },
    { data: characterRace },
    { data: skillList },
  ] = await Promise.all([
    characterClassClient.getOneByName(params.characterClassName),
    characterRaceClient.getOneByName(params.characterRaceName),
    skillListClient.getAll(),
  ]);

  return json<LoaderResponse>({
    characterClass,
    characterRace,
    skillList,
  });
};

export default function Page() {
  const params = useParams<CharBuilderChoices>();
  const [, setCharChoices] = useStorage("charChoices")(params);
  const navigate = useNavigate();

  const { characterRace, characterClass, skillList } =
    useLoaderData<LoaderResponse>();

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
    const formatSkillOption = (skillName: Skill["name"]) =>
      `${skillName.charAt(0).toUpperCase()}${skillName.slice(1)} (${skillList
        .find(({ name }) => name === skillName)
        ?.keyAbility.slice(0, 3)
        .toUpperCase()});`;

    return characterClass.skillList
      .map((skillName) => {
        const formattedSkill = formatSkillOption(skillName);

        if (characterClass.trainedSkills.includes(skillName)) {
          return (
            <li key={`${skillName}-list-item`}>
              <strong>{formattedSkill}</strong>
            </li>
          );
        }

        return <li key={`${skillName}-list-item`}>{formattedSkill}</li>;
      })
      .map((skill) => {
        return skill;
      });
  }, [characterClass.skillList, characterClass.trainedSkills, skillList]);

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
          </p>
          <ul>{humanizedSkillList}</ul>
        </Grid>
        <Button
          onClick={() => {
            setCharChoices(params);

            navigate(`${window.location.pathname}/abilities`);
          }}
        >
          accept
        </Button>
      </DataPanel>
    </>
  );
}

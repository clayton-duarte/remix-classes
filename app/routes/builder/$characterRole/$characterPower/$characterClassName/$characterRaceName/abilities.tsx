import { json, useLoaderData } from "remix";

import CharCalculator from "~/components/CharCalculator";
import DataPanel from "~/components/DataPanel";
import {
  CharBuilderChoices,
  CharacterAbility,
  CharacterClass,
  CharacterRace,
  Skill,
} from "~/helpers/types";
import { CharCalculatorProvider } from "~/hooks/useCharCalculator";
import {
  CharacterAbilitiesService,
  CharacterSkillsService,
  CharacterClassService,
  CharacterRaceService,
} from "~/libs/FaunaService";

interface LoaderResponse {
  characterAbilityList: CharacterAbility[];
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

  const characterAbilityListClient = new CharacterAbilitiesService();
  const characterClassClient = new CharacterClassService();
  const characterRaceClient = new CharacterRaceService();
  const skillListClient = new CharacterSkillsService();

  const [
    { data: characterAbilityList },
    { data: characterClass },
    { data: characterRace },
    { data: skillList },
  ] = await Promise.all([
    characterAbilityListClient.getAll(),
    characterClassClient.getOneByName(params.characterClassName),
    characterRaceClient.getOneByName(params.characterRaceName),
    skillListClient.getAll(),
  ]);

  return json<LoaderResponse>({
    characterAbilityList,
    characterClass,
    characterRace,
    skillList,
  });
};

export default function Page() {
  const { characterRace } = useLoaderData<LoaderResponse>();

  return (
    <>
      <DataPanel area="race">
        {characterRace.description} - {characterRace.book}, p.
        {characterRace.page}
      </DataPanel>
      <CharCalculatorProvider>
        <CharCalculator />
      </CharCalculatorProvider>
    </>
  );
}

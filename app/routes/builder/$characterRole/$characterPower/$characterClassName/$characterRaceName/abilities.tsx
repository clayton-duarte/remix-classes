import { json, useLoaderData } from "remix";

import CharCalculator from "~/components/CharCalculator";
import DataPanel from "~/components/DataPanel";
import {
  CharBuilderChoices,
  CharacterAbility,
  CharacterClass,
  CharacterRace,
  SkillGlossary,
} from "~/helpers/dataTypes";
import dbClient from "~/helpers/dbClient";
import { CharCalculatorProvider } from "~/hooks/useCharCalculator";
import {
  CharacterClassService,
  CharacterRaceService,
} from "~/libs/FaunaService";

interface LoaderResponse {
  characterAbilities: CharacterAbility["name"][];
  characterClass: CharacterClass;
  characterRace: CharacterRace;
  skillGlossary: SkillGlossary;
}

export const loader = async ({ params }: { params: CharBuilderChoices }) => {
  if (!params.characterClassName || !params.characterRaceName) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const characterClassClient = new CharacterClassService();
  const characterRaceListClient = new CharacterRaceService();

  const [{ data: characterClass }, { data: characterRace }] = await Promise.all(
    [
      characterClassClient.getOneByName(params.characterClassName),
      characterRaceListClient.getOneByName(params.characterRaceName),
    ]
  );

  return json<LoaderResponse>({
    characterAbilities: dbClient.fetchCharacterAbilities(),
    skillGlossary: dbClient.fetchSkillGlossary(),
    characterClass,
    characterRace,
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

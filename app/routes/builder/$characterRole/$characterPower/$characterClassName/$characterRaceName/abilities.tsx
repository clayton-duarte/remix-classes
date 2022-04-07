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
import { CharacterClassCrud } from "~/libs/FaunaCrud";

interface LoaderResponse {
  characterAbilities: CharacterAbility[];
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

  const characterClassClient = new CharacterClassCrud();

  const [{ data: characterClass }] = await Promise.all([
    characterClassClient.getOneByName(params.characterClassName),
  ]);

  return json<LoaderResponse>({
    characterRace: dbClient.fetchCharacterRaceByName(params.characterRaceName),
    characterAbilities: dbClient.fetchCharacterAbilities(),
    skillGlossary: dbClient.fetchSkillGlossary(),
    characterClass,
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

import { json, useLoaderData } from "remix";

import CharCalculator from "~/components/CharCalculator";
import DataPanel from "~/components/DataPanel";
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
  CharBuilderChoices,
} from "~/helpers/dataTypes";
import { CharCalculatorProvider } from "~/helpers/useCharCalculator";

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

  return json<LoaderResponse>({
    characterClass: fetchCharacterClassByName(params.characterClassName),
    characterRace: fetchCharacterRaceByName(params.characterRaceName),
    characterAbilities: fetchCharacterAbilities(),
    skillGlossary: fetchSkillGlossary(),
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

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

const ABILITY_BONUS_LIMIT = 2;

const StyledWrapper = styled.div`
  grid-template-columns: auto auto 1fr;
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

  console.log({ selectedAbilityBonus });
  return (
    <>
      <DataPanel area="race">{characterRace.description}</DataPanel>
      <DataPanel color="secondary" area="char" title="Bonuses">
        <StyledWrapper>
          <summary>Available Bonuses:</summary>
          <span>
            {ABILITY_BONUS_LIMIT - selectedAbilityBonus.length}/
            {ABILITY_BONUS_LIMIT}
          </span>
          <span />
          {characterAbilities.map((ability) => {
            const isChecked = selectedAbilityBonus.includes(ability);
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
                  {ability}
                </StyledLabel>
                {isRacialAbilityBonus ? (
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={
                      (!isChecked && reachedSelectionLimit) || dontNeedToSelect
                    }
                    onChange={() => {
                      const checkedIndex =
                        selectedAbilityBonus.indexOf(ability);

                      if (checkedIndex < 0) {
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
                ) : (
                  <span />
                )}
                <span />
              </React.Fragment>
            );
          })}
        </StyledWrapper>
        <br />
        <p>
          Class: {characterClass.book}, page {characterClass.page}
        </p>
        <p>
          Race: {characterRace.book}, page {characterRace.page}
        </p>
      </DataPanel>
    </>
  );
}

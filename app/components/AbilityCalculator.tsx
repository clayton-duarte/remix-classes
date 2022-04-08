import { useMemo } from "react";

import styled from "@emotion/styled";
import { useLoaderData } from "remix";

import AbilityStepper from "~/components/AbilityStepper";
import BonusCheckbox from "~/components/BonusCheckbox";
import ModifierLabel from "~/components/ModifierLabel";
import SkillCalculator from "~/components/SkillCalculator";
import {
  ABILITY_SCORE_BONUS_VALUE,
  ABILITY_BONUS_LIMIT,
  BASE_ABILITY_SCORE,
  SCORE_COSTS,
  SkillName,
} from "~/helpers/consts";
import {
  CharacterAbility,
  CharacterClass,
  CharacterRace,
  Colors,
  Skill,
} from "~/helpers/types";
import useCharCalculator from "~/hooks/useCharCalculator";

const StyledAbilityLabel = styled.label<{ color: Colors }>`
  color: ${({ theme, color }) => theme[color]};
  text-transform: uppercase;
  justify-self: start;
  font-size: 0.9rem;
  font-weight: 700;
`;

export default function AbilityCalculator({
  keyAbility,
}: {
  keyAbility: CharacterAbility["name"];
}): JSX.Element {
  const {
    scorePointsDistribution,
    selectedAbilityBonus,
    bonusesToSelect,
    pointsToSpend,
    toggleAbility,
  } = useCharCalculator();

  const { characterClass, characterRace, skillList } = useLoaderData<
    Partial<{
      characterClass: CharacterClass;
      characterRace: CharacterRace;
      skillList: Skill[];
    }>
  >();

  if (!characterClass || !characterRace || !skillList) {
    throw new Error("Page loader is missing data");
  }

  const isAbilitySelected = selectedAbilityBonus.includes(keyAbility);
  const classAbilityIndex = characterClass.keyAbilities.indexOf(keyAbility);
  const isRacialAbilityBonus = characterRace.abilityBonus.includes(keyAbility);
  const racialBonus = isAbilitySelected ? ABILITY_SCORE_BONUS_VALUE : 0;

  const dontNeedToSelect =
    characterRace.abilityBonus.length === ABILITY_BONUS_LIMIT;

  const reachedSelectionLimit =
    selectedAbilityBonus.length === ABILITY_BONUS_LIMIT;

  const skillByAbilityMap = useMemo(() => {
    return skillList.reduce((acc, { keyAbility, name }) => {
      const currentList = acc[keyAbility] ?? [];

      return {
        ...acc,
        [keyAbility]: [...currentList, name],
      };
    }, {} as { [key in CharacterAbility["name"]]: SkillName[] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const abilityModifier = Math.floor(
    (Number(SCORE_COSTS[scorePointsDistribution[keyAbility]]) +
      Number(racialBonus) -
      BASE_ABILITY_SCORE) /
      ABILITY_SCORE_BONUS_VALUE
  );

  return (
    <>
      <StyledAbilityLabel
        htmlFor={`${keyAbility}-ability-checkbox`}
        color={
          classAbilityIndex < 0
            ? "black"
            : classAbilityIndex === 0
            ? "success"
            : "warn"
        }
      >
        {/* {isMobile ? keyAbility.slice(0, 3) : keyAbility} */}
        {keyAbility}
      </StyledAbilityLabel>
      <BonusCheckbox
        onChange={() => toggleAbility(keyAbility)}
        id={`${keyAbility}-ability-checkbox`}
        checked={isAbilitySelected}
        badge
        disabled={
          (!isAbilitySelected && reachedSelectionLimit) || // cant select, but can un-select
          !isRacialAbilityBonus || // cant select at all
          dontNeedToSelect // there's no other possible combination
        }
      />
      <AbilityStepper
        baseScore={BASE_ABILITY_SCORE + racialBonus}
        ability={keyAbility}
      />
      <ModifierLabel>{abilityModifier}</ModifierLabel>
      {bonusesToSelect === 0 &&
        pointsToSpend === 0 &&
        skillByAbilityMap[keyAbility].map((skillName) => (
          <SkillCalculator
            key={`${skillName}-skill-calculator`}
            abilityModifier={abilityModifier}
            skillName={skillName}
          />
        ))}
    </>
  );
}

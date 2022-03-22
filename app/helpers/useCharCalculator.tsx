import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";

import { useLoaderData } from "remix";

import {
  ABILITY_BONUS_LIMIT,
  initialScorePointsDistribution,
} from "~/helpers/consts";
import {
  CharacterAbility,
  CharacterClass,
  CharacterRace,
  SkillName,
} from "~/helpers/dataTypes";
import useStorage from "~/helpers/useStorage";

function addItemToList<T>(list: T[], item: T): T[] {
  return [...list, item];
}

function removeItemFromByIndex<T>(list: T[], itemIndex: number): T[] {
  return list.filter((_, index) => itemIndex !== index);
}

interface CharCalculatorCtxType {
  trainedSkills: SkillName[];
  setTrainedSkills: Dispatch<SkillName[]>;
  scorePointsDistribution: typeof initialScorePointsDistribution;
  setScorePointsDistribution: Dispatch<typeof initialScorePointsDistribution>;
  selectedAbilityBonus: CharacterAbility[];
  setSelectedAbilityBonus: Dispatch<CharacterAbility[]>;
}

const CharCalculatorCtx = createContext<CharCalculatorCtxType>(
  {} as CharCalculatorCtxType
);

export function CharCalculatorProvider({ children }: { children: ReactNode }) {
  const { characterClass, characterRace } = useLoaderData<{
    characterClass: CharacterClass;
    characterRace: CharacterRace;
  }>();

  const [trainedSkills, setTrainedSkills] = useStorage<SkillName[]>(
    "trainedSkills"
  )(characterClass.trainedSkills);

  const [scorePointsDistribution, setScorePointsDistribution] = useStorage<
    typeof initialScorePointsDistribution
  >("scorePointsDistribution")(initialScorePointsDistribution);

  const [selectedAbilityBonus, setSelectedAbilityBonus] = useStorage<
    CharacterAbility[]
  >("selectedAbilityBonus")([]);

  useEffect(() => {
    if (characterRace.abilityBonus.length === ABILITY_BONUS_LIMIT) {
      // just select them all!
      setSelectedAbilityBonus(characterRace.abilityBonus);
    } else if (characterRace.abilityBonus.length > ABILITY_BONUS_LIMIT) {
      // we could pre-select some of the class key abilities
      const relevantAbilities = characterRace.abilityBonus.filter((ability) =>
        characterClass.keyAbilities.includes(ability)
      );

      if (relevantAbilities.length <= ABILITY_BONUS_LIMIT) {
        setSelectedAbilityBonus(relevantAbilities);
      }
    }
  }, [characterClass, characterRace, setSelectedAbilityBonus]);

  const classSkills = useMemo(() => {
    if (trainedSkills == null) return [];

    const uniqueInitialSkills = [
      ...new Set([...characterClass.trainedSkills, ...trainedSkills]),
    ];

    return uniqueInitialSkills
      .filter((skillName) => characterClass.skillList.includes(skillName))
      .slice(0, characterClass.skillChoices);
    // trainedSkills is an array and JS have trouble to understand it didn't changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterClass]);

  useEffect(() => {
    setTrainedSkills(classSkills);
  }, [setTrainedSkills, classSkills]);

  if (
    selectedAbilityBonus == null ||
    scorePointsDistribution == null ||
    trainedSkills == null
  ) {
    // TODO: loader
    return null;
  }

  return (
    <CharCalculatorCtx.Provider
      value={{
        trainedSkills,
        setTrainedSkills,
        scorePointsDistribution,
        setScorePointsDistribution,
        selectedAbilityBonus,
        setSelectedAbilityBonus,
      }}
    >
      {children}
    </CharCalculatorCtx.Provider>
  );
}

export default function useCharCalculator() {
  const {
    setScorePointsDistribution,
    scorePointsDistribution,
    setSelectedAbilityBonus,
    selectedAbilityBonus,
    setTrainedSkills,
    trainedSkills,
  } = useContext(CharCalculatorCtx);

  const { characterClass } = useLoaderData<{
    characterClass: CharacterClass;
  }>();

  const skillChoiceLimit = characterClass.skillChoices;

  const toggleSkill = (skillName: SkillName) => {
    const checkedIndex = trainedSkills.indexOf(skillName);

    if (checkedIndex < 0 && trainedSkills.length < skillChoiceLimit) {
      return setTrainedSkills(addItemToList(trainedSkills, skillName));
    }

    return setTrainedSkills(removeItemFromByIndex(trainedSkills, checkedIndex));
  };

  const toggleAbility = (keyAbility: CharacterAbility) => {
    const checkedIndex = selectedAbilityBonus.indexOf(keyAbility);

    if (checkedIndex < 0 && selectedAbilityBonus.length < ABILITY_BONUS_LIMIT) {
      return setSelectedAbilityBonus(
        addItemToList(selectedAbilityBonus, keyAbility)
      );
    }

    return setSelectedAbilityBonus(
      removeItemFromByIndex(selectedAbilityBonus, checkedIndex)
    );
  };

  const sumOfPoints = useMemo(() => {
    return Object.values(scorePointsDistribution ?? {}).reduce(
      (acc, curr) => Number(acc) + Number(curr),
      0 as number
    );
  }, [scorePointsDistribution]);

  return {
    setScorePointsDistribution,
    setSelectedAbilityBonus,
    scorePointsDistribution,
    selectedAbilityBonus,
    setTrainedSkills,
    trainedSkills,
    toggleAbility,
    sumOfPoints,
    toggleSkill,
  };
}

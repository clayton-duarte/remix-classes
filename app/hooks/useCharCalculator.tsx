import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  Dispatch,
  useMemo,
} from "react";

import { useLoaderData } from "remix";

import {
  initialScorePointsDistribution,
  SCORE_POINTS_TO_DISTRIBUTE,
  ABILITY_BONUS_LIMIT,
  SkillName,
} from "~/helpers/consts";
import {
  CharacterAbility,
  CharacterClass,
  CharacterRace,
} from "~/helpers/types";
import useCalculatorWarn from "~/hooks/useCalculatorWarn";
import useStorage from "~/hooks/useStorage";

// local helpers
function addItemToList<T>(list: T[], item: T): T[] {
  return [...list, item];
}

function removeItemFromByIndex<T>(list: T[], itemIndex: number): T[] {
  return list.filter((_, index) => itemIndex !== index);
}

function getInitialAbilityBonusSelection(
  {
    characterClass,
    characterRace,
  }: {
    characterClass: CharacterClass;
    characterRace: CharacterRace;
  },
  callback: Dispatch<CharacterAbility["name"][]>
): void {
  if (characterRace.abilityBonus.length === ABILITY_BONUS_LIMIT) {
    return callback(characterRace.abilityBonus);
  }

  if (characterRace.abilityBonus.length > ABILITY_BONUS_LIMIT) {
    const relevantAbilities = characterRace.abilityBonus.filter((ability) =>
      characterClass.keyAbilities.includes(ability)
    );

    if (relevantAbilities.length <= ABILITY_BONUS_LIMIT) {
      return callback(relevantAbilities);
    }
  }
}

// context
interface CharCalculatorCtxType {
  trainedSkills: SkillName[];
  setTrainedSkills: Dispatch<SkillName[]>;
  scorePointsDistribution: typeof initialScorePointsDistribution;
  setScorePointsDistribution: Dispatch<typeof initialScorePointsDistribution>;
  selectedAbilityBonus: CharacterAbility["name"][];
  setSelectedAbilityBonus: Dispatch<CharacterAbility["name"][]>;
}

const CharCalculatorCtx = createContext<CharCalculatorCtxType>(
  {} as CharCalculatorCtxType
);

export function CharCalculatorProvider({ children }: { children: ReactNode }) {
  const { characterClass, characterRace } = useLoaderData<
    Partial<{
      characterClass: CharacterClass;
      characterRace: CharacterRace;
    }>
  >();

  if (!characterClass || !characterRace) {
    throw new Error("Page loader is missing data");
  }

  const [trainedSkills, setTrainedSkills] = useStorage("trainedSkills")(
    characterClass.trainedSkills
  );

  const [scorePointsDistribution, setScorePointsDistribution] = useStorage(
    "scorePointsDistribution"
  )(initialScorePointsDistribution);

  const [selectedAbilityBonus, setSelectedAbilityBonus] = useStorage(
    "selectedAbilityBonus"
  )<CharacterAbility["name"][]>([]);

  useEffect(() => {
    getInitialAbilityBonusSelection(
      { characterRace, characterClass },
      setSelectedAbilityBonus
    );
  }, [characterClass, characterRace, setSelectedAbilityBonus]);

  const classSkills = useMemo(() => {
    if (trainedSkills == null) {
      return [];
    }

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
        setScorePointsDistribution,
        setSelectedAbilityBonus,
        scorePointsDistribution,
        selectedAbilityBonus,
        setTrainedSkills,
        trainedSkills,
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

  const { characterClass, characterRace } = useLoaderData<
    Partial<{
      characterClass: CharacterClass;
      characterRace: CharacterRace;
    }>
  >();

  const sumOfPoints = useMemo(() => {
    return Object.values(scorePointsDistribution ?? {}).reduce(
      (acc, curr) => Number(acc) + Number(curr),
      0 as number
    );
  }, [scorePointsDistribution]);

  if (!characterClass || !characterRace) {
    throw new Error("Page loader is missing data");
  }

  const hasSkillChoices = characterClass.skillChoices - trainedSkills.length;
  const bonusesToSelect = ABILITY_BONUS_LIMIT - selectedAbilityBonus.length;
  const pointsToSpend = SCORE_POINTS_TO_DISTRIBUTE - sumOfPoints;

  useCalculatorWarn({ pointsToSpend, bonusesToSelect, hasSkillChoices });

  const toggleSkill = (skillName: SkillName) => {
    const checkedIndex = trainedSkills.indexOf(skillName);

    if (
      checkedIndex < 0 &&
      trainedSkills.length < characterClass.skillChoices
    ) {
      return setTrainedSkills(addItemToList(trainedSkills, skillName));
    }

    return setTrainedSkills(removeItemFromByIndex(trainedSkills, checkedIndex));
  };

  const toggleAbility = (keyAbility: CharacterAbility["name"]) => {
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

  const reset = () => {
    setScorePointsDistribution(initialScorePointsDistribution);

    getInitialAbilityBonusSelection(
      { characterRace, characterClass },
      setSelectedAbilityBonus
    );

    setTrainedSkills([]);
  };

  return {
    // state
    setScorePointsDistribution,
    setSelectedAbilityBonus,
    scorePointsDistribution,
    selectedAbilityBonus,
    setTrainedSkills,
    trainedSkills,
    // actions
    toggleAbility,
    toggleSkill,
    reset,
    // consts
    hasSkillChoices,
    bonusesToSelect,
    pointsToSpend,
    sumOfPoints,
  };
}

import { CharacterAbilityName } from "~/helpers/types";

export const SCORE_POINTS_TO_DISTRIBUTE = 20;

export const BASE_ABILITY_SCORE = 10;

export const ABILITY_BONUS_LIMIT = 2;

export const SCORE_COSTS = [
  10, 11, 12, 13, 13, 14, 14, 15, 15, 16, 16, 16, 17, 17, 17, 17, 18,
] as const;

export const COST_BY_SCORE = [0, 1, 2, 3, 5, 7, 9, 12, 16] as const;

export const ABILITY_SCORE_BONUS_VALUE = 2;

export const TRAINED_SKILL_BONUS_VALUE = 5;

export const initialScorePointsDistribution: Record<
  CharacterAbilityName,
  typeof COST_BY_SCORE[number]
> = {
  [CharacterAbilityName.Charisma]: 0,
  [CharacterAbilityName.Constitution]: 0,
  [CharacterAbilityName.Dexterity]: 0,
  [CharacterAbilityName.Intelligence]: 0,
  [CharacterAbilityName.Strength]: 0,
  [CharacterAbilityName.Wisdom]: 0,
} as const;

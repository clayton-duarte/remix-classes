import faunadb, {
  Function as Fn,
  Intersection,
  // Difference,
  Collection,
  Documents,
  Paginate,
  Distinct,
  Select,
  Lambda,
  // Filter,
  // Equals,
  Match,
  Index,
  Merge,
  Union,
  Call,
  Var,
  Map,
  Get,
  Let,
} from "faunadb";

import { CharacterRoleName, PowerSourceName } from "~/helpers/consts";
import {
  CharacterAbility,
  CharacterClass,
  CharacterRole,
  CharacterRace,
  PowerSource,
  Skill,
} from "~/helpers/types";

interface QueryResponse<TData> {
  data: TData;
}

type Collections =
  | "character_roles"
  | "power_sources"
  | "character_class"
  | "character_race"
  | "character_skills"
  | "character_abilities";

class FaunaService<
  TData extends
    | CharacterRole
    | PowerSource
    | CharacterClass
    | CharacterRace
    | Skill
    | CharacterAbility
> {
  public client: faunadb.Client;
  public collection: Collections;

  constructor(collection: Collections) {
    this.collection = collection;

    this.client = new faunadb.Client({
      secret: process.env.FAUNA_ADMIN_KEY ?? "",
      keepAlive: false,
    });
  }

  public getAll() {
    return this.client.query<QueryResponse<TData[]>>(
      Map(
        Paginate(Documents(Collection(this.collection)), { size: 100 }),
        Lambda("x", Call(Fn("extract"), Var("x")))
      )
    );
  }

  public getOneByName(name: TData["name"]) {
    return this.client.query<QueryResponse<TData>>(
      Get(Match(Index(`${this.collection}_by_name`), name))
    );
  }
}

export class CharacterRoleService extends FaunaService<CharacterRole> {
  constructor() {
    super("character_roles");
  }
}

export class PowerSourcesService extends FaunaService<PowerSource> {
  constructor() {
    super("power_sources");
  }
}

export class CharacterClassService extends FaunaService<CharacterClass> {
  constructor() {
    super("character_class");
  }

  public getCharacterClassByRoleAndPowerSource(
    mainRole: CharacterRoleName,
    powerSource: PowerSourceName
  ) {
    return this.client.query<QueryResponse<CharacterClass[]>>(
      Map(
        Paginate(
          Match(
            Index("character_class_by_power_and_role"),
            powerSource,
            mainRole
          )
        ),
        Lambda("x", Call(Fn("extract"), Var("x")))
      )
    );
  }
}

export class CharacterRaceService extends FaunaService<CharacterRace> {
  constructor() {
    super("character_race");
  }

  public getCharacterRaceByAbilityBonus(
    abilityBonuses: CharacterAbility["name"][]
  ) {
    const [coreAbility] = abilityBonuses;

    return this.client.query<QueryResponse<CharacterRace[]>>(
      Map(
        Paginate(
          Intersection(
            // required
            Match(Index("character_race_by_ability_bonus"), coreAbility),
            // optionals
            Union(
              abilityBonuses.map((ability) =>
                Match(Index("character_race_by_ability_bonus"), ability)
              )
            )
          )
        ),
        Lambda(
          "ref",
          Let(
            {
              doc: Get(Var("ref")),
              data: Merge(Select(["data"], Var("doc")), {
                // filters out unrelated abilities
                abilityBonus: Intersection(
                  Select(["data", "abilityBonus"], Var("doc")),
                  abilityBonuses
                ),
              }),
            },
            Var("data")
          )
        )
      )
    );
  }
}

export class CharacterSkillsService extends FaunaService<Skill> {
  constructor() {
    super("character_skills");
  }

  public getAllSkillAbilities() {
    return this.client.query<QueryResponse<CharacterAbility["name"][]>>(
      Paginate(Distinct(Match(Index("character_skills_abilities"))))
    );
  }
}

export class CharacterAbilitiesService extends FaunaService<CharacterAbility> {
  constructor() {
    super("character_abilities");
  }
}

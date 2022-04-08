import faunadb, {
  Function as Fn,
  Intersection,
  // Difference,
  Collection,
  Documents,
  Paginate,
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

import {
  CharacterRoleName,
  PowerSourceName,
  CharacterClass,
  CharacterRole,
  CharacterRace,
  PowerSource,
  CharacterAbility,
} from "~/helpers/dataTypes";

interface QueryResponse<TData> {
  data: TData;
}

type Collections =
  | "character_roles"
  | "power_sources"
  | "character_class"
  | "character_race";

class FaunaService<
  TData extends CharacterRole | PowerSource | CharacterClass | CharacterRace
> {
  public client: faunadb.Client;
  private collection: Collections;

  constructor(collection: Collections) {
    this.collection = collection;

    this.client = new faunadb.Client({
      secret: process.env.FAUNA_ADMIN_KEY ?? "",
      keepAlive: false,
    });
  }

  public getMany() {
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

  public getCharacterRaceByAbilityBonus(abilityBonuses: CharacterAbility[]) {
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

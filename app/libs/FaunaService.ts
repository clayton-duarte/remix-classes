import faunadb, {
  Function as Fn,
  Collection,
  Documents,
  Paginate,
  // Select,
  Lambda,
  Match,
  Index,
  Call,
  Var,
  Map,
  Get,
  // Let,
  // Ref,
} from "faunadb";

import {
  CharacterRoleName,
  PowerSourceName,
  CharacterClass,
  CharacterRole,
  CharacterRace,
  PowerSource,
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
}

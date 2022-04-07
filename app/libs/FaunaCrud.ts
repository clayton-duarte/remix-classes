import faunadb, {
  Collection,
  Documents,
  Paginate,
  Select,
  Lambda,
  Match,
  Index,
  Var,
  Map,
  Get,
  // Let,
  // Ref,
} from "faunadb";

import { CharacterRole, PowerSource } from "~/helpers/dataTypes";

type Collections = "roles" | "power_sources";

type DataTypes = CharacterRole | PowerSource;

interface QueryResponse<TData> {
  data: TData;
}

// TODO: find a way to infer TData based on collection
export default class FaunaCrud<TData extends DataTypes> {
  private client: faunadb.Client;
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
        Lambda("ref", Select(["data"], Get(Var("ref"))))
      )
    );
  }

  public getOneByName(name: TData["name"]) {
    return this.client.query<QueryResponse<TData>>(
      Get(Match(Index(`${this.collection}_by_name`), name))
    );
  }
}

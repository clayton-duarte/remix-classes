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
  // Let,
  // Ref,
  Get,
} from "faunadb";

export default class FaunaCrud<T extends { name: string }> {
  private client: faunadb.Client;
  private collection: string;

  constructor(collection: string) {
    this.collection = collection;

    this.client = new faunadb.Client({
      secret: process.env.FAUNA_ADMIN_KEY ?? "",
      keepAlive: false,
    });
  }

  public getMany() {
    return this.client.query<{ data: T[] }>(
      Map(
        Paginate(Documents(Collection(this.collection)), { size: 100 }),
        Lambda("ref", Select(["data"], Get(Var("ref"))))
      )
    );
  }

  public getOneByName(name: T["name"]) {
    return this.client.query<{ data: T }>(
      Get(Match(Index(`${this.collection}_by_name`), name))
    );
  }
}

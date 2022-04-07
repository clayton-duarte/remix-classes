import faunadb, {
  Collection,
  Documents,
  Paginate,
  Select,
  Lambda,
  // Match,
  // Index,
  Var,
  Map,
  // Let,
  Get,
} from "faunadb";

export default class FaunaCrud<T> {
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
}

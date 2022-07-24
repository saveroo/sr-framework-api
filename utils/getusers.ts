import faunadb, { Client, ClientConfig, query } from 'faunadb';
import fs from 'fs';
const q = query;


const { FAUNADB_SECRET, FAUNADB_COLLECTIONNAME } = process.env


const opts: ClientConfig = {
  secret: FAUNADB_SECRET as string,
  domain: 'db.fauna.com',
  scheme: 'https',
};

class dbClass {
  public client: faunadb.Client;
  public q: any;
  private readonly collection: string;

  constructor(client: Client, q: any) {
    this.client = client;
    this.q = q;
    this.collection = FAUNADB_COLLECTIONNAME as string;
  }

  async create(dt: SRFApis.IFromFauna) {
    const query = await this.client.query(
      this.q.Create(this.q.Collection(this.collection), { data: dt })
    );
    return query;
  }

  async createWithId(id: string, dt: any) {
    return await this.client.query(
      this.q.Create(this.q.Ref(this.q.Collection(this.collection), id), {
        data: dt,
      })
    );
  }

  async updateByRef(refId: number, dt: any) {
    return await this.client.query(
      this.q.Update(this.q.Ref(q.Collection(this.collection), refId), {
        data: dt,
      })
    );
  }

  async getIndexByTerms(indexName: string, terms: string): Promise<string> {
    return await this.client.query(
      this.q.Map(
        this.q.Paginate(this.q.Match(this.q.Index(indexName), terms)),
        this.q.Lambda('deviceId', this.q.Get(this.q.Var('deviceId')))
      )
    );
  }

  async getIndex(documentName: string): Promise<string>{
    return await this.client.query(
      this.q.Map(
        this.q.Paginate(this.q.Match(this.collection))
      )
    )
  }

  async get(id: string) {
    await this.client.query(
      this.q.Get(this.q.Ref(this.q.Collection(this.collection), id))
    );
  }



//   async tes() {}

  public c() {
      return this.client;
  }

  public qq(): dbClass {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const newLocal = this;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return newLocal.q;
  }
}

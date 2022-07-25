import faunadb, { Client, ClientConfig, query } from 'faunadb';
import {SRFApis} from 'app/types/SRFApis';

const q = query;

const secret = process.env.FAUNADB_SECRET || process.env.FAUNADB_SERVER_KEY;

const opts: ClientConfig = {
  secret: secret as string,
  domain: 'db.fauna.com',
  scheme: 'https',
};

class dbClass {
  private client: faunadb.Client;
  private q: any;
  private readonly collection: string;

  constructor(client: Client, q: any) {
    this.client = client;
    this.q = q;
    this.collection = process.env.FAUNADB_COLLECTIONNAME || 'users';
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

  async getIndex(): Promise<string>{
    return await this.client.query(
      this.q.Map(
        this.q.Paginate(this.q.Match(this.collection))
      )
    )
  }

  async getData(): Promise<any>{
    return await this.client.query(q.Map(
      q.Paginate(
        q.Documents(q.Collection(this.collection)), { size: 10000 }),
        q.Lambda((data) => q.Get(data))
        ))
  }

  async get(id: string) {
    await this.client.query(
      this.q.Get(this.q.Ref(this.q.Collection(this.collection), id))
    );
  }
}

const client = new faunadb.Client(opts);

export default new dbClass(client, q);

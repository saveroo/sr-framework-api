import faunadb, { Client, ClientConfig, query } from 'faunadb';

const q = query;

const secret = process.env.FAUNADB_SECRET || process.env.FAUNADB_SERVER_KEY;

const opts: ClientConfig = {
  secret,
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
    this.collection = 'sr_users';
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

  async getIndexByTerms(indexName: string, terms: string) {
    return await this.client.query(
      this.q.Map(
        this.q.Paginate(this.q.Match(this.q.Index(indexName), terms)),
        this.q.Lambda('deviceId', this.q.Get(this.q.Var('deviceId')))
      )
    );
  }

  async get(id: string) {
    await this.client.query(
      this.q.Get(this.q.Ref(this.q.Collection(this.collection), id))
    );
  }
}

const client = new faunadb.Client(opts);

export default new dbClass(client, q);

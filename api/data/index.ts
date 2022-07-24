import {NowRequest, NowResponse} from '@vercel/node/dist';
import crypt from '../../utils/crypt';
import {SchemaData} from '../../utils/loaders';
import guard from '../../utils/guard';
import {CreateResponse} from '../../utils/response';
const {CRYPT_KEY} = process.env;
// TODO: Check Version properly
// /check/version
export default async (request: NowRequest, response: NowResponse) => {
  // console.log('query: ' + request.query);
  // console.log('headers: ' + request.headers);
  // guard an api

  await guard(request, response).then(async (condition) => {
    const data = await SchemaData;
    if(condition){
      switch(request.query.ops) {
        case 'meta':
          const stringify = JSON.stringify(data)
          const encryptedBody = crypt.encrypted(CRYPT_KEY as string, stringify);

          return CreateResponse(response,
            200,
            encryptedBody,
            {author: crypt.salt()});
      }
    }
  }).catch((err) => {
    return response.status(400).send(err);
  })
}

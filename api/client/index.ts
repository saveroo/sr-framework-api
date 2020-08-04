﻿﻿// import faunadb, {Client, ClientConfig, query} from 'faunadb'
import { default as srCrypt } from '../../utils/crypt';
import { NowRequest, NowResponse } from '@vercel/node/dist';
import DB from '../../utils/db';
import Guard from '../../utils/guard';
const {CRYPT_KEY} = process.env

module.exports = async (request: NowRequest, response: NowResponse) => {
  // console.log('query: ' + request.query);
  // console.log('headers: ' + request.headers);
  return Guard(request, response)
    .then(async (condition) => {
      try {
        if(condition) {
          switch (request.query.ops) {
            case 'register':
              // Legacy
              // let data = Buffer.from(req.body.data, 'base64').toString();
  
              // New AES Encrypted
              let data: any = srCrypt.decrypted(CRYPT_KEY as string, request.body.data);
              data = JSON.parse(data);
              // data.data.iso
  
              const clientData: SRFApis.IFromFauna = {
                // ref: "SURGASAVERO",
                count: 1,
                // deviceId: "tessst",
                deviceId: request.body.deviceId,
                data,
              };
              const dbq = DB;
              const helper: any = await dbq.getIndexByTerms(
                'user_by_deviceId',
                clientData.deviceId
              );
              const serverData = helper.data[0];
  
              let deviceId;
              if (helper.data.length > 0) deviceId = serverData.data.deviceId;
  
              // new Date
              const dt = new Date().toString();
  
              // If supplied data is not the same as in db, then create new;
              if (clientData.deviceId != deviceId) {
                clientData.data.FirstRun = dt;
                clientData.data.LastActive = dt;
                const result: any = await dbq.create(clientData);
                response.status(200).json({
                  refId: result.ref.id,
                  deviceId: clientData.deviceId,
                  data: '',
                });
              } else { // else update the registered user device
                const refId = serverData.ref.id;
                await dbq.updateByRef(refId, {
                  // ref: refId,
                  count: serverData.data.count+1,
                  data: {
                    LastActive: dt,
                  },
                });
                response.status(200).json({
                  refId,
                  deviceId: serverData.data.deviceId,
                  data: '',
                });
              }
              break;
            case 'update':
              response.status(200).send("placeholder");
              break;
            case 'retrieve':
              break;
            case 'logout':
              break;
            default:
              response.status(300).send('Something went wrong');
              break;
          }
        }
      } catch (error) {
        console.log('Catch what ?')
        response.status(400).json({ error });
      }
    })
    .catch((err) => {
      response.status(404).send(err);
    });
};

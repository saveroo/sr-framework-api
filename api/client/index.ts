﻿// import faunadb, {Client, ClientConfig, query} from 'faunadb'
import { default as srCrypt } from '../../utils/crypt';
import { NowRequest, NowResponse } from '@vercel/node/dist';
import { SRFApis } from '../../types/SRFApis';
import DB from '../../utils/db';
import Guard from '../../utils/guard';

// const q = query;

// const {decrypted} = require("../../util/crypt")
// const fs = require("fs");
// const _ = require("lodash");
// const json = require("../../util/utils");

// const secret: string = "fnADxVYOkQACEngPSzJ3jq0d7VJ2btleWzRFPs6H";
// const secret = process.env.FAUNADB_SECRET || process.env.FAUNADB_SERVER_KEY;

// const opts: ClientConfig = {
//   secret,
//   domain: 'db.fauna.com',
//   scheme: 'https',
// }

// const client = new faunadb.Client(opts);

module.exports = async (request: NowRequest, response: NowResponse) => {
  return Guard(request, response)
    .then(async (condition) => {
      try {
        if(condition)
        switch (request.query.ops) {
          case 'register':
            // Legacy
            // let data = Buffer.from(req.body.data, 'base64').toString();

            // New AES Encrypted
            let data: any = srCrypt.decrypted('SRFramework', request.body.data);
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
            } else {
              const refId = serverData.ref.id;
              await dbq.updateByRef(refId, {
                // ref: refId,
                count: serverData.data.count++,
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
            break;
          case 'retrieve':
            break;
          case 'logout':
            break;
          default:
            response.status(300).send('Something went wrong');
            break;
        }
      } catch (error) {
        response.status(400).json({ error });
      }
    })
    .catch((err) => {
      response.status(404).send(err);
    });
};

// import faunadb, {Client, ClientConfig, query} from 'faunadb'
import { default as srCrypt } from '../../utils/crypt';
import { NowRequest, NowResponse } from '@vercel/node/dist';
import DB from '../../utils/db';
import Guard from '../../utils/guard';
import steam from '../../utils/steampie'; //
import { SwitchOnlineStatus } from '../../utils/online';
import { CreateResponse } from '../../utils/response';
import fetch from 'node-fetch';
const {CRYPT_KEY} = process.env

// Faunda DB Class, get index and put as ServerData
// Register
// - Get Index
// Steam
// - blabla
const dbq = DB;


// new Date, for updating last Active
const dt = new Date();

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

              // New AES Encrypted, decrypted the payload send by apps.
              const data: SRFApis.SRClient = JSON.parse(srCrypt.decrypted(CRYPT_KEY as string, request.body.data));

              // Construct decrypted payload Client Data From FAUNDADB
              const clientData: SRFApis.IFromFauna = {
                // ref: "SURGASAVERO",
                count: 1,
                // deviceId: "tessst",
                deviceId: request.body.deviceId,
                data,
              };

              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              // helper from FaunaDB, getting Index by unique DeviceId.
              const helper: any = await dbq.getIndexByTerms(
                'user_by_deviceId',
                clientData.deviceId
              );
              const serverData = helper.data[0];

              let deviceId;
              if (helper.data.length > 0) deviceId = serverData.data.deviceId;


              // Mutate Online Status
              SwitchOnlineStatus(clientData.data, true);

              // If supplied data is not the same as in db, then create new;
              if (clientData.deviceId != deviceId) {
                console.info('[Registration]', 'Client Data is not the same as deviceId');
                clientData.data.FirstRun = dt;
                clientData.data.LastActive = dt;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const result: any = await dbq.create(clientData);
                response.status(200).json({
                  refId: result.ref.id,
                  deviceId: clientData.deviceId,
                  data: '',
                });
              } else { // else update the registered user device
                console.info('[Registration]', 'Client Data is the same as deviceId');
                const refId = serverData.ref.id;
                await dbq.updateByRef(refId, {
                  // ref: refId,
                  count: parseInt(serverData.data.count) + 1,
                  data: {
                    LastActive: dt,
                    IsOnline: true // switch online, redundant, temporary solution.
                  },
                });
                response.status(200).json({
                  refId,
                  deviceId: serverData.data.deviceId,
                  data: '',
                });
              }
              break;
            case 'update': // What's this?
              response
                .status(200)
                .send('placeholder');
              break;
            case 'steam': // Below:
              // Get Steam Player Information
              // if(data.SteamPlayerID != null)
              if(request.body) {
                const player = await steam.GetPlayerSummaries(request.body.playerSteamID);
                await dbq.updateByRef(request.body.refId, {
                  data: {
                    LastActive: dt,
                    STEAM: player
                  }
                })
                // Decript
                // let data: any = srCrypt.decrypted(CRYPT_KEY as string, request.body.data);
                // data = JSON.parse(data);

                console.log('[STEAM]', request.body)
                // jkljl
                response.status(200).json(player);
              }
              break;
            case 'retrieve':
              console.log('[RETRIEVE] User', request.query)
              if(request.query.id == null) return CreateResponse(response, 400, {});
              const players: SRFApis.SRPlayers = {
                Players: [],
              }
              // console.log(players)
              const fetchData: any = await dbq.getData();
              const collections = fetchData as SRFApis.TResponseFaunaGetCollections;
              // response.status(200).json(collections);
              if(collections.data.length < 1)
                return CreateResponse(response, 400, {});


              for (let index = 0; index < collections.data.length; index++) {
                const user: SRFApis.SRClient = collections.data[index].data.data;
                delete user.DeviceID;
                delete user.UUID;
                delete user.CPU;
                delete user.OS;
                delete user.ExePath;
                delete user.MachineName;

                //Transform Date to ISO string, so could be deserialized later on.
                user.FirstRun = new Date(user.FirstRun);
                user.LastActive = new Date(user.LastActive);
                if(user.hasOwnProperty('STEAM')) {
                  const playerSteam = user.STEAM;
                  // playerSteam.avatarfull = await fetch(playerSteam.avatarfull).then(async r => {const buf = await r.arrayBuffer(); return `${Buffer.from(buf).toString("base64")}`});
                  // playerSteam.avatar = await fetch(playerSteam.avatar).then(async r => {const buf = await r.arrayBuffer(); return `${Buffer.from(buf).toString("base64")}`});
                  // playerSteam.avatarmedium = await fetch(playerSteam.avatarmedium).then(async r => {const buf = await r.arrayBuffer(); return `${Buffer.from(buf).toString("base64")}`});
                  // user.STEAM = playerSteam
                  players.Players.push(user);
                }
              }
              response.status(200).json(players);
              break;
            case 'status':
              if(request.body.refId) {
                await dbq.updateByRef(request.body.refId, {
                  data: {
                    LastActive: dt,
                    IsOnline: request.body.IsOnline,
                  }
                })
                console.log('[User] Offline:', request.body.refId);
                // Decript
                // let data: any = srCrypt.decrypted(CRYPT_KEY as string, request.body.data);
                // data = JSON.parse(data);
                response.status(200).send('placeholder');
              }
              break;
            case 'logout':
              break;
            default:
              response.status(300).send('Something went wrong');
              break;
          }
        }
      } catch (error: unknown) {
        CreateResponse(response, 500, (error as string).toString());
      }
    })
    .catch((err) => {
      response.status(404).send(err);
    });
};

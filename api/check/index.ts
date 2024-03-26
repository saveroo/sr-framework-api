import {CreateResponse} from '../../utils/response';
import {SchemaData, SchemaDonators} from '../../utils/loaders';
import Guard from '../../utils/guard';
import {VercelRequest, VercelResponse} from '@vercel/node';
import {SRFeature} from '../../types/SRFeature';
import {SRFApis} from '../../types/SRFApis';

// TODO: Check Version properly
// /check/version

function partially<T>(obj: T): Partial<T> {
  return obj as Partial<T>;
}

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  await Guard(req, res).then(async (allowed) => {
    if (allowed) {
      switch (req.query.ops) {
        case 'device':
          console.log('body', req.body);
          console.log('header', req.headers);
          return await SchemaDonators.then((data) => {
            console.log('query', req.query);
            const ga = data as SRFApis.SRDonators;
            if(req.body.DeviceID !== null) {
              // console.log(req.body.DeviceID === ga.whitelistedDevice.find(k => k === req.body.DeviceID))
              if(req.body.DeviceID === ga.whitelistedDevice.find(k => k === req.body.DeviceID))
                return CreateResponse(res, 200, {approval: true, DeviceID: 'Registered'});
              else
                return CreateResponse(res, 200, {approval: false, DeviceID: 'Unregistered'})
            } else {
              CreateResponse(res, 400, {})
            }
          });
        default:
          return await SchemaData.then((data): VercelResponse => {
            if(data == undefined)
              return res.status(500).json({
                status: res.statusCode,
                body: data,
              });

              const games = partially<SRFeature.Game[]>(data.Games);
              for (let i = 0; i < games.length; i++) {
                const game = games[i];

                if (game == undefined) break;
                delete game.FormatTypes

                for (let j = 0; j < game.Versions.length; j++) {
                  const version = game.Versions[j];

                  if (version == undefined) break;
                  delete version.Categories;
                  delete version.Pointers;
                }
              }
            return res.status(200).json({
              status: res.statusCode,
              body: data,
            });
          });
        }
      }
  }).catch(err => {
    return res.status(400).send(err);
  })
};

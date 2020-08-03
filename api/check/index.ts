﻿import { NowRequest, NowResponse } from '@vercel/node/dist';
import json from '../../utils/loaders';
import Guard from '../../utils/guard';

// TODO: Check Version properly
// /check/version
module.exports = async (req: NowRequest, res: NowResponse) => {
  Guard(req, res).then(async (condition) => {
    if (condition) {
      return await json.then((data) => {
        const ga = data as SRFeature.RootObject;
        const games = ga.Games;
        for (let i = 0; i < games.length; i++) {
          for (let j = 0; j < games[i].Versions.length; j++) {
            delete games[i].Versions[j].Pointers;
            delete games[i].Versions[j].Categories;
          }
        }
        return res.status(200).json({
          status: res.statusCode,
          body: data,
        });
      });
    }
  }).catch(err => {
    return res.status(400).send(err);
  })
};
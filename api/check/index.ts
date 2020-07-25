﻿import {NowRequest, NowResponse} from '@vercel/node/dist';
import {SRFeature} from '../../types/SRFeature';
import json from '../../utils/loaders';

// TODO: Check Version properly
// /check/version
module.exports = async (req: NowRequest, res: NowResponse) => {
  const key = 'sr';
  const reqAgent = req.headers['user-agent'] === 'SRFramework';
  const reqKey = (key: string) => {
    return req.query.key == key ;
  };
  // delete json["Games"];
  // if(reqAgent)
  if(reqKey(key) && reqAgent) {
    return await json.then((data) => {
      const ga = data as SRFeature.RootObject;
      const games = ga.Games;
      for (let i = 0; i < games.length; i++) {
        for (let j = 0; j < games[i].Versions.length; j++) {
          delete games[i].Versions[j].Pointers
          delete games[i].Versions[j].Categories
        }
      }
      return res.status(200).json({
        status: res.statusCode,
        body: data
      });
    })
  }
  return res.status(404).send('Error');
}

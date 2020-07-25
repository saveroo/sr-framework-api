﻿import {NowRequest, NowResponse} from '@vercel/node/dist';
import crypt from '../../utils/crypt';
import json from '../../utils/loaders';
import guard from '../../utils/guard';
const {CRYPT_KEY} = process.env; 
// TODO: Check Version properly
// /check/version
module.exports = async (request: NowRequest, response: NowResponse) => {
  guard(request, response).then(async (condition) => {
    const data = await json;
    if(condition){
      const stringify = JSON.stringify(data)
      const encryptedBody = crypt.encrypted(CRYPT_KEY as string, stringify);
      return response.status(200).json({
        status: response.statusCode,
        author: crypt.salt(),
        body: encryptedBody,
      });
    }
  }).catch((err) => {
    return response.status(400).send(err);
  })
}
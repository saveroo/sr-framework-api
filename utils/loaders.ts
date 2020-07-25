﻿import jsonfile from 'jsonfile';
import { SRFeature } from '../types/SRFeature';
import path from 'path';

export default new Promise((resolve, reject) => {
  const jsonPath = path.resolve(__dirname, '../statics/SRFeature.json')
  console.log(jsonPath)
  const load: Promise<SRFeature.RootObject> = jsonfile.readFile(jsonPath);
  load.then((data: SRFeature.RootObject) => {
    resolve(data);
  }).catch(e => {
    reject(e)
  })
  // const json: Promise<SRFeature.RootObject> = jsonfile.readFile(`${__dirname}/../data/SRFeature.json`);
  // json.then((data: SRFeature.RootObject) => {
  //   resolve(data);
  // }).catch(e => {
  //   reject(e)
  // })
})

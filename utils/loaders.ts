﻿import jsonFile from 'jsonfile';
import path from 'path';

export default new Promise((resolve, reject) => {
  const jsonPath = path.resolve(__dirname, '../statics/SRFeature.json')
  const load: Promise<SRFeature.RootObject> = jsonFile.readFile(jsonPath);
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

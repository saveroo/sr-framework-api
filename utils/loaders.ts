import jsonFile from 'jsonfile';
import path from 'path';
import {SRFApis} from '../types/SRFApis';
import {SRFeature} from '../types/SRFeature';

export const SchemaDonators = new Promise((resolve, reject) => {
  const jsonPath = path.join(__dirname, '../statics/donators.json');
  const load: Promise<SRFApis.SRDonators> = jsonFile.readFile(jsonPath);
  load.then((data: SRFApis.SRDonators) => {
    resolve(data);
  }).catch((err) => reject(err));
});

export const SchemaData =  new Promise<SRFeature.RootObject | undefined>((resolve, reject) => {
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

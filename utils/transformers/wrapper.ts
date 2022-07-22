import {SRFeature} from '../../types/SRFeature';
import json from 'jsonfile';
import * as _ from 'lodash';


// Feature Wrapper
////////////////////////////////////////////////////////////////
// Start config
const START_INDEX = 19;
const FILE_PATH = './statics/';
const FILE_NAME = [
  'ResourceNewDisplayName_test.json',
  'StagedAddress3.json',
]; // To Join
const GAMES_INDEX = 0; // that contains features
const VERSIONS_INDEX = 0; // that contains features
const CATEGORY_INDEX = 1; // that contains features
const EXPORT_FILENAME = 'NewResourceFeature.json'; // To Export
const NEW_CATEGORY_FILE = 'FullCategory.json';
const NEW_FEATURE_JSON = 'PartialFeature.json';

// FEATURE JOINER
/////////////////////////////////////
const _SRFeature: SRFeature.RootObject = json.readFileSync('./statics/SRFeature.json');
const _NEWFeature: SRFeature.Feature[] = ((): SRFeature.Feature[] => {
  const _features: SRFeature.Feature[] = [];
  _.each(FILE_NAME, (fileName) => {
    const a = json.readFileSync(FILE_PATH + fileName);
    console.log(`Reading ${fileName}`, a.length);
    _features.push(json.readFileSync(FILE_PATH + fileName));
  });
  return _.flatten(_features);
})()

const a = _NEWFeature.length
// Destructure SRFeature.json
const { Games } = _SRFeature;
// Destructure Games
const { Versions } = Games[0];
// Destructure Versions
const { Categories } = Versions[0];
// Destructure Categories
const { subCategories, features } = Categories[CATEGORY_INDEX];
// new Index Number for features

console.log('[Checking]');
console.log('SubCategories: ', subCategories.length)
console.log('Features: ', features.length); // 79 is normal
console.log('New Features: ', _NEWFeature.length, '\n');
console.log('[Joining], Please wait...', '\n');
// take first from _NEWFeature
const FirstFeature = _NEWFeature[0].name;
const joinedFeatures = _NEWFeature;
// const checkF = _.uniqBy(joinedFeatures, "Name");

// CHECK
/////////////////////////////////////
// const displayName = joinedFeatures.map(f => f.name);

console.log('[Reindexing]');
console.log('Start Index: ', START_INDEX);
const newlyIndexedFeature = joinedFeatures.map((f, k) => {f.id = START_INDEX+k;return f;});
console.log('End Index:', START_INDEX + newlyIndexedFeature.length);
console.log('New Feature Start Index:',  newlyIndexedFeature.filter(f => f.name === FirstFeature)[0].id, newlyIndexedFeature.filter(f => f.name === FirstFeature)[0].name, '\n');

const featureCount = newlyIndexedFeature.length;
console.log('[New Feature Count]', featureCount, '\n');

console.log('[Exporting to File]', EXPORT_FILENAME);
const fileName = FILE_PATH + EXPORT_FILENAME;
json.writeFileSync(fileName, newlyIndexedFeature);

// FEATURE INDEXER
/////////////////////////////////////

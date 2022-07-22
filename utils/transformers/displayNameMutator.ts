////////////////////////////////////////////////////////////////
// append to feature.name
// Create new feature with new name
import * as _ from "lodash";
import {SRFeature} from "../../types/SRFeature";
import json from "jsonfile";

const Resources = [
  'Agriculture',
  'Rubber',
  'Timber',
  'Petroleum',
  'Coal',
  'Metal Ore',
  'Uranium',
  'Electric Power',
  'Consumer Goods',
  'Industry Goods',
  'Military Goods',
]

const Groups = [
  'Stock',
  'Demands',
  'Actual Use',
  'Production',
  'Production Capacity',
  'Production Cost',
  'Market Price',
  'Margin',
  'Base Cost',
  'Full Cost',
  'City Production',
  'Node Production',
  'Max Demand',
  'Min Demand',
  'HexMultiplier'
]

const appendGroupsExceptLast2 = (featurename: string, groups: string[]) => {
  const _groups = groups.slice(0, groups.length - 2);
  return _groups.map(group => `${group}`);
}
const replaceToCamelCase = (str: string) => {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

const _SRFeature: SRFeature.RootObject = json.readFileSync('./statics/SRFeature.json');
// Destructure SRFeature.json
const { Games } = _SRFeature;
// Destructure Games
const { Versions } = Games[0];
// Destructure Versions
const { Categories } = Versions[0];
// Destructure Categories
const { subCategories, features } = Categories[1];


// new Index Number for features
let newIndex = features.map((f, k) => {f.id = 19+k;return f;});

let filter = _.groupBy(newIndex, 'displayName');
_.each(Resources, (feature, key) => {
  _.each(filter[feature], (f, key) => {
    // if(f.displayName == undefined)
    f.displayName = Groups[key];
  });
});

let a = _.flatMap(filter);
let sorted = _.sortBy(a, 'id');
// get sorted displayName
let sortedDisplayName = sorted.map(f => f.displayName);
let uniq = _.uniq(sortedDisplayName);
// Save to JSON named ResourceNewDisplayName.json
const fileName = './statics/ResourceNewDisplayName_test.json';
json.writeFileSync(fileName, sorted);

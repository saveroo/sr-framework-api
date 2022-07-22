import * as _ from 'lodash';
import json from 'jsonfile';
import {SRFeature} from '../../types/SRFeature';
import {forEach} from 'lodash';

// To Transform META later
const _SRFeature: SRFeature.RootObject = json.readFileSync('./statics/SRFeature.json');
// Destructure SRFeature.json
const { Games } = _SRFeature;
// Destructure Games
const { Versions } = Games[0];
// Destructure Versions
const { Categories } = Versions[0];
// Destructure Categories
const { subCategories, features } = Categories[1];

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
]

// append group except the last 2 element
// const appendGroupsExceptLast2 = (featurename: string, groups: string[]) => {
//   const _groups = groups.slice(0, groups.length - 2);
//   return _groups.map(group => `${group}`);
//
// append Groups string to featurename
// const appendGroups = (featurename: string, groups: string[]) => {
//   return groups.map(group => `${group}`);
// };
// appendGroups('Agriculture', Groups);
// Mutate displayName in features if match regex

const excludedWords = [
  '[EXP]',
  'Produced From',
  'HexMultiplier'
]

// replace displayName in features if contains any of the following words
const replaceDisplayName = (featurename: string, words: string[]) => {
  return words.map(word => {
    if (featurename.includes(word)) {
      return word;
    }
  }
  ).filter(word => word !== undefined);
};



replaceDisplayName('HexMultiplierAgriculture', excludedWords);

const mutatedFeatureDisplayName = features.map(v => {
  const featurename = v.displayName;
  const mutatedFeatureDisplayName = replaceDisplayName(featurename, excludedWords);
  if(replaceDisplayName(v.name, excludedWords).length > 0) {
    v.displayName = <string>replaceDisplayName(v.name, excludedWords)[0];
  }
  if (mutatedFeatureDisplayName.length > 0) {
    v.displayName = <string>mutatedFeatureDisplayName[0];
  }
  return v;
})

const featuresGrouped = _.groupBy(mutatedFeatureDisplayName, 'displayName');
const featuresGroupedKeys = Object.keys(featuresGrouped);

const { Id, CategoryName, CategoryDisplayName, CategoryVisibility, CategoryDescription, CategoryIncludedFeatures } = subCategories[1];
// Map feature with regex name to new subcategory includedFeature
let i = 0;
const newSubCategories = _.map(featuresGrouped, (feature, k) => {
  i += 1

  let categoryName = `SUBRESOURCES_${feature[0].displayName.split(' ').join('').toUpperCase()}`

  // If name start with 'Produced From'
  if (feature[0].displayName.match(/^Produced From/))
    categoryName = 'SUBRESOURCES_PRODUCEDFROM';
  if (feature[0].displayName.match(/^\[EXP\]/))
    categoryName = 'SUBRESOURCES_SPECIAL';
  if (feature[0].displayName.match(/^HexMultiplier/i))
    categoryName = 'SUBRESOURCES_HEXMULTIPLIER';

  const newSubCategory = {
    Id: i,
    CategoryName: categoryName,
    CategoryDisplayName: feature[0].displayName,
    CategoryVisibility: true,
    CategoryExpanded: true,
    CategoryDescription: feature[0].description,
    CategoryIncludedFeatures: feature.map((f) => f.name),
  };
  return newSubCategory;
});

newSubCategories.map(v => v.CategoryName);
// replace to camelCase
// Save to JSON
// const fileName = './statics/AlternativeResourcesCategory.json';
const fileName = './statics/CountryBattalionSizeSubCategory.json';
// json.writeFileSync(fileName, newSubCategories);

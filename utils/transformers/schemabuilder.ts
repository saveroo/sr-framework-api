






import * as _ from 'lodash';
import json from 'jsonfile';
import {SRFeature} from '../../types/SRFeature';

// To Transform META later
const _SRFeature: SRFeature.RootObject = json.readFileSync('./statics/SRFeature.json');
// Iterate and mutate Games
for (let i = 0; i < _SRFeature.Games.length; i++) {
    const _Game = _SRFeature.Games[i];
    // Iterate and mutate Versions
    for (let j = 0; j < _Game.Versions.length; j++) {
        const _Version = _Game.Versions[j];
        // Iterate and mutate Pointers
        for (let k = 0; k < _Version.Categories.length; k++) {
        const _Category = _Version.Categories[k];
        // Iterate and mutate Categories
        for (let l = 0; l < (_Category.features).length; l++) {
            const _Feature = _Category.features[l].category;
            console.log(_Feature)
            // Iterate and mutate Columns

        }
        }
    }
}

// To Transform Pointer Step
const toHex = (s: number) => s.toString(16);
const toDec = (s: string) => parseInt(s, 16);

const Resources = [
    'Agriculture',
    'Rubber',
    'Timber',
    'Petroleum',
    'Coal',
    'MetalOre',
    'Uranium',
    'ElectricPower',
    'ConsumerGoods',
    'IndustryGoods',
    'MilitaryGoods',
]

const format= [
  'volumes,Tonnes',
  'volumes,Tonnes',
  'volumes,m3',
  'volumes,Barrels',
  'volumes,Tonnes',
  'volumes,Tonnes',
  'volumes,kg',
  'volumes,MWh',
  'volumes,Tonnes',
  'volumes,Tonnes',
  'volumes,Tonnes',
]

const namesVariation = [
  'Stock',
  'Demands',
  'ActualUse',
  'Production',
  'ProductionCapacity',
  'ProductionCost',
  'MarketPrice',
  'Margin',
  'BaseCost',
  'FullCost',
  'CityProduction',
  'NodeProduction',
  'MaxDemand',
  'MinDemand',
]

const CONST_BATTALION_SIZE_TYPE = [
  'Recon',
  'Tank',
  'Anti Tank',
  'Artillery',
  'Air Defense',
  'Land Transport',
  'Helicopter',
  'Missile',
  'Interceptor',
  'Tactical Bomber',
  'Multi Role',
  'Strategic Bomber',
  'Air Patrol',
  'Air Transport',
  'Submarine',
  'Carrier',
  'Battleship',
  'Frigate',
  'Sea Patrol',
  'Sea Transport',
  'Upgrade',
  'Unused'
]

const hexStepper = (offset: string,
                           baseHex: string | null,
                           perStep: number | string,
                           loopTimes: number,
): Promise<string[]> => {
  const _temp: Array<string> = [];
  let _bufferBase = toDec(baseHex as string);
  let _bufferPointer = toDec(offset);
  for (let i = 0; i < loopTimes; i++) {
    // _temp.push(toHex(_bufferBase) + '+' + toHex(_bufferPointer))
    _temp.push(toHex(_bufferPointer))
    _bufferBase += typeof perStep == 'number' ? perStep : toDec(perStep);
    _bufferPointer += typeof perStep == 'number' ? perStep : toDec(perStep);
  }
  return new Promise((res, rej) => {
    _temp.length > 0
      ? res(_temp)
      : rej([])
  })
}

// Step Hexadicmal with decimal step
const stepHex = (hex: string, step: number): string => {
  const _temp = toDec(hex) + step;
  return toHex(_temp);
}

void hexStepper('0x18', '0x0', 4, 8).then((result) => {
  console.log(result);
  console.log(stepHex('0x18', 4));
  console.log(toHex(84) );
  console.log(toDec('84'));
});


// Replace camelcase into space
const replaceCamelCase = (str: string) => {
  return str
    .replace(/([A-Z])/g, '$1')
    .replace(/^./, function(str: string) {
      return str.trimLeft().toUpperCase();
    });
};

// convert string to camelcase
const toCamelCase = (str: string) => {
  return str
    .replace(/\s(.)/g, function($1: string) {
      return $1.toUpperCase();
    }
  ).replace(/\s/g, '');
}

//first word to uppercase
const firstUpper = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//Remove Space from string and make it camelcase
const removeSpace = (str: string) => {
  return str.replace(/\s/g, '');
}

console.log(replaceCamelCase('MilitaryAir'));
console.log(toDec('0x01105DEC'))
// console.log(hexStepper('18', '3DDD5650', '84', aggr.length))

// const _schemaStructure: SRFeature.Feature = {
//     id: 311,
//     subCategoryId: 2,
//     pointerId: 3,
//     name: 'armyEntrenchment',
//     displayName: 'test',
//     type: 'float',
//     category: 'warfare',
//     description: 'entrenchment',
//     original: '',
//     value: '',
//     // default: '',
//     formattedValue: '',
//     format: 'percentage',
//     offset: '0x8C',
//     editable: true,
//     enabled: true
// }

// Substract Hexadicaml by certain step
const substractHex = (hex: string, step: string): string => {
    const _temp = toDec(hex);
    const _step = toDec(step);
    return toHex(_temp - _step);
}

// Margin: -10 (8)
// Base cost: -8 (10)
// Full Cost: -4 (14)
// Node Production: 0 (18)
//  - City Production: +4 (1C)
//  - Max Production/Person: +8 (20)
//  - Min Production/Person: +12 (24)
//  FROM: step 4
//  - Min Production/Person: +16 (28)
//  - Min Production/Person: +20 (28)
//  - Min Production/Person: +24 (28)
//  - Min Production/Person: +28 (28)
console.log(substractHex('18', '10'))


// const newAddress: Array<SRFeature.Feature> = [];
// hexStepper('18', '3DDD5650', '84', Resources.length).then(res => {
//   let _newSchema = {} as SRFeature.Feature;
//   _.each(res, (value, key) => {
//     _newSchema = _.clone(_newSchema);
//     _newSchema.Id = 88888+key
//     _newSchema.SubCategoryId = 8
//     _newSchema.PointerId = 31 // user ptr market price
//     _newSchema.Name = `NodeProduction${Resources[key]}`
//     _newSchema.DisplayName = replaceCamelCase(Resources[key]),
//     _newSchema.Type = 'float'
//     _newSchema.Category = 'Resources'
//     _newSchema.Description = 'Max Possible Output'
//     _newSchema.Original = ''
//     _newSchema.Value = ''
//     _newSchema.Default = ''
//     _newSchema.FormattedValue = ''
//     _newSchema.Format = ''
//     _newSchema.Offset = `0x${value}`
//     _newSchema.Editable = _schemaStructure.Editable
//     _newSchema.Enabled = _schemaStructure.Enabled
//     console.log(_newSchema.Offset);
//     newAddress.push(_newSchema)
//     })
//   // json.writeFileSync('./statics/StagedAddress.json', newAddress);
// }).catch(err => {
//   console.log(err);
// });

interface OldFeature {
  id: number;
  // subcategoryid: number;
  pointerId: number;
  name: string;
  displayName: string;
  type: string;
  category: string;
  description: string;
  // original: string;
  value: string;
  // default: string;
  formattedValue: string;
  format: string;
  offset: string;
  editable: boolean;
  enabled: boolean;
}
const newAddress: Array<OldFeature> = [];
const SchemaBuilder = (namePrefix: string, description: string, offset: string, startId:
                         number, id: number, displayName: string, format: string,
                       pointerId: number) => {
  let _newSchema = {} as OldFeature;
    _newSchema = _.clone(_newSchema);
    _newSchema.id = startId + id
    // _newSchema.SubCategoryId = subCategoryId;
    _newSchema.pointerId = pointerId; // user ptr market price
    _newSchema.name = `${namePrefix}${toCamelCase(firstUpper(CONST_BATTALION_SIZE_TYPE[id]))}`
    _newSchema.displayName = displayName == '' ? replaceCamelCase(CONST_BATTALION_SIZE_TYPE[id]) : displayName,
      _newSchema.type = 'float'
    _newSchema.category = 'Country'
    _newSchema.description = description
    // _newSchema.Original = ''
    _newSchema.value = ''
    // _newSchema.Default = ''
    _newSchema.formattedValue = '';
    _newSchema.format = format;
    _newSchema.offset = `${offset}`
    _newSchema.editable = true,
    _newSchema.enabled = true
  return _newSchema;
}
type Nullable<T> = T | null;
const SchemaLooper = async (
  startId: number,
  namePrefix: string,
  displayName: any,
  description: string,
  offsetList: string[],
  format?: string[]
) => {
  const Arr = [];
  for (let i = 0; i < offsetList.length; i++) {
    const _newSchema: OldFeature = SchemaBuilder(
      namePrefix,
      description,
      offsetList[i],
      startId,
      i,
      typeof displayName === 'function' ? displayName(i) : displayName,
      format ? format[i] : '',
      31);
    Arr.push(_newSchema);
  }
  return Arr;
};

// Create new schema for resources
void (async () => {
  /**
   *  Stepping through the hexadecimal address and return stepped array
   */
  // const test = stepHex('18', -16);
  const nodeProductionOffset = await hexStepper('18', '3DDD5650', 132, Resources.length);
  // console.log(nodeProductionOffset);
  const marginOffset = _.map(nodeProductionOffset, (v) => stepHex(v, 16*4));
  // console.log(marginOffset);
  const baseCostOffset = _.map(nodeProductionOffset, (v) => stepHex(v, -8));
  // console.log(baseCostOffset);
  const fullCostOffset = _.map(nodeProductionOffset, (v) => stepHex(v, -4));
  // console.log(fullCostOffset);
  const cityProductionOffset = _.map(nodeProductionOffset, (v) => stepHex(v, 4));
  // console.log(cityProductionOffset);
  const maxDemand = _.map(nodeProductionOffset, (v) => stepHex(v, 8));
  // console.log(maxDemand);
  const minDemand = _.map(nodeProductionOffset, (v) => stepHex(v, 12));
  // console.log(minDemand);
  const hexOffsetModifier = await hexStepper('640', '3DDD5650', 4, Resources.slice(0, 8).length);
  // console.log(minDemand);
  const producedFroms = () => _.map(nodeProductionOffset, async (v, k) => await hexStepper(stepHex(v, 16), '', 4, Resources.length));

  const battalionSizeOffset = await hexStepper('660', '01105DEC', 4, CONST_BATTALION_SIZE_TYPE.length);

  // console.log(await producedFroms()[1])

  /**
   *  Create the schema, loop throught all the offset list above and return [SRFeature.Feature] Schema
   */
  const MarginSchema = await SchemaLooper(91234,'Margin', '','Prod/Cost Margin',
    marginOffset);
  const BaseCostSchema = await SchemaLooper(92234, 'BaseCost', '','Base production cost',
    baseCostOffset);
  const FullCostSchema = await SchemaLooper(93234, 'FullCost', '','Full cost, affect market price',
    fullCostOffset);
  const CityProductionSchema = await SchemaLooper(94234,'CityProduction', '','City Production',
    cityProductionOffset);
  const NodeProductionSchema = await SchemaLooper(95234,'NodeProduction', '','Max Possible Output',
    nodeProductionOffset,
    format);
  const MaxDemandSchema = await SchemaLooper(96234,'MaxDemand', '','Max Production /person',
    maxDemand);
  const MinDemandSchema = await SchemaLooper(96234, 'MinDemand', '','Min Production /person',
    minDemand);

  // New
  const WarfareBattalionSizeSchema = await SchemaLooper(96234, 'WarfareBattalionSize', '','Max Battalion Size',
    battalionSizeOffset);

  // Create HEX Multiplier Name
  const HexMultiplierSchema = await SchemaLooper(97234,
    'HexMultiplier', '',
    'Multiply Hex Production',
    hexOffsetModifier);


  // Iterate throught PRODUCED_FROM feature
  const producedFromCollectionSchemas = [];
  for (let i = 0; i < producedFroms().length; i++) {
    const from = await SchemaLooper(1111 + (await producedFroms()[i]).length * i, Resources[i]+'ProducedFrom',
      'Produced From', 'Produced from', await producedFroms()[i]);
    // change from displayName to name
    for (let j = 0; j < from.length; j++) {
      from[j].displayName = `${Resources[i]} ${from[j].displayName} ${Resources[j]}`;
    }
    producedFromCollectionSchemas.push(from);
  }

  const buildedSchema = _.concat(
    // MarginSchema,
    // BaseCostSchema,
    // FullCostSchema,
    // CityProductionSchema,
    // NodeProductionSchema,
    // MaxDemandSchema,
    // MinDemandSchema,
    // ..._.flatten(producedFromCollectionSchemas),
    // HexMultiplierSchema,
    WarfareBattalionSizeSchema
    );

  // Match certain string and return
  const matchString = (str: string, strList: string[], returnThis: string) => {
    for (let i = 0; i < strList.length; i++) {
      if (str.includes(strList[i])) {
        return strList[i];
      }
    }
    return returnThis;
  }
  const replaceDisplayName = (featurename: string, words: string[]) => {
    return words.map(word => {
        if (featurename.includes(word)) {
          return _.startCase(word);
        }
      }
    ).filter(word => word !== undefined);
  };
  // change buildedSchema displayName if contains in includedwords
  for (let i = 0; i < buildedSchema.length; i++) {
    if(replaceDisplayName(buildedSchema[i].name, namesVariation))
      buildedSchema[i].displayName = matchString(buildedSchema[i].name,
        namesVariation,
        buildedSchema[i].displayName);
    // buildedSchema[i].displayName =
    //   replaceDisplayName(buildedSchema[i].displayName, namesVariation)[0] || buildedSchema[i].displayName;
  }

  WarfareBattalionSizeSchema.map(v => v.name);
  const panjang = buildedSchema.length;
  const unix = _.uniqBy(buildedSchema, 'displayName');
  // json.writeFileSync('./statics/StagedAddress_BattalionSize.json', buildedSchema);
})();

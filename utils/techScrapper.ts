// import cheerio from "cheerio";

const htm = `
<ul><li>1: (Not used?)</li>
<li>2: Finished Goods Facilities Cost</li>
<li>3: Facilities Construction Materials Use</li>
<li>4: Pollution Levels (Not used)</li>
<li>5: Research Efficiency</li>
<li>6: Counter Intelligence Efficiency</li>
<li>7: Intelligence Efficiency</li>
<li>8: Military Efficiency</li>
<li>9: City Power Generation</li>
<li>10: Mine Field Damage on us (Not used)</li>
<li>11: Mine Field Lethality (Not used)</li>
<li>12: Chemical Weapon Protection <i>(Unused prior to SRGW / SRU 9.1.26)</i></li>
<li>13: Vehicle Fuel Consumption</li>
<li>14: Cost of Motorized Units</li>
<li>15: Unit Build Speed</li>
<li>16: Facility Build Speed</li>
<li>17: Urban Development (no longer used; now uses <i>replaceby</i> and Tech PreReq's in Equip List)</li>
<li>18: Finished Goods Facilities Efficiency</li>
<li>19: Finished Goods Costs</li>
<li>20: Transportation Improvement (Not used)</li>
<li>21: Space Race</li>
<li>22: Nuclear Plant Maintenance Cost</li>
<li>23: GUI Skin (Special case, selects GUI Skin)</li>
<li><i><b>Effects 24 to 34 Modify the use of Raw Goods in Finished Goods Production</b></i>
<ul><li>24: Finished Goods Agri Raw Use</li>
<li>25: Finished Goods Rubber Raw Use <i>(was Water pre-SR1936)</i></li>
<li>26: Finish Goods Timber Raw Use</li>
<li>27: Finished Goods Petrol Raw Use</li>
<li>28: Finished Goods Coal Raw Use</li>
<li>29: Finished Goods Ore Raw Use</li>
<li>30: Finish Goods Uranium Raw Use</li>
<li>31: Finished Goods Electrical Raw Use</li>
<li>32: Finish Goods Consumer Raw Use</li>
<li>33: Finished Goods Industrial Raw Use</li>
<li>34: Finish Goods Military Raw Use</li></ul></li>
<li><i><b>Effects 36 to 55 are referenced from the Equipment List Facilities Entries uProdTech</b></i>
<ul><li>35: Synthetic Rubber Production</li>
<li>36: Hydroponic Plant Production</li>
<li>37: Composites Plant Production</li>
<li>38: SynthFuel Plant Production</li>
<li>39: Power - Coal Production</li>
<li>40: Power - Nuclear Production</li>
<li>41: Power - Petrol Production</li>
<li>42: Power - Other Production</li>
<li>43: Power - Fusion Production</li>
<li>44: Consumer Goods Plant Production</li>
<li>45: Industrial Goods Plant Production</li>
<li>46: Military Goods Plant production</li>
<li>47: Power - Antimatter Production</li>
<li>48: Power - Dark Energy Production</li>
<li>49: N/A</li>
<li>50: N/A</li>
<li>51: N/A</li>
<li>52: N/A</li>
<li>53: N/A</li>
<li>54: N/A</li>
<li>55: Oil Derrick Production</li></ul></li>
<li>56: Atomic Race</li>
<li>57: Reserved</li>
<li>58: Internet Race</li>
<li>59: Mars Race</li>
<li><i><b>Effects 60 to 71 are for Modifying Population Use of Resources</b></i>
<ul><li>60: Population Agri Use</li>
<li>61: Population Rubber Use <i>(was Water pre-SR1936)</i></li>
<li>62: Population Timber Use</li>
<li>63: Population Petrol Use</li>
<li>64: Population Coal Use</li>
<li>65: Population Ore Use</li>
<li>66: Population Uranium Use</li>
<li>67: Population Power Use</li>
<li>68: Population Consumer Goods Use</li>
<li>69: Population Ind Goods Use</li>
<li>70: Population Mil Goods Use</li>
<li>71: (Reserved)</li></ul></li>
<li><i><b>Effects 72 to 83 are for Modifying Output of Goods Production</b></i>
<ul><li>72: Output of Agriculture</li>
<li>73: Output of Rubber <i>(was Water pre-SR1936)</i></li>
<li>74: Output of Timber</li>
<li>75: Output of Petrol</li>
<li>76: Output of Coal</li>
<li>77: Output of Ore</li>
<li>78: Output of Uranium</li>
<li>79: Output of (All) Power</li>
<li>80: Output of Consumer Goods</li>
<li>81: Output of Industrial Goods</li>
<li>82: Output of Military Goods</li>
<li>83: (Reserved)</li></ul></li>
<li><i><b>Effects 84 to 95 are for Modifying the Efficiency of Goods Production</b></i>
<ul><li>84: Efficiency of Agriculture</li>
<li>85: Efficiency of Rubber <i>(was Water pre-SR1936)</i></li>
<li>86: Efficiency of Timber</li>
<li>87: Efficiency of Petrol</li>
<li>88: Efficiency of Coal</li>
<li>89: Efficiency of Ore</li>
<li>90: Efficiency of Uranium</li>
<li>91: Efficiency of Power</li>
<li>92: Efficiency of Consumer Goods</li>
<li>93: Efficiency of Industrial Goods</li>
<li>94: Efficiency of Military Goods</li>
<li>95: (Reserved)</li></ul></li>
<li>96: Garrison Infantry Level (New SRGW/SRU)</li>
<li>97:</li>
<li>98:</li>
<li>99:</li>
<li><i><b>Effects 100 to 107 Adjust the Social Spending Ratings</b></i>
<ul><li>100: Health Care Rating</li>
<li>101: Education Rating</li>
<li>102: Infrastructure Rating</li>
<li>103: Environment Rating</li>
<li>104: Family Rating</li>
<li>105: Law Enforcement Rating</li>
<li>106: Cultural Rating</li>
<li>107: Social Services Rating</li></ul></li>
<li><i><b>Effects 108 to 115 Adjust the Social Spending Costs</b></i>
<ul><li>108: Health Care Cost</li>
<li>109: Education cost</li>
<li>110: Infrastructure Cost</li>
<li>111: Environment Cost</li>
<li>112: Family Subsidy Cost</li>
<li>113: Law Enforcement Cost</li>
<li>114: Cultural Cost</li>
<li>115: Social Services Cost</li></ul></li>
<li>116: Hard Target Defense</li>
<li>117: Soft Target Defense</li>
<li>118: Ground Attack Values</li>
<li>119: Anti-Air Attack Values</li>
<li>120: Anti-Ship Attack Values</li>
<li>121: Anti-Sub Attack Values</li>
<li>122: Ballistic Artillery Range</li>
<li>123: Missile Accuracy</li>
<li>124: Stealth Strength Values</li>
<li>125: Spotting Strength Values</li>
<li>126: MLRS Range</li>
<li>127: Facility (Fortification) Defense</li>
<li><i>128 - 199&nbsp;: Added for Version 9.1.204, Currently Unused</i></li></ul>
`

const regex = /<li>(.*)<\/li>/gm;
let m;
const has = [];
let c = 1;
console.log('var string[] TechEffectList = {')
while((m = regex.exec(htm)) !== null) {
    if(m.index === regex.lastIndex) {
        regex.lastIndex++;
    }

    m.forEach((match, groupIndex) => {
        if(groupIndex == 1) {
            // console.log(match)
            console.log(`{"${match}", ${c++}},`)
        }
    })
}
console.log('}')

// console.log(has);

// const fetchShit = async () => {
//     let ft = await fetch("https://supremeruler.gamepedia.com/Tech_Tree")
// }

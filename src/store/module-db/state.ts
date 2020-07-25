export interface SRFChangelog {
  Date: string;
  Version: string;
  Type: string;
  Title: string;
  Description: string;
  Changes: string[];
}

export interface SRFSocial {
  SocialIcon: string;
  SocialName: string;
  SocialAccount: string;
  SocialLink: string;
}

export interface Pointer {
  id: number;
  name: string;
  description: string;
  category: string;
  categoryScope: any[];
  offsetsList: number[];
  pointer: string;
}

export interface Feature {
  id: number;
  pointerId: number;
  name: string;
  displayName: string;
  type: string;
  category: string;
  description: string;
  value: string;
  formattedValue: string;
  format: string;
  offset: string;
  editable: boolean;
  enabled: boolean;
}

export interface Category {
  id: number;
  featureCount: number;
  category: string;
  description: string;
  columnsVisibility: number[];
  features: Feature[];
}

export interface Version {
  GameVersion: string;
  Availability: boolean;
  Pointers: Pointer[];
  Categories: Category[];
}

export interface Game {
  DisplayName: string;
  ProcessName: string;
  Versions: Version[];
}

export interface RootObject {
  SRFAuthor: string;
  SRFContact: string;
  SRFRepository: string;
  SRFChangelog: SRFChangelog[];
  SRFKnownBugs: string[];
  SRFTodos: string[];
  SRFSocial: SRFSocial[];
  SRFWebsite: string;
  SRFStatus: boolean;
  SRFMirrorList: string[];
  SRFName: string;
  SRFDescription: string;
  SRFIdentifier: string;
  SRFVersion: string;
  SRFRevision: string;
  SRFDownloadLink: string;
  SRFTags: string[];
  SRFSchema: string;
  SRFHelp: string;
  Games: Game[];
}

const state: RootObject = {
  SRFAuthor: 'Muhammad Surga Savero',
  SRFContact: 'sysadmin47@gmail.com',
  SRFRepository: '',
  SRFChangelog: [],
  SRFKnownBugs: [],
  SRFTodos: [],
  SRFSocial: [],
  SRFWebsite: 'https://saveroo.netlify.app',
  SRFStatus: true,
  SRFMirrorList: [],
  SRFName: 'SR Helper',
  SRFDescription: 'Supreme Ruler Ultimate Trainer with lots of option',
  SRFIdentifier: 'SR_RTE',
  SRFVersion: '1.0.0.0',
  SRFRevision: '(180720 r1)',
  SRFDownloadLink: 'https://google.com',
  SRFTags: [],
  SRFSchema: '',
  SRFHelp:
    '\n[Country]\nList of domestic/country/diplomatic information, \nsuch as treasury, gdp/etc\n\n[Resources]\nContain resource stock,\nthere will be Market Price, Market Production Cost\nOutput efficiency\n\n\n[Warfare]\nWarfare are consist of 2 types of Editing object,\n\n1. Unit (Selected Unit)\nModifying this value will only change unit stat of the unit u select, upon removal of selection, the unit will not be tracker\n\n2. Unit (Stat of selected Unit [Warfare Editor]), \nModifying this value will change the unit original stat.\n\n[Warfare: Calculated option]\n-Heal - will heal the current selected unit to actual state form.\n-Rambo - Unit morale/eff/exp overload.\n-GasSupply2x - Unit current fuel/supply multiplied by 2\n-GasSupply4x - Unit current fuel/supply multiplied by 4\n-Str2x - Unit current strength Multiplied by 2\n-Str4x - Unit current strength Multiplied by 4\n\n[Warfare: Persistent]\nA List to track godmode unit\n\n[Warfare: Modified]\nA List to revert/change global modified unit back to original value\n\n[Special]\nClick Day option\n- 1 Day Research, Go to research Tab > Select/Hover on queue to complete the selected research\n- 1 Day Army, Go to defense production > Building X / X\n- 1 Day Build, Go to land tab, select the building you want to complete (this will not affect AI)\n\n[Special: Facilities]\nThis are not yet implemented, it will contain specific building variables to change (AI Affected), supply level etc.',
  Games: [],
};

export default state;

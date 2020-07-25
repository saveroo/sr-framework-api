export namespace SRFeature {

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

}


export declare namespace SRFeature {

  export type SRFChangelog = {
    Date: string;
    Version: string;
    Type: string;
    Title: string;
    Description: string;
    Changes: string[];
  }

  export type SRFSocial = {
    SocialIcon: string;
    SocialName: string;
    SocialAccount: string;
    SocialLink: string;
  }

  export type Pointer = {
    Id: number;
    Name: string;
    Description: string;
    Category: string;
    CategoryScope: any[];
    OffsetsList: number[];
    Pointer: string;
  }

  export type Feature = {
    id: number;
    subCategoryId: number;
    pointerId: number;
    name: string;
    displayName: string;
    type: string;
    category: string;
    description: string;
    original: string;
    value: string;
    defaultValue: string;
    formattedValue: string;
    format: string;
    offset: string;
    editable: boolean;
    enabled: boolean;
  }

  type Category = {
    Id: number;
    FeatureCount: number;
    Category: string;
    Description: string;
    CategoryShownColumns: CategoryShownColumn[];
    subCategories: SubCategory[];
    RowOrders: string[];
    features: Feature[];
    RowExclusion?: string[];
  }

  type SubCategory = {
    Id: number;
    CategoryName: string;
    CategoryDisplayName: string;
    CategoryVisibility: boolean;
    CategoryDescription: string;
    CategoryIncludedFeatures: string[];
    CategoryExpanded?: boolean;
  }

  type CategoryShownColumn = {
    ColumnName: string;
    ColumnMinWidth: number;
    ColumnMaxWidth: number;
    ColumnAllowEdit: boolean;
  }

  export type Version = {
    GameVersion: string;
    Availability: boolean;
    Pointers: Pointer[];
    Categories: Array<Category>;
  }

  type FormatType = {
    FormatID: number;
    FormatName: string;
    FormatDisplayName: string;
    FormatSchema: string[];
    FormatData: (number | string)[][];
  }

  export type Game = {
    DisplayName: string;
    ProcessName: string;
    FormatTypes: FormatType[];
    Versions: Version[];
  }

  export type RootObject = {
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
    SRFMandatoryUpdate: boolean;
    SRFMandatoryUpdateMessage: string;
    SRFUpdateMessage: string;
    SRFDownloadLink: string;
    SRFTags: string[];
    SRFSchema: string;
    SRFHelp: string;
    Games: Game[];
  }

}


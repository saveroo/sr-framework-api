declare namespace SRFApis {

  export interface TResponseFaunaGetCollections {
    data: TResponseFaunaCollection[],
  }

  export interface TResponseFaunaCollection {
    ref: unknown,
    ts: number,
    data: IFromFauna
  }

  export interface IFromFauna {
    count: number,
    deviceId: string,
    data: SRClient
  }

  export interface ClientOS {
    Name: string;
    Build: number;
    Version: string;
    Architecture: string;
    MaxProcessCount: number;
    MaxProcessRAM: number;
    SerialNumber: string;
  }

  export interface ClientCPU {
    ID: string;
    Name: string;
    Description: string;
  }

  export interface ClientSteamProfile {
    steamid: string,
    realname: string,
    personaname: string,
    profileurl: string,
    avatar: string,
    avatarmedium: string,
    avatarfull: string,
    avatarhash: string,
    profilestate: number,
    commentpermission: number,
    personastate: number,
    personastateflags: number,
    primaryclanid: string,
    // timecreated: 1371301688,
    timecreated: number,
    // lastlogoff: 1597229763,
    lastlogoff: number,
    loccountrycode: string,
    locstatecode: string
  }

  export interface SRClient {
    ref: string;
    DeviceID?: string;
    UUID?: string;
    MachineName?: string;
    ExePath?: string;
    FirstRun: Date;
    LastActive: Date;
    ElapsedTime: string;
    IsOnline: boolean;
    SRVersion: string;
    SRRevision: string;
    OS?: ClientOS[];
    CPU?: ClientCPU[];
    STEAM?: ClientSteamProfile;
  }

  export interface SRDonator {
    ref: string,
    deviceId: string,
    steamid: string,
    name: string,
    email: string,
    amount: string,
    via: string,
    date: string,
    extras: string,
    whitelisted: boolean
  }

  // export interface SRWhitelist {
  //   DeviceID: string[]
  // }

  // export interface SRBlacklist {
  //   DeviceID: string[]
  // }

  type SRBlacklist = string[];
  type SRWhitelist = string[];

  export interface SRDonators {
    donators: SRDonators,
    whitelistedDevice: SRWhitelist,
    blacklistedDevice: SRBlacklist,
  }

  type SRClientPreview = Exclude<SRClient, 'OS | CPU | DeviceID | UUID | MachineName | ExePath'>

  export interface SRPlayers {
    Players: SRClientPreview[]
  }

}


declare namespace SRFApis {

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
    timecreated: 1371301688,
    lastlogoff: 1597229763,
    loccountrycode: string,
    locstatecode: string
  }

  export interface SRClient {
    ref: string;
    DeviceID: string;
    UUID: string;
    MachineName: string;
    ExePath: string;
    FirstRun: string;
    LastActive: string;
    ElapsedTime: string;
    IsOnline: boolean;
    SRVersion: string;
    SRRevision: string;
    OS: ClientOS[];
    CPU: ClientCPU[];
    STEAM?: ClientSteamProfile;
  }

}


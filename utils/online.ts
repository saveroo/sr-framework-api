import {SRFApis} from 'app/types/SRFApis';

export const SwitchOnlineStatus = (userData: SRFApis.SRClient, onlineStatus: boolean) => {
    userData.IsOnline = onlineStatus;
    return userData;
}

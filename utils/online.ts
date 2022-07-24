export const SwitchOnlineStatus = (userData: SRFApis.SRClient, onlineStatus: boolean) => {
    userData.IsOnline = onlineStatus;
    return userData;
}
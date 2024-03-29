﻿function SteamBaseURL (apiPath: string) {
    const base = 'http://api.steampowered.com/'
    const path = (apiPath: string) => {
        return `ISteamUser/${apiPath}/v0002/`
    }
    const craftedUrl = new URL('/', base)
    craftedUrl.pathname = path(apiPath)
    return craftedUrl;
}

const GetPlayerSummaries = async (SteamID64: string) => {
    const url = SteamBaseURL('GetPlayerSummaries');
    const params = {
        key: '',
        steamids: ''
    };
    const {each} = await import('lodash')
    params.key = process.env.STEAM_KEY as string;
    params.steamids = SteamID64
    each(params, (v, k) => {
        url.searchParams.set(k, v);
    })

    const axios = (await import('axios')).default;
    const res = await axios(url.href)
    return res.data.response.players[0] as string;
}

export default {
    GetPlayerSummaries
}
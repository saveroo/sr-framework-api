import { NowRequest, NowResponse } from '@vercel/node/dist';
import crypt from './crypt';
const { HMAC_KEY, GUARD_AGENT, GUARD_REFERER, GUARD_KEY } = process.env



export default async (request: NowRequest, _: NowResponse) => {
    return new Promise((resolve, reject) => {
        
        const { url } = request
        const { pathname, searchParams} = new URL(url as string, 'http://localhost/')
        
        const clientUserAgent = GUARD_AGENT,
              clientReferer = GUARD_REFERER,
              clientKey = GUARD_KEY;

        const token = searchParams.get('token')
        const key = searchParams.get('key')

        const tokenValidation = token === crypt.hmac(HMAC_KEY as string, pathname);

        // let createResponse = (str:string,) => {
        //     response.status(400).send(str);
        //     return false;
        // }

        if(request.headers['user-agent'] != clientUserAgent){
            reject(false)
        }

        if(request.headers['referer'] != clientReferer) {       
            reject(false)
        } 

        if(HMAC_KEY != null) {

            if(token == null) {
                reject(false)
            }

            if(!tokenValidation){
                reject(false)
            }

            if(clientKey == null || clientKey != key ) {
                reject(false)
            }

            resolve(true)
        }
        
        reject(false)
    })
}
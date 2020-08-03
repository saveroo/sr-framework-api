import crypt from './crypt';
const { HMAC_KEY, GUARD_AGENT, GUARD_REFERER, GUARD_KEY, GUARD_STATE } = process.env

export default async (request: any, _?: any) => {
    return new Promise((resolve, reject) => {

        if(GUARD_STATE == "0") {
            resolve(true);
        } else {
        const { url } = request
        const { pathname, searchParams} = new URL(url as string, 'http://localhost/')

        const clientUserAgent = GUARD_AGENT as string,
              clientReferer = GUARD_REFERER as string,
              clientKey = GUARD_KEY as string;

        const clientToken = searchParams.get('token');
        const key = searchParams.get('key')

        console.log(url);
        // crypt.base64HmacDecoder(clientToken as string)
        const tokenValidation = clientToken == crypt.hmac(HMAC_KEY as string, pathname);
        console.log(tokenValidation)

        // let createResponse = (str:string,) => {
        //     response.status(400).send(str);
        //     return false;
        // }

        if(request.headers['user-agent'] as string != clientUserAgent){
            console.error("Agent False");
            reject(false)
        }
        
        if(request.headers['referer'] as string != clientReferer) {       
            console.log(request.headers['referer'] ,"Referer False", clientReferer);
            reject(false)
        } 

        if(HMAC_KEY != null) {

            if(!tokenValidation){
                console.log("Validation False");
                reject(false)
            }

            if(clientKey == null || clientKey != key ) {
                console.log("Client Key");
                reject(false)
            }
            resolve(true)
        }
        reject(false)
        }
    })
}
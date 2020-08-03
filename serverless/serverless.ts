import guard from "app/utils/guard";
// import {} from "@types/node";
import json from '../utils/loaders'
import crypt from '../utils/crypt'

const {CRYPT_KEY} = process.env

interface IHelloWorld {
    body?: string,
    status?: number,
}

export default {
    data: (ctx: any, req: any) => {
        guard(req, null).then(async (condition) => {

            const response: any = {}
            const data = await json;
            if(condition){
              const stringify = JSON.stringify(data)
              const encryptedBody = crypt.encrypted(CRYPT_KEY as string, stringify);
              response.status = 200;
              response.author = crypt.salt();
              response.body = encryptedBody;

            //   return ctx.status(200).json({
            //     status: ctx.statusCode,
            //     author: crypt.salt(),
            //     body: encryptedBody,
            
            //   });
            }
            ctx.done(null, response)
          }).catch((err) => {
            ctx.done(null, {
                status: 400,
                body: err
            })
          })  
    },
    hello: (ctx: any, req: any) => {
        ctx.log('wth ?')
        const res: IHelloWorld = {}

        if(req.query.name || (req.body && req.body.name)) {
            const name = req.query.name || req.body.name;
            res.body = `hello ${name}`;
        }        else {
            res.status = 400;
            res.body = 'please blabla'
        }

        ctx.done(null, res);
    }
}
import {NowResponse} from '@vercel/node/dist';

export default (_: any, res: NowResponse) => {
    return res.writeHead(200);
}

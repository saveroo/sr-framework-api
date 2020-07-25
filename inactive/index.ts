import {NowResponse} from '@vercel/node/dist';

export default (_: any, res: NowResponse) => {
    return res.status(200).send("Hello");
}

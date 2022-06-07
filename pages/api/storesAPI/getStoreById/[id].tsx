import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Store from "../../../../models/storeModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { id } = req.query;
        let store = await Store.findById(id);
        res.status(202).json(store);
    }
}

export default handler;
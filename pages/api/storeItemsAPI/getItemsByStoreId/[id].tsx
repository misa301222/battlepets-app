import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import StoreItem from "../../../../models/storeItem";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { id } = req.query;

        const ObjectId = require('mongodb').ObjectID;
        let items = await StoreItem.find({
            storeId: ObjectId(id)
        });

        res.json(items);
    }
}

export default handler;
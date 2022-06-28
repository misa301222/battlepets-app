import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Item from "../../models/itemModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        let items = await Item.find({});

        res.status(201).json(items);
    }
}

export default handler;
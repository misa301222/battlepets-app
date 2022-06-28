import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Item from "../../../../models/itemModel";
import StoreItem from "../../../../models/storeItem";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { id } = req.query;

        const ObjectId = require('mongodb').ObjectID;
        let storeItems = await StoreItem.find({
            storeId: ObjectId(id)
        });

        let items: any = [];
        let currentItem: any;
        for (let i = 0; i < storeItems.length; i++) {
            const { itemId } = storeItems[i];
            const { quantity } = storeItems[i];
            currentItem = await Item.findById(itemId).lean();
            currentItem.itemQuantity = Number(quantity);
            items.push(currentItem);
        }
        res.json(items);
    }
}

export default handler;
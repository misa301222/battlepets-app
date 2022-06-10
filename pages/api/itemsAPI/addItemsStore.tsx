import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import StoreItem from "../../../models/storeItem";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { storeId } = req.body;
        const { item } = req.body;
        const { quantity } = req.body;

        const ObjectId = require('mongodb').ObjectID;
        let storeItem = await StoreItem.findOne({
            storeId: ObjectId(storeId),
            itemId: ObjectId(item._id)
        }).lean();

        storeItem.quantity += quantity;
        
        const updatedItem = await StoreItem.findByIdAndUpdate(
            storeItem._id,
            storeItem,
            { new: true }
        );

        res.status(201).json(updatedItem);
    }
}

export default handler; 
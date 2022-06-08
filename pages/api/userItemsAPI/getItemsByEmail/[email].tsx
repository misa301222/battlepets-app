import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Item from "../../../../models/itemModel";
import UserItem from "../../../../models/userItem";
import User from "../../../../models/userModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { email } = req.query;

        let user = await User.findOne({
            email: email
        });

        const ObjectId = require('mongodb').ObjectID;
        let userItems = await UserItem.find({
            userId: ObjectId(user._id)
        });

        let items: any = [];
        let currentItem: any;
        for (let i = 0; i < userItems.length; i++) {
            const { itemId } = userItems[i];
            const { quantity } = userItems[i];

            currentItem = await Item.findById(itemId).lean();
            currentItem.itemQuantity = Number(quantity);
            items.push(currentItem);
        }

        res.json(items);
    }
}

export default handler;
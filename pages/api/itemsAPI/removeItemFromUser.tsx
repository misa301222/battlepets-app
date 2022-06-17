import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import UserItem from "../../../models/userItem";
import User from "../../../models/userModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { email } = session.user!;
        const { quantity, itemId }: any = req.body;

        let user = await User.findOne({
            email: email
        });

        const ObjectId = require('mongodb').ObjectID;
        let userItem: any = await UserItem.findOne({
            userId: ObjectId(user._id),
            itemId: ObjectId(itemId)
        }).lean();

        userItem.quantity -= quantity;

        let newUserItem = await UserItem.findByIdAndUpdate(
            userItem._id,
            userItem,
            { new: true }
        )

        res.status(201).json(newUserItem);
    }
}

export default handler;
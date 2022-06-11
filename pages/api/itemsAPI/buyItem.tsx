import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import StoreItem from "../../../models/storeItem";
import UserItem from "../../../models/userItem";
import User from "../../../models/userModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { storeId } = req.body;
        const { item } = req.body;
        const { quantity } = req.body;

        const { email }: any = session.user;
        let user = await User.findOne({
            email: email
        });

        const ObjectId = require('mongodb').ObjectID;
        let userItem = await UserItem.findOne({
            userId: ObjectId(user._id),
            itemId: ObjectId(item._id)
        }).lean();

        let storeItem = await StoreItem.findOne({
            storeId: ObjectId(storeId),
            itemId: ObjectId(item._id)
        }).lean();

        //IF EXISTS, UPDATE QUNATITY
        if (userItem) {
            const updatedItem = await UserItem.findByIdAndUpdate(
                userItem._id,
                { quantity: userItem.quantity += quantity },
                { new: true }
            );

            const updatedStoreItem = await StoreItem.findByIdAndUpdate(
                storeItem._id,
                { quantity: storeItem.quantity -= quantity },
                { new: true }
            );

            return res.status(201).json(updatedItem);
        }

        const newItem = new UserItem({
            userId: user._id,
            itemId: item._id,
            quantity: quantity
        });

        const updatedStoreItem = await StoreItem.findByIdAndUpdate(
            storeItem._id,
            { quantity: storeItem.quantity -= quantity },
            { new: true }
        );

        const status = await newItem.save();
        res.status(201).json({ isOk: true, ...status })
    }
}

export default handler;
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Bank from "../../../../models/bankModel";
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
        let bank = await Bank.findOne({
            userId: ObjectId(user._id)
        });

        res.status(201).json(bank);
    }
}

export default handler;
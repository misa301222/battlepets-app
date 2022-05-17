import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Pet from "../../../models/petModel";
import User from "../../../models/userModel";

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
        let pets = await Pet.find({
            userId: ObjectId(user._id)
        });

        res.status(201).json(pets)
    }

}

export default handler;
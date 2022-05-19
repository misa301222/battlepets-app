import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Pet from "../../../../models/petModel";
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
        }).select('-password');

        const ObjectId = require('mongodb').ObjectID;
        let pet = await Pet.findOne({
            userId: ObjectId(user._id),
            position: 1
        });

        res.status(201).json(pet);
    }
}

export default handler;
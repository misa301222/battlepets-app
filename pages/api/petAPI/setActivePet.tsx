import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Pet from "../../../models/petModel";
import User from "../../../models/userModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { id, email } = req.body;

        let user = await User.findOne({
            email: email
        });

        const ObjectId = require('mongodb').ObjectID;
        let pets = await Pet.find({
            userId: ObjectId(user._id)
        }).sort({ position: 'asc' });

        for (let i = 0; i < pets.length; i++) {
            pets[i] = await Pet.findByIdAndUpdate(pets[i]._id, {
                position: i + 2
            }, { new: true });
        }

        await Pet.findByIdAndUpdate(id, {
            position: 1
        }, { new: true });

        res.status(201).json(pets)

    }
}

export default handler;
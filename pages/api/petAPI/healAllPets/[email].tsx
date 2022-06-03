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
        });

        const ObjectId = require('mongodb').ObjectID;
        let pets = await Pet.find({
            userId: ObjectId(user._id)
        }).sort({ position: 'asc' });

        for (let i = 0; i < pets.length; i++) {
            pets[i] = await Pet.findByIdAndUpdate(pets[i]._id, {
                currentHealthPoints: pets[i].maxHealthPoints,
                currentMagicPoints: pets[i].maxMagicPoints,
            }, { new: true });
        }

        res.status(201).json(pets)
    }

}

export default handler;
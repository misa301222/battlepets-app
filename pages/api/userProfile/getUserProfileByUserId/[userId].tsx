import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import UserProfile from "../../../../models/userProfileModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }
        const { userId } = req.query;
        const ObjectId = require('mongodb').ObjectID;
        let userProfile = await UserProfile.findOne({
            userId: ObjectId(userId)
        });

        res.json(userProfile);
    }
}

export default handler;
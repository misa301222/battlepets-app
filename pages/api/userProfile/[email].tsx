import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import User from "../../../models/userModel";
import UserProfile from "../../../models/userProfileModel";

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
        let userProfile = await UserProfile.findOne({
            userId: ObjectId(user._id)
        });

        res.json(userProfile);
    }
}

export default handler;
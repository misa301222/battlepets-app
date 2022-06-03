import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
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
        }).select('-password');
        res.json(user);
    }
}

export default handler;
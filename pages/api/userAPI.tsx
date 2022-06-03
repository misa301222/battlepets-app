import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import User from "../../models/userModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { editedUser }: any = req.body;
        let user = await User.findByIdAndUpdate(
            editedUser._id,
            editedUser,
            { new: true },
        ).select('-password');

        res.json(user);
    }
}

export default handler;
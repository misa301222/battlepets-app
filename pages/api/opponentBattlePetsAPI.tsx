import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import OpponentBattlePet from "../../models/opponentBattlePet";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        let opponentBattlePets = await OpponentBattlePet.find({});
        res.status(201).json(opponentBattlePets);
    }
}

export default handler;
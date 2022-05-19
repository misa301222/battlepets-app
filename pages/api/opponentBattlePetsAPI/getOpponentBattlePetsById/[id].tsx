import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import OpponentBattlePet from "../../../../models/opponentBattlePet";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { id } = req.query;
        let opponentBattlePet = await OpponentBattlePet.findById(id);

        res.status(201).json(opponentBattlePet);
    }
}
export default handler;
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { bet, round } = req.body;
        const result: boolean = Math.random() < 0.5;

        const message: string = result ? `You advance to the next round! Your winnings are ${bet * 2}.\nFlip again for ${bet * 4}?` : `You lost :( Try again???`;
        return res.status(201).json({ result: result, newBet: (result ? bet * 2 : 0), message: message, round: (result ? round + 1 : 1) });
    }
}

export default handler;
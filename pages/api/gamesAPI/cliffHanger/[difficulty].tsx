import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import CliffHangerPhrase from "../../../../models/cliffHangerPhraseModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { difficulty }: any = req.query;

        let resultNumber = await CliffHangerPhrase.findOne({ difficulty: difficulty }).count();
        let randomNumber = Math.floor(Math.random() * resultNumber);
        let cliffHangerPhrase = await CliffHangerPhrase.findOne({difficulty: difficulty}).skip(randomNumber);
        
        if (cliffHangerPhrase) {
            return res.status(201).json({ isOk: true, cliffHangerPhrase: cliffHangerPhrase });
        }
        return res.status(201).json({ isOk: false, cliffHangerPhrase: null })
        
    }
}

export default handler;
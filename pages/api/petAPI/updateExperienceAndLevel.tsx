import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Pet from "../../../models/petModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { id, experience, outcome } = req.body;

        //TODO UPDATE OTHER STATS
        let pet: any = await Pet.findById(id);
        switch (outcome) {
            case 'WIN':
                pet.experience += experience;
                pet.wins++;
                let level = Math.floor(pet.experience / 100);

                await Pet.findByIdAndUpdate(id, {
                    experience: pet.experience,
                    level: level,
                    wins: pet.wins
                }, { new: true });

                res.json(pet);
                break;

            case 'DEFEAT':
                pet.defeats += 1;

                await Pet.findByIdAndUpdate(id, {
                    defeats: pet.defeats
                }, { new: true });

                res.json(pet);
                break;
        }

    }
}

function nextLevel(level: number) {
    const exponent = 1.5;
    const baseXP = 1000;
    return Math.floor(baseXP * (level ^ exponent))
}

export default handler;
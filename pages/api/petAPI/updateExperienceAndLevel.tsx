import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Pet from "../../../models/petModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { id, experience } = req.body;

        //TODO UPDATE OTHER STATS
        let pet: any = await Pet.findById(id);
        pet.experience += experience;
        let level = Math.floor(pet.experience / 100);

        await Pet.findByIdAndUpdate(id, {
            experience: pet.experience,
            level: level
        });

        res.json(pet);
    }
}

export default handler;
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Pet from "../../../models/petModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { id, quantity } = req.body;

        let pet: any = await Pet.findByIdAndUpdate(
            id,
            {
                $inc: {
                    currentHealthPoints: quantity
                }
            },
            { new: true }
        );

        res.status(201).json(pet);
    }
}

export default handler;
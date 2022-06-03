import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Pet from "../../../../models/petModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { id }: any = req.query;
        let pet = await Pet.findById(id).catch(err => {
            res.status(404).json(pet);
        });

        res.status(201).json(pet);

    }
}

export default handler;
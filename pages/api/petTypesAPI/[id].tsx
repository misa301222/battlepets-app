import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import PetType from "../../../models/petTypesModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { id } = req.query;
        let petType = await PetType.findById(id);
        res.json(petType);
    }
}

export default handler;
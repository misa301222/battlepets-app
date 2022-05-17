import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import PetType from "../../models/petTypesModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        let petTypes = await PetType.find({});
        res.json(petTypes);
    }
}

export default handler;
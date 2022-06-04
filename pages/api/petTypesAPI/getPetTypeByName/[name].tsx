import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import PetType from "../../../../models/petTypesModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { name } = req.query;

        let petType = await PetType.findOne({
            petTypeName: name
        });

        res.status(201).json(petType);
    }
}

export default handler;
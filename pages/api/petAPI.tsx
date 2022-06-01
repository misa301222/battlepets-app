import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Pet from "../../models/petModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { userId, petName, petType, position } = req.body;

        let pet = new Pet({
            userId: userId,
            name: petName,
            petType: petType,
            position: position
        });

        let status = await pet.save();
        res.status(201).json({ message: 'Pet created', ...status, isOk: true });
    }

    if (req.method === 'PUT') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { id, name, imageURL } = req.body;
        let pet = await Pet.findByIdAndUpdate(id, {
            name: name,
            imageURL: imageURL
        });

        res.status(201).json({ isOk: true, pet });
    }
}

export default handler;
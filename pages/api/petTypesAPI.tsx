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

    if (req.method === 'POST') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { name, imageURL } = req.body;
        let petType = new PetType({
            petTypeName: name,
            imageURL: imageURL
        });

        let status = await petType.save();
        res.status(201).json({ message: 'Pet Type Created!', ...status, isOk: true })
    }

    if (req.method === 'PUT') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { editedPetType } = req.body;
        let petType = await PetType.findByIdAndUpdate(
            editedPetType._id,
            editedPetType,
            { new: true }
        );

        res.status(201).json(petType);
    }
}

export default handler;
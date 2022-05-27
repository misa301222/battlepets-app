import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Pet from "../../../models/petModel";
import PetType from "../../../models/petTypesModel";
import User from "../../../models/userModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }
    }

    const { search } = req.query;

    let resultsPets = null;
    let resultsUsers = null;

    let pets = await Pet.find({
        name: {
            $regex: '.*' + search + '*.',
            $options: 'i'
        }
    });

    let users = await User.find({
        fullName: {
            $regex: '.*' + search + '*.',
            $options: 'i'
        },
    }).select('-password');

    const ObjectId = require('mongodb').ObjectID;
    if (pets.length) {
        resultsPets = [];
        for (let i = 0; i < pets.length; i++) {
            if (pets[i].imageURL || pets[i].customImageURL) {

            } else {
                let petType = await PetType.findById({
                    _id: ObjectId(pets[i].petType)
                });
                pets[i].imageURL = petType.imageURL;
            }
        }
        resultsPets.push(pets);
    }

    if (users.length) {
        resultsUsers = [];
        resultsUsers.push(users);
    }

    res.status(201).json({ resultsPets, resultsUsers });
}

export default handler;
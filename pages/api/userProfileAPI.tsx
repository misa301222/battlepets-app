import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import UserProfile from "../../models/userProfileModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { _id }: any = req.body;

        const ObjectId = require('mongodb').ObjectID;
        let userProfile = new UserProfile({
            userId: ObjectId(_id),
            descriptionHeader: '',
            description: '',
            hobbies: [''],
            imagesURL: [''],
            coverURL: '',
            location: '',
        });

        let status = await userProfile.save();
        res.status(201).json({ message: 'UserProfile created!', ...status });

    }

    if (req.method === 'PUT') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { editedUserProfile }: any = req.body;
        let userProfile = await UserProfile.findByIdAndUpdate(
            editedUserProfile._id,
            editedUserProfile,
            { new: true },
        );

        res.json(userProfile)
    }
}

export default handler;
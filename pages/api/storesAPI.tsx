import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Store from "../../models/storeModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        let stores = await Store.find({});
        res.status(201).json(stores);
    }

    if (req.method === 'POST') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { storeName, storeDescription, coverURL, imageURL } = req.body;

        let store = new Store({
            storeName: storeName,
            storeDescription: storeDescription,
            coverURL: coverURL,
            imageURL: imageURL
        });

        const status = await store.save();

        res.status(201).json({ message: 'Store Created!', ...status, isOk: true });
    }

    if (req.method === 'PUT') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { editedStore }: any = req.body;
        let store = await Store.findByIdAndUpdate(
            editedStore._id,
            editedStore,
            { new: true }
        );

        res.status(201).json(store);
    }
}

export default handler;
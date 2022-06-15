import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Currency from "../../../models/currencyModel";
import User from "../../../models/userModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { quantity, type } = req.body;
        const { email } = session.user!;

        let user = await User.findOne({
            email: email
        });

        const ObjectId = require('mongodb').ObjectID;
        let currency = await Currency.findOne({
            userId: ObjectId(user._id)
        });
        
        switch (type) {
            case 'ADD':
                let addCurrency = await Currency.findByIdAndUpdate(currency._id,
                    { currency: Number(currency.currency + Number(quantity)) },
                    { new: true });
                return res.status(201).json({ addCurrency, isOk: true });
                break;

            case 'REMOVE':
                if (currency.currency >= quantity) {
                    let removeCurrency = await Currency.findByIdAndUpdate(currency._id,
                        { currency: Number(currency.currency - Number(quantity)) },
                        { new: true });
                    return res.status(201).json({ removeCurrency, isOk: true });
                }
                return res.status(201).json({ isOk: false });
                break;
        }


    }
}

export default handler;
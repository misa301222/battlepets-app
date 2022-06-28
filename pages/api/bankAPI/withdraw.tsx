import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Bank from "../../../models/bankModel";
import Currency from "../../../models/currencyModel";
import User from "../../../models/userModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { email } = session.user!;
        const { quantity } = req.body;
        let user = await User.findOne({
            email: email
        });

        const ObjectId = require('mongodb').ObjectID;
        let bank = await Bank.findOne({
            userId: ObjectId(user._id)
        }).lean();

        let currency = await Currency.findOne({
            userId: ObjectId(user._id)
        }).lean();

        if (quantity > 0) {
            if (quantity <= bank.currency) {
                bank.currency -= quantity;
                let updatedBank = await Bank.findByIdAndUpdate(
                    bank._id,
                    bank,
                    { new: true }
                );

                currency.currency += quantity;
                let updatedCurrency = await Currency.findByIdAndUpdate(
                    currency._id,
                    currency,
                    { new: true }
                );

                return res.status(201).json({ isOk: true, currency: updatedCurrency, bank: updatedBank });
            } else {
                return res.status(201).json({ isOk: false, message: 'You dont have enough money in the bank!' });
            }
        } else {
            return res.status(201).json({ isOk: false, message: 'You have to enter a quantity!' });
        }
    }
}

export default handler;
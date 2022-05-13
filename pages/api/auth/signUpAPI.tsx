import { hash } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../config/connectDB";
import User from "../../../models/userModel";

connectDB();

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { fullName, email, password } = req.body;
        if (!email || !email.includes('@') || !password) {
            res.status(422).json({ message: 'Invalid Data' });
            return;
        }

        const checkExisting = await User.findOne({ email: email });
        if (checkExisting) {
            res.status(422).json({ message: 'User already exists' });
            return;
        }

        let user = new User({
            fullName,
            email,
            password: await hash(password, 12),
            imageURL: '',
            role: 'USER',
        });

        let status = await user.save();
        res.status(201).json({ message: 'User created', ...status });
    } else {
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import OpponentBattlePet from "../../models/opponentBattlePetModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        let opponentBattlePets = await OpponentBattlePet.find({});
        res.status(201).json(opponentBattlePets);
    }

    if (req.method === 'PUT') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { id, maxHealthPoints, maxMagicPoints, name, attackPoints, defensePoints, agilityPoints, level, experienceGranted, petType }: any = req.body;
        let opponentPet = await OpponentBattlePet.findByIdAndUpdate(id, {
            currentHealthPoints: maxHealthPoints,
            currentMagicPoints: maxMagicPoints,
            maxHealthPoints: maxHealthPoints,
            maxMagicPoints: maxMagicPoints,
            name: name,
            attackPoints: attackPoints,
            defensePoints: defensePoints,
            agilityPoints: agilityPoints,
            level: level,
            experienceGranted: experienceGranted,
            petType: petType
        }, { new: true });

        res.status(201).json({ isOk: true, ...opponentPet })
    }

    if (req.method === 'DELETE') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { id } = req.body;
        let pet = await OpponentBattlePet.findByIdAndDelete(id);
        res.status(201).json({ deleted: true, ...pet })
    }

    if (req.method === 'POST') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { maxHealthPoints, maxMagicPoints, name, attackPoints, defensePoints, agilityPoints, level, experienceGranted, petType }: any = req.body;

        let opponentPet = new OpponentBattlePet({
            currentHealthPoints: maxHealthPoints,
            currentMagicPoints: maxMagicPoints,
            maxHealthPoints: maxHealthPoints,
            maxMagicPoints: maxMagicPoints,
            name: name,
            attackPoints: attackPoints,
            defensePoints: defensePoints,
            agilityPoints: agilityPoints,
            level: level,
            experienceGranted: experienceGranted,
            petType: petType
        });

        console.log(opponentPet);

        let status = await opponentPet.save();
        res.status(201).json({ message: 'Opponent Battle Pet created', ...status, isOk: true });
    }
}

export default handler;
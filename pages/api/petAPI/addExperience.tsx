import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Pet from "../../../models/petModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { id, experienceToAdd } = req.body;

        let pet = await Pet.findById(id).lean();

        pet.experience += experienceToAdd;
        let level = Math.floor(pet.experience / 100) < 1 ? 1 : Math.floor(pet.experience / 100);
        const logarithm = level > 1 ? Math.log(level) : 1;

        const baseHp = 10;
        const baseMp = 15;
        const baseAttack = 8;
        const baseDefense = 5;
        const baseAgility = 3;

        let newMp = (baseMp * (logarithm * level))
        let newHp = (baseHp * (logarithm * level))
        let newAttack = (baseAttack * (logarithm * level))
        let newDefense = (baseDefense * (logarithm * level))
        let newAgility = (baseAgility * (logarithm * level))

        pet = await Pet.findByIdAndUpdate(id, {
            maxHealthPoints: newHp,
            maxMagicPoints: newMp,
            attackPoints: newAttack,
            defensePoints: newDefense,
            agilityPoints: newAgility,
            experience: pet.experience,
            level: level,
            wins: pet.wins
        }, { new: true });

        return res.json({ isOk: true, ...pet });
    }
}

export default handler;
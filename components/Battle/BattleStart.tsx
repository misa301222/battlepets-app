import { faArrowLeft, faUserNinja } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import OpponentBattlePetCard from "../Cards/OpponentBattlePetCard";
import { motion } from 'framer-motion';
import { useRouter } from "next/router";

interface OpponentBattlePet {
    _id: string,
    currentHealthPoints?: number,
    maxHealthPoints?: number,
    name: string,
    attackPoints?: number,
    defensePoints?: number,
    agilityPoints?: number,
    currentMagicPoints?: number,
    maxMagicPoints?: number,
    availableAttacks?: string[],
    level?: number,
    imageURL?: string,
    customImageURL?: string,
    petType: string
}

function BattleStart({ data }: any) {
    const [opponentBattlePet, setOpponentBattlePet] = useState<OpponentBattlePet[]>(data.opponentBattlePets as OpponentBattlePet[]);
    const router = useRouter();
    const [allowed] = useState<boolean>(data.allowed);

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Battle! <FontAwesomeIcon icon={faUserNinja} /></h1>
                <hr />
            </div>

            {allowed ?
                <div>
                    <h2 className="text-center">Opponents</h2>
                    <div className="mt-5 flex flex-wrap justify-center gap-10 w-4/5 mx-auto">
                        {
                            opponentBattlePet.map((element: OpponentBattlePet, index: number) => (
                                <motion.div className="w-fit cursor-pointer" key={index}
                                    whileHover={{
                                        scale: 1.1
                                    }}
                                    onClick={() => router.push(`/battle/fightOpponent/${element._id}`)}>
                                    <OpponentBattlePetCard opponentBattlePet={element} />
                                </motion.div>
                            ))}
                    </div>
                </div>
                :
                <div className="flex flex-col items-center">
                    <h1 className="text-amber-600">It seems your Current Pet is on 0 HP! Try healing your pets or change your active one :)</h1>
                    <button type="button" onClick={() => router.push('/dashboard')} className="btn-primary mt-10"><FontAwesomeIcon icon={faArrowLeft} /> Go Back</button>
                </div>
            }
        </div>

    )
}

export default BattleStart;
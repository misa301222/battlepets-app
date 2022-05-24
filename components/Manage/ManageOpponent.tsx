import { useState } from "react";
import OpponentBattlePetCard from "../Cards/OpponentBattlePetCard";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserNinja } from "@fortawesome/free-solid-svg-icons";
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

function ManageOpponent({ data }: any) {
    const [opponentBattlePets] = useState<OpponentBattlePet[]>(data.opponentBattlePets as OpponentBattlePet[]);
    const router = useRouter();

    return (
        <div>
            <div className="container mx-auto p-5 mt-10">
                <h1 className="header">Manage Oponents <FontAwesomeIcon icon={faUserNinja} /></h1>
                <hr />
            </div>

            <div className="container mx-auto p-5 mb-10">
                <button onClick={() => router.push('/manage/newOpponent')} type="button" className="btn-secondary"><FontAwesomeIcon icon={faPlus} /> New Opponent</button>
            </div>
            <div className="flex flex-wrap gap-5 w-1/2 mx-auto">                
                {
                    opponentBattlePets.map((element: OpponentBattlePet, index: number) => (
                        <motion.div
                            whileHover={{
                                scale: 1.1
                            }}
                            className='w-fit'
                            key={index}>
                            <OpponentBattlePetCard opponentBattlePet={element} />
                        </motion.div>
                    ))
                }
            </div>
        </div>
    )
}

export default ManageOpponent;
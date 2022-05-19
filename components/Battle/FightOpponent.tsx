import { faUserNinja } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import PetCard from "../Cards/PetCard";
import PetCardBattle from "../Cards/PetCardBattle";

interface PetType {
    _id: string,
    petTypeName: string,
    imageURL: string
}

interface Pet {
    _id: string,
    userId: string,
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
    wins?: number,
    defeats?: number,
    draws?: number,
    petType: string,
    position: number
}

function FightOpponent({ data }: any) {
    const [userPet, setUserPet] = useState<Pet>(data.petPositionOne as Pet);
    const [opponentPet, setOpponentPet] = useState<Pet>(data.opponentBattlePet as Pet);

    const handleOnClickAction = (action: string) => {
        console.log(action);
        const multiplier: number = 0.3;

        switch (action) {
            case 'Attack':
                const newOpponentPet: Pet = Object.create(opponentPet);
                newOpponentPet.currentHealthPoints! -= userPet.attackPoints! * multiplier;
                setOpponentPet(newOpponentPet);
                break;

            case 'Defense':
                break;

            case 'Heal':

                break;

            case 'Skip':

                break;
        }
    }

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Battle! <FontAwesomeIcon icon={faUserNinja} /></h1>
                <hr />
            </div>

            {JSON.stringify(data.petPositionOne)}
            {JSON.stringify(opponentPet)}

            <div className="flex flex-row justify-evenly items-center w-4/5 mx-auto">
                <PetCardBattle pet={userPet} />
                <h1 className="text-[10rem]">VS</h1>
                <PetCardBattle pet={opponentPet} />
            </div>

            <div className="flex flex-row justify-evenly w-3/5 mx-auto mt-20">
                {
                    userPet.availableAttacks?.map((element: string, index: number) => (
                        <button onClick={() => handleOnClickAction(element)} key={index} type="button" className="btn-action">{element}</button>
                    ))
                }
            </div>
        </div>
    )
}

export default FightOpponent;
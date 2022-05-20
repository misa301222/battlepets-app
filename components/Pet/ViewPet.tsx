import { faFireAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import UserCard from "../Cards/UserCard";

interface Pet {
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
    position: number,
    experience: number
}

interface PetType {
    _id: string,
    petTypeName: string,
    imageURL: string
}

function ViewPet({ data }: any) {
    const [pet] = useState<Pet>(data.pet as Pet);
    const [petType] = useState<PetType>(data.petType as PetType);

    return (
        <div>
            <div className="flex flex-row w-4/5 card p-5 mx-auto mt-10">
                <div className="w-1/2"
                    style={{
                        backgroundImage: `url(${petType.imageURL})`,
                        backgroundSize: 'cover',
                        boxSizing: 'border-box',
                        // width: '30rem',
                        height: '30rem',
                        borderRadius: '13px'
                    }}>

                </div>

                <div className="w-full p-5">
                    <div className="w-fit p-2 mx-auto text-center">
                        <h5>Stats of</h5>
                        <h1><FontAwesomeIcon icon={faFireAlt} className='text-red-600' /> {pet.name} <FontAwesomeIcon icon={faFireAlt} className='text-red-600' /> </h1>
                    </div>

                    <div className="w-1/2 mx-auto mt-10">
                        <div className="columns-2">
                            <h5 className="text-right underline">HP:</h5>
                            <h5 style={{ color: `${pet.currentHealthPoints! <= pet.maxHealthPoints! / 2 ? 'yellow' : 'black'}` }}>{pet.currentHealthPoints} / {pet.maxHealthPoints}</h5>
                        </div>

                        <div className="columns-2">
                            <h5 className="text-right underline">MP:</h5>
                            <h5 style={{ color: `${pet.currentMagicPoints! <= pet.maxMagicPoints! / 2 ? 'yellow' : 'black'}` }}>{pet.currentMagicPoints} / {pet.maxMagicPoints}</h5>
                        </div>

                        <div className="columns-2">
                            <h5 className="text-right underline">Attack Points:</h5>
                            <h5>{pet.attackPoints}</h5>
                        </div>

                        <div className="columns-2">
                            <h5 className="text-right underline">Defense Points:</h5>
                            <h5>{pet.defensePoints}</h5>
                        </div>

                        <div className="columns-2">
                            <h5 className="text-right underline">Agility Points:</h5>
                            <h5>{pet.agilityPoints}</h5>
                        </div>

                        <div className="columns-2">
                            <h5 className="text-right underline">Level:</h5>
                            <h5>{pet.level}</h5>
                        </div>
                    </div>

                    <div className="border-2 border-gray-400 bg-gray-100 shadow-md rounded-md p-5 mt-20 w-1/2 mx-auto">
                        <div className="flex flex-row justify-evenly">
                            <div className="bg-green-300 w-fit p-2 rounded-md"><h5>{pet.wins} Wins</h5></div>
                            <div className="bg-amber-300 w-fit p-2 rounded-md"><h5>{pet.draws} Draws</h5></div>
                            <div className="bg-red-300 w-fit p-2 rounded-md"><h5>{pet.defeats} Defeats</h5></div>
                        </div>
                    </div>
                </div>
            </div>


            <h2 className="text-center mt-10">Owned By</h2>

            <div className="mt-2 mx-auto w-fit">
                <UserCard user={data.user} userProfile={data.userProfile} />
            </div>
        </div>
    )
}

export default ViewPet;
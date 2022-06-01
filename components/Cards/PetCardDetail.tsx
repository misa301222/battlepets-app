import { useEffect, useState } from "react";

interface PetType {
    _id: string,
    petTypeName: string,
    imageURL: string
}

async function getTypeById(id: string) {
    const response = await fetch(`/api/petTypesAPI/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
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
    position: number,
    experience: number
}

type Props = {
    pet: Pet
}

function PetCardDetail({ pet }: Props) {
    const [petType, setPetType] = useState<PetType>();;

    useEffect(() => {
        getTypeById(pet.petType).then(response => {
            setPetType(response);
        });
    }, [])

    return (
        <div className="card w-[25rem] mx-auto">
            <div style={{
                backgroundImage: `${pet.imageURL ? `url(${pet.imageURL})` : `url(${petType?.imageURL ? petType.imageURL : ''})`}`,
                height: '10rem',
                width: '10rem',
                backgroundSize: 'cover',
                borderRadius: '1.3rem',
                margin: '0 auto',
            }}
            >
            </div>
            <h5 className="text-center text-black/80 bg-gradient-to-r from-blue-400 to-blue-700 w-fit pr-5 pl-5 rounded-md text-from mx-auto mt-1">{petType?.petTypeName}</h5>

            <h4 className="text-center mt-5 mb-2">{pet.name}</h4>
            <hr />
            <div className="max-w-sm bg-gray-100">
                <div className="columns-2">
                    <h5 className="text-right">Level:</h5>
                    <h5>{pet.level}</h5>
                </div>
            </div>

            <div className="border-2 border-gray-400 bg-gray-100 shadow-md rounded-md w-full p-5 mt-10 mx-auto">
                <div className="flex flex-row justify-evenly">
                    <div className="bg-green-300 w-fit p-2 rounded-md"><h5>{pet.wins} Wins</h5></div>
                    <div className="bg-amber-300 w-fit p-2 rounded-md"><h5>{pet.draws} Draws</h5></div>
                    <div className="bg-red-300 w-fit p-2 rounded-md"><h5>{pet.defeats} Defeats</h5></div>
                </div>
            </div>

        </div>
    )
}

export default PetCardDetail;
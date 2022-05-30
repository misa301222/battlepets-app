import { useEffect, useState } from "react";

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
    position: number,
    experience: number
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

type Props = {
    pet: Pet
}

function PetCardFull({ pet }: Props) {
    const [petType, setPetType] = useState<PetType>();;

    useEffect(() => {
        getTypeById(pet.petType).then(response => {
            setPetType(response);
        });
    }, [pet])

    return (
        <div className="card w-[25rem]">
            <div style={{
                backgroundImage: `url(${petType?.imageURL ? petType.imageURL : ''})`,
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
            <div className="mb-4">
                <div className="columns-2">
                    <h5 className="text-right">HP:</h5>
                    <h5 style={{ color: `${pet.currentHealthPoints! <= pet.maxHealthPoints! / 4 ? 'red' : `${pet.currentHealthPoints! <= pet.maxHealthPoints! / 2 ? '#f59e0b' : 'black'}`}` }}>{pet.currentHealthPoints!.toFixed(2)} / {pet.maxHealthPoints!.toFixed(2)}</h5>
                </div>

                <div className="columns-2">
                    <h5 className="text-right">MP:</h5>
                    <h5 style={{ color: `${pet.currentMagicPoints! <= pet.maxMagicPoints! / 4 ? 'red' : `${pet.currentMagicPoints! <= pet.maxMagicPoints! / 2 ? '#f59e0b' : 'black'}`}` }}>{pet.currentMagicPoints!.toFixed(2)} / {pet.maxMagicPoints!.toFixed(2)}</h5>
                </div>

                <div className="columns-2">
                    <h5 className="text-right">Wins:</h5>
                    <h5>{pet.wins}</h5>
                </div>

                <div className="columns-2">
                    <h5 className="text-right">Defeats:</h5>
                    <h5>{pet.defeats}</h5>
                </div>

                <div className="columns-2">
                    <h5 className="text-right">Draws:</h5>
                    <h5>{pet.draws}</h5>
                </div>

                <div className="columns-2">
                    <h5 className="text-right">Total Matches</h5>
                    <h5>{pet.wins! + pet.defeats! + pet.draws!}</h5>
                </div>

                <div className="columns-2">
                    <h5 className="text-right">Level:</h5>
                    <h5>{pet.level}</h5>
                </div>

                <div className="columns-2">
                    <h5 className="text-right">Experience:</h5>
                    <h5>{pet.experience}</h5>
                </div>
            </div>
        </div>
    )
}

export default PetCardFull;
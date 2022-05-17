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

function PetCard({ pet }: any) {
    const [petType, setPetType] = useState<PetType>();;

    useEffect(() => {
        getTypeById(pet.petType).then(response => {
            setPetType(response);
        });
    }, [])

    return (
        <div className="card w-56 mx-auto">
            <div style={{
                backgroundImage: `url(${petType?.imageURL})`,
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
            <div>
                <div className="columns-2">
                    <h5 className="text-right">HP:</h5>
                    <h5 style={{color: `${pet.currentHealthPoints <= pet.maxHealthPoints / 2 ? 'yellow' : 'black'}`}}>{pet.currentHealthPoints} / {pet.maxHealthPoints}</h5>
                </div>

                <div className="columns-2">
                    <h5 className="text-right">MP:</h5>
                    <h5 style={{color: `${pet.currentMagicPoints <= pet.maxMagicPoints / 2 ? 'yellow' : 'black'}`}}>{pet.currentMagicPoints} / {pet.maxMagicPoints}</h5>
                </div>

                <div className="columns-2">
                    <h5 className="text-right">Level:</h5>
                    <h5>{pet.level}</h5>
                </div>
            </div>
        </div>
    )
}

export default PetCard;
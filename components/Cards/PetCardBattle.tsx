import { useEffect, useLayoutEffect, useState } from "react";

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

function PetCardBattle({ pet }: any) {
    const [petType, setPetType] = useState<PetType>();;

    useEffect(() => {
        getTypeById(pet.petType).then(response => {
            setPetType(response);
        });
    }, []);

    return (
        <div className="card w-96 mx-auto">
            <div style={{
                backgroundImage: `url(${petType?.imageURL ? petType?.imageURL : ''})`,
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
                <div className="flex flex-row justify-center">
                    <div className="w-1/3">
                        <h3 className="text-right">HP: </h3>
                    </div>

                    <div className="ml-2 w-2/3">
                        <h3 style={{ color: `${pet.currentHealthPoints <= pet.maxHealthPoints / 4 ? 'red' : `${pet.currentHealthPoints <= pet.maxHealthPoints / 2 ? '#f59e0b' : 'black'}`}` }}>{pet.currentHealthPoints.toFixed(2)} / {pet.maxHealthPoints.toFixed(2)}</h3>
                    </div>
                </div>

                <div className="flex flex-row justify-center">
                    <div className="w-1/3">
                        <h3 className="text-right">MP: </h3>
                    </div>

                    <div className="ml-2 w-2/3">
                        <h3 style={{ color: `${pet.currentMagicPoints <= pet.maxMagicPoints / 4 ? 'red' : `${pet.currentMagicPoints <= pet.maxMagicPoints / 2 ? '#f59e0b' : 'black'}`}` }}>{pet.currentMagicPoints.toFixed(2)} / {pet.maxMagicPoints.toFixed(2)}</h3>
                    </div>
                </div>

                <div className="flex flex-row justify-center">
                    <h3>Level: {pet.level}</h3>
                </div>
            </div>
        </div>
    )
}

export default PetCardBattle;
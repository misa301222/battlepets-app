import { useEffect, useState } from "react";

interface PetType {
    _id: string,
    petTypeName: string,
    imageURL: string
}

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
    opponentBattlePet: OpponentBattlePet
}

function OpponentBattlePetCard({ opponentBattlePet }: Props) {
    const [petType, setPetType] = useState<PetType>();;

    useEffect(() => {
        getTypeById(opponentBattlePet?.petType).then(response => {
            setPetType(response);
        });
    }, [opponentBattlePet])

    return (

        <div className="card w-[25rem] mx-auto">
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

            <h4 className="text-center mt-5 mb-2">{opponentBattlePet?.name}</h4>
            <hr />
            <div className="bg-gray-100">
                <div className="columns-2">
                    <h5 className="text-right">HP:</h5>
                    <h5 style={{ color: `${opponentBattlePet?.currentHealthPoints! <= opponentBattlePet?.maxHealthPoints! / 2 ? 'yellow' : 'black'}` }}>{opponentBattlePet?.currentHealthPoints} / {opponentBattlePet?.maxHealthPoints}</h5>
                </div>

                <div className="columns-2">
                    <h5 className="text-right">MP:</h5>
                    <h5 style={{ color: `${opponentBattlePet?.currentMagicPoints! <= opponentBattlePet?.maxMagicPoints! / 2 ? 'yellow' : 'black'}` }}>{opponentBattlePet?.currentMagicPoints} / {opponentBattlePet?.maxMagicPoints}</h5>
                </div>

                <div className="columns-2">
                    <h5 className="text-right">Level:</h5>
                    <h5>{opponentBattlePet?.level}</h5>
                </div>
            </div>
        </div>

    )
}

export default OpponentBattlePetCard;
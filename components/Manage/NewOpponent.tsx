import { faUserNinja } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, SyntheticEvent, useState } from "react";

interface OpponentBattlePet {
    _id?: string,
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
    experienceGranted: number,
    petType: string
}

interface PetType {
    _id: string,
    petTypeName: string,
    imageURL: string
}

async function createNewOpponentPet(newPet: OpponentBattlePet) {
    const response = await fetch(`/api/opponentBattlePetsAPI/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            currentHealthPoints: newPet.currentHealthPoints,
            currentMagicPoints: newPet.currentMagicPoints,
            name: newPet.name,
            attackPoints: newPet.attackPoints,
            defensePoints: newPet.defensePoints,
            agilityPoints: newPet.agilityPoints,
            level: newPet.level,
            experienceGranted: newPet.experienceGranted,
            petType: newPet.petType
        })

    });

    const data = await response.json();
    return data;
}

function NewOpponent({ data }: any) {
    const [opponentBattlePet, setOpponentBattlePet] = useState<OpponentBattlePet>({
        maxHealthPoints: 0,
        name: '',
        attackPoints: 0,
        defensePoints: 0,
        agilityPoints: 0,
        maxMagicPoints: 0,
        level: 0,
        experienceGranted: 0,
        petType: ''
    });
    const [petTypes] = useState<PetType[]>(data.petTypes as PetType[]);

    const handleOnChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setOpponentBattlePet(prev => ({ ...prev, name: event.target.value }))
    }

    const handleOnChangeHealthPoints = (event: ChangeEvent<HTMLInputElement>) => {
        setOpponentBattlePet(prev => ({ ...prev, maxHealthPoints: Number(event.target.value) }))
    }

    const handleOnChangeMagicPoints = (event: ChangeEvent<HTMLInputElement>) => {
        setOpponentBattlePet(prev => ({ ...prev, maxMagicPoints: Number(event.target.value) }))
    }

    const handleOnChangeAttackPoints = (event: ChangeEvent<HTMLInputElement>) => {
        setOpponentBattlePet(prev => ({ ...prev, attackPoints: Number(event.target.value) }))
    }

    const handleOnChangeDefensePoints = (event: ChangeEvent<HTMLInputElement>) => {
        setOpponentBattlePet(prev => ({ ...prev, defensePoints: Number(event.target.value) }))
    }

    const handleOnChangeAgilityPoints = (event: ChangeEvent<HTMLInputElement>) => {
        setOpponentBattlePet(prev => ({ ...prev, agilityPoints: Number(event.target.value) }))
    }

    const handleOnChangeLevelPoints = (event: ChangeEvent<HTMLInputElement>) => {
        setOpponentBattlePet(prev => ({ ...prev, level: Number(event.target.value) }))
    }

    const handleOnChangeExperienceGrantedPoints = (event: ChangeEvent<HTMLInputElement>) => {
        setOpponentBattlePet(prev => ({ ...prev, experienceGranted: Number(event.target.value) }))
    }

    const handleOnChangePetType = (event: ChangeEvent<HTMLSelectElement>) => {
        setOpponentBattlePet(prev => ({ ...prev, petType: event.target.value }));
    }

    const handleOnSubmitNewOpponentPetForm = async (event: SyntheticEvent) => {
        event.preventDefault();
        const responseCreate = await createNewOpponentPet(opponentBattlePet);
        console.log(responseCreate);
    }

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">New Opponent <FontAwesomeIcon icon={faUserNinja} /></h1>
                <hr />
            </div>

            <form onSubmit={handleOnSubmitNewOpponentPetForm} className='card w-1/2 mx-auto'>
                <div className="mb-6">
                    <h5>Name</h5>
                    <input onChange={handleOnChangeName} className="form-control" />
                </div>

                <div className="mb-6">
                    <div className="columns-2">
                        <div>
                            <h5>Health Points</h5>
                            <input onChange={handleOnChangeHealthPoints} className="form-control" />
                        </div>

                        <div>
                            <h5>Magic Points</h5>
                            <input onChange={handleOnChangeMagicPoints} className="form-control" />
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="columns-3">
                        <div>
                            <h5>Attack Points</h5>
                            <input onChange={handleOnChangeAttackPoints} className="form-control" />
                        </div>

                        <div>
                            <h5>Defense Points</h5>
                            <input onChange={handleOnChangeDefensePoints} className="form-control" />
                        </div>

                        <div>
                            <h5>Agility Points</h5>
                            <input onChange={handleOnChangeAgilityPoints} className="form-control" />
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h5>Level</h5>
                    <input onChange={handleOnChangeLevelPoints} className="form-control" />
                </div>

                <div className="mb-6">
                    <h5>Experience Granted</h5>
                    <input onChange={handleOnChangeExperienceGrantedPoints} className="form-control" />
                </div>

                <div className="mb-6">
                    <h5>Pet Type</h5>
                    <select className="form-control" onChange={handleOnChangePetType}>
                        {
                            petTypes?.map((element: PetType, index: number) => (
                                <option value={element._id} key={index}>{element.petTypeName}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="mb-6 flex flex-row justify-center">
                    <button type="submit" className="btn-primary">Add New Pet</button>
                </div>
            </form>
        </div>
    )
}

export default NewOpponent;
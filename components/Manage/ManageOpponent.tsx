import { ChangeEvent, SyntheticEvent, useState } from "react";
import OpponentBattlePetCard from "../Cards/OpponentBattlePetCard";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faPlus, faShieldCat, faUserNinja, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { Modal } from "react-daisyui";

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


async function deleteOpponentPet(id: string) {
    const response = await fetch(`/api/opponentBattlePetsAPI`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: (JSON.stringify({ id }))
    });

    const data = await response.json();
    return data;
}

async function getOpponentBattlePets() {
    const response = await fetch(`/api/opponentBattlePetsAPI`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
}

async function updateOpponentBattlePet(opponentBattlePet: OpponentBattlePet) {
    const response = await fetch(`/api/opponentBattlePetsAPI`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: (JSON.stringify({
            id: opponentBattlePet._id,
            maxHealthPoints: opponentBattlePet.maxHealthPoints,
            maxMagicPoints: opponentBattlePet.maxMagicPoints,
            name: opponentBattlePet.name,
            attackPoints: opponentBattlePet.attackPoints,
            defensePoints: opponentBattlePet.defensePoints,
            agilityPoints: opponentBattlePet.agilityPoints,
            level: opponentBattlePet.level,
            experienceGranted: opponentBattlePet.experienceGranted,
            petType: opponentBattlePet.petType
        }))
    });

    const data = await response.json();
    return data;
}

function ManageOpponent({ data }: any) {
    const [opponentBattlePets, setOpponentBattlePets] = useState<OpponentBattlePet[]>(data.opponentBattlePets as OpponentBattlePet[]);
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [petTypes] = useState<PetType[]>(data.petTypes as PetType[]);
    const [selectedOpponentBattlePet, setSelectedOpponentBattlePet] = useState<OpponentBattlePet>({
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

    const handleOnClickDeleteOpponentPet = async (_id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const responseDelete = await deleteOpponentPet(_id);
                console.log(responseDelete);
                if (responseDelete.deleted) {
                    Swal.fire({
                        position: 'top-right',
                        icon: 'success',
                        title: 'Opponent Deleted!',
                        showConfirmButton: false,
                        timer: 800
                    }).then(async () => {
                        const responsePets = await getOpponentBattlePets();
                        setOpponentBattlePets(responsePets);
                    });
                }
            }
        })
    }

    const handleOnChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOpponentBattlePet(prev => ({ ...prev, name: event.target.value }))
    }

    const handleOnChangeHealthPoints = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOpponentBattlePet(prev => ({ ...prev, maxHealthPoints: Number(event.target.value) }))
    }

    const handleOnChangeMagicPoints = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOpponentBattlePet(prev => ({ ...prev, maxMagicPoints: Number(event.target.value) }))
    }

    const handleOnChangeAttackPoints = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOpponentBattlePet(prev => ({ ...prev, attackPoints: Number(event.target.value) }))
    }

    const handleOnChangeDefensePoints = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOpponentBattlePet(prev => ({ ...prev, defensePoints: Number(event.target.value) }))
    }

    const handleOnChangeAgilityPoints = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOpponentBattlePet(prev => ({ ...prev, agilityPoints: Number(event.target.value) }))
    }

    const handleOnChangeLevelPoints = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOpponentBattlePet(prev => ({ ...prev, level: Number(event.target.value) }))
    }

    const handleOnChangeExperienceGrantedPoints = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOpponentBattlePet(prev => ({ ...prev, experienceGranted: Number(event.target.value) }))
    }

    const handleOnChangePetType = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOpponentBattlePet(prev => ({ ...prev, petType: event.target.value }));
    }

    const handleOnClickSelectOpponentBattlePet = (element: OpponentBattlePet) => {
        setSelectedOpponentBattlePet(element);
        setIsOpen(true);
    }

    const handleOnSubmitUpdateOpponentPetForm = async (event: SyntheticEvent) => {
        event.preventDefault();
        const responseUpdate = await updateOpponentBattlePet(selectedOpponentBattlePet);
        if (responseUpdate.isOk) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Opponent Updated Successfully!',
                showConfirmButton: false,
                timer: 800
            }).then(async () => {
                setIsOpen(false);
                const responsePets = await getOpponentBattlePets();
                setOpponentBattlePets(responsePets);
            });
        }
    }

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
                        <div key={index}>
                            <div className="flex flex-row justify-end">
                                <h3 onClick={async () => handleOnClickDeleteOpponentPet(element._id!)} className="text-red-500"><FontAwesomeIcon icon={faXmarkCircle} /></h3>
                            </div>
                            <motion.div
                                whileHover={{
                                    scale: 1.1
                                }}
                                className='w-fit cursor-pointer'
                                onClick={() => handleOnClickSelectOpponentBattlePet(element)}
                            >
                                <OpponentBattlePetCard opponentBattlePet={element} />
                            </motion.div>
                        </div>
                    ))
                }
            </div>

            <div>
                <Modal className="text-black bg-white max-w-[60rem] max-h-full" open={isOpen} onClickBackdrop={() => setIsOpen(false)}>
                    <Modal.Header><h5>Pet Info <FontAwesomeIcon icon={faShieldCat} /> </h5></Modal.Header>

                    <Modal.Body>
                        <form onSubmit={handleOnSubmitUpdateOpponentPetForm} className='card mx-auto'>
                            <div className="mb-6">
                                <h5>Name</h5>
                                <input value={selectedOpponentBattlePet.name} onChange={handleOnChangeName} className="form-control" />
                            </div>

                            <div className="mb-6">
                                <div className="columns-2">
                                    <div>
                                        <h5>Health Points</h5>
                                        <input value={selectedOpponentBattlePet.maxHealthPoints} type={'number'} onChange={handleOnChangeHealthPoints} className="form-control text-center" />
                                    </div>

                                    <div>
                                        <h5>Magic Points</h5>
                                        <input value={selectedOpponentBattlePet.maxMagicPoints} type={'number'} onChange={handleOnChangeMagicPoints} className="form-control text-center" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="columns-3">
                                    <div>
                                        <h5>Attack Points</h5>
                                        <input value={selectedOpponentBattlePet.attackPoints} type={'number'} onChange={handleOnChangeAttackPoints} className="form-control text-center" />
                                    </div>

                                    <div>
                                        <h5>Defense Points</h5>
                                        <input value={selectedOpponentBattlePet.defensePoints} type={'number'} onChange={handleOnChangeDefensePoints} className="form-control text-center" />
                                    </div>

                                    <div>
                                        <h5>Agility Points</h5>
                                        <input value={selectedOpponentBattlePet.agilityPoints} type={'number'} onChange={handleOnChangeAgilityPoints} className="form-control text-center" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h5>Level</h5>
                                <input value={selectedOpponentBattlePet.level} type={'number'} onChange={handleOnChangeLevelPoints} className="form-control text-center" />
                            </div>

                            <div className="mb-6">
                                <h5>Experience Granted</h5>
                                <input value={selectedOpponentBattlePet.experienceGranted} type={'number'} onChange={handleOnChangeExperienceGrantedPoints} className="form-control text-center" />
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
                                <button type="submit" className="btn-primary"><FontAwesomeIcon icon={faArrowsRotate} /> Update Pet</button>
                            </div>
                        </form>
                    </Modal.Body>

                    <Modal.Actions>

                    </Modal.Actions>
                </Modal>
            </div>

        </div>
    )
}

export default ManageOpponent;
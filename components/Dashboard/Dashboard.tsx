import { faHeartPulse, faHippo, faPaw, faRadiationAlt, faShieldCat, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PetCard from "../Cards/PetCard";
import { motion } from 'framer-motion';
import { Button, Modal } from 'react-daisyui'
import PetCardFull from "../Cards/PetCardFull";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";


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

async function healAllPets(email: string) {
    const response = await fetch(`/api/petAPI/healAllPets/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
}

async function setActivePet(id: string, email: string) {
    const response = await fetch(`/api/petAPI/setActivePet/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: (JSON.stringify({ id, email }))
    });

    const data = await response.json();
    return data;
}

function Dashboard({ data }: any) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [pets, setPets] = useState<Pet[]>(data.pets as Pet[]);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedPet, setSelectedPet] = useState<Pet>();

    const handleOnClickOpenModal = (element: Pet) => {
        console.log(element);
        setSelectedPet(element);
        setIsOpen(true);
    }

    const handleOnClickHeallAllPets = async () => {
        const currentUser = session?.user?.email;
        if (currentUser) {
            const responsePets = await healAllPets(currentUser);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Pets Healed!',
                showConfirmButton: false,
                timer: 800
            }).then(async () => {
                console.log(responsePets);
                setPets(responsePets);
            });
        }
    }

    const handleOnClickSetActivePet = async (id: string) => {
        const currentUser = session?.user?.email;
        if (currentUser) {
            const responsePets = await setActivePet(id, currentUser);
            console.log(responsePets);
            setPets(responsePets);
        }
    }

    return (
        <div>
            <div className="container mx-auto p-5 mb-5 mt-10">
                <h1 className="header">Dashboard <FontAwesomeIcon icon={faShieldCat} /></h1>
                <hr />
            </div>

            <div className="">
                <div className="w-3/5 mx-auto mb-10 p-5 bg-gray-200 shadow-md shadow-black rounded-md">
                    <h4 className="text-center">Actions</h4>
                    <div className="flex flex-row gap-5">
                        <button type="button" onClick={() => router.push('/createPet')} className="btn-primary text-black"><FontAwesomeIcon icon={faHippo} /> Create Pet</button>
                        <button type="button" onClick={() => router.push('/')} className="btn-secondary"><FontAwesomeIcon icon={faHeartPulse} /> Adopt Pet</button>
                        <button type="button" onClick={() => router.push('/')} className="btn-danger"><FontAwesomeIcon icon={faRadiationAlt} /> Leave Pet</button>
                    </div>
                </div>
            </div>

            <div className="w-10/12 mx-auto p-10 shadow-lg shadow-black">
                <h2 className="text-center">Your Pets <FontAwesomeIcon icon={faPaw} /> </h2>
                <hr />
                <div className="flex flex-row justify-end">
                    <button onClick={async () => handleOnClickHeallAllPets()} className="btn-dark" type="button"><FontAwesomeIcon icon={faHeartPulse} className='text-red-400' /> Heal All Pets</button>
                </div>
                <div className="flex flex-wrap gap-10 mt-10">
                    {
                        pets.map((element: Pet, index: number) => (
                            <div key={index}>
                                <div className="">
                                    <h4 className="text-center mb-5"># {index + 1}</h4>
                                </div>
                                <motion.div
                                    whileHover={{
                                        scale: 1.1
                                    }}
                                    className='cursor-pointer'

                                    onClick={() => handleOnClickOpenModal(element)}>
                                    <PetCard pet={element} />
                                </motion.div>
                                {
                                    index > 0 ?
                                        <div className="flex flex-row justify-center mt-10">
                                            <button type="button" onClick={async () => handleOnClickSetActivePet(element._id)} className="btn-dark"><FontAwesomeIcon icon={faStar} /> Set Active</button>
                                        </div>
                                        : null
                                }
                            </div>
                        ))
                    }
                </div>
            </div>

            <div>
                <Modal className="text-black bg-white max-w-[60rem] max-h-full" open={isOpen} onClickBackdrop={() => setIsOpen(false)}>
                    <Modal.Header><h5>Pet Info <FontAwesomeIcon icon={faShieldCat} /> </h5></Modal.Header>

                    <Modal.Body>
                        <div className="p-2">
                            {selectedPet ?
                                <div className="flex flex-row">
                                    <div>
                                        <PetCardFull pet={selectedPet} />
                                    </div>
                                    <div>
                                        <div className="p-5 h-1/2">
                                            Content
                                        </div>

                                        <div className="p-5 h-1/2">
                                            <button onClick={() => router.push(`/viewPet/${selectedPet._id}`)} type="button" className="btn-primary">Go to Pet Page!</button>
                                        </div>
                                    </div>
                                </div>
                                : null
                            }

                        </div>
                    </Modal.Body>

                    <Modal.Actions>

                    </Modal.Actions>
                </Modal>
            </div>
        </div >
    )
}

export default Dashboard;
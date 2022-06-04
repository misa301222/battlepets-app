import { faCat, faFireFlameCurved, faShieldCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyntheticEvent, useState } from "react";
import { motion } from 'framer-motion';
import Swal from "sweetalert2";
import { useRouter } from "next/router";

interface PetType {
    _id: string,
    petTypeName: string,
    imageURL: string
}

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
    experience?: number
}

interface User {
    _id: string,
    fullName: string,
    email: string,
    imageURL: string,
    role: string,
    privateInfo: boolean
}

async function getPetsByEmail(email: string) {
    const response = await fetch(`/api/petAPI/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
}

async function createNewPet(userId: string, petName: string, petType: string, position: number) {
    const response = await fetch('/api/petAPI', {
        method: 'POST',
        body: JSON.stringify({ userId, petName, petType, position }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
}

function CreatePet({ data }: any) {
    const [petTypes, setPetTypes] = useState<PetType[]>(data.petTypes as PetType[]);
    const [selectedPetType, setSelectedPetType] = useState<PetType | null>(null);
    const [petName, setPetName] = useState<string>('');
    const [currentUser] = useState<User>(data.currentUser as User);
    const router = useRouter();

    const handleOnClickSelectedPet = (element: PetType) => {
        if (selectedPetType?._id === element._id) {
            setSelectedPetType(null);
        } else {
            setSelectedPetType(element);
        }
    }

    const handleOnSubmitFormCreatePet = async (event: SyntheticEvent) => {
        event.preventDefault();

        if (selectedPetType && petName) {
            const responsePets = await getPetsByEmail(currentUser.email);

            let newPet: Pet = {
                userId: currentUser._id,
                name: petName,
                petType: selectedPetType._id,
                position: responsePets.length ? responsePets.length + 1 : 1
            }
            console.log(responsePets);
            const responsePet = await createNewPet(newPet.userId, newPet.name, newPet.petType, newPet.position);
            if (responsePet.isOk) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Pet Created!',
                    showConfirmButton: true,
                }).then(() => {
                    router.push('/dashboard');
                });
            }
        }
    }


    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Create Pet! <FontAwesomeIcon icon={faShieldCat} /></h1>
                <hr />
            </div>

            <form onSubmit={handleOnSubmitFormCreatePet} className='w-full'>
                <div className="flex flex-wrap justify-center gap-10 w-1/2 mx-auto">
                    {
                        petTypes.map((element: PetType, index: number) => (
                            <motion.div
                                whileHover={{
                                    scale: 1.1
                                }}
                                className="card w-56" key={index}
                                style={{
                                    backgroundColor: `${selectedPetType?._id === element._id ? '#fecaca' : 'white'}`,
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleOnClickSelectedPet(element)}
                            >
                                <div style={{
                                    backgroundImage: `url(${element.imageURL})`,
                                    height: '10rem',
                                    width: '10rem',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '1.3rem',
                                    margin: '0 auto',
                                }}
                                >
                                </div>

                                <h5 className="text-center mt-5">{element.petTypeName}</h5>
                            </motion.div>
                        ))
                    }
                </div>

                <div className="card mt-20 w-[35rem] mx-auto">
                    <div className="mb-5">
                        <h5>Pet Name</h5>
                        <input onChange={(e) => setPetName(e.target.value)} className="form-control" maxLength={50} placeholder={'Insert the name of your pet...'} />
                    </div>
                </div>

                <div className="flex flex-row justify-center mt-6">
                    <label htmlFor="modalPet" className="btn-secondary"><FontAwesomeIcon icon={faCat} /> Create Pet </label>
                </div>

                <input type="checkbox" id="modalPet" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box w-11/12 max-w-5xl bg-white">
                        <label htmlFor="modalPet" className="btn btn-sm bg-gray-300 border-gray-500 btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="font-bold text-lg"><FontAwesomeIcon icon={faCat} /> Create Pet!</h3>
                        <div className="mt-20 mb-20">
                            {
                                !selectedPetType || !petName ?
                                    <h3 className="text-red-600">
                                        It seems there's empty data, try going back and fill all the details!
                                    </h3> :
                                    <div className="card w-56 mx-auto">
                                        <div style={{
                                            backgroundImage: `url(${selectedPetType.imageURL})`,
                                            height: '10rem',
                                            width: '10rem',
                                            backgroundSize: 'cover',
                                            borderRadius: '1.3rem',
                                            margin: '0 auto',
                                        }}
                                        >
                                        </div>

                                        <h5 className="text-center mt-5"><FontAwesomeIcon icon={faFireFlameCurved} className='text-red-700' /> {petName} <FontAwesomeIcon icon={faFireFlameCurved} className='text-red-700' /></h5>
                                    </div>
                            }
                        </div>
                        <div className="modal-action">
                            <button type="submit" disabled={!selectedPetType || !petName} className="btn-primary">Accept!</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreatePet;
import { faArrowRotateRight, faPaintbrush } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import PetCard from "../Cards/PetCard";
import { motion } from 'framer-motion';
import Swal from "sweetalert2";

interface Pet {
    _id: string,
    userId?: string,
    currentHealthPoints?: number,
    maxHealthPoints?: number,
    name?: string,
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
    petType?: string,
    position?: number,
    experience?: number
}

async function updatePet(id: string, name: string, imageURL: string) {
    const response = await fetch(`/api/petAPI/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: (JSON.stringify({ id, name, imageURL }))
    });

    const data = await response.json();
    return data;
}

function CustomizePets({ data }: any) {
    const [pets, setPets] = useState<Pet[]>(data.pets as Pet[]);
    const [selectedPet, setSelectedPet] = useState<Pet>({
        _id: '0',
        name: '',
        imageURL: ''
    });

    const handleOnChangePetName = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedPet(prev => ({ ...prev, name: event.target.value }))
    }

    const handleOnChangeImageURL = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedPet(prev => ({ ...prev, imageURL: event.target.value }))
    }

    const handleOnSubmitUpdateForm = async (event: SyntheticEvent) => {
        event.preventDefault();

        const responsePet = await updatePet(selectedPet._id, selectedPet.name!, selectedPet.imageURL!);
        if(responsePet.isOk){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Pet Updated Successfully!',
                showConfirmButton: false,
                timer: 800
            });
        }
    }

    return (
        <div>
            <div className="container mx-auto p-5 mb-5 mt-10">
                <h1 className="header">Customize <FontAwesomeIcon icon={faPaintbrush} /></h1>
                <hr />
            </div>

            <div className="flex flex-wrap gap-10 mt-10 justify-center">
                {
                    pets.map((element: Pet, index: number) => (
                        <div key={index} >
                            <motion.div
                                whileHover={{
                                    scale: 1.1
                                }}
                                className='cursor-pointer'
                                onClick={() => setSelectedPet(element)}
                                style={{
                                    borderWidth: `${selectedPet._id === element._id ? '0.5rem' : 0}`,
                                    borderColor: `${selectedPet._id === element._id ? '#60a5fa' : 'null'}`,
                                    borderRadius: `${selectedPet._id === element._id ? '13px' : '0px'}`,
                                    backgroundColor: `${selectedPet._id === element._id ? '#bfdbfe' : 'transparent'}`
                                }}
                            >
                                <PetCard pet={element} />
                            </motion.div>
                        </div>
                    ))
                }
            </div>

            {
                selectedPet?._id !== '0' ?
                    <form onSubmit={handleOnSubmitUpdateForm} className="card w-1/2 mx-auto mt-40">
                        <div className="mb-2">
                            <h5>Name</h5>
                            <input onChange={handleOnChangePetName} value={selectedPet.name} type={'text'} className='form-control' />
                        </div>

                        <div className="mb-2">
                            <h5>Custom ImageURL</h5>
                            <input onChange={handleOnChangeImageURL} value={selectedPet.imageURL} type={'text'} className='form-control' />
                        </div>

                        <div className="mt-2 flex flex-row justify-center">
                            <button className="btn-primary"><FontAwesomeIcon icon={faArrowRotateRight} /> Update</button>
                        </div>
                    </form>
                    : null
            }
        </div>
    )
}

export default CustomizePets;
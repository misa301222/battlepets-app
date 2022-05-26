import { useState } from "react";
import { motion } from 'framer-motion';
import PetCard from "../Cards/PetCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

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

async function deletePetById(id: string) {
    const response = await fetch(`/api/petAPI/deletePetById/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    return data;
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

function DeletePet({ data }: any) {
    const { data: session, status } = useSession();
    const [pets, setPets] = useState<Pet[]>(data.pets as Pet[]);

    const handleOnClickDeletePet = async (_id: string) => {
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
                const responseDelete = await deletePetById(_id);
                if (responseDelete.isOk) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'PET DELETED Successfully!',
                        showConfirmButton: true,
                    }).then(async () => {
                        const responsePets = await getPetsByEmail(session?.user?.email!);
                        setPets(responsePets);
                    });
                }
            }
        });
    }

    return (
        <div>
            <div className="container mx-auto p-5 mb-5 mt-10">
                <h1 className="header">Delete Pet <FontAwesomeIcon icon={faDeleteLeft} /></h1>
                <hr />
            </div>


            <div className="w-10/12 mx-auto p-10 shadow-lg shadow-black">
                <div className="text-center">
                    <h1 className="text-red-600">Select the Pet You Wish to Delete</h1>
                    <h4 className="">WARNING</h4>
                    <h4 className="text-red-600">Only Continue if you want to delete it. You can only do this once per Pet...</h4>
                    <hr />
                </div>
                <div className="flex flex-wrap gap-10 mt-10">
                    {
                        pets.map((element: Pet, index: number) => (
                            <div key={index} >
                                <motion.div
                                    whileHover={{
                                        scale: 1.1
                                    }}
                                    className='cursor-pointer'
                                    onClick={async () => handleOnClickDeletePet(element._id)}
                                >
                                    <PetCard pet={element} />
                                </motion.div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default DeletePet;
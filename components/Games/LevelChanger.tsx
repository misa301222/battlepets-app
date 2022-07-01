import { faDiceOne, faListNumeric } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from 'framer-motion';
import { useRouter } from "next/router";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";
import PetCard from "../Cards/PetCard";
import PetCardFull from "../Cards/PetCardFull";

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

async function addExperienceToPet(id: string, experienceToAdd: number) {
    const response = await fetch(`/api/petAPI/addExperience/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: (JSON.stringify({ id, experienceToAdd }))
    });

    const data = await response.json();
    return data;
}

function LevelChanger({ data }: any) {
    const [success, setSuccess] = useState<boolean>(false);
    const [pets] = useState<Pet[]>(data.pets as Pet[]);
    const [selectedPet, setSelectedPet] = useState<Pet>(pets[0]);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(10000);
    const [message, setMessage] = useState<string>('');
    const router = useRouter();

    const handleOnClickRollDice = () => {
        const resultNumber: number = Math.random();
        const result: boolean = resultNumber < 0.001;
        
        if (result) {
            setSuccess(true);
            setMessage(`You win!, you got ${resultNumber.toFixed(3)}`);
        } else {
            setMessage(`Not even close, you got ${resultNumber.toFixed(3)}, roll the dice again?`);
        }
    }

    const handleOnSubmitAddExperience = async (event: SyntheticEvent) => {
        event.preventDefault();
        const result = await addExperienceToPet(selectedPet._id, selectedQuantity);
        if (result.isOk) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Experience added succesfully!',
                showConfirmButton: true
            }).then(() => {
                router.push('/dashboard');
            });
        }
    }

    const handleSelectPet = (event: ChangeEvent<HTMLSelectElement>) => {
        for (let i = 0; i < pets.length; i++) {
            if (pets[i]._id === event.target.value) {
                setSelectedPet(pets[i]);
            }
        }
    }

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Level Changer <FontAwesomeIcon icon={faListNumeric} /></h1>
                <hr />
            </div>

            {
                !success ?
                    <div>
                        <motion.div
                            initial={{
                                opacity: 0,
                                translateX: -400
                            }}

                            animate={{
                                opacity: 1,
                                translateX: 0,
                                transition: {
                                    type: 'spring',
                                    duration: 1.4
                                }
                            }}
                            className="container mx-auto card mb-20 flex flex-row">
                            <div className="w-1/2 flex flex-row items-center">
                                <img src={'/static/images/GreyCat.jpg'} className='max-w-xl' />
                            </div>
                            <div className="w-1/3 mx-auto p-5">
                                <h2 className="text-center">Level Changer</h2>
                                <h5 className="mt-10 text-center">Roll the dice and win, but this is no ordinary dice, almost all the odds are against you.<br />
                                    0.001% to win. 24 hours a day.<br />
                                </h5>
                                <h3 className="text-center mt-10">Will you take the callenge? </h3>
                            </div>
                        </motion.div>
                    </div>
                    : null
            }

            {
                !success ?
                    <div>
                        <motion.div
                            className="card w-fit mx-auto cursor-pointer"
                            whileHover={{
                                scale: 1.1
                            }}
                            onClick={() => handleOnClickRollDice()}>
                            <FontAwesomeIcon className="text-[8rem]" icon={faDiceOne} />
                        </motion.div>

                        <div className="mt-10">
                            <h3 className="text-center">{message}</h3>
                        </div>
                    </div>
                    :
                    <div>
                        <h2 className="text-center">{message}</h2>
                        <h4 className="text-center mb-10">It seems you won.. Select the levels you want to increase.</h4>
                        <div className="flex flex-row justify-center mb-20">
                            <PetCardFull pet={selectedPet} />
                        </div>

                        <form onSubmit={handleOnSubmitAddExperience} className="w-1/2 mx-auto">
                            <h5 className="text-center mb-5">Select The Pet you Want to Add Experience</h5>
                            <select className="form-control w-[10rem] mx-auto mb-10" onChange={(e) => handleSelectPet(e)}>
                                {
                                    pets.map((element: Pet, index: number) => (
                                        <option key={index} value={element._id}>{element.name}</option>
                                    ))
                                }
                            </select>

                            <h5 className="text-center mb-5">Select The Quantity of Experience</h5>
                            <select className="form-control w-[7rem] mx-auto text-center" onChange={(e) => setSelectedQuantity(Number(e.target.value))}>
                                <option value={10000}>+10,000</option>
                                <option value={20000}>+20,000</option>
                                <option value={30000}>+30,000</option>
                                <option value={40000}>+40,000</option>
                                <option value={50000}>+50,000</option>
                            </select>

                            <div className="flex flex-row justify-center mt-40">
                                <button type="submit" className="btn-primary">Apply Changes</button>
                            </div>
                        </form>
                    </div>
            }
        </div>
    )
}

export default LevelChanger;
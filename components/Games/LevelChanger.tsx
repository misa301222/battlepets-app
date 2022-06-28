import { faDiceOne, faListNumeric } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from 'framer-motion';
import { SyntheticEvent, useState } from "react";

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
    const response = await fetch(`/api/petAPI/addLevels/`, {
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
    const [pets, setPets] = useState<Pet[]>(data.pets as Pet[]);

    const handleOnClickRollDice = () => {
        //const result: boolean = Math.random() < 0.001;
        const result: boolean = Math.random() < 0.9;
        if (result) {
            console.log('success');
            setSuccess(true);
        } else {
            console.log('nothing');
        }
    }

    const handleOnSubmitAddExperience = async (event: SyntheticEvent) => {
        event.preventDefault();

        // const result = await addExperienceToPet();
    }

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Level Changer <FontAwesomeIcon icon={faListNumeric} /></h1>
                <hr />
            </div>

            {
                !success ?
                    <motion.div
                        className="card w-fit mx-auto cursor-pointer"
                        whileHover={{
                            scale: 1.1
                        }}
                        onClick={() => handleOnClickRollDice()}>
                        <FontAwesomeIcon className="text-[8rem]" icon={faDiceOne} />
                    </motion.div>
                    :
                    <div>
                        <h4 className="text-center mb-10">It seems you won.. Select the levels you want to increase.</h4>
                        <form onSubmit={handleOnSubmitAddExperience} className="w-1/2 mx-auto">
{/* TODO MAKE PREVIEW OF SELECTED PET */}
                            <select className="form-control">
                                {
                                    pets.map((element: Pet, index: number) => (
                                        <option key={index} value={element._id}>{element.name}</option>
                                    ))
                                }
                            </select>

                            <select className="form-control w-[5rem] mx-auto text-center">
                                <option value={10000}>+10</option>
                                <option value={20000}>+20</option>
                                <option value={30000}>+30</option>
                                <option value={40000}>+40</option>
                                <option value={50000}>+50</option>
                            </select>

                            <div className="flex flex-row justify-center mt-10">
                                <button type="button" className="btn-primary">Apply Changes</button>
                            </div>
                        </form>
                    </div>
            }
        </div>
    )
}

export default LevelChanger;
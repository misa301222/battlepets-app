import { faCat, faCow, faDog, faDragon, faOtter, faShieldCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { motion } from 'framer-motion';
import { useRouter } from "next/router";
import { Modal } from "react-daisyui";
import { useState } from "react";

interface PetType {
    _id: string,
    petTypeName: string,
    petTypeDescription: string,
    imageURL: string
}

async function getPetTypes(petTypeName: string) {
    const response = await fetch(`/api/petTypesAPI/getPetTypeByName/${petTypeName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    return data;
}

function Home({ data }: any) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [petTypes, setPetTypes] = useState<PetType[]>(data.petTypes as PetType[]);
    const [selectedType, setSelectedPetType] = useState<PetType>();

    const handleOnClickPetTypeCard = (petTypeName: string) => {
        setIsOpen(true);
        if (petTypes) {
            for (let i = 0; i < petTypes.length; i++) {
                if (petTypes[i].petTypeName === petTypeName) {
                    setSelectedPetType(petTypes[i]);
                }
            }
        }
    }

    return (
        <div>
            <div style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/static/images/Cat.jpg)`,
                height: '70vh',
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div className="">
                    <div className="text-[8rem] text-orange-200 flex flex-row gap-8 cursor-pointer">
                        <motion.h5 drag
                            dragConstraints={{
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                            }}
                            initial={{ opacity: 0, translateY: -100 }} animate={{ opacity: 1, translateY: 0, transition: { type: 'spring', duration: 1.2, delay: 0.9, bounce: 0.6 } }}><FontAwesomeIcon icon={faShieldCat} /></motion.h5>
                        <motion.h5 initial={{ opacity: 0, translateY: 100 }} animate={{ opacity: 1, translateY: 0, transition: { type: 'spring', duration: 1.2, delay: 0 } }}>Battle</motion.h5>
                        <motion.h5 initial={{ opacity: 0, translateY: -100 }} animate={{ opacity: 1, translateY: 0, transition: { type: 'spring', duration: 1.2, delay: 0 } }}>Pets</motion.h5>
                        <motion.h5 initial={{ opacity: 0, translateY: 100 }} animate={{ opacity: 1, translateY: 0, transition: { type: 'spring', duration: 1.2, delay: 0 } }}>App</motion.h5>
                    </div>
                </div>
            </div>

            <div className="mt-20 container mx-auto">
                <h1 className="text-center">Create Your Own Pets And Battle</h1>
                <hr className="border-black" />

                <div className="flex flex-wrap justify-center gap-10 p-10">
                    <motion.div whileHover={{
                        rotateZ: [0, 100, -100, 0],
                        transition: {
                            ease: "backInOut",
                            delay: 0,
                            duration: 3,
                            repeat: Infinity
                        }
                    }} onClick={() => handleOnClickPetTypeCard("Dragon")} className="mt-10 w-fit p-5 border-2 border-gray-200 shadow-md shadow-black mx-auto rounded-md cursor-pointer">
                        <FontAwesomeIcon className="text-[7rem]" icon={faDragon} />
                    </motion.div>

                    <motion.div whileHover={{
                        rotateZ: [0, 100, -100, 0],
                        transition: {
                            ease: "backInOut",
                            delay: 0,
                            duration: 3,
                            repeat: Infinity
                        }
                    }} onClick={() => handleOnClickPetTypeCard("Cat")} className="mt-10 w-fit p-5 border-2 border-gray-200 shadow-md shadow-black mx-auto rounded-md cursor-pointer">
                        <FontAwesomeIcon className="text-[7rem]" icon={faCat} />
                    </motion.div>

                    <motion.div whileHover={{
                        rotateZ: [0, 100, -100, 0],
                        transition: {
                            ease: "backInOut",
                            delay: 0,
                            duration: 3,
                            repeat: Infinity
                        }
                    }} onClick={() => handleOnClickPetTypeCard("Dog")} className="mt-10 w-fit p-5 border-2 border-gray-200 shadow-md shadow-black mx-auto rounded-md cursor-pointer">
                        <FontAwesomeIcon className="text-[7rem]" icon={faDog} />
                    </motion.div>

                    <motion.div whileHover={{
                        rotateZ: [0, 100, -100, 0],
                        transition: {
                            ease: "backInOut",
                            delay: 0,
                            duration: 3,
                            repeat: Infinity
                        }
                    }} onClick={() => handleOnClickPetTypeCard("Cow")} className="mt-10 w-fit p-5 border-2 border-gray-200 shadow-md shadow-black mx-auto rounded-md cursor-pointer">
                        <FontAwesomeIcon className="text-[7rem]" icon={faCow} />
                    </motion.div>

                    <motion.div whileHover={{
                        rotateZ: [0, 100, -100, 0],
                        transition: {
                            ease: "backInOut",
                            delay: 0,
                            duration: 3,
                            repeat: Infinity
                        }
                    }} onClick={() => handleOnClickPetTypeCard("Otter")} className="mt-10 w-fit p-5 border-2 border-gray-200 shadow-md shadow-black mx-auto rounded-md cursor-pointer">
                        <FontAwesomeIcon className="text-[7rem]" icon={faOtter} />
                    </motion.div>
                </div>
            </div>

            {!session && (
                <div className="mt-20 container mx-auto card p-20 bg-slate-400">
                    <h1 className="text-center">Create An Accont
                        <span onClick={() => router.push(`/register`)} className='text-blue-600 hover:text-blue-800 cursor-pointer duration-300 under'> <u>Here!</u></span></h1>

                    <motion.div
                        initial={{

                        }}

                        animate={{
                            opacity: 1,
                            rotateZ: [0, 100, -100, 0],
                            transition: {
                                ease: "easeInOut",
                                delay: 0.2,
                                repeat: Infinity,
                                repeatDelay: 1,
                                duration: 3
                            }
                        }}
                        className="mt-10 w-fit p-5 border-2 border-gray-200 shadow-md shadow-black mx-auto rounded-md bg-gray-100">
                        <FontAwesomeIcon className="text-[7rem]" icon={faDragon} />
                    </motion.div>
                </div>
            )}

            <div>
                <Modal className="text-black bg-white max-w-[60rem] max-h-full" open={isOpen} onClickBackdrop={() => setIsOpen(false)}>
                    <Modal.Header><h5>{selectedType?.petTypeName} Pet Type Information <FontAwesomeIcon icon={faShieldCat} /> </h5></Modal.Header>

                    <Modal.Body>
                        <div className="p-2">
                            <div className="flex flex-row">
                                <div className="w-1/2 p-5">
                                    <div
                                        style={{
                                            backgroundImage: `url(${selectedType?.imageURL})`,
                                            width: '20rem',
                                            height: '30rem',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }} />
                                </div>

                                <div className="w-1/2">
                                    <div className="p-5">
                                        <h4 className="text-center">Information About This Type</h4>
                                        <hr className="border-black mb-5" />
                                        {
                                            selectedType?.petTypeDescription
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Actions>

                    </Modal.Actions>
                </Modal>
            </div>

        </div>
    )
}

export default Home;
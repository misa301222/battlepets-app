import { useState } from "react";
import { motion } from 'framer-motion';
import PetCardDetail from "../Cards/PetCardDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faArrowCircleRight, faDice, faDog, faHeartCirclePlus, faImages, faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

interface User {
    _id: string,
    fullName: string,
    email: string,
    imageURL: string,
    role: string,
    privateInfo: boolean
}

interface UserProfile {
    _id: string,
    descriptionHeader: string,
    description: string,
    hobbies: string[],
    imagesURL: string[],
    coverURL: string,
    location: string
}

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

function SeeUserProfile({ data }: any) {
    const [user] = useState<User>(data.user as User);
    const [userProfile] = useState<UserProfile>(data.userProfile as UserProfile);
    const [pets] = useState<Pet[]>(data.pets as Pet[]);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [currentImageURL, setCurrentImageURL] = useState<string>(data.userProfile.imagesURL[0] ? data.userProfile.imagesURL[0] : '');
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const router = useRouter();

    const variants = {
        play: {
            opacity: 1,
            translateX: [0, 100, -100, 0],
            rotateZ: [0, 100, -100, 0],
            transition: {
                ease: "easeInOut",
                delay: 0.2,
                repeat: Infinity,
                repeatDelay: 1,
                duration: 2
            }
        },
        stop: { opacity: 1, translateX: 0, rotateZ: 0 },
    }

    const handleOnClickPreviousImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    const handleOnClickNextImage = () => {
        if (userProfile.imagesURL.length - 1 > currentIndex) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    return (
        <div>
            <motion.div
                initial={{
                    opacity: 0,
                    translateY: -1000
                }}

                animate={{
                    opacity: 1,
                    translateY: 0,
                    transition: {
                        type: 'srping',
                        duration: 1.2
                    }
                }}
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${userProfile.coverURL})`,
                    height: '45vh',
                    backgroundSize: 'cover',
                }} />


            <div className="flex flex-row">
                <motion.div
                    initial={{
                        opacity: 0,
                        translateX: -100
                    }}

                    animate={{
                        opacity: 1,
                        translateX: 0,
                        transition: {
                            type: 'srping',
                            duration: 1.2
                        }
                    }}
                    style={{
                        backgroundImage: `url(${user.imageURL})`,
                        height: '15rem',
                        width: '15rem',
                        borderRadius: '50%',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        top: '-8rem',
                        marginLeft: '11rem',
                        borderWidth: '0.5rem',
                        borderColor: '#262626'
                    }} />

                <motion.h1
                    initial={{
                        opacity: 0,
                        translateX: -100
                    }}

                    animate={{
                        opacity: 1,
                        translateX: 0,
                        transition: {
                            type: 'srping',
                            duration: 1.2
                        }
                    }}
                    className="ml-20">{user.fullName}</motion.h1>
            </div>

            <div className="card w-[80%] mx-auto">
                <h2 className="text-center mt-5 mb-2">{userProfile.descriptionHeader}</h2>
                <hr className="border-black" />
                <p className="mt-5 text-center">
                    {userProfile.description}
                </p>
            </div>

            <div className="mt-20 text-center w-[80%] mx-auto">
                <h1 className="mb-2"><FontAwesomeIcon icon={faDog} /> Pets</h1>
                <hr className="border-black" />
                <div className="flex flex-wrap gap-10 mt-5">
                    {
                        pets.map((element: Pet, index: number) => (
                            <motion.div key={index}
                                whileHover={{
                                    scale: 1.1
                                }}
                                className='cursor-pointer'
                                onClick={() => router.push(`/viewPet/${element._id}`)}
                            >
                                <PetCardDetail pet={element} />
                            </motion.div>
                        ))
                    }
                </div>
            </div>

            <div className="mt-20 w-[80%] mx-auto text-center">
                <h1 className="mb-2"><FontAwesomeIcon icon={faDice} /> Hobbies</h1>
                <hr className="border-black" />

                <div className="mt-10 flex flex-row justify-evenly">
                    {
                        userProfile?.hobbies.map((element: string, index: number) => (
                            <motion.div
                                whileInView={isPlaying ? 'play' : 'stop'}
                                variants={variants}
                                key={index} className='card w-80 h-20 flex items-center justify-center'>
                                <h4>{element}</h4>
                            </motion.div>
                        ))
                    }
                </div>
                <div className="flex flex-row justify-center mt-20">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="btn-dark w-32" type="button">
                        {isPlaying ? <span><FontAwesomeIcon icon={faStop} /> Stop</span> : <span><FontAwesomeIcon icon={faPlay} /> Play</span>}
                    </button>
                </div>
            </div>

            <div className="mt-40 w-[80%] mx-auto text-center mb-2">
                <h1 className="mb-2"><FontAwesomeIcon icon={faImages} /> Favorites Images :)</h1>
                <hr className="border-black" />
            </div>

            <div className="bg-black">
                <div className="flex flex-row w-4/5 mx-auto h-[70vh]">
                    <div className="w-2/4 flex items-center justify-center">
                        <h1 className="text-white text-[7rem]">
                            These Are the Great Images That I Like <FontAwesomeIcon icon={faHeartCirclePlus} className='text-red-500' />
                        </h1>
                    </div>

                    <div className="w-2/4 flex items-center justify-center">
                        <div className="w-full">
                            {
                                <motion.img
                                    initial={{
                                        opacity: 0
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        transition: {
                                            duration: 1
                                        }
                                    }}
                                    viewport={{
                                        once: false
                                    }}
                                    layout transition={{
                                        type: 'spring'
                                    }}
                                    src={userProfile.imagesURL[currentIndex]}
                                    className='mt-20 max-h-[25rem] mx-auto' />
                            }
                            <div className="flex flex-row justify-evenly mt-10 items-center">
                                <button disabled={currentIndex === 0} onClick={handleOnClickPreviousImage} className="w-20 btn-dark" type="button"><FontAwesomeIcon icon={faArrowCircleLeft} /></button>
                                <h5 className="text-white">Image {currentIndex + 1} Out Of {userProfile.imagesURL.length}</h5>
                                <button disabled={currentIndex === userProfile.imagesURL.length - 1} onClick={handleOnClickNextImage} className="w-20 btn-dark" type="button"> <FontAwesomeIcon icon={faArrowCircleRight} /></button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeeUserProfile;
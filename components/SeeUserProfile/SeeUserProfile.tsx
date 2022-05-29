import { useState } from "react";
import { motion } from 'framer-motion';
import PetCardDetail from "../Cards/PetCardDetail";

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
                <h1 className="mb-2">Pets</h1>
                <hr className="border-black" />

                {
                    pets.map((element: Pet, index: number) => (
                        <div key={index}>
                            <PetCardDetail pet={element} />
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default SeeUserProfile;
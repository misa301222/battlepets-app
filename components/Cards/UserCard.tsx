import { motion } from 'framer-motion';
import Link from 'next/link';

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

type Props = {
    user: User,
    userProfile: UserProfile
}

function UserCard({ user, userProfile }: Props) {
    return (
        <div className="w-[44rem] h-[13rem] shadow-black shadow-md"
            style={{
                backgroundImage: `${userProfile.coverURL ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${userProfile.coverURL})` : ''}`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: `${userProfile.coverURL ? '' : 'black'}`
            }}>
            <div className="flex flex-row h-full">
                <div className="w-1/3 flex justify-center items-center">
                    <Link href={`/seeUserProfile/${user.email}`}>
                        <motion.div
                            whileHover={{
                                scale: 1.1
                            }}
                            style={{
                                backgroundImage: `url(${user.imageURL})`,
                                width: '11rem',
                                height: '11rem',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '50%',
                                cursor: 'pointer'
                            }} />
                    </Link>
                </div>

                <div className="w-2/3 text-white">
                    <div className="text-center p-5">
                        <Link href={`/seeUserProfile/${user.email}`}><motion.h3 whileHover={{ scale: 1.1 }}
                            className="mt-2 text-amber-500 hover:text-amber-600 ease-in-out cursor-pointer">{user.fullName}</motion.h3></Link>

                        <hr className="" />
                        <div className="">
                            <h5 className="line-clamp-1 mt-2">{userProfile.descriptionHeader}</h5>
                            <h5 className="line-clamp-3 font-normal">{userProfile.description}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default UserCard;
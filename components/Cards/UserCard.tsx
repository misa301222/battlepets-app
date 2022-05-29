import { motion } from 'framer-motion';
import Link from 'next/link';

function UserCard({ user, userProfile }: any) {
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
                        <motion.img
                            whileHover={{
                                scale: 1.1
                            }}
                            src={user.imageURL} className='w-44 h-44 rounded-full mx-auto cursor-pointer bg-cover bg-center' />
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
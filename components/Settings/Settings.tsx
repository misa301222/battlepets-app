import { faCogs, faDove, faStore, faUserEdit, faUserNinja } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from 'framer-motion';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Settings() {
    const router = useRouter();
    const { data: session, status }: any = useSession();

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Settings <FontAwesomeIcon icon={faCogs} /></h1>
                <hr />
            </div>

            <div className="container mx-auto flex flex-wrap justify-center">
                <motion.div
                    whileHover={{
                        scale: 1.1
                    }}
                    onClick={() => router.push('/userProfile/editUserProfile')}
                    className="card text-center cursor-pointer">
                    <FontAwesomeIcon icon={faUserEdit} className='text-[5rem]' />
                    <h5 className="mt-5">Edit UserProfile Information</h5>
                </motion.div>
            </div>


            {

                session?.user?.role === 'ADMINISTRATOR' ?
                    <div className="mt-20">
                        <h1 className="text-center">Admin Tools</h1>
                        <hr />
                        <div className="container mx-auto flex flex-wrap justify-center mt-5 gap-10">
                            <motion.div
                                whileHover={{
                                    scale: 1.1
                                }}
                                onClick={() => router.push('/manage/manageOpponents')}
                                className="card text-center cursor-pointer">
                                <FontAwesomeIcon icon={faUserNinja} className='text-[5rem]' />
                                <h5 className="mt-5">Manage Opponents</h5>
                            </motion.div>

                            <motion.div
                                whileHover={{
                                    scale: 1.1
                                }}
                                onClick={() => router.push('/manage/managePetTypes')}
                                className="card text-center cursor-pointer">
                                <FontAwesomeIcon icon={faDove} className='text-[5rem]' />
                                <h5 className="mt-5">Manage Pet Types</h5>
                            </motion.div>

                            <motion.div
                                whileHover={{
                                    scale: 1.1
                                }}
                                onClick={() => router.push('/manage/manageStores')}
                                className="card text-center cursor-pointer">
                                <FontAwesomeIcon icon={faStore} className='text-[5rem]' />
                                <h5 className="mt-5">Manage Stores</h5>
                            </motion.div>
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}

export default Settings;
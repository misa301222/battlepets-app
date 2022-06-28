import { faDice, faGamepad, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from 'framer-motion';
import { useRouter } from "next/router";

function Games() {
    const router = useRouter();

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Settings <FontAwesomeIcon icon={faGamepad} /></h1>
                <hr />
            </div>

            <div className="container mx-auto flex flex-wrap justify-center gap-10">
                <motion.div
                    whileHover={{
                        scale: 1.1
                    }}
                    onClick={() => router.push('/games/doubleOrNothing')}
                    className="card text-center cursor-pointer w-[12rem]">
                    <FontAwesomeIcon icon={faDice} className='text-[5rem]' />
                    <h5 className="mt-5">Double or Nothing</h5>
                </motion.div>

                <motion.div
                    whileHover={{
                        scale: 1.1
                    }}
                    onClick={() => router.push('/games/guess')}
                    className="card text-center cursor-pointer w-[12rem]">
                    <FontAwesomeIcon icon={faQuestion} className='text-[5rem]' />
                    <h5 className="mt-5">Guess</h5>
                </motion.div>

                <motion.div
                    whileHover={{
                        scale: 1.1
                    }}
                    onClick={() => router.push('/games/levelChanger')}
                    className="card text-center cursor-pointer w-[12rem]">
                    <FontAwesomeIcon icon={faQuestion} className='text-[5rem]' />
                    <h5 className="mt-5">Level Changer...</h5>
                </motion.div>
            </div>
        </div>
    )
}

export default Games;